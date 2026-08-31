# Existing Website Content Inventory

## Purpose

Codex must complete this document after auditing the current repository.

Do not guess.

## Technical stack

- Framework:
- Language:
- Package manager:
- Build command:
- Development command:
- Test command:
- Lint command:
- Deployment platform:
- Data storage approach:

## Current routes

| Route | Purpose | Keep | Redesign | Redirect | Notes |
|---|---|---:|---:|---:|---|
| | | | | | |

## Existing content

### Portfolio

- Data source:
- Current value calculation:
- Return calculation:
- Holdings:
- Transaction history:
- Benchmark data:
- Duplicated values:
- Stale values:
- Tests:

### Journal and reviews

- Storage:
- Number of entries:
- Route pattern:
- Metadata:
- Search/filter capability:

### Letters

- Storage:
- Number:
- Route pattern:
- Metadata:

### Books

- Storage:
- Number:
- Notes format:
- Images:
- Ratings:
- Current reading state:

### Decision archive

- Storage:
- Route:
- Data completeness:

### Process

- Existing sections:
- Reusable content:

### Mistakes and lessons

- Existing content:
- Reusable content:

## Existing components

| Component | Location | Reuse | Refactor | Replace | Notes |
|---|---|---:|---:|---:|---|
| | | | | | |

## Existing assets

### Images

- Locations:
- Formats:
- Optimisation:
- Missing alt text:
- Personal photos available:

### Fonts

- Current fonts:
- Licensing:
- Performance:

## SEO and discovery

- Page titles:
- Meta descriptions:
- Canonicals:
- Open Graph:
- Structured data:
- Sitemap:
- Robots:
- AI-readable pages:
- Broken links:

## Accessibility

- Keyboard:
- Contrast:
- Heading structure:
- Reduced motion:
- Form labels:
- Alt text:
- Focus states:

## Performance

- Bundle issues:
- Image issues:
- Animation issues:
- Layout shift:
- Mobile performance:

## Stale or inconsistent content

List all hard-coded or conflicting values.

## Systems worth preserving

To be completed by Codex.

## Systems to retire

To be completed by Codex.

## Migration risks

To be completed by Codex.

---

## Repository audit findings — 13 July 2026

The findings below preserve the original inventory template above and record the state of the repository at audit time. No production-facing code was changed during this audit.

### Audit scope and repository state

- Audited the tracked application source, package/configuration files, scripts, structured data, public assets, source documents and an isolated production build.
- The V2 source pack was found in the adjacent `codie-website-v2-source-pack` folder rather than inside this repository. Its unchanged `AGENTS.md`, `FIRST_CODEX_PROMPT.md` and `docs/website-v2/` files were copied into this project so the requested documentation paths exist and future work receives the governing instructions.
- Pre-existing uncommitted changes were present in `public/sitemap.xml` and `src/pages/PlannedEntryDetail.tsx`. They were not altered by the audit. The sitemap change only advances every generated `lastmod` from 11 July to 12 July 2026; the page change is a user-owned layout/content edit.

### Technical stack

- Framework: React 18 single-page application using React Router 6 and Vite 6.
- Language: TypeScript/TSX with strict TypeScript settings; Node ESM scripts; one Python data-generation script and one Swift PDF-rendering utility.
- Styling: Tailwind CSS 3, PostCSS and Autoprefixer, plus global CSS.
- Package manager: npm with `package-lock.json` lockfile version 3.
- Installed direct runtime dependencies at audit time: React 18.3.1, React DOM 18.3.1, React Router DOM 6.30.4 and Lucide React 0.468.0. `@vitejs/plugin-react` is listed under `dependencies` even though it is build-time tooling.
- Installed direct development dependencies at audit time: TypeScript 5.9.3, Vite 6.4.3, Tailwind CSS 3.4.19, PostCSS 8.5.15, Autoprefixer 10.5.0 and React type packages.
- Development command: `npm run dev` -> `vite`.
- Production build: `npm run build` -> `tsc --noEmit`, regenerate the public AI archive/sitemap/robots files, run `vite build`, then generate static HTML for public routes.
- Preview command: `npm run preview` -> `vite preview`.
- AI archive command: `npm run build:ai` -> regenerate `public/ai`, `public/sitemap.xml` and `public/robots.txt`.
- Test command: none defined.
- Lint command/configuration: none defined.
- Deployment: README identifies Cloudflare Pages as preferred and Netlify as an alternative. There is no checked-in platform project configuration or CI workflow proving the active production target.
- Data storage: local TypeScript arrays/objects, generated TypeScript, source DOCX/HTML files, generated PDFs/PNGs/static HTML, and build-generated JSON/text/HTML. There is no database, CMS or API-backed content store.

### Build and generated-output behaviour

- `scripts/generate-ai-review.mjs` bundles `src/data/siteData.ts`, recreates `public/ai`, and rewrites the public sitemap and robots file. It uses hard-coded page inventories and some hard-coded update dates.
- Vite emits the client application and copies `public/` into `dist/`.
- `scripts/generate-static-routes.mjs` then creates route-specific HTML fallbacks, metadata, canonicals and generic JSON-LD in `dist/`.
- `scripts/generate-portfolio-performance.py` is not part of `npm run build`. It requires a private brokerage CSV path, a private baseline supplied at runtime and network market data, then rewrites the percentage-only `src/data/portfolioPerformance.generated.ts`.
- `scripts/render-pdf-pages.swift` is a manual utility for turning PDFs into page images; it is not called by the package scripts.
- The generated `dist/` is intentionally ignored by Git.

### Current route structure

| Route | Current purpose/behaviour | Migration disposition |
|---|---|---|
| `/` | Investment-led homepage with portfolio figures and performance charts | Replace as the V2 personal homepage only after preview approval; retain investing as a secondary gateway |
| `/start` | Client and generated static redirect to `/` | Retire only after confirming no external use; keep redirect |
| `/about` | Investment-only biography | Preserve URL and expand using verified V2 biography |
| `/books` | Nine-book library index | Preserve and refactor into the broader reading system |
| `/books/:slug` | Nine individual book reflections | Preserve slugs and content; add to sitemap |
| `/philosophy` | Investment philosophy | Preserve content; decide whether it remains an investing subpage or broadens |
| `/process` | Investment rules and checklists | Preserve as an investing subpage/system |
| `/journal` | Searchable/filterable archive of 20 investment entries | Preserve; likely present within Writing/Investing without breaking this URL initially |
| `/journal/:slug` | 20 individual journal entries | Preserve all slugs and readable text |
| `/letters` | One published investment letter | Preserve and allow broader writing categories |
| `/letters/:slug` | Published letter detail; unpublished/missing items redirect to `/letters` | Preserve existing slug |
| `/decision-archive` | Placeholder page; no full memos published | Keep as an honest placeholder or remove from navigation, but do not delete URL without redirect |
| `/decision-archive/:slug` | Route exists, but `PlannedEntryDetail` redirects all decision slugs back to the index | Do not treat the seven data records as published pages |
| `/mistakes-lessons` | Placeholder page; no full lesson notes published | Keep or merge later with an explicit redirect |
| `/mistakes-lessons/:slug` | Route exists, but redirects all lesson slugs back to the index | Do not treat the seven data records as published pages |
| `/portfolio` | Current snapshot, two performance histories, holdings, change log and roles | Preserve as a core investing route |
| `/current-portfolio` | Client-side redirect to `/portfolio`; no generated static redirect file | Add an actual platform/static redirect before relying on this legacy alias |
| `/disclaimer` | Investment/legal boundary | Preserve and keep prominent in Investing |
| `*` and generated `/404.html` | SPA not-found page and static 404 document | Refactor metadata/noindex behaviour |

Additional generated surfaces:

- AI archive: `/ai/`, `/ai/pages.html`, `/ai/portfolio.html`, `/ai/site-map-readable.html`, `/ai/site-content.json`, `/ai/all-content.txt`, 20 `/ai/journal/*.html` pages and five `/ai/research/*.html` pages.
- Original review documents: 17 HTML viewers, 17 PDFs and rendered PNG page sets under `/documents/weekly-summaries/`.
- `/review/` is a static review page with screenshots and is copied to production output.

### Portfolio, performance and holdings

- Manual current metadata and snapshot: `src/data/siteData.ts` (`latestPortfolioReview`, `portfolioSnapshot`, `transactionSummary`, `portfolioCrawlerNotes`).
- Holdings: `src/data/siteData.ts` contains 16 records: 13 treated by the UI as current and three closed.
- Change log: 11 entries in `portfolioChangeLog` in `src/data/siteData.ts`.
- Published performance history: the public derivative in `portfolioPerformance.generated.ts` contains daily and weekly percentage returns only. The former absolute `portfolioValueHistory` series was retired by the privacy refactor.
- Measured performance history: `src/data/portfolioPerformance.generated.ts`; currently 94 daily observations and 19 weekly observations from 3 March through 10 July 2026.
- Performance calculation: the Python generator replays deposits, buys, sells, dividends and interest from an external brokerage CSV; values remaining holdings at historical closes; converts currencies; adds cash privately; and publishes only percentage returns.
- Benchmark calculation: VUAG is used as a GBP accumulating S&P 500 proxy and normalised to the private baseline supplied at runtime. The generated public summary reports portfolio return, benchmark return, percentage-point difference and maximum drawdown only.
- Raw transaction source: the brokerage CSV and baseline are not stored in the repository. The generated percentage series therefore cannot be independently regenerated from repository contents alone.
- Transaction history is also narrated manually in holdings notes, the change log, journal bodies and source documents. There is no single structured transaction ledger committed to the site.
- Tests: no automated financial fixtures, reconciliation tests or tolerance checks exist.

#### Current financial inconsistencies requiring reconciliation

- The authored review and the benchmark-comparable ledger series use different valuation dates and methods; the UI must label each layer explicitly.
- `currentPortfolio.ts` is now the single public source for the latest authored review, rounded allocation and measured percentage performance.
- Absolute account, cash and starting values are intentionally absent from public portfolio pages and generated data.
- The holdings array marks Microsoft closed on 1 June and does not include the 8 July Microsoft holding described by the snapshot update note and transaction-ledger performance.
- The portfolio change log ends on 2 July and does not contain the 8 July Microsoft purchase.
- The homepage may show the latest authored percentage return and the benchmark-comparable chart together only when their different dates and methods are plainly labelled.
- `index.html` now has a timeless privacy-safe fallback and no manual account-value copy.

No financial figure was changed during this audit.

### Journal and reviews

- Canonical editable web data: `journalEntries` in `src/data/siteData.ts`.
- Count: 20 entries — 16 weekly reviews, one fortnightly review, one trade reflection, one market note and one lesson.
- Portfolio review documents: 17 source reviews (Weeks 1–16 and Week 18; no Week 17) in `source-documents/weekly-summaries/`, with corresponding PDFs, page images and HTML viewers in `public/documents/weekly-summaries/`.
- Week 18 uses an HTML preview as its source file; Weeks 1–16 use DOCX sources.
- Route pattern: `/journal/:slug`; AI copies use `/ai/journal/:slug.html`.
- Metadata: slug, title, date, category, excerpt, body, optional tags, major events, document viewer/PDF and page-image paths.
- Search/filter: client-side full-text search, category filters and up to 12 theme tags.
- Duplication: narrative text exists in source documents, `siteData.ts`, generated static route HTML, AI HTML, JSON and plain text. Generated derivatives are useful, but there is no automated DOCX-to-structured-content ingestion or drift check.

### Letters

- Count: one published letter, “My First Letter”, dated 24 June 2026.
- Body: `src/data/myFirstLetter.ts`; metadata: `plannedLetters` in `src/data/siteData.ts`; source: `source-documents/letters/My First Letter.docx`.
- Routes: `/letters` and `/letters/my-first-letter`.
- Metadata: slug, title, date, type, summary, themes, reading time, status and body.
- The body is manually duplicated between the source document and TypeScript; no conversion/reconciliation script exists.

### Books

- Storage: nine `readingDevelopment` records in `src/data/siteData.ts`.
- Content: slug, title, author, category string, image path/alt, reflection paragraphs and one takeaway.
- Images: nine raster covers in `public/book-covers/` are used. Eleven SVG book-art files are unused.
- Ratings: none.
- Reading status, finish date and “currently reading” state: none.
- Routes: `/books` and nine `/books/:slug` pages.
- The nine detail routes are generated as static HTML but omitted from the sitemap.

### Decision archive, process, mistakes and research

- Decision archive: seven planned structured records exist in `siteData.ts`, but the UI intentionally publishes no full memos and detail routes redirect to the index.
- Mistakes and lessons: seven planned structured records exist, but the UI intentionally publishes no full lesson pages and detail routes redirect.
- Process: reusable `processRules`, investment rules, checklists and explanatory page content exist. The active page includes seven rules plus “before buy” and “before sell” checklists hard-coded in JSX.
- Research: five structured research notes exist in `siteData.ts`; they are not exposed through a React research index/detail route, only through generated `/ai/research/*.html` pages.

### Hard-coded and duplicated information

- Site identity, domain, investment-led titles/descriptions and disclaimer language are repeated across `index.html`, `App.tsx`, `siteData.ts` and both generation scripts.
- Route inventories are separately maintained in React Router, the static-route generator, the AI generator/sitemap and multiple hand-written navigation lists.
- Navigation appears in `navLinks`, `footerLinks`, JSX arrays and static generator markup.
- Homepage, About, Philosophy, Process and Current Portfolio narrative sections are largely hard-coded in JSX rather than structured content.
- Public “current” data is centralised in `src/data/currentPortfolio.ts`; compatibility exports, components, static fallbacks and AI outputs derive from that percentage-only record. Authored review text is a separately dated content layer.
- Update dates in `generate-ai-review.mjs` are partly hard-coded, and `slugDate()` falls back to 22 June 2026 for unrecognised date formats.
- Colour/font styling is repeated between Tailwind/global CSS, `index.html`, the static route generator and the AI generator.
- The Cloudflare analytics token is hard-coded as a default in `Analytics.tsx` even though an environment variable is supported.
- Unused structured exports include `whatThisIs`, `currentFocus`, `startHere` and `weeklyChecklist`. Some other exports are only consumed by unused components or generation scripts.

### Components and systems to preserve

- React Router route structure and stable public slugs while migration mappings are designed.
- `PageHeader`, `SectionHeader`, Navbar, Footer and disclaimer components as functional starting points, with brand/content refactoring.
- Journal search, category/tag filtering, card extraction and previous/next navigation.
- Book index/detail and previous/next navigation.
- Holdings mobile cards plus desktop table; portfolio role grouping and change log.
- Performance generator and chart concept, but only after transaction inputs, dates and reconciliation are formalised.
- Source-document archive, PDFs and readable text; retain as historical evidence rather than deleting it.
- Static HTML fallback generation, route-level metadata/canonicals, security headers and AI-readable derivatives, after consolidating their route/content manifests.
- Skip link, visible focus styles, semantic tables, labelled search, minimum control sizes and the existing global `prefers-reduced-motion` rule.
- Cloudflare Web Analytics integration if the account/token and privacy policy remain approved.

### Components and systems to refactor

- Split `siteData.ts` into typed domain datasets with one authoritative current-status/portfolio record and explicit generated derivatives.
- Create one route/content manifest shared by React routing, static rendering, sitemap, metadata and AI outputs.
- Lazy-load route modules and avoid shipping every journal body, book reflection and page component in the initial JavaScript bundle.
- Render readable journal text alongside optional document previews; do not replace article text with page images.
- Make financial as-of dates first-class and distinguish “latest published review” from “latest ledger valuation”.
- Replace hard-coded page metadata with typed content metadata; add correct Person/WebSite/Article/Breadcrumb structured data where factual inputs are available.
- Refactor the mobile navigation for Escape handling, focus management/trapping, focus return and background scroll lock.
- Give chart frequency controls a proper group label and pressed/selected state; provide an accessible data/table alternative.
- Centralise V2 identity, editable homepage features, Now, work, projects, timeline, travel, goals and verification state.

### Systems to retire or quarantine

- Unused components: `Hero`, `CTASection`, `PrinciplesGrid`, `StartHere` and `WeeklySummariesRail`, unless deliberately selected for V2 reuse.
- Unused assets: `src/assets/research-hero.png`, the effectively unused `portfolio-desk-hero.png`, and 11 unused SVG book-art files, only after ownership and future-use review.
- Investment-led source fallback copy in `index.html` once the static rendering pipeline has a single data source.
- Planned detail routes that can never render content should not remain discoverable as apparent pages; keep redirects until a final URL plan exists.
- The public `/review/` artefact should be removed from production output or explicitly protected if it is only an internal review tool.
- Duplicate AI pages should be noindexed or canonicalised to public equivalents unless there is a confirmed reason to index them independently.

### SEO and discovery audit

- Page titles/descriptions: route-aware client metadata exists for main pages, journals, letters and books. Static builds also inject route-specific metadata.
- Canonicals: client code updates a single canonical on navigation; generated route HTML sets apex-domain canonicals without trailing slashes except `/`.
- Open Graph/Twitter: title, description, URL and basic card type exist; no social image metadata exists. Journal/book pages remain `og:type=website` in client metadata.
- Structured data: generated public routes receive generic `WebPage` JSON-LD, with book/letter/journal details using `Article`; AI pages receive generic `WebPage`. There is no Person, author, publication date, breadcrumb or richer WebSite graph. JSON-LD is injected into static HTML but is not updated during client-side navigation, so it can become stale after SPA route changes.
- Sitemap: valid XML, regenerated with the build date as `lastmod` for every URL. It omits `/philosophy`, `/decision-archive`, `/mistakes-lessons` and all nine book detail routes. It includes AI duplicates, JSON and plain-text resources as indexable URLs.
- Robots: allows all crawling and points to the sitemap.
- AI-readable pages: extensive and useful for machine access, but they reproduce public content under separately canonicalised/indexable URLs, increasing duplicate-content and maintenance risk.
- 404 behaviour: generated `404.html` canonicalises to `/404` but is not marked `noindex`. Unknown SPA paths use default homepage metadata and a self-referencing canonical rather than explicit 404/noindex metadata.
- Redirects: `/start` receives a generated redirect. `/current-portfolio` only redirects after the SPA loads and has no generated route. `public/_redirects` is empty despite the README saying it preserves React Router refreshes.
- Link check: the isolated generated build contained no missing internal `href`/`src` targets. There are no public external editorial links to validate. Production host redirect behaviour was not tested because no deployment was performed.

### Accessibility audit

- Positive foundations: semantic landmarks on pages, heading structure is generally sequential, labelled search, table captions/headers, alt attributes on all React images, visible global focus outline, skip link, and reduced-motion handling.
- The skip link targets a wrapper `div` rather than the routed `<main>` and the target is not programmatically focusable; browser behaviour should be standardised.
- Mobile navigation lacks Escape-to-close, focus trapping/return and page scroll lock. Hidden links are removed from tab order, which is positive.
- The journal detail page suppresses readable body text whenever rendered document pages exist. Page-image alt text only says “page N”, so most weekly review content is inaccessible to screen readers despite text existing in `siteData.ts` and AI pages.
- Chart toggles lack `aria-pressed`/radio semantics; the containing `div` has an `aria-label` without an applicable widget role. Charts provide only a summary image label and no complete accessible data alternative.
- Book image alt text is generic (“book image/cover”) and should be reviewed for useful, non-duplicative descriptions.
- Colour is usually accompanied by signed figures or labels, but formal contrast testing has not been configured or run.
- There are no contact forms yet. The journal search has an accessible label.
- Two reading-progress components render on letter detail pages (global and local), which is redundant even though both are hidden from assistive technology.

### Mobile-layout audit

- Tailwind breakpoints and mobile card alternatives are used consistently; desktop holdings tables scroll or switch to cards.
- The mobile navigation is scrollable for short viewports.
- The homepage starts at a 4.35rem heading on the 320px minimum viewport and clips overflow at the page/section level. This is a credible narrow-screen truncation risk and requires 320px visual testing.
- Large rendered journal pages are scaled to viewport width, but their text becomes difficult to read on phones and users must load multiple large images.
- No automated viewport screenshot/regression suite exists. Existing screenshots in `public/review/screenshots/` are static evidence, not a test system.

### Performance audit

- Isolated production output: JavaScript 396.47 kB minified/116.82 kB gzip; CSS 32.50 kB/6.83 kB gzip; 193 generated files; about 30 MB total output.
- All route components and the 128 kB `siteData.ts` dataset are eagerly imported into one client bundle. There is no route-level code splitting.
- `public/` is about 23 MB, dominated by 17 PDFs and many rendered page PNGs. Week 18 page images are individually about 0.8–1.5 MB.
- The first page image of a journal document is eagerly loaded and later pages are lazy-loaded. The images lack explicit dimensions/aspect ratios, creating layout-shift risk as lazy pages load.
- Images have no `srcset`/`sizes` or modern WebP/AVIF variants.
- Two unused source hero PNGs total about 3.9 MB; they are not currently emitted into the Vite asset bundle because their components are unused.
- Fonts are loaded via a Google Fonts CSS `@import`, adding an external render-path dependency. README font names are stale: it says Cormorant Garamond/Inter, while the application uses Newsreader/Manrope/IBM Plex Mono.
- Cloudflare analytics loads after mount in production. It is lightweight relative to the content bundle but still a third-party request.
- Motion is modest and the global reduced-motion media query effectively shortens animations/transitions.

### Stale, broken or inconsistent content

- Financial discrepancies listed above are the highest-risk stale content.
- README font documentation is incorrect.
- README claims `public/_redirects` preserves React Router refreshes, but the file is empty.
- The source `index.html` fallback still names Week 16 while application data is through 10 July.
- Static and AI generator route inventories disagree, causing sitemap omissions.
- AI `lastUpdated` values and date parsing include hard-coded values that can drift from content.
- Decision/mistake datasets imply seven records each, while the public pages correctly say no full entries are published; these must not be accidentally surfaced as completed work.
- Five research notes exist only in the AI archive, with no human-facing public research route.
- No missing internal targets were found in the isolated built HTML. `/current-portfolio` remains unsafe as a direct request because only the client router knows the redirect.

### Validation results

- `npm run build`: passed in an isolated copy. This passed strict TypeScript checking, AI/archive generation, Vite production compilation and static-route generation.
- Vite transformed 1,613 modules successfully.
- Generated sitemap: valid XML according to `xmllint`.
- Generated HTML internal link/asset crawl: no missing local targets.
- `npm ls --depth=0`: passed; installed direct dependency tree is satisfied.
- Lint: not run because no lint script or configuration exists.
- Tests: not run because no test script, test runner or test files exist.
- The exact build was isolated because running it in the working tree rewrites tracked AI/sitemap/robots outputs and would overwrite the user-owned uncommitted sitemap state.

## V2 preview implementation inventory — 13 July 2026

The contained V2 preview now lives at `/v2-preview`. It is intentionally excluded from the sitemap and production navigation and is marked `noindex, follow` in both client metadata and generated static HTML.

Its structured source is `src/data/v2Content.ts`. The preview currently contains:

- the verified Codie Marillier identity, Zimbabwe origin and current England context;
- interests and the documented accountability purpose;
- the two currently rendered selected work stories, while the removed marquee/event-installation record remains preserved in structured data;
- Codie Capital Research, Website V2, horsebox conversion and Zimbabwe property-access project cards with explicit verification/status language;
- Cambodia as the only featured travel story, using Dara's first name only;
- links into the preserved portfolio, journal, letters, decision archive and book library;
- a dated Now snapshot;
- the explicitly approved email and Instagram contact destinations.

No personal photography is used. Private employer/estate names, exact locations, unverified dates and the travel-country count remain withheld. The horsebox legal name and approved contact details were confirmed after this initial inventory snapshot and are recorded in the update below. Existing investment content and routes are unchanged by the preview.

### Project destination update — 13 July 2026

The Projects preview now includes two contained, noindex detail destinations:

- `/v2-preview/capital-research` starts with the published first letter, presents 17 weekly/fortnightly portfolio reviews in an accessible horizontal rail, separates the three standalone lesson/market/trade pieces, and then links to the preserved portfolio, process, decision archive, mistakes, letters and books routes;
- `/v2-preview/projects/horsebox-conversion` expands the verified horsebox project record under the confirmed legal name **O and C Cotswolds Trailers Ltd** and keeps the current operating status unpublished pending confirmation.

The Projects overview links to both destinations. The approved contact details now used throughout the V2 preview are `codieandrew2609@gmail.com` and `@codiemarillier`. The marquee/event-installation record remains preserved in structured data but is no longer rendered on the Work page following Codie's review.

### Local release-candidate inventory — 13 July 2026

- Nine noindex V2 routes are generated with readable static fallbacks, route-correct canonicals and valid JSON-LD.
- The six main personal pages retain one visible H1, sequential heading structure, labelled navigation and previous/next page links.
- Codie Capital Research begins with the published first letter, then 17 chronological portfolio reviews and three separately labelled notes/reflections.
- The horsebox page uses the confirmed legal name **O and C Cotswolds Trailers Ltd**.
- The V2 homepage renders only the two work records retained in Codie's current edit; the marquee record is not deleted.
- All 30 dynamic journal, letter and book routes pass the 320px smoke test without page-level overflow or missing image alternatives.
- The preserved `/philosophy` grid was corrected so long headings no longer force horizontal overflow.
- Automated content validation now enforces V2 route isolation, project-detail route coverage, the current featured-work edit and the confirmed horsebox name.

### Horsebox photography update — 14 July 2026

- Four photographs supplied by Codie are now used on the horsebox project page: three exterior views of the blue horsebox and the newest renovation-progress interior view.
- Responsive 720px and 1200px JPEG derivatives live in `public/images/horsebox/`; the page declares dimensions, responsive sources, captions, alternative text and lazy loading after the lead image.
- Codie confirmed that the project includes another horsebox that is still being renovated. This confirms ongoing physical work but does not by itself resolve the company's formal operating status.

### Travel photography update — 14 July 2026

- Codie supplied and identified four travel photographs for the contained preview: Angkor Wat in Cambodia, two photographs from the period pursuing yacht work in the south of France, and one photograph overlooking Monaco harbour.
- Responsive JPEG derivatives live in `public/images/travel/`. The Cambodia photograph is used on the V2 homepage and Travel page; all four appear on the Travel page with captions, alternative text, intrinsic dimensions and responsive sources.
- The source files do not expose usable capture dates or GPS metadata. The implementation therefore does not publish exact dates, yacht names or more specific harbour locations than Codie confirmed.

### Monthly portfolio-review migration — 17 July 2026

- Codie supplied four authored reviews covering Weeks 1–4, 5–8, 9–12 and 13–16 and confirmed that this grouped format should replace the visible week-by-week journal cadence.
- The public journal now contains four `Monthly Reviews` plus the three existing standalone lesson, market-note and trade-reflection entries.
- The 17 earlier weekly/fortnightly records remain preserved in `archive/portfolio-journal/legacy-weekly-reviews.json`, with their source documents, PDFs, viewers and page images retained as historical evidence. They are no longer listed in the public journal or V2 capital-research rail.
- Every former `/journal/week-*-portfolio-summary` route has an explicit migration destination. Weeks 1–16 redirect to their corresponding grouped review; Week 18 redirects to `/journal` because it is not covered by the supplied four documents.
- The four supplied DOCX files are retained in `source-documents/monthly-reviews/`. Generated website text lives in `src/data/monthlyPortfolioReviews.generated.ts`; PDFs, rendered pages and viewers live in `public/documents/portfolio-reviews/`.
- Portfolio calculations, transaction-ledger performance, holdings and historical value points were not regenerated or altered by this content migration.

### Monthly portfolio-review update — 6 August 2026

- Review 05 covers 3 July–3 August 2026 and publishes the updated 6 August since-inception return of +0.52% without the underlying account value.
- It is the newest `Monthly Reviews` entry in the public journal and V2 capital-research gateway; Reviews 01–04 remain unchanged and discoverable.
- The separate transaction-ledger performance dataset was not regenerated or altered.
