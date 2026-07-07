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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c8aa6e]">Build the record</p>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#d8d0c0]">{text}</p>
        </div>
        <Link
          to={href}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#d8d0c0] px-6 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {buttonLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
