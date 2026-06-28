import { holdings } from '../data/siteData';

const currentHoldings = holdings.filter((holding) => !/^closed/i.test(holding.positionSize) && !/^closed/i.test(holding.status));

const sleeveGroups = [
  {
    title: 'Core quality growth',
    match: ['Core quality growth', 'Quality growth', 'Core quality / ballast', 'Core quality growth / add-on watchlist'],
  },
  {
    title: 'Core ETF',
    match: ['Core ETF'],
  },
  {
    title: 'Hedge',
    match: ['Hedge'],
  },
  {
    title: 'Defensive / income',
    match: ['Defensive / income-style', 'Defensive / energy transition', 'Thematic / defence'],
  },
  {
    title: 'Speculative / higher volatility',
    match: ['Higher volatility', 'Speculative / long-term opportunity'],
  },
  {
    title: 'Investor-led holding',
    match: ['Investor-led holding'],
  },
];

function matchesGroup(sleeve: string, group: (typeof sleeveGroups)[number]) {
  return group.match.some((label) => sleeve.toLowerCase().includes(label.toLowerCase()));
}

export default function CurrentHoldingsOverview() {
  return (
    <div className="grid gap-10">
      {sleeveGroups.map((group) => {
        const groupHoldings = currentHoldings.filter((holding) => matchesGroup(holding.sleeve, group));
        if (!groupHoldings.length) return null;

        return (
          <section key={group.title} className="border-y border-line py-5">
            <div className="pb-4">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">{group.title}</h3>
            </div>
            <div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
              {groupHoldings.map((holding) => (
                <article key={holding.ticker} className="border-t border-line py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{holding.ticker}</p>
                      <h4 className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal">{holding.name}</h4>
                    </div>
                    <span className="border border-line px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slateText">
                      {holding.positionSize}
                    </span>
                  </div>
                  <dl className="mt-6 grid gap-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Role</dt>
                      <dd className="mt-1 text-sm leading-6 text-slateText">{holding.role}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Latest note</dt>
                      <dd className="mt-1 text-sm leading-6 text-slateText">{holding.transactionNote}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
