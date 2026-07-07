import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { latestPortfolioReview } from '../data/siteData';

const sections = [
  {
    title: 'Who I am',
    body: [
      'I am a private, long-term investor managing my own portfolio and documenting the process publicly.',
      'Codie Capital Research is not a fund, not an advisory service, and not a place where I tell anyone what to buy. It is a record of my own thinking as I learn, make decisions, review mistakes, and build a process over time.',
    ],
  },
  {
    title: 'Why I became interested in investing',
    body: [
      'My interest in investing began seriously around the age of fourteen, when I first understood that the stock market allowed ordinary people to buy small pieces of real businesses.',
      'During the first COVID lockdown in 2020, my father encouraged me and my siblings to each choose an online course. I chose a stock trading course by Mohsin Hassan on Udemy and began studying fundamental analysis, technical analysis, market behaviour, risk, and trading psychology.',
      'My family’s background in real estate also shaped how I think about ownership, assets, capital appreciation, rental income, and long-term wealth creation.',
    ],
  },
  {
    title: 'What I learned from early mistakes',
    body: [
      'My first investment was Bitcoin in 2021, when it was trading at roughly $21,000. I invested around $500, and within a few months that position had grown to approximately $1,500. That early success gave me confidence, but it also taught me that making money early does not mean risk is fully understood.',
      'Losing money through leveraged crypto trading taught me more than making money early on. It encouraged emotional behaviour, adding to losing trades, hoping for reversals, and taking pressure that did not fit the way I want to invest now.',
      'That is why the current process is built around written reasoning, controlled position sizing, cash discipline, and avoiding leverage.',
    ],
  },
  {
    title: 'Why I built this website',
    body: [
      'I built this website to document my thinking, keep myself accountable, and create a public record of what I believed at different points in time.',
      'I want to be able to look back and see what I got right, what I got wrong, and how my thinking changed. Writing it down makes it harder to pretend I had a plan if my actions do not match it.',
    ],
  },
];

const startLinks = [
  {
    title: 'Current Portfolio',
    text: `The latest ${latestPortfolioReview.label} snapshot, current holdings, cash, and portfolio role notes.`,
    href: '/portfolio',
  },
  {
    title: 'Portfolio Journal',
    text: 'The regular record of portfolio changes, lessons, and decision context.',
    href: '/journal',
  },
  {
    title: 'Investment Process',
    text: 'The rules I use to judge my own decisions and avoid avoidable mistakes.',
    href: '/process',
  },
];

export default function About() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="About"
        title="About Codie Marillier"
        intro="I started Codie Capital Research to document my development as a private, long-term investor. It is a personal record of my portfolio, thinking, mistakes, reading, and process."
        align="center"
        tone="ivory"
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-6">
          {sections.map((section) => (
            <article key={section.title} className="border border-line bg-paper p-6 md:p-8">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">{section.title}</h2>
              <div className="mt-5 grid gap-5 text-base leading-8 text-slateText md:text-lg md:leading-9">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-charcoal text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8aa6e]">Where to start</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Read the live record first.</h2>
            <p className="mt-4 text-base leading-8 text-[#d8d0c0]">
              The most useful pages are the ones with the actual portfolio record, regular reviews, and rules behind the
              decisions.
            </p>
          </div>
          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {startLinks.map((item) => (
              <Link key={item.href} to={item.href} className="group bg-charcoal p-6 transition-colors hover:bg-[#24231f]">
                <h3 className="font-serif text-2xl font-semibold text-paper">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#d8d0c0]">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-paper">
                  Open page
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
