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
  decisionArchiveEntries,
  disclaimerPoints,
  holdings,
  journalEntries,
  mistakeLessons,
  portfolioCrawlerNotes,
  portfolioRoles,
  portfolioSnapshot,
  plannedLetters,
  processRules,
  readingDevelopment,
  researchNotes,
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
  return `<p>${esc(text)}</p>`;
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
    readLabel(snapshot, ['Current account value', 'Account value', 'Total portfolio value', 'Portfolio value']) ||
    'Recorded in weekly review';
  const weeklyMove = readLabel(snapshot, ['Move since Week 14', 'Weekly move', 'Weekly change']) || 'Recorded in weekly review';
  const mainTrade =
    readLabel(snapshot, ['Main realised trade', 'Main trade', 'Main new position']) ||
    entry.majorEvents?.[0] ||
    'Reviewed in the weekly summary';
  const lessonBlock = entry.body.find((block) => /lesson|overall conclusion|action plan/i.test(block)) ?? entry.excerpt;
  const mainLesson =
    lessonBlock
      .replace(/^\d+\.\s*/g, '')
      .replace(/^(Main lesson from the week|Overall conclusion|Action Plan)\n/i, '')
      .split('\n')
      .find((line) => line.trim().length > 55) ?? entry.excerpt;

  return `<article class="static-card">
    <h3>${esc(week)} - ${esc(entry.date)}</h3>
    <dl>
      <div><dt>Account value</dt><dd>${esc(accountValue)}</dd></div>
      <div><dt>Weekly move</dt><dd>${esc(weeklyMove)}</dd></div>
      <div><dt>Main trade</dt><dd>${esc(mainTrade)}</dd></div>
      <div><dt>Main lesson</dt><dd>${esc(mainLesson)}</dd></div>
    </dl>
    <p><a href="/journal/${esc(entry.slug)}">Read ${esc(entry.title)}</a></p>
  </article>`;
}

function letterCard(letter) {
  return `<article class="static-card">
    <p>${esc(letter.type)} / ${esc(letter.date)}</p>
    <h3><a href="/letters/${esc(letter.slug)}">${esc(letter.title)}</a></h3>
    <p>${esc(letter.summary)}</p>
    <p><strong>Main themes:</strong> ${esc(letter.themes.join(', '))}</p>
  </article>`;
}

function decisionCard(decision) {
  return `<article class="static-card">
    <p>${esc(decision.action)} / ${esc(decision.status)} / ${esc(decision.date)}</p>
    <h3><a href="/decision-archive/${esc(decision.slug)}">${esc(decision.title)}</a></h3>
    <p><strong>Holding/ticker:</strong> ${esc(decision.holding)}</p>
    <p><strong>Position type:</strong> ${esc(decision.positionType)}</p>
    <p>${esc(decision.summary)}</p>
    <p><strong>Tags:</strong> ${esc(decision.tags.join(', '))}</p>
    ${decision.relatedWeeklyReview ? `<p><strong>Related weekly review:</strong> <a href="/journal/${esc(decision.relatedWeeklyReview)}">${esc(decision.relatedWeeklyReview)}</a></p>` : ''}
  </article>`;
}

function lessonCard(lesson) {
  return `<article class="static-card">
    <p>${esc(lesson.period)}</p>
    <h3><a href="/mistakes-lessons/${esc(lesson.slug)}">${esc(lesson.title)}</a></h3>
    <p>${esc(lesson.summary)}</p>
    <p><strong>Main themes:</strong> ${esc(lesson.themes.join(', '))}</p>
    ${lesson.relatedLink ? `<p><strong>Related link:</strong> <a href="${esc(lesson.relatedLink)}">${esc(lesson.relatedLink)}</a></p>` : ''}
  </article>`;
}

function templatePage({ eyebrow, title, intro, backHref, backLabel, fields }) {
  return `
    <p>${esc(eyebrow)}</p>
    <h1>${esc(title)}</h1>
    ${paragraph(intro)}
    ${section('Coming Soon', paragraph('This page is a prepared template for a future piece of writing. The full content has not been written yet, so the page is intentionally not pretending to be finished.'))}
    ${section('Template Fields', list(fields.map((field) => `${field}: To be written.`)))}
    ${section('Back Link', `<p><a href="${esc(backHref)}">Back to ${esc(backLabel)}</a></p>`)}
  `;
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
const weeklyReviews = journalEntries.filter((entry) => entry.category === 'Weekly Reviews');

const homeRoute = {
  path: '/',
  title: 'Codie Capital Research | Investment Journal by Codie Marillier',
  description:
    "Codie Marillier's personal investment journal documenting his own portfolio, weekly reviews, books, investing rules, and lessons. Not investment advice.",
  fallback: `
    <p>Personal investment journal</p>
    <h1>Codie Capital Research</h1>
    ${paragraph('Codie Capital Research is the personal investment journal of Codie Marillier, a private long-term investor managing his own portfolio and documenting the process publicly.')}
    ${paragraph('The site records portfolio holdings, weekly reviews, books that shaped Codie’s thinking, investment rules, mistakes, and public accountability. It is not a fund, advisory service, investment service, capital-raising site, or money-management business.')}
    ${section(
      'Latest Portfolio Snapshot',
      `<dl class="static-grid">
        <div><dt>Latest review</dt><dd>Week 15</dd></div>
        <div><dt>Current account value</dt><dd>${esc(portfolioSnapshot.accountValue)}</dd></div>
        <div><dt>Starting value</dt><dd>${esc(portfolioSnapshot.startingCostBasis)}</dd></div>
        <div><dt>Current return</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
        <div><dt>Cash balance</dt><dd>${esc(portfolioSnapshot.cashBalance)}</dd></div>
      </dl>`,
    )}
    ${section(
      'Main Pages',
      list([
        'About Codie Marillier: personal investing background, early interest in markets, Bitcoin, real estate influence, mistakes, and reading development.',
        'Current Portfolio: current account value, cash, holdings, winners, drags, roles, and action plan.',
        'Portfolio Journal: weekly summaries from Week 1 to Week 15 and trade reflections.',
        'Letters: planned longer-form reflections on investing lessons, discipline, risk, and process development.',
        'Decision Archive: planned structured decision memos covering reasoning, expectations, risks, outcomes, and lessons.',
        'Mistakes & Lessons: planned notes on mistakes, difficult decisions, and improvements to the investing process.',
        'Books That Shaped My Thinking: full personal reflections on each book.',
        'Investment Process: capital protection, position sizing, written reasoning, cash discipline, no leverage, no impulsive trades, and weekly review process.',
      ]),
    )}
    ${section(
      'Building the Process',
      `<div class="static-grid">
        <article><h3><a href="/letters">Letters</a></h3><p>Longer-form monthly or quarterly reflections on what I am learning, how my thinking is developing, and what I am trying to improve over time.</p></article>
        <article><h3><a href="/decision-archive">Decision Archive</a></h3><p>A structured archive for future major decisions, including reasoning, expectations, risks, outcomes, and lessons learned.</p></article>
        <article><h3><a href="/mistakes-lessons">Mistakes & Lessons</a></h3><p>A personal record of mistakes, difficult decisions, and process lessons from managing my own portfolio.</p></article>
      </div>`,
    )}
    ${section(
      'Links',
      `<ul>
        <li><a href="/about">About</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/journal">Journal</a></li>
        <li><a href="/letters">Letters</a></li>
        <li><a href="/decision-archive">Decision Archive</a></li>
        <li><a href="/mistakes-lessons">Mistakes & Lessons</a></li>
        <li><a href="/books">Books</a></li>
        <li><a href="/process">Process</a></li>
        <li><a href="/disclaimer">Disclaimer</a></li>
        <li><a href="/ai/">AI-readable archive</a></li>
      </ul>`,
    )}
  `,
};

const routes = [
  homeRoute,
  {
    path: '/portfolio',
    title: 'Current Portfolio | Codie Capital Research',
    description:
      "Codie Marillier's current personal portfolio record: Week 15 account value, cash, return, open holdings, portfolio roles, winners, drags, and latest action plan.",
    fallback: `
      <p>Personal portfolio record. Not investment advice.</p>
      <h1>Current Portfolio</h1>
      ${paragraph('This page documents my own portfolio structure for accountability. It is not a model portfolio, not investment advice, and should not be copied.')}
      ${section(
        'Week 15 Snapshot',
        `<dl class="static-grid">
          <div><dt>Current account value</dt><dd>${esc(portfolioSnapshot.accountValue)}</dd></div>
          <div><dt>Starting value</dt><dd>${esc(portfolioSnapshot.startingCostBasis)}</dd></div>
          <div><dt>Latest return</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
          <div><dt>Cash</dt><dd>${esc(portfolioSnapshot.cashBalance)}</dd></div>
          <div><dt>Investments</dt><dd>${esc(portfolioSnapshot.investments)}</dd></div>
          <div><dt>Weekly move</dt><dd>${esc(portfolioSnapshot.weeklyMove)}</dd></div>
        </dl>`,
      )}
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
      ${section(
        'Related Decision Record',
        '<p><a href="/decision-archive">See the Decision Archive for the reasoning behind major portfolio changes.</a></p>',
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
        'Related Sections',
        linkList([
          {
            href: '/decision-archive',
            label: 'Decision Archive',
            text: 'Future major trades and portfolio decisions will be recorded as structured decision notes.',
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
      ${paragraph('Letters are longer-form reflections on my investing journey. Unlike the weekly portfolio reviews, these are not only about what changed in the account. They are about what I am learning, how my thinking is developing, and what I am trying to improve over time.')}
      ${section('Coming Soon', paragraph('These letters are planned but not written yet. The structure is here so future monthly letters, quarterly letters, and deeper reflections can sit alongside the weekly portfolio record.'))}
      ${section('Planned Letter Cards', plannedLetters.map(letterCard).join(''))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/journal', label: 'Portfolio Journal', text: 'Weekly review archive from Week 1 to Week 15.' },
          { href: '/process', label: 'Investment Process', text: 'The rules and process these future letters will keep referring back to.' },
          { href: '/mistakes-lessons', label: 'Mistakes & Lessons', text: 'A planned record for honest reviews and lessons.' },
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
      ${section('Coming Soon', paragraph('Initial decision notes will be added soon. Each future entry will record the decision, what I expected, what could go wrong, what actually happened, and what I learned afterwards.'))}
      ${section('Filter Support', list(['Buy', 'Sell', 'Trim', 'Add', 'Hold', 'Mistake', 'Lesson', 'Speculative', 'Core holding', 'Hedge']))}
      ${section('Planned Decision Cards', decisionArchiveEntries.map(decisionCard).join(''))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/portfolio', label: 'Current Portfolio', text: 'Current holdings and portfolio role notes.' },
          { href: '/journal', label: 'Portfolio Journal', text: 'Weekly reviews linked to future decision notes.' },
          { href: '/mistakes-lessons', label: 'Mistakes & Lessons', text: 'Future lessons connected to reviewed decisions.' },
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
      ${section('Coming Soon', paragraph('These lesson cards are planned placeholders. Future entries will explain what happened, why it mattered, what I got wrong, what I learned, and what I would do differently.'))}
      ${section('Planned Lesson Cards', mistakeLessons.map(lessonCard).join(''))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/decision-archive', label: 'Decision Archive', text: 'Future decision memos that can connect to lesson notes.' },
          { href: '/process', label: 'Investment Process', text: 'The rules that future lessons are meant to improve.' },
          { href: '/about', label: 'About', text: 'The personal background behind the learning process.' },
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
        .map((book) => `<article><h2>${esc(book.title)}</h2><p><strong>${esc(book.author)}</strong> / ${esc(book.category)}</p>${textBlock(book.paragraphs)}</article>`)
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
      ${section(
        'Related Sections',
        linkList([
          {
            href: '/decision-archive',
            label: 'Decision Archive',
            text: 'The future place for structured records of major buys, sells, trims, adds, holds, mistakes, and lessons.',
          },
          {
            href: '/mistakes-lessons',
            label: 'Mistakes & Lessons',
            text: 'The future place for reviewing mistakes properly and improving the process over time.',
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
      ${paragraph('This page covers Codie Marillier as a private long-term investor, his early interest in markets, the COVID lockdown course, first Bitcoin investment, family real estate influence, mistakes, and reading development.')}
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
        'Reading Development',
        `${paragraph('Reading has become one of the most important parts of my investing process because it helps me think about patience, discipline, valuation, risk control, psychology, and clear thinking during emotional markets.')}
        ${list(readingDevelopment.map((book) => `${book.title} by ${book.author} - ${book.category}`))}`,
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
      ${section('Related Links', list(['/journal', '/portfolio', '/ai/', `/ai/journal/${entry.slug}.html`]))}
    `,
  });
}

for (const letter of plannedLetters) {
  await writeRoute({
    path: `/letters/${letter.slug}`,
    title: `${letter.title} | Letters | Codie Capital Research`,
    description: letter.summary,
    pageType: 'Article',
    fallback: templatePage({
      eyebrow: `${letter.type} / ${letter.date}`,
      title: letter.title,
      intro: letter.summary,
      backHref: '/letters',
      backLabel: 'Letters',
      fields: ['Title', 'Date', 'Type', 'Short summary', 'Main themes', 'Full letter draft'],
    }),
  });
}

for (const decision of decisionArchiveEntries) {
  await writeRoute({
    path: `/decision-archive/${decision.slug}`,
    title: `${decision.title} | Decision Archive | Codie Capital Research`,
    description: decision.summary,
    pageType: 'Article',
    fallback: templatePage({
      eyebrow: `${decision.action} / ${decision.positionType} / ${decision.status}`,
      title: decision.title,
      intro: `${decision.summary} Holding/ticker: ${decision.holding}. Related weekly review: ${decision.relatedWeeklyReview ?? 'To be confirmed'}.`,
      backHref: '/decision-archive',
      backLabel: 'Decision Archive',
      fields: [
        'Date',
        'Decision title',
        'Holding / ticker',
        'Action taken',
        'Position type',
        'Why I made the decision',
        'What I expected',
        'What could go wrong',
        'What actually happened',
        'What I learned',
        'Related weekly review',
        'Status',
      ],
    }),
  });
}

for (const lesson of mistakeLessons) {
  await writeRoute({
    path: `/mistakes-lessons/${lesson.slug}`,
    title: `${lesson.title} | Mistakes & Lessons | Codie Capital Research`,
    description: lesson.summary,
    pageType: 'Article',
    fallback: templatePage({
      eyebrow: lesson.period,
      title: lesson.title,
      intro: `${lesson.summary} Related decision or weekly review: ${lesson.relatedLink ?? 'To be confirmed'}.`,
      backHref: '/mistakes-lessons',
      backLabel: 'Mistakes & Lessons',
      fields: [
        'Title',
        'Date or period',
        'What happened',
        'Why it mattered',
        'What I got wrong',
        'What I learned',
        'What I would do differently',
        'Related decision or weekly review',
      ],
    }),
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
      ${section('Useful Links', list(['/', '/portfolio', '/journal', '/letters', '/decision-archive', '/mistakes-lessons', '/books', '/process', '/about', '/ai/']))}
    `,
  }),
);

console.log(`Generated static public route HTML in ${outputRoot}`);
