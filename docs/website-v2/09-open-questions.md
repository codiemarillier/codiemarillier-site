# Open Questions and Content Gaps

Codex must not guess these.

## Identity and homepage

- Final two-sentence homepage introduction
- Final primary and secondary calls to action — resolved for the local release candidate: Explore my work, Read my writing and View current projects
- Three to five interests shown immediately
- Exact homepage project cards

## Navigation

- Final top-level pages — resolved for the local release candidate: About, Work, Projects, Writing, Travel and Now
- Whether Timeline is top-level or part of About
- Whether Work and Projects are separate — resolved: they remain separate pages
- Whether a downloadable CV should exist

## Public contact

- Email address — resolved: `codieandrew2609@gmail.com`
- LinkedIn URL
- Contact form
- Newsletter or update subscription

## Location and personal details

- Whether to show current city
- Whether to show age
- Whether to show birthday or birth month

## Work

- Permission to name the Colchester estate
- Permission to name the estate owner
- Exact marquee company name
- Exact work dates
- Exact Inco Freight role
- Permission to name the Sweden employer
- Exact airsoft event name

## Companies and projects

- Exact legal name of the horsebox business — resolved 13 July 2026: **O and C Cotswolds Trailers Ltd**
- Current business status
- Public website or social links
- Further photographs of the second horsebox as its renovation progresses (four current project photographs supplied 14 July 2026)
- Whether the crypto token may be named
- Token chain and dates
- Evidence of approximate $500,000 peak market cap

## Family business

- Exact public styling of Marillier Properties
- How much operational detail may be published
- Whether the company site should be linked

## Travel

- Exact number of countries
- Next three featured destinations after Cambodia
- Dates of Cambodia trip
- Permission to use any Dara photograph
- Additional travel photographs and any more specific captions beyond the four images approved on 14 July 2026

## Qualifications

- Exact yacht certificates
- Boat licence
- Jet-ski qualification
- Diesel-engine certificate
- Barista certificate
- Advanced mixology certificate
- Which should be public

## Education

- Exact course names
- Exact dates
- Preferred wording about leaving university

## Investing

- Whether full portfolio values remain public
- Whether full crypto-loss story remains public
- Whether all old trades remain visible
- Benchmark choices
- Data update method

## Updating cadence

Confirm what Codie can update:

Portfolio journal cadence — resolved 17 July 2026: publish grouped monthly reviews. The first four cover Weeks 1–4, 5–8, 9–12 and 13–16; Review 05 covers 3 July–3 August 2026 with its valuation updated on 6 August 2026.

### Weekly

- Now page?
- Current reading?
- Portfolio data?
- Work/project status?

### Monthly

- Portfolio review;
- Timeline?
- Travel?
- Goals?
- Project notes?

### Annually

- Full biography?
- CV?
- country count?
- year review?

## Photos needed

- current portrait;
- Zimbabwe;
- boarding school;
- cricket;
- France;
- Sweden;
- Cambodia;
- marquee work;
- estate work;
- horseboxes;
- reading/books;
- travel landscapes.

## Launch success

Still confirm:

- the five most important V2 outcomes in Codie’s own words;
- what would make V2 feel unsuccessful;
- the final action invited at the bottom of the homepage.

---

## Repository-audit questions — 13 July 2026

These questions were added from the code audit. They are not answered by the repository and should not be guessed.

### Development blockers

- Which percentage record should lead current pages: the authored review series or the later benchmark-comparable transaction-ledger series? Both may be shown only when their different as-of dates and methods are explicit.
- Please confirm the 8 July Microsoft purchase represented in `portfolioSnapshot` and the generated performance data. Is Microsoft currently held, and what verified quantity/transaction note should replace the holdings record that says it closed on 1 June?
- Where is the authoritative private brokerage export stored, who may access it, and may a privacy-safe transaction fixture be committed for repeatable calculation tests?
- Should existing investment URLs remain at `/portfolio`, `/journal`, `/letters`, `/process` and related paths for V2, or eventually move below `/investing/` with redirects? The safest first release is to keep the current URLs, but this needs approval.
- Is the production canonical host definitely `https://codiemarillier.com` rather than `https://www.codiemarillier.com`, and does the live host enforce the preferred redirect?
- Is Cloudflare Pages the active production platform, and what are its current SPA fallback, redirect and 404 settings? The repository contains no platform config and `public/_redirects` is empty.

### SEO and archive policy

- Should the AI-readable HTML pages be independently indexable, or should they be `noindex`/canonicalised to the equivalent public pages to avoid duplicate content?
- Should machine resources such as `site-content.json` and `all-content.txt` remain in the XML sitemap?
- Should `/decision-archive` and `/mistakes-lessons` remain public placeholder pages, be hidden from navigation but retained, or redirect to another investing page until full entries exist?
- Are the five research notes intended to receive human-facing Writing/Investing pages, or remain internal/AI-only records?
- Should the static `/review/` page and its screenshots be publicly deployed, or treated as a development-only artefact?

### Assets, analytics and publication rights

- Are the nine raster book-cover images licensed/approved for continued public use?
- Were the two generated investment hero images created with rights suitable for public reuse, and should either be retained for the Investing section?
- May the current Cloudflare Web Analytics token/account be reused for V2, and should the hard-coded fallback token be removed in favour of deployment configuration?
- Are the original DOCX portfolio reviews and letter intended to remain publicly downloadable indirectly through their generated PDFs/viewers, or should access be limited to the derived public versions?

### Content operations

- Who will update frequently changing content, and what workflow is realistic: editing typed files, Markdown/MDX, a lightweight local content layer, or a CMS?
- What is the required distinction between “published review value”, “latest ledger estimate” and “live portfolio value”, and how often may each be updated?
- Which dates should sitemap `lastmod` represent: editorial publication, factual data update, or last material page revision?
- Should book entries add reading status, finish date, rating and “what changed” fields, and which of those are approved for existing books?
- Is Week 17 intentionally absent from every archive and should the public timeline explicitly state the switch to fortnightly reviews?

### Non-blocking technical choices

- Is route-level static generation plus React hydration still the preferred delivery model, or is a future framework evaluation acceptable after V2 content architecture is stable? The audit recommends retaining the current stack for now.
- Should fonts be self-hosted for performance/privacy if their licences permit it?
- Performance budgets — initial JavaScript is capped at 70 KiB gzip, CSS at 12 KiB gzip and the long-form data chunk at 45 KiB gzip. Image and mobile LCP budgets remain open until approved photography exists.

## Resolved during foundation work — 13 July 2026

- The 8 July Microsoft transaction was verified in the private brokerage export. Microsoft is a current holding in the 10 July ledger state; its quantity and personal transaction amount are intentionally unpublished.
- The Week 18 review and 10 July ledger estimate are both retained. The interface now labels them separately rather than presenting them as one as-of date.
- The source export used for reconciliation is a private local brokerage CSV. Its path, provider-specific account reference and contents remain outside the public repository.
- Existing investment URLs remain canonical for the foundation phase. The route manifest records `/start` and `/current-portfolio` as generated legacy redirects.
- The current stack is retained for the foundation phase; no framework migration is planned before content architecture is stable.

The market-value series is still not fully reproducible because Yahoo Finance prices and FX rates are fetched live and can be revised. A frozen price/FX input policy remains open before future performance figures are regenerated.

## Preview completion status — 13 July 2026

No unresolved question blocks the fully tested local V2 homepage preview. Unconfirmed facts are either omitted or visibly identified as requiring confirmation.

The following decisions genuinely block moving from the contained preview into a production V2 release:

- approval of final homepage introduction wording and the primary action visitors should take;
- approval of the exact public navigation and whether/when investing routes move below `/investing/`;
- approval of a public contact method;
- permission and captions for any personal or third-party photography;
- confirmation of private names, legal names, dates and qualifications before they are displayed;
- a decision on the canonical production host/platform redirects and the indexing policy for AI/review artefacts;
- a frozen market-price and FX input policy before any performance dataset is regenerated.

These are publication gates, not local-development failures. The existing investment-led site remains the production-facing implementation, and `/v2-preview` remains isolated and noindex.

## Contact method resolved — 13 July 2026

Codie explicitly approved the following details for the Website V2 preview:

- email: `codieandrew2609@gmail.com`;
- Instagram: `@codiemarillier`.

LinkedIn and a contact form remain unconfirmed and are not included.

## Navigation and homepage actions resolved — 13 July 2026

Codie confirmed that:

- the final personal navigation should use separate pages;
- all existing investment URLs should remain unchanged;
- the homepage should lead visitors towards three actions: explore work, read writing and view current projects;
- homepage preview sections should link to deeper versions of those subjects.

The local preview now implements separate About, Work, Projects, Writing, Travel and Now routes below `/v2-preview/`. This does not resolve whether those preview prefixes are removed at production launch; that remains a launch URL-mapping decision.

## Local release-candidate blockers — 13 July 2026

No unanswered question blocks the fully tested local release candidate. The following items require Codie's approval or external production information before publication:

- whether `/v2-preview` becomes `/` and how the six personal-page URLs map at launch;
- the canonical-host and Cloudflare/Netlify redirect/404 configuration;
- whether the AI-readable pages, machine resources and review artefacts remain indexable or in the sitemap;
- any additional personal photography and future photographs of the second horsebox, including captions and third-party permissions;
- the current operating status of O and C Cotswolds Trailers Ltd;
- any private employer names, precise work dates, qualification names or project claims not already confirmed;
- image and mobile LCP budgets once the approved photography set is known;
- a frozen market-price/FX input policy before regenerating future performance figures.

These are publication gates rather than unfinished local implementation work. The release candidate intentionally keeps the current public investing URLs unchanged and does not deploy or merge anything.

## Horsebox photography update — 14 July 2026

- Codie supplied four photographs for the horsebox project page and identified the final image as the newest photograph.
- Codie confirmed that another horsebox is still being renovated.
- The photographs resolve the empty gallery for the current project page. Future progress photographs and the company's formal operating status remain open.

## Travel photography update — 14 July 2026

- Codie supplied four photographs and identified their contexts: Angkor Wat in Cambodia, two from the period working around yachts in the south of France, and one from Monaco.
- These photographs are approved for the contained local preview and now appear with conservative captions that do not infer dates, yacht names or unconfirmed harbour locations.
- The current set resolves the missing-photography question for the Cambodia and France/Monaco travel chapters. Exact travel dates and any permission needed for future third-party portraits remain open.

## Portfolio-review cadence resolved — 17 July 2026

- Replace the visible individual weekly/fortnightly review sequence with four grouped reviews supplied by Codie.
- Continue the portfolio journal on a monthly cadence.
- Add Review 05 as the latest entry for 3 July–3 August 2026, using the 6 August 2026 valuation update.
- Preserve the old source material and route history without keeping the superseded entries in the visible archive.
