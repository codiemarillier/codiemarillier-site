import { currentPortfolio } from '../data/currentPortfolio';

const stats = [
  ['Since inception', `+${currentPortfolio.latestReview.sinceInceptionReturn.toFixed(2)}%`],
  ['Cash allocation', `${currentPortfolio.latestReview.cashWeight.toFixed(0)}%`],
  ['Largest allocation', `${currentPortfolio.holdings[0].portfolioWeight}%`],
  ['Started', currentPortfolio.started],
  ['Last reviewed', currentPortfolio.latestReview.published],
];

export default function PortfolioSnapshot() {
  return (
    <section className="border-y border-line">
      <div className="grid divide-y divide-line md:grid-cols-5 md:divide-x md:divide-y-0">
        {stats.map(([label, value]) => (
          <div key={label} className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">{label}</p>
            <p className={`mt-3 font-serif text-2xl font-semibold leading-tight md:text-3xl ${label === 'Since inception' ? 'text-positive' : 'text-charcoal'}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 border-t border-line p-6 text-sm leading-7 text-slateText md:grid-cols-3">
        <p>
          <strong className="text-charcoal">Latest published review:</strong> {currentPortfolio.latestReview.label} / {currentPortfolio.latestReview.published}
        </p>
        <p>
          <strong className="text-charcoal">Latest decision:</strong> {currentPortfolio.latestReview.latestDecision}
        </p>
        <p>
          <strong className="text-charcoal">Publication rule:</strong> Performance and allocation are public; balances and share quantities are private.
        </p>
      </div>
      <p className="border-t border-line px-6 py-4 text-xs leading-6 text-slateText">
        <strong className="text-charcoal">Allocation basis:</strong> {currentPortfolio.allocationBasis}
      </p>
    </section>
  );
}
