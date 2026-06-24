import { ArrowRight, Archive, BookOpen, FileText, LineChart, ScrollText, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/portfolio-desk-hero.png';
import { journalEntries, portfolioSnapshot } from '../data/siteData';

const latestWeeklyEntry = journalEntries.find((entry) => entry.category === 'Weekly Reviews');
const latestReviewLabel = latestWeeklyEntry?.title.match(/Week\s+\d+/i)?.[0] ?? 'Week 16';

const whyThisExists = [
  'Document what I think and why I think it before hindsight changes the story.',
  'Hold myself accountable by keeping a public record instead of relying on memory or conversation.',
  'Track portfolio decisions properly, including what I owned, what I changed, and what I believed at the time.',
  'Show how my process develops over time, especially around patience, risk, and position sizing.',
  'Separate real conviction from things that only sound good when spoken out loud.',
  'Build a serious long-term record of progress, mistakes, and lessons as they actually happen.',
];

const startHereCards = [
  {
    title: 'Current Portfolio',
    text: 'What I currently own, how the portfolio is positioned, and what role each holding plays.',
    href: '/portfolio',
    action: 'View current portfolio',
    icon: LineChart,
  },
  {
    title: 'Portfolio Journal',
    text: 'My weekly record of portfolio changes, market thoughts, decisions, and lessons.',
    href: '/journal',
    action: 'Read portfolio journal',
    icon: ScrollText,
  },
  {
    title: 'Books',
    text: 'The books that have shaped how I think about money, markets, discipline, risk, and behaviour.',
    href: '/books',
    action: 'Browse books',
    icon: BookOpen,
  },
  {
    title: 'Investment Process',
    text: 'The rules and habits I am trying to build around capital protection, patience, position sizing, and written reasoning.',
    href: '/process',
    action: 'See investment process',
    icon: FileText,
  },
];

const stillBuildingCards = [
  {
    title: 'Letters',
    text: 'Longer reflections on what I am learning beyond the weekly account value. My First Letter is now live.',
    href: '/letters',
    action: 'Open letters',
    icon: FileText,
  },
  {
    title: 'Decision Archive',
    text: 'A future archive for major investment decisions. This will stay empty until full decision memos are written.',
    href: '/decision-archive',
    action: 'View archive page',
    icon: Archive,
  },
  {
    title: 'Mistakes & Lessons',
    text: 'A future record of mistakes, difficult decisions, and process lessons. This will stay empty until proper entries are written.',
    href: '/mistakes-lessons',
    action: 'Open section',
    icon: ShieldAlert,
  },
];

const snapshotItems = [
  ['Latest review', latestReviewLabel],
  ['Current account value', portfolioSnapshot.accountValue],
  ['Starting value', portfolioSnapshot.startingCostBasis],
  ['Current return', portfolioSnapshot.currentReturn],
  ['Cash balance', portfolioSnapshot.cashBalance],
];

export default function Home() {
  return (
    <main className="page-fade">
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#efe5d4] to-transparent" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Personal investment journal</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-none text-charcoal md:text-7xl">
              Codie Capital Research
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slateText md:text-xl">
              Codie Capital Research is my personal investment journal. I use it to record what I own, why I own it,
              what I am learning, and how my thinking changes over time. The aim is to build a long-term public record
              of my decisions, mistakes, lessons, and development as an investor.
            </p>
            <p className="mt-5 max-w-2xl border-l-2 border-gold pl-4 text-sm leading-6 text-slateText">
              This is a personal investment journal only. It is not financial advice, not a fund, and not a
              money-management service.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/portfolio"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-charcoal px-6 text-sm font-semibold text-paper transition-colors hover:bg-navy"
              >
                View Current Portfolio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/journal"
                className="inline-flex min-h-12 items-center justify-center border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-ivory"
              >
                Read Portfolio Journal
              </Link>
              <Link
                to="/process"
                className="inline-flex min-h-12 items-center justify-center border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-ivory"
              >
                See Investment Process
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden border border-line bg-ivory p-3 shadow-editorial">
              <img
                src={heroImage}
                alt="Investment desk with a laptop chart, notebook, and printed portfolio report"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="relative -mt-10 ml-auto w-full max-w-md border border-line bg-paper p-6 shadow-editorial sm:-mt-16 sm:mr-6">
              <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Latest published snapshot</p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-charcoal">{latestReviewLabel}</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest text-paper">
                  <LineChart className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Account value</dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold text-charcoal">{portfolioSnapshot.accountValue}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Return</dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold text-charcoal">{portfolioSnapshot.currentReturn}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Cash</dt>
                  <dd className="mt-1 text-lg font-semibold text-charcoal">{portfolioSnapshot.cashBalance}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Starting value</dt>
                  <dd className="mt-1 text-lg font-semibold text-charcoal">{portfolioSnapshot.startingCostBasis}</dd>
                </div>
              </dl>
              {latestWeeklyEntry ? (
                <Link to={`/journal/${latestWeeklyEntry.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  Read the latest weekly review
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why I Built This</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              A public record is harder to hide behind.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slateText">
              I built this site to document my thinking properly, hold myself accountable, and keep a visible record of
              what I believed and what I did. The goal is not to sound smart after the fact. It is to make the process
              real enough to review honestly over time.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {whyThisExists.map((item) => (
              <article key={item} className="border border-line bg-paper p-5 shadow-editorial">
                <p className="text-sm leading-7 text-slateText">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-charcoal text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8aa6e]">
                Latest review: {latestReviewLabel}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Current portfolio snapshot</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#d8d0c0]">
                The snapshot is updated through the latest published weekly review.
              </p>
            </div>
            {latestWeeklyEntry ? (
              <Link
                to={`/journal/${latestWeeklyEntry.slug}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#d8d0c0] px-6 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-charcoal"
              >
                Read {latestReviewLabel} review
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
          <dl className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-5">
            {snapshotItems.map(([label, value]) => (
              <div key={label} className="bg-charcoal px-5 py-6">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8aa6e]">{label}</dt>
                <dd className="mt-3 font-serif text-3xl font-semibold text-paper md:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Start Here</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-charcoal md:text-5xl">The best pages for a first visit</h2>
          <p className="mt-5 text-base leading-8 text-slateText">
            These are the sections with the clearest real content right now and the best place to understand the
            portfolio, the weekly record, the reading behind it, and the process I am trying to build.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {startHereCards.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} to={item.href} className="group flex h-full flex-col border border-line bg-paper p-6 shadow-editorial transition-colors hover:bg-ivory">
                <span className="flex h-11 w-11 items-center justify-center border border-line bg-ivory text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight text-charcoal">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slateText">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  {item.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Still Being Built</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-charcoal md:text-5xl">Some parts of the record are still empty on purpose</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slateText">
                I would rather keep these sections honest than fill the homepage with planned pieces that do not exist
                yet. They stay visible because they matter to the long-term project, but they are not presented as
                finished work.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {stillBuildingCards.map((item) => {
                const Icon = item.icon;

                return (
                  <Link key={item.href} to={item.href} className="group flex h-full flex-col border border-line bg-ivory p-6 transition-colors hover:bg-paper">
                    <span className="flex h-11 w-11 items-center justify-center border border-line bg-paper text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-charcoal">{item.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slateText">{item.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                      {item.action}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Next Steps</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-4xl">Use the journal for the weekly record. Use the process for the rules.</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slateText">
              The homepage is the introduction. The portfolio, journal, and process pages are where the real record
              lives.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link to="/about" className="text-charcoal transition-colors hover:text-gold">
              About
            </Link>
            <Link to="/disclaimer" className="text-charcoal transition-colors hover:text-gold">
              Disclaimer
            </Link>
            <Link to="/ai/" className="inline-flex items-center gap-2 text-slateText transition-colors hover:text-charcoal">
              Technical AI archive
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
