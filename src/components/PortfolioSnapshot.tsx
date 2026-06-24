import { portfolioSnapshot } from '../data/siteData';

const stats = [
  ['Current account value', portfolioSnapshot.accountValue],
  ['Starting value', portfolioSnapshot.startingCostBasis],
  ['Current return', portfolioSnapshot.currentReturn],
  ['Cash', portfolioSnapshot.cashBalance],
  ['Investments', portfolioSnapshot.investments],
  ['Cash %', 'About 2.0%'],
];

export default function PortfolioSnapshot() {
  return (
    <section className="border border-line bg-paper">
      <div className="grid divide-y divide-line md:grid-cols-3 lg:grid-cols-6 md:divide-x md:divide-y-0">
        {stats.map(([label, value]) => (
          <div key={label} className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
            <p className="mt-3 font-serif text-3xl font-semibold text-charcoal">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 border-t border-line p-6 text-sm leading-7 text-slateText md:grid-cols-3">
        <p>
          <strong className="text-charcoal">Latest review:</strong> Week 16 Portfolio Summary
        </p>
        <p>
          <strong className="text-charcoal">Main new trade:</strong> Bought 2 shares of Pershing Square Holdings
        </p>
        <p>
          <strong className="text-charcoal">Main lesson:</strong> Rebuild cash slowly and protect capital first
        </p>
      </div>
      <p className="border-t border-line bg-ivory px-6 py-4 text-xs leading-6 text-slateText">
        {portfolioSnapshot.updateNote}
      </p>
    </section>
  );
}
