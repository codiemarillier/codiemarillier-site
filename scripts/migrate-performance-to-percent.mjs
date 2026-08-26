import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const [, , gitObject, outputPath, privateBaselineText] = process.argv;

if (!gitObject || !outputPath || !privateBaselineText) {
  throw new Error('Usage: node scripts/migrate-performance-to-percent.mjs <git-object> <output> <private-baseline>');
}

const privateBaseline = Number(privateBaselineText);
if (!Number.isFinite(privateBaseline) || privateBaseline <= 0) {
  throw new Error('The private baseline must be a positive number.');
}

const source = execFileSync('git', ['show', gitObject], { encoding: 'utf8' });
const match = source.match(/portfolioPerformance\s*=\s*(\{.*\})\s+as const;/s);
if (!match) throw new Error(`Could not find the generated payload in ${gitObject}`);

const legacy = JSON.parse(match[1]);
const normalise = (point) => ({
  date: point.date,
  portfolioReturn: Number((((point.portfolio / privateBaseline) - 1) * 100).toFixed(2)),
  benchmarkReturn: Number((((point.benchmark / privateBaseline) - 1) * 100).toFixed(2)),
});
const daily = legacy.daily.map(normalise);
const weekly = legacy.weekly.map(normalise);
const latest = daily.at(-1);
const payload = {
  daily,
  weekly,
  summary: {
    asOf: legacy.summary.asOf,
    portfolioReturn: legacy.summary.portfolioReturn,
    benchmarkReturn: legacy.summary.benchmarkReturn,
    relativeReturn: legacy.summary.relativeReturn,
    maxDrawdown: legacy.summary.maxDrawdown,
  },
};

writeFileSync(
  outputPath,
  `// Generated public derivative; percentage-only data.\nexport const portfolioPerformance = ${JSON.stringify(payload)} as const;\n`,
  'utf8',
);
