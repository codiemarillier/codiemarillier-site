import { ArrowRight, BookOpen, FileText, LineChart, ScrollText, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { latestPortfolioReview, portfolioSnapshot } from '../data/siteData';

const latestReviewLabel = latestPortfolioReview.label;

const startCards = [
  {
    title: 'Current Portfolio',
    text: 'What I own, why each holding has a role, and how the latest portfolio is positioned.',
    href: '/portfolio',
    action: 'View portfolio',
    icon: LineChart,
  },
  {
    title: 'Portfolio Journal',
    text: 'The regular record of decisions, mistakes, market context, and lessons from the portfolio.',
    href: '/journal',
    action: 'Read journal',
    icon: ScrollText,
  },
];

const processCards = [
  {
    title: 'Investment Process',
    text: 'The written rulebook for buying, selling, sizing positions, and protecting capital.',
    href: '/process',
    icon: BookOpen,
  },
  {
    title: 'Books',
    text: 'The reading that shaped how I think about money, risk, discipline, and behaviour.',
    href: '/books',
    icon: FileText,
  },
  {
    title: 'About',
    text: 'Who I am, why I started investing, and why this public record exists.',
    href: '/about',
    icon: UserRound,
  },
];

export default function StartHere() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-px border border-line bg-line">
        <article className="bg-paper p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Latest {latestReviewLabel} snapshot</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
                Current portfolio record
              </h2>
              <p className="mt-5 text-base leading-8 text-slateText">
                {latestReviewLabel} is the latest published review. The snapshot is manual, public for accountability, and not
                a live recommendation to buy or sell anything.
              </p>
              {latestPortfolioReview ? (
                <Link to={`/journal/${latestPortfolioReview.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  Read {latestReviewLabel} review
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
            <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {[
                ['Current account value', portfolioSnapshot.accountValue],
                ['Starting value', portfolioSnapshot.startingCostBasis],
                ['Current return', portfolioSnapshot.currentReturn],
                ['Cash balance', portfolioSnapshot.cashBalance],
              ].map(([label, value]) => (
                <div key={label} className="bg-ivory p-5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{label}</dt>
                  <dd className="mt-2 font-serif text-3xl font-semibold text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        <article className="bg-paper p-6 md:p-7">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Start here</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-5xl">Best places to begin</h3>
            <p className="mt-4 text-base leading-8 text-slateText">
              The site is built so normal readers can quickly understand what it is, why it exists, and how the process
              is developing over time.
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {startCards.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href} className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper">
                  <span className="flex h-10 w-10 items-center justify-center border border-line bg-paper text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-serif text-2xl font-semibold leading-tight text-charcoal">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-slateText">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                    {item.action}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </article>

        <article className="bg-paper p-6 md:p-7">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Building the process</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-5xl">
              The record behind the results
            </h3>
            <p className="mt-4 text-base leading-8 text-slateText">
              These sections are where decisions, mistakes, and rules become easier to review instead of relying on memory.
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {processCards.map((item) => {
              const Icon = item.icon;
              return (
              <Link key={item.href} to={item.href} className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper">
                <span className="flex h-10 w-10 items-center justify-center border border-line bg-paper text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="mt-4 font-serif text-2xl font-semibold leading-tight text-charcoal">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slateText">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                  Open section
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
