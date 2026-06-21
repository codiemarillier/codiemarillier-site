import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { JournalEntry } from '../data/siteData';

export default function JournalTimeline({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <article
          key={entry.slug}
          className="group border border-line bg-paper p-5 transition-colors hover:bg-ivory md:p-7"
        >
          <div className="grid gap-5 md:grid-cols-[180px_1fr_auto] md:items-start">
            <div>
              <p className="text-sm font-semibold text-charcoal">{entry.date}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">{entry.category}</p>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-semibold text-charcoal">{entry.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slateText">{entry.excerpt}</p>
            </div>
            <Link
              to={`/journal/${entry.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          {(entry.majorEvents?.length || entry.tags?.length) && (
            <div className="mt-6 grid gap-5 border-t border-line pt-5 lg:grid-cols-[1fr_auto] lg:items-start">
              {entry.majorEvents?.length ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Key points</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-slateText md:grid-cols-2">
                    {entry.majorEvents.slice(0, 4).map((event) => (
                      <li key={event} className="border-l border-line pl-3">
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {entry.tags?.length ? (
                <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line bg-ivory px-3 py-1 text-xs font-semibold text-slateText"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
