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
  currentPortfolio,
  siteIdentity,
  disclaimerPoints,
  holdings,
  journalEntries,
  legacyJournalRedirects,
  latestPortfolioReview,
  portfolioRoles,
  portfolioSnapshot,
  publicRouteManifest,
  plannedLetters,
  processRules,
  readingDevelopment,
  transactionSummary,
  v2Contact,
  v2FeaturedWorkStories,
  v2HorseboxProjectDetails,
  v2Identity,
  v2Interests,
  v2LifeChapters,
  v2Now,
  v2Principles,
  v2Projects,
  v2SecondaryWork,
  v2TravelImages,
  v2TravelStory,
  v2WritingGateways,
  v2Voice,
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

function getSnapshotBlock(entry) {
  return entry.body.find((block) => block.split('\n')[0]?.trim().toLowerCase() === 'snapshot') ?? entry.body[0] ?? '';
}

function reviewCard(entry) {
  const snapshot = getSnapshotBlock(entry);
  const reviewLabel = entry.subtitle ?? entry.title;
  const performance =
    readLabel(snapshot, ['Since inception', 'Period return', 'Position versus start', 'Drawdown']) ||
    'Not recorded';
  const periodMarker =
    readLabel(snapshot, ['From the low', 'Drawdown', 'Vs cost basis', 'Move since Week 16', 'Move since Week 14', 'Fortnightly move', 'Weekly move', 'Weekly change']) ||
    'See the full review';
  const mainTrade =
    readLabel(snapshot, ['Short-term trade', 'Main realised trade', 'Main trade', 'Main new trade', 'Main new position']) ||
    entry.majorEvents?.[0] ||
    'Reviewed in the portfolio summary';
  const lessonBlock = entry.body.find((block) => /lesson|overall conclusion|action plan/i.test(block)) ?? entry.excerpt;
  const mainLesson =
    lessonBlock
      .replace(/^\d+\.\s*/g, '')
      .replace(/^(Main lessons? from (the )?Week \d+|Main lesson from the week|Overall conclusion|Action Plan)\n/i, '')
      .split('\n')
      .find((line) => line.trim().length > 55) ?? entry.excerpt;

  return `<article class="static-card">
    <h3>${esc(entry.title)} - ${esc(entry.date)}</h3>
    <p>${esc(reviewLabel)}</p>
    <dl>
      <div><dt>Performance</dt><dd>${esc(performance)}</dd></div>
      <div><dt>Period marker</dt><dd>${esc(periodMarker)}</dd></div>
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

function routeHtml({ path, title, description, fallback, pageType = 'WebPage', noindex = false }) {
  const canonical = `${siteUrl}${path === '/' ? '/' : path}`;
  const staticMain = `<main class="static-fallback" aria-label="Static page content">${fallback}</main>`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: siteIdentity.personName, url: siteUrl },
  });

  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace('</head>', `${noindex ? '<meta name="robots" content="noindex, follow" />\n  ' : ''}</head>`)
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

async function writeRedirectRoute({ path, target, title }) {
  const file = `${outputRoot}${path}/index.html`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${esc(target)}" />
    <link rel="canonical" href="${esc(`${siteUrl}${target}`)}" />
    <title>${esc(title)}</title>
    <script>window.location.replace(${JSON.stringify(target)});</script>
  </head>
  <body>
    <main>
      <h1>${esc(title)}</h1>
      <p>This page has moved to <a href="${esc(target)}">${esc(`${siteUrl}${target}`)}</a>.</p>
    </main>
  </body>
</html>`;

  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const currentHoldings = holdings.filter((holding) => holding.status === 'Current holding');
const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);
const firstPublishedLetter = publishedLetters[0];
const portfolioReviews = journalEntries.filter((entry) => entry.category === 'Monthly Reviews');
const standaloneJournalEntries = journalEntries.filter((entry) => entry.category !== 'Monthly Reviews');
const latestReviewLabel = latestPortfolioReview.label;

const homeRoute = {
  path: '/',
  title: 'Codie Marillier | Investment Journal & Research',
  description:
    "Codie Marillier's personal investment journal and public record of portfolio decisions, regular reviews, process, and long-term learning. Not investment advice.",
  fallback: `
    <p>Codie Marillier / Codie Capital Research</p>
    <h1>Investing, in public.</h1>
    ${paragraph(
      'A public record of what I own, why I own it, what I am learning, and how my thinking changes. Performance is public. Personal finances are not.',
    )}
    ${paragraph('This is a personal investment journal only. It is not financial advice, not a fund, and not a money-management service.')}
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
          text: `${latestPortfolioReview.label} is the latest published grouped review.`,
        },
        {
          label: 'Current Portfolio',
          href: '/portfolio',
          text: 'What I own, rounded allocation weights, portfolio roles, and current decisions.',
        },
      ]),
    )}
    ${section(
      'Latest Public Snapshot',
      `<dl class="static-grid">
        <div><dt>Latest review</dt><dd>${esc(latestReviewLabel)}</dd></div>
        <div><dt>Since inception</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
        <div><dt>Cash allocation</dt><dd>${esc(portfolioSnapshot.cashWeight)}</dd></div>
        <div><dt>Started</dt><dd>${esc(currentPortfolio.started)}</dd></div>
      </dl>
      <p>Allocation reviewed ${esc(portfolioSnapshot.asOfDate)}. Weights are rounded to limit reconstruction of personal finances.</p>`,
    )}
    ${section(
      'More Sections',
      linkList([
        {
          label: 'Portfolio Journal',
          href: '/journal',
          text: 'My regular record of portfolio changes, market thoughts, decisions, and lessons.',
        },
        {
          label: 'Letters',
          href: '/letters',
          text: 'Longer reflections behind the portfolio reviews, starting with My First Letter.',
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
  homeRoute,
  {
    path: '/portfolio',
    title: 'Current Portfolio | Codie Capital Research',
    description:
      `Codie Marillier's current portfolio record: ${latestPortfolioReview.label}, percentage performance, rounded allocation weights, research roles and current decisions.`,
    fallback: `
      <p>Personal portfolio record. Not investment advice.</p>
      <h1>Current Portfolio</h1>
      ${paragraph('This page documents my own portfolio structure for accountability. It is not a model portfolio, not investment advice, and should not be copied.')}
      ${section(
        `${latestReviewLabel} Public Snapshot`,
        `<dl class="static-grid">
          <div><dt>Since inception</dt><dd>${esc(portfolioSnapshot.currentReturn)}</dd></div>
          <div><dt>Cash allocation</dt><dd>${esc(portfolioSnapshot.cashWeight)}</dd></div>
          <div><dt>Allocation reviewed</dt><dd>${esc(portfolioSnapshot.asOfDate)}</dd></div>
          <div><dt>Started</dt><dd>${esc(currentPortfolio.started)}</dd></div>
        </dl>`,
      )}
      ${section(
        'Open Holdings',
        `<div class="static-grid">${currentHoldings
          .map(
            (holding) => `<article>
              <h3>${esc(holding.ticker)} - ${esc(holding.name)}</h3>
              <p><strong>Rounded weight:</strong> ${esc(holding.portfolioWeight)}%</p>
              <p><strong>Role:</strong> ${esc(holding.role)}</p>
              <p><strong>Sleeve:</strong> ${esc(holding.sleeve)}</p>
              <p><strong>Decision:</strong> ${esc(holding.decision)}</p>
              <p><strong>Why owned:</strong> ${esc(holding.whyOwned)}</p>
            </article>`,
          )
          .join('')}</div>`,
      )}
      ${section(
        'Portfolio Role Notes',
        portfolioRoles.map((role) => `<article><h3>${esc(role.title)}</h3><p>${esc(role.examples)}</p><p>${esc(role.text)}</p></article>`).join(''),
      )}
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
      "Portfolio review cards with dates, percentage performance, main decisions, and lessons from Codie Marillier's personal investment journal.",
    fallback: `
      <p>Portfolio review archive. Not investment advice.</p>
      <h1>Portfolio Journal</h1>
      ${paragraph('Monthly portfolio reviews documenting percentage performance, positioning, lessons, mistakes, and market context from my own portfolio.')}
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
            text: 'Longer reflections will sit separately from the portfolio review archive.',
          },
        ]),
      )}
      ${section('Monthly Portfolio Reviews', portfolioReviews.map(reviewCard).join(''))}
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
      ${paragraph('Portfolio reviews are what happened. Letters are what I learned and how my thinking is changing. My First Letter is now published.')}
      ${section('Published Letters', publishedLetters.map(letterCard).join(''))}
      ${section(
        'Related Sections',
        linkList([
          { href: '/journal', label: 'Portfolio Journal', text: 'Five monthly-style reviews from portfolio launch through 3 August 2026, plus focused notes and reflections.' },
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
          { href: '/journal', label: 'Portfolio Journal', text: 'Portfolio reviews and the latest source-of-truth portfolio update.' },
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
          { href: '/journal', label: 'Portfolio Journal', text: 'The regular record where lessons first show up.' },
          { href: '/portfolio', label: 'Current Portfolio', text: 'The current holdings and portfolio role notes.' },
        ]),
      )}
    `,
  },
  {
    path: '/books',
    title: 'Books I Have Read | Codie Capital Research',
    description:
      'A bookshelf of the books Codie Marillier has read, with summaries covering investing, risk, money, discipline, purpose, resilience, and long-term decision-making.',
    fallback: `
      <p>Reading and development</p>
      <h1>Books I Have Read</h1>
      ${paragraph('A simple bookshelf of the books that have shaped how I think about investing, money, discipline, purpose, risk, and long-term decision-making. Click a book to read the full reflection.')}
      ${readingDevelopment
        .map(
          (book) => `<article class="static-card">
            <h2><a href="/books/${esc(book.slug)}">${esc(book.title)}</a></h2>
            <p><strong>${esc(book.author)}</strong> / ${esc(book.category)}</p>
            <p><strong>Takeaway:</strong> ${esc(book.takeaway)}</p>
          </article>`,
        )
        .join('')}
      ${paragraph('Together, these books have shaped the way I think about investing and life. The investing books have taught me about value, risk, discipline, contrarian thinking, and protecting capital. The personal books have taught me about purpose, resilience, ambition, perspective, and using money properly. I do not see investing as separate from personal development. To become a better investor, I also need to become more patient, more disciplined, more thoughtful, and more aware of my own behaviour.')}
    `,
  },
  {
    path: '/process',
    title: 'Investment Process | Codie Capital Research',
    description:
      "Codie Marillier's investing rules: capital protection, position sizing, written reasoning, cash discipline, no leverage, no impulsive trades, and regular review process.",
    fallback: `
      <p>Investment process</p>
      <h1>Investment Process</h1>
      ${paragraph('A written rulebook for protecting capital, sizing positions properly, keeping cash discipline, avoiding leverage, and reviewing the portfolio regularly.')}
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
            text: 'The regular record where the process is reviewed in practice.',
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
      ${paragraph('My first investment was Bitcoin in 2021, when it was trading at roughly $21,000. The position roughly tripled before I sold it. That early success gave me confidence, but it also taught me that making money early does not always mean you fully understand risk.')}
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
  {
    path: '/v2-preview',
    title: 'Website V2 Preview | Codie Marillier',
    description:
      'A private local preview of Codie Marillier’s broader personal website. Not intended for search indexing or production publication.',
    noindex: true,
    fallback: `
      <p>Local Website V2 preview. Not published or indexed.</p>
      <h1>${esc(v2Identity.name)}</h1>
      ${paragraph(`${v2Identity.origin}. ${v2Identity.currentContext}.`)}
      ${paragraph(v2Voice.opening)}
      ${section('Explore', linkList([
        { label: 'Explore my work', href: '/v2-preview/work', text: 'Read the selected work stories in depth.' },
        { label: 'Read my writing', href: '/v2-preview/writing', text: 'Open the preserved writing and investing archive.' },
        { label: 'View current projects', href: '/v2-preview/projects', text: 'See active, researching and unconfirmed-status projects.' },
      ]))}
      ${section('About', paragraph(v2Identity.purpose) + list(v2Interests))}
      ${section('Two Early Stories', paragraph(v2Voice.firstBusiness) + paragraph(v2Voice.france))}
      ${section('Zimbabwe', paragraph('Codie grew up in Harare and later went to boarding school in Marondera. Discipline, sport, close friendships and freedom within structure shaped how he sees the world.') + paragraph('Growing up around his parents’ property business provided early exposure to client relationships, practical problem-solving, entrepreneurship and the responsibility to use opportunities well.'))}
      ${section(
        'Selected Work',
        v2FeaturedWorkStories.map((story) => `<article><h3>${esc(story.title)}</h3><p>${esc(story.location)} / ${esc(story.status)}</p><p>${esc(story.summary)}</p><p><strong>Lesson:</strong> ${esc(story.lesson)}</p></article>`).join(''),
      )}
      ${section(
        'Projects',
        v2Projects.map((project) => `<article><h3>${esc(project.title)}</h3><p>${esc(project.type)} / ${esc(project.status)}</p><p>${esc(project.summary)}</p><p>${esc(project.note)}</p></article>`).join(''),
      )}
      ${section('Travel', `<h3>${esc(v2TravelStory.country)}: ${esc(v2TravelStory.title)}</h3>${paragraph(v2TravelStory.summary)}${paragraph(v2TravelStory.reflection)}`)}
      ${section('Investing and Writing', paragraph('Codie Capital Research remains intact as the investing sub-brand, including its portfolio, performance record, holdings, decisions, journal, letters and disclosures.') + list(['/portfolio', '/journal', '/letters', '/decision-archive', '/disclaimer']))}
      ${section('Now', `<p><strong>Location:</strong> ${esc(v2Now.location)}</p><p><strong>Work:</strong> ${esc(v2Now.work)}</p><p><strong>Building:</strong> ${esc(v2Now.building.join(', '))}</p><p><strong>Learning:</strong> ${esc(v2Now.learning.join(', '))}</p><p>Preview reviewed ${esc(v2Now.lastReviewed)}.</p>`)}
      ${section('Contact', `<p>Email: <a href="mailto:${esc(v2Contact.email)}">${esc(v2Contact.email)}</a></p><p>Instagram: <a href="${esc(v2Contact.instagramUrl)}">${esc(v2Contact.instagramHandle)}</a></p>`)}
    `,
  },
  {
    path: '/v2-preview/about',
    title: 'About | Website V2 Preview | Codie Marillier',
    description: 'A private preview of Codie Marillier’s broader personal biography and background.',
    noindex: true,
    fallback: `<p>Website V2 preview / About</p><h1>I am still learning what my life will become.</h1>${paragraph(v2Identity.purpose)}${section('Zimbabwe is home. It is where the story starts.', paragraph(v2Voice.familyBusiness))}${section('Life chapters', v2LifeChapters.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.context)}</p><p>${esc(item.text)}</p></article>`).join(''))}${section('Interests and reading', list(v2Interests) + `<p><a href="/books">Explore the books that changed how I think</a></p>`)}`,
  },
  {
    path: '/v2-preview/work',
    title: 'Work | Website V2 Preview | Codie Marillier',
    description: 'A private preview of selected work experiences and practical lessons.',
    noindex: true,
    fallback: `<p>Website V2 preview / Work</p><h1>Responsibility is easiest to understand when the result is visible.</h1>${section('The first one', paragraph(v2Voice.firstBusiness))}${section('Featured work', v2FeaturedWorkStories.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.location)} / ${esc(item.status)}</p><p>${esc(item.summary)}</p><p>Lesson: ${esc(item.lesson)}</p></article>`).join(''))}${section('Other work', v2SecondaryWork.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join(''))}`,
  },
  {
    path: '/v2-preview/projects',
    title: 'Projects | Website V2 Preview | Codie Marillier',
    description: 'A private preview of active, researching and unconfirmed-status projects.',
    noindex: true,
    fallback: `<p>Website V2 preview / Projects</p><h1>Ideas are labelled honestly by their real status.</h1>${section('Projects', v2Projects.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.type)} / ${esc(item.status)}</p><p>${esc(item.summary)}</p><h4>The problem</h4><p>${esc(item.problem)}</p><h4>What I did</h4>${list(item.whatIDid)}<h4>What I learned</h4><p>${esc(item.lesson)}</p><p>${esc(item.note)}</p>${item.detailHref ? `<p><a href="${esc(item.detailHref)}">${esc(item.detailLabel ?? 'View project')}</a></p>` : ''}</article>`).join(''))}`,
  },
  {
    path: '/v2-preview/capital-research',
    title: 'Codie Capital Research | Website V2 Preview | Codie Marillier',
    description: 'A private preview gateway to Codie Marillier’s investment letter, journal entries, portfolio and research process.',
    noindex: true,
    fallback: `<p>Website V2 preview / Project</p><h1>Codie Capital Research</h1>${paragraph('A public record of my real portfolio, the decisions behind it and the lessons that are easier to see when they are written down. Personal research, never personalised investment advice.')}${section('Start with the letter', publishedLetters.map((letter) => `<article><h3>${esc(letter.title)}</h3><p>${esc(letter.date)} / ${esc(letter.readingTime ?? '')}</p><p>${esc(letter.summary)}</p><p><a href="/letters/${esc(letter.slug)}">Read ${esc(letter.title)}</a></p></article>`).join(''))}${section('Monthly portfolio reviews', linkList(portfolioReviews.map((entry) => ({ label: entry.title, href: `/journal/${entry.slug}`, text: `${entry.subtitle ?? entry.date} / ${entry.category}` }))))}${section('Notes and reflections', linkList(standaloneJournalEntries.map((entry) => ({ label: entry.title, href: `/journal/${entry.slug}`, text: `${entry.date} / ${entry.category}` }))))}${section('Explore the record', linkList([{ label: 'Current portfolio', href: '/portfolio', text: 'View the current personal portfolio.' }, { label: 'Investment process', href: '/process', text: 'Read the written process.' }, { label: 'Decision archive', href: '/decision-archive', text: 'Review major decisions.' }, { label: 'Mistakes and lessons', href: '/mistakes-lessons', text: 'Keep difficult lessons visible.' }]))}`,
  },
  {
    path: '/v2-preview/projects/horsebox-conversion',
    title: 'O and C Cotswolds Trailers Ltd | Website V2 Preview | Codie Marillier',
    description: 'A private preview of Codie Marillier’s documented horsebox conversion company and its practical lessons.',
    noindex: true,
    fallback: (() => {
      const project = v2Projects.find((item) => item.slug === 'horsebox-conversion');
      const photographs = v2HorseboxProjectDetails.images.map((image) => `<figure><img src="${esc(image.src)}" srcset="${esc(image.srcSet)}" width="${image.width}" height="${image.height}" alt="${esc(image.alt)}" loading="lazy"><figcaption>${esc(image.caption)}</figcaption></figure>`).join('');
      return `<p>Website V2 preview / Project</p><h1>${esc(v2HorseboxProjectDetails.legalName)}</h1>${project ? paragraph(project.summary) + section('The project', paragraph(project.problem) + paragraph(v2HorseboxProjectDetails.currentUpdate) + list(project.whatIDid) + paragraph(project.note)) + section('Possible uses', list(v2HorseboxProjectDetails.possibleUses)) + section('What it taught me', paragraph(project.lesson)) : ''}${section('Photographs', photographs)}`;
    })(),
  },
  {
    path: '/v2-preview/writing',
    title: 'Writing | Website V2 Preview | Codie Marillier',
    description: 'A private preview gateway to Codie Marillier’s preserved writing and investment archive.',
    noindex: true,
    fallback: `<p>Website V2 preview / Writing</p><h1>Writing turns decisions into something that can be examined later.</h1>${section('Personal research, never personalised advice', paragraph(v2Voice.crypto) + paragraph('Codie Capital Research documents one personal portfolio and one developing process. It is not a fund, investment service or recommendation to copy a trade.') + '<p><a href="/disclaimer">Read the full investing disclaimer</a></p>')}${section('The existing investment record remains intact', paragraph('All existing portfolio data, reviews, letters, book notes, decisions, process pages and disclosures keep their current URLs.') + linkList(v2WritingGateways.map((item) => ({ label: item.title, href: item.href, text: item.text }))))}`,
  },
  {
    path: '/v2-preview/travel',
    title: 'Travel | Website V2 Preview | Codie Marillier',
    description: 'A private preview of travel stories focused on people and perspective.',
    noindex: true,
    fallback: `<p>Website V2 preview / Travel</p><h1>The people connected to a place often become the place.</h1>${section(`${v2TravelStory.country}: ${v2TravelStory.title}`, `<figure><img src="${esc(v2TravelImages.cambodia.src)}" srcset="${esc(v2TravelImages.cambodia.srcSet)}" width="${v2TravelImages.cambodia.width}" height="${v2TravelImages.cambodia.height}" alt="${esc(v2TravelImages.cambodia.alt)}"><figcaption>${esc(v2TravelImages.cambodia.caption)}</figcaption></figure>` + paragraph(v2TravelStory.summary) + paragraph(v2TravelStory.reflection))}${section('France and Monaco', [v2TravelImages.franceMarina, v2TravelImages.franceYachtWork, v2TravelImages.monaco].map((image) => `<figure><img src="${esc(image.src)}" srcset="${esc(image.srcSet)}" width="${image.width}" height="${image.height}" alt="${esc(image.alt)}" loading="lazy"><figcaption>${esc(image.caption)}</figcaption></figure>`).join(''))}${paragraph('Exact country counts and dates remain unpublished until verified.')}`,
  },
  {
    path: '/v2-preview/now',
    title: 'Now | Website V2 Preview | Codie Marillier',
    description: 'A private preview of Codie Marillier’s current work, learning and priorities.',
    noindex: true,
    fallback: `<p>Website V2 preview / Now</p><h1>A concise record of the current chapter.</h1><p><strong>Location:</strong> ${esc(v2Now.location)}</p><p><strong>Work:</strong> ${esc(v2Now.work)}</p><p><strong>Building:</strong> ${esc(v2Now.building.join(', '))}</p><p><strong>Learning:</strong> ${esc(v2Now.learning.join(', '))}</p>${section('Principles', v2Principles.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join(''))}`,
  },
];

for (const route of routes) {
  await writeRoute(route);
}

for (const route of publicRouteManifest) {
  for (const alias of route.legacyAliases ?? []) {
    await writeRedirectRoute({
      path: alias,
      target: route.path,
      title: `Redirecting to ${route.title}`,
    });
  }
}

for (const [slug, target] of Object.entries(legacyJournalRedirects)) {
  await writeRedirectRoute({
    path: `/journal/${slug}`,
    target,
    title: 'Redirecting to the new monthly portfolio review',
  });
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

for (const book of readingDevelopment) {
  await writeRoute({
    path: `/books/${book.slug}`,
    title: `${book.title} | Books | Codie Capital Research`,
    description: book.takeaway,
    pageType: 'Article',
    fallback: `
      <p>${esc(book.author)} / ${esc(book.category)}</p>
      <h1>${esc(book.title)}</h1>
      ${section('Main Takeaway', paragraph(book.takeaway))}
      ${section('Book Reflection', textBlock(book.paragraphs))}
      ${book.closingQuestion ? section('The Question', paragraph(book.closingQuestion)) : ''}
      ${section('Back Link', '<p><a href="/books">Back to Books</a></p>')}
    `,
  });
}

await writeFile(
  `${outputRoot}/404.html`,
  routeHtml({
    path: '/404',
    title: 'Page Not Found | Codie Capital Research',
    description: 'The requested page could not be found on Codie Capital Research.',
    noindex: true,
    fallback: `
      <p>404</p>
      <h1>Page Not Found</h1>
      ${paragraph('The page you requested could not be found. Use the links below to return to the main public archive.')}
      ${section('Useful Links', list(['/', '/portfolio', '/journal', '/letters', '/books', '/process', '/about', '/disclaimer', '/ai/index.html']))}
    `,
  }),
);

console.log(`Generated static public route HTML in ${outputRoot}`);
