/**
 * Build-time renderer for the static GitHub Pages site.
 *
 * Every canonical public route is rendered to a complete HTML document before
 * deployment. The deployed site is therefore readable without JavaScript; the
 * React client only hydrates the already-present document for enhancements.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "dist/public");
const ssrBundle = path.resolve(__dirname, "client/dist/server/entry-server.js");
const BASE_URL = "https://theashbyinstitute.org";

const routeMeta = [
  { path: "/", title: "The Ashby Institute | AI Economics Research", description: "Independent research on AI economics: the cost curves, bottlenecks, market structures, and institutions shaping artificial intelligence." },
  { path: "/theory", title: "Theory | The Ashby Institute", description: "Ashby's Law of Requisite Variety and the systems theory used in The Ashby Institute's AI economics research." },
  { path: "/research", title: "Research | The Ashby Institute", description: "AI economics research on compute, market structure, governance, institutions, and distribution." },
  { path: "/publications", title: "Publications | The Ashby Institute", description: "Open-access research and reports from The Ashby Institute on AI economics, the compute transition, and institutional capacity." },
  { path: "/publications/via-negativa", title: "Via Negativa: The AI Economy by Elimination | The Ashby Institute", description: "A working paper on the AI economy, forecasting by elimination against six constraints." },
  { path: "/publications/via-negativa/read", title: "Read Via Negativa | The Ashby Institute", description: "The online reading edition of Via Negativa: The AI Economy by Elimination." },
  { path: "/publications/compute-2030-four-scenarios", title: "Compute 2030: Four Scenarios for the Compute Transition | The Ashby Institute", description: "Four structural scenarios for the compute transition through 2030." },
  { path: "/publications/variety-deficits-ai-governance", title: "Variety Deficits in AI Governance | The Ashby Institute", description: "A structural analysis of AI governance through Ashby's Law of Requisite Variety." },
  { path: "/publications/compute-export-controls-grt", title: "Compute Export Controls and the Good Regulator Theorem | The Ashby Institute", description: "Why effective compute export controls require regulators to model the full variety of applications." },
  { path: "/fellows", title: "Fellows | The Ashby Institute", description: "The Ashby Institute's research fellowship and scholar community." },
  { path: "/events", title: "Events | The Ashby Institute", description: "Events, workshops, and lectures from The Ashby Institute." },
  { path: "/about", title: "About | The Ashby Institute", description: "About The Ashby Institute and its independent research on AI economics." },
  { path: "/contact", title: "Contact | The Ashby Institute", description: "Contact The Ashby Institute for research, fellowship, and press inquiries." },
];

const canonicalUrl = (routePath) => routePath === "/" ? `${BASE_URL}/` : `${BASE_URL}${routePath}`;
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
const escapeJsonForHtml = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function replaceMeta(html, name, content, property = false) {
  const selector = property ? `property=\"${name}\"` : `name=\"${name}\"`;
  const pattern = new RegExp(`<meta\\s+[^>]*${selector}[^>]*>`, "i");
  const replacement = property
    ? `<meta property=\"${name}\" content=\"${escapeHtml(content)}\" />`
    : `<meta name=\"${name}\" content=\"${escapeHtml(content)}\" />`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `  ${replacement}\n</head>`);
}

function documentSchema(meta, publications) {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: canonicalUrl(meta.path),
    isPartOf: { "@type": "WebSite", name: "The Ashby Institute", url: `${BASE_URL}/` },
  };

  if (meta.path === "/publications") {
    website.mainEntity = {
      "@type": "ItemList",
      name: "Publications",
      itemListElement: publications.map((publication, position) => ({
        "@type": "ListItem",
        position: position + 1,
        url: canonicalUrl(`/publications/${publication.slug}`),
        name: publication.title,
      })),
    };
  }

  const publication = publications.find((item) => meta.path === `/publications/${item.slug}`);
  if (publication) {
    website.mainEntity = {
      "@type": "ScholarlyArticle",
      headline: publication.title,
      description: publication.abstract,
      datePublished: publication.dateISO,
      author: publication.authors.map((author) => ({ "@type": "Person", name: author.name })),
      publisher: { "@type": "Organization", name: "The Ashby Institute", url: `${BASE_URL}/` },
      url: canonicalUrl(meta.path),
      ...(publication.pdfUrl ? { encoding: { "@type": "MediaObject", contentUrl: `${BASE_URL}${publication.pdfUrl}`, encodingFormat: "application/pdf" } } : {}),
    };
  }
  return website;
}

function publicationEndpoint(publications) {
  return publications.map((publication) => ({
    slug: publication.slug,
    url: canonicalUrl(`/publications/${publication.slug}`),
    readingEditionUrl: publication.slug === "via-negativa" ? canonicalUrl("/publications/via-negativa/read") : null,
    series: publication.series,
    seriesLabel: publication.seriesLabel,
    type: publication.type,
    date: publication.date,
    dateISO: publication.dateISO,
    title: publication.title,
    subtitle: publication.subtitle ?? null,
    abstract: publication.abstract,
    authors: publication.authors.map((author) => ({ name: author.name, role: author.role })),
    keyFindings: publication.keyFindings ?? [],
    program: publication.program,
    tags: publication.tags,
    pages: publication.pages ?? null,
    pdfUrl: publication.pdfUrl ? `${BASE_URL}${publication.pdfUrl}` : null,
  }));
}

async function prerender() {
  if (!fs.existsSync(ssrBundle)) throw new Error(`SSR bundle not found: ${ssrBundle}`);
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) throw new Error(`Built HTML shell not found: ${templatePath}`);

  const template = fs.readFileSync(templatePath, "utf8").replace(/<noscript>[\s\S]*?<\/noscript>/i, "");
  const { render, PUBLICATIONS_DATA } = await import(ssrBundle);
  const publications = publicationEndpoint(PUBLICATIONS_DATA);
  const failures = [];

  for (const meta of routeMeta) {
    try {
      const appHtml = render(meta.path);
      if (!appHtml || appHtml.trim().length < 250) throw new Error("Rendered application HTML is unexpectedly short");

      const canonical = canonicalUrl(meta.path);
      let html = template.replace(/<div id=\"root\"><\/div>/, `<div id=\"root\" data-rendering=\"static\">${appHtml}</div>`);
      if (!html.includes('data-rendering="static"')) throw new Error("Unable to inject static application HTML into #root");
      html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
      html = replaceMeta(html, "description", meta.description);
      html = replaceMeta(html, "og:title", meta.title, true);
      html = replaceMeta(html, "og:description", meta.description, true);
      html = replaceMeta(html, "og:url", canonical, true);
      html = replaceMeta(html, "twitter:title", meta.title);
      html = replaceMeta(html, "twitter:description", meta.description);
      html = html.replace(/<link rel=\"canonical\"[^>]*>/i, `<link rel=\"canonical\" href=\"${canonical}\" />`);
      if (!html.includes('rel="canonical"')) html = html.replace("</head>", `  <link rel=\"canonical\" href=\"${canonical}\" />\n</head>`);
      html = html.replace("</head>", `  <meta name=\"rendering\" content=\"static-prerendered\" />\n  <script type=\"application/ld+json\">${escapeJsonForHtml(documentSchema(meta, PUBLICATIONS_DATA))}</script>\n</head>`);

      const outputDirectory = path.join(distDir, meta.path === "/" ? "" : meta.path);
      fs.mkdirSync(outputDirectory, { recursive: true });
      fs.writeFileSync(path.join(outputDirectory, "index.html"), html, "utf8");
      console.log(`✓ Static HTML: ${meta.path}`);
    } catch (error) {
      failures.push({ path: meta.path, message: error instanceof Error ? error.message : String(error) });
      console.error(`✗ Static HTML: ${meta.path}`, error);
    }
  }

  fs.writeFileSync(path.join(distDir, "publications.json"), `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), publications }, null, 2)}\n`);
  fs.writeFileSync(path.join(distDir, "site-index.json"), `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), pages: routeMeta.map((meta) => ({ ...meta, url: canonicalUrl(meta.path) })) }, null, 2)}\n`);
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${routeMeta.map((meta) => `  <url><loc>${canonicalUrl(meta.path)}</loc><changefreq>${meta.path === "/" || meta.path === "/publications" ? "weekly" : "monthly"}</changefreq><priority>${meta.path === "/" ? "1.0" : meta.path === "/publications" || meta.path.startsWith("/publications/") ? "0.9" : "0.8"}</priority></url>`).join("\n")}\n</urlset>\n`);

  if (failures.length) throw new Error(`Failed to build ${failures.length} static route(s): ${failures.map((failure) => failure.path).join(", ")}`);
  console.log(`Static site complete: ${routeMeta.length} HTML routes, /publications.json, and /site-index.json.`);
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
