import { ArrowRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DisclaimerBanner from '../components/DisclaimerBanner';
import JournalTimeline from '../components/JournalTimeline';
import PageHeader from '../components/PageHeader';
import { journalEntries } from '../data/siteData';

const filters = ['All Entries', 'Weekly Reviews', 'Trade Reflections', 'Market Notes', 'Lessons'];
const latestEntry = journalEntries[0];
const weeklyCount = journalEntries.filter((entry) => entry.category === 'Weekly Reviews').length;
const allTags = Array.from(new Set(journalEntries.flatMap((entry) => entry.tags ?? []))).slice(0, 12);

export default function PortfolioJournal() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [activeTag, setActiveTag] = useState('All Themes');
  const [query, setQuery] = useState('');

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return journalEntries.filter((entry) => {
      const matchesFilter = activeFilter === 'All Entries' || entry.category === activeFilter;
      const matchesTag = activeTag === 'All Themes' || entry.tags?.includes(activeTag);
      const searchableText = `${entry.title} ${entry.date} ${entry.category} ${entry.excerpt} ${
        entry.tags?.join(' ') ?? ''
      } ${entry.majorEvents?.join(' ') ?? ''} ${entry.body.join(' ')}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesFilter && matchesTag && matchesQuery;
    });
  }, [activeFilter, activeTag, query]);

  const clearFilters = () => {
    setActiveFilter(filters[0]);
    setActiveTag('All Themes');
    setQuery('');
  };

  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Journal"
        title="Portfolio Journal"
        intro="Weekly portfolio reviews documenting account value, positioning, lessons, mistakes, and market context."
      />
      <DisclaimerBanner compact />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 grid gap-px border border-line bg-line lg:grid-cols-[1.15fr_0.85fr]">
          <article className="bg-paper p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Latest weekly review</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              {latestEntry.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slateText">{latestEntry.excerpt}</p>
            {latestEntry.majorEvents?.length ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {latestEntry.majorEvents.map((event) => (
                  <div key={event} className="border border-line bg-ivory p-4">
                    <p className="text-sm font-semibold leading-6 text-charcoal">{event}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <Link
              to={`/journal/${latestEntry.slug}`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
            >
              Read latest review
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
          <aside className="bg-paper p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Archive snapshot</p>
            <dl className="mt-6 grid gap-px border border-line bg-line">
              <div className="bg-ivory p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Entries</dt>
                <dd className="mt-2 font-serif text-4xl font-semibold text-charcoal">{journalEntries.length}</dd>
              </div>
              <div className="bg-ivory p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Weekly reviews</dt>
                <dd className="mt-2 font-serif text-4xl font-semibold text-charcoal">{weeklyCount}</dd>
              </div>
              <div className="bg-ivory p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Latest date</dt>
                <dd className="mt-2 font-serif text-3xl font-semibold text-charcoal">{latestEntry.date}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mb-10 border border-line bg-paper p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search portfolio journal</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search portfolio journal"
                className="min-h-12 w-full border border-line bg-ivory pl-11 pr-4 text-sm font-medium text-charcoal outline-none transition focus:ring-2 focus:ring-gold"
              />
            </label>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-line bg-ivory px-4 text-sm font-semibold text-charcoal transition-colors hover:bg-paper focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const count =
                filter === 'All Entries'
                  ? journalEntries.length
                  : journalEntries.filter((entry) => entry.category === filter).length;
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                    active
                      ? 'border-charcoal bg-charcoal text-paper'
                      : 'border-line bg-ivory text-slateText hover:bg-paper hover:text-charcoal'
                  }`}
                >
                  {filter} <span className={active ? 'text-paper/75' : 'text-gold'}>{count}</span>
                </button>
              );
            })}
          </div>

          {allTags.length > 0 && (
            <div className="mt-5 border-t border-line pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Filter by theme</p>
              <div className="flex flex-wrap gap-2">
                {['All Themes', ...allTags].map((tag) => {
                  const active = activeTag === tag;

                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveTag(tag)}
                      className={`border px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                        active
                          ? 'border-charcoal bg-charcoal text-paper'
                          : 'border-line bg-ivory text-slateText hover:bg-paper hover:text-charcoal'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p className="mt-5 text-sm leading-7 text-slateText">
            Showing <strong className="text-charcoal">{filteredEntries.length}</strong> of{' '}
            <strong className="text-charcoal">{journalEntries.length}</strong> journal entries.
          </p>
        </div>

        {filteredEntries.length > 0 ? (
          <JournalTimeline entries={filteredEntries} />
        ) : (
          <div className="border border-line bg-paper p-8 text-center">
            <p className="font-serif text-3xl font-semibold text-charcoal">No matching entries yet.</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slateText">
              Clear the filters or search for a broader portfolio theme.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
