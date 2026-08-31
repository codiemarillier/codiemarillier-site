import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const target = resolve(process.argv[2] || '.');
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.py', '.svg', '.ts', '.tsx', '.txt', '.xml']);
const ignoredDirectories = new Set(['.git', 'node_modules', '.vite', 'dist']);
const ignoredFiles = new Set([
  'scripts/import-monthly-portfolio-reviews.py',
  'scripts/migrate-performance-to-percent.mjs',
  'scripts/validate-privacy.mjs',
]);

function walk(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    return walk(join(path, entry.name));
  });
}

const failures = [];
for (const file of walk(target)) {
  const path = relative(process.cwd(), file).replaceAll('\\', '/');
  if (!textExtensions.has(extname(file)) || ignoredFiles.has(path)) continue;

  const text = readFileSync(file, 'utf8');
  const scrubbed = text
    .replaceAll('£57.21', '')
    .replaceAll('£38.08', '')
    .replaceAll('$359.90', '')
    .replaceAll('$360', '')
    .replaceAll('$365', '')
    .replaceAll('$21,000', '')
    .replaceAll('$500,000', '');

  const checks = [
    [/trading\s*212/i, 'broker brand'],
    [/[£]\s?\d/, 'personal sterling amount'],
    [/\$(?:500(?!,000)|1,500|10)(?:\D|$)/, 'personal dollar amount'],
    [/\b(?:bought|sold|holding|position)\s+(?:\d+(?:\.\d+)?|one|two|three|four|five)\s+shares?\b/i, 'exact share quantity'],
    [/\b(?:positionSize|transactionNote|startingCostBasis|cashBalance|accountValue)\b/, 'private ledger field'],
  ];

  for (const [pattern, label] of checks) {
    if (pattern.test(scrubbed)) failures.push(`${path}: ${label}`);
  }
}

if (failures.length) {
  throw new Error(`Privacy validation failed:\n${failures.join('\n')}`);
}

console.log(`Privacy validation passed for ${target}`);
