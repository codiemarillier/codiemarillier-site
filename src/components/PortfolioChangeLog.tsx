import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioChangeLog } from '../data/siteData';

const typeStyles: Record<string, string> = {
  Buy: 'border-forest/30 bg-forest/10 text-forest',
  Sell: 'border-gold/40 bg-gold/10 text-charcoal',
  Trim: 'border-navy/30 bg-navy/10 text-navy',
  Update: 'border-line bg-ivory text-slateText',
  Lesson: 'border-charcoal/20 bg-charcoal/10 text-charcoal',
};

export default function PortfolioChangeLog() {
  return (
    <div className="border-y border-line">
      {portfolioChangeLog.map((change) => (
        <article
          key={`${change.date}-${change.title}`}
          className="grid gap-5 border-b border-line bg-paper px-5 py-6 last:border-b-0 md:grid-cols-[160px_1fr_auto] md:items-center md:px-7"
        >
          <div>
            <p className="text-sm font-semibold text-charcoal">{change.date}</p>
            <span
              className={`mt-3 inline-flex border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
                typeStyles[change.type] ?? typeStyles.Update
              }`}
            >
              {change.type}
            </span>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold leading-tight text-charcoal">{change.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slateText">{change.text}</p>
          </div>
          {change.relatedSlug && (
            <Link
              to={`/journal/${change.relatedSlug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
            >
              Journal context
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
