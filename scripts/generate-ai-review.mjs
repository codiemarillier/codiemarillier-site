import { build } from 'esbuild';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const outputRoot = process.argv[2] || 'public';
const aiRoot = `${outputRoot}/ai`;
const tempModule = `/tmp/codie-site-data-${Date.now()}.mjs`;
const siteUrl = 'https://codiemarillier.com';

await build({
  entryPoints: ['src/data/siteData.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tempModule,
  logLevel: 'silent',
});

const {
  brand,
  disclaimerPoints,
  holdings,
  journalEntries,
  portfolioChangeLog,
  portfolioCrawlerNotes,
  portfolioRoles,
  portfolioSnapshot,
  processRules,
  readingDevelopment,
  transactionSummary,
} = await import(pathToFileURL(tempModule).href);

await rm(aiRoot, { recursive: true, force: true });
await mkdir(`${aiRoot}/journal`, { recursive: true });
await rm(tempModule, { force: true });

const pages = [
  {
    path: '/',
    title: 'Home',
    summary:
      'The homepage introduces Codie Capital Research as a personal investment journal, gives quick links to About, portfolio, weekly reviews, and the journal archive.',
  },
  {
    path: '/about',
    title: 'About Codie Marillier',
    summary:
      'The about page explains Codie as a private long-term investor managing his own portfolio, his early interest in markets, the COVID lockdown course, first Bitcoin investment, family real estate influence, mistakes from leveraged crypto trading, accountability, and reading development.',
  },
  {
    path: '/books',
    title: 'Books That Shaped My Thinking',
    summary:
      'A standalone reading and development page with full personal reflections on books that shaped Codie’s investing, money, discipline, purpose, risk, and long-term decision-making.',
  },
  {
    path: '/philosophy',
    title: 'Investment Philosophy',
    summary:
      'The philosophy page explains the personal approach: long-term investing in public companies, ETFs, selected assets, quality businesses at sensible prices, controlled risk, cash discipline, gold as a hedge, and avoiding leverage or emotional trading.',
  },
  {
    path: '/process',
    title: 'Investment Process',
    summary:
      'A standalone rulebook page covering capital protection, position sizing, written reasoning, cash discipline, no leverage, no impulsive trades, and the weekly review process.',
  },
  {
    path: '/journal',
    title: 'Portfolio Journal',
    summary:
      'The journal page lists weekly portfolio reviews, trade reflections, market notes, and lessons from Codie’s own portfolio record.',
  },
  {
    path: '/portfolio',
    title: 'Current Portfolio',
    summary:
      'The portfolio page records Codie’s own holdings, cash, transaction-backed notes, closed lessons, roles, and portfolio structure. It is not a model portfolio and not investment advice.',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer',
    summary: brand.disclaimer,
  },
];

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function textBlock(lines) {
  return lines
    .map((line) => `<p>${esc(line).replaceAll('\n', '<br>')}</p>`)
    .join('\n');
}

function layout({ title, description, canonicalPath = '/ai/', body }) {
  const canonicalUrl = canonicalPath.startsWith('http') ? canonicalPath : `${siteUrl}${canonicalPath}`;

  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)} | AI Review | Codie Capital Research</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${esc(canonicalUrl)}">
    <style>
      body { margin: 0; background: #f6f1e8; color: #20201d; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.65; }
      main { max-width: 980px; margin: 0 auto; padding: 48px 20px 72px; }
      header, section, article { border-bottom: 1px solid #d8d0c0; padding: 28px 0; }
      h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; line-height: 1.12; }
      h1 { font-size: clamp(2.2rem, 6vw, 4rem); margin: 0 0 16px; }
      h2 { font-size: 2rem; margin: 0 0 12px; }
      h3 { font-size: 1.35rem; margin: 24px 0 8px; }
      a { color: #183a34; font-weight: 700; }
      .eyebrow { color: #9a7a2f; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; }
      .note { background: #fffaf0; border: 1px solid #d8d0c0; padding: 16px; }
      .grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
      .card { background: #fffaf0; border: 1px solid #d8d0c0; padding: 16px; }
      code { background: #fffaf0; padding: 2px 5px; }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">AI-readable static review pack</p>
        <h1>${esc(title)}</h1>
        <p>${esc(description)}</p>
        <p class="note">${esc(brand.disclaimer)}</p>
        <p><a href="/ai/index.html">Back to AI review index</a> · <a href="/">Open live React site</a></p>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

const indexLinks = [
  ...pages.map((page) => `<li><a href="${page.path === '/' ? '/' : page.path}">${esc(page.title)} live route</a> - <a href="/ai/pages.html#${esc(page.path)}">AI summary</a></li>`),
  ...journalEntries.map((entry) => `<li><a href="/journal/${entry.slug}">${esc(entry.title)} live route</a> - <a href="/ai/journal/${entry.slug}.html">AI-readable full text</a></li>`),
];

await writeFile(
  `${aiRoot}/index.html`,
  layout({
    title: 'Codie Capital Research Review Index',
    description:
      'A plain HTML version of the site content for ChatGPT, search tools, and reviewers that cannot fully render the React app.',
    canonicalPath: '/ai/',
    body: `
      <section>
        <h2>How to Review This Site</h2>
        <p>This pack exists because some external tools can open the public URL but cannot reliably extract text from a JavaScript-rendered React app. These pages are static HTML and contain the same key record: pages, portfolio facts, journal entries, and disclaimer language.</p>
        <p>Important context: this is Codie Marillier's personal investment research and portfolio journal. It is not investment advice, a fund, a service, or a capital-raising site.</p>
      </section>
      <section>
        <h2>Core Links</h2>
        <ul>${indexLinks.join('\n')}</ul>
      </section>
      <section>
        <h2>Portfolio Snapshot</h2>
        <p>Week 15 Portfolio Summary dated 16 June 2026 is the current source-of-truth update. Latest account value is £2,055.86, cash is £118.47, and latest return is +2.84% versus starting cost basis.</p>
        <div class="grid">
          ${Object.entries(portfolioSnapshot)
            .map(([key, value]) => `<div class="card"><strong>${esc(key)}</strong><br>${esc(value)}</div>`)
            .join('\n')}
        </div>
      </section>
      <section>
        <h2>Transaction Summary</h2>
        <div class="grid">
          ${transactionSummary
            .map((item) => `<div class="card"><strong>${esc(item.label)}</strong><br>${esc(item.value)}</div>`)
            .join('\n')}
        </div>
      </section>
      <section>
        <h2>Portfolio Change Log</h2>
        ${portfolioChangeLog
          .map(
            (change) => `<article class="card">
              <h3>${esc(change.type)} - ${esc(change.title)}</h3>
              <p><strong>Date:</strong> ${esc(change.date)}</p>
              <p>${esc(change.text)}</p>
              ${change.relatedSlug ? `<p><strong>Journal:</strong> /journal/${esc(change.relatedSlug)}</p>` : ''}
            </article>`,
          )
          .join('\n')}
      </section>
    `,
  }),
);

await writeFile(
  `${aiRoot}/pages.html`,
  layout({
    title: 'Static Page Summaries',
    description: 'Plain HTML summaries of the main site routes.',
    canonicalPath: '/ai/pages.html',
    body: pages
      .map(
        (page) => `<article id="${esc(page.path)}">
          <p class="eyebrow">${esc(page.path)}</p>
          <h2>${esc(page.title)}</h2>
          <p>${esc(page.summary)}</p>
          <p><a href="${page.path}">Open live route</a></p>
        </article>`,
      )
      .join('\n'),
  }),
);

await writeFile(
  `${aiRoot}/portfolio.html`,
  layout({
    title: 'Portfolio and Roles',
    description: 'AI-readable portfolio record, holdings, role structure, and transaction summary.',
    canonicalPath: '/ai/portfolio.html',
    body: `
      <section>
        <h2>Portfolio Snapshot</h2>
        <p>Week 15 Portfolio Summary dated 16 June 2026 is the current source-of-truth update. Latest account value is £2,055.86, cash is £118.47, and latest return is +2.84% versus starting cost basis.</p>
        <div class="grid">
          ${Object.entries(portfolioSnapshot)
            .map(([key, value]) => `<div class="card"><strong>${esc(key)}</strong><br>${esc(value)}</div>`)
            .join('\n')}
        </div>
      </section>
      <section>
        <h2>Transaction Summary</h2>
        <div class="grid">
          ${transactionSummary
            .map((item) => `<div class="card"><strong>${esc(item.label)}</strong><br>${esc(item.value)}</div>`)
            .join('\n')}
        </div>
      </section>
      <section>
        <h2>Current and Closed Holdings</h2>
        ${holdings
          .map(
            (holding) => `<article class="card">
              <h3>${esc(holding.ticker)} - ${esc(holding.name)}</h3>
              <p><strong>Position size:</strong> ${esc(holding.positionSize)}</p>
              <p><strong>Sleeve:</strong> ${esc(holding.sleeve)}</p>
              <p><strong>Role:</strong> ${esc(holding.role)}</p>
              <p><strong>Status:</strong> ${esc(holding.status)}</p>
              <p><strong>Transaction note:</strong> ${esc(holding.transactionNote)}</p>
            </article>`,
          )
          .join('\n')}
      </section>
      <section>
        <h2>Portfolio Change Log</h2>
        ${portfolioChangeLog
          .map(
            (change) => `<article class="card">
              <h3>${esc(change.type)} - ${esc(change.title)}</h3>
              <p><strong>Date:</strong> ${esc(change.date)}</p>
              <p>${esc(change.text)}</p>
              ${change.relatedSlug ? `<p><strong>Journal:</strong> /journal/${esc(change.relatedSlug)}</p>` : ''}
            </article>`,
          )
          .join('\n')}
      </section>
      <section>
        <h2>Current Winners and Drags</h2>
        <h3>Winners</h3>
        <ul>${portfolioCrawlerNotes.winners.map((item) => `<li>${esc(item)}</li>`).join('\n')}</ul>
        <h3>Drags</h3>
        <ul>${portfolioCrawlerNotes.drags.map((item) => `<li>${esc(item)}</li>`).join('\n')}</ul>
      </section>
      <section>
        <h2>Latest Action Plan</h2>
        <ul>${portfolioCrawlerNotes.latestActionPlan.map((item) => `<li>${esc(item)}</li>`).join('\n')}</ul>
      </section>
      <section>
        <h2>Portfolio Roles</h2>
        ${portfolioRoles
          .map(
            (role) => `<article class="card">
              <h3>${esc(role.title)}</h3>
              <p><strong>Examples:</strong> ${esc(role.examples)}</p>
              <p>${esc(role.text)}</p>
            </article>`,
          )
          .join('\n')}
      </section>
    `,
  }),
);

for (const entry of journalEntries) {
  await writeFile(
    `${aiRoot}/journal/${entry.slug}.html`,
    layout({
      title: entry.title,
      description: `${entry.date}. ${entry.excerpt}`,
      canonicalPath: `/ai/journal/${entry.slug}.html`,
      body: `
        <article>
          <p class="eyebrow">${esc(entry.date)} / ${esc(entry.category)}</p>
          <h2>${esc(entry.title)}</h2>
          <p>${esc(entry.excerpt)}</p>
          ${textBlock(entry.body)}
        </article>
      `,
    }),
  );
}

const allText = [
  `${brand.name} - ${brand.subtitle}`,
  brand.disclaimer,
  '',
  'MAIN PAGES',
  ...pages.map((page) => `${page.path} - ${page.title}\n${page.summary}`),
  '',
  'PORTFOLIO SNAPSHOT',
  ...Object.entries(portfolioSnapshot).map(([key, value]) => `${key}: ${value}`),
  '',
  'TRANSACTION SUMMARY',
  ...transactionSummary.map((item) => `${item.label}: ${item.value}`),
  '',
  'HOLDINGS',
  ...holdings.map(
    (holding) =>
      `${holding.ticker} - ${holding.name}\nPosition: ${holding.positionSize}\nSleeve: ${holding.sleeve}\nRole: ${holding.role}\nStatus: ${holding.status}\nNote: ${holding.transactionNote}`,
  ),
  '',
  'PORTFOLIO WINNERS',
  ...portfolioCrawlerNotes.winners,
  '',
  'PORTFOLIO DRAGS',
  ...portfolioCrawlerNotes.drags,
  '',
  'LATEST ACTION PLAN',
  ...portfolioCrawlerNotes.latestActionPlan,
  '',
  'PROCESS RULES',
  ...processRules.map((rule) => `${rule.title}\n${rule.text}`),
  '',
  'BOOKS THAT SHAPED MY THINKING',
  ...readingDevelopment.map((book) => `${book.title} - ${book.author}\n${book.category}\n${book.paragraphs.join('\n\n')}`),
  '',
  'JOURNAL ENTRIES',
  ...journalEntries.map((entry) => `${entry.title}\n${entry.date} / ${entry.category}\n${entry.excerpt}\n${entry.body.join('\n\n')}`),
  '',
  'DISCLAIMER POINTS',
  ...disclaimerPoints,
].join('\n\n');

await writeFile(`${aiRoot}/all-content.txt`, allText);

const sitemapRoutes = [
  ...pages.map((page) => page.path),
  '/ai/',
  '/ai/pages.html',
  '/ai/portfolio.html',
  '/ai/all-content.txt',
  ...journalEntries.map((entry) => `/journal/${entry.slug}`),
  ...journalEntries.map((entry) => `/ai/journal/${entry.slug}.html`),
];

const uniqueRoutes = Array.from(new Set(sitemapRoutes));
const today = new Date().toISOString().slice(0, 10);

await writeFile(
  `${outputRoot}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map((route) => {
    const loc = route === '/' ? siteUrl : `${siteUrl}${route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/journal/') ? '0.7' : '0.8';

    return `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`,
);

await writeFile(
  `${outputRoot}/robots.txt`,
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

console.log(`Generated AI review pack at ${aiRoot}`);
