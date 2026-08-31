# AGENTS.md

## Project objective

This repository contains codiemarillier.com.

Version 2 must transform the site from an investment-led website into a modern, interactive personal website centred on **Codie Marillier**.

The website should present Codie through biography, work, projects, investing, reading, travel, sport and long-term ambitions.

## Required reading

Before making material design, content or architectural decisions, read every file in:

`/docs/website-v2/`

Treat those files as the source of truth for Website V2.

## Non-negotiable rules

1. Never invent biographical facts, dates, employers, qualifications, investment results, project outcomes or quotations.
2. Place uncertain facts in `/docs/website-v2/09-open-questions.md`.
3. Do not publish private names, addresses, financial details or confidential employer information.
4. Preserve existing portfolio data, calculations, journal entries, letters, book notes and investment history.
5. Do not silently alter investment calculations.
6. Do not delete existing routes until redirects and migration paths are defined.
7. Do not deploy or merge to production without explicit approval.
8. Do not represent Codie as a regulated financial adviser, fund manager or authorised investment provider.
9. Treat Zimbabwe property concepts as research, not as a live investment offer.
10. Keep the exact public name spelling as **Codie Marillier**.
11. The homepage must not be led by portfolio figures.
12. The primary brand is **Codie Marillier**. Codie Capital Research is a sub-brand for investing.
13. Store frequently changing content centrally rather than hard-coding it in multiple components.
14. Build mobile-first and support `prefers-reduced-motion`.
15. Maintain accessibility, performance, SEO, structured data, sitemap and canonical URL quality.

## Design principles

- Dark, modern and technically sophisticated
- Mainly black, off-black, white, grey and silver
- Experimental, but still readable and credible
- Professional first; personal details revealed gradually
- Natural, understated humour
- Strong typography and intentional motion
- Personal photography used as storytelling
- Zimbabwe should be prominent without using stereotypes
- Animations must support the content rather than block it
- Avoid generic résumé, corporate consultancy or finance-fund aesthetics

## Development process

For substantial tasks:

1. Inspect before editing.
2. Explain what is being preserved.
3. Create a narrow implementation plan.
4. Make contained changes.
5. Run available lint, test and build commands.
6. Report changed files and unresolved risks.
7. Do not combine unrelated redesigns into one uncontrolled change set.

## Content editing

Where possible, editable website content should live in structured data or content files rather than JSX/HTML.

Recommended editable datasets include:

- current status / Now page;
- projects;
- work experiences;
- timeline;
- travel stories;
- books;
- writing;
- portfolio data;
- goals;
- homepage featured content.

## Tone

The writing should feel:

- intelligent;
- ambitious;
- self-aware;
- honest;
- conversational where appropriate;
- professional without being corporate;
- humorous only where it feels natural.

Avoid exaggerated self-promotion.

## Claims requiring verification

Do not publish the following without clear evidence or confirmation:

- the exact name and legal styling of O&C Horsebox Trailers Limited;
- the exact cryptocurrency token name;
- the approximate $500,000 peak market capitalisation;
- exact dates for some work and travel experiences;
- employer or estate owner names;
- qualifications and certification dates;
- exact number of countries visited;
- names or photographs of third parties;
- any statement that could be interpreted as offering an investment.

## Completion standard

Website V2 is not complete until:

- the site works on mobile;
- existing content is preserved;
- financial calculations are verified;
- all public facts are approved;
- stale values are removed;
- links and redirects are tested;
- accessibility and reduced motion are checked;
- metadata, sitemap and canonical URLs are valid;
- the site feels like Codie rather than a template.
