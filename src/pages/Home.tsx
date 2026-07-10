import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileText,
  LineChart,
  PenLine,
  ScrollText,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioValueChart from '../components/PortfolioValueChart';
import { latestPortfolioReview, plannedLetters, portfolioSnapshot, portfolioValueHistory } from '../data/siteData';

const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);
const firstLetter = publishedLetters[0];

const primaryLinks = [
  {
    number: '01',
    title: 'The first letter',
    text: 'Why this public record exists—and why process matters more than looking clever.',
    href: firstLetter ? `/letters/${firstLetter.slug}` : '/letters',
    meta: firstLetter?.readingTime ?? 'Long-form',
    icon: PenLine,
  },
  {
    number: '02',
    title: latestPortfolioReview.title,
    text: 'The latest source-of-truth review: decisions, changes, and lessons from the portfolio.',
    href: `/journal/${latestPortfolioReview.slug}`,
    meta: latestPortfolioReview.label,
    icon: ScrollText,
  },
  {
    number: '03',
    title: 'Current portfolio',
    text: 'A transparent view of the account structure, cash, holdings, and portfolio roles.',
    href: '/portfolio',
    meta: 'Manual record',
    icon: LineChart,
  },
];

const secondaryLinks = [
  { title: 'Portfolio Journal', text: 'The week-by-week record.', href: '/journal', icon: ScrollText },
  { title: 'Letters', text: 'Long-form thinking.', href: '/letters', icon: PenLine },
  { title: 'Investment Process', text: 'The rules behind decisions.', href: '/process', icon: FileText },
  { title: 'Books', text: 'Ideas shaping the process.', href: '/books', icon: BookOpen },
  { title: 'About', text: 'The person behind the record.', href: '/about', icon: UserRound },
];

const snapshotItems = [
  ['Latest review', latestPortfolioReview.label],
  ['Account value', portfolioSnapshot.accountValue],
  ['Return', portfolioSnapshot.currentReturn],
  ['Cash', portfolioSnapshot.cashBalance],
];

const tickerItems = ['Protect capital', 'Write the reasoning', 'Size the risk', 'Stay patient', 'Review honestly'];

const chartWidth = 560;
const chartHeight = 230;
const chartMin = Math.min(...portfolioValueHistory.map((point) => point.value)) - 24;
const chartMax = Math.max(...portfolioValueHistory.map((point) => point.value)) + 24;
const chartPath = portfolioValueHistory
  .map((point, index) => {
    const x = 12 + (index / (portfolioValueHistory.length - 1)) * (chartWidth - 24);
    const y = 12 + ((chartMax - point.value) / (chartMax - chartMin)) * (chartHeight - 32);
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(' ');
const chartAreaPath = `${chartPath} L ${chartWidth - 12} ${chartHeight} L 12 ${chartHeight} Z`;

export default function Home() {
  return (
    <main className="page-fade overflow-hidden">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden border-b border-line bg-ivory text-bodyText">
        <div className="relative mx-auto grid min-h-[calc(100svh-118px)] max-w-[1440px] gap-14 px-5 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 xl:gap-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-line bg-paper px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slateText">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Personal capital · public record
            </div>
            <h1 className="mt-8 max-w-3xl font-serif text-[4.35rem] font-medium leading-[0.84] tracking-[-0.06em] text-charcoal sm:text-[5.7rem] lg:text-[6.7rem] xl:text-[8rem]">
              Investing,<br />
              <span className="italic text-link">in public.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-bodyText md:text-lg md:leading-9">
              A transparent record of what I own, why I own it, what I get wrong, and how my thinking changes over time.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to={firstLetter ? `/letters/${firstLetter.slug}` : '/letters'}
                className="group inline-flex min-h-14 items-center justify-center gap-6 rounded-full bg-link px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-1"
              >
                Start with my first letter
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </Link>
              <Link
                to="/portfolio"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-link hover:text-link"
              >
                See the portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <a href="#start-here" className="mt-12 inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bodyText transition-colors hover:text-link">
              Scroll through the record
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper">
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-editorial">
              <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-charcoal">Portfolio monitor</p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slateText">Manual · W18</p>
              </div>
              <div className="grid grid-cols-3 border-b border-line">
                {[
                  ['Value', portfolioSnapshot.accountValue],
                  ['Return', portfolioSnapshot.currentReturn.replace('About ', '')],
                  ['Cash', portfolioSnapshot.cashBalance],
                ].map(([label, value], index) => (
                  <div key={label} className={`px-4 py-5 sm:px-6 ${index > 0 ? 'border-l border-line' : ''}`}>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slateText">{label}</p>
                    <p className={`mt-2 font-serif text-xl font-medium sm:text-2xl ${label === 'Return' ? 'text-positive' : 'text-charcoal'}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="relative px-4 pb-4 pt-8 sm:px-6 sm:pb-6">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slateText">Account value</p>
                    <p className="mt-1 text-xs text-slateText">Week 01 — Week 18</p>
                  </div>
                  <p className="font-mono text-[9px] font-medium text-positive">{portfolioSnapshot.weeklyMove}</p>
                </div>
                <svg className="h-auto w-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Portfolio account value over eighteen weeks">
                  {[0.25, 0.5, 0.75].map((position) => (
                    <line key={position} x1="0" x2={chartWidth} y1={chartHeight * position} y2={chartHeight * position} stroke="#DDE3E8" strokeDasharray="3 7" />
                  ))}
                  <path d={chartAreaPath} fill="#137A5A" fillOpacity="0.08" />
                  <path d={chartPath} className="chart-draw" fill="none" stroke="#137A5A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <circle cx={chartWidth - 12} cy={chartPath.match(/([\d.]+) ([\d.]+)$/)?.[2] ?? 0} r="5" fill="#137A5A" />
                  <circle cx={chartWidth - 12} cy={chartPath.match(/([\d.]+) ([\d.]+)$/)?.[2] ?? 0} r="10" fill="none" stroke="#137A5A" strokeOpacity="0.35" />
                </svg>
                <div className="mt-2 flex items-center justify-between border-t border-line pt-4 font-mono text-[8px] uppercase tracking-[0.13em] text-slateText">
                  <span>Source: published reviews</span>
                  <span>Not live pricing</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-1 rounded-full border border-line bg-paper px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.13em] text-slateText shadow-editorial lg:left-0">
              <span className="mr-2 text-link">↳</span> Every number has a story
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-t border-line py-3">
          <div className="market-ticker flex gap-10 font-mono text-[9px] uppercase tracking-[0.18em] text-bodyText">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
                {item}<span className="text-bodyText">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-line px-5 md:grid-cols-4 md:divide-y-0 md:px-8">
          {snapshotItems.map(([label, value]) => (
            <div key={label} className="py-7 pl-4 first:pl-0 md:py-9 md:pl-7">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slateText">{label}</p>
              <p className={`mt-2 font-serif text-2xl font-medium leading-tight md:text-3xl ${label === 'Return' ? 'text-positive' : 'text-charcoal'}`}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start-here" className="relative bg-ivory py-20 md:py-32">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow text-bodyText">Three ways in</p>
              <h2 className="mt-6 font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-charcoal md:text-7xl">
                Start with<br /><span className="italic">the thinking.</span>
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-bodyText lg:justify-self-end md:text-lg md:leading-9">
              This is not a feed of hot takes. It is a living archive. Begin with the reason it exists, inspect the portfolio as it stands, then follow the decisions through time.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {primaryLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-1 md:p-8 ${index === 0 ? 'border-charcoal bg-charcoal text-paper shadow-editorial' : 'border-line bg-paper text-charcoal hover:border-charcoal/20 hover:shadow-editorial'}`}
                >
                  {index === 0 && <div className="site-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />}
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-[10px] text-slateText">{item.number}</span>
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${index === 0 ? 'border-white/10 bg-white/[0.05]' : 'border-line bg-ivory'}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="relative mt-auto">
                    <p className={`font-mono text-[8px] uppercase tracking-[0.16em] ${index === 0 ? 'text-white/75' : 'text-slateText'}`}>{item.meta}</p>
                    <h3 className="mt-4 font-serif text-4xl font-medium leading-[1.02] tracking-[-0.03em]">{item.title}</h3>
                    <p className={`mt-5 text-sm leading-7 ${index === 0 ? 'text-white/55' : 'text-slateText'}`}>{item.text}</p>
                    <span className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${index === 0 ? 'text-white' : 'text-link'}`}>
                      Read the record
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal text-paper">
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold">The operating system</p>
            <blockquote className="mt-7 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.04em] md:text-7xl">
              “The goal isn’t to look busy. It’s to become <span className="italic">clearer.</span>”
            </blockquote>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/55">
              A written process turns vague intentions into something that can be tested, reviewed, and improved.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10">
            {[
              ['01', 'Protect capital before chasing returns.'],
              ['02', 'Write the reason before taking action.'],
              ['03', 'Review the mistake without rewriting history.'],
            ].map(([number, text]) => (
              <div key={number} className="grid grid-cols-[auto_1fr] gap-5 bg-charcoal p-6 md:p-7">
                <span className="font-mono text-[10px] text-slateText">{number}</span>
                <p className="font-serif text-2xl font-medium leading-tight text-paper md:text-3xl">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-bodyText">The numbers</p>
              <h2 className="mt-6 font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-charcoal md:text-7xl">Performance,<br /><span className="italic">with context.</span></h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slateText lg:justify-self-end md:text-lg">
              Numbers matter, but only beside the thinking that produced them. The chart and the journal are designed to be read together.
            </p>
          </div>
          <div className="mt-14 rounded-[1.5rem] border border-line bg-paper p-5 shadow-editorial md:p-8">
            <PortfolioValueChart variant="blend" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-bodyText">Explore the archive</p>
              <h2 className="mt-6 font-serif text-5xl font-medium tracking-[-0.04em] text-charcoal md:text-6xl">Follow your curiosity.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-bodyText">Every page is part of the same record: decisions, principles, reading, and reflection.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href} className="group flex min-h-56 flex-col bg-paper p-6 transition-colors hover:bg-mist">
                  <Icon className="h-5 w-5 text-slateText" aria-hidden="true" />
                  <div className="mt-auto">
                    <h3 className="font-serif text-2xl font-medium text-charcoal">{item.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slateText">{item.text}</p>
                    <ArrowUpRight className="mt-5 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex max-w-3xl gap-4">
            <ShieldCheck className="mt-1 h-5 w-5 flex-none text-slateText" aria-hidden="true" />
            <p className="text-sm leading-7 text-white/55">This is a personal journal, not investment advice. It documents my own portfolio, decisions, and learning.</p>
          </div>
          <Link to="/disclaimer" className="group inline-flex items-center gap-2 text-sm font-semibold text-paper">
            Read the full disclaimer
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
