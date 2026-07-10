import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { journalEntries } from '../data/siteData';
import SectionHeader from './SectionHeader';

const reviewEntries = journalEntries.filter((entry) => ['Weekly Reviews', 'Fortnightly Reviews'].includes(entry.category));

export default function WeeklySummariesRail() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Portfolio summaries"
          title="Scroll through the portfolio record."
          text="Each portfolio summary shows what changed, what helped, what hurt, and what I wanted to watch next. This is the main accountability record."
        />
        <Link to="/journal" className="inline-flex items-center gap-2 text-sm font-semibold text-link">
          View all entries
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8">
        {reviewEntries.map((entry) => (
          <Link
            key={entry.slug}
            to={`/journal/${entry.slug}`}
            className="group flex min-h-[330px] w-[82vw] max-w-[360px] flex-none snap-start flex-col border border-line bg-paper p-6 transition-colors hover:bg-ivory sm:w-[360px]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateText">{entry.date}</p>
            <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight text-charcoal">{entry.title}</h3>
            <p className="mt-4 line-clamp-5 flex-1 text-sm leading-7 text-slateText">{entry.excerpt}</p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
              Open review
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
