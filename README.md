# Codie Marillier

A modern personal website for Codie Marillier. Codie Capital Research remains the investing sub-brand and public research journal.

The site is intentionally positioned as an educational and journalistic personal investing record. It does not solicit capital, manage money for other people, offer personalised financial advice, or present Codie as an authorised investment manager.

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server will print a local URL, usually `http://localhost:5173`.

The contained Website V2 local release candidate is available at `/v2-preview`. It is excluded from the sitemap and marked noindex; it does not replace the current investment-led homepage.

The preview navigation also includes separate noindex pages at `/v2-preview/about`, `/v2-preview/work`, `/v2-preview/projects`, `/v2-preview/writing`, `/v2-preview/travel` and `/v2-preview/now`.

Project destinations are available at `/v2-preview/capital-research` and `/v2-preview/projects/horsebox-conversion`.

## Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the content, portfolio-replay and TypeScript validation without producing a build:

```bash
npm run validate
```

Run the automated tests and content-integrity checks:

```bash
npm test
```

The production build also validates generated routes, internal targets, sitemap/noindex policy and gzip budgets for the application entry, stylesheet and long-form data chunk.

## Edit site content

The public portfolio source of truth is:

```text
src/data/currentPortfolio.ts
```

It contains only percentage performance, rounded allocation weights, holdings, research roles and decisions. Personal balances, starting capital, exact cash, quantities, monetary profit and loss, contributions and income are not public data.

Most other content is data-driven in:

```text
src/data/siteData.ts
```

Website V2 biography, work, projects, travel, Now and approved contact content is centralised in:

```text
src/data/v2Content.ts
```

The privacy-safe monthly review narratives are generated into:

```text
src/data/monthlyPortfolioReviews.generated.ts
```

The authored Word files are intentionally stored outside the deployable repository. To regenerate the readable records, provide their private directory explicitly:

```bash
npm run content:portfolio-reviews -- /absolute/path/to/monthly-reviews
```

The importer removes personal ledger facts and does not generate document downloads. Superseded weekly/fortnightly originals are preserved in a private archive outside the repository; all 17 old routes continue to redirect to the five monthly reviews.

Edit this file to update:

- Navigation links
- Public portfolio performance and allocation
- Holdings research records
- Standalone journal entries
- Research notes
- Letters
- Principles
- Rulebook items
- Disclaimer points

## Edit pages and components

Reusable components live in:

```text
src/components/
```

Route pages live in:

```text
src/pages/
```

The main router is:

```text
src/App.tsx
```

## Analytics

The site includes Cloudflare Web Analytics using the token for `codiemarillier.com`.

If the Cloudflare Web Analytics site is recreated later, the token can be overridden with this Vite environment variable:

```text
VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your-cloudflare-token
```

For Cloudflare Pages, add that variable in the Pages project settings, then redeploy. Leave `VITE_ANALYTICS_ENABLE_DEV=false` locally unless you specifically want to test analytics on the dev server.

Cloudflare Web Analytics is the preferred option for this site because it can show page views, popular pages, referrers, countries, devices, browsers, and performance data without adding heavier ad-style tracking.

## Edit colours and fonts

Tailwind theme values are in:

```text
tailwind.config.js
```

Global styles and Google Font imports are in:

```text
src/styles/index.css
```

The current typography uses Newsreader for editorial headings, Manrope for body copy, and IBM Plex Mono for technical labels.

## Hero image

The generated editorial hero asset is stored at:

```text
src/assets/research-hero.png
```

Replace that file or update the import in `src/components/Hero.tsx` to change the hero visual.

## Deploy to Cloudflare Pages

This is the preferred deployment target for `codiemarillier.com`.

1. Push the project to a Git repository.
2. In Cloudflare, open **Workers & Pages**.
3. Create a new **Pages** project and connect the repository.
4. Use these build settings:
   - Framework preset: `Vite` or `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank unless this project sits inside a larger repo
5. Deploy the project.
6. In the Pages project, open **Custom domains** and add:
   - `codiemarillier.com`
   - `www.codiemarillier.com`

The production build generates static HTML for known React Router routes and legacy redirects, while `public/_headers` adds basic production security/cache headers. `public/_redirects` is currently empty and reserved for any future platform-level redirect rules.

## Deploy to Netlify

1. Push the project to a Git repository.
2. In Netlify, create a new site from the repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

For React Router refresh support on Netlify, add this redirect if needed:

```text
/* /index.html 200
```

That can be placed in a `public/_redirects` file.
