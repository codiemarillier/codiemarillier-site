import { ArrowRight, LineChart, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { holdings, journalEntries, portfolioChangeLog } from '../data/siteData';

const visibleHoldings = holdings.filter((holding) => holding.positionSize !== 'Closed');
const latestWeeklyEntries = journalEntries
  .filter((entry) => entry.category === 'Weekly Reviews')
  .slice(0, 3);

export default function StartHere() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-px border border-line bg-line">
        <article className="bg-paper p-6 md:p-8 lg:p-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="flex h-11 w-11 items-center justify-center border border-line bg-ivory text-gold">
              <LineChart className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Current portfolio</p>
              <h3 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">Holdings in the record</h3>
              <p className="mt-4 text-base leading-8 text-slateText">
                A quick view of the holdings currently recorded in my own portfolio. This shows share counts only, not
                current values, prices, or recommendations.
              </p>
            </div>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleHoldings.map((holding) => (
              <Link
                key={holding.ticker}
                to="/portfolio"
                className="group border border-line bg-ivory p-4 transition-colors hover:bg-paper"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{holding.ticker}</p>
                  <ArrowRight
                    className="mt-0.5 h-4 w-4 flex-none text-gold transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 font-semibold leading-snug text-charcoal">{holding.name}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Shares owned</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-charcoal">{holding.positionSize}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
              View portfolio and change log
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>

        <article className="bg-paper p-6 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-line bg-ivory text-gold">
                <ScrollText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Weekly reviews</p>
                <h3 className="font-serif text-3xl font-semibold text-charcoal">Read the latest summaries</h3>
              </div>
            </div>
            <Link to="/journal" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
              Open journal archive
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {latestWeeklyEntries.map((entry) => (
              <Link key={entry.slug} to={`/journal/${entry.slug}`} className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{entry.date}</p>
                <h4 className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal">{entry.title}</h4>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slateText">{entry.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  Read summary
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </article>

        <article className="bg-paper p-6 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Recent decisions</p>
              <h3 className="mt-2 font-serif text-3xl font-semibold text-charcoal">Notable portfolio changes</h3>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
              View full change log
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {portfolioChangeLog.slice(0, 3).map((change) => (
              <Link
                key={`${change.date}-${change.title}`}
                to={change.relatedSlug ? `/journal/${change.relatedSlug}` : '/portfolio'}
                className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{change.type}</p>
                  <p className="text-xs font-semibold text-slateText">{change.date}</p>
                </div>
                <h4 className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal">{change.title}</h4>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slateText">{change.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  Read context
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
