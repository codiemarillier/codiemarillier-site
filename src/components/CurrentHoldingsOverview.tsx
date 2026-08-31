import { currentHoldings } from '../data/currentPortfolio';

export default function CurrentHoldingsOverview() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {currentHoldings.map((holding) => (
        <article key={holding.ticker} className="flex h-full flex-col border border-line bg-paper p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateText">{holding.ticker}</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-charcoal">{holding.name}</h3>
            </div>
            <span className="border border-line bg-ivory px-3 py-1 text-xs font-semibold text-charcoal">{holding.decision}</span>
          </div>

          <p className="mt-6 font-serif text-5xl font-medium tracking-[-0.04em] text-charcoal">{holding.portfolioWeight}%</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slateText">of portfolio</p>

          <dl className="mt-7 grid gap-5 border-t border-line pt-5 text-sm leading-7">
            <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Role</dt><dd className="mt-1 text-charcoal">{holding.role}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Why I own it</dt><dd className="mt-1 text-slateText">{holding.whyOwned}</dd></div>
            {holding.reviewFocus ? <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">What I am watching</dt><dd className="mt-1 text-slateText">{holding.reviewFocus}</dd></div> : null}
            {holding.sellCriteria ? <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">What would make me sell or trim</dt><dd className="mt-1 text-slateText">{holding.sellCriteria}</dd></div> : null}
          </dl>

          <div className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5 text-xs">
            <div><p className="font-semibold uppercase tracking-[0.14em] text-slateText">Performance</p><p className="mt-2 font-semibold text-charcoal">{holding.performance ?? 'Not published'}</p></div>
            <div><p className="font-semibold uppercase tracking-[0.14em] text-slateText">Last reviewed</p><p className="mt-2 font-semibold text-charcoal">{holding.lastReviewed}</p></div>
          </div>
        </article>
      ))}
    </div>
  );
}
