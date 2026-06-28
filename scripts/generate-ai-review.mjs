import { build } from 'esbuild';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const outputRoot = process.argv[2] || 'public';
const aiRoot = `${outputRoot}/ai`;
const tempModule = `/tmp/codie-site-data-${Date.now()}.mjs`;
const siteUrl = 'https://codiemarillier.com';
const lettersUpdated = '2026-06-24';

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
  latestPortfolioReview,
  portfolioChangeLog,
  portfolioCrawlerNotes,
  portfolioRoles,
  portfolioSnapshot,
  portfolioValueHistory,
  plannedLetters,
  processRules,
  readingDevelopment,
  researchNotes,
  transactionSummary,
} = await import(pathToFileURL(tempModule).href);

await rm(aiRoot, { recursive: true, force: true });
await mkdir(`${aiRoot}/journal`, { recursive: true });
await mkdir(`${aiRoot}/research`, { recursive: true });
await rm(tempModule, { force: true });

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function slugDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (/23 June 2026/i.test(value)) return '2026-06-23';
  if (/June 2026/i.test(value)) return '2026-06-16';
  return '2026-06-22';
}

function textBlock(lines) {
  return lines.map((line) => `<p>${esc(line).replaceAll('\n', '<br>')}</p>`).join('\n');
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('\n')}</ul>`;
}

function plain(lines) {
  return lines.filter(Boolean).join('\n\n');
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
    <meta property="og:title" content="${esc(title)} | AI Review | Codie Capital Research">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${esc(canonicalUrl)}">
    <meta property="og:type" content="website">
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: brand.name, url: siteUrl },
    })}</script>
    <style>
      body { margin: 0; background: #f6f1e8; color: #20201d; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.65; }
      main { max-width: 980px; margin: 0 auto; padding: 48px 20px 72px; }
      header, section, article { border-bottom: 1px solid #d8d0c0; padding: 28px 0; }
      h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; line-height: 1.12; }
      h1 { font-size: clamp(2.2rem, 6vw, 4rem); margin: 0 0 16px; }
      h2 { font-size: 2rem; margin: 0 0 12px; }
      h3 { font-size: 1.35rem; margin: 24px 0 8px; }
      a { color: #183a34; font-weight: 700; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #d8d0c0; padding: 10px; text-align: left; vertical-align: top; }
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
        <p><a href="/ai/index.html">Back to AI review index</a> · <a href="/">Open public homepage</a> · <a href="/ai/site-content.json">Machine-readable JSON</a></p>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

const currentHoldings = holdings.filter((holding) => !/^closed/i.test(holding.positionSize) && !/^closed/i.test(holding.status));
const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);
const latestReview = latestPortfolioReview.title;
const latestUpdated = '2026-06-23';
const portfolioValueText = portfolioValueHistory.map(
  (point) => `${point.label} (${point.date}): ${point.valueLabel}. Source: ${point.source}.${point.note ? ` Note: ${point.note}` : ''}`,
);

const mainPages = [
  {
    path: '/',
    title: 'Home',
    pageType: 'homepage',
    lastUpdated: '2026-06-25',
    topics: ['personal investment journal', 'public record', 'portfolio snapshot', 'weekly reviews', 'investing process'],
    summary:
      'The homepage presents Codie Capital Research as a serious personal investment journal, explains what the site is, shows the latest Week 16 snapshot, and points first-time visitors to the best live pages.',
    contentText: plain([
      `${brand.name} is a public record of my personal investing process. I document what I own, why I own it, what I am learning, and how my thinking changes as I build a long-term portfolio.`,
      'The site is a personal investment journal only. It is not financial advice, not a fund, and not a money-management service.',
      'The homepage sends first-time readers to the mobile-first Start Here page, Current Portfolio, Portfolio Journal, Letters, Investment Process, and About pages.',
      'Letters includes My First Letter as a published long-form reflection.',
      `Latest source-of-truth review: ${latestReview}. Current account value ${portfolioSnapshot.accountValue}, starting value ${portfolioSnapshot.startingCostBasis}, return ${portfolioSnapshot.currentReturn}, cash ${portfolioSnapshot.cashBalance}.`,
      `Portfolio value chart data: ${portfolioValueText.join(' ')}`,
    ]),
    internalLinks: ['/start', '/journal/week-16-portfolio-summary', '/portfolio', '/journal', '/letters', '/process', '/books', '/about'],
  },
  {
    path: '/start',
    title: 'Start Here',
    pageType: 'instagram-start',
    lastUpdated: latestUpdated,
    topics: ['Instagram visitors', 'start here', 'first letter', 'latest portfolio update', 'current portfolio', 'mobile-first'],
    summary:
      'The Start Here page is a mobile-first entry point for new visitors from Instagram, pointing them to My First Letter, the latest portfolio update, current portfolio, and the main site sections.',
    contentText: plain([
      'Start Here explains Codie Capital Research quickly for new visitors from Instagram.',
      'The site is a public record of Codie’s personal investing journey: what he owns, why he owns it, what he is learning, and how his thinking changes over time.',
      'The recommended first reads are My First Letter, the latest portfolio update, and the Current Portfolio page.',
      `Current snapshot: latest review ${latestPortfolioReview.label}, account value ${portfolioSnapshot.accountValue}, return ${portfolioSnapshot.currentReturn}, cash ${portfolioSnapshot.cashBalance}.`,
      'The page explains that the site is a record, not a pitch, and that nothing on the site is investment advice.',
    ]),
    internalLinks: ['/letters/my-first-letter', `/journal/${latestPortfolioReview.slug}`, '/portfolio', '/journal', '/process', '/books', '/about', '/disclaimer'],
  },
  {
    path: '/portfolio',
    title: 'Current Portfolio',
    pageType: 'portfolio',
    lastUpdated: latestUpdated,
    topics: ['account value', 'cash balance', 'open holdings', 'portfolio roles', 'winners', 'drags', 'action plan'],
    summary:
      'The portfolio page records Codie’s own current holdings, Week 16 account value, starting value, cash, latest return, winners, drags, portfolio role notes, and latest action plan.',
    contentText: plain([
      `Current account value: ${portfolioSnapshot.accountValue}. Starting value: ${portfolioSnapshot.startingCostBasis}. Current return: ${portfolioSnapshot.currentReturn}. Cash balance: ${portfolioSnapshot.cashBalance}. Latest review: ${latestReview}.`,
      `Open holdings: ${currentHoldings.map((holding) => `${holding.ticker} ${holding.positionSize} (${holding.role})`).join('; ')}.`,
      `Current winners: ${portfolioCrawlerNotes.winners.join(' ')}`,
      `Current drags: ${portfolioCrawlerNotes.drags.join(' ')}`,
      `Latest action plan: ${portfolioCrawlerNotes.latestActionPlan.join(' ')}`,
      `Portfolio value history: ${portfolioValueText.join(' ')}`,
    ]),
    internalLinks: ['/journal/week-16-portfolio-summary', '/journal', '/process', '/ai/portfolio.html'],
  },
  {
    path: '/journal',
    title: 'Portfolio Journal',
    pageType: 'journal-index',
    lastUpdated: latestUpdated,
    topics: ['weekly reviews', 'trade reflections', 'market notes', 'lessons', 'Week 1 to Week 16'],
    summary:
      'The journal page lists weekly review cards and journal entries with dates, account values where available, main trades, and lessons.',
    contentText: plain([
      'The journal contains weekly portfolio reviews, trade reflections, market notes, and lessons from Codie’s own portfolio record.',
      ...journalEntries.map((entry) => `${entry.title} (${entry.date}): ${entry.excerpt}`),
    ]),
    internalLinks: [...journalEntries.map((entry) => `/journal/${entry.slug}`), '/letters', '/portfolio', '/process'],
  },
  {
    path: '/letters',
    title: 'Letters',
    pageType: 'letters-index',
    lastUpdated: lettersUpdated,
    topics: ['letters', 'reflections', 'process development', 'discipline'],
    summary:
      'The Letters page publishes My First Letter, a long-form reflection on discipline, patience, risk, and building a public investing record.',
    contentText: plain([
      'Weekly reviews are what happened. Letters are what I learned and how my thinking is changing.',
      ...publishedLetters.map(
        (letter) =>
          `${letter.title}. ${letter.type}. ${letter.date}. ${letter.readingTime ?? ''}. ${letter.summary} Main themes: ${letter.themes.join(', ')}. Status: ${letter.status ?? 'Draft in progress'}. ${(letter.body ?? []).join('\n\n')}`,
      ),
    ]),
    internalLinks: ['/journal', '/process', ...publishedLetters.map((letter) => `/letters/${letter.slug}`)],
  },
  {
    path: '/books',
    title: 'Books That Shaped My Thinking',
    pageType: 'books',
    lastUpdated: '2026-06-22',
    topics: ['reading development', 'investing books', 'discipline', 'purpose', 'risk', 'money'],
    summary:
      'The books page contains the full Books That Shaped My Thinking section with personal reflections on every book and how each shaped Codie’s investing and personal development.',
    contentText: plain([
      'These are the books that have had the biggest influence on how Codie thinks about investing, money, discipline, purpose, risk, and long-term decision-making.',
      ...readingDevelopment.map((book) => `${book.title} by ${book.author}. ${book.category}. ${book.paragraphs.join(' ')} Takeaway: ${book.takeaway}`),
    ]),
    internalLinks: ['/about', '/process', '/portfolio'],
  },
  {
    path: '/process',
    title: 'Investment Process',
    pageType: 'process',
    lastUpdated: '2026-06-22',
    topics: ['capital protection', 'position sizing', 'written reasoning', 'cash discipline', 'no leverage', 'no impulsive trades', 'weekly review process'],
    summary:
      'The process page sets out the investing rulebook: protect capital, size positions properly, write reasoning, keep cash discipline, avoid leverage and impulsive trades, and review weekly.',
    contentText: plain(processRules.map((rule) => `${rule.title}: ${rule.text}`)),
    internalLinks: ['/portfolio', '/journal', '/books', '/about'],
  },
  {
    path: '/about',
    title: 'About Codie Marillier',
    pageType: 'about',
    lastUpdated: '2026-06-22',
    topics: ['personal background', 'early investing interest', 'Bitcoin', 'real estate influence', 'mistakes', 'reading development'],
    summary:
      'The about page explains Codie’s investing background, early interest in markets, first Bitcoin investment, family real estate influence, lessons from mistakes, and reading development.',
    contentText: plain([
      'Codie Marillier is a private, long-term investor managing his own portfolio and documenting the process publicly.',
      'His interest in investing began seriously around age fourteen, when he understood that ordinary people could buy small pieces of real businesses through the stock market.',
      'During the first COVID lockdown in 2020, he studied a stock trading course by Mohsin Hassan on Udemy and began learning fundamental analysis, technical analysis, market behaviour, risk, and trading psychology.',
      'His first investment was Bitcoin in 2021 at roughly $21,000. A roughly $500 investment grew to around $1,500, which built confidence but also taught that early success does not mean risk is fully understood.',
      'His family’s real estate background shaped how he thinks about ownership, assets, capital appreciation, rental income, and long-term wealth creation.',
      'Losing money through leveraged crypto trading taught him the danger of emotional behaviour, adding to losing trades, hoping for reversals, and letting risk turn into gambling.',
    ]),
    internalLinks: ['/books', '/process', '/portfolio', '/journal'],
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer',
    pageType: 'disclaimer',
    lastUpdated: '2026-06-22',
    topics: ['not investment advice', 'not FCA authorised', 'personal portfolio', 'do not copy trades'],
    summary:
      'The disclaimer page explains that the site is a personal investment research and portfolio journal, not investment advice, not FCA-authorised, and not a recommendation.',
    contentText: disclaimerPoints.join(' '),
    internalLinks: ['/'],
  },
  {
    path: '/ai/',
    title: 'AI-Readable Review Index',
    pageType: 'ai-index',
    lastUpdated: '2026-06-22',
    topics: ['AI archive', 'crawler-readable content', 'site manifest', 'portfolio snapshot', 'weekly summaries'],
    summary:
      'The AI page is a complete plain HTML archive for ChatGPT, AI review tools, Google crawlers, and simple browser-fetch tools.',
    contentText:
      'The AI-readable review index contains site purpose, disclaimer, latest portfolio snapshot, links to all public pages, weekly summaries, books, portfolio, process, sitemap-readable page, and JSON content archive.',
    internalLinks: ['/ai/site-map-readable.html', '/ai/site-content.json', '/ai/portfolio.html', '/ai/pages.html', '/ai/all-content.txt'],
  },
];

const journalRecords = journalEntries.map((entry) => ({
  path: `/journal/${entry.slug}`,
  title: entry.title,
  pageType: entry.category === 'Weekly Reviews' ? 'weekly-summary' : 'journal-entry',
  lastUpdated: slugDate(entry.date),
  topics: [entry.category, ...(entry.tags ?? []), ...(entry.majorEvents ?? [])],
  summary: entry.excerpt,
  contentText: plain([`${entry.title}. ${entry.date}. ${entry.excerpt}`, ...entry.body]),
  internalLinks: [entry.documentUrl, entry.documentPdfUrl, `/ai/journal/${entry.slug}.html`].filter(Boolean),
}));

const letterRecords = publishedLetters.map((letter) => ({
  path: `/letters/${letter.slug}`,
  title: letter.title,
  pageType: 'letter',
  lastUpdated: letter.status === 'Published' ? lettersUpdated : slugDate(letter.date),
  topics: ['letters', letter.type, ...(letter.themes ?? [])],
  summary: letter.summary,
  contentText: plain([
    `${letter.title}. ${letter.type}. ${letter.date}. ${letter.readingTime ?? ''}. ${letter.summary}`,
    ...(letter.body ?? []),
  ]),
  internalLinks: ['/letters', '/journal', '/process'],
}));

const researchRecords = researchNotes.map((note) => ({
  path: `/ai/research/${note.slug}.html`,
  title: note.title,
  pageType: 'research-note',
  lastUpdated: slugDate(note.lastUpdated),
  topics: [note.category, note.status, note.ticker, note.portfolioRole, note.riskLevel].filter(Boolean),
  summary: note.excerpt,
  contentText: plain([
    `${note.title}. ${note.category}. ${note.status}. ${note.ticker ? `Ticker: ${note.ticker}.` : ''}`,
    `Portfolio role: ${note.portfolioRole}. Risk level: ${note.riskLevel}. Research focus: ${note.researchFocus}. Decision impact: ${note.decisionImpact}.`,
    ...note.body,
  ]),
  internalLinks: ['/ai/site-map-readable.html', '/portfolio', '/process'],
}));

const aiRecords = [
  {
    path: '/ai/pages.html',
    title: 'Static Page Summaries',
    pageType: 'ai-summary',
    lastUpdated: '2026-06-22',
    topics: ['page summaries', 'public routes'],
    summary: 'Plain HTML summaries of the main public site routes.',
    contentText: mainPages.map((page) => `${page.path} - ${page.summary}`).join('\n'),
    internalLinks: mainPages.map((page) => page.path),
  },
  {
    path: '/ai/portfolio.html',
    title: 'Portfolio and Roles',
    pageType: 'ai-portfolio',
    lastUpdated: latestUpdated,
    topics: ['portfolio snapshot', 'holdings', 'roles', 'change log', 'action plan'],
    summary: 'AI-readable portfolio record, holdings, role structure, transaction summary, winners, drags, and action plan.',
    contentText: plain([
      `Account value ${portfolioSnapshot.accountValue}. Starting value ${portfolioSnapshot.startingCostBasis}. Return ${portfolioSnapshot.currentReturn}. Cash ${portfolioSnapshot.cashBalance}.`,
      holdings.map((holding) => `${holding.ticker} ${holding.name}: ${holding.positionSize}, ${holding.role}, ${holding.status}.`).join('\n'),
    ]),
    internalLinks: ['/portfolio', '/journal/week-16-portfolio-summary'],
  },
  {
    path: '/ai/site-map-readable.html',
    title: 'Readable Route Manifest',
    pageType: 'ai-manifest',
    lastUpdated: '2026-06-22',
    topics: ['route manifest', 'crawler map', 'AI navigation'],
    summary: 'A plain HTML manifest listing every important page with URL, summary, topics, and last updated date.',
    contentText: 'Machine-readable and human-readable route map for AI review tools and simple crawlers.',
    internalLinks: ['/ai/site-content.json', '/sitemap.xml'],
  },
  {
    path: '/ai/site-content.json',
    title: 'Machine-Readable Site Content JSON',
    pageType: 'json-manifest',
    lastUpdated: '2026-06-22',
    topics: ['JSON', 'site content', 'metadata'],
    summary: 'A JSON file containing readable text content and metadata for every main page and journal page.',
    contentText: 'JSON archive for AI tools that need all site content in one structured file.',
    internalLinks: ['/ai/site-map-readable.html'],
  },
  {
    path: '/ai/all-content.txt',
    title: 'All Content Text Archive',
    pageType: 'plain-text-archive',
    lastUpdated: '2026-06-22',
    topics: ['plain text archive', 'AI reading'],
    summary: 'A plain text archive of site content, portfolio facts, books, process rules, and journal entries.',
    contentText: 'Plain text archive generated from site data.',
    internalLinks: ['/ai/index.html'],
  },
];

const allRecords = [
  ...mainPages,
  ...journalRecords,
  ...letterRecords,
  ...researchRecords,
  ...aiRecords,
];

function pageUrl(path) {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function aiCard(record) {
  return `<article class="card">
    <h3><a href="${esc(record.path)}">${esc(record.title)}</a></h3>
    <p><strong>URL:</strong> ${esc(pageUrl(record.path))}</p>
    <p>${esc(record.summary)}</p>
    <p><strong>Topics:</strong> ${esc(record.topics.join(', '))}</p>
    <p><strong>Last updated:</strong> ${esc(record.lastUpdated)}</p>
  </article>`;
}

const indexLinks = [
  ...mainPages.map((page) => `<li><a href="${page.path}">${esc(page.title)} public route</a> - ${esc(page.summary)}</li>`),
  ...journalEntries.map((entry) => `<li><a href="/journal/${entry.slug}">${esc(entry.title)} public route</a> - <a href="/ai/journal/${entry.slug}.html">AI-readable full text</a></li>`),
  ...publishedLetters.map((letter) => `<li><a href="/letters/${letter.slug}">${esc(letter.title)} public letter</a> - ${esc(letter.summary)}</li>`),
  ...researchNotes.map((note) => `<li><a href="/ai/research/${note.slug}.html">${esc(note.title)} AI-readable research note</a></li>`),
];

await writeFile(
  `${aiRoot}/index.html`,
  layout({
    title: 'Codie Capital Research Review Index',
    description:
      'Complete plain HTML archive for ChatGPT, AI review tools, Google crawlers, and simple browser-fetch tools.',
    canonicalPath: '/ai/',
    body: `
      <section>
        <h2>Site Purpose</h2>
        <p>Codie Capital Research is Codie Marillier's personal investment journal. It is used to record what he owns, why he owns it, what he is learning, and how his thinking changes over time.</p>
        <p>The goal is to build a long-term public record of decisions, mistakes, lessons, and development as an investor. It is not financial advice, not a fund, and not a money-management service.</p>
      </section>
      <section>
        <h2>Why I Built This</h2>
        <ul>
          <li>Document thinking before hindsight changes the story.</li>
          <li>Hold the process accountable with a public record over time.</li>
          <li>Track portfolio decisions properly instead of relying on memory or conversation.</li>
          <li>Show how the investment process develops around risk, patience, position sizing, and written reasoning.</li>
          <li>Record what was believed and what was actually done.</li>
        </ul>
      </section>
      <section>
        <h2>Latest Portfolio Snapshot</h2>
        <p><strong>Latest review:</strong> ${latestReview}</p>
        <pre class="card">accountValue: ${esc(portfolioSnapshot.accountValue)}
startingCostBasis: ${esc(portfolioSnapshot.startingCostBasis)}
currentReturn: ${esc(portfolioSnapshot.currentReturn)}
cashBalance: ${esc(portfolioSnapshot.cashBalance)}
latestReview: ${esc(latestReview)}</pre>
        <div class="grid">
          <div class="card"><strong>Current account value</strong><br>${esc(portfolioSnapshot.accountValue)}</div>
          <div class="card"><strong>Starting value</strong><br>${esc(portfolioSnapshot.startingCostBasis)}</div>
          <div class="card"><strong>Current return</strong><br>${esc(portfolioSnapshot.currentReturn)}</div>
          <div class="card"><strong>Cash balance</strong><br>${esc(portfolioSnapshot.cashBalance)}</div>
        </div>
        <p>The snapshot is updated through the latest published weekly review.</p>
      </section>
      <section>
        <h2>Portfolio Value History</h2>
        <table>
          <thead><tr><th>Week</th><th>Date</th><th>Portfolio value</th><th>Source</th><th>Note</th></tr></thead>
          <tbody>
            ${portfolioValueHistory
              .map(
                (point) => `<tr>
                  <td>${esc(point.label)}</td>
                  <td>${esc(point.date)}</td>
                  <td>${esc(point.valueLabel)}</td>
                  <td>${esc(point.source)}</td>
                  <td>${esc(point.note ?? '')}</td>
                </tr>`,
              )
              .join('\n')}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Start Here</h2>
        <ul>
          <li><a href="/portfolio">Current Portfolio</a> - What I currently own, how the portfolio is positioned, and what role each holding plays.</li>
          <li><a href="/journal">Portfolio Journal</a> - My weekly record of portfolio changes, market thoughts, decisions, and lessons.</li>
          <li><a href="/process">Investment Process</a> - The rules and habits I am trying to build around capital protection, patience, position sizing, and written reasoning.</li>
          <li><a href="/about">About</a> - Who I am, why I became interested in investing, and why this public record exists.</li>
        </ul>
      </section>
      <section>
        <h2>Core Links</h2>
        <ul>${indexLinks.join('\n')}</ul>
      </section>
      <section>
        <h2>AI Tools</h2>
        <ul>
          <li><a href="/ai/site-map-readable.html">Readable route manifest</a></li>
          <li><a href="/ai/site-content.json">Machine-readable site content JSON</a></li>
          <li><a href="/ai/all-content.txt">Plain text all-content archive</a></li>
          <li><a href="/sitemap.xml">XML sitemap</a></li>
          <li><a href="/robots.txt">robots.txt</a></li>
        </ul>
      </section>
      <section>
        <h2>Portfolio Change Log</h2>
        ${portfolioChangeLog.map((change) => `<article class="card"><h3>${esc(change.type)} - ${esc(change.title)}</h3><p><strong>Date:</strong> ${esc(change.date)}</p><p>${esc(change.text)}</p></article>`).join('\n')}
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
    body: mainPages.map(aiCard).join('\n'),
  }),
);

await writeFile(
  `${aiRoot}/site-map-readable.html`,
  layout({
    title: 'Readable Route Manifest',
    description: 'Every important page on CodieMarillier.com with URL, summary, topics, and last updated date.',
    canonicalPath: '/ai/site-map-readable.html',
    body: `
      <section>
        <h2>Route Manifest</h2>
        <table>
          <thead>
            <tr><th>Page title</th><th>URL</th><th>Summary</th><th>Main topics</th><th>Last updated</th></tr>
          </thead>
          <tbody>
            ${allRecords
              .map(
                (record) => `<tr>
                  <td>${esc(record.title)}</td>
                  <td><a href="${esc(record.path)}">${esc(pageUrl(record.path))}</a></td>
                  <td>${esc(record.summary)}</td>
                  <td>${esc(record.topics.join(', '))}</td>
                  <td>${esc(record.lastUpdated)}</td>
                </tr>`,
              )
              .join('\n')}
          </tbody>
        </table>
      </section>
    `,
  }),
);

await writeFile(
  `${aiRoot}/portfolio.html`,
  layout({
    title: 'Portfolio and Roles',
    description: 'AI-readable portfolio record, holdings, role structure, transaction summary, winners, drags, and action plan.',
    canonicalPath: '/ai/portfolio.html',
    body: `
      <section>
        <h2>Portfolio Snapshot</h2>
        <p>Week 16 Portfolio Summary dated 23 June 2026 is the current source-of-truth update.</p>
        <div class="grid">
          ${Object.entries(portfolioSnapshot).map(([key, value]) => `<div class="card"><strong>${esc(key)}</strong><br>${esc(value)}</div>`).join('\n')}
        </div>
      </section>
      <section>
        <h2>Transaction Summary</h2>
        <div class="grid">${transactionSummary.map((item) => `<div class="card"><strong>${esc(item.label)}</strong><br>${esc(item.value)}</div>`).join('\n')}</div>
      </section>
      <section>
        <h2>Portfolio Value History</h2>
        <table>
          <thead><tr><th>Week</th><th>Date</th><th>Portfolio value</th><th>Source</th><th>Note</th></tr></thead>
          <tbody>
            ${portfolioValueHistory
              .map(
                (point) => `<tr>
                  <td>${esc(point.label)}</td>
                  <td>${esc(point.date)}</td>
                  <td>${esc(point.valueLabel)}</td>
                  <td>${esc(point.source)}</td>
                  <td>${esc(point.note ?? '')}</td>
                </tr>`,
              )
              .join('\n')}
          </tbody>
        </table>
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
      <section><h2>Current Winners</h2>${list(portfolioCrawlerNotes.winners)}</section>
      <section><h2>Current Drags</h2>${list(portfolioCrawlerNotes.drags)}</section>
      <section><h2>Latest Action Plan</h2>${list(portfolioCrawlerNotes.latestActionPlan)}</section>
      <section>
        <h2>Portfolio Roles</h2>
        ${portfolioRoles.map((role) => `<article class="card"><h3>${esc(role.title)}</h3><p><strong>Examples:</strong> ${esc(role.examples)}</p><p>${esc(role.text)}</p></article>`).join('\n')}
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
      body: `<article><p class="eyebrow">${esc(entry.date)} / ${esc(entry.category)}</p><h2>${esc(entry.title)}</h2><p>${esc(entry.excerpt)}</p>${textBlock(entry.body)}</article>`,
    }),
  );
}

for (const note of researchNotes) {
  await writeFile(
    `${aiRoot}/research/${note.slug}.html`,
    layout({
      title: note.title,
      description: note.excerpt,
      canonicalPath: `/ai/research/${note.slug}.html`,
      body: `<article>
        <p class="eyebrow">${esc(note.category)} / ${esc(note.status)}</p>
        <h2>${esc(note.title)}</h2>
        <p>${esc(note.excerpt)}</p>
        <p><strong>Portfolio role:</strong> ${esc(note.portfolioRole)}</p>
        <p><strong>Risk level:</strong> ${esc(note.riskLevel)}</p>
        <p><strong>Research focus:</strong> ${esc(note.researchFocus)}</p>
        <p><strong>Decision impact:</strong> ${esc(note.decisionImpact)}</p>
        ${textBlock(note.body)}
      </article>`,
    }),
  );
}

const siteContent = {
  site: {
    name: brand.name,
    url: siteUrl,
    purpose: 'Personal investment journal and long-term public record by Codie Marillier.',
    disclaimer: brand.disclaimer,
      latestPortfolioSnapshot: {
        latestReview,
        currentAccountValue: portfolioSnapshot.accountValue,
      startingValue: portfolioSnapshot.startingCostBasis,
      currentReturn: portfolioSnapshot.currentReturn,
      cashBalance: portfolioSnapshot.cashBalance,
        lastUpdated: latestUpdated,
      },
      portfolioValueHistory: portfolioValueHistory.map((point) => ({
        week: point.week,
        label: point.label,
        date: point.date,
        value: point.value,
        valueLabel: point.valueLabel,
        source: point.source,
        note: point.note ?? '',
      })),
    },
  pages: allRecords.map((record) => ({
    title: record.title,
    url: pageUrl(record.path),
    description: record.summary,
    pageType: record.pageType,
    lastUpdated: record.lastUpdated,
    contentText: record.contentText,
    internalLinks: record.internalLinks.map((link) => (link?.startsWith('http') ? link : `${siteUrl}${link}`)),
  })),
};

await writeFile(`${aiRoot}/site-content.json`, `${JSON.stringify(siteContent, null, 2)}\n`);

const allText = [
  `${brand.name} - ${brand.subtitle}`,
  brand.disclaimer,
  '',
  'LATEST PORTFOLIO SNAPSHOT',
  `Latest review: ${latestReview}`,
  `Current account value: ${portfolioSnapshot.accountValue}`,
  `Starting value: ${portfolioSnapshot.startingCostBasis}`,
  `Current return: ${portfolioSnapshot.currentReturn}`,
  `Cash balance: ${portfolioSnapshot.cashBalance}`,
  '',
  'PORTFOLIO VALUE HISTORY',
  ...portfolioValueText,
  '',
  'MAIN PAGES',
  ...mainPages.map((page) => `${page.path} - ${page.title}\n${page.summary}\n${page.contentText}`),
  '',
  'HOMEPAGE START HERE',
  'Current Portfolio - What I currently own, how the portfolio is positioned, and what role each holding plays.',
  'Portfolio Journal - My weekly record of portfolio changes, market thoughts, decisions, and lessons.',
  'Investment Process - The rules and habits I am trying to build around capital protection, patience, position sizing, and written reasoning.',
  'About - Who I am, why I became interested in investing, and why this public record exists.',
  '',
  'HOMEPAGE ALSO USEFUL',
  'Books - The books that have shaped how I think about money, markets, discipline, risk, and behaviour.',
  'My First Letter is published as the first long-form reflection.',
  '',
  'HOLDINGS',
  ...holdings.map((holding) => `${holding.ticker} - ${holding.name}\nPosition: ${holding.positionSize}\nSleeve: ${holding.sleeve}\nRole: ${holding.role}\nStatus: ${holding.status}\nNote: ${holding.transactionNote}`),
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
  'LETTERS',
  ...publishedLetters.map((letter) =>
    [`${letter.title}\n${letter.type} / ${letter.date}\n${letter.summary}\nThemes: ${letter.themes.join(', ')}`, ...(letter.body ?? [])].join('\n\n'),
  ),
  '',
  'BOOKS THAT SHAPED MY THINKING',
  ...readingDevelopment.map((book) => `${book.title} - ${book.author}\n${book.category}\n${book.paragraphs.join('\n\n')}\n\nTakeaway: ${book.takeaway}`),
  '',
  'JOURNAL ENTRIES',
  ...journalEntries.map((entry) => `${entry.title}\n${entry.date} / ${entry.category}\n${entry.excerpt}\n${entry.body.join('\n\n')}`),
  '',
  'RESEARCH NOTES',
  ...researchNotes.map((note) => `${note.title}\n${note.category} / ${note.status}\n${note.excerpt}\n${note.body.join('\n\n')}`),
  '',
  'DISCLAIMER POINTS',
  ...disclaimerPoints,
].join('\n\n');

await writeFile(`${aiRoot}/all-content.txt`, allText);

const sitemapRoutes = [
  ...mainPages.map((page) => page.path),
  '/ai/pages.html',
  '/ai/portfolio.html',
  '/ai/site-map-readable.html',
  '/ai/site-content.json',
  '/ai/all-content.txt',
  ...journalEntries.map((entry) => `/journal/${entry.slug}`),
  ...publishedLetters.map((letter) => `/letters/${letter.slug}`),
  ...journalEntries.map((entry) => `/ai/journal/${entry.slug}.html`),
  ...researchNotes.map((note) => `/ai/research/${note.slug}.html`),
];

const uniqueRoutes = Array.from(new Set(sitemapRoutes));
const today = new Date().toISOString().slice(0, 10);

await writeFile(
  `${outputRoot}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map((route) => {
    const loc = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/journal/') ? '0.7' : route.startsWith('/ai/') ? '0.6' : '0.8';

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
