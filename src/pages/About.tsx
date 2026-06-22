import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';

const building = [
  'a written investment process',
  'a transparent decision archive',
  'a record of portfolio reviews',
  'a research library',
  'a long-term track record of thinking, not just returns',
];

const readingDevelopment = [
  {
    title: 'The Dhandho Investor',
    author: 'Mohnish Pabrai',
    category: 'Value Investing / Business / Low-Risk Opportunity',
    image: '/book-covers/dhandho-investor.jpeg',
    imageAlt: 'The Dhandho Investor book image.',
    paragraphs: [
      "I chose The Dhandho Investor because it was recommended to me by one of my friend's dads, and it quickly became one of the most useful investing books I have read. The main idea I took from it was the concept of building or buying businesses in a way where the downside is limited but the upside is still meaningful.",
      'One of the examples that stood out to me was the Patel family and the motel business. By using their own family as receptionists, cleaners, managers, and operators, they were able to keep costs extremely low. That meant they could offer better prices than neighbouring motels while still making the business work. That idea really interested me because it showed how using your own network, family, contacts, and available resources can create an advantage at the start of a business.',
      'The book did not completely change the way I think, but it taught me valuable lessons about finding overlooked opportunities, keeping costs low, and thinking carefully about downside risk. It also helped me understand how value can exist where other people are not looking properly. For my own investing journey, the biggest lesson is to look for situations where the risk is controlled, the price is sensible, and the potential reward is still attractive.',
    ],
  },
  {
    title: 'The Most Important Thing',
    author: 'Howard Marks',
    category: 'Risk / Contrarian Thinking / Market Psychology',
    image: '/book-covers/most-important-thing.jpeg',
    imageAlt: 'The Most Important Thing book image.',
    paragraphs: [
      'The Most Important Thing was one of the most important books I have read for understanding markets. Howard Marks helped me think much more seriously about risk, cycles, and the danger of simply following what everyone else believes.',
      'The biggest lesson I took from this book was contrarian thinking. It taught me that some of the best investment decisions can come from questioning the popular view and being willing to think differently from the crowd. If everyone agrees that something is obvious, it may already be priced in. That does not mean always doing the opposite for the sake of it, but it does mean slowing down, thinking independently, and asking whether the market has become too optimistic or too pessimistic.',
      'This book has made me want to become a more conservative and thoughtful investor. It reminded me that avoiding big mistakes is just as important as finding big winners. It also helped me understand that market cycles are emotional, and that investors often become most confident at exactly the wrong time.',
    ],
  },
  {
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    category: 'Value Investing / Discipline / Intrinsic Value',
    image: '/book-covers/intelligent-investor.png',
    imageAlt: 'The Intelligent Investor book image.',
    paragraphs: [
      'The Intelligent Investor had a massive impact on the way I view markets and investing. It helped me understand that investing is not about chasing whatever stock is going up the fastest. It is about discipline, patience, valuation, and protecting capital.',
      'The biggest thing this book taught me was how to think about fair value and intrinsic value. Before reading it, it is easy to look at a company and only think about the share price. This book helped me understand that the real question is whether the business is worth more or less than what the market is currently pricing it at.',
      'The Intelligent Investor also made me think differently about market emotions. The idea of "Mr Market" helped me understand that prices move around every day, but that does not mean the real value of a business changes every day. Sometimes the market is overly excited, and sometimes it is overly fearful. My job is not to react emotionally, but to stay disciplined and make decisions based on reasoning.',
      'This book has played a massive part in how I want to pursue investing for the rest of my life. It made me more serious about writing down my reasoning, reviewing my decisions, and not letting short-term price movements control my behaviour.',
    ],
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Purpose / Ambition / Personal Journey',
    image: '/book-covers/alchemist.jpeg',
    imageAlt: 'The Alchemist book image.',
    paragraphs: [
      'The Alchemist is not directly about investing, but it is still one of the most important books I have read. For me, it was about following what you feel called to do, trusting the journey, and not giving up when the path becomes difficult.',
      'The book taught me that the lessons you learn along the way can sometimes be more valuable than the final reward. That really connects with my investing journey because I am not only trying to make money. I am trying to build a way of thinking, a process, and a long-term skill that can stay with me for life.',
      'The Alchemist also made me think about ambition and self-belief. It reminded me that if you genuinely care about something, you have to keep moving towards it even when the result is not immediate. That applies to investing, business, and life in general. There will be setbacks, mistakes, and periods where things do not go to plan, but those moments are part of the process.',
    ],
  },
  {
    title: 'The Art of Spending Money',
    author: 'Morgan Housel',
    category: 'Money / Lifestyle / Financial Discipline',
    image: '/book-covers/art-of-spending-money.jpeg',
    imageAlt: 'The Art of Spending Money book image.',
    paragraphs: [
      'The Art of Spending Money taught me a lot about the way people use money and how easy it is to spend more simply because you earn more. One of the biggest lessons I took from it was that I do not need to spend money just to keep up with other people.',
      'I know what I need to survive each week, and as my income grows, I do not want my spending to rise at the same speed. I want to keep living within my means and use extra money to invest, build assets, and create more income streams. That does not mean never enjoying money, but it does mean being intentional with it.',
      'The book also told interesting stories about how people made and lost money, which helped me think more carefully about financial behaviour. Building wealth is not only about what you earn. It is also about what you keep, how you spend, and whether your decisions are helping your future or just feeding short-term image and lifestyle pressure.',
    ],
  },
  {
    title: "Man's Search for Meaning",
    author: 'Viktor Frankl',
    category: 'Purpose / Resilience / Perspective',
    image: '/book-covers/mans-search-for-meaning.jpeg',
    imageAlt: "Man's Search for Meaning book image.",
    paragraphs: [
      "Man's Search for Meaning was a deeply personal book for me. It taught me about what happened in the concentration camps and showed me a level of human suffering and resilience that I had never properly understood before.",
      'While reading it, my mind was genuinely blown by what people were able to endure. I did not realise human beings were capable of going through such extreme suffering and still finding meaning, purpose, and strength. It made me think very seriously about how lucky we are today, how careful we need to be with our decisions, and how important it is to treat other people properly.',
      'The book also taught me that meaning can help people survive incredibly difficult situations. That lesson applies far beyond history. It applies to personal setbacks, pressure, mistakes, and difficult periods in life. For my investing journey, it gives me perspective. A bad week in the market, a losing trade, or a mistake is not the end of the world. What matters is how I respond, what I learn, and whether I keep moving forward with purpose.',
    ],
  },
  {
    title: 'The Tipping Point',
    author: 'Malcolm Gladwell',
    category: 'Trends / Compounding / Behaviour',
    image: '/book-covers/tipping-point.jpeg',
    imageAlt: 'The Tipping Point book image.',
    paragraphs: [
      'The Tipping Point helped me understand how small things can build quietly over time before suddenly reaching a point where everything changes. That idea really stood out to me because it connects to business, investing, habits, and personal growth.',
      'The book showed me that small changes can have huge effects once they compound for long enough. A product, idea, behaviour, or trend might look small at first, but if the right conditions come together, it can suddenly spread very quickly. That is useful for thinking about companies, especially businesses that rely on networks, platforms, consumer behaviour, or cultural change.',
      'It also made me think about my own habits. Small good decisions repeated over time can compound into something powerful. But the opposite is also true. Small bad decisions can also build up and create bigger problems later. That is why process matters. Whether it is investing, money, discipline, or business, the small things I do consistently are what eventually create the bigger outcome.',
    ],
  },
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
      />

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
              eyebrow="Why this site exists"
              title="A public record creates accountability."
              text="This site exists to track my trades, explain my thinking, keep others informed, and build a public record of my investment process."
            />
            <div className="mt-7 space-y-5 text-base leading-8 text-slateText">
              <p>
                It is for accountability, and it is also for family, friends, future employers, business contacts,
                potential mentors, and myself.
              </p>
              <p>
                I want readers to see that I have spent years interested in markets, made mistakes, learned from them,
                and now take the process seriously. The goal is to build a serious long-term record of thinking, not
                simply a list of returns.
              </p>
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

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Reading & Development</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-6xl">
              Books That Shaped My Thinking
            </h2>
            <p className="mt-6 text-base leading-8 text-slateText md:text-lg md:leading-9">
              These are the books that have had the biggest influence on how I think about investing, money,
              discipline, purpose, risk, and long-term decision-making. Not every book here is directly about investing,
              but each one has shaped the way I think about building wealth, staying patient, controlling emotions, and
              pursuing something meaningful over time.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-line bg-line">
            {readingDevelopment.map((book) => (
              <article key={book.title} className="grid gap-7 bg-ivory p-5 md:grid-cols-[190px_1fr] md:p-7 lg:p-9">
                <div className="max-w-[220px] self-start overflow-hidden border border-line bg-paper p-2 shadow-editorial md:max-w-none">
                  <img
                    src={book.image}
                    alt={book.imageAlt}
                    className="block h-auto w-full bg-paper"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{book.category}</p>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
                    {book.title}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-slateText">{book.author}</p>
                  <div className="mt-6 grid gap-5 text-base leading-8 text-slateText">
                    {book.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl border border-line bg-ivory p-6 text-center text-base leading-8 text-slateText md:p-8 md:text-lg md:leading-9">
            Together, these books have shaped the way I think about investing and life. The investing books have taught
            me about value, risk, discipline, contrarian thinking, and protecting capital. The personal books have taught
            me about purpose, resilience, ambition, perspective, and using money properly. I do not see investing as
            separate from personal development. To become a better investor, I also need to become more patient, more
            disciplined, more thoughtful, and more aware of my own behaviour.
          </div>
        </div>
      </section>
    </main>
  );
}
