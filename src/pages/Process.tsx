import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import { latestPortfolioReview, processRules } from '../data/siteData';

const relatedSections = [
  {
    title: 'Current Portfolio',
    text: `Where the current holdings, cash position, portfolio roles, and latest ${latestPortfolioReview.label} snapshot are recorded.`,
    href: '/portfolio',
  },
  {
    title: 'Portfolio Journal',
    text: 'Where the regular reviews show how the rules are being tested in the real portfolio record.',
    href: '/journal',
  },
];

const beforeBuy = [
  'Why am I buying?',
  'What is the thesis?',
  'What could go wrong?',
  'What would make me sell?',
  'Is this core, hedge, speculative, or defensive?',
  'Am I following a plan or reacting emotionally?',
];

const beforeSell = [
  'Has the thesis changed?',
  'Am I taking profit, managing risk, or panicking?',
  'Should I trim instead of exiting fully?',
  'What will I do with the cash?',
  'What lesson should be recorded?',
];

export default function Process() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Process"
        title="Investment Process"
        intro="These are the rules I use to judge my own decisions: protect capital, size risk properly, write the reasoning down, keep cash discipline, avoid leverage, and review the portfolio regularly."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Rulebook"
          title="Rules that keep the process grounded."
          text="The point of the process is not to remove risk completely. It is to make sure risk is deliberate, sized properly, and backed by clear reasoning."
        />

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {processRules.map((rule, index) => (
            <article key={rule.title} className="bg-paper p-7 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">
                Rule {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-charcoal">{rule.title}</h2>
              <p className="mt-4 text-base leading-8 text-slateText">{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center md:px-8 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slateText">Review process</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            The record matters because memory is vague.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slateText md:text-lg md:leading-9">
            Each regular review should record account value, cash, what helped, what hurt, trades made, mistakes,
            emotional pressure, and the plan for the following period. The goal is to make the process visible enough
            that bad habits are harder to hide from.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Practical checklists"
          title="Questions before action."
          text="The rules only matter if they show up before I buy, sell, trim, or add to a position."
          align="center"
        />
        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {[
            ['Before I buy', beforeBuy],
            ['Before I sell', beforeSell],
          ].map(([title, items]) => (
            <article key={title as string} className="bg-paper p-7 md:p-8">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">{title as string}</h2>
              <ul className="mt-6 grid gap-3">
                {(items as string[]).map((item) => (
                  <li key={item} className="border border-line bg-paper px-4 py-3 text-sm font-semibold text-charcoal">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Related sections"
          title="Where the process gets tested."
          text="The rulebook matters most when it is connected to real decisions and honest reviews."
        />
        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {relatedSections.map((section) => (
            <Link key={section.href} to={section.href} className="group bg-paper p-7 transition-colors hover:bg-ivory">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slateText">{section.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                Open section
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
