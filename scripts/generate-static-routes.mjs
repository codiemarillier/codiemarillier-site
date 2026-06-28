import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const outputRoot = process.argv[2] || 'dist';
const tempModule = `/tmp/codie-static-routes-${Date.now()}.mjs`;
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
  latestPortfolioReview,
  portfolioCrawlerNotes,
  portfolioRoles,
  portfolioSnapshot,
  portfolioValueHistory,
  plannedLetters,
  processRules,
  readingDevelopment,
  transactionSummary,
} = await import(pathToFileURL(tempModule).href);

await rm(tempModule, { force: true });

const template = await readFile(`${outputRoot}/index.html`, 'utf8');

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function paragraph(text) {
  return `<p>${esc(text).replaceAll('\n', '<br>')}</p>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function linkList(items) {
  return `<ul>${items.map((item) => `<li><a href="${esc(item.href)}">${esc(item.label)}</a> - ${esc(item.text)}</li>`).join('')}</ul>`;
}

function section(title, body) {
  return `<section><h2>${esc(title)}</h2>${body}</section>`;
}

function textBlock(lines) {
  return lines.map(paragraph).join('');
}

function readLabel(block, labels) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = block.match(new RegExp(`${escaped}\\n([^\\n]+)`, 'i'));
    if (match?.[1]) return match[1].trim();
  }

  return '';
}

function weeklyCard(entry) {
  const snapshot = entry.body[0] ?? '';
  const week = entry.title.match(/Week\s+\d+/i)?.[0] ?? entry.title;
  const accountValue =
    readLabel(snapshot, ['Account value at review', 'Current account value', 'Account value', 'Estimated account value', 'Total portfolio value', 'Portfolio value']) ||
    'Not recorded';
  const weeklyMove = readLabel(snapshot, ['Move since Week 14', 'Weekly move', 'Weekly change']) || 'Qualitative review only';
  const mainTrade =
    readLabel(snapshot, ['Main realised trade', 'Main trade', 'Main new trade', 'Main new position']) ||
    entry.majorEvents?.[0] ||
    'Reviewed in the weekly summary';
  const lessonBlock = entry.body.find((block) => /lesson|overall conclusion|action plan/i.test(block)) ?? entry.excerpt;
  const mainLesson =
    lessonBlock
      .replace(/^\d+\.\s*/g, '')
      .replace(/^(Main lessons? from (the )?Week \d+|Main lesson from the week|Overall conclusion|Action Plan)\n/i, '')
      .split('\n')
      .find((line) => line.trim().length > 55) ?? entry.excerpt;

  return `<article class="static-card">
    <h3>${esc(week)} - ${esc(entry.date)}</h3>
    <dl>
      <div><dt>Account value</dt><dd>${esc(accountValue)}</dd></div>
      <div><dt>Weekly move</dt><dd>${esc(weeklyMove)}</dd></div>
      <div><dt>Main trade</dt><dd>${esc(mainTrade)}</dd></div>
      <div><dt>Main lesson</dt><dd>${esc(mainLesson.replace(/\s+/g, ' ').slice(0, 170))}</dd></div>
    </dl>
    <p><a href="/journal/${esc(entry.slug)}">Read ${esc(entry.title)}</a></p>
  </article>`;
}

function letterCard(letter) {
  const published = Boolean(letter.body?.length);
  return `<article class="static-card">
    <p>${esc(letter.type)} / ${esc(letter.date)}${letter.readingTime ? ` / ${esc(letter.readingTime)}` : ''}</p>
    <h3>${esc(letter.title)}</h3>
    <p>${esc(letter.summary)}</p>
    <p><strong>Main themes:</strong> ${esc(letter.themes.join(', '))}</p>
    <p><strong>Status:</strong> ${published ? 'Published.' : 'Draft in progress.'}</p>
    <p><a href="/letters/${esc(letter.slug)}">${published ? 'Read letter' : 'Open letter page'}</a></p>
  </article>`;
}

function valueHistoryTable() {
  return `<table>
    <thead><tr><th>Week</th><th>Date</th><th>Portfolio value</th><th>Source</th></tr></thead>
    <tbody>
      ${portfolioValueHistory
        .map(
          (point) => `<tr>
            <td>${esc(point.label)}</td>
            <td>${esc(point.date)}</td>
            <td>${esc(point.valueLabel)}</td>
            <td>${esc(point.source)}</td>
          </tr>`,
        )
        .join('')}
    </tbody>
  </table>
  <p>Week 2 did not record a precise account value, so it is not plotted in the line chart.</p>`;
}

function routeHtml({ path, title, description, fallback, pageType = 'WebPage' }) {
  const canonical = `${siteUrl}${path === '/' ? '/' : path}`;
  const staticMain = `<main class="static-fallback" aria-label="Static page content">${fallback}</main>`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: brand.name, url: siteUrl },
  });

  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${esc(canonical)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(description)}" />`)
    .replace('</head>', `<script type="application/ld+json">${structuredData}</script>\n  </head>`)
    .replace(/<main class="static-fallback"[\s\S]*?<\/main>/, staticMain);
}

async function writeRoute(route) {
  const file = route.path === '/' ? `${outputRoot}/index.html` : `${outputRoot}${route.path}/index.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, routeHtml(route));
}

const currentHoldings = holdings.filter((holding) => !/^closed/i.test(holding.positionSize) && !/^closed/i.test(holding.status));
const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);
const firstPublishedLetter = publishedLetters[0];
const weeklyReviews = journalEntries.filter((entry) => entry.category === 'Weekly Reviews');
const latestReviewLabel = latestPortfolioReview.label;

const startRoute = {
  path: '/start',
  title: 'Start Here | Codie Capital Research',
  description:
    'A mobile-first starting page for new visitors from Instagram, with the first letter, latest portfolio update, current portfolio, and main site sections.',
  fallback: `
    <p>Start here from Instagram</p>
    <h1>Codie Capital Research</h1>
    ${paragraph('I am documenting my personal investing journey in public: what I own, why I own it, what I am learning, and how my thinking changes over time.')}
    ${paragraph('Personal journal only. Not financial advice, not a fund, and not a recommendation to copy anything I do.')}
    ${section(
      'Best First Reads',
      linkList([
        {
          label: 'Read My First Letter',
          href: firstPublishedLetter ? `/letters/${firstPublishedLetter.slug}` : '/letters',
          text: 'The best place to understand why this public record exists.',
        },
        {
          label: 'Latest Portfolio Update',
          href: `/journal/${latestPortfolioReview.slug}`,
          text: `${latestPortfolioReview.label} is the current source-of-truth review.`,
        },
        {
          label: 'Current Portfolio',
          href: '/portfolio',
          text: 'What I own, the cash position, and how each holding is grouped.',
        },
      ]),
    )}
    ${section(
      'Current Snapshot',
      `<dl class="static-grid">
        <div><dt>Latest review</dt><dd>${esc(latestReviewLabel)}</dd></div>
        <div><dt>Account value</dt><dd>${esc(portfolioSnapshot.accountValue)}</dd></div>
        <div><dt>Return</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
        <div><dt>Cash</dt><dd>${esc(portfolioSnapshot.cashBalance)}</dd></div>
      </dl>`,
    )}
    ${section(
      'How To Read The Site',
      list([
        'Read the first letter for the why.',
        'Check the current portfolio for the latest position.',
        'Use the journal to see the record week by week.',
      ]),
    )}
    ${section(
      'More Sections',
      linkList([
        { href: '/journal', label: 'Portfolio Journal', text: 'Weekly reviews from the beginning of the public record.' },
        { href: '/process', label: 'Investment Process', text: 'The rules I use for buying, selling, sizing, and reviewing decisions.' },
        { href: '/books', label: 'Books', text: 'The books shaping how I think about risk, money, and discipline.' },
        { href: '/about', label: 'About', text: 'Who I am, why I started investing, and why I built the site.' },
      ]),
    )}
  `,
};

const homeRoute = {
  path: '/',
  title: 'Codie Capital Research | Investment Journal by Codie Marillier',
  description:
    "Codie Marillier's personal investment journal and public record of portfolio decisions, weekly reviews, process, and long-term learning. Not investment advice.",
  fallback: `
    <p>Personal investment journal</p>
    <h1>Codie Capital Research</h1>
    ${paragraph(
      'Codie Capital Research is my personal investment journal. I use it to record what I own, why I own it, what I am learning, and how my thinking changes over time. The aim is to build a long-term public record of my decisions, mistakes, lessons, and development as an investor.',
    )}
    ${paragraph('This is a personal investment journal only. It is not financial advice, not a fund, and not a money-management service.')}
    ${section(
      'Why I Built This',
      list([
        'Document my thinking before hindsight changes the story.',
        'Hold myself accountable with a public record over time.',
        'Track portfolio decisions properly instead of relying on memory or conversation.',
        'Show how my process develops around risk, patience, position sizing, and written reasoning.',
        'Make sure I am recording what I believed and what I actually did.',
      ]),
    )}
    ${section(
      'Latest Portfolio Snapshot',
      `<dl class="static-grid">
        <div><dt>Latest review</dt><dd>${esc(latestReviewLabel)}</dd></div>
        <div><dt>Current account value</dt><dd>${esc(portfolioSnapshot.accountValue)}</dd></div>
        <div><dt>Starting value</dt><dd>${esc(portfolioSnapshot.startingCostBasis)}</dd></div>
        <div><dt>Current return</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
        <div><dt>Cash balance</dt><dd>${esc(portfolioSnapshot.cashBalance)}</dd></div>
      </dl>
      <p>The snapshot is updated through the latest published weekly review.</p>`,
    )}
    ${section('Portfolio Value History', valueHistoryTable())}
    ${section(
      'Start Here',
      linkList([
        {
          label: 'Start Here',
          href: '/start',
          text: 'The fastest mobile-first route for new visitors from Instagram.',
        },
        {
          label: 'Current Portfolio',
          href: '/portfolio',
          text: 'What I currently own, how the portfolio is positioned, and what role each holding plays.',
        },
        {
          label: 'Portfolio Journal',
          href: '/journal',
          text: 'My weekly record of portfolio changes, market thoughts, decisions, and lessons.',
        },
        {
          label: 'Letters',
          href: '/letters',
          text: 'Longer reflections behind the weekly reviews, starting with My First Letter.',
        },
        {
          label: 'Investment Process',
          href: '/process',
          text: 'The rules and habits I am trying to build around capital protection, patience, position sizing, and written reasoning.',
        },
        {
          label: 'About',
          href: '/about',
          text: 'Who I am, why I started investing, and why this public record exists.',
        },
      ]),
    )}
    ${section(
      'Next Pages',
      `<ul>
        <li><a href="/start">Start Here</a></li>
        <li><a href="/portfolio">View Current Portfolio</a></li>
        <li><a href="/journal">Read Portfolio Journal</a></li>
        <li><a href="/letters">Read Letters</a></li>
        <li><a href="/process">See Investment Process</a></li>
        <li><a href="/books">Books That Shaped My Thinking</a></li>
        <li><a href="/letters/my-first-letter">My First Letter</a></li>
        <li><a href="/about">About Codie Marillier</a></li>
        <li><a href="/disclaimer">Disclaimer</a></li>
      </ul>`,
    )}
  `,
};

const routes = [
  startRoute,
  homeRoute,
  {
    path: '/portfolio',
    title: 'Current Portfolio | Codie Capital Research',
    description:
      "Codie Marillier's current personal portfolio record: Week 16 account value, cash, return, open holdings, portfolio roles, winners, drags, and latest action plan.",
    fallback: `
      <p>Personal portfolio record. Not investment advice.</p>
      <h1>Current Portfolio</h1>
      ${paragraph('This page documents my own portfolio structure for accountability. It is not a model portfolio, not investment advice, and should not be copied.')}
      ${section(
        `${latestReviewLabel} Snapshot`,
        `<dl class="static-grid">
          <div><dt>Current account value</dt><dd>${esc(portfolioSnapshot.accountValue)}</dd></div>
          <div><dt>Starting value</dt><dd>${esc(portfolioSnapshot.startingCostBasis)}</dd></div>
          <div><dt>Latest return</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
          <div><dt>Cash</dt><dd>${esc(portfolioSnapshot.cashBalance)}</dd></div>
          <div><dt>Investments</dt><dd>${esc(portfolioSnapshot.investments)}</dd></div>
          <div><dt>Weekly move</dt><dd>${esc(portfolioSnapshot.weeklyMove)}</dd></div>
        </dl>`,
      )}
      ${section('Portfolio Value History', valueHistoryTable())}
      ${section(
        'Open Holdings',
        `<div class="static-grid">${currentHoldings
          .map(
            (holding) => `<article>
              <h3>${esc(holding.ticker)} - ${esc(holding.name)}</h3>
              <p><strong>Shares:</strong> ${esc(holding.positionSize)}</p>
              <p><strong>Role:</strong> ${esc(holding.role)}</p>
              <p><strong>Sleeve:</strong> ${esc(holding.sleeve)}</p>
            </article>`,
          )
          .join('')}</div>`,
      )}
      ${section('Current Winners', list(portfolioCrawlerNotes.winners))}
      ${section('Current Drags', list(portfolioCrawlerNotes.drags))}
      ${section(
        'Portfolio Role Notes',
        portfolioRoles.map((role) => `<article><h3>${esc(role.title)}</h3><p>${esc(role.examples)}</p><p>${esc(role.text)}</p></article>`).join(''),
      )}
      ${section('Latest Action Plan', list(portfolioCrawlerNotes.latestActionPlan))}
      ${section(
        'Transaction Summary',
        `<dl class="static-grid">${transactionSummary.map((item) => `<div><dt>${esc(item.label)}</dt><dd>${esc(item.value)}</dd></div>`).join('')}</dl>`,
      )}
    `,
  },
  {
    path: '/journal',
    title: 'Portfolio Journal | Codie Capital Research',
    description:
      "Weekly portfolio review cards with week number, date, account value, weekly move, main trade, and main lesson from Codie Marillier's personal investment journal.",
    fallback: `
      <p>Weekly review archive. Not investment advice.</p>
      <h1>Portfolio Journal</h1>
      ${paragraph('Weekly portfolio reviews documenting account value, positioning, lessons, mistakes, and market context from my own portfolio.')}
      ${section(
        'Useful Links',
        linkList([
          {
            href: `/journal/${latestPortfolioReview.slug}`,
            label: 'Latest Review',
            text: `${latestPortfolioReview.title} is the current source-of-truth portfolio update.`,
          },
          {
            href: '/letters',
            label: 'Letters',
            text: 'Longer reflections will sit separately from the weekly review archive.',
          },
        ]),
      )}
      ${section('Weekly Review Cards', weeklyReviews.map(weeklyCard).join(''))}
    `,
  },
  {
    path: '/letters',
    title: 'Letters | Codie Capital Research',
    description:
      "Longer-form reflections from Codie Marillier's personal investment journal, covering lessons, discipline, portfolio development, and investing process.",
    fallback: `
      <p>Letters</p>
      <h1>Letters</h1>
      ${paragraph('Weekly reviews are what happened. Letters are what I learned and how my thinking is changing. My First Letter is now published.')}
      ${section('Published Letters', publishedLetters.map(letterCard).join(''))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/journal', label: 'Portfolio Journal', text: 'Weekly review archive from Week 1 to Week 16.' },
          { href: '/process', label: 'Investment Process', text: 'The rules and process these letters refer back to.' },
        ]),
      )}
    `,
  },
  {
    path: '/decision-archive',
    title: 'Decision Archive | Codie Capital Research',
    description:
      'A structured archive of major investment decisions, including reasoning, expectations, risks, outcomes, and lessons learned.',
    fallback: `
      <p>Decision Archive</p>
      <h1>Decision Archive</h1>
      ${paragraph('The Decision Archive is where I will record the most important investment decisions I make. The goal is not only to track outcomes, but to understand the reasoning behind each decision and whether the process was sound.')}
      ${section('Coming Soon', paragraph('No full decision memos are published yet. Until they are written properly, this page stays simple rather than pretending unfinished notes are real entries.'))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/portfolio', label: 'Current Portfolio', text: 'Current holdings and portfolio role notes.' },
          { href: '/journal', label: 'Portfolio Journal', text: 'Weekly reviews and the latest source-of-truth portfolio update.' },
          { href: '/process', label: 'Investment Process', text: 'The rules future decision notes will be judged against.' },
        ]),
      )}
    `,
  },
  {
    path: '/mistakes-lessons',
    title: 'Mistakes & Lessons | Codie Capital Research',
    description:
      'A personal record of investing mistakes, difficult decisions, and lessons learned from managing a real portfolio over time.',
    fallback: `
      <p>Mistakes & Lessons</p>
      <h1>Mistakes & Lessons</h1>
      ${paragraph('This section is for recording mistakes, difficult decisions, and lessons from the portfolio. The aim is not to avoid mistakes completely, but to make sure I learn from them, improve my process, and do not repeat the same errors without understanding them.')}
      ${section('Coming Soon', paragraph('No full lesson notes are published yet. Until they are written properly, this page stays simple rather than pretending unfinished notes are real entries.'))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/process', label: 'Investment Process', text: 'The rules that future lessons are meant to improve.' },
          { href: '/journal', label: 'Portfolio Journal', text: 'The weekly record where lessons first show up.' },
          { href: '/portfolio', label: 'Current Portfolio', text: 'The current holdings and portfolio role notes.' },
        ]),
      )}
    `,
  },
  {
    path: '/books',
    title: 'Books That Shaped My Thinking | Codie Capital Research',
    description:
      'The full Books That Shaped My Thinking section, covering investing, risk, money, discipline, purpose, resilience, and long-term decision-making.',
    fallback: `
      <p>Reading and development</p>
      <h1>Books That Shaped My Thinking</h1>
      ${paragraph('These are the books that have had the biggest influence on how I think about investing, money, discipline, purpose, risk, and long-term decision-making.')}
      ${readingDevelopment
        .map((book) => `<article><h2>${esc(book.title)}</h2><p><strong>${esc(book.author)}</strong> / ${esc(book.category)}</p>${textBlock(book.paragraphs)}<p><strong>Takeaway:</strong> ${esc(book.takeaway)}</p></article>`)
        .join('')}
      ${paragraph('Together, these books have shaped the way I think about investing and life. I do not see investing as separate from personal development.')}
    `,
  },
  {
    path: '/process',
    title: 'Investment Process | Codie Capital Research',
    description:
      "Codie Marillier's investing rules: capital protection, position sizing, written reasoning, cash discipline, no leverage, no impulsive trades, and weekly review process.",
    fallback: `
      <p>Investment process</p>
      <h1>Investment Process</h1>
      ${paragraph('A written rulebook for protecting capital, sizing positions properly, keeping cash discipline, avoiding leverage, and reviewing the portfolio every week.')}
      ${section('Full Investing Rules', processRules.map((rule) => `<article><h3>${esc(rule.title)}</h3><p>${esc(rule.text)}</p></article>`).join(''))}
      ${section('Before I Buy', list(['Why am I buying?', 'What is the thesis?', 'What could go wrong?', 'What would make me sell?', 'Is this core, hedge, speculative, or defensive?', 'Am I following a plan or reacting emotionally?']))}
      ${section('Before I Sell', list(['Has the thesis changed?', 'Am I taking profit, managing risk, or panicking?', 'Should I trim instead of exiting fully?', 'What will I do with the cash?', 'What lesson should be recorded?']))}
      ${section(
        'Related Sections',
        linkList([
          {
            href: '/portfolio',
            label: 'Current Portfolio',
            text: 'The live portfolio record these rules are meant to support.',
          },
          {
            href: '/journal',
            label: 'Portfolio Journal',
            text: 'The weekly record where the process is reviewed in practice.',
          },
        ]),
      )}
    `,
  },
  {
    path: '/about',
    title: 'About Codie Marillier | Codie Capital Research',
    description:
      "Codie Marillier's personal investing background, early market interest, first Bitcoin investment, family real estate influence, mistakes, and reading development.",
    fallback: `
      <p>About Codie Marillier</p>
      <h1>About Codie Marillier</h1>
      ${paragraph('I am a private, long-term investor managing my own portfolio and documenting the process publicly.')}
      ${paragraph('I started this site to build a public record of my investing process, not just a list of trades or returns.')}
      ${paragraph('My interest in investing began seriously around the age of fourteen, when I first understood that the stock market allowed ordinary people to buy small pieces of real businesses.')}
      ${paragraph('During the first COVID lockdown in 2020, my father encouraged me and my siblings to each choose an online course while we were at home. I chose a stock trading course by Mohsin Hassan on Udemy and began studying fundamental analysis, technical analysis, market behaviour, risk, and trading psychology.')}
      ${paragraph('My first investment was Bitcoin in 2021, when it was trading at roughly $21,000. I invested around $500, and within a few months that position had grown to approximately $1,500. That early success gave me confidence, but it also taught me that making money early does not always mean you fully understand risk.')}
      ${paragraph("My family's background in real estate shaped the way I think about assets, ownership, capital appreciation, rental income, and long-term wealth creation. Public markets have given me a way to begin building capital earlier through listed companies, ETFs, selected assets, and a repeatable process.")}
      ${section(
        'Learning From Mistakes',
        `${paragraph('Early Bitcoin and crypto success showed me what was possible. Losing money through leveraged crypto trading taught me more than making money early on.')}
        ${paragraph('Leveraged crypto trading became too close to gambling because it encouraged emotional behaviour, adding to losing trades, and hoping for reversals. I no longer want strategies that create revenge trading, overexposure, or emotional decision-making.')}`,
      )}
      ${section(
        'Why I Built This Website',
        `${paragraph('I built this website to document my thinking, keep myself accountable, show what I believed at different moments, and create a broader reputational asset over time.')}
        ${paragraph('The full reading list now lives on the Books page.')}`,
      )}
    `,
  },
  {
    path: '/philosophy',
    title: 'Investment Philosophy | Codie Capital Research',
    description:
      "Codie Marillier's personal investment philosophy covering long-term ownership, quality businesses, sensible prices, cash, hedges, and avoiding leverage.",
    fallback: `
      <p>Investment philosophy</p>
      <h1>Investment Philosophy</h1>
      ${paragraph('My investing approach is built around long-term ownership, capital protection, sensible prices, and written reasoning before action.')}
      ${paragraph('I focus on long-term investing in public companies, ETFs, and selected assets with clear portfolio roles. I prefer dominant, profitable businesses with strong earnings power and room to grow over many years.')}
      ${paragraph('Cash gives flexibility, ETFs provide broad exposure, and gold has a role as a hedge against inflation, instability, and market stress. I avoid leverage and emotional trading.')}
      ${section('Core Rules', list(processRules.map((rule) => `${rule.title}: ${rule.text}`)))}
    `,
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | Codie Capital Research',
    description:
      'Full disclaimer for Codie Capital Research: personal investment journal, not investment advice, not FCA-authorised, and not a recommendation.',
    fallback: `
      <p>Disclaimer</p>
      <h1>Disclaimer</h1>
      ${section('Full Disclaimer', disclaimerPoints.map(paragraph).join(''))}
    `,
  },
];

for (const route of routes) {
  await writeRoute(route);
}

for (const entry of journalEntries) {
  await writeRoute({
    path: `/journal/${entry.slug}`,
    title: `${entry.title} | Portfolio Journal | Codie Capital Research`,
    description: `${entry.date}. ${entry.excerpt}`,
    pageType: 'Article',
    fallback: `
      <p>${esc(entry.category)} / ${esc(entry.date)}</p>
      <h1>${esc(entry.title)}</h1>
      ${paragraph(entry.excerpt)}
      ${entry.documentUrl ? paragraph(`Original document preview: ${entry.documentUrl}`) : ''}
      ${entry.documentPdfUrl ? paragraph(`PDF: ${entry.documentPdfUrl}`) : ''}
      ${textBlock(entry.body)}
      ${section('Related Links', list(['/journal', '/portfolio', '/ai/index.html', `/ai/journal/${entry.slug}.html`]))}
    `,
  });
}

for (const letter of publishedLetters) {
  const published = Boolean(letter.body?.length);
  await writeRoute({
    path: `/letters/${letter.slug}`,
    title: `${letter.title} | Letters | Codie Capital Research`,
    description: letter.summary,
    pageType: 'Article',
    fallback: `
      <p>${published ? `${esc(letter.type)} / ${esc(letter.date)}${letter.readingTime ? ` / ${esc(letter.readingTime)}` : ''}` : 'Coming soon'}</p>
      <h1>${esc(letter.title)}</h1>
      ${paragraph(letter.summary)}
      ${section('Main Themes', list(letter.themes))}
      ${published ? section('Letter', textBlock(letter.body ?? [])) : paragraph('This letter is being prepared, but it is not published yet.')}
      ${section('Back Link', '<p><a href="/letters">Back to Letters</a></p>')}
    `,
  });
}

await writeFile(
  `${outputRoot}/404.html`,
  routeHtml({
    path: '/404',
    title: 'Page Not Found | Codie Capital Research',
    description: 'The requested page could not be found on Codie Capital Research.',
    fallback: `
      <p>404</p>
      <h1>Page Not Found</h1>
      ${paragraph('The page you requested could not be found. Use the links below to return to the main public archive.')}
      ${section('Useful Links', list(['/start', '/', '/portfolio', '/journal', '/letters', '/books', '/process', '/about', '/disclaimer', '/ai/index.html']))}
    `,
  }),
);

console.log(`Generated static public route HTML in ${outputRoot}`);
