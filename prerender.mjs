/**
 * prerender.mjs
 *
 * Post-build SSG script. Runs after `vite build` to inject pre-rendered React HTML
 * into each route's index.html, making all text visible to crawlers on first byte.
 *
 * Usage: node prerender.mjs  (called automatically from the build script)
 *
 * How it works:
 * 1. Reads the built dist/public/index.html shell
 * 2. Imports the SSR entry bundle (built separately via vite build --ssr)
 * 3. For each route, calls render(url) → renderToString output
 * 4. Injects the HTML into <div id="root">...</div>
 * 5. Injects a per-route <link rel="canonical"> into <head>
 * 6. Writes the result to dist/public/<route>/index.html
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The client build (vite build) outputs to <project-root>/dist/public/
// The SSR build (vite build --ssr) outputs to <project-root>/client/dist/server/
const distDir = path.resolve(__dirname, "dist/public");
const ssrBundle = path.resolve(__dirname, "client/dist/server/entry-server.js");

const BASE_URL = "https://theashbyinstitute.org";

// All routes to prerender
const routes = [
  "/",
  "/research",
  "/theory",
  "/fellows",
  "/publications",
  "/publications/via-negativa",
  "/publications/via-negativa/read",
  "/publications/compute-2030-four-scenarios",
  "/publications/variety-deficits-ai-governance",
  "/publications/compute-export-controls-grt",
  "/events",
  "/about",
  "/contact",
];

async function prerender() {
  // Check that the SSR bundle exists
  if (!fs.existsSync(ssrBundle)) {
    console.error(`SSR bundle not found at ${ssrBundle}`);
    console.error("Run: vite build --ssr client/src/entry-server.tsx --outDir dist/server first");
    process.exit(1);
  }

  // Read the base HTML shell
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error(`Built index.html not found at ${templatePath}`);
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, "utf-8");

  // Import the SSR render function
  const { render } = await import(ssrBundle);

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      // Render the route to HTML string
      const appHtml = render(route);

      // Build the canonical URL for this route
      const canonicalUrl = route === "/" ? BASE_URL + "/" : BASE_URL + route;

      // Inject into the root div
      let html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Replace the generic homepage canonical with a per-route one.
      // The base index.html has: <link rel="canonical" href="https://theashbyinstitute.org" />
      // We replace it with the correct URL for this specific route.
      if (html.includes('rel="canonical"')) {
        html = html.replace(
          /<link rel="canonical"[^>]*>/,
          `<link rel="canonical" href="${canonicalUrl}" />`
        );
      } else {
        // Fallback: inject before </head> if no canonical exists
        html = html.replace(
          "</head>",
          `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
        );
      }

      // Determine output path
      const routePath = route === "/" ? "" : route;
      const outDir = path.join(distDir, routePath);
      const outFile = path.join(outDir, "index.html");

      // Create directory if needed
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      // Write the pre-rendered HTML
      fs.writeFileSync(outFile, html, "utf-8");
      console.log(`✓ Pre-rendered: ${route} → ${path.relative(__dirname, outFile)}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Failed to pre-render: ${route}`);
      console.error(err.message);
      errorCount++;
    }
  }

  console.log(`\nPrerender complete: ${successCount} succeeded, ${errorCount} failed`);
  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender();
