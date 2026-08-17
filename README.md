# The Ashby Institute

This repository contains the frontend for [The Ashby Institute](https://theashbyinstitute.org), an independent research institute focused on compute governance and AI regulatory design. It is a React 19 and Vite 7 website with static generation for every public route.

> **Current production domain:** `https://theashbyinstitute.org`

## Local development

The project uses Node.js 22 and pnpm. Install dependencies from the committed lockfile, then start the Vite development server.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The local development server runs at `http://localhost:3000` by default. Type-check the project with `pnpm check`.

## Production build and SSR prerendering

The production build command creates the browser bundle, builds the server-side React entry point, prerenders every public route to static HTML, and bundles the small Express server used for production hosting.

```bash
pnpm build
pnpm start
```

The resulting static files live in `dist/public/`. The build currently prerenders these routes:

| Area | Routes |
|---|---|
| Institute | `/`, `/research`, `/theory`, `/fellows`, `/events`, `/about`, `/contact` |
| Publications | `/publications`, `/publications/via-negativa`, `/publications/compute-2030-four-scenarios`, `/publications/variety-deficits-ai-governance`, `/publications/compute-export-controls-grt` |
| Long-form edition | `/publications/via-negativa/read` |

Each generated HTML file receives a route-specific canonical URL rooted at `https://theashbyinstitute.org`. This is handled by [`prerender.mjs`](./prerender.mjs) and is important for search indexing.

## Project structure

| Path | Responsibility |
|---|---|
| `client/src/pages/` | Public pages, including the Via Negativa reading edition. |
| `client/src/components/` | Shared layout, navigation, visualisation, and UI primitives. |
| `client/src/lib/publications.ts` | Structured publication metadata and page content. |
| `client/src/entry-server.tsx` | React server-rendering entry point. |
| `prerender.mjs` | Static HTML generation and per-route canonical injection. |
| `client/public/` | Small local public assets, robots.txt, sitemap.xml, favicon assets, and social image. |
| `server/index.ts` | Lightweight Express static-file server for Node-compatible hosting. |

## Asset hosting

The website serves research figures, papers, and the Chakra Petch font family from `client/public/manus-storage/`. They are included in this repository, so the application can run independently of managed storage or a vendor-specific asset proxy.

The source uses root-relative paths such as `/manus-storage/IMG_9248_7900ab5d.png`. Vite copies the complete directory to the production output unchanged, so these paths work on GitHub Pages and other root-domain static hosts without component-level changes.

## SEO files

The primary search files are [`client/public/robots.txt`](./client/public/robots.txt) and [`client/public/sitemap.xml`](./client/public/sitemap.xml). The sitemap lists every currently prerendered public route. After a production deployment, submit `https://theashbyinstitute.org/sitemap.xml` in Google Search Console and request indexing for priority publication URLs.

## Deployment notes

The source code can be hosted through a Node-compatible host using `pnpm build` and `pnpm start`. A static host can deploy `dist/public/`, which already contains fully prerendered pages for every public route. The repository includes GitHub Actions workflows for continuous integration and GitHub Pages deployment. Review [DEPLOYMENT.md](./DEPLOYMENT.md) before changing hosts or custom-domain DNS.

## License

The repository's code is released under the [MIT License](./LICENSE). Research papers, figures, trademarks, and other institute content remain subject to their respective rights and publication terms.
