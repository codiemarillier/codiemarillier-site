import { build } from 'esbuild';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const tempRoot = join(tmpdir(), `codie-content-validation-${process.pid}-${Date.now()}`);

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function assertUnique(items, label) {
  const duplicates = items.filter((item, index) => items.indexOf(item) !== index);
  invariant(duplicates.length === 0, `${label} contains duplicates: ${Array.from(new Set(duplicates)).join(', ')}`);
}

function publicAssetExists(assetPath) {
  return existsSync(join('public', assetPath.replace(/^\//, '')));
}

try {
  await build({
    entryPoints: {
      siteData: 'src/data/siteData.ts',
      performance: 'src/data/portfolioPerformance.generated.ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    outdir: tempRoot,
    logLevel: 'silent',
  });

  const data = await import(pathToFileURL(join(tempRoot, 'siteData.js')).href);
  const { portfolioPerformance } = await import(pathToFileURL(join(tempRoot, 'performance.js')).href);

  assertUnique(data.publicRouteManifest.map((route) => route.path), 'Route manifest');
  assertUnique(data.journalEntries.map((entry) => entry.slug), 'Journal slugs');
  assertUnique(data.plannedLetters.map((entry) => entry.slug), 'Letter slugs');
  assertUnique(data.readingDevelopment.map((entry) => entry.slug), 'Book slugs');
  assertUnique(data.holdings.map((holding) => holding.ticker), 'Holding tickers');
  assertUnique(data.v2WorkStories.map((story) => story.slug), 'V2 work slugs');
  assertUnique(data.v2FeaturedWorkStories.map((story) => story.slug), 'Featured V2 work slugs');
  assertUnique(data.v2Projects.map((project) => project.slug), 'V2 project slugs');

  invariant(data.v2Identity.name === data.siteIdentity.personName, 'V2 identity must use the canonical person name');
  invariant(data.v2Navigation.every((item) => item.href.startsWith('/v2-preview/')), 'V2 preview navigation must remain inside the isolated preview route tree');
  assertUnique(data.v2Navigation.map((item) => item.href), 'V2 navigation routes');
  const manifestPaths = new Set(data.publicRouteManifest.map((route) => route.path));
  const previewRoutes = data.publicRouteManifest.filter((route) => route.path === '/v2-preview' || route.path.startsWith('/v2-preview/'));
  invariant(previewRoutes.every((route) => !route.indexable && !route.sitemap), 'Every V2 preview route must remain noindex and excluded from the sitemap');
  for (const item of data.v2Navigation) {
    invariant(manifestPaths.has(item.href), `V2 navigation route is missing from the route manifest: ${item.href}`);
  }
  const workSlugs = new Set(data.v2WorkStories.map((story) => story.slug));
  invariant(data.v2FeaturedWorkStories.every((story) => workSlugs.has(story.slug)), 'Featured work must reference preserved V2 work records');
  invariant(!data.v2FeaturedWorkStories.some((story) => story.slug === 'marquee-work'), 'Marquee work must remain preserved but hidden from the current V2 edit');
  invariant(/^\S+@\S+\.\S+$/.test(data.v2Contact.email), 'V2 contact email must be structurally valid');
  invariant(data.v2Contact.instagramHandle.startsWith('@'), 'V2 Instagram handle must retain its @ prefix');
  invariant(data.v2Contact.instagramUrl.startsWith('https://www.instagram.com/'), 'V2 Instagram URL must use the expected HTTPS origin');
  invariant(data.v2Contact.approvedForPreview === true, 'V2 contact details must not render without explicit preview approval');
  for (const project of data.v2Projects.filter((item) => item.verification === 'requires confirmation')) {
    invariant(/confirm|withheld|unpublished/i.test(`${project.status} ${project.note}`), `Unverified V2 project must expose its confirmation state: ${project.slug}`);
  }
  for (const project of data.v2Projects) {
    invariant(project.problem.length > 20, `V2 project is missing a meaningful problem statement: ${project.slug}`);
    invariant(project.whatIDid.length > 0, `V2 project is missing documented actions: ${project.slug}`);
    invariant(project.lesson.length > 20, `V2 project is missing a meaningful lesson: ${project.slug}`);
    if (project.detailHref) {
      invariant(manifestPaths.has(project.detailHref), `V2 project detail route is missing from the route manifest: ${project.detailHref}`);
      invariant(Boolean(project.detailLabel), `V2 project detail route is missing a link label: ${project.slug}`);
    }
  }
  const horseboxProject = data.v2Projects.find((project) => project.slug === 'horsebox-conversion');
  invariant(horseboxProject?.title === data.v2HorseboxProjectDetails.legalName, 'Horsebox project title must match the confirmed legal name');
  invariant(data.v2HorseboxProjectDetails.images.length === 4, 'Horsebox gallery must contain the four supplied photographs');
  for (const image of data.v2HorseboxProjectDetails.images) {
    invariant(publicAssetExists(image.src), `Horsebox gallery references missing image: ${image.src}`);
    invariant(image.alt.length > 20, `Horsebox gallery image needs meaningful alt text: ${image.src}`);
    invariant(image.caption.length > 10, `Horsebox gallery image needs a caption: ${image.src}`);
    invariant(image.width > 0 && image.height > 0, `Horsebox gallery image needs intrinsic dimensions: ${image.src}`);
    for (const candidate of image.srcSet.split(',').map((item) => item.trim().split(/\s+/)[0])) {
      invariant(publicAssetExists(candidate), `Horsebox gallery srcSet references missing image: ${candidate}`);
    }
  }
  const travelImages = Object.values(data.v2TravelImages);
  invariant(travelImages.length === 4, 'V2 travel photography must contain the four supplied photographs');
  for (const image of travelImages) {
    invariant(publicAssetExists(image.src), `V2 travel photography references missing image: ${image.src}`);
    invariant(image.alt.length > 20, `V2 travel image needs meaningful alt text: ${image.src}`);
    invariant(image.caption.length > 5, `V2 travel image needs a caption: ${image.src}`);
    invariant(image.width > 0 && image.height > 0, `V2 travel image needs intrinsic dimensions: ${image.src}`);
    for (const candidate of image.srcSet.split(',').map((item) => item.trim().split(/\s+/)[0])) {
      invariant(publicAssetExists(candidate), `V2 travel image srcSet references missing image: ${candidate}`);
    }
  }

  const journalSlugs = new Set(data.journalEntries.map((entry) => entry.slug));
  const monthlyReviews = data.journalEntries.filter((entry) => entry.category === 'Monthly Reviews');
  invariant(monthlyReviews.length === 5, 'The public journal must contain exactly five monthly portfolio reviews');
  invariant(
    monthlyReviews.map((entry) => entry.slug).join(',') ===
      'capital-research-review-05,capital-research-review-04,capital-research-review-03,capital-research-review-02,capital-research-review-01',
    'The public journal must keep monthly portfolio reviews in newest-first order',
  );
  invariant(
    !data.journalEntries.some((entry) => ['Weekly Reviews', 'Fortnightly Reviews'].includes(entry.category)),
    'Legacy weekly and fortnightly reviews must not appear in the public journal collection',
  );
  invariant(Object.keys(data.legacyJournalRedirects).length === 17, 'All 17 retired weekly/fortnightly routes must retain redirects');
  for (const destination of Object.values(data.legacyJournalRedirects)) {
    invariant(destination === '/journal' || journalSlugs.has(destination.split('/').pop()), `Legacy journal redirect has an invalid destination: ${destination}`);
  }
  for (const change of data.portfolioChangeLog) {
    if (change.relatedSlug) {
      invariant(journalSlugs.has(change.relatedSlug), `Change log references missing journal slug: ${change.relatedSlug}`);
    }
  }

  invariant(
    data.journalEntries.every((entry) => !entry.documentUrl && !entry.documentPdfUrl && !entry.documentPages?.length),
    'Public journal entries must not link to retired balance-bearing document downloads',
  );

  for (const book of data.readingDevelopment) {
    invariant(publicAssetExists(book.image), `Book ${book.slug} references missing image: ${book.image}`);
  }

  const currentMicrosoft = data.holdings.find((holding) => holding.ticker === 'MSFT');
  invariant(currentMicrosoft && !/^closed/i.test(currentMicrosoft.status), 'Microsoft must reflect the evidenced 8 July current holding');

  const currentHoldings = data.holdings.filter((holding) => holding.status === 'Current holding');
  invariant(currentHoldings.every((holding) => Number.isInteger(holding.portfolioWeight)), 'Public allocation weights must be whole percentages');
  invariant(currentHoldings.reduce((sum, holding) => sum + holding.portfolioWeight, 0) === 100, 'Rounded current allocation weights must sum to 100%');
  invariant(currentHoldings.every((holding) => holding.whyOwned && holding.role && holding.decision && holding.lastReviewed), 'Every current holding needs a public research record');

  const summary = portfolioPerformance.summary;
  invariant(!('portfolioValue' in summary) && !('cash' in summary) && !('startingValue' in summary), 'Generated performance summary must not expose absolute values');
  invariant(Math.abs(summary.portfolioReturn - data.currentPortfolio.measuredPerformance.portfolioReturn) < 0.005, 'Measured portfolio return does not match the central portfolio record');
  invariant(Math.abs(summary.benchmarkReturn - data.currentPortfolio.measuredPerformance.benchmarkReturn) < 0.005, 'Measured benchmark return does not match the central portfolio record');
  invariant(Math.abs(summary.relativeReturn - data.currentPortfolio.measuredPerformance.relativeReturn) < 0.005, 'Measured relative return does not match the central portfolio record');
  invariant(Math.abs(summary.maxDrawdown - data.currentPortfolio.measuredPerformance.maxDrawdown) < 0.005, 'Measured drawdown does not match the central portfolio record');
  invariant(data.portfolioSnapshot.asOfDate === data.currentPortfolio.latestReview.allocationAsOf, 'Latest public allocation date must come from the central portfolio record');

  console.log(
    `Content validation passed: ${data.publicRouteManifest.length} routes, ${data.journalEntries.length} journal entries, ${data.readingDevelopment.length} books, ${data.holdings.length} holding records.`,
  );
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
