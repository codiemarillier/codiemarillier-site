import { ArrowRight, BookOpen, FileText, LineChart, PenLine, ScrollText, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioValueChart from '../components/PortfolioValueChart';
import heroImage from '../assets/portfolio-desk-hero.png';
import { latestPortfolioReview, plannedLetters, portfolioSnapshot } from '../data/siteData';

const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);
const firstLetter = publishedLetters[0];

const primaryLinks = [
  {
    title: 'Read My First Letter',
    text: 'The best place to understand why this public record exists.',
    href: firstLetter ? `/letters/${firstLetter.slug}` : '/letters',
    action: 'Start with the letter',
    icon: PenLine,
    primary: true,
  },
  {
    title: 'Latest Portfolio Update',
    text: `${latestPortfolioReview.label} is the current source-of-truth review.`,
    href: `/journal/${latestPortfolioReview.slug}`,
    action: 'Read latest review',
    icon: ScrollText,
  },
  {
    title: 'Current Portfolio',
    text: 'See what I own, the cash position, and how each holding is grouped.',
    href: '/portfolio',
    action: 'View portfolio',
    icon: LineChart,
  },
];

const secondaryLinks = [
  {
    title: 'Portfolio Journal',
    text: 'Weekly reviews from the beginning of the public record.',
    href: '/journal',
    icon: ScrollText,
  },
  {
    title: 'Letters',
    text: 'Longer reflections behind the weekly reviews and portfolio updates.',
    href: '/letters',
    icon: PenLine,
  },
  {
    title: 'Investment Process',
    text: 'The rules I use for buying, selling, sizing, and reviewing decisions.',
    href: '/process',
    icon: FileText,
  },
  {
    title: 'Books',
    text: 'The books shaping how I think about risk, money, and discipline.',
    href: '/books',
    icon: BookOpen,
  },
  {
    title: 'About',
    text: 'Who I am, why I started investing, and why I built the site.',
    href: '/about',
    icon: UserRound,
  },
];

const snapshotItems = [
  ['Latest review', latestPortfolioReview.label],
  ['Account value', portfolioSnapshot.accountValue],
  ['Return', portfolioSnapshot.currentReturn],
  ['Cash', portfolioSnapshot.cashBalance],
];

export default function Home() {
  return (
    <main className="page-fade">
      <section className="relative overflow-hidden bg-charcoal text-paper">
        <img
          src={heroImage}
          alt="Investment desk with a laptop chart, notebook, and printed portfolio report"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b56b]">Personal investment journal</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-none text-paper md:text-7xl">
            Codie Capital Research
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f4ead8] md:text-xl md:leading-8">
            I am documenting my personal investing journey in public: what I own, why I own it, what I am learning, and
            how my thinking changes over time.
          </p>
          <p className="mt-5 max-w-2xl border-l-2 border-[#d8b56b] pl-4 text-sm font-semibold leading-6 text-paper">
            Personal journal only. Not financial advice, not a fund, and not a recommendation to copy anything I do.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {primaryLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`group flex min-h-16 items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold transition-colors ${
                    item.primary
                      ? 'bg-paper text-charcoal hover:bg-[#f4ead8]'
                      : 'border border-white/30 text-paper hover:bg-paper hover:text-charcoal'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-5 w-5 flex-none" aria-hidden="true" />
                    <span>{item.action}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 flex-none transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {snapshotItems.map(([label, value]) => (
              <div key={label} className="border-l-2 border-gold pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{label}</p>
                <p className="mt-2 font-serif text-2xl font-semibold leading-tight text-charcoal">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Best first reads</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            If you only read three things, start here.
          </h2>
        </div>
        <div className="mt-7 grid gap-4">
          {primaryLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.href}
                className="group grid gap-4 border-y border-line py-5 sm:grid-cols-[44px_1fr_auto] sm:items-center"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-line bg-paper text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-serif text-2xl font-semibold leading-tight text-charcoal">{item.title}</span>
                  <span className="mt-2 block text-sm leading-7 text-slateText">{item.text}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  {item.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">How to read it</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
                The site is a record, not a pitch.
              </h2>
              <p className="mt-5 text-base leading-8 text-slateText">
                The weekly journal records what happened. The letters explain what I am learning underneath it. The
                process page shows the rules I am trying to judge myself against.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ['1', 'Read the first letter for the why.'],
                ['2', 'Check the current portfolio for the latest position.'],
                ['3', 'Use the journal to see the record week by week.'],
              ].map(([number, text]) => (
                <div key={number} className="flex gap-4 border-t border-line pt-4">
                  <span className="font-serif text-3xl font-semibold text-gold">{number}</span>
                  <p className="pt-1 text-sm font-semibold leading-7 text-charcoal">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Portfolio value</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            The account value over time.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slateText">
            The chart keeps the weekly account value visible next to the written record, so the site shows both the
            numbers and the thinking behind them.
          </p>
        </div>
        <div className="mt-8">
          <PortfolioValueChart variant="blend" />
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Explore the site</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              Go deeper when you want the full record.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {secondaryLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} to={item.href} className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper">
                  <span className="flex h-10 w-10 items-center justify-center border border-line bg-paper text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slateText">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                    Open section
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-charcoal text-paper">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 flex-none text-[#d8b56b]" aria-hidden="true" />
            <p className="text-sm leading-7 text-[#f4ead8]">
              Nothing on this site is investment advice. It is a public record of my own decisions and learning.
            </p>
          </div>
          <Link
            to="/disclaimer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/30 px-5 text-sm font-semibold transition-colors hover:bg-paper hover:text-charcoal"
          >
            Full disclaimer
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
