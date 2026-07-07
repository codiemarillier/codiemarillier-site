import CurrentHoldingsOverview from '../components/CurrentHoldingsOverview';
import HoldingsTable from '../components/HoldingsTable';
import PageHeader from '../components/PageHeader';
import PortfolioChangeLog from '../components/PortfolioChangeLog';
import PortfolioSnapshot from '../components/PortfolioSnapshot';
import PortfolioValueChart from '../components/PortfolioValueChart';
import SectionHeader from '../components/SectionHeader';
import { latestPortfolioReview, portfolioRoles, transactionSummary } from '../data/siteData';

const sleeves = [
  {
    title: 'Core Holdings',
    text: 'Google, Meta, Berkshire Hathaway, Airbnb, Pershing Square, and selected quality names are studied as potential compounders. The role is long-term growth with valuation discipline.',
  },
  {
    title: 'Hedge / Defensive Sleeve',
    text: 'Realty Income, NextEra Energy, Rheinmetall, and iShares Physical Gold are monitored as defensive, income-style, thematic, or macro hedge positions.',
  },
  {
    title: 'Higher Volatility Positions',
    text: 'Symbotic, SpaceX, and any speculative exposure require smaller sizing and clearer reviews because volatility can expose weak reasoning quickly. IonQ is kept in the record as a closed loss and lesson.',
  },
  {
    title: 'Cash and Watchlist',
    text: 'Cash remains limited after the latest review, so rebuilding flexibility matters. ASML is closed after a realised gain but remains a watchlist name.',
  },
];

export default function CurrentPortfolio() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Portfolio"
        title="Current Portfolio"
        intro="This page documents my own portfolio structure for accountability. It is not investment advice, not a model portfolio, and should not be copied."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="mb-5 text-sm font-semibold text-charcoal">
            Last updated: {latestPortfolioReview.label} / {latestPortfolioReview.date}
          </p>
          <PortfolioSnapshot />
          <div className="mt-6">
            <PortfolioValueChart variant="blend" />
          </div>
          <div className="mt-8 grid gap-5 border-y border-line py-5 md:grid-cols-4">
            {transactionSummary.map((item) => (
              <div key={item.label} className="border-l-2 border-gold/60 pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{item.label}</p>
                <p className="mt-3 font-serif text-2xl font-semibold text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow={`${latestPortfolioReview.label} dashboard`}
          title="Current snapshot first."
          text={`The latest published portfolio record is ${latestPortfolioReview.label}. This dashboard keeps the account value, cash, holdings, portfolio roles, and latest action plan in one place.`}
        />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {portfolioRoles.map((role, index) => (
            <article
              key={role.title}
              className={`border-t border-line pt-6 ${portfolioRoles.length % 2 === 1 && index === portfolioRoles.length - 1 ? 'md:col-span-2' : ''}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{role.title}</p>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-charcoal">{role.examples}</h2>
              <p className="mt-4 text-sm leading-7 text-slateText">{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Current holdings"
            title="What I own right now, grouped by role."
            text="A quick scan of the current holdings in my own portfolio. The grouping is for readability only and is not a recommendation."
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
            text="No live market prices are shown. This table combines current holdings with closed positions that are still useful for accountability and review."
          />
          <div className="mt-10">
            <HoldingsTable />
          </div>
          <p className="mt-5 text-sm leading-7 text-slateText">
            Portfolio information is manually updated and may be out of date.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {sleeves.map((sleeve) => (
            <article key={sleeve.title} className="border-t border-line pt-6">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">{sleeve.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slateText">{sleeve.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
