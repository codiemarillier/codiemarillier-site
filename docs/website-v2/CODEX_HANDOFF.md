# Codie Marillier Website V2 — Development Handoff

Report date: 14 July 2026
Repository root: `/Users/codiemarillier/Desktop/investing website`
Local V2 preview: `http://127.0.0.1:4173/v2-preview`

This report describes the repository and running website as inspected on 14 July 2026. It distinguishes the deployed investment-led site from the uncommitted Website V2 work in the local working tree. Recommendations are labelled as recommendations; unverified personal information is not presented as fact.

### Operational update — 17 July 2026

The visible portfolio-journal model has changed since this report was written. Five authored reviews now replace the listed week-by-week sequence: Review 01 covers Weeks 1–4, Review 02 covers Weeks 5–8, Review 03 covers Weeks 9–12, Review 04 covers Weeks 13–16 and Review 05 covers 3 July–3 August 2026 with valuation updated 6 August 2026. The public journal and V2 capital-research gateway use these five `Monthly Reviews` plus the three existing standalone notes/reflections. All 17 earlier weekly/fortnightly records and document assets remain preserved, with generated redirects from the old journal URLs. No portfolio calculation or ledger dataset was changed. Later references in this handoff to 17 visible chronological reviews describe the pre-migration state.

### Visual-system update — 19 July 2026

Following Codie's feedback, Website V2 now combines its personal editorial structure with the colour language of V1. Near-black, mint and sand have been replaced by V1-derived navy, cobalt blue, warm ivory, white, blue-grey, slate and restrained gold. V2's typography, content order, navigation, grid, orbit motion and route structure remain unchanged. Validation, the production build and representative desktop/mobile browser checks pass after this contained theme change.

## 1. Executive Summary

Website V2 is a substantial, coherent local release candidate, not a deployed redesign. The personal homepage, six primary personal sections, a Codie Capital Research gateway and a horsebox-project detail page have been built behind the isolated `/v2-preview` route tree. All nine V2 routes are marked `noindex, follow`, excluded from the XML sitemap and absent from the live public website.

The redesign is technically close to being ready for a controlled non-production deployment. It has a shared responsive shell, a mobile navigation system, first-person content, route-aware metadata, static HTML fallbacks, automated content/build validation and passing desktop/mobile smoke tests. Existing investment routes, journal entries, letters, book notes, holdings and source documents have been preserved rather than rewritten or moved.

The direction is now a personal, editorial and technically styled website led by the name **Codie Marillier**, with Codie Capital Research treated as an investing sub-brand. The homepage leads with Zimbabwean identity, current life in England, work, projects, travel, writing, reading and a public-accountability purpose. It no longer leads with portfolio values.

The largest accomplishments are:

- a complete contained V2 route tree and shared design system;
- centralised V2 biography, work, projects, travel, Now and approved contact content;
- a voice-led rewrite using documented first-person stories rather than generic summaries;
- preservation of all current investment URLs and content;
- a dedicated capital-research gateway with one letter, 17 chronological portfolio reviews and three standalone journal pieces;
- a dedicated O and C Cotswolds Trailers Ltd page with explicit status uncertainty and a four-image responsive project gallery;
- reconciliation of the Week 18 published review with the later 10 July transaction-ledger estimate;
- route-level code splitting, static route generation, route/content validation and gzip budgets;
- verified mobile navigation focus management, Escape handling, scroll lock and reduced-motion support.

The biggest remaining pieces are not a wholesale redesign. They are publication decisions and content assets: final launch URL mapping, any additional personal photography, the horsebox company's current status, verification of any private names/dates/qualifications, production redirect/404 behaviour, the indexing policy for AI/review artefacts and a reproducible frozen price/FX policy before future portfolio data is regenerated. The V2 changes also need to be reviewed and committed; at present they exist only as uncommitted changes on a branch whose committed tip is still identical to `main` and `origin/main`.

## 2. Current Technical Setup

| Item | Current setup |
|---|---|
| Framework | React 18.3.1 single-page application with React Router DOM 6.30.4 and Vite 6.4.3 |
| Language | Strict TypeScript/TSX; Node ESM build scripts; Python portfolio-generation/test code; one Swift PDF-rendering utility |
| Styling | Tailwind CSS 3.4.19, PostCSS, Autoprefixer and a substantial global stylesheet in `src/styles/index.css` |
| Animation | CSS only. There is no React animation library. Current effects include page fade, chart drawing, market ticker movement, hover transitions and the V2 orbit animation. |
| Package manager | npm, with `package-lock.json` present |
| Development command | `npm run dev` |
| Production build | `npm run build` |
| Production-build preview | `npm run preview` |
| Tests | `npm test` |
| Validation/type check | `npm run validate` |
| Lint | No lint script, ESLint dependency or ESLint configuration exists. |
| Deployment | The live response is served through Cloudflare. The README describes Cloudflare Pages as preferred and Netlify as an alternative, but no checked-in Cloudflare/Netlify project configuration or CI workflow identifies the deployment job. |
| Content storage | Local TypeScript records, generated TypeScript, source DOCX/HTML documents, PDFs/PNGs/static HTML and generated JSON/text/HTML. There is no CMS, database or application API. |
| Git | Configured with remote `origin` pointing to the GitHub repository `codiemarillier/codiemarillier-site`. |
| Current branch | `codex/website-v2-foundations` |
| Current commit | `1067e79` (`Add portfolio benchmark performance dashboard`), identical to local `main`, `origin/main` and `origin/HEAD` at inspection time |
| Working-tree state | Dirty. All V2 implementation files and documentation are uncommitted, alongside modified investment/generated files. No V2 commit exists in Git history. |
| Release state | The investment-led site is live. Website V2 exists only in the local working tree and local build; there is no discovered deployed V2 preview. |

### Exact local commands

From the repository root:

```bash
cd "/Users/codiemarillier/Desktop/investing website"
npm install
npm run dev
```

Vite normally prints a URL on port 5173. The currently running local production preview is available at:

```text
http://127.0.0.1:4173/v2-preview
```

To create and inspect a production build:

```bash
npm run build
npm run preview
```

To run validation without generating the production output:

```bash
npm run validate
```

The build command performs, in order:

1. Python unit tests and TypeScript-data content validation;
2. strict TypeScript checking with `tsc --noEmit`;
3. regeneration of the AI-readable archive;
4. the Vite production build;
5. static HTML generation for known routes and legacy aliases;
6. sitemap, internal-target and gzip-budget validation.

The performance dataset is **not** regenerated by `npm run build`. `scripts/generate-portfolio-performance.py` requires a private brokerage CSV path, a private baseline supplied at runtime and network price/FX data. It must be run deliberately.

## 3. Current Route and Page Map

“Live” below means present on the deployed investment-led website. “Local V2” means present only in the current uncommitted working tree.

| Route | Page | Current status and classification | Key content | Known problems |
|---|---|---|---|---|
| `/` | Codie Capital Research homepage | **Live; preserved legacy/current production page.** Local source still renders the investment-led homepage. | First reads, published-review snapshot, ledger performance, portfolio history and investing navigation. | Does not fulfil the V2 personal-homepage goal. Live figures remain the Week 18 public snapshot, while the local working tree also contains the later 10 July ledger estimate. |
| `/start` | Legacy start alias | **Redirect.** Local generated build redirects to `/`. | No unique page content. | Live host first applies trailing-slash behaviour; platform redirect handling should be retested after deployment. |
| `/about` | Investment-led About | **Live; preserved.** | Codie's investing origin and purpose of the investment record. | Not the broad V2 biography. V2 About currently remains at `/v2-preview/about`. |
| `/books` | Books library | **Live; preserved and previously redesigned.** | Nine book cards and reflections. | No reading status, dates, ratings or subject filtering; cover-use rights need confirmation. |
| `/books/:slug` | Book reflection | **Live; nine canonical detail routes.** | Reflection paragraphs, takeaway and previous/next navigation. | Invalid slugs redirect to `/books`; image handling has no responsive `srcset`/`sizes`. |
| `/philosophy` | Investment philosophy | **Live; preserved.** | Investment principles and philosophy. | Remains investing-specific. A local mobile overflow issue was fixed, but the fix is uncommitted. |
| `/process` | Investment process | **Live; preserved.** | Process rules, buy/sell checklists and risk discipline. | Some checklist/page copy remains hard-coded in JSX. |
| `/journal` | Portfolio journal | **Live; preserved.** | Search, category filters, theme filters and 20 entries. | No general Writing search across non-investment subjects. |
| `/journal/:slug` | Journal entry | **Live; 20 canonical detail routes.** | Weeks 1–16 and 18, plus “Why the Rulebook Exists”, Google re-entry and Microsoft trade reflection. | No Week 17 by design; document-heavy entries still carry large PDF/PNG assets. |
| `/letters` | Letters index | **Live; preserved.** | One published letter. | Only one letter currently exists. |
| `/letters/my-first-letter` | My First Letter | **Live; preserved.** | Full first letter and reading progress. | Body is duplicated between source DOCX and TypeScript. |
| `/decision-archive` | Decision Archive | **Live; preserved placeholder.** | Honest empty-state/index explanation. | Seven structured planned records exist, but no full memos are published. Its long-term public status is undecided. |
| `/decision-archive/:slug` | Planned decision detail pattern | **Legacy/unfinished.** | No public detail content. | All such routes redirect to `/decision-archive`; they must not be described as published pages. |
| `/mistakes-lessons` | Mistakes & Lessons | **Live; preserved placeholder.** | Honest empty-state/index explanation. | Seven planned records exist, but no full lesson pages are published. |
| `/mistakes-lessons/:slug` | Planned lesson detail pattern | **Legacy/unfinished.** | No public detail content. | All such routes redirect to `/mistakes-lessons`. |
| `/portfolio` | Current Portfolio | **Live; preserved core investing route.** | Published review context, later ledger estimate, performance chart, holdings, roles and change log. | Data is manual/generated through 10 July 2026 and cannot yet be reproduced from committed inputs alone. Chart controls still need stronger group semantics and a full accessible data alternative. |
| `/current-portfolio` | Legacy portfolio alias | **Local redirect; broken on live site.** | Local static build redirects to `/portfolio`. | Direct live request returned HTTP 404 on 14 July 2026. This is the clearest currently verified production routing defect. |
| `/disclaimer` | Investing disclaimer | **Live; preserved.** | Financial-advice and regulatory boundary. | Must remain prominent wherever investing content is surfaced in V2. |
| `/404` and unknown paths | Not Found | **Local handling improved.** | Page Not Found view. | Local client metadata is now `noindex`; actual HTTP 404 behaviour must be verified on the production host after deployment. |
| `/v2-preview` | V2 personal homepage | **New; local release candidate; hidden/noindex.** | Codie hero, Zimbabwe, early stories, work, projects, travel, investing/writing, books, Now and contact, with the supplied Angkor Wat photograph in the travel section. | Final production hero wording and launch mapping remain unapproved. Live URL returns HTTP 404, as expected for an undeployed route. |
| `/v2-preview/about` | V2 About | **New; local release candidate; hidden/noindex.** | Zimbabwe, family-business context, life chapters, cricket, France, university, current work, reading and interests. | Exact qualification names and some dates/names remain withheld. |
| `/v2-preview/work` | V2 Work | **New; local release candidate; hidden/noindex.** | Lawn-care origin, Sweden, current estate work and five secondary work experiences. | Marquee work is intentionally not rendered; employer/company names and dates remain unverified. |
| `/v2-preview/projects` | V2 Projects | **New; local release candidate; hidden/noindex.** | Codie Capital Research, Website V2, O and C Cotswolds Trailers Ltd and Zimbabwe property-access research. | Horsebox operating status remains unresolved; another horsebox is confirmed as still under renovation. |
| `/v2-preview/capital-research` | Codie Capital Research gateway | **New; local release candidate; hidden/noindex.** | My First Letter, 17 chronological portfolio reviews, three standalone entries and links to preserved investment systems. | It is a gateway rather than a full restyling of every investment page. |
| `/v2-preview/projects/horsebox-conversion` | Horsebox project | **New; local release candidate; hidden/noindex.** | Confirmed legal name, project description, possible uses, skills, lessons and four supplied photographs. | Current company status remains unconfirmed. Future progress imagery may be added as the second horsebox renovation continues. |
| `/v2-preview/writing` | V2 Writing | **New; local release candidate; hidden/noindex.** | Crypto/risk context, investing boundary and links to journal, letters, process, books, decisions and mistakes. | There is no unified multi-topic Writing index yet; current links mostly lead to the preserved investing archive. |
| `/v2-preview/travel` | V2 Travel | **New; local release candidate; hidden/noindex.** | Cambodia/Dara story, France/yacht-work and Monaco chapter, travel philosophy and four supplied photographs. | No map; exact country count and travel dates remain withheld. |
| `/v2-preview/now` | V2 Now | **New; local release candidate; hidden/noindex.** | Current work, building, learning, principles and Zimbabwe direction. | Last reviewed 13 July 2026; there is no update interface or agreed cadence. |
| `/ai/` and `/ai/*.html` | AI-readable archive | **Live/generated auxiliary surface.** | General pages, portfolio, journal and research derivatives. | Thirty-one sitemap URLs sit under `/ai`; independent indexing/canonical policy is unresolved and may create duplication. |
| `/ai/journal/:slug.html` | AI journal copies | **Live/generated; 20 pages.** | Machine-readable copies of journal entries. | Duplicate-content and maintenance policy unresolved. |
| `/ai/research/:slug.html` | AI research notes | **Live/generated; five pages.** | Alphabet, ASML, gold, handling winners and Rheinmetall notes. | There is no equivalent human-facing React research index/detail route. |
| `/documents/weekly-summaries/view/:slug/` | Original review viewer | **Live/generated supporting archive; 17 viewers.** | Rendered weekly/fortnightly review documents. | Large image/PDF payloads; accessibility and responsive reading are weaker than native HTML. |
| `/documents/weekly-summaries/:slug.pdf` | Review PDFs | **Live/generated supporting archive; 17 PDFs.** | Downloadable original-style reviews. | Rights/retention/public-download policy should be confirmed. |
| `/review/` | Static review artefact | **Live static legacy/development page.** | Old screenshots of investment pages. | Publicly accessible on the live site; should be deliberately retained, protected or removed from production output. |

The local route manifest contains 21 static definitions: 11 indexable human-facing base routes, `/404`, and nine noindex V2 routes. Dynamic canonical content adds 20 journal entries, one published letter and nine book details, giving the 41 canonical human routes reported by build validation.

## 4. What Has Been Built

### Global V2 navigation and shell

`src/components/V2SiteChrome.tsx` provides the shared V2 header and footer for detail pages. `src/components/V2SubpageFrame.tsx` provides a consistent detail-page hero, skip link, back navigation and page shell. The homepage has a related inline header in `src/pages/V2Preview.tsx`.

Desktop navigation contains About, Work, Projects, Writing, Travel and Now, plus Instagram and Contact. The `CM.` mark links home. On mobile, navigation becomes a two-column menu. Opening the menu moves focus to the first link, locks body scrolling, includes the close button in the focus loop, closes on Escape and restores focus to the menu button. Active detail pages use `aria-current="page"`.

This system is responsive and functionally complete for the local release candidate. Contact and Instagram use the approved values from `src/data/v2Content.ts`.

### V2 homepage and hero

`src/pages/V2Preview.tsx` implements the full personal homepage. The hero uses very large Newsreader display type, a restrained grid, a rotating orbit and green signal point. It states that Codie was born and raised in Zimbabwe and is currently living and working in England. The opening text explicitly says he is at the beginning rather than presenting himself as an expert.

The three primary homepage actions are:

- Explore my work;
- Read my writing;
- View current projects.

Below the hero are sections for About, Zimbabwe, selected work, projects, travel, investing/writing, reading, Now and contact. The earlier two-story quote band was removed from the homepage on 19 July 2026 at Codie's request; both stories remain preserved in structured content and their relevant deeper pages. The homepage is responsive and uses a focusable skip target.

### Biography, Zimbabwe and timeline-like chapters

`src/pages/V2DetailPage.tsx` renders the About page from `v2LifeChapters`, `v2Voice` and `v2Interests` in `src/data/v2Content.ts`. It covers Zimbabwe, Harare/Marondera, boarding school, family property-business exposure, cricket and injury, France/yachting, university and current work in England.

There is no separate Timeline route. The About page's “Chapters” list is currently the timeline-like experience. It is editorial and text-led rather than an interactive chronological visualisation.

### Work

The Work page is a continuous editorial layout rather than a set of oversized isolated cards. It begins with the lawn-care/tuck-shop/dog story, then features Sweden and current estate work in England. It also lists yacht day work, gardening/landscaping, construction/demolition, freight/supply chain and the early lawn-care service.

The marquee/event-installation record remains in `v2WorkStories` but is filtered out of `v2FeaturedWorkStories`, so it is preserved without being rendered. This was a deliberate content decision, not accidental deletion.

### Projects

The Projects page shows four structured projects, each with status, problem, actions, lesson and verification note:

1. Codie Capital Research — Active;
2. Personal Website V2 — Active;
3. O and C Cotswolds Trailers Ltd — Status to confirm;
4. Zimbabwe property access research — Researching.

Codie Capital Research and the horsebox project have dedicated detail destinations. Zimbabwe property access is explicitly framed as research, not an investment product or offer.

### Horsebox project

`src/pages/V2HorseboxProject.tsx` uses the confirmed legal name **O and C Cotswolds Trailers Ltd**. It explains possible trailer uses, practical skills and the lesson from adapting the business model. The gallery now uses four photographs supplied by Codie on 14 July 2026: three views of the blue horsebox and the newest renovation-progress interior photograph. Responsive 720px and 1200px derivatives, captions, alt text, intrinsic dimensions and lazy loading are provided. No stock or generated photographs have been substituted.

Codie confirmed that another horsebox is still being renovated. This supports an ongoing-work update, but the company's formal operating status remains unconfirmed.

### Travel

The V2 Travel page is intentionally about people and perspective rather than a country count. Cambodia is the featured story, with Dara identified by first name only. A separate photographic chapter covers the period pursuing yacht work in the south of France and time in Monaco. France, Spain, Sweden and wider European travel are mentioned without publishing unverified counts or dates. Four supplied photographs are used; there is no map or filter system.

### Now page

The Now page records England, practical estate work/grounds improvement, Website V2, Codie Capital Research, a more consistent personal operating system, current learning themes and five personal principles. Content comes from `v2Now` and `v2Principles` in `src/data/v2Content.ts`. It was last reviewed on 13 July 2026.

### Writing and investing

The V2 Writing page opens with “A good outcome is not always a good decision.” It gives personal context for the crypto loss and risk discipline before linking to the preserved Portfolio Journal, Letters, Investment Process, Books, Decision Archive and Mistakes & Lessons routes. The financial boundary and disclaimer remain prominent.

`src/pages/V2CapitalResearch.tsx` is the deeper investing gateway. It begins with My First Letter, then renders 17 weekly/fortnightly reviews in a horizontally scrollable, snap-aligned rail with 44px previous/next buttons. The three standalone entries are separate cards rather than being mixed with the review sequence. The page ends with links to the portfolio, process, decision archive, mistakes, letters and book notes.

### Preserved portfolio dashboard and investment archive

The original investing site remains available through the pre-existing routes. Local changes improve the distinction between:

- the authored review series through 7 July 2026; and
- the benchmark-comparable transaction-ledger percentage series through 10 July 2026 after the Microsoft re-entry.

The holdings list now includes the evidenced 8 July Microsoft re-entry. `src/components/PortfolioSnapshot.tsx`, `src/pages/CurrentPortfolio.tsx`, `src/data/siteData.ts` and `src/data/portfolioPerformance.generated.ts` control these views.

### Journal, letters and books

The preserved journal provides client-side search and category/theme filters. Journal detail pages render readable structured text as well as optional original document previews. Seventeen review documents also have PDFs, HTML viewers and 46 rendered page images.

One letter, “My First Letter”, is published. Nine books have individual reflections and takeaways:

- The Dhandho Investor;
- The Most Important Thing;
- The Intelligent Investor;
- The Alchemist;
- The Art of Spending Money;
- Man's Search for Meaning;
- The Tipping Point;
- Material World;
- Atomic Habits.

### Contact and footer

The V2 contact area uses:

- `codieandrew2609@gmail.com`;
- Instagram `@codiemarillier`.

There is no contact form, LinkedIn link or newsletter. The homepage footer states that this is a local V2 preview and is not published. Detail-page footers link back to the V2 homepage and repeat the approved contact methods.

### Motion and page transitions

The V2 hero uses a slow CSS orbit. Cards use subtle border, colour and translate hover states. The legacy shell has a page fade, chart draw and market ticker. `src/styles/index.css` globally reduces all animation and transition durations to 1ms and disables smooth scrolling when `prefers-reduced-motion: reduce` is active.

### Image handling

V2 now uses four supplied travel photographs with responsive JPEG sources, intrinsic dimensions, captions and alt text. The horsebox page uses four project photographs with 720px/1200px `srcset` sources, intrinsic dimensions, captions and alt text. The legacy site uses nine book-cover raster images and document-page PNGs. There is no general automated image pipeline, AVIF/WebP generation or image CDN integration.

## 5. Design Direction Currently Implemented

### Visual identity

The V2 visual identity uses:

- near-black `#090b0c` and `#0c0f10`;
- warm ivory `#f4f1ea`;
- sand `#e9e1d3`;
- dark green-black text `#17221e`;
- muted green `#32634f`;
- mint accents `#77c7a2` and `#9bdbbd`;
- muted bronze `#c8a96a`.

Typography is:

- Newsreader for editorial/display headings;
- Manrope for body copy and navigation;
- IBM Plex Mono for technical labels, statuses and metadata.

The fonts are loaded through a Google Fonts CSS `@import` in `src/styles/index.css`. They are not self-hosted.

### Layout, spacing and cards

The design alternates dark technical sections with warm ivory and sand editorial sections. Wide pages use maximum widths of approximately 1344–1440px. Section layouts generally use a narrow label column and a flexible content column. Display headings use compressed line-height and negative tracking; body measures remain restrained.

Cards use thin borders, soft translucent backgrounds, rounded corners and very limited shadows. Project and work treatments are deliberately editorial rather than dashboard-like. Statuses and interests use small mono pill labels. Horizontal rules and fine grid lines provide structure.

### Motion and interaction

Motion is restrained: one slow orbit, subtle page fade, chart drawing, the legacy ticker and small hover translations. Links usually reveal intent through border/colour changes and arrow movement rather than dramatic animation. Navigation is sticky/fixed, translucent and backdrop-blurred.

### Mobile behaviour

At mobile widths, two-column and label/content grids collapse to one column, heading sizes use `clamp()`, project/work layouts become linear and the capital-review rail becomes swipeable. The mobile menu becomes a two-column overlay row with scroll lock and keyboard management. The V2 grid background scales down from 72px to 42px.

### Relationship to the Theo Apteker inspiration

The implementation follows the documented high-level inspiration: confident personal identity, large typography, technical labels, project evidence, restrained interaction and a custom rather than résumé-like feel. It does not copy a known Theo page structure or animation sequence. It differs by centring Zimbabwe, alternating dark and warm editorial surfaces, retaining a data-heavy investment archive as a sub-brand and using Codie's specific work/failure/reading stories as the content structure.

### Honest assessment

- **Modern:** Yes. The typography, grid, spacing and responsive shell feel current.
- **Dark:** Yes, especially the hero, Zimbabwe, travel and global navigation; the ivory/sand rhythm prevents it from becoming uniformly black.
- **Technically sophisticated:** Moderately to strongly. The route system, labels, grid and motion communicate technical intent without relying on heavy WebGL or animation frameworks.
- **Personal:** Much more than the original site. The lawn-care, France, family-business, university, crypto and reading stories sound specific to Codie.
- **Professional:** Yes. Verification notes and investing boundaries prevent exaggerated claims.
- **Experimental:** Moderately. The homepage typography and orbit are distinctive, but the detail pages remain structurally calm.
- **Distinctly built around Codie:** Mostly, but not fully. The copy and Zimbabwe emphasis are specific. The missing photography, limited travel material and absence of a visual life timeline prevent the site from feeling completely inseparable from Codie's own archive.

The current direction is good enough to continue. It should be strengthened with approved photographs and final voice/content decisions rather than replaced with another full redesign.

## 6. Content Currently Used

### Biography currently displayed

The core V2 biography comes from `src/data/v2Content.ts` and is rendered by `src/pages/V2Preview.tsx` and `src/pages/V2DetailPage.tsx`. It currently states that Codie:

- is a young Zimbabwean at the beginning of his career and not presenting himself as an expert;
- was born and raised in Zimbabwe and is living and working in England;
- grew up in Harare and attended boarding school in Marondera;
- was shaped by sport, friendship, discipline and family property-business exposure;
- played cricket, hockey, rugby and tennis, with cricket central to his life;
- experienced a serious knee injury near the end of high school;
- moved to the south of France in early 2024 to pursue superyacht work;
- later travelled in Spain, lived/worked in Sweden and travelled around Europe;
- left university after two years to change his environment and work more directly;
- currently performs practical estate work in England;
- has long loved reading and sometimes read under his desk at school;
- wants to learn internationally and eventually apply that experience to meaningful opportunities in Zimbabwe.

The most prominent first-person lines include the lawn-care/tuck-shop/dog story, the joke about the family property company being his parents' first child, the France/landlocked observation, the university decision, the cryptocurrency loss and the question “What will be better because I worked today?”

### Featured work

Rendered featured work:

- Working in Sweden;
- Estate work in England.

Secondary work:

- early lawn-care service;
- yacht day work;
- gardening and landscaping;
- construction and demolition;
- freight and supply chain.

Marquee and event installation remains in `v2WorkStories` but is intentionally excluded from `v2FeaturedWorkStories` and is not rendered.

### Projects

Rendered projects:

- Codie Capital Research;
- Personal Website V2;
- O and C Cotswolds Trailers Ltd;
- Zimbabwe property-access research.

The cryptocurrency token, travel experience platform and wider Zimbabwe property-services concepts remain in the documentation but are not rendered as current V2 project cards.

### Travel

Cambodia is the only featured story. Dara is identified by first name only. France, Spain, Sweden and wider Europe appear as context. The approximate 41-country claim is intentionally not displayed.

### Interests and principles

Displayed interests are Property, Investing, Entrepreneurship, Zimbabwe, Travel, Cricket, Reading and Risk & decisions. The Now page displays Improve by one percent, Never miss twice, Follow through, Protect sleep and Take regret seriously.

`v2PersonalityNotes` still contains “Most proud of”, “Still working on”, “Happiest when” and “Curious about” records, but these cards are not rendered after Codie's review.

### Investment content

`src/data/siteData.ts` contains the preserved investment record: 20 journal entries, one letter, nine book reflections, 16 holding records, portfolio history, research notes, rules, planned decisions and lessons. `src/data/portfolioPerformance.generated.ts` contains 94 daily and 19 weekly observations through 10 July 2026.

### Placeholder or unfinished content

- The horsebox page has four supplied photographs; future progress imagery for the second horsebox may still be added.
- The horsebox current operating status is explicitly “Status to confirm”.
- Decision Archive and Mistakes & Lessons are public index placeholders without full detail articles.
- Travel has four supplied photographs and Cambodia remains the only fully developed destination story; there is still no map or additional long-form destination story.
- There is no dedicated Timeline page.
- There is no downloadable CV, contact form, LinkedIn or newsletter.

### Content sources

| Content | Source |
|---|---|
| V2 identity, voice, work, projects, travel, Now, contact | `src/data/v2Content.ts` |
| Main investing dataset | `src/data/siteData.ts` |
| First letter body | `src/data/myFirstLetter.ts` |
| Generated performance | `src/data/portfolioPerformance.generated.ts` |
| Original first-letter document | `source-documents/letters/My First Letter.docx` |
| Original review documents | `source-documents/weekly-summaries/` |
| Public PDFs/viewers/page images | `public/documents/weekly-summaries/` |
| Book covers | `public/book-covers/` |
| V2 governing biography/work/design source | `docs/website-v2/00-master-brief.md` through `10-content-models.md` |

### Claims still requiring verification or approval

- current operating status of O and C Cotswolds Trailers Ltd;
- public styling/permission for Marillier Properties;
- Inco Freight styling and exact role;
- Colchester estate, owner, Sweden employer and marquee-company names;
- exact work, school, travel and project dates;
- exact yachting/boat/jet-ski/diesel/barista/mixology qualifications;
- token name, chain, dates and evidence for the reported approximately $500,000 peak market capitalisation;
- exact country count and Cambodia dates;
- permission for third-party names and photographs;
- final public wording about education and current project status;
- future portfolio values produced from live/revisable price and FX inputs.

## 7. Existing Website Systems Preserved

| System | Current state | Accessibility/migration status | Main files |
|---|---|---|---|
| Portfolio snapshot | Works locally and live, with published-review and later-ledger values now distinguished in the local tree. | Preserved at `/portfolio`; needs ongoing data governance and production deployment of the reconciliation. | `src/data/siteData.ts`, `src/pages/CurrentPortfolio.tsx`, `src/components/PortfolioSnapshot.tsx` |
| Performance calculation | Generated daily/weekly series and VUAG benchmark work. Two deterministic replay tests pass. | Preserved, not regenerated during normal builds. Full market-series reproducibility remains blocked by private CSV and live Yahoo data. | `scripts/generate-portfolio-performance.py`, `src/data/portfolioPerformance.generated.ts`, `tests/test_portfolio_performance.py` |
| Holdings | 16 records; 13 current and three closed by current UI logic. Microsoft re-entry is represented. | Preserved and validated. Values/quantities remain centrally maintained rather than live-broker connected. | `src/data/siteData.ts`, `src/components/HoldingsTable.tsx`, `src/components/CurrentHoldingsOverview.tsx` |
| Journal | 20 entries, search/filter index and detail pages work. | Preserved at existing slugs. Readable HTML is shown alongside optional document previews. | `src/data/siteData.ts`, `src/pages/PortfolioJournal.tsx`, `src/pages/ArticleDetail.tsx`, `src/components/JournalTimeline.tsx` |
| Letters | One published letter works. | Preserved at `/letters/my-first-letter`. | `src/data/myFirstLetter.ts`, `src/data/siteData.ts`, `src/pages/Letters.tsx`, `src/pages/PlannedEntryDetail.tsx` |
| Decision Archive | Index works as a placeholder. | Preserved; seven planned records are not treated as published. | `src/data/siteData.ts`, `src/pages/DecisionArchive.tsx`, `src/pages/PlannedEntryDetail.tsx` |
| Process | Works and remains accessible. | Preserved; should remain an investing subpage. | `src/data/siteData.ts`, `src/pages/Process.tsx` |
| Mistakes & Lessons | Index works as a placeholder. | Preserved; no full detail pages yet. | `src/data/siteData.ts`, `src/pages/MistakesLessons.tsx`, `src/pages/PlannedEntryDetail.tsx` |
| Book notes | Nine index/detail records work. | Preserved with stable slugs. Image rights and richer reading metadata remain open. | `src/data/siteData.ts`, `src/pages/Books.tsx`, `src/pages/BookDetail.tsx`, `public/book-covers/` |
| SEO metadata | Route-aware titles, descriptions, canonicals, Open Graph/Twitter basics and robots policy work locally. | Migrated to the shared route manifest for static routes; dynamic data still requires runtime imports. No social image metadata. | `src/data/siteConfig.ts`, `src/App.tsx`, `scripts/generate-static-routes.mjs` |
| Structured data | Build generates valid JSON-LD for static/dynamic route documents. | Preserved but basic: mostly `WebPage` and `Article`. Rich Person/WebSite/Breadcrumb graphs are not implemented. | `scripts/generate-static-routes.mjs` |
| Sitemap | Valid XML and contains all 41 canonical human routes. | Preserved and validated, but it also includes 31 `/ai` resources; policy unresolved. | `public/sitemap.xml`, `scripts/generate-ai-review.mjs`, `scripts/validate-build.mjs` |
| Canonical URLs | Apex `https://codiemarillier.com` is used consistently in local generated output. | Preserved. Production apex/www redirect behaviour should be explicitly verified. | `src/data/siteConfig.ts`, `src/App.tsx`, `scripts/generate-static-routes.mjs` |
| AI-readable content | General, portfolio, journal and research HTML plus JSON/text are generated and live. | Technically works; indexing/canonical duplication policy remains unresolved. | `scripts/generate-ai-review.mjs`, `public/ai/` |
| Original review archive | 17 PDFs, 17 HTML viewers and 46 page PNGs remain available. | Preserved as historical evidence. Large and less accessible than native HTML; public-download policy needs confirmation. | `source-documents/weekly-summaries/`, `public/documents/weekly-summaries/` |

## 8. Important Files and Architecture

| File or folder | Responsibility |
|---|---|
| `AGENTS.md` | Governing project rules: preserve investment content, do not invent facts, keep V2 personal, build mobile-first and do not deploy without approval. |
| `README.md` | Local commands, deployment notes, content-editing overview and current V2 preview paths. |
| `src/main.tsx` | React entry point and router mounting. |
| `src/App.tsx` | Lazy-loaded route tree, preview/legacy shell selection, route metadata, robots/canonical updates, analytics and scroll restoration. |
| `src/data/siteConfig.ts` | Canonical site identity and the shared typed route manifest: paths, metadata, sitemap/static/indexing policy and legacy aliases. |
| `src/data/v2Content.ts` | Authoritative structured V2 identity, voice, work, projects, travel, Now, principles and approved contact data. |
| `src/data/siteData.ts` | Large compatibility/domain dataset for investing, journal, books, holdings, portfolio history, planned content and research. It re-exports V2/config data for build scripts. |
| `src/data/myFirstLetter.ts` | Published first-letter body. |
| `src/data/portfolioPerformance.generated.ts` | Generated aggregate portfolio/benchmark time series through 10 July 2026. |
| `src/pages/V2Preview.tsx` | Complete V2 homepage and its homepage-specific header/footer. |
| `src/pages/V2DetailPage.tsx` | Shared renderer/content for About, Work, Projects, Writing, Travel and Now. |
| `src/pages/V2CapitalResearch.tsx` | First letter, review rail, standalone journal pieces and investing-system links. |
| `src/pages/V2HorseboxProject.tsx` | Horsebox project detail, current renovation update and responsive four-image gallery. |
| `src/components/V2SiteChrome.tsx` | Shared V2 detail navigation, accessible mobile menu and footer. |
| `src/components/V2SubpageFrame.tsx` | Shared project/capital detail-page hero, skip link, back link and shell. |
| `src/pages/Home.tsx` and other non-V2 pages | Current investment-led production UI. |
| `src/components/PortfolioValueChart.tsx` | Daily/weekly portfolio and VUAG benchmark chart. |
| `src/styles/index.css` | Global and V2 design tokens/classes, motion, focus states, responsive rules and reduced-motion override. |
| `tailwind.config.js` | Legacy/general colour, typography and shadow tokens. V2 also uses explicit colour values in CSS/TSX. |
| `scripts/generate-static-routes.mjs` | Generates route-specific static HTML, metadata, JSON-LD, V2 readable fallbacks and alias redirects. |
| `scripts/generate-ai-review.mjs` | Generates `public/ai`, sitemap and robots outputs. |
| `scripts/validate-content.mjs` | Validates slugs, routes, assets, V2 privacy/status rules and portfolio consistency. |
| `scripts/validate-build.mjs` | Validates generated targets, sitemap coverage, internal references and gzip budgets. |
| `scripts/generate-portfolio-performance.py` | Replays private transactions and fetches prices/FX to generate aggregate performance. |
| `tests/test_portfolio_performance.py` | Two deterministic transaction-replay tests. |
| `public/_headers` | Security and cache headers for compatible static hosts. |
| `public/_redirects` | Currently empty; reserved for platform-level redirects/fallbacks. |
| `public/book-covers/` | Nine raster covers currently used. |
| `public/book-art/` | Eleven SVG book-art assets currently unused. |
| `src/assets/` | Two large investment hero PNGs; current active pages do not rely on them. |
| `docs/website-v2/` | Product brief, biography, work/projects, philosophy, design, information architecture, audit, privacy rules, migration plan, questions and content models. |

### Architectural decisions already made

- Retain React/Vite rather than introduce a framework migration during V2.
- Keep existing investment URLs canonical for the first V2 release.
- Build V2 behind a contained noindex route boundary before changing production pages.
- Use structured TypeScript content for frequently edited V2 facts.
- Preserve the large `siteData.ts` dataset through compatibility exports rather than perform a risky one-step rewrite.
- Use one route manifest for metadata, sitemap/static policy and legacy aliases.
- Lazy-load route modules and split long-form `siteData` out of the initial application entry.
- Generate readable static HTML fallbacks for public and V2 routes.
- Treat the V2 homepage and detail shell as a distinct visual system while keeping investing connected through links and shared identity.
- Keep unverified facts omitted or explicitly marked as requiring confirmation.

## 9. Changes Made So Far

### Useful committed history before V2

The Git history is useful for the original investment site:

- `e010926` — published My First Letter;
- `623542b` — added portfolio value history;
- `b699243` and `9264a24` — created and then merged the start page into the homepage while retaining a redirect;
- `0874097` and `4b6fed0` — refined the letter experience and enabled Cloudflare Web Analytics;
- `91b9aac`, `09e0398`, `668dc7e`, `44bc065` — developed the books section and restored/added book reflections;
- `e8e329a`, `e86405f`, `5bda94b` — added Week 18 and its rendered document presentation;
- `c62b6b3` — broadly redesigned the investment-tracker interface;
- `1067e79` — added the benchmark performance dashboard and generation script.

### Uncommitted V2 development stage

No commit contains Website V2. The following meaningful work exists only in the dirty working tree:

- added `AGENTS.md`, `FIRST_CODEX_PROMPT.md` and the full `docs/website-v2/` source pack;
- added `src/data/siteConfig.ts` and `src/data/v2Content.ts`;
- added the four V2 page modules and two shared V2 components;
- changed `src/App.tsx` to lazy-load routes, use the route manifest, set noindex/404 metadata and mount the V2 tree;
- added static V2 fallbacks and generated alias redirects;
- added content/build validation scripts and Python unit tests;
- reconciled the Microsoft re-entry and separated published-review versus ledger valuation labels;
- improved readable journal rendering and fixed `/philosophy` narrow-screen overflow;
- expanded `src/styles/index.css` with the current V2 design system;
- updated generated AI/sitemap outputs and README documentation.

There are no new npm dependencies for V2. The package change only expands scripts: `test`, `validate` and stronger `build` validation.

No tracked routes were renamed or deleted. `/start` and `/current-portfolio` remain aliases. No old content file has been removed.

### Design experiments deliberately abandoned or hidden

- Marquee/event-installation content was removed from the rendered Work/homepage edit but retained in structured data.
- Four generic personality-summary cards were removed from the rendered About page but their data remains available.
- An earlier more uniformly dark/card-based preview was evolved into the current dark/ivory/sand editorial rhythm.
- Personal photographs were not simulated with stock or generated imagery. The travel and horsebox galleries use only photographs supplied by Codie.

## 10. Current Quality and Testing Status

All commands below were run on 14 July 2026. The production build was run in an isolated copy of the current working tree so its generators could not rewrite tracked files during this documentation-only task.

| Check | Exact command | Result |
|---|---|---|
| Development server | `npm run dev -- --host 127.0.0.1 --port 4174 --strictPort` | Passed. Vite 6.4.3 reported ready in 97ms. HTTP checks returned 200 for `/` and `/v2-preview`. The temporary server was then stopped. |
| Validation and TypeScript | `npm run validate` | Passed. Two Python tests passed; content validation reported 21 routes, 20 journal entries, 9 books and 16 holding records; `tsc --noEmit` passed. |
| Tests | `npm test` | Passed independently with the same two Python tests and content-integrity validation. |
| Production build | `npm run build` in an isolated working-tree copy | Passed. Vite transformed 1,622 modules. Static generation and build validation completed successfully. |
| Generated route/link validation | Included in `npm run build` | Passed: 41 canonical routes, 21 static manifest routes and all generated internal `href`/`src` targets resolved. |
| Bundle budgets | Included in `npm run build` | Passed: initial JS 58.26 KiB gzip (70 KiB budget), CSS 9.23 KiB (12 KiB budget), site-data chunk 36.18 KiB (45 KiB budget). |
| Sitemap XML | `xmllint --noout dist/sitemap.xml` in the isolated build | Passed with no output/errors. |
| Dependency tree | `npm ls --depth=0` | Passed; no missing direct dependency was reported. |
| Diff whitespace | `git diff --check` | Passed with no output/errors. |
| Lint | No command exists | Not run. There is no repository lint setup. This is a tooling gap, not a failed lint result. |

### Browser/runtime checks performed on 14 July 2026

- All nine V2 routes were loaded from `http://127.0.0.1:4173`.
- At 320×720, every V2 route had one visible H1, one visible main landmark, no page-level horizontal overflow, no missing `alt` attributes and no visible button smaller than 24×24px.
- All 11 preserved top-level human routes passed the same mobile H1/main/overflow/missing-alt smoke criteria.
- All 30 dynamic journal, letter and book routes passed the 320px smoke test with no failures.
- Every V2 route returned its route-specific title, apex-domain canonical and `noindex, follow` metadata.
- Mobile detail navigation opened with eight links, moved focus to About, locked body scrolling, closed on Escape and returned focus to the menu button.
- A deliberately unknown local route rendered “Page Not Found”, used Page Not Found metadata and `noindex, follow`.
- The V2 homepage was visually inspected at 1270×900 and had no horizontal overflow.

### Accessibility status

Positive current behaviour:

- visible skip links with programmatically focusable main targets in V2;
- semantic headings and landmarks;
- keyboard-operable navigation and rail controls;
- mobile-menu focus management, Escape close and scroll lock;
- visible focus outlines;
- reduced-motion CSS;
- image alternatives on current React images;
- labelled journal search/filter controls;
- V2 text contrast was previously inspected across all nine routes during the 13 July release-candidate pass, with no WCAG AA text failures reported.

Limitations:

- no axe, Lighthouse accessibility or screen-reader automation is installed;
- the portfolio chart's frequency wrapper has an `aria-label` without a corresponding group/widget role, and the chart has no full tabular data alternative;
- document-page images remain a weaker reading experience than native article text, even though readable text is now retained;
- a complete manual assistive-technology review is still needed before launch.

### Image optimisation and performance status

V2 now loads four responsive travel photographs and the horsebox project includes four responsive JPEG photographs. The production output remains dominated by copied public document assets. Before the supplied-photo additions, `public/` was approximately 23MB; weekly-summary documents were approximately 18MB and contained 17 PDFs, 17 viewers and 46 PNG pages. Book covers total approximately 280KB. Two currently unused source hero PNGs total approximately 3.9MB. The horsebox derivatives add approximately 2.5MB across 720px and 1200px variants; the travel derivatives add approximately 2MB across eight files.

There is no responsive image pipeline, explicit image-performance budget, AVIF/WebP conversion or mobile LCP measurement. No Lighthouse run is configured. JavaScript/CSS/data gzip budgets pass, but final photographic performance remains unknown.

### SEO status

Local generated pages have route-specific titles, descriptions, canonicals, basic Open Graph/Twitter metadata and JSON-LD. V2 is explicitly noindex and absent from the sitemap. The sitemap is valid and contains all 41 canonical human routes, plus 31 AI resources for a total of 72 URLs. There are no Open Graph/Twitter images. JSON-LD is basic and does not yet provide a verified Person/WebSite/Breadcrumb graph. Client metadata updates do not update JSON-LD during every possible SPA navigation path.

## 11. Known Problems and Technical Debt

| Priority | Issue | Affected route/component | Relevant files | Recommended resolution |
|---|---|---|---|---|
| Critical before launch | V2 exists only as uncommitted local work. The branch tip equals `main`; losing/resetting the working tree would lose the redesign. | Entire V2 | Git working tree; all untracked V2 files | Review the diff, exclude unrelated/user-owned changes as needed, then create an explicit V2 checkpoint commit before further work. Do not merge or deploy without approval. |
| Critical before launch | No production URL mapping has been approved. | `/`, all `/v2-preview/*` | `src/App.tsx`, `src/data/siteConfig.ts`, hosting configuration | Approve the route-by-route cutover: likely V2 home to `/`, personal pages to unprefixed routes and existing investment URLs unchanged. Test redirects/canonicals before deployment. |
| High | Live `/current-portfolio` returns HTTP 404 even though the local generated build now creates a redirect. | `/current-portfolio` | `src/data/siteConfig.ts`, `scripts/generate-static-routes.mjs`, host configuration | Deploy/test a real platform/static redirect to `/portfolio`; confirm status code and destination on Cloudflare. |
| High | Personal biography/travel photography is absent, although the horsebox project now has supplied imagery. | V2 homepage, About, Work, Travel | `src/data/v2Content.ts`, future image assets | Obtain approved images, ownership/third-party permission, captions and alt text; extend the responsive-image approach and define an LCP budget before adding them. |
| High | Horsebox operating status is unknown. | Project overview and horsebox detail | `src/data/v2Content.ts` | Codie must confirm Active, Paused, Archived or another factual status before publication. |
| High | Future performance data is not fully reproducible from repository inputs. | `/portfolio`, homepage investing data | `scripts/generate-portfolio-performance.py`, private CSV, generated TypeScript | Define a frozen price/FX input policy and a privacy-safe reproducible fixture before regenerating values. Keep clear as-of dates. |
| High | The public `/review/` development artefact is live. | `/review/` | `public/review/` | Decide whether to remove it from production output, protect it or retain it deliberately. |
| High | AI pages and machine resources are independently indexable and included in the sitemap. | `/ai/*`, sitemap | `scripts/generate-ai-review.mjs`, `public/sitemap.xml` | Decide between noindex, canonical-to-human, or independent indexing. Remove machine files from the sitemap unless there is a deliberate SEO reason. |
| Medium | The source `index.html` fallback still says Week 16 and uses older font references. A full build replaces route fallback content, but the Vite development HTML exposes stale text before hydration. | Source fallback/all dev routes | `index.html`, static generator | Generate the source fallback from current data or reduce it to timeless content so it cannot drift. |
| Medium | Content and route information remains duplicated across the route manifest, generator fallback builders, `siteData.ts`, source documents and generated outputs. | Site-wide | `src/data/siteConfig.ts`, `src/data/siteData.ts`, generation scripts | Continue consolidation incrementally. Treat TypeScript/source documents as inputs and public AI/static files as generated derivatives. |
| Medium | `src/data/siteData.ts` is 1,757 lines and mixes current portfolio state, journal bodies, books, planned content and research. | Investment data layer | `src/data/siteData.ts` | Split into typed domain modules behind compatibility exports, with one source for current-state/as-of metadata. Avoid a single large rewrite. |
| Medium | No lint configuration exists. | Codebase | `package.json` | Add ESLint appropriate to React/TypeScript after checkpointing the current RC; avoid mixing a broad formatting rewrite with launch work. |
| Medium | Portfolio chart accessibility is incomplete. | `/`, `/portfolio` | `src/components/PortfolioValueChart.tsx` | Give frequency controls group/radio or pressed semantics and provide an accessible data table/download. |
| Medium | The XML sitemap contains 72 URLs, including 31 AI resources. All entries receive generator-controlled dates rather than a clear per-content modification policy. | Sitemap | `public/sitemap.xml`, `scripts/generate-ai-review.mjs` | Use editorial/data modification dates and the approved indexing policy. |
| Medium | Structured data is basic; no social image metadata exists. | All routes | `scripts/generate-static-routes.mjs`, `src/App.tsx` | Add verified Person, WebSite, Article/BlogPosting and BreadcrumbList data plus approved social images. Do not invent profile links or dates. |
| Medium | Google Fonts are an external render-path dependency. | All pages | `src/styles/index.css` | Confirm licensing and self-host/subset the three families if performance/privacy priorities justify it. |
| Medium | Document archive and image handling are heavy. | Journal detail/documents | `public/documents/weekly-summaries/`, `src/pages/ArticleDetail.tsx` | Keep native text primary; optimise previews, add explicit dimensions and consider lower-resolution/modern image variants. |
| Medium | Book-cover and generated-asset rights are undocumented. | Books and unused hero assets | `public/book-covers/`, `src/assets/` | Record provenance/licensing before launch; replace any unapproved asset. |
| Medium | Analytics has a code fallback configuration rather than being deployment-only. | Site-wide analytics | `src/components/Analytics.tsx` | Keep credentials/config in deployment environment only after confirming the Cloudflare analytics account is approved for V2. Do not expose tokens in documentation. |
| Low/strategic | V2 has no dedicated Timeline route, multi-topic Writing index, CV, contact form or newsletter. | Personal IA | V2 docs and pages | Treat these as product choices, not release-blocking bugs. Build only after the core launch scope is approved. |
| Low | Now content has no update workflow and was last reviewed 13 July 2026. | `/v2-preview/now` | `src/data/v2Content.ts` | Agree an update owner/cadence and make the date part of a small repeatable content workflow. |

## 12. Unresolved Content and Product Decisions

### Already decided

- Public name: **Codie Marillier**.
- V2 uses separate About, Work, Projects, Writing, Travel and Now pages.
- Existing investment URLs remain unchanged for the first release.
- Homepage actions are Explore my work, Read my writing and View current projects.
- Approved contact details are `codieandrew2609@gmail.com` and Instagram `@codiemarillier`.
- Confirmed horsebox legal name is **O and C Cotswolds Trailers Ltd**.
- Codie Capital Research remains the investing sub-brand.
- Marquee/event installation is not part of the current rendered Work edit.

### Questions Codie still needs to answer

**Homepage and launch**

- Is the current hero introduction approved as final production copy?
- What is the single most important action at the bottom of the final homepage?
- Should `/v2-preview` become `/` directly, and what exact unprefixed routes should the six personal pages use?
- Should Timeline be a separate page, remain inside About or be deferred?
- Should a downloadable CV be included?

**Photography and privacy**

- Which current portrait, Zimbabwe, school, cricket, France, Sweden, Cambodia, estate, reading and travel photographs may be used? Four horsebox photographs were supplied on 14 July 2026; future second-horsebox progress images remain optional.
- Who owns each photograph, who appears in it and are captions/third-party permissions approved?
- May the Colchester estate, its owner, the Sweden employer, the marquee company or other private parties be named?

**Work, education and qualifications**

- What are the exact approved work dates and role descriptions?
- What is the exact Inco Freight styling and role?
- What are the precise public course names and university dates?
- Which yachting, boat, jet-ski, diesel-engine, barista and mixology certificates may be named, with what dates?

**Projects**

- Is O and C Cotswolds Trailers Ltd active, paused, archived or otherwise?
- Is there a public horsebox website/social account?
- May the cryptocurrency token be named? What chain/dates/evidence support the approximate $500,000 peak market-cap claim?
- Should the travel-platform idea and wider Zimbabwe property-services ideas ever become public archived projects?
- What is the approved public styling and detail level for Marillier Properties?

**Travel**

- What is the verified country count?
- Which three destinations follow Cambodia?
- What are the Cambodia dates, and may any Dara photograph be used?

**Investing and publication policy**

- Should full portfolio values, old trades and the full crypto-loss story remain public after V2 launch?
- What update cadence is realistic for portfolio data, Now, reading, work/projects and goals?
- What frozen price/FX policy should be used before regenerating performance?
- Should AI-readable pages be independently indexed, noindexed or canonicalised to human pages?
- Should `/review/` remain public?
- Should decision/mistake placeholders remain indexable before full articles exist?
- Should the five AI-only research notes receive human-facing pages?

**Future features**

- Is LinkedIn approved for public use?
- Is a contact form useful enough to justify spam/privacy handling?
- Is a newsletter genuinely intended, and who would maintain it?
- What editing workflow is sustainable: TypeScript, Markdown/MDX, a lightweight local content layer or a CMS?

## 13. Current Live, Preview and Local Versions

### Live production

`https://codiemarillier.com/` was inspected on 14 July 2026. It returned HTTP 200 through Cloudflare and served the investment-led **Codie Capital Research** homepage. At that time, the live static content still exposed a Week 18 account value and cash amount; those values were later removed from the repository by the privacy refactor.

The live site has **not** changed to Website V2.

Observed production routing:

- `/v2-preview` returned HTTP 404;
- `/current-portfolio` returned HTTP 404;
- `/portfolio` redirected to `/portfolio/` and then served successfully;
- `/ai/` returned HTTP 200;
- `/review/` returned HTTP 200;
- major investment page paths redirect to trailing-slash versions at the Cloudflare edge.

The repository contains no deployment metadata that proves which exact Git commit is running, but the live content aligns with the committed investment-led site rather than the uncommitted V2 working tree.

### Local release candidate

The current source of truth for V2 implementation is the dirty local working tree on `codex/website-v2-foundations`. Its preview is:

```text
http://127.0.0.1:4173/v2-preview
```

All nine V2 routes work locally and have generated static fallbacks in a current production build. They remain noindex and isolated from the production sitemap/navigation.

### Deployed preview

No deployed V2 preview URL was found in repository configuration or on the production domain. The only confirmed V2 preview is local. There are no private deployment credentials in this report.

### Source-of-truth rule

- For what the public currently sees: the live investment-led site is authoritative.
- For the next V2 design/content implementation: the local uncommitted working tree is authoritative.
- For governing product/content decisions: `AGENTS.md` and `docs/website-v2/` are authoritative.
- For portfolio values: distinguish the 7 July published Week 18 review from the 10 July generated ledger estimate; do not collapse them into one as-of date.

## 14. Recommended Next Steps

### Immediate

1. **Create a reviewed V2 checkpoint.** The entire V2 implementation is uncommitted. Review the dirty tree, separate any unrelated/user-owned changes and commit the release-candidate state to its branch. This protects the work before further content or deployment changes.
2. **Resolve launch-blocking facts and assets.** Confirm horsebox status, final hero copy, remaining personal photographs/captions and any names/dates/qualifications intended for launch. These cannot be solved safely in code.
3. **Approve the URL and indexing plan.** Define `/v2-preview` cutover, personal-page URLs, existing investment routes, `/current-portfolio`, `/review/` and `/ai` policy in one route table before changing production routes.
4. **Freeze current financial inputs.** Do not regenerate portfolio performance until the price/FX policy and source fixture are agreed.

These steps come first because they prevent loss of work, factual publication errors and avoidable SEO/routing changes.

### Next Development Phase

1. Extend the responsive approach already used by the horsebox gallery to the approved personal photographic layer, with explicit dimensions, provenance, captions and alt text.
2. Implement the approved launch URL mapping while keeping `/portfolio`, `/journal`, `/letters`, `/books`, `/process`, `/philosophy`, `/decision-archive`, `/mistakes-lessons` and `/disclaimer` intact.
3. Strengthen the homepage/biography only where approved content adds specificity; do not initiate another broad visual redesign.
4. Decide whether Timeline and a broader multi-topic Writing index are launch scope or post-launch scope. They are valuable but not required to prove the current V2 concept.
5. Improve chart semantics and image/document performance without rewriting the preserved investment archive.

### Before Launch

1. Deploy a non-production Cloudflare preview from a recorded commit.
2. Test every canonical route, alias, trailing-slash rule, 404 status, canonical, robots directive and sitemap entry on the actual host.
3. Verify `/current-portfolio` redirect and decide the fate of `/review/` and `/ai/*`.
4. Run clean-checkout `npm run validate` and `npm run build`.
5. Add/run lint, an automated accessibility scan and Lighthouse/Web Vitals checks; complete keyboard and screen-reader manual review.
6. Confirm every public biography/project claim, portfolio as-of date, photograph permission and disclaimer.
7. Add approved social images and richer verified structured data.
8. Keep a rollback deployment of the current investment-led site and record the launch commit.

### After Launch

1. Monitor Cloudflare analytics, 404s, canonical/indexing reports and Core Web Vitals.
2. Establish realistic update cadences for Now, portfolio, reading, projects and annual biography review.
3. Decide whether TypeScript editing remains sustainable or whether Markdown/MDX or a small CMS is justified.
4. Add travel stories, timeline entries, non-investment writing and project updates only when real source material exists.
5. Continue migrating `siteData.ts` into domain modules gradually, with validation protecting stable URLs/content.

## 15. Recommended Direction

Continue the current design direction. Do not rebuild it again from scratch.

The present design has solved the central strategic problem: it introduces Codie as a person before it introduces the portfolio. It is modern, technically confident, recognisably Zimbabwe-connected and more personal because it uses specific first-person stories. It also preserves the strongest asset in the repository—the public investment record—without allowing it to dominate the new homepage.

The next focus should be content approval and photography, not more visual experimentation. The missing imagery is now the clearest gap between “strong designed local site” and “complete personal website”. Biography and storytelling should be strengthened selectively through approved evidence, especially photographs and precise work/travel context. Avoid adding generic self-description simply to make pages longer.

The homepage does not need another structural rebuild. It may need final copy tightening and a photographic layer, but its sequence and three main actions are coherent. The Work and Projects pages should remain separate. The investing migration is sufficient for an initial V2 launch because the gateway is built and all existing URLs remain usable; restyling every investment page into the V2 palette can happen incrementally after the personal shell launches.

Move toward launch, but only through a controlled preview deployment and factual sign-off. The project is beyond prototype exploration. It is a local release candidate awaiting decisions, assets, a Git checkpoint and host-level verification.

## 16. Questions for the Other Assistant

1. What single promise should a visitor understand from the first screen, and is the current “at the beginning—building deliberately” wording the clearest expression of it?
2. Which five to eight photographs would most efficiently make the site unmistakably Codie's without turning it into a scrapbook?
3. What should be the main narrative arc through Zimbabwe, practical work, investing, travel and future ambition, and which details distract from that arc?
4. Is a dedicated Timeline important for launch, or does the current About “Chapters” structure tell the story more calmly?
5. Which project statuses and claims can Codie confidently approve now, particularly for O and C Cotswolds Trailers Ltd and the cryptocurrency project?
6. How much portfolio detail should remain public once the site has a broader audience that includes employers and future partners?
7. Should AI-readable pages remain an independently indexable product feature, or should they be treated as machine-accessible derivatives of canonical human pages?
8. What is the smallest credible launch scope: current V2 pages plus preserved investing, or should photography, Timeline and broader Writing all be required first?
9. What sustainable update promise can Codie realistically keep for Now, portfolio reviews, reading and projects?
10. What evidence would make Codie comfortable saying the site finally feels like him rather than a polished template?

## 17. Copy-and-Paste Context Summary

Website V2 is a strong, fully built local release candidate inside the existing React 18/TypeScript/Vite/Tailwind repository. It has not been deployed. The public site at `https://codiemarillier.com` still serves the investment-led Codie Capital Research homepage. The V2 source exists only as uncommitted work on `codex/website-v2-foundations`; the branch's committed tip is still the same `1067e79` commit as `main` and `origin/main`. The local preview is `http://127.0.0.1:4173/v2-preview`.

V2 now has nine noindex routes: the personal homepage; About; Work; Projects; Writing; Travel; Now; a Codie Capital Research gateway; and an O and C Cotswolds Trailers Ltd project page. The primary navigation is About, Work, Projects, Writing, Travel and Now. Existing investment URLs remain unchanged. Approved contact details are `codieandrew2609@gmail.com` and Instagram `@codiemarillier`.

The design is dark, editorial and technical, using near-black, warm ivory, sand, mint green and muted bronze. Newsreader handles display type, Manrope body text and IBM Plex Mono technical labels. It combines a large personal hero and restrained orbit motion with calm editorial detail pages. Mobile navigation includes focus management, Escape closing, focus return and scroll lock. Reduced motion is globally supported.

The homepage is led by Codie Marillier, Zimbabwe and the idea that he is at the beginning and building deliberately. The wider V2 pages preserve specific first-person stories about the family property company, a childhood lawn-care business, France/yachting, leaving university, crypto losses and reading under the desk; the standalone early-lessons band is no longer shown on the homepage. Work currently features Sweden and estate work in England; marquee work is preserved in data but hidden. Projects are Codie Capital Research, Website V2, O and C Cotswolds Trailers Ltd and Zimbabwe property-access research. Travel currently focuses on Cambodia and Dara. The horsebox page now contains four supplied photographs, including the newest interior renovation-progress view; another horsebox is confirmed as still being renovated.

The original investment archive is preserved: `/portfolio`, `/journal`, `/letters`, `/books`, `/process`, `/philosophy`, `/decision-archive`, `/mistakes-lessons` and `/disclaimer`. There are 20 journal entries, one letter, nine books, 16 holding records, 17 review document sets and five AI-only research notes. The capital gateway begins with My First Letter, offers 17 chronological portfolio reviews in a swipeable rail, then separates three standalone journal pieces.

Portfolio data distinguishes the authored review layer from the 10 July benchmark-comparable percentage series. Microsoft was re-entered on 8 July. The performance generator uses a private brokerage CSV, a runtime-only baseline and market prices/FX; a frozen reproducibility policy is still required before future regeneration.

Current validation is clean. On 14 July 2026, `npm run validate`, `npm test`, an isolated `npm run build`, sitemap XML validation, dependency validation and `git diff --check` all passed. The build validated 41 canonical routes, 21 static manifest routes and all internal targets. Gzip sizes were 58.26 KiB initial JS, 9.23 KiB CSS and 36.18 KiB site data. Browser smoke tests covered all nine V2 routes, 11 preserved top-level routes and 30 dynamic journal/letter/book routes at 320px with no H1/main/overflow/missing-alt failures. There is no lint setup, no Lighthouse/axe suite and no final image/LCP budget.

The most important remaining issues are: checkpoint/commit the uncommitted V2 work; approve final hero copy and launch URL mapping; supply remaining personal photography/captions; confirm horsebox operating status and any private names/dates/qualifications; decide AI/review indexing policy; fix and test the live `/current-portfolio` alias, which currently returns 404; define frozen portfolio price/FX inputs; and verify Cloudflare redirects, 404 statuses, canonicals and analytics in a non-production deployment.

Recommendation: continue the current design, strengthen it with approved photography and precise storytelling, and move toward a controlled preview deployment. Do not perform another wholesale redesign or migrate investment URLs. The site is past prototype stage; the next work is launch preparation, factual approval and host-level verification.
