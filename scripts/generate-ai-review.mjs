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
  currentPortfolio,
  disclaimerPoints,
  holdings,
  journalEntries,
  plannedLetters,
  processRules,
  publicRouteManifest,
  readingDevelopment,
  researchNotes,
} = await import(pathToFileURL(tempModule).href);

await rm(aiRoot, { recursive: true, force: true });
await mkdir(`${aiRoot}/journal`, { recursive: true });
await mkdir(`${aiRoot}/research`, { recursive: true });
await rm(tempModule, { force: true });

const currentHoldings = holdings.filter((holding) => holding.status === 'Current holding');
const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function plain(lines) {
  return lines.filter(Boolean).join('\n\n');
}

function textBlock(lines) {
  return lines.map((line) => `<p>${esc(line).replaceAll('\n', '<br>')}</p>`).join('\n');
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('\n')}</ul>`;
}

function pageUrl(path) {
  return path.startsWith('http') ? path : `${siteUrl}${path}`;
}

function layout({ title, description, canonicalPath, body }) {
  const canonicalUrl = pageUrl(canonicalPath);
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | AI Review | Codie Marillier</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonicalUrl)}">
  <style>
    body{margin:0;background:#f7f8fa;color:#263442;font:16px/1.65 system-ui,sans-serif}main{max-width:980px;margin:auto;padding:48px 20px 72px}header,section,article{border-bottom:1px solid #dde3e8;padding:28px 0}h1,h2,h3{color:#0b1f33;font-family:Georgia,serif;line-height:1.15}h1{font-size:clamp(2.2rem,6vw,4rem)}a{color:#2f5fa7;font-weight:700}.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.card{background:#fff;border:1px solid #dde3e8;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #dde3e8;padding:10px;text-align:left;vertical-align:top}
  </style>
</head>
<body><main>
  <header>
    <p>AI-readable public record</p>
    <h1>${esc(title)}</h1>
    <p>${esc(description)}</p>
    <p class="card">${esc(currentPortfolio.privacyPrinciple)} ${esc(brand.disclaimer)}</p>
    <p><a href="/ai/index.html">AI index</a> · <a href="/">Public homepage</a> · <a href="/ai/site-content.json">JSON</a></p>
  </header>
  ${body.trim()}
</main></body>
</html>`;
}

const performance = currentPortfolio.measuredPerformance;
const latest = currentPortfolio.latestReview;
const performanceSummary = [
  `Latest authored review: ${latest.title}, published ${latest.published}.`,
  `Since-inception return at that review: ${latest.sinceInceptionReturn >= 0 ? '+' : ''}${latest.sinceInceptionReturn.toFixed(2)}%.`,
  `Cash allocation: ${latest.cashWeight.toFixed(0)}%.`,
  `Benchmark-comparable series through ${performance.asOf}: portfolio ${performance.portfolioReturn >= 0 ? '+' : ''}${performance.portfolioReturn.toFixed(2)}%, ${performance.benchmarkName} ${performance.benchmarkReturn >= 0 ? '+' : ''}${performance.benchmarkReturn.toFixed(2)}%, relative ${performance.relativeReturn.toFixed(2)} percentage points, maximum drawdown ${performance.maxDrawdown.toFixed(2)}%.`,
  performance.basis,
];

const holdingText = currentHoldings.map(
  (holding) =>
    `${holding.ticker} — ${holding.name}. Rounded weight ${holding.portfolioWeight}%. Role: ${holding.role}. Decision: ${holding.decision}. Why owned: ${holding.whyOwned}${holding.reviewFocus ? ` Review focus: ${holding.reviewFocus}` : ''}${holding.sellCriteria ? ` Sell or trim criteria: ${holding.sellCriteria}` : ''} Last reviewed: ${holding.lastReviewed}.`,
);

const mainPages = publicRouteManifest
  .filter((route) => route.indexable)
  .map((route) => ({
    title: route.title,
    path: route.path,
    description: route.description ?? `${route.title} on codiemarillier.com.`,
  }));

const pageRecords = [
  ...mainPages.map((page) => ({ ...page, pageType: 'page' })),
  ...journalEntries.map((entry) => ({
    title: entry.title,
    path: `/journal/${entry.slug}`,
    description: `${entry.date}. ${entry.excerpt}`,
    pageType: 'journal-entry',
  })),
  ...publishedLetters.map((letter) => ({
    title: letter.title,
    path: `/letters/${letter.slug}`,
    description: letter.summary,
    pageType: 'letter',
  })),
  ...readingDevelopment.map((book) => ({
    title: book.title,
    path: `/books/${book.slug}`,
    description: book.takeaway,
    pageType: 'book-note',
  })),
];

await writeFile(
  `${aiRoot}/index.html`,
  layout({
    title: 'Codie Marillier — Public Research Record',
    description: 'A machine-readable record of public investment thinking, decisions, percentage performance and research. Personal wealth is intentionally private.',
    canonicalPath: '/ai/',
    body: `
      <section><h2>Publication boundary</h2><p>${esc(currentPortfolio.privacyPrinciple)}</p><p>Published: percentage returns, rounded allocation weights, holdings, theses, decisions, mistakes, drawdowns and benchmark comparisons. Private: balances, starting capital, exact cash, quantities, personal monetary profit and loss, contributions and income.</p></section>
      <section><h2>Performance</h2>${textBlock(performanceSummary)}</section>
      <section><h2>Current holdings</h2>${list(holdingText)}</section>
      <section><h2>Tools</h2><ul><li><a href="/ai/portfolio.html">Portfolio record</a></li><li><a href="/ai/pages.html">Page summaries</a></li><li><a href="/ai/site-map-readable.html">Readable route manifest</a></li><li><a href="/ai/site-content.json">Machine-readable JSON</a></li><li><a href="/ai/all-content.txt">Plain text archive</a></li></ul></section>
    `,
  }),
);

await writeFile(
  `${aiRoot}/portfolio.html`,
  layout({
    title: 'Portfolio, Performance and Decisions',
    description: 'Percentage-only performance, rounded allocation weights, portfolio roles, research focus and decisions.',
    canonicalPath: '/ai/portfolio.html',
    body: `
      <section><h2>Performance</h2>${textBlock(performanceSummary)}</section>
      <section><h2>Allocation basis</h2><p>${esc(currentPortfolio.allocationBasis)}</p></section>
      <section><h2>Holdings</h2><div class="grid">${currentHoldings.map((holding) => `<article class="card"><h3>${esc(holding.ticker)} — ${esc(holding.name)}</h3><p><strong>Rounded weight:</strong> ${holding.portfolioWeight}%</p><p><strong>Role:</strong> ${esc(holding.role)}</p><p><strong>Decision:</strong> ${esc(holding.decision)}</p><p><strong>Why owned:</strong> ${esc(holding.whyOwned)}</p>${holding.reviewFocus ? `<p><strong>Review focus:</strong> ${esc(holding.reviewFocus)}</p>` : ''}${holding.sellCriteria ? `<p><strong>Sell or trim criteria:</strong> ${esc(holding.sellCriteria)}</p>` : ''}<p><strong>Last reviewed:</strong> ${esc(holding.lastReviewed)}</p></article>`).join('\n')}</div></section>
    `,
  }),
);

await writeFile(
  `${aiRoot}/pages.html`,
  layout({
    title: 'Static Page Summaries',
    description: 'Plain HTML summaries of public routes.',
    canonicalPath: '/ai/pages.html',
    body: pageRecords.map((page) => `<article><h2><a href="${esc(page.path)}">${esc(page.title)}</a></h2><p>${esc(page.description)}</p><p>Type: ${esc(page.pageType)}</p></article>`).join('\n'),
  }),
);

await writeFile(
  `${aiRoot}/site-map-readable.html`,
  layout({
    title: 'Readable Route Manifest',
    description: 'Public page titles, URLs, types and summaries.',
    canonicalPath: '/ai/site-map-readable.html',
    body: `<section><table><thead><tr><th>Page</th><th>URL</th><th>Type</th><th>Summary</th></tr></thead><tbody>${pageRecords.map((page) => `<tr><td>${esc(page.title)}</td><td><a href="${esc(page.path)}">${esc(pageUrl(page.path))}</a></td><td>${esc(page.pageType)}</td><td>${esc(page.description)}</td></tr>`).join('\n')}</tbody></table></section>`,
  }),
);

for (const entry of journalEntries) {
  await writeFile(
    `${aiRoot}/journal/${entry.slug}.html`,
    layout({
      title: entry.title,
      description: `${entry.date}. ${entry.excerpt}`,
      canonicalPath: `/ai/journal/${entry.slug}.html`,
      body: `<article><p>${esc(entry.date)} / ${esc(entry.category)}</p><h2>${esc(entry.title)}</h2><p>${esc(entry.excerpt)}</p>${textBlock(entry.body)}</article>`,
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
      body: `<article><p>${esc(note.category)} / ${esc(note.status)}</p><h2>${esc(note.title)}</h2><p>${esc(note.excerpt)}</p>${textBlock(note.body)}</article>`,
    }),
  );
}

const siteContent = {
  site: {
    name: 'Codie Marillier',
    url: siteUrl,
    investingSubBrand: brand.name,
    privacyPrinciple: currentPortfolio.privacyPrinciple,
    disclaimer: brand.disclaimer,
  },
  portfolio: {
    started: currentPortfolio.started,
    latestReview: currentPortfolio.latestReview,
    measuredPerformance: currentPortfolio.measuredPerformance,
    allocationBasis: currentPortfolio.allocationBasis,
    holdings: currentHoldings,
  },
  pages: pageRecords.map((page) => ({ ...page, url: pageUrl(page.path) })),
  journal: journalEntries.map(({ slug, title, date, category, excerpt, tags, majorEvents, body }) => ({ slug, title, date, category, excerpt, tags, majorEvents, body })),
  letters: publishedLetters,
  books: readingDevelopment,
  research: researchNotes,
  processRules,
  disclaimerPoints,
};

await writeFile(`${aiRoot}/site-content.json`, `${JSON.stringify(siteContent, null, 2)}\n`);

const allText = plain([
  'CODIE MARILLIER — PUBLIC RESEARCH RECORD',
  currentPortfolio.privacyPrinciple,
  brand.disclaimer,
  'PERFORMANCE',
  ...performanceSummary,
  'CURRENT HOLDINGS',
  ...holdingText,
  'PROCESS RULES',
  ...processRules.map((rule) => `${rule.title}: ${rule.text}`),
  'LETTERS',
  ...publishedLetters.map((letter) => plain([letter.title, letter.summary, ...(letter.body ?? [])])),
  'BOOKS',
  ...readingDevelopment.map((book) => plain([`${book.title} — ${book.author}`, ...book.paragraphs, `Takeaway: ${book.takeaway}`])),
  'JOURNAL',
  ...journalEntries.map((entry) => plain([entry.title, `${entry.date} / ${entry.category}`, entry.excerpt, ...entry.body])),
  'RESEARCH NOTES',
  ...researchNotes.map((note) => plain([note.title, note.excerpt, ...note.body])),
  'DISCLAIMER',
  ...disclaimerPoints,
]);

await writeFile(`${aiRoot}/all-content.txt`, `${allText}\n`);
console.log(`Generated privacy-safe AI review pack in ${aiRoot}`);
