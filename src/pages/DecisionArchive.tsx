import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import { decisionArchiveEntries } from '../data/siteData';

const filters = ['Buy', 'Sell', 'Trim', 'Add', 'Hold', 'Mistake', 'Lesson', 'Speculative', 'Core holding', 'Hedge'];

export default function DecisionArchive() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Decision Archive"
        title="Decision Archive"
        intro="The Decision Archive is where I will record the most important investment decisions I make. The goal is not only to track outcomes, but to understand the reasoning behind each decision and whether the process was sound."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Coming soon"
          title="A future decision library."
          text="This section will not only record whether a decision made money. It will record whether the reasoning was sound."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <span key={filter} className="border border-line bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slateText">
              {filter}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-px border border-line bg-line">
          {decisionArchiveEntries.map((decision) => (
            <article key={decision.slug} className="bg-paper p-6 md:p-8">
              <div className="grid gap-5 lg:grid-cols-[180px_1fr_auto] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{decision.action}</p>
                  <p className="mt-2 text-sm font-semibold text-slateText">{decision.date}</p>
                  <p className="mt-2 text-sm font-semibold text-charcoal">{decision.status}</p>
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-semibold leading-tight text-charcoal">{decision.title}</h2>
                  <p className="mt-3 text-sm font-semibold text-slateText">{decision.holding}</p>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slateText">{decision.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[decision.positionType, ...decision.tags].map((tag, index) => (
                      <span key={`${decision.slug}-${tag}-${index}`} className="border border-line bg-ivory px-3 py-1 text-xs font-semibold text-slateText">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex text-sm font-semibold text-charcoal">
                  Planned memo
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
