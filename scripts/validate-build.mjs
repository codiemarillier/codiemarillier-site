import { build } from 'esbuild';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

const outputRoot = process.argv[2] || 'dist';
const tempModule = join(tmpdir(), `codie-build-validation-${process.pid}-${Date.now()}.mjs`);

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function routeTargetExists(route) {
  if (route === '/') return existsSync(join(outputRoot, 'index.html'));
  const relative = route.replace(/^\//, '');
  return (
    existsSync(join(outputRoot, relative)) ||
    existsSync(join(outputRoot, relative, 'index.html')) ||
    existsSync(join(outputRoot, `${relative}.html`))
  );
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

try {
  await build({
    entryPoints: ['src/data/siteData.ts'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: tempModule,
    logLevel: 'silent',
  });

  const data = await import(pathToFileURL(tempModule).href);
  const sitemap = readFileSync(join(outputRoot, 'sitemap.xml'), 'utf8');
  const rootHtml = readFileSync(join(outputRoot, 'index.html'), 'utf8');
  const listedRoutes = new Set(
    Array.from(sitemap.matchAll(/<loc>https:\/\/codiemarillier\.com([^<]*)<\/loc>/g), (match) => match[1] || '/'),
  );

  const canonicalRoutes = [
    ...data.publicRouteManifest.filter((route) => route.sitemap).map((route) => route.path),
    ...data.journalEntries.map((entry) => `/journal/${entry.slug}`),
    ...data.plannedLetters.filter((letter) => letter.body?.length).map((letter) => `/letters/${letter.slug}`),
    ...data.readingDevelopment.map((book) => `/books/${book.slug}`),
  ];

  for (const route of canonicalRoutes) {
    invariant(listedRoutes.has(route), `Canonical route is missing from sitemap: ${route}`);
    invariant(routeTargetExists(route), `Canonical route has no generated target: ${route}`);
  }

  for (const route of data.publicRouteManifest) {
    if (route.staticPage) {
      const target = route.path === '/404' ? '/404.html' : route.path;
      invariant(routeTargetExists(target), `Static manifest route has no generated target: ${route.path}`);

      const targetFile = route.path === '/404'
        ? join(outputRoot, '404.html')
        : route.path === '/'
          ? join(outputRoot, 'index.html')
          : join(outputRoot, route.path.replace(/^\//, ''), 'index.html');
      const html = readFileSync(targetFile, 'utf8');
      if (!route.indexable) {
        invariant(/<meta name="robots" content="noindex, follow" \/>/.test(html), `Non-indexable route is missing noindex: ${route.path}`);
      }
    }

    for (const alias of route.legacyAliases ?? []) {
      invariant(routeTargetExists(alias), `Legacy alias has no generated redirect target: ${alias}`);
    }
  }

  const missingReferences = [];
  for (const file of walk(outputRoot).filter((file) => file.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const reference = match[1].split(/[?#]/)[0];
      if (!reference.startsWith('/') || reference.startsWith('//')) continue;
      if (!routeTargetExists(reference)) missingReferences.push(`${file}: ${reference}`);
    }
  }

  invariant(missingReferences.length === 0, `Generated HTML has missing internal targets:\n${missingReferences.join('\n')}`);

  const moduleReference = rootHtml.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1];
  const stylesheetReference = rootHtml.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/)?.[1];
  invariant(moduleReference, 'Built root HTML is missing the application module');
  invariant(stylesheetReference, 'Built root HTML is missing the application stylesheet');

  const assetBuffer = (reference) => readFileSync(join(outputRoot, reference.replace(/^\//, '')));
  const moduleGzip = gzipSync(assetBuffer(moduleReference)).length;
  const stylesheetGzip = gzipSync(assetBuffer(stylesheetReference)).length;
  invariant(moduleGzip <= 70 * 1024, `Initial application JavaScript exceeds the 70 KiB gzip budget: ${(moduleGzip / 1024).toFixed(2)} KiB`);
  invariant(stylesheetGzip <= 12 * 1024, `Application CSS exceeds the 12 KiB gzip budget: ${(stylesheetGzip / 1024).toFixed(2)} KiB`);

  const siteDataAsset = readdirSync(join(outputRoot, 'assets')).find((file) => /^siteData-.*\.js$/.test(file));
  invariant(siteDataAsset, 'The long-form site-data chunk is missing');
  const siteDataGzip = gzipSync(readFileSync(join(outputRoot, 'assets', siteDataAsset))).length;
  invariant(siteDataGzip <= 45 * 1024, `Long-form site data exceeds the 45 KiB gzip budget: ${(siteDataGzip / 1024).toFixed(2)} KiB`);

  console.log(`Build validation passed: ${canonicalRoutes.length} canonical routes, ${data.publicRouteManifest.filter((route) => route.staticPage).length} static manifest routes, all generated internal targets resolved, and gzip budgets met (${(moduleGzip / 1024).toFixed(2)} KiB JS / ${(stylesheetGzip / 1024).toFixed(2)} KiB CSS / ${(siteDataGzip / 1024).toFixed(2)} KiB site data).`);
} finally {
  await rm(tempModule, { force: true });
}
