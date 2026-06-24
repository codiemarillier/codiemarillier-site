import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';

const building = [
  'a written investment process',
  'a transparent decision archive',
  'a record of portfolio reviews',
  'a research library',
  'a long-term track record of thinking, not just returns',
];

export default function About() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="About"
        title="About Codie Marillier"
        intro="I started Codie Capital Research to document my development as a private, long-term investor. The goal is to build a transparent record of my thinking, decisions, mistakes, and process as I continue to refine how I allocate capital."
        align="center"
        tone="ivory"
      >
        <Link
          to="/books"
          className="inline-flex min-h-11 items-center justify-center border border-charcoal px-5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-paper"
        >
          Books That Shaped My Thinking
        </Link>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Investing background"
          title="A private, long-term investor building a written record."
          align="center"
        />
        <div className="mx-auto mt-12 max-w-5xl space-y-6 text-lg leading-9 text-slateText">
          <p>
            I am a private, long-term investor managing my own portfolio and documenting the process publicly.
          </p>
          <p>
            My interest in investing began seriously around the age of fourteen, when I first understood that the stock
            market allowed ordinary people to buy small pieces of real businesses. That idea changed the way I thought
            about money, ownership, and wealth. I realised that even without starting a company myself, I could still
            participate in the growth of exceptional businesses run by talented people.
          </p>
          <p>
            During the first COVID lockdown in 2020, my father encouraged me and my siblings to each choose an online
            course while we were at home. I chose a stock trading course by Mohsin Hassan on Udemy, bought a notebook,
            and began studying fundamental analysis, technical analysis, market behaviour, risk, and trading psychology.
            I later completed the advanced course, which deepened my interest and gave me a more structured way to think
            about markets.
          </p>
          <p>
            My first investment was Bitcoin in 2021, when it was trading at roughly $21,000. I invested around $500, and
            within a few months that position had grown to approximately $1,500. That early success gave me confidence,
            but it also taught me an important lesson: making money early does not always mean you fully understand the
            risk you are taking.
          </p>
          <p>
            My family's background in real estate has also shaped the way I think about assets. I grew up around
            conversations about ownership, capital appreciation, rental income, and long-term wealth creation. Real
            estate remains a major long-term interest for me, but public markets have given me a way to begin building
            capital earlier through listed companies, ETFs, selected assets, and a repeatable investment process.
          </p>
          <p>
            I care about investing because I believe owning parts of strong businesses is one of the most rational ways
            to build wealth over time. My ambition is to become a highly capable investor and compound my own capital at
            a strong rate over decades. That ambition is not a promise or a guarantee. It is a standard I hold myself to.
          </p>
          <p>
            This website exists to keep that process accountable. It is where I track my portfolio, explain my thinking,
            record my decisions, reflect on mistakes, and build a public record of how my investment approach develops
            over time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Process"
          title="Mistakes That Shaped My Process"
          text="The biggest lesson investing has taught me is patience. I still take risk, but I want that risk to be deliberate, properly sized, and backed by clear reasoning."
          align="center"
        />
        <div className="mx-auto mt-12 max-w-5xl space-y-6 text-lg leading-9 text-slateText">
          <p>
            Early Bitcoin and crypto success showed me what was possible. Losing money through leveraged crypto trading
            taught me more than making money early on.
          </p>
          <p>
            Leveraged crypto trading became too close to gambling because it encouraged emotional behaviour, adding to
            losing trades, and hoping for reversals. I no longer want strategies that create revenge trading,
            overexposure, or emotional decision-making.
          </p>
          <p>
            This is why the portfolio is now built around written reasoning, controlled position sizing, cash
            discipline, and a preference for owning businesses and assets with clear roles.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Why I Built This Website"
              title="A public record keeps the process honest."
              text="I built this website to document my thinking, keep myself accountable, and create a long-term public record of what I believed at different moments."
            />
            <div className="mt-7 space-y-5 text-base leading-8 text-slateText">
              <p>
                I want to be able to look back and see what I believed, what I got right, what I got wrong, and how my
                thinking changed. Writing it down makes it harder to pretend I had a plan if my actions do not match it.
              </p>
              <p>
                It is also a broader reputational asset over time. I want friends, family, future business partners,
                potential mentors, and future investors to see the process being built in public, not just hear me talk
                about ambition after the fact.
              </p>
              <Link to="/books" className="inline-flex text-sm font-semibold text-charcoal">
                Read the books that shaped my thinking
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-gold">What I am building</p>
            <div className="grid gap-3">
              {building.map((item) => (
                <div key={item} className="border border-line bg-ivory p-5 text-sm font-medium text-charcoal">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
