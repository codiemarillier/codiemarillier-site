import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand, footerLinks } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-charcoal text-paper">
      <div className="relative border-b border-white/10">
        <div className="site-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-gold">Keep following the record</p>
            <h2 className="mt-7 max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Decisions compound.<br />So does clarity.
            </h2>
          </div>
          <Link
            to="/journal"
            className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full bg-link px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-1"
          >
            Read the journal
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-white">CM</span>
            <span>
              <span className="block font-serif text-2xl font-medium">{brand.name}</span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/75">Independent investment journal</span>
            </span>
          </Link>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/55">
            A transparent record of one investor learning in public—documenting the thinking, the mistakes, and the process behind every decision.
          </p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
            Personal record / Updated regularly
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3 md:justify-self-end">
          {footerLinks.map((link) =>
            link.href.endsWith('.html') ? (
              <a key={link.href} href={link.href} className="group inline-flex items-center gap-1.5 py-1 text-white/60 transition-colors hover:text-white">
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </a>
            ) : (
              <Link key={link.href} to={link.href} className="group inline-flex items-center gap-1.5 py-1 text-white/60 transition-colors hover:text-white">
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </Link>
            ),
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/75 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Codie Capital Research</p>
          <p>Not financial advice · Do your own research</p>
        </div>
      </div>
    </footer>
  );
}
