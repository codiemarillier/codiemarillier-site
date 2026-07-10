import PageHeader from '../components/PageHeader';
import { investmentRules } from '../data/siteData';

const sections = [
  {
    title: 'Long-Term Public Market Ownership',
    text: 'I focus on long-term investing in public companies, ETFs, and selected assets with clear portfolio roles. The aim is to own assets for rational reasons, write those reasons down, and review whether the thesis remains intact over time.',
  },
  {
    title: 'Brilliant Businesses at Sensible Prices',
    text: 'I prefer dominant, profitable businesses with monopoly-like positions, strong earnings power, exposure to future technology, and room to grow over 10-15 years. The goal is not to buy anything at any price, but to find brilliant businesses at sensible prices.',
  },
  {
    title: 'Dominant Technology Compounders',
    text: 'Companies such as Google, Meta, and ASML interest me because they are dominant, profitable, and deeply connected to long-term technology trends. I want to understand whether their competitive positions can remain strong over many years.',
  },
  {
    title: 'Controlled Higher-Risk Growth',
    text: 'A smaller part of the portfolio can be used for higher-risk, long-term opportunities such as robotics and automation. Symbotic is the type of company that can be interesting, but position sizing has to reflect uncertainty.',
  },
  {
    title: 'Market Outperformance as an Ambition',
    text: 'My objective is to outperform the market over time, with a personal long-term target of roughly 15-25% annual returns. This is an ambition, not a promise, forecast, or guarantee.',
  },
  {
    title: 'Cash, ETFs, and Hedges Have Roles',
    text: 'Cash gives flexibility when opportunities are not attractive. ETFs provide broad market exposure. Gold has a role as a hedge against inflation, instability, and market stress. Each holding should have a job.',
  },
  {
    title: 'No Leverage, No Emotional Pressure',
    text: 'Early crypto trading taught me that leverage can turn curiosity into gambling. I do not borrow aggressively to invest, and I do not want short-term pressure controlling long-term decisions.',
  },
  {
    title: 'Written Reasoning Before Action',
    text: 'Every trade should have a reason before entry and a review after exit. Benjamin Graham shaped how I think about margin of safety, while Howard Marks shaped how I think about risk, cycles, and second-level thinking.',
  },
];

export default function Philosophy() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Philosophy"
        title="Investment Philosophy"
        intro="My investing approach is built around long-term ownership, capital protection, sensible prices, and written reasoning before action."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-px border border-line bg-line">
          {sections.map((section, index) => (
            <article key={section.title} className="grid gap-6 bg-paper p-7 md:grid-cols-[170px_1fr] md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slateText">
                Principle {String(index + 1).padStart(2, '0')}
              </p>
              <div>
                <h2 className="font-serif text-4xl font-semibold text-charcoal">{section.title}</h2>
                <p className="mt-4 max-w-4xl text-base leading-8 text-slateText">{section.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slateText">Investing rules</p>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              Rules that keep the process grounded.
            </h2>
          </div>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {investmentRules.map((rule, index) => (
              <div key={rule} className="bg-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-4 text-sm font-semibold leading-7 text-charcoal">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
