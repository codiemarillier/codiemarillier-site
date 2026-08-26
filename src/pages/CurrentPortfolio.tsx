import CurrentHoldingsOverview from '../components/CurrentHoldingsOverview';
import HoldingsTable from '../components/HoldingsTable';
import PageHeader from '../components/PageHeader';
import PortfolioChangeLog from '../components/PortfolioChangeLog';
import PortfolioSnapshot from '../components/PortfolioSnapshot';
import PortfolioValueChart from '../components/PortfolioValueChart';
import SectionHeader from '../components/SectionHeader';
import { currentPortfolio, latestPortfolioReview, portfolioRoles, portfolioSnapshot, transactionSummary } from '../data/siteData';

export default function CurrentPortfolio() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Portfolio"
        title="Current Portfolio"
        intro="This page documents my own portfolio allocation, decisions, and research for accountability. Performance is public; account size and share quantities are private. It is not investment advice or a model portfolio."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="mb-5 text-sm font-semibold text-charcoal">
            Latest published review and allocation record: {latestPortfolioReview.label} / {latestPortfolioReview.date}. Measured benchmark series:{' '}
            {currentPortfolio.measuredPerformance.asOf}.
          </p>
          <PortfolioSnapshot />
          <div className="mt-6">
            <PortfolioValueChart variant="blend" />
          </div>
          <div className="mt-8 grid gap-5 border-y border-line py-5 md:grid-cols-4">
            {transactionSummary.map((item) => (
              <div key={item.label} className="border-l-2 border-gold/60 pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">{item.label}</p>
                <p className="mt-3 font-serif text-2xl font-semibold text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Portfolio dashboard"
          title="Current snapshot first."
          text={`${latestPortfolioReview.label} is the single current allocation record, reviewed ${portfolioSnapshot.asOfDate}. The benchmark-comparable series has its own clearly labelled measurement date.`}
        />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {portfolioRoles.map((role, index) => (
            <article
              key={role.title}
              className={`border-t border-line pt-6 ${portfolioRoles.length % 2 === 1 && index === portfolioRoles.length - 1 ? 'md:col-span-2' : ''}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bodyText">{role.title}</p>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-charcoal">{role.examples}</h2>
              <p className="mt-4 text-sm leading-7 text-bodyText">{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Current holdings"
            title="What I own right now, with a role for each holding."
            text="Rounded allocation weights, roles, current decisions, review dates, and only the thesis or exit language already recorded in the journal."
          />
        </div>
        <CurrentHoldingsOverview />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Change log"
            title="What changed recently."
            text="A simple timeline of the main portfolio changes and lessons. Each item links back to the journal entry where the decision is discussed in more detail."
          />
        </div>
        <PortfolioChangeLog />
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <SectionHeader
            eyebrow="Full record"
            title="Clean manual portfolio record."
            text="No balances, share quantities, or monetary gains and losses are shown. This table combines current holdings with closed positions that remain useful for accountability."
          />
          <div className="mt-10">
            <HoldingsTable />
          </div>
          <p className="mt-5 text-sm leading-7 text-slateText">
            Portfolio information is manually updated, rounded for privacy, and may be out of date.
          </p>
        </div>
      </section>

    </main>
  );
}
