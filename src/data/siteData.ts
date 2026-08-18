import { myFirstLetterBody } from './myFirstLetter';
import { monthlyPortfolioReviews } from './monthlyPortfolioReviews.generated';
import { currentPortfolio } from './currentPortfolio';
import { siteIdentity } from './siteConfig';

export { publicRouteManifest, routeDefinitionByPath, routeMetaByPath, siteIdentity } from './siteConfig';
export { currentHoldings, currentPortfolio } from './currentPortfolio';
export {
  v2Identity,
  v2Interests,
  v2HorseboxProjectDetails,
  v2LifeChapters,
  v2Contact,
  v2Navigation,
  v2Now,
  v2PersonalityNotes,
  v2Principles,
  v2Projects,
  v2SecondaryWork,
  v2TravelImages,
  v2TravelStory,
  v2FeaturedWorkStories,
  v2WorkStories,
  v2WritingGateways,
  v2Voice,
} from './v2Content';

export type NavLink = {
  label: string;
  href: string;
};

export type JournalEntry = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: 'Monthly Reviews' | 'Weekly Reviews' | 'Fortnightly Reviews' | 'Trade Reflections' | 'Market Notes' | 'Lessons';
  excerpt: string;
  body: string[];
  tags?: string[];
  majorEvents?: string[];
  documentUrl?: string;
  documentPdfUrl?: string;
  documentPages?: string[];
};

export type PortfolioChange = {
  date: string;
  type: 'Buy' | 'Sell' | 'Trim' | 'Update' | 'Lesson';
  title: string;
  text: string;
  relatedSlug?: string;
};

export type ResearchNote = {
  slug: string;
  title: string;
  category: 'Company Notes' | 'Market Notes' | 'Portfolio Construction' | 'Risk Management' | 'Watchlist';
  status: 'Current holding' | 'Watchlist' | 'Sold / lesson' | 'Portfolio rule' | 'Theme under review';
  ticker?: string;
  portfolioRole: string;
  riskLevel: 'Lower' | 'Medium' | 'Higher';
  researchFocus: string;
  decisionImpact: string;
  lastUpdated: string;
  excerpt: string;
  body: string[];
};

export type Holding = {
  name: string;
  ticker: string;
  portfolioWeight: number;
  sleeve: string;
  role: string;
  status: 'Current holding' | 'Closed / watchlist' | 'Closed / lesson';
  decision: 'BUY' | 'HOLD' | 'TRIM' | 'EXIT' | 'WATCH';
  lastReviewed: string;
  performance?: string;
  whyOwned: string;
  reviewFocus?: string;
  sellCriteria?: string;
  latestNote: string;
};

export type ReadingBook = {
  slug: string;
  title: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  takeaway: string;
  closingQuestion?: string;
  lastUpdated?: string;
};

export type PlannedLetter = {
  slug: string;
  title: string;
  date: string;
  type: 'Monthly Letter' | 'Quarterly Letter' | 'Reflection';
  summary: string;
  themes: string[];
  readingTime?: string;
  status?: 'Published' | 'Draft in progress';
  body?: readonly string[];
};

export type DecisionArchiveEntry = {
  slug: string;
  date: string;
  title: string;
  holding: string;
  action: 'Buy' | 'Sell' | 'Trim' | 'Add' | 'Hold' | 'Mistake' | 'Lesson';
  positionType: 'Speculative' | 'Core holding' | 'Hedge' | 'Lesson' | 'Watchlist';
  status: 'Open' | 'Reviewed' | 'Closed';
  summary: string;
  relatedWeeklyReview?: string;
  tags: string[];
};

export type MistakeLesson = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  relatedLink?: string;
  themes: string[];
};

export const brand = siteIdentity.investing;

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal', href: '/journal' },
  { label: 'Letters', href: '/letters' },
  { label: 'Process', href: '/process' },
  { label: 'Books', href: '/books' },
  { label: 'About', href: '/about' },
];

export const footerLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal', href: '/journal' },
  { label: 'Letters', href: '/letters' },
  { label: 'Process', href: '/process' },
  { label: 'Books', href: '/books' },
  { label: 'About', href: '/about' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'AI Archive', href: '/ai/index.html' },
];

export const whatThisIs = [
  {
    title: 'Portfolio Journal',
    text: 'Monthly reflections on performance, mistakes, risk, and positioning.',
  },
  {
    title: 'Portfolio Record',
    text: 'A percentage-based record of current holdings, regular reviews, mistakes, decisions, and lessons from managing my own portfolio.',
  },
  {
    title: 'Investment Philosophy',
    text: 'A written explanation of how I think about patience, risk, quality businesses, cash discipline, and long-term ownership.',
  },
];

export const currentFocus = [
  'long-term compounding',
  'quality companies',
  'AI infrastructure',
  'broad market ETFs',
  'cash discipline',
  'gold as a hedge',
  'no leverage',
  'learning from mistakes',
  'protecting capital first',
];

export const startHere = [
  {
    eyebrow: 'First principle',
    title: 'Read the philosophy',
    text: 'Start with the core ideas behind the site: patience, risk control, quality businesses, and building a process that can outlast mistakes.',
    href: '/philosophy',
    action: 'Read philosophy',
  },
  {
    eyebrow: 'Current record',
    title: 'Review the portfolio',
    text: 'See the percentage-only snapshot of my own portfolio, including allocation, cash weight, closed lessons, and role-based structure.',
    href: '/portfolio',
    action: 'View portfolio record',
  },
  {
    eyebrow: 'Decision notes',
    title: 'Read the journal',
    text: 'Scroll through the portfolio reviews and trade reflections that show how the portfolio record is developing.',
    href: '/journal',
    action: 'Open journal',
  },
];

export const principles = [
  {
    title: 'Protect capital first.',
    text: 'Avoiding permanent loss matters more than chasing short-term performance.',
  },
  {
    title: 'Think like an owner.',
    text: 'The aim is to understand the business, not simply react to a ticker moving.',
  },
  {
    title: 'Keep written reasoning.',
    text: 'Every trade should have a clear reason before entry and a review after exit.',
  },
  {
    title: 'Size positions properly.',
    text: 'Position sizing is risk management, especially in a small account.',
  },
  {
    title: 'Stay patient with cash.',
    text: 'Cash gives flexibility and prevents forced buying when the setup is not right.',
  },
  {
    title: 'Review mistakes honestly.',
    text: 'Bad reasoning has to be named before it can be improved.',
  },
];

export const investmentRules = [
  'Protect capital first.',
  'No individual position should move above 10% of the portfolio without a written reason.',
  'Decide the exit plan before entering.',
  'Every trade needs written reasoning.',
  'Focus on quality companies, index ETFs, and clearly defined portfolio roles.',
  'Avoid hype, impulsive trades, and emotional decisions.',
  'Diversify across several stocks, ETFs, and selected hedges.',
  'Keep a short trade journal and regular summary.',
  'Treat learning and discipline as the primary goal.',
];

export const processRules = [
  {
    title: 'Protect capital first',
    text: 'Avoiding permanent loss matters more than chasing quick performance. The first job is to stay in the game, protect the account, and make sure every decision can be explained calmly after the fact.',
  },
  {
    title: 'Position sizing has to match risk',
    text: 'No individual position should move above 10% of the portfolio without a written reason. Higher-risk ideas can exist in the portfolio, but they need smaller sizing and stricter review.',
  },
  {
    title: 'Written reasoning before action',
    text: 'Every trade needs a reason before entry and a review after exit. If I cannot write down why I am buying, selling, trimming, or holding, I should not be doing it.',
  },
  {
    title: 'Cash discipline',
    text: 'Cash is not a failure to act. It gives flexibility when opportunities are not attractive and stops me from forcing trades just because money is available.',
  },
  {
    title: 'Avoid leverage',
    text: 'No leverage. Leveraged crypto trading taught me how quickly pressure can turn into gambling. I do not want leverage, revenge trading, or emotional overexposure driving the portfolio.',
  },
  {
    title: 'No impulsive trades',
    text: 'Avoid hype, panic, and quick emotional decisions. If a trade is only exciting because the price is moving, that is not enough.',
  },
  {
    title: 'Regular review process',
    text: 'Keep a monthly summary covering percentage performance, cash allocation, what helped, what hurt, trades made, mistakes, and the plan for the next period.',
  },
];

export const plannedLetters: PlannedLetter[] = [
  {
    slug: 'my-first-letter',
    title: 'My First Letter',
    date: '24 June 2026',
    type: 'Reflection',
    readingTime: '14 min read',
    status: 'Published',
    summary:
      'A first proper letter on why portfolio reviews are only part of the record, and why discipline, patience, risk, and process matter more than short-term account value.',
    themes: ['first letter', 'process', 'discipline', 'patience', 'risk', 'public record'],
    body: myFirstLetterBody,
  },
];

export const decisionArchiveEntries: DecisionArchiveEntry[] = [
  {
    slug: 'bought-spacex',
    date: 'Planned note',
    title: 'Bought SpaceX',
    holding: 'SpaceX / SPCX',
    action: 'Buy',
    positionType: 'Speculative',
    status: 'Open',
    summary: 'A future decision memo on why SpaceX was added as a small speculative long-term position.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Buy', 'Speculative', 'SpaceX'],
  },
  {
    slug: 'sold-asml-for-realised-profit',
    date: 'Planned note',
    title: 'Sold ASML for a realised profit',
    holding: 'ASML',
    action: 'Sell',
    positionType: 'Watchlist',
    status: 'Reviewed',
    summary: 'A future decision memo on taking profit in ASML and the difference between trimming and fully exiting.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Sell', 'Lesson', 'ASML'],
  },
  {
    slug: 're-entered-google-around-360',
    date: 'Planned note',
    title: 'Re-entered Google around $360',
    holding: 'Alphabet / GOOGL',
    action: 'Buy',
    positionType: 'Core holding',
    status: 'Open',
    summary: 'A future decision memo on price discipline, re-entry patience, and rebuilding a small Alphabet position.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Buy', 'Core holding', 'Google'],
  },
  {
    slug: 'added-to-gold-as-a-hedge',
    date: 'Planned note',
    title: 'Added to gold as a hedge',
    holding: 'iShares Physical Gold / SGLN',
    action: 'Add',
    positionType: 'Hedge',
    status: 'Open',
    summary: 'A future decision memo on gold as a hedge and why hedges can feel uncomfortable when they are not working every week.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Add', 'Hedge', 'Gold'],
  },
  {
    slug: 'averaged-down-symbotic',
    date: 'Planned note',
    title: 'Averaged down Symbotic',
    holding: 'Symbotic / SYM',
    action: 'Add',
    positionType: 'Speculative',
    status: 'Open',
    summary: 'A future decision memo on when averaging down is deliberate and when it risks becoming emotional.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Add', 'Speculative', 'Symbotic'],
  },
  {
    slug: 'microsoft-short-term-trade',
    date: 'Planned note',
    title: 'Microsoft short-term trade',
    holding: 'Microsoft / MSFT',
    action: 'Sell',
    positionType: 'Lesson',
    status: 'Closed',
    summary: 'A future decision memo on a profitable Microsoft trade and whether the decision was repeatable.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Sell', 'Lesson', 'Microsoft'],
  },
  {
    slug: 'held-rheinmetall-despite-weakness',
    date: 'Planned note',
    title: 'Held Rheinmetall despite weakness',
    holding: 'Rheinmetall / RHM',
    action: 'Hold',
    positionType: 'Watchlist',
    status: 'Open',
    summary: 'A future decision memo on separating thesis review from panic selling during weakness.',
    relatedWeeklyReview: 'capital-research-review-04',
    tags: ['Hold', 'Lesson', 'Rheinmetall'],
  },
];

export const mistakeLessons: MistakeLesson[] = [
  {
    slug: 'selling-winners-asml-trimming-vs-exiting',
    title: 'Selling winners: ASML and the difference between trimming and exiting',
    period: 'Planned lesson',
    summary: 'A future lesson on handling winners and deciding whether to trim, hold, or fully exit.',
    relatedLink: '/decision-archive/sold-asml-for-realised-profit',
    themes: ['winners', 'ASML', 'trimming', 'discipline'],
  },
  {
    slug: 'communication-discipline-recording-trades',
    title: 'Communication discipline: recording trades properly',
    period: 'Planned lesson',
    summary: 'A future lesson on keeping the record complete and writing decisions down before memory becomes vague.',
    relatedLink: '/journal/capital-research-review-04',
    themes: ['communication', 'record keeping', 'accountability'],
  },
  {
    slug: 'averaging-down-deliberate-vs-emotional',
    title: 'Averaging down: when it is deliberate versus emotional',
    period: 'Planned lesson',
    summary: 'A future lesson on averaging down, sizing, and making sure conviction is not just hope in disguise.',
    relatedLink: '/decision-archive/averaged-down-symbotic',
    themes: ['averaging down', 'position sizing', 'Symbotic'],
  },
  {
    slug: 'speculative-excitement-spacex-size-control',
    title: 'Speculative excitement: keeping SpaceX position size controlled',
    period: 'Planned lesson',
    summary: 'A future lesson on owning exciting ideas without letting excitement drive portfolio size.',
    relatedLink: '/decision-archive/bought-spacex',
    themes: ['SpaceX', 'speculation', 'position sizing'],
  },
  {
    slug: 'cash-discipline-not-forcing-trades',
    title: 'Cash discipline: not forcing trades just because cash is available',
    period: 'Planned lesson',
    summary: 'A future lesson on treating cash as patience and optionality rather than pressure to act.',
    relatedLink: '/process',
    themes: ['cash', 'patience', 'discipline'],
  },
  {
    slug: 'gold-hedge-will-not-work-every-week',
    title: 'Gold hedge: understanding that a hedge will not work every week',
    period: 'Planned lesson',
    summary: 'A future lesson on why a hedge can be useful even when it is not the best-performing part of the portfolio.',
    relatedLink: '/decision-archive/added-to-gold-as-a-hedge',
    themes: ['gold', 'hedge', 'portfolio balance'],
  },
  {
    slug: 'risk-management-why-leverage-does-not-belong',
    title: 'Risk management: why leverage does not belong in this portfolio',
    period: 'Planned lesson',
    summary: 'A future lesson on leveraged crypto trading, emotional pressure, and why leverage does not fit the process.',
    relatedLink: '/about',
    themes: ['leverage', 'risk management', 'mistakes'],
  },
];

export const portfolioRoles = currentPortfolio.roles;

export const latestPortfolioReview = {
  label: currentPortfolio.latestReview.label,
  title: currentPortfolio.latestReview.title,
  slug: currentPortfolio.latestReview.slug,
  date: currentPortfolio.latestReview.published,
  shortDate: '6 Aug 2026',
  mainNewTrade: currentPortfolio.latestReview.latestDecision,
};

export const portfolioSnapshot = {
  currentReturn: `${currentPortfolio.latestReview.sinceInceptionReturn >= 0 ? '+' : ''}${currentPortfolio.latestReview.sinceInceptionReturn.toFixed(2)}%`,
  cashWeight: `${currentPortfolio.latestReview.cashWeight.toFixed(0)}%`,
  status: `Latest authored review through ${currentPortfolio.latestReview.allocationAsOf}`,
  asOfDate: currentPortfolio.latestReview.allocationAsOf,
  allocationBasis: currentPortfolio.allocationBasis,
  mainFocus: 'Stay patient, keep every allocation tied to a written role, and only act when both the opportunity and process are strong.',
  updateNote: currentPortfolio.measuredPerformance.basis,
};

export const readingDevelopment: ReadingBook[] = [
  {
    slug: 'the-dhandho-investor',
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
    takeaway: 'Look for simple, understandable opportunities where the downside is limited and the upside is meaningful.',
  },
  {
    slug: 'the-most-important-thing',
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
    takeaway: 'Do not just follow the crowd. Think independently, understand risk, and be patient when markets become emotional.',
  },
  {
    slug: 'the-intelligent-investor',
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
    takeaway: 'Investing should be based on discipline, intrinsic value, patience, and protecting capital.',
  },
  {
    slug: 'the-alchemist',
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
    takeaway: 'The journey, the lessons, and the person you become are just as important as the final result.',
  },
  {
    slug: 'the-art-of-spending-money',
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
    takeaway: 'Do not increase your lifestyle just because your income rises. Spend intentionally and use money to build long-term freedom.',
  },
  {
    slug: 'mans-search-for-meaning',
    title: 'Man’s Search for Meaning',
    author: 'Viktor Frankl',
    category: 'Purpose / Resilience / Perspective',
    image: '/book-covers/mans-search-for-meaning.jpeg',
    imageAlt: 'Man’s Search for Meaning book image.',
    paragraphs: [
      "Man's Search for Meaning was a deeply personal book for me. It taught me about what happened in the concentration camps and showed me a level of human suffering and resilience that I had never properly understood before.",
      'While reading it, my mind was genuinely blown by what people were able to endure. I did not realise human beings were capable of going through such extreme suffering and still finding meaning, purpose, and strength. It made me think very seriously about how lucky we are today, how careful we need to be with our decisions, and how important it is to treat other people properly.',
      'The book also taught me that meaning can help people survive incredibly difficult situations. That lesson applies far beyond history. It applies to personal setbacks, pressure, mistakes, and difficult periods in life. For my investing journey, it gives me perspective. A bad week in the market, a losing trade, or a mistake is not the end of the world. What matters is how I respond, what I learn, and whether I keep moving forward with purpose.',
    ],
    takeaway: 'Human beings are incredibly resilient, and having meaning can help you endure almost anything.',
  },
  {
    slug: 'the-tipping-point',
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
    takeaway: 'Small actions, habits, ideas, and trends can compound quietly before reaching a point where they suddenly accelerate.',
  },
  {
    slug: 'material-world',
    title: 'Material World',
    author: 'Ed Conway',
    category: 'Commodities / Supply Chains / Civilisation / Investing',
    image: '/book-covers/material-world.jpg',
    imageAlt: 'Material World book cover.',
    paragraphs: [
      'Material World completely changed the way I look at the modern world. The book explains how six basic materials, sand, salt, iron, copper, oil, and lithium, are the foundation of civilisation as we know it today. Before reading it, I understood that materials and commodities were important, but I did not properly appreciate how deeply they sit underneath almost everything we use.',
      'Sand stood out to me the most. It was the first material covered in the book, and it immediately hooked me because I had never really thought about sand as one of the most important substances in the world. From concrete and glass to the technology behind semiconductors, it made me realise that the modern world is not as “weightless” or digital as it sometimes seems. Even the most advanced companies still depend on physical materials, huge supply chains, and years of human knowledge.',
      'What blew my mind most was how all these materials work together. Without one of them, the world would look completely different. Copper is needed for electricity, oil has powered modern industry, iron built the physical world around us, and lithium is becoming more important as the world moves towards batteries and electrification. The book also made me think more seriously about companies such as ASML and the semiconductor supply chain, because it showed how complicated and fragile the systems behind modern technology really are.',
      'It also made me think about the uncomfortable side of progress. Mining can be destructive, and some of the stories in the book showed how much damage can be done to land, history, and local communities. At the same time, the world still depends on these materials, and demand is likely to keep increasing. That tension is something I found really important. It made me realise that investing in the future is not only about looking at exciting technologies, but also understanding the raw materials, supply chains, and physical foundations that make those technologies possible.',
      'For my own investing journey, this book reminded me to look beneath the surface. A company might look like a software, technology, or clean energy business, but behind it there are often mines, factories, logistics networks, energy needs, and scarce resources. Material World made me want to become better at understanding the full chain behind an investment, not just the company name or share price.',
    ],
    takeaway:
      'The modern world is built on physical materials, and understanding them helps me understand the real foundations of businesses, technology, and future investment opportunities.',
  },
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Habits / Discipline / Personal Development',
    image: '/book-covers/atomic-habits.jpeg',
    imageAlt: 'Atomic Habits book cover.',
    paragraphs: [
      'I started reading Atomic Habits at the beginning of the year because I had started developing a few bad habits at university. They were things that I knew were not healthy for me, especially in the long term. I knew that if I wanted to get to where I wanted to be in life, I needed to stop doing them. The problem was that I did not really know how to stop. I wanted to become more disciplined and consistent, but I did not have any sort of framework to work with.',
      'I had heard a lot of people say that Atomic Habits was an incredible book, so I decided to read it. To be honest, it definitely lived up to its reputation. It was really easy to understand, genuinely useful, and probably one of the best personal-development books I have read.',
      'The main thing I took from the book was the idea of becoming 1% better every day. One small improvement does not seem like it is going to change much, but when you continue doing it over a long period, it starts to compound. The same thing can happen with bad habits. One bad decision might not feel particularly serious, but if you continue making that same decision every day, it can slowly become part of your normal routine.',
      'That was something I began to notice in myself. Some of the habits I had developed were slowly starting to become part of who I was. I was lucky that I noticed it early enough to change them before they became a proper part of my identity.',
      'Another big lesson for me was focusing more on systems rather than only focusing on goals. It is easy to say that you want to become more disciplined, healthier, more successful, or more consistent. However, saying that does not actually change anything. You need to create a system and an environment that makes it easier for you to do the right things.',
      'The book made me realise how much my environment was affecting my behaviour. A lot of the bad habits I had created started because of the environments I was putting myself in. Those environments then created routines, and eventually those routines started to feel normal.',
      'Probably the most useful thing I learned from the entire book was to never miss twice. The idea is that you are never going to be perfect. You are going to make mistakes, break habits, or miss days. However, you should never allow yourself to do it twice in a row.',
      'For example, if you are trying to stop doing something and you fall back into it one day, you should make sure you do not repeat it again the following day. One mistake does not have to destroy all the progress you have already made.',
      'I have used this idea a lot with writing. I have always enjoyed writing, and ideally I would like to write something every day. However, I had become really inconsistent with it. Since reading the book, I have tried to follow the rule that missing one day is not good, but it is okay. What I cannot do is miss two days in a row.',
      'At first, this was quite difficult, but over time it has worked really well for me. Instead of missing one day and then completely falling out of the routine, I make sure I get back into it the following day.',
      'I have also used the ideas from the book to stop some of the bad habits I had developed. I am obviously not perfect, and there are still things I need to improve, but the book gave me a much better way of thinking about discipline.',
      'Before reading it, I think I viewed discipline as something you either had or did not have. Now I think it is something you can build through your environment, your routines, and the small decisions you make every day.',
      'The book also applies to investing. Being a good investor is not just about finding one incredible company or making one great trade. It is about building good habits around researching businesses, controlling your emotions, reviewing your mistakes, and continuing to learn.',
      'Overall, Atomic Habits taught me that I do not need to completely change my life overnight. I just need to make slightly better decisions, repeat them consistently, and make sure that whenever I make a mistake, I do not allow it to happen twice in a row.',
    ],
    takeaway:
      'Small decisions do not feel important at the time, but when you repeat them every day, they eventually have a massive effect on the person you become and the direction your life goes in.',
  },
  {
    slug: 'the-world-for-sale',
    title: 'The World for Sale',
    author: 'Javier Blas & Jack Farchy',
    category: 'Commodities / Geopolitics / Supply Chains / Investing',
    image: '/book-covers/the-world-for-sale.jpg',
    imageAlt: 'The World for Sale book cover.',
    paragraphs: [
      'The World for Sale gave me a completely different perspective on the commodity traders who operate behind much of the global economy. Before reading it, I understood the importance of oil, metals and other raw materials, but I had never really appreciated how much influence the people buying, selling and transporting these commodities can have.',
      'What interested me most were the stories of the traders themselves. These were people operating across countries, political systems and sometimes extremely unstable environments, often making enormous decisions with very little attention from the wider public. The book showed how companies and individual traders could become deeply involved in major political and economic events simply because governments and entire economies depended on the commodities they controlled.',
      'The biggest thing I took away from the book, though, was the risk created by global dependence. Modern economies are incredibly interconnected. A country can depend on another country for energy, metals, food or other essential resources, and when politics, war or economic disruption gets involved, that dependence can quickly become a weakness.',
      'From an investing perspective, this was probably the most valuable lesson for me. Markets are not just driven by company earnings or whether a business is well managed. Supply chains, natural resources, governments, geopolitics and access to essential commodities can all have a huge impact on what eventually happens to companies and economies.',
      'It has made me think more carefully about what sits behind an investment. Instead of only looking at the company itself, I want to understand what that company depends on, where its resources come from and what could happen if those relationships were disrupted.',
      'Overall, I really enjoyed the book. It opened up an area of the financial world that I knew relatively little about and made the connection between commodities, politics and investing much clearer to me.',
    ],
    takeaway:
      'Look beyond the company itself: supply chains, natural resources, governments, geopolitics and access to essential commodities can shape what happens to businesses and economies.',
  },
  {
    slug: 'the-coming-wave',
    title: 'The Coming Wave',
    author: 'Mustafa Suleyman',
    category: 'Artificial Intelligence / Technology / Government / Risk',
    image: '/book-covers/the-coming-wave.jpg',
    imageAlt: 'The Coming Wave book cover.',
    paragraphs: [
      "The Coming Wave made me think much more seriously about the risks that come with increasingly powerful technology, particularly artificial intelligence. What interested me most wasn't simply how capable AI could become, but whether governments and society are actually prepared for the speed at which these technologies are developing.",
      'My biggest takeaway from the book was how difficult it is going to be to control technology once it becomes widely available. Throughout history, powerful new technologies have eventually spread, and AI seems likely to be no different. The difference this time is the scale and speed at which it could happen.',
      'What I found particularly interesting was the position governments are in. Technology is developing incredibly quickly, while governments, regulations and institutions generally move much more slowly. It left me questioning whether the systems we currently rely on are capable of dealing with something as significant as advanced AI.',
      "The part that stayed with me most was what all of this could ultimately mean for humanity. AI has the potential to create huge improvements in productivity, science, medicine and everyday life, but the same technology can also create risks that are difficult to predict or contain. That doesn't necessarily mean the technology should be stopped, but it does mean we need to take the risks seriously rather than assuming we will always be able to control what we create.",
      "Overall, The Coming Wave made me both more excited and more cautious about AI. I still think the opportunities are enormous, but the book made me realise that technological progress alone isn't enough. One of the biggest challenges of the coming decades may be whether our governments and institutions can adapt quickly enough to manage it.",
    ],
    takeaway:
      'One of the biggest challenges of the coming decades may be whether our governments and institutions can adapt quickly enough to manage increasingly powerful technology.',
  },
  {
    slug: 'good-to-great',
    title: 'Good to Great',
    author: 'Jim Collins',
    category: 'Leadership / Management / Business / Investing',
    image: '/book-covers/good-to-great.jpg',
    imageAlt: 'Good to Great book cover.',
    paragraphs: [
      'Good to Great made me think differently about what actually creates long-term success in a business. There are obviously lots of factors involved, but the biggest takeaway for me was that ultimately it comes back to people.',
      "The idea that stayed with me most was Level 5 Leadership. I found it interesting that some of the most successful leaders weren't necessarily the loudest, most charismatic or most publicly recognised. Instead, Collins describes leaders who combine huge ambition for the organisation with a surprising amount of humility. They care more about building something that lasts than about receiving personal credit for it.",
      'That challenged the stereotypical image I had of what a great CEO or leader should look like. You often hear about the larger-than-life founders and executives who dominate the companies they run, but Good to Great showed me that strong leadership can actually be much quieter. What matters is the standard they set, the people they surround themselves with and the decisions they make over a long period of time.',
      'The wider lesson for me was that people drive success. Strategy, technology and opportunities are important, but having the right people in the right positions seems to come before almost everything else. A great idea with the wrong people behind it can easily fail, while the right group of people can adapt when circumstances change.',
      'From an investing perspective, it also made me think more about management when looking at companies. Financial results tell you what a business has already achieved, but understanding the people allocating capital and making long-term decisions can tell you much more about where that business might eventually go.',
      "Overall, Good to Great reinforced the idea that genuinely great businesses aren't built overnight. They are built through disciplined decisions, strong people and leadership that thinks beyond the next quarter. The biggest lesson I took from it is that if you want something to succeed over the long term, getting the people right is one of the most important places to start.",
    ],
    takeaway:
      'If you want something to succeed over the long term, getting the people right is one of the most important places to start.',
  },
  {
    slug: 'the-outsiders',
    title: 'The Outsiders',
    author: 'William N. Thorndike Jr.',
    category: 'Capital Allocation / Leadership / Business / Investing',
    image: 'https://gyaanstore.com/cdn/shop/files/18_d2b2fef0-3bcb-447b-b176-885e98f06eb6.png?v=1701911834',
    imageAlt: 'The Outsiders by William N. Thorndike Jr. book cover.',
    paragraphs: [
      'The Outsiders made me think more carefully about what actually separates a great CEO from an average one. Before reading it, I mainly thought about CEOs in terms of how well they could grow a business, manage people and improve operations. The book showed me that one of the most important responsibilities of a CEO is actually capital allocation — deciding what to do with the cash a business produces.',
      'What stood out to me most was how differently the CEOs in the book approached decisions such as acquisitions, share buybacks and reinvestment. They were not particularly interested in following what other companies were doing or making decisions that looked impressive from the outside. They treated each decision as an investment. If buying another company offered an attractive return, they would make an acquisition. If their own shares were undervalued, they were willing to buy back large amounts of stock. If neither option made sense, they were comfortable holding cash and waiting.',
      'The section on share buybacks gave me a much better appreciation of how powerful they can be when used properly. I already understood the basic idea of a company buying back its own shares, but the book made me think more carefully about how important the price paid actually is. If a company buys back shares when they are undervalued, the remaining shareholders end up owning a larger percentage of the business without having to invest any more money themselves. That can be an excellent use of capital.',
      'However, a buyback is not automatically a good decision. If management buys back shares simply because it has excess cash, especially when the shares are expensive, it can be a poor use of that money. What I took from this is that buybacks should be judged in the same way as any other investment — by the price paid and the return that capital is likely to produce.',
      'The same applies to acquisitions. One of the ideas I appreciated more after reading the book was that making a company bigger does not necessarily make it more valuable. A CEO can grow revenue, expand into new markets and complete large acquisitions while still destroying shareholder value if they consistently overpay.',
      'What stood out about the CEOs in The Outsiders was their discipline. They treated acquisitions like investments rather than trophies. They were willing to act decisively when the economics were attractive, but they were also comfortable walking away and doing nothing when the numbers did not make sense. I liked this because it reinforced the idea that good capital allocation is not about constantly making deals or chasing growth. Sometimes the best decision is simply to wait.',
      'My biggest practical takeaway from the book is that running a business well is only part of the job. Once a company starts generating cash, deciding what happens to that cash becomes incredibly important. It can be reinvested into the existing business, used to acquire another company, returned to shareholders through dividends, used to repurchase shares or kept until a better opportunity appears.',
      'This is probably the lesson I want to apply most to businesses I am involved with in the future. I want to think about company money in the same way I think about investing: every pound has an opportunity cost. Rather than spending money simply because it is available or chasing growth for the sake of getting bigger, I want to ask where that capital can generate the best return while still keeping the risks sensible.',
      'For me, The Outsiders showed that some of the best CEOs are also exceptional investors. They think independently, stay disciplined and understand that creating long-term value often comes down to one simple question:',
    ],
    takeaway:
      'Treat every capital-allocation decision as an investment and put each pound where it can earn the best sensible return.',
    closingQuestion: 'What is the best use of the next pound of capital?',
    lastUpdated: '2026-08-11',
  },
  {
    slug: 'poor-charlies-almanack',
    title: 'Poor Charlie’s Almanack',
    author: 'Charlie Munger',
    category: 'Investing / Mental Models / Psychology / Decision-Making',
    image: '/book-covers/poor-charlies-almanack.jpg',
    imageAlt: 'Poor Charlie’s Almanack book cover.',
    paragraphs: [
      'Munger repeatedly makes the point that you do not need to make brilliant decisions all the time to achieve good results. A huge amount can be achieved simply by avoiding stupidity, recognising common mistakes and staying away from situations where the odds are against you.',
      'This resonated with me particularly because of my own experience with trading. One of the biggest things I have been learning is how damaging impulsive decisions can be. Sometimes the best decision is simply to do nothing. Patience is key, especially when it comes to long-term investing, and feeling as though you always need to be making a trade can lead you into decisions you would never make if you stopped and thought properly.',
      'It also made me appreciate the idea of inversion. If you are trying to become a better investor, for example, studying what causes investors to consistently lose money can be just as useful as studying the people who have succeeded. If impatience, excessive leverage, emotional decision-making, overconfidence and following the crowd repeatedly lead to poor outcomes, then deliberately avoiding those behaviours already puts you in a much stronger position.',
      "Sometimes succeeding is less about constantly asking, “What brilliant thing should I do?” and more about asking, “What obvious mistakes do I need to make sure I don't make?”",
      'I had wanted to read Poor Charlie’s Almanack for a long time. I had heard so many good things about Charlie Munger and the way he thought, and the book definitely lived up to my expectations.',
      'Munger was obviously an incredible investor, but what I found most interesting was how much of his wisdom extended beyond investing. Some of my favourite parts of the book were actually his thoughts on psychology, human behaviour, learning and decision-making.',
      'One of the ideas I appreciated most was his concept of developing a latticework of mental models. Rather than becoming knowledgeable in only one area, Munger believed in learning the important ideas from a wide range of disciplines and then connecting them together.',
      'Over his life he drew ideas from subjects such as mathematics, psychology, economics, science and history and used them to improve the way he approached completely different problems.',
      'I really related to this. I have always been interested in a wide range of subjects, and the book reinforced my belief that this can be a huge advantage. Learning something in one area often gives you a completely different way of looking at a problem somewhere else. The more useful ideas you have available to you, the more ways you have of understanding what is actually going on.',
      "Another major part of the book that stood out to me was Munger's understanding of psychology and human misjudgement.",
      'One example that stuck with me was his discussion of Judith Rich Harris and the influence that peer groups can have on children. The basic idea is that the people children surround themselves with can have an enormous influence on their behaviour and development.',
      'I found this fascinating because the lesson extends far beyond children. The people we surround ourselves with affect the way we think, behave and make decisions. In investing, the same psychological forces can cause people to follow the crowd simply because everyone around them appears to believe the same thing.',
      'It was another reminder of how important independent thinking is.',
      "Munger's discussion of incentives also made a lot of sense to me. People respond strongly to the incentives placed in front of them, sometimes without even realising it.",
      'I can relate to this personally through work. There is obviously a financial incentive to work harder when you are being paid well, but it is not purely about money. How well you are treated also makes a significant difference to how motivated you are and how much effort you are willing to put in.',
      "It seems obvious when you say it, but it is easy to forget when looking at other people's behaviour. Rather than immediately asking why someone is behaving in a certain way, it can be useful to first ask: what are they being incentivised to do?",
      'That is something I think can be useful when looking at employees, managers, businesses and investments.',
      'One of the simplest lessons in the book was also one of the ones that stayed with me most.',
      "Munger discusses Carl Braun's approach to giving people instructions. The important part was not simply telling someone what needed to be done, but also explaining why they were being asked to do it.",
      'I thought this was incredibly useful.',
      'If somebody understands the reasoning behind a task, they are much more capable of thinking for themselves while completing it. They are no longer blindly following an instruction; they understand the outcome that is actually trying to be achieved.',
      'It is a very small idea, but I can see it being extremely valuable in business. If I am ever managing people or asking someone to do something important, I want to remember to explain the reasoning behind it rather than simply telling them what to do.',
      'Overall, what I liked most about Munger was the way he approached life as a continuous process of learning.',
      'He was rational, incredibly curious and willing to learn from almost anywhere. He understood that human beings are naturally prone to making irrational decisions, and instead of assuming he was immune to those mistakes, he tried to build systems of thinking that helped him avoid them.',
      'That is probably what I will remember most from Poor Charlie’s Almanack.',
      "You don't have to know everything. You don't have to constantly be doing something. And you don't have to make genius decisions every day.",
      "Learn broadly, understand incentives, think independently, be patient and become very good at avoiding the mistakes that repeatedly destroy other people's results.",
    ],
    takeaway:
      'My biggest takeaway from Poor Charlie’s Almanack was the importance of learning what not to do, as well as what to do.',
    lastUpdated: '2026-08-18',
  },
];

export const transactionSummary = [
  { label: 'Latest published review', value: latestPortfolioReview.label },
  { label: 'Allocation reviewed', value: portfolioSnapshot.asOfDate },
  { label: 'Cash allocation', value: portfolioSnapshot.cashWeight },
  { label: 'Latest decision', value: currentPortfolio.latestReview.latestDecision },
];

export const holdings: Holding[] = [...currentPortfolio.holdings];

export const portfolioChangeLog: PortfolioChange[] = [
  {
    date: '8 July 2026',
    type: 'Buy',
    title: 'Re-entered Microsoft with a small position',
    text: 'Re-entered Microsoft with a deliberately small allocation. The decision is included in Review 05 and the current percentage-based allocation record.',
  },
  {
    date: '2 July 2026',
    type: 'Lesson',
    title: 'Closed Robinhood profitably as a process lesson',
    text: 'Opened Robinhood during a live event and closed it quickly for a small profit, but recorded it as an emotional-process warning rather than a repeatable trade.',
  },
  {
    date: '23 June 2026',
    type: 'Buy',
    title: 'Opened Pershing Square Holdings',
    text: 'Added a small Pershing Square Holdings allocation for discount-to-NAV exposure and a long-term investor-led holding.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '16 June 2026',
    type: 'Update',
    title: 'Latest transaction export reviewed',
    text: 'The rounded allocation record was reviewed against the latest private transaction export through 16 June 2026. Public pricing remains a manually reviewed item.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '12 June 2026',
    type: 'Buy',
    title: 'Opened a small SpaceX position',
    text: 'Added a small speculative long-term position for exposure to space infrastructure, satellites, Starlink, and future optionality.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '11 June 2026',
    type: 'Buy',
    title: 'Added to Symbotic',
    text: 'A deliberate average down in the robotics and warehouse automation sleeve, with the position still treated as higher volatility.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '9 June 2026',
    type: 'Sell',
    title: 'Sold ASML for a realised gain',
    text: 'Closed ASML to lock in profit and raise cash. The lesson is to protect capital while still learning how much room to give high-quality winners.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '9 June 2026',
    type: 'Buy',
    title: 'Added to gold hedge',
    text: 'Increased the iShares Physical Gold allocation to reduce the average cost and strengthen the macro hedge in the portfolio.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '3 June 2026',
    type: 'Buy',
    title: 'Rebuilt a small Alphabet position',
    text: 'Bought Google/Alphabet back near the planned level after earlier profit-taking, keeping the entry small and disciplined.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '1 June 2026',
    type: 'Sell',
    title: 'Closed Microsoft profitably',
    text: 'Locked in a profitable Microsoft trade and kept the decision in the record as a process review rather than a recommendation.',
    relatedSlug: 'capital-research-review-04',
  },
  {
    date: '15 May 2026',
    type: 'Trim',
    title: 'Trimmed Nasdaq exposure',
    text: 'Trimmed the QQQA allocation after strength, creating more flexibility while keeping broad technology-led exposure.',
    relatedSlug: 'capital-research-review-03',
  },
  {
    date: '7 April 2026',
    type: 'Lesson',
    title: 'Closed IonQ as a sizing lesson',
    text: 'Closed the speculative quantum position at a loss. The main lesson was that exciting themes still need controlled sizing and clear reasoning.',
    relatedSlug: 'capital-research-review-02',
  },
];

export const standaloneJournalEntries: JournalEntry[] = [
  {
    slug: 'why-the-rulebook-exists',
    title: 'Why the Rulebook Exists',
    date: '9 June 2026',
    category: 'Lessons',
    excerpt: 'The rulebook is not abstract. It comes from early crypto profits, leverage mistakes, borrowed money, and the decision to treat investing as a serious long-term craft.',
    body: [
      'I first became interested in markets during the first week of the COVID-19 lockdown. I was fourteen, and my father asked me and my siblings to each choose an online course. I picked a stock trading course on Udemy, taught by Mohsin Hassan, and then completed a more advanced course afterwards.',
      'That early interest moved into crypto. I made money quickly, mostly through luck, then borrowed money from my parents and made more. The lesson looked positive at first, but the process was not mature.',
      'The mistake came from leverage. I started trading crypto with leverage and eventually lost most of the money. I also tried different crypto projects with a friend, but the overall result was the same: most of the early money was gone.',
      'That is why the rulebook matters. I do not use leverage to trade, I do not borrow aggressively to invest, and I want this portfolio to be built through disciplined ownership of real businesses rather than gambling behaviour.',
    ],
  },
  {
    slug: 'google-re-entry-plan',
    title: 'Google Re-entry Plan',
    date: '5 May 2026',
    category: 'Market Notes',
    excerpt: 'Why a great business can still require patience, and why sitting in cash can be the correct action while waiting for a better setup.',
    body: [
      'Alphabet remains a business worth studying, but quality alone does not remove the need for entry discipline.',
      'The plan is to define what would make the price attractive, what would break the thesis, and how large the position should be before any trade is made.',
    ],
  },
  {
    slug: 'microsoft-trade-reflection',
    title: 'Microsoft Trade Reflection',
    date: '29 April 2026',
    category: 'Trade Reflections',
    excerpt: 'A profitable trade can still teach process lessons. The question is whether the decision was repeatable, not just whether it worked.',
    body: [
      'The Microsoft trade closed for roughly 10% profit. That is a good outcome, but the review has to focus on process quality.',
      'The useful question is whether the entry, size, patience, and exit were all supported by written reasoning that could be repeated.',
    ],
  },
];

export const journalEntries: JournalEntry[] = [...monthlyPortfolioReviews].reverse().concat(standaloneJournalEntries);

const legacyReviewWeeks = [18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const legacyJournalRedirects: Record<string, string> = Object.fromEntries(
  legacyReviewWeeks.map((week) => {
    const destination =
      week >= 1 && week <= 4
        ? '/journal/capital-research-review-01'
        : week >= 5 && week <= 8
          ? '/journal/capital-research-review-02'
          : week >= 9 && week <= 12
            ? '/journal/capital-research-review-03'
            : week >= 13 && week <= 16
              ? '/journal/capital-research-review-04'
              : '/journal';

    return [`week-${week}-portfolio-summary`, destination];
  }),
);

export const researchNotes: ResearchNote[] = [
  {
    slug: 'alphabet-re-entry-discipline',
    title: 'Alphabet: Re-entry Discipline',
    category: 'Company Notes',
    status: 'Current holding',
    ticker: 'GOOGL',
    portfolioRole: 'Quality growth holding / AI and platform scale',
    riskLevel: 'Medium',
    researchFocus: 'Price discipline, business quality, and re-entry patience',
    decisionImpact: 'Helped frame the decision to rebuild a smaller Alphabet position instead of chasing the earlier sale price.',
    lastUpdated: 'June 2026',
    excerpt: 'Why a great business can still require patience on price.',
    body: [
      'Alphabet is a high-quality business, but quality does not automatically create a margin of safety.',
      'The research note focuses on patience, valuation discipline, and what must be true before re-entering the position.',
    ],
  },
  {
    slug: 'asml-ai-infrastructure-thesis',
    title: 'ASML and the AI Infrastructure Thesis',
    category: 'Company Notes',
    status: 'Sold / lesson',
    ticker: 'ASML',
    portfolioRole: 'AI infrastructure watchlist name after a profitable sale',
    riskLevel: 'Medium',
    researchFocus: 'Semiconductor equipment quality, cyclicality, valuation, and when to let winners run',
    decisionImpact: 'Turned the ASML sale into a process lesson about trimming versus fully exiting high-quality winners.',
    lastUpdated: 'June 2026',
    excerpt: 'Understanding the role of semiconductor equipment in long-term AI growth.',
    body: [
      'ASML sits upstream of many AI infrastructure ambitions. That makes the business strategically important, but not immune to valuation risk.',
      'The note studies business quality, cyclicality, customer concentration, and whether the position size reflects the uncertainty.',
    ],
  },
  {
    slug: 'gold-as-a-portfolio-hedge',
    title: 'Gold as a Portfolio Hedge',
    category: 'Risk Management',
    status: 'Current holding',
    ticker: 'SGLN',
    portfolioRole: 'Macro hedge and portfolio stabiliser',
    riskLevel: 'Lower',
    researchFocus: 'Why a hedge can be useful even when it feels uncomfortable to hold',
    decisionImpact: 'Clarifies why gold is held for balance and stress protection, not excitement or short-term return chasing.',
    lastUpdated: 'June 2026',
    excerpt: 'Why a hedge can still be uncomfortable to hold when markets are strong.',
    body: [
      'A hedge can feel unproductive when risk assets are rising. That discomfort is part of why the role has to be defined before it is needed.',
      'Gold is reviewed as a portfolio stabiliser, not as a promise of return or a reason to ignore valuation elsewhere.',
    ],
  },
  {
    slug: 'handling-winners',
    title: 'Handling Winners',
    category: 'Portfolio Construction',
    status: 'Portfolio rule',
    portfolioRole: 'Process note for profitable positions',
    riskLevel: 'Medium',
    researchFocus: 'When to trim, when to hold, and how to avoid selling just because a gain exists',
    decisionImpact: 'Creates a review framework for winners like QQQA, VUAG, SpaceX, and previously ASML.',
    lastUpdated: 'June 2026',
    excerpt: 'Learning when to trim, when to hold, and when not to let fear control profitable positions.',
    body: [
      'Handling winners is difficult because both greed and fear can pretend to be discipline.',
      'The note studies how to review valuation, thesis strength, concentration, and tax or frictional costs before trimming.',
    ],
  },
  {
    slug: 'rheinmetall-risk-review',
    title: 'Rheinmetall Risk Review',
    category: 'Watchlist',
    status: 'Current holding',
    ticker: 'RHM',
    portfolioRole: 'Thematic defence exposure under review',
    riskLevel: 'Higher',
    researchFocus: 'Separating a still-interesting defence theme from position-level drawdown risk',
    decisionImpact: 'Keeps the Rheinmetall position under stricter review without forcing a panic sale.',
    lastUpdated: 'June 2026',
    excerpt: 'Separating long-term defence demand from short-term price weakness.',
    body: [
      'The Rheinmetall review separates the long-term demand story from the practical risk of short-term price weakness.',
      'The question is not whether the theme is interesting. The question is whether the position size and entry price are sensible for the account.',
    ],
  },
];

export const rulebook = [
  'Protect capital first.',
  'No individual position should move above 10% of the portfolio without a written reason.',
  'Decide the exit plan before entering.',
  'Every trade needs written reasoning.',
  'Focus on quality companies, index ETFs, and clearly defined portfolio roles.',
  'Avoid hype, impulsive trades, and emotional decisions.',
  'Diversify across several stocks, ETFs, and selected hedges.',
  'Do not let one position dominate the portfolio.',
  'Separate thesis breaks from price volatility.',
  'Keep cash for opportunity.',
  'Review the portfolio regularly.',
  'Keep a short trade journal and regular summary.',
  'Treat learning and discipline as the primary goal.',
  'Learn from mistakes without hiding them.',
  'Never confuse a good outcome with a good decision.',
  'Never confuse a bad short-term result with a broken thesis.',
  'Communicate clearly before making major decisions if money involves family.',
  'Do not use leverage to trade.',
  'Do not borrow aggressively to invest.',
  'Do not chase performance because markets are rising.',
];

export const weeklyChecklist = [
  'Percentage performance updated',
  'Return and drawdown calculated',
  'Holdings reviewed',
  'Cash allocation reviewed',
  'Trades logged',
  'Entry reasons recorded',
  'Exit reasons recorded',
  'Position sizing checked',
  'Main lesson written',
  "Next week's watchlist prepared",
];

export const disclaimerPoints = [
  'This website is a personal investment research and portfolio journal.',
  'It is not investment advice.',
  'I am not FCA-authorised.',
  'I do not manage money for other people.',
  'Nothing on this site should be treated as a recommendation to buy, sell, or hold any investment.',
  'All trades, holdings, research notes, and opinions shown here relate to my own personal portfolio and my own decision-making process.',
  'Do not copy my trades.',
  'Investments can go down as well as up.',
  'Past performance does not guarantee future results.',
  'The site may include mistakes, outdated information, or personal opinions.',
  'Always do your own research and seek professional advice where appropriate.',
];
