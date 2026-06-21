import CurrentHoldingsOverview from '../components/CurrentHoldingsOverview';
import HoldingsTable from '../components/HoldingsTable';
import PageHeader from '../components/PageHeader';
import PortfolioChangeLog from '../components/PortfolioChangeLog';
import PortfolioSnapshot from '../components/PortfolioSnapshot';
import SectionHeader from '../components/SectionHeader';
import { portfolioRoles, transactionSummary } from '../data/siteData';

const sleeves = [
  {
    title: 'Core Holdings',
    text: 'Google, Meta, Berkshire Hathaway, Airbnb, and selected quality names are studied as potential compounders. The role is long-term growth with valuation discipline.',
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
    text: 'The Google re-entry is now small rather than aggressive. ASML is closed after a realised gain but remains a watchlist name.',
  },
];

export default function CurrentPortfolio() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Portfolio"
        title="Current Portfolio"
        intro="This page documents my own portfolio structure for accountability. It is not investment advice, and it should not be treated as a model portfolio or copied without independent research."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Portfolio approach"
          title="Each holding needs a role."
          text="The portfolio is built around dominant technology companies, broad market ETFs, defensive and income-style holdings, selected macro hedges, and smaller higher-risk growth opportunities."
        />
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {portfolioRoles.map((role, index) => (
            <article
              key={role.title}
              className={`bg-paper p-6 ${portfolioRoles.length % 2 === 1 && index === portfolioRoles.length - 1 ? 'md:col-span-2' : ''}`}
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
            title="What I own right now."
            text="A quick scan of the current holdings in my own portfolio. This view shows share counts and roles only, not live prices, current values, or recommendations."
          />
        </div>
        <CurrentHoldingsOverview />
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <PortfolioSnapshot />
          <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-4">
            {transactionSummary.map((item) => (
              <div key={item.label} className="bg-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{item.label}</p>
                <p className="mt-3 font-serif text-2xl font-semibold text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
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
            title="Manual portfolio record."
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
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {sleeves.map((sleeve) => (
            <article key={sleeve.title} className="bg-paper p-7">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">{sleeve.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slateText">{sleeve.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
