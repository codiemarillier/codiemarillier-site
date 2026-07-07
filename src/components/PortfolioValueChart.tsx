import { portfolioSnapshot, portfolioValueHistory } from '../data/siteData';

const chart = {
  width: 760,
  height: 320,
  padding: {
    top: 34,
    right: 34,
    bottom: 54,
    left: 68,
  },
};

const startingValue = 1999;
const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function getRange(values: number[]) {
  const rawMin = Math.min(...values, startingValue);
  const rawMax = Math.max(...values, startingValue);
  const min = Math.floor((rawMin - 25) / 25) * 25;
  const max = Math.ceil((rawMax + 25) / 25) * 25;

  return { min, max };
}

type PortfolioValueChartProps = {
  variant?: 'card' | 'blend';
};

export default function PortfolioValueChart({ variant = 'card' }: PortfolioValueChartProps) {
  const isBlend = variant === 'blend';
  const values = portfolioValueHistory.map((point) => point.value);
  const { min, max } = getRange(values);
  const minWeek = Math.min(...portfolioValueHistory.map((point) => point.week));
  const maxWeek = Math.max(...portfolioValueHistory.map((point) => point.week));
  const innerWidth = chart.width - chart.padding.left - chart.padding.right;
  const innerHeight = chart.height - chart.padding.top - chart.padding.bottom;

  const x = (week: number) => chart.padding.left + ((week - minWeek) / (maxWeek - minWeek)) * innerWidth;
  const y = (value: number) => chart.padding.top + ((max - value) / (max - min)) * innerHeight;
  const path = portfolioValueHistory
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(point.week).toFixed(2)} ${y(point.value).toFixed(2)}`)
    .join(' ');
  const fillPath = `${path} L ${x(maxWeek).toFixed(2)} ${y(min).toFixed(2)} L ${x(minWeek).toFixed(2)} ${y(min).toFixed(2)} Z`;
  const baselineY = y(startingValue);
  const latestPoint = portfolioValueHistory[portfolioValueHistory.length - 1];
  const highestPoint = portfolioValueHistory.reduce((best, point) => (point.value > best.value ? point : best), portfolioValueHistory[0]);
  const lowestPoint = portfolioValueHistory.reduce((low, point) => (point.value < low.value ? point : low), portfolioValueHistory[0]);
  const latestChange = latestPoint.value - startingValue;
  const yTicks = [min, Math.round((min + max) / 2), max];
  const xTicks = portfolioValueHistory.filter((point) => [1, 4, 8, 12, 16, 18].includes(point.week));
  const headerStatsClassName = isBlend
    ? 'grid gap-4 sm:grid-cols-3 md:text-right'
    : 'grid gap-px border border-line bg-line text-center sm:grid-cols-3';
  const headerStatClassName = isBlend ? 'min-w-0 border-l-2 border-gold/60 pl-4' : 'min-w-0 bg-ivory px-3 py-3';
  const footerStatsClassName = isBlend
    ? 'grid gap-5 border-t border-line py-5 md:grid-cols-3'
    : 'grid gap-px border-t border-line bg-line md:grid-cols-3';
  const footerStatClassName = isBlend ? 'border-l border-line pl-4' : 'bg-ivory p-5';

  return (
    <section
      className={isBlend ? 'border-y border-line' : 'border border-line bg-paper shadow-editorial'}
      data-chart="portfolio-value-history"
    >
      <div
        className={`grid gap-6 border-b border-line md:grid-cols-[1fr_auto] md:items-end ${
          isBlend ? 'py-6' : 'p-6 md:p-8'
        }`}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Portfolio value over time</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
            Account value since the portfolio started.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slateText">
            Manual account values from the published portfolio reviews. Approximate periods are plotted using the
            rounded value shown in the journal.
          </p>
        </div>
        <div className={headerStatsClassName}>
          {[
            ['Latest', latestPoint.valueLabel],
            ['High', `${highestPoint.label} / ${highestPoint.valueLabel}`],
            ['Low', `${lowestPoint.label} / ${lowestPoint.valueLabel}`],
          ].map(([label, value]) => (
            <div key={label} className={headerStatClassName}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">{label}</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-charcoal">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={isBlend ? 'py-4 md:py-6' : 'p-4 md:p-6'}>
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role="img"
          aria-labelledby="portfolio-value-chart-title portfolio-value-chart-description"
        >
          <title id="portfolio-value-chart-title">Portfolio value chart from Week 1 to Week 18</title>
          <desc id="portfolio-value-chart-description">
            Line chart showing the account moving from the starting baseline around 1999 pounds, down to a low around
            1860 pounds, up to a high of 2055 pounds in Week 15, and to 2008 pounds in Week 18.
          </desc>
          <defs>
            <linearGradient id="portfolioValueArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1f3a2f" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#1f3a2f" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={chart.padding.left}
                x2={chart.width - chart.padding.right}
                y1={y(tick)}
                y2={y(tick)}
                stroke="#d8d0c0"
                strokeDasharray="4 6"
              />
              <text x={chart.padding.left - 12} y={y(tick) + 4} textAnchor="end" className="fill-slateText text-[13px]">
                {formatCurrency(tick)}
              </text>
            </g>
          ))}

          <line
            x1={chart.padding.left}
            x2={chart.width - chart.padding.right}
            y1={baselineY}
            y2={baselineY}
            stroke="#9a7a2f"
            strokeWidth="2"
          />
          <text
            x={chart.width - chart.padding.right}
            y={baselineY - 8}
            textAnchor="end"
            className="fill-[#7f642d] text-[13px] font-semibold"
          >
            Starting value {portfolioSnapshot.startingCostBasis}
          </text>

          <path d={fillPath} fill="url(#portfolioValueArea)" />
          <path d={path} fill="none" stroke="#1f3a2f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />

          {portfolioValueHistory.map((point) => (
            <g key={point.label}>
              <circle cx={x(point.week)} cy={y(point.value)} r="5.5" fill="#fffaf0" stroke="#1f3a2f" strokeWidth="3">
                <title>{`${point.label}: ${point.valueLabel}`}</title>
              </circle>
            </g>
          ))}

          {xTicks.map((tick) => (
            <text
              key={tick.label}
              x={x(tick.week)}
              y={chart.height - 18}
              textAnchor="middle"
              className="fill-slateText text-[13px] font-semibold"
            >
              {tick.label}
            </text>
          ))}
        </svg>
      </div>

      <div className={footerStatsClassName}>
        <div className={footerStatClassName}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Change from start</p>
          <p className="mt-2 font-serif text-2xl font-semibold text-charcoal">
            {latestChange >= 0 ? '+' : ''}
            {formatCurrency(latestChange)}
          </p>
        </div>
        <div className={footerStatClassName}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Latest plotted value</p>
          <p className="mt-2 font-serif text-2xl font-semibold text-charcoal">{latestPoint.valueLabel}</p>
        </div>
        <div className={footerStatClassName}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Source</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-charcoal">Published portfolio reviews</p>
        </div>
      </div>
    </section>
  );
}
