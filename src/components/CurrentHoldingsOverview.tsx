import { holdings } from '../data/siteData';

const currentHoldings = holdings.filter((holding) => holding.positionSize !== 'Closed');

export default function CurrentHoldingsOverview() {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {currentHoldings.map((holding) => (
        <article key={holding.ticker} className="bg-paper p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{holding.ticker}</p>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal">{holding.name}</h3>
            </div>
            <span className="border border-line bg-ivory px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slateText">
              {holding.sleeve}
            </span>
          </div>
          <dl className="mt-6 grid gap-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Role</dt>
              <dd className="mt-1 text-sm leading-6 text-slateText">{holding.role}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
