import { latestPortfolioReview, portfolioSnapshot } from '../data/siteData';

const stats = [
  ['Current account value', portfolioSnapshot.accountValue],
  ['Starting value', portfolioSnapshot.startingCostBasis],
  ['Current return', portfolioSnapshot.currentReturn],
  ['Cash', portfolioSnapshot.cashBalance],
  ['Weekly move', portfolioSnapshot.weeklyMove],
];

export default function PortfolioSnapshot() {
  return (
    <section className="border border-line bg-paper">
      <div className="grid divide-y divide-line md:grid-cols-5 md:divide-x md:divide-y-0">
        {stats.map(([label, value]) => (
          <div key={label} className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
            <p className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal md:text-3xl">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 border-t border-line p-6 text-sm leading-7 text-slateText md:grid-cols-3">
        <p>
          <strong className="text-charcoal">Last updated:</strong> {latestPortfolioReview.label} / {latestPortfolioReview.date}
        </p>
        <p>
          <strong className="text-charcoal">Main new trade:</strong> {latestPortfolioReview.mainNewTrade}
        </p>
        <p>
          <strong className="text-charcoal">Positioning note:</strong> Manual record only, not a recommendation or model portfolio.
        </p>
      </div>
      <p className="border-t border-line bg-ivory px-6 py-4 text-xs leading-6 text-slateText">
        {portfolioSnapshot.updateNote}
      </p>
    </section>
  );
}
