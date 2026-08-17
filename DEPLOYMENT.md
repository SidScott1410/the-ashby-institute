# Deployment and GitHub Transfer Guide

## What the repository contains

This repository is a source-control export of the live The Ashby Institute website. It includes the React application, static-generation workflow, sitemap and robots configuration, local icons, social image, and the locked dependency graph in `pnpm-lock.yaml`.

The production build is reproducible with:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

The `pnpm build` command produces a server-rendered static site in `dist/public/`. All 13 public routes are written as individual HTML documents, so crawlers can read publication text without executing JavaScript.

## GitHub transfer

The preferred transfer route is the project Management UI: open **Settings → GitHub**, choose the GitHub owner, repository name, and visibility, then select the current checkpoint. This creates a GitHub repository from the source project without copying local dependency folders, build output, logs, or deployment metadata.

Before exporting, use the latest checkpoint associated with the canonical-tag fixes. The project uses the `main` branch and includes the source, lockfile, `.gitignore`, and repository documentation required to continue development elsewhere.

## Static hosting

For static hosting providers, build the project and publish **only** `dist/public/`.

| Setting | Value |
|---|---|
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Publish directory | `dist/public` |
| Node version | 22.x |
| Package manager | pnpm 10.x |

Because known routes are prerendered, direct requests for the website's current public URLs resolve to their respective `index.html` files. If new client-side routes are added, they must also be added to `routes` in `prerender.mjs` and to `client/public/sitemap.xml`.

## Node-compatible hosting

For a Node-compatible service, build and run the generated Express server:

```bash
pnpm install --frozen-lockfile
pnpm build
NODE_ENV=production pnpm start
```

The server uses `PORT` when present and otherwise listens on port `3000`.

## Asset migration

The application uses `/manus-storage/` root-relative paths for the Via Negativa PDF, Compute 2030 PDF, the reading-edition figures, and Chakra Petch font files. Those assets are now included in `client/public/manus-storage/`, which Vite copies into `dist/public/manus-storage/` during every build.

The repository is therefore self-contained for standalone static hosting. Confirm that publication and font licences allow the intended distribution before publishing copied assets.

## Custom domain and indexing

The canonical production origin is `https://theashbyinstitute.org` — not the `www` hostname. Ensure that every domain variant redirects consistently to the canonical host. Do not add `www` to canonical tags unless `www.theashbyinstitute.org` has an active DNS record and an intentional redirect policy.

After deployment, verify the following URLs return HTTP 200 and have a route-specific canonical tag:

| URL | Expected canonical |
|---|---|
| `https://theashbyinstitute.org/` | `https://theashbyinstitute.org/` |
| `https://theashbyinstitute.org/about` | `https://theashbyinstitute.org/about` |
| `https://theashbyinstitute.org/publications/via-negativa` | `https://theashbyinstitute.org/publications/via-negativa` |
| `https://theashbyinstitute.org/publications/via-negativa/read` | `https://theashbyinstitute.org/publications/via-negativa/read` |

Then resubmit `https://theashbyinstitute.org/sitemap.xml` in Google Search Console. The sitemap is referenced in `robots.txt` and contains every current public route.

## GitHub Pages migration

The repository's `.github/workflows/pages.yml` workflow deploys `dist/public/` to GitHub Pages after a successful push to `main`. The workflow also supports manual deployment from the Actions tab. The custom-domain marker file is `client/public/CNAME`; it specifies `theashbyinstitute.org`.

GitHub Pages custom domains must also be configured in the repository's **Settings → Pages** panel (or through the GitHub API). After the first successful Pages deployment, change the apex-domain DNS records at the domain registrar to the records GitHub supplies and configure `www` as a redirect or CNAME according to GitHub's domain instructions. Do not cancel the current host until the Pages URL, apex domain, HTTPS certificate, asset files, and every sitemap route have been checked.
