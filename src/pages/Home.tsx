import { ArrowRight, BookOpen, FileText, LineChart, PenLine, ScrollText, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioValueChart from '../components/PortfolioValueChart';
import heroImage from '../assets/portfolio-desk-hero.png';
import { latestPortfolioReview, portfolioSnapshot } from '../data/siteData';

const snapshotItems = [
  ['Latest review', latestPortfolioReview.label],
  ['Account value', portfolioSnapshot.accountValue],
  ['Starting value', portfolioSnapshot.startingCostBasis],
  ['Current return', portfolioSnapshot.currentReturn],
  ['Cash', portfolioSnapshot.cashBalance],
  ['Weekly move', portfolioSnapshot.weeklyMove],
];

const startHereCards = [
  {
    title: 'Current Portfolio',
    text: 'See the Week 16 account value, cash, current holdings, portfolio roles, and recent changes.',
    href: '/portfolio',
    action: 'View portfolio',
    icon: LineChart,
  },
  {
    title: 'Portfolio Journal',
    text: 'Read the weekly review archive, starting with Week 16 and then working back through the record.',
    href: '/journal',
    action: 'Read journal',
    icon: ScrollText,
  },
  {
    title: 'Letters',
    text: 'Read the longer reflections behind the weekly reviews, starting with My First Letter.',
    href: '/letters',
    action: 'Read letters',
    icon: PenLine,
  },
  {
    title: 'Investment Process',
    text: 'The rules I use to judge my own decisions: protect capital, size risk, write reasoning, and review weekly.',
    href: '/process',
    action: 'See process',
    icon: FileText,
  },
  {
    title: 'About',
    text: 'Understand who I am, why I became interested in investing, and why this public record exists.',
    href: '/about',
    action: 'About Codie',
    icon: UserRound,
  },
];

export default function Home() {
  return (
    <main className="page-fade">
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#efe5d4] to-transparent" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Personal investment journal</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-none text-charcoal md:text-7xl">
              Codie Capital Research
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slateText md:text-xl">
              Codie Capital Research is a public record of my personal investing process. I document what I own, why I
              own it, what I am learning, and how my thinking changes as I build a long-term portfolio.
            </p>
            <p className="mt-5 max-w-2xl border-l-2 border-gold pl-4 text-sm font-semibold leading-6 text-charcoal">
              Personal investment journal only. Not financial advice, not a fund, and not a money-management service.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={`/journal/${latestPortfolioReview.slug}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-charcoal px-6 text-sm font-semibold text-paper transition-colors hover:bg-navy"
              >
                Read latest review
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex min-h-12 items-center justify-center border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-ivory"
              >
                View current portfolio
              </Link>
              <Link
                to="/process"
                className="inline-flex min-h-12 items-center justify-center border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-ivory"
              >
                See my process
              </Link>
              <Link
                to="/letters"
                className="inline-flex min-h-12 items-center justify-center border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-ivory"
              >
                Read letters
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
              <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Latest review</p>
                  <p className="mt-2 font-serif text-3xl font-semibold leading-tight text-charcoal">
                    {latestPortfolioReview.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slateText">{latestPortfolioReview.date}</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center bg-forest text-paper">
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
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Main new trade</dt>
                  <dd className="mt-1 text-lg font-semibold text-charcoal">2 shares PSH</dd>
                </div>
              </dl>
              <Link
                to={`/journal/${latestPortfolioReview.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
              >
                Read {latestPortfolioReview.label} review
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-charcoal text-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8aa6e]">
                {latestPortfolioReview.title}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Latest portfolio snapshot</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#d8d0c0]">
                Updated from the Week 16 review on {latestPortfolioReview.date}. This is a manual record of my own
                account, not a model portfolio or recommendation.
              </p>
            </div>
            <Link
              to={`/journal/${latestPortfolioReview.slug}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#d8d0c0] px-6 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-charcoal"
            >
              Read Week 16
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <dl className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
            {snapshotItems.map(([label, value]) => (
              <div key={label} className="bg-charcoal px-5 py-6">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8aa6e]">{label}</dt>
                <dd className="mt-3 font-serif text-2xl font-semibold leading-tight text-paper md:text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <PortfolioValueChart />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why it exists</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              A public record makes the process harder to fake.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slateText">
              The site is here to keep my thinking visible before hindsight changes the story. It records decisions,
              mistakes, lessons, and the process I am trying to build around patience, risk, and capital protection.
            </p>
          </div>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              ['What I own', 'The portfolio page records current holdings, cash, roles, and recent changes.'],
              ['Why I own it', 'The journal explains the weekly decisions and what I thought at the time.'],
              ['What I am learning', 'The process, books, letters, and about pages show how the thinking is developing.'],
            ].map(([title, text]) => (
              <article key={title} className="bg-paper p-6">
                <h3 className="font-serif text-2xl font-semibold leading-tight text-charcoal">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slateText">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Best place to start</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-charcoal md:text-5xl">
              Five pages that explain the site quickly.
            </h2>
            <p className="mt-5 text-base leading-8 text-slateText">
              These pages are the cleanest route for a first-time visitor: the current portfolio, the weekly journal,
              the longer letters, the rules behind the decisions, and the personal background behind the project.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {startHereCards.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex h-full flex-col border border-line bg-ivory p-6 shadow-editorial transition-colors hover:bg-paper"
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-line bg-paper text-gold">
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
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Also useful</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              Reading and longer reflections sit beside the portfolio record.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slateText">
              The books page explains the ideas shaping the process, and the letters page explains why the record matters
              beyond weekly account value.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/books"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-line bg-paper px-5 text-sm font-semibold text-charcoal transition-colors hover:border-gold"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Books
            </Link>
            <Link
              to="/letters"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-line bg-paper px-5 text-sm font-semibold text-charcoal transition-colors hover:border-gold"
            >
              Letters
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
