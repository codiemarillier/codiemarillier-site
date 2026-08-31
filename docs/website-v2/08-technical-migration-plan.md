# Technical Migration Plan

This is the recommended plan before the repository audit.

Codex must update it after inspecting the current codebase.

## Strategy

Continue with the existing website project.

Treat Version 2 as a controlled redesign and architectural expansion, not a total deletion and rebuild.

## Why preserve the existing project

The current site already contains valuable systems:

- portfolio data;
- performance calculations;
- investment journal;
- letters;
- decision archive;
- process;
- mistakes and lessons;
- book notes;
- SEO foundations;
- structured content;
- AI-readable content.

These should be migrated into the broader personal website.

## Phase 1 — Audit

Before editing production pages:

- inspect the entire repository;
- map all routes;
- identify data sources;
- identify hard-coded values;
- run tests, lint and build;
- document broken or stale content;
- identify reusable components;
- complete `06-content-inventory.md`.

## Phase 2 — Content architecture

Create or confirm structured data models for:

- site identity;
- Now page;
- work experiences;
- projects;
- timeline;
- travel;
- books;
- writing;
- investing;
- goals;
- homepage featured content.

Avoid duplicating the same value across multiple files.

## Phase 3 — Design system prototype

Build and review:

- colours;
- typography;
- spacing;
- navigation;
- cards;
- buttons;
- image treatment;
- motion;
- page transitions;
- mobile menu;
- reduced-motion behaviour.

Do not redesign every page before this is approved.

## Phase 4 — V2 preview

Build a contained preview containing:

- global navigation;
- homepage;
- About preview;
- selected work;
- current projects;
- Zimbabwe section;
- travel preview;
- investing gateway;
- Now preview;
- footer.

Review whether it genuinely feels like Codie.

## Phase 5 — Personal sections

Build:

- About;
- Work;
- Projects;
- Timeline;
- Travel;
- Now;
- Contact.

## Phase 6 — Content migration

Migrate and redesign:

- Writing;
- Books;
- Investing;
- Portfolio;
- Journal;
- Letters;
- Decision Archive;
- Process;
- Mistakes and Lessons.

## Phase 7 — URL and SEO migration

- preserve old routes where sensible;
- create redirects where routes change;
- maintain canonicals;
- update sitemap;
- update structured data;
- update Open Graph;
- maintain AI-readable content;
- test all links.

## Phase 8 — Verification

### Content

- names;
- dates;
- claims;
- captions;
- portfolio values;
- work status;
- project status;
- disclaimers.

### Technical

- mobile;
- desktop;
- keyboard;
- reduced motion;
- forms;
- build;
- lint;
- tests;
- performance;
- metadata;
- redirects;
- analytics.

## Phase 9 — Launch

Launch only with explicit approval.

Keep a rollback path to the current production site.

## Recommended development practice for a beginner

If Git is already configured, use a V2 branch.

If Codie does not know Git, Codex should:

1. inspect whether Git exists;
2. explain the current state in plain language;
3. create a safe branch only if appropriate;
4. avoid destructive commands;
5. never force-push;
6. show the exact preview path or local command;
7. keep a clear backup or checkpoint before major changes.

Codie should not need to learn advanced Git commands before the first audit.

---

## Post-audit migration plan — 13 July 2026

The original phase plan above remains directionally correct. The repository audit adds the following sequencing, controls and acceptance criteria.

### Architecture decision

Continue with the existing React/Vite application. A framework replacement is not justified by the current requirements. The safest path is to preserve the working investment archive, add typed content modules and a shared route manifest, and build V2 behind a contained preview before changing the public homepage.

The static fallback and AI-readable systems are valuable, but their separate hard-coded inventories must become outputs of the same content and route definitions used by the application.

### Phase 0 — Protect and reconcile the current record

No redesign should begin until this phase is complete.

1. Confirm the existing uncommitted changes and create a V2 working branch/checkpoint only with approval.
2. Define which artefacts are authoritative inputs versus generated derivatives.
3. Reconcile the authored review return with the 10 July benchmark-comparable ledger return, keeping the different dates and methods explicit and all absolute values private.
4. Confirm the 8 July Microsoft transaction and update holdings/change-log facts only from evidence.
5. Preserve the raw transaction export or a privacy-safe reproducible fixture outside the public bundle, with documented access and retention rules.
6. Add financial reconciliation tests before moving or restyling portfolio data.
7. Record ownership/licensing for book covers, generated hero art, source documents and future photographs.

Acceptance criteria:

- every displayed portfolio number has one source, one as-of date and a documented derivation;
- published-review values and live/ledger estimates are visibly distinct;
- no financial calculation has changed without a fixture and reviewed expected result;
- all existing public slugs and source documents have an inventory/backup.

### Phase 1 — Content and route foundations

Create typed, domain-specific content modules without changing public layouts:

- `siteIdentity` and approved contact settings;
- `now`;
- `workExperiences`;
- `projects` with verification/privacy state;
- `timeline`;
- `travelStories`;
- `books`;
- `writing` metadata and bodies;
- `investing` portfolio/reviews/holdings/transactions;
- `goals`;
- homepage featured-content references.

Move data incrementally out of the 1,733-line `siteData.ts` behind compatibility exports/adapters so existing pages continue to render during migration. Do not perform a large one-step content rewrite.

Create one route manifest containing path, title, description, canonical/indexing policy, content type, sitemap inclusion, legacy aliases and static-render behaviour. Use it for:

- React routes/navigation;
- static HTML generation;
- sitemap generation;
- redirects;
- metadata and structured data;
- AI-readable outputs.

Acceptance criteria:

- existing pages render the same factual content through adapters;
- one route addition/removal updates all discovery outputs;
- type checks and content-integrity tests catch duplicate slugs, missing related records and missing assets.

### Phase 2 — Technical baseline improvements

Before visual expansion:

1. Add ESLint and a test runner appropriate to the existing Vite/React stack.
2. Add tests for transaction replay, currency conversion, benchmark normalisation, current-holding reconciliation, sitemap coverage and redirect coverage.
3. Lazy-load route components and separate long-form content from the initial bundle.
4. Keep readable journal HTML in the DOM and make document previews optional enhancements.
5. Add accessible chart data and correct toggle semantics.
6. Fix mobile-menu keyboard/focus behaviour and the skip-link target.
7. Self-host/subset approved fonts if licensing permits, and define responsive image handling.
8. Move the analytics token to deployment configuration only if the existing account is approved for V2.

Acceptance criteria:

- initial bundle no longer contains every journal/book body;
- weekly reviews are usable without images or PDF support;
- keyboard and reduced-motion checks pass;
- direct requests to every retained alias work without requiring client JavaScript.

### Phase 3 — Design-system prototype

Build the V2 tokens and components in an isolated, noindex preview route or separate preview build. Do not replace production pages in this phase.

Prototype:

- Codie Marillier identity lockup;
- dark/off-black palette and accessible contrast pairs;
- typography/spacing/layout primitives;
- primary navigation and mobile menu;
- cards, buttons, editorial text and image treatment;
- restrained motion plus reduced-motion alternatives;
- an Investing sub-brand treatment for Codie Capital Research;
- performance charts within the shared V2 visual system.

Use real approved content or explicit placeholders. Do not invent biography, project outcomes, dates, contact details or photographs.

### Phase 4 — Contained V2 preview

Build a reviewable preview with:

- personal homepage led by “Codie Marillier”, not portfolio values;
- short approved introduction;
- selected verified work/projects;
- Zimbabwe narrative anchor;
- travel, writing, books and investing gateways;
- Now preview and footer/contact treatment.

Keep the current public homepage and investment routes unchanged until content, privacy, mobile and visual review are complete.

Acceptance criteria:

- the preview answers “Who is Codie Marillier?” before “How does Codie invest?”;
- no unverified claim is rendered as public fact;
- 320px mobile, keyboard, reduced motion and low-bandwidth behaviour are reviewed;
- review artefacts are not indexable or accidentally included in production navigation/sitemap.

### Phase 5 — Personal sections

Build About, Work, Projects, Travel, Timeline, Now and Contact from approved structured records. Release sections only when their facts, privacy flags, images and captions are approved.

The exact top-level navigation, Work/Projects split, Timeline placement and public contact method remain content decisions and must be confirmed before this phase is considered complete.

### Phase 6 — Writing, books and investing migration

1. Generalise Writing so portfolio reviews, letters, travel, property, business ideas, reflections and book notes can share metadata without losing existing categories/slugs.
2. Preserve all 20 journal entries, one letter, nine book reflections, 17 original review document sets, holdings history and five research notes.
3. Keep `/portfolio`, `/journal`, `/letters`, `/books`, `/process`, `/philosophy`, `/decision-archive`, `/mistakes-lessons` and `/disclaimer` working during the first V2 release.
4. If Investing later moves under `/investing/...`, introduce redirects and canonical changes only after a route-by-route mapping is approved and tested.
5. Do not surface planned decision/mistake records as published articles until full content exists.

### Phase 7 — SEO and discovery consolidation

- Generate titles, descriptions, canonical URLs, Open Graph/Twitter data and JSON-LD from the shared route/content manifest.
- Add verified `Person`, `WebSite`, `Article`/`BlogPosting` and `BreadcrumbList` graphs where supported; do not invent profile links, dates or authorship.
- Update structured data on client navigation or ensure navigation loads route-correct documents.
- Include all canonical indexable public routes in the sitemap, including book details; exclude redirect, placeholder/noindex, review and machine resource URLs as appropriate.
- Use content modification dates rather than assigning the build date to every sitemap entry.
- Decide whether AI pages should be noindexed, canonicalised to their public equivalents or retained as independently indexable resources.
- Add real static/platform redirects for `/start`, `/current-portfolio` and any V2 URL changes.
- Mark 404 responses/documents `noindex` and verify actual HTTP status codes on the chosen host.
- Decide and enforce apex versus `www` canonical host redirects.

### Phase 8 — Verification and release candidate

Automated checks:

- type check, lint and unit/integration tests;
- production build in a clean checkout;
- financial reconciliation fixtures;
- route/sitemap/canonical/redirect crawler;
- broken internal and approved external links;
- duplicate slug and missing asset checks;
- accessibility scan and performance budgets.

Manual checks:

- 320px, common mobile/tablet widths and large desktop;
- keyboard-only navigation and screen-reader landmarks/names;
- reduced motion and slow connection;
- source document/PDF fallbacks;
- current facts, privacy approvals, captions and disclaimers;
- Cloudflare/Netlify headers, redirects, 404s and analytics in a non-production preview.

### Phase 9 — Launch and rollback

Launch only after explicit approval.

- Preserve a known-good deployment of the current site.
- Deploy a preview first and record the build commit.
- Take a route/content snapshot before cutover.
- Monitor 404s, canonical/indexing reports, web vitals and analytics after launch.
- Retain legacy redirects and the original investment archive.
- Roll back to the known-good deployment if factual data, portfolio calculations, route handling or accessibility materially regress.

### Immediate next development gate

The next safe implementation task is Phase 0 reconciliation plus the shared content/route schema design. The production homepage redesign should remain paused until the financial source-of-truth, public URL strategy and minimum approved V2 content are confirmed.

## Implementation progress — 13 July 2026

The safe foundation and contained-preview work is complete locally:

- transaction replay was separated into a testable function and covered by two deterministic unit tests;
- the current Microsoft position was reconciled against the private brokerage export;
- published-review and later-ledger values are labelled separately;
- a shared typed route manifest now drives metadata, sitemap/static-page policy and legacy aliases;
- content and generated-build validators check route coverage, slugs, assets, internal targets, portfolio consistency and V2 verification states;
- readable weekly-review text is rendered alongside document previews;
- `/start` and `/current-portfolio` receive generated static redirects;
- 404 and preview outputs are explicitly noindex;
- `/v2-preview` implements the Phase 3/4 personal-homepage prototype without replacing the production-facing homepage or investing routes.

The preview was verified at 1280px and 320px. It has one rendered H1 and main landmark, no horizontal overflow, a working mobile menu, correct noindex/canonical metadata and no captured browser console warnings or errors. The full production build generated 41 canonical routes and validated all 13 static manifest routes.

The next implementation phase is Phase 5. It should remain behind the preview boundary until the factual, privacy, photography, contact and final-navigation questions in `09-open-questions.md` are answered. The current market-value series must not be regenerated until a frozen price/FX policy is agreed.

### Final local-preview verification

- `npm run validate`: passed (two Python transaction-replay tests, content-integrity validation and strict TypeScript checking).
- `npm run build`: passed (AI archive generation, Vite production compilation, static-route generation and generated-build validation).
- Generated output: 41 canonical routes and all 19 static manifest routes validated; every generated internal target resolved.
- Dependency tree: `npm ls --depth=0` passed.
- Lint: no lint script or ESLint configuration exists, so there is no repository lint command to run.
- Browser: checked at 1280 × 720 and 320 × 720 with no horizontal overflow, one rendered H1/main landmark, correct preview metadata and no captured console warning/error.
- Mobile navigation: six links, initial focus, focus wrapping, Escape close/focus return and background scroll lock verified.
- Reduced motion: the global `prefers-reduced-motion` rule is present in the rendered stylesheet.
- Investing gateway: `/v2-preview` → `/portfolio` loads the preserved Codie Capital Research page with indexable metadata, then returns cleanly to the preview shell.
- Static preview: `/v2-preview/index.html` is noindex, has its own canonical and readable fallback content; `/v2-preview` is absent from the sitemap.
- No deployment was performed.

### Separate-page preview expansion

Following Codie's navigation decision, the contained preview now includes dedicated noindex routes for About, Work, Projects, Writing, Travel and Now. The homepage presents three primary actions—Explore my work, Read my writing and View current projects—and each relevant homepage section links to its deeper page.

All existing investment routes remain unchanged. Direct static fallbacks are generated for all six personal routes, the build validator confirms their targets and no preview route is included in the sitemap. Desktop and 320px browser checks passed after correcting the mobile Work heading and suppressing the visual scrollbar on the independently scrollable navigation row.

### V2 quality pass

The post-preview quality pass made the following contained improvements:

- converted detail-page mobile navigation from a clipped horizontal row into a proper menu with active-page state, initial focus, focus wrapping, Escape close/focus return and background scroll lock;
- added previous/next navigation across the V2 personal pages;
- reduced homepage repetition now that deeper pages exist, shortening the rendered desktop page from approximately 9,940px to 8,007px while retaining every major section;
- prioritised three documented projects on the homepage while keeping the complete set on the Projects page;
- added explicit detail-page skip-link focus handling and long-text containment;
- split route modules and the legacy shell into lazy-loaded chunks.

The production entry JavaScript fell from approximately 434 kB minified / 126 kB gzip to 182 kB minified / 59 kB gzip. The full investment dataset is now emitted as a separate shared chunk rather than being forced into the entry bundle. Browser regression checks passed for the V2 homepage, Work page mobile menu and the preserved `/portfolio` route with no captured console warnings or errors.

### Voice-led creative redesign

Following Codie's review that the preview still felt like a tasteful template rather than unmistakably him, the V2 presentation was rebuilt around the wording and specific stories in the authored source documents.

The redesign:

- replaces several third-person/polished summaries with first-person source-derived writing;
- introduces the documented lawn-care/tuck-shop/dog story, France/landlocked observation, family-property-company context, university decision, crypto failure, reading-under-the-desk memory, current work question and long-term Zimbabwe direction;
- keeps cricket proportionate rather than using it as a dominant identity device;
- adds approved Instagram access to desktop and mobile navigation;
- alternates off-black with warm ivory, sand and muted bronze to create a lighter editorial rhythm without abandoning the dark technical foundation;
- expands Projects from summary cards into problem/action/lesson case studies while retaining explicit status and verification language;
- gives detail pages more personal first-person introductions and a lighter reading surface;
- retains the original noindex preview boundary, investment URLs, disclosures and route fallbacks.

The redesigned homepage and Projects page were checked at desktop and 320px widths. Headings fit inside the viewport, mobile navigation focus/scroll-lock behaviour still works, all approved contact links resolve in the DOM and no browser warning/error was captured. Photography remains the largest missing storytelling layer and must only be added from approved source files.

### Local release candidate — 13 July 2026

The contained V2 implementation has completed the local release-candidate pass without changing the production-facing homepage or deploying anything.

- Nine V2 routes have static fallbacks, route-correct canonicals, valid JSON-LD and explicit `noindex, follow`; all remain excluded from the sitemap.
- Desktop and 320px audits cover H1/main landmarks, heading order, labelled controls, duplicate IDs, image alternatives, page overflow, navigation state and contact/project journeys.
- Automated contrast inspection of rendered V2 text now reports no WCAG AA text failures in the audited route set.
- The mobile menus provide initial focus, Escape close/focus return, background scroll lock and a focus loop that includes the close button.
- All 30 dynamic human-facing journal, letter and book routes pass a 320px smoke test.
- The preserved top-level investment routes pass desktop/mobile smoke tests after correcting the `/philosophy` grid overflow.
- Unknown routes receive Page Not Found metadata and `noindex`; invalid journal/book slugs resolve to their parent archives.
- Build validation enforces gzip ceilings of 70 KiB for initial JavaScript, 12 KiB for CSS and 45 KiB for the long-form data chunk. Current measured validation sizes are approximately 58.26 KiB, 9.23 KiB and 36.18 KiB respectively.
- There is still no repository lint command or ESLint configuration. Existing tests, content validation, strict TypeScript checking, Vite compilation, static generation and build validation all pass.

Publication remains blocked only by decisions or assets that cannot be inferred locally: final removal of the `/v2-preview` URL boundary, production host/platform redirect behaviour, AI/review indexing policy, photography permissions/captions, the horsebox company's current operating status and any still-unverified private names, dates or qualifications.

### Horsebox gallery update — 14 July 2026

- Four photographs supplied by Codie were added to the contained horsebox project page.
- The gallery uses 720px and 1200px JPEG sources, declared dimensions, responsive `srcset`, captions, alternative text and lazy loading after the lead image.
- Codie confirmed that another horsebox is still being renovated. The gallery now has real project evidence, while the company's formal operating status remains a separate publication question.
- Content validation now checks that all four gallery records, source files, responsive candidates, captions, alternative text and dimensions remain present.

### Travel photography update — 14 July 2026

- Four supplied travel photographs were converted into eight responsive JPEG derivatives without altering the source files: Angkor Wat, two south-of-France yacht-work images and one Monaco harbour image.
- The Travel page now pairs the Cambodia story with Angkor Wat and adds a separate France/Monaco photographic chapter. The homepage reuses the Angkor Wat image below the fold as the featured travel image.
- The image records are centralised in `src/data/v2Content.ts`; automated content validation checks the four records, source files, responsive candidates, alternative text, captions and dimensions.
- Exact dates, yacht names and unconfirmed marina locations remain unpublished. The preview remains noindex and no production deployment or URL migration is included in this update.

### Monthly portfolio-review migration — 17 July 2026

- The visible journal and Codie Capital Research gateway now use five grouped `Monthly Reviews`: four covering Weeks 1–16 and Review 05 covering 3 July–3 August 2026 with a valuation update dated 6 August 2026.
- Original weekly/fortnightly content remains preserved in `archive/portfolio-journal/legacy-weekly-reviews.json`; its source documents and public document assets are retained outside the active journal collection.
- Legacy journal-detail URLs receive generated redirects to the appropriate grouped review or the journal index, and validation checks those migration targets.
- The authored DOCX files are the editable source. A deterministic importer extracts their readable text and regenerates the website records and document viewers without changing the financial calculations.
