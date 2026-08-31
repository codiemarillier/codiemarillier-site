import { useState } from 'react';
import { currentPortfolio } from '../data/currentPortfolio';
import { portfolioPerformance } from '../data/portfolioPerformance.generated';

const chart = { width: 760, height: 330, padding: { top: 28, right: 28, bottom: 52, left: 68 } };
const pct = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
type Props = { variant?: 'card' | 'blend' };

export default function PortfolioValueChart({ variant = 'card' }: Props) {
  const [frequency, setFrequency] = useState<'weekly' | 'daily'>('weekly');
  const data = portfolioPerformance[frequency];
  const summary = currentPortfolio.measuredPerformance;
  const all = data.flatMap((point) => [point.portfolioReturn, point.benchmarkReturn, 0]);
  const min = Math.floor(Math.min(...all) - 1);
  const max = Math.ceil(Math.max(...all) + 1);
  const innerWidth = chart.width - chart.padding.left - chart.padding.right;
  const innerHeight = chart.height - chart.padding.top - chart.padding.bottom;
  const x = (index: number) => chart.padding.left + (index / (data.length - 1)) * innerWidth;
  const y = (value: number) => chart.padding.top + ((max - value) / (max - min)) * innerHeight;
  const path = (key: 'portfolioReturn' | 'benchmarkReturn') =>
    data.map((point, index) => `${index ? 'L' : 'M'} ${x(index).toFixed(1)} ${y(point[key]).toFixed(1)}`).join(' ');
  const ticks = [0, Math.floor((data.length - 1) / 2), data.length - 1];
  const latest = data[data.length - 1];
  const date = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const shell = variant === 'blend' ? 'border-y border-line' : 'border border-line bg-paper shadow-editorial';

  return (
    <section className={shell} data-chart="portfolio-benchmark-history">
      <div className={`grid gap-6 border-b border-line md:grid-cols-[1fr_auto] md:items-end ${variant === 'blend' ? 'py-6' : 'p-6 md:p-8'}`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">Measured performance</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-4xl">Portfolio versus the S&amp;P 500.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slateText">
            Percentage returns reconstructed from the private transaction record and historical closing prices. VUAG is used as a GBP accumulating S&amp;P 500 proxy. No account balance is published.
          </p>
        </div>
        <div className="inline-flex self-start border border-line bg-mist p-1" role="group" aria-label="Chart frequency">
          {(['weekly', 'daily'] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={frequency === item}
              onClick={() => setFrequency(item)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${frequency === item ? 'bg-paper text-navy shadow-sm' : 'text-slateText'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={variant === 'blend' ? 'py-5' : 'p-4 md:p-6'}>
        <div className="mb-2 flex flex-wrap gap-5 text-xs font-semibold">
          <span className="text-positive">— Portfolio {pct(summary.portfolioReturn)}</span>
          <span className="text-link">— S&amp;P 500 proxy {pct(summary.benchmarkReturn)}</span>
        </div>
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role="img"
          aria-label={`Portfolio return ${pct(latest.portfolioReturn)}; S&P 500 benchmark return ${pct(latest.benchmarkReturn)}`}
        >
          {[min, (min + max) / 2, max].map((tick) => (
            <g key={tick}>
              <line x1={chart.padding.left} x2={chart.width - chart.padding.right} y1={y(tick)} y2={y(tick)} stroke="#DDE3E8" strokeDasharray="4 6" />
              <text x={chart.padding.left - 10} y={y(tick) + 4} textAnchor="end" className="fill-slateText text-[12px]">
                {`${tick.toFixed(0)}%`}
              </text>
            </g>
          ))}
          <line x1={chart.padding.left} x2={chart.width - chart.padding.right} y1={y(0)} y2={y(0)} stroke="#B08D3A" strokeDasharray="3 5" />
          <path d={path('benchmarkReturn')} fill="none" stroke="#2F5FA7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={path('portfolioReturn')} fill="none" stroke="#137A5A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {ticks.map((index) => (
            <text
              key={index}
              x={x(index)}
              y={chart.height - 16}
              textAnchor={index === 0 ? 'start' : index === data.length - 1 ? 'end' : 'middle'}
              className="fill-slateText text-[12px] font-semibold"
            >
              {date(data[index].date)}
            </text>
          ))}
        </svg>
        <details className="mt-4 border-t border-line pt-4 text-sm text-slateText">
          <summary className="cursor-pointer font-semibold text-charcoal">View chart data</summary>
          <div className="mt-4 max-h-72 overflow-auto border border-line">
            <table className="w-full min-w-[520px] border-collapse text-left text-xs">
              <caption className="sr-only">Percentage performance data used in the chart</caption>
              <thead className="sticky top-0 bg-charcoal text-paper">
                <tr><th className="px-3 py-2">Date</th><th className="px-3 py-2">Portfolio</th><th className="px-3 py-2">S&amp;P 500 proxy</th></tr>
              </thead>
              <tbody>
                {data.map((point) => (
                  <tr key={point.date} className="border-t border-line">
                    <th scope="row" className="px-3 py-2 font-semibold text-charcoal">{point.date}</th>
                    <td className="px-3 py-2">{pct(point.portfolioReturn)}</td>
                    <td className="px-3 py-2">{pct(point.benchmarkReturn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-5">
        {[
          ['Since inception', pct(summary.portfolioReturn), summary.portfolioReturn >= 0 ? 'text-positive' : 'text-negative'],
          ['S&P 500 / benchmark', pct(summary.benchmarkReturn), 'text-link'],
          ['Relative performance', `${summary.relativeReturn >= 0 ? '+' : ''}${summary.relativeReturn.toFixed(2)} pp`, summary.relativeReturn >= 0 ? 'text-positive' : 'text-negative'],
          ['Maximum drawdown', pct(summary.maxDrawdown), 'text-negative'],
          ['Started', currentPortfolio.started, 'text-charcoal'],
        ].map(([label, value, colour]) => (
          <div key={label} className="bg-paper p-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slateText">{label}</p>
            <p className={`mt-2 font-serif text-2xl font-semibold ${colour}`}>{value}</p>
          </div>
        ))}
      </div>
      <p className="border-t border-line px-5 py-3 text-xs leading-5 text-slateText">
        Measured series through {summary.asOf}. The later {currentPortfolio.latestReview.published} review is the current allocation record and is shown separately because it uses a different valuation basis.
      </p>
    </section>
  );
}
