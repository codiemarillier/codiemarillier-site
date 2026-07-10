import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type CTASectionProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
  href?: string;
};

export default function CTASection({
  title = 'Read the portfolio journal',
  text = 'This site is designed to document decisions, lessons, regular portfolio reviews, and the development of a personal investment record over time.',
  buttonLabel = 'Open the journal',
  href = '/journal',
}: CTASectionProps) {
  return (
    <section className="bg-charcoal text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Build the record</p>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">{text}</p>
        </div>
        <Link
          to={href}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-link px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-white"
        >
          {buttonLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
