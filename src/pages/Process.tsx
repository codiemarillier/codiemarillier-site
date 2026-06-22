import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import { processRules } from '../data/siteData';

export default function Process() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Process"
        title="Investment Process"
        intro="A written rulebook for protecting capital, sizing positions properly, keeping cash discipline, avoiding leverage, and reviewing the portfolio every week."
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Weekly review process</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            The record matters because memory is vague.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slateText md:text-lg md:leading-9">
            Each weekly review should record account value, cash, what helped, what hurt, trades made, mistakes,
            emotional pressure, and the plan for the following week. The goal is to make the process visible enough
            that bad habits are harder to hide from.
          </p>
        </div>
      </section>
    </main>
  );
}
