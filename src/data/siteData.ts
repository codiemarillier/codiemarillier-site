import { myFirstLetterBody } from './myFirstLetter';

export type NavLink = {
  label: string;
  href: string;
};

export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  category: 'Weekly Reviews' | 'Trade Reflections' | 'Market Notes' | 'Lessons';
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
  positionSize: string;
  sleeve: string;
  role: string;
  status: string;
  transactionNote: string;
};

export type ReadingBook = {
  title: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  takeaway: string;
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

export type PortfolioValuePoint = {
  week: number;
  label: string;
  date: string;
  value: number;
  valueLabel: string;
  source: 'Baseline' | 'Recorded' | 'Approximate';
  note?: string;
};

export const brand = {
  name: 'Codie Capital Research',
  subtitle: 'An investment journal by Codie Marillier',
  disclaimer:
    'This website is a personal investment research and portfolio journal. It is not investment advice. I am not FCA-authorised, I do not manage money for other people, and nothing on this site should be treated as a recommendation to buy, sell, or hold any investment. All trades, holdings, research notes, and opinions shown here relate to my own personal portfolio and my own decision-making process. Do not copy my trades. Always do your own research and seek professional advice where appropriate.',
};

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
    text: 'Weekly reflections on performance, mistakes, risk, and positioning.',
  },
  {
    title: 'Portfolio Record',
    text: 'A record of current holdings, weekly reviews, mistakes, decisions, and lessons from managing my own portfolio.',
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
    text: 'See the manual snapshot of my own portfolio, including current holdings, cash, closed lessons, and role-based structure.',
    href: '/portfolio',
    action: 'View portfolio record',
  },
  {
    eyebrow: 'Decision notes',
    title: 'Read the journal',
    text: 'Scroll through the weekly reviews and trade reflections that show how the portfolio record is developing.',
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
  'Keep a short trade journal and weekly summary.',
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
    title: 'Weekly review process',
    text: 'Keep a short weekly summary covering account value, cash, what helped, what hurt, trades made, mistakes, and the plan for the next week.',
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
      'A first proper letter on why the weekly reviews are only part of the record, and why discipline, patience, risk, and process matter more than short-term account value.',
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
    relatedWeeklyReview: 'week-15-portfolio-summary',
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
    relatedWeeklyReview: 'week-15-portfolio-summary',
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
    relatedWeeklyReview: 'week-14-portfolio-summary',
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
    relatedWeeklyReview: 'week-15-portfolio-summary',
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
    relatedWeeklyReview: 'week-15-portfolio-summary',
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
    relatedWeeklyReview: 'week-13-portfolio-summary',
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
    relatedWeeklyReview: 'week-15-portfolio-summary',
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
    relatedLink: '/journal/week-13-portfolio-summary',
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

export const portfolioRoles = [
  {
    title: 'Compounders',
    examples: 'Google, Meta, Berkshire Hathaway, Airbnb',
    text: 'Dominant or high-quality businesses with strong earnings power, durable advantages, and the ability to grow over long periods.',
  },
  {
    title: 'Broad Market Exposure',
    examples: 'Nasdaq 100 exposure, S&P 500 exposure',
    text: 'ETF exposure gives the portfolio a base layer of diversified participation in public markets.',
  },
  {
    title: 'Defensive / Income Holdings',
    examples: 'Realty Income, NextEra Energy, Rheinmetall',
    text: 'Holdings with different drivers from the core technology sleeve, used to balance the portfolio and broaden exposure.',
  },
  {
    title: 'Macro Hedge',
    examples: 'iShares Physical Gold',
    text: 'Gold has a role as a hedge against inflation, instability, currency pressure, and market stress.',
  },
  {
    title: 'Controlled Higher-Risk Growth',
    examples: 'Symbotic, SpaceX',
    text: 'A smaller part of the portfolio can be used for higher-risk long-term themes such as robotics, automation, and space infrastructure, but sizing has to stay disciplined.',
  },
  {
    title: 'Investor-Led Holding',
    examples: 'Pershing Square Holdings',
    text: 'A manager-led holding added for exposure to Bill Ackman’s portfolio at a discount to net asset value, with the position treated as a long-term compounding idea rather than a quick trade.',
  },
];

export const latestPortfolioReview = {
  label: 'Week 16',
  title: 'Week 16 - A pullback and the Pershing Square buy',
  slug: 'week-16-portfolio-summary',
  date: '23 June 2026',
  shortDate: '23 Jun 2026',
  mainNewTrade: 'Bought 2 shares of Pershing Square Holdings',
};

export const portfolioSnapshot = {
  accountValue: 'Around £1,981',
  startingCostBasis: '£1,999',
  currentReturn: 'About -0.90%',
  cashBalance: '£40.07',
  weeklyMove: 'About -£74.86 since Week 15',
  investments: 'Around £1,940.90',
  status: 'Week 16 source-of-truth update, 23 June 2026',
  googlePosition: 'Small Alphabet position remains in the portfolio after earlier profit-taking',
  microsoftTrade: 'Closed profitably on 1 June 2026 with roughly £13.94 realised result',
  mainFocus: 'Rebuild cash slowly, protect capital first, and avoid reacting emotionally to one weak week',
  updateNote: 'Latest Week 16 portfolio review is the current source-of-truth update. Account value is around £1,981, cash is £40.07, and the account is about £18 below the original £1,999 starting capital.',
};

export const portfolioValueHistory: PortfolioValuePoint[] = [
  {
    week: 1,
    label: 'Week 1',
    date: '8 March 2026',
    value: 1999,
    valueLabel: 'Starting baseline: £1,999',
    source: 'Baseline',
    note: 'Week 1 was described as close to flat to slightly negative, so the chart uses the starting baseline.',
  },
  {
    week: 3,
    label: 'Week 3',
    date: 'March 2026',
    value: 1860.18,
    valueLabel: '£1,860.18',
    source: 'Recorded',
  },
  {
    week: 4,
    label: 'Week 4',
    date: '30 March 2026',
    value: 1860,
    valueLabel: 'Around £1,860',
    source: 'Approximate',
  },
  {
    week: 5,
    label: 'Week 5',
    date: '05 April 2026',
    value: 1931,
    valueLabel: 'Around £1,931',
    source: 'Approximate',
  },
  {
    week: 6,
    label: 'Week 6',
    date: '12 April 2026',
    value: 1960,
    valueLabel: 'Around £1,960',
    source: 'Approximate',
  },
  {
    week: 7,
    label: 'Week 7',
    date: 'April 2026',
    value: 2025.84,
    valueLabel: '£2,025.84',
    source: 'Recorded',
  },
  {
    week: 8,
    label: 'Week 8',
    date: '28 April 2026',
    value: 2008.07,
    valueLabel: '£2,008.07',
    source: 'Recorded',
  },
  {
    week: 9,
    label: 'Week 9',
    date: '04 May 2026',
    value: 2000,
    valueLabel: 'Around £2,000',
    source: 'Approximate',
  },
  {
    week: 10,
    label: 'Week 10',
    date: '11 May 2026',
    value: 1986.69,
    valueLabel: '£1,986.69',
    source: 'Recorded',
  },
  {
    week: 11,
    label: 'Week 11',
    date: '15 May 2026',
    value: 1974.37,
    valueLabel: 'c. £1,974.37',
    source: 'Recorded',
  },
  {
    week: 12,
    label: 'Week 12',
    date: '22 May 2026',
    value: 1983.39,
    valueLabel: '£1,983.39',
    source: 'Recorded',
  },
  {
    week: 13,
    label: 'Week 13',
    date: '2 June 2026',
    value: 2007,
    valueLabel: 'Around £2,007',
    source: 'Approximate',
  },
  {
    week: 14,
    label: 'Week 14',
    date: '9 June 2026',
    value: 1979.98,
    valueLabel: 'Around £1,979.98',
    source: 'Approximate',
  },
  {
    week: 15,
    label: 'Week 15',
    date: '16 June 2026',
    value: 2055.86,
    valueLabel: '£2,055.86',
    source: 'Recorded',
  },
  {
    week: 16,
    label: 'Week 16',
    date: '23 June 2026',
    value: 1981,
    valueLabel: 'Around £1,981',
    source: 'Approximate',
  },
];

export const portfolioCrawlerNotes = {
  winners: [
    'QQQA remains one of the strongest contributors, showing roughly +24.84% in the Week 16 document.',
    'VUAG continues to support the portfolio through broad US market exposure, showing roughly +11.99%.',
    'Airbnb and Berkshire Hathaway remain positive contributors in the Week 16 holdings table.',
    'Pershing Square Holdings was added as a new investor-led holding because of the discount to NAV.',
  ],
  drags: [
    'Gold remains the largest position and the biggest cash loss, but is still treated as a portfolio hedge.',
    'SpaceX pulled back sharply after the strong Week 15 move and was the main weekly drag.',
    'Meta, Symbotic, and Rheinmetall remain weak and need continued review rather than emotional selling.',
    'Cash fell to £40.07 after the Pershing Square purchase, so rebuilding flexibility is now important.',
  ],
  latestActionPlan: [
    'Rebuild cash slowly after the Pershing Square purchase.',
    'Hold SpaceX and avoid reacting emotionally to the first proper pullback.',
    'Keep gold as a hedge while continuing to review whether it is doing the job expected.',
    'Treat Pershing Square as a long-term investor-led holding, not a short-term trade.',
    'Keep protecting capital first and avoid becoming careless with the remaining cash.',
  ],
};

export const readingDevelopment: ReadingBook[] = [
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
    takeaway: 'Look for simple opportunities where the downside is controlled and the upside is still meaningful.',
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
    takeaway: 'Risk is not just volatility; it is the chance of being wrong when the consequences matter.',
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
    takeaway: 'Price and value are not the same thing.',
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
    takeaway: 'The journey can teach more than the final result.',
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
    takeaway: 'Do not let income growth automatically become lifestyle inflation.',
  },
  {
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
    takeaway: 'Perspective and purpose matter most when things are difficult.',
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
    takeaway: 'Small actions, repeated over time, can quietly build into something much larger.',
  },
  {
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
];

export const transactionSummary = [
  { label: 'Latest review', value: latestPortfolioReview.label },
  { label: 'Review date', value: latestPortfolioReview.shortDate },
  { label: 'Cash balance', value: portfolioSnapshot.cashBalance },
  { label: 'Main new trade', value: latestPortfolioReview.mainNewTrade },
];

export const holdings: Holding[] = [
  {
    name: 'SGLN / iShares Physical Gold',
    ticker: 'SGLN',
    positionSize: '5.72 shares',
    sleeve: 'Hedge',
    role: 'Portfolio hedge and macro protection',
    status: 'Current holding',
    transactionNote: 'Added again on 9 June 2026 after ASML sale',
  },
  {
    name: 'QQQA / Nasdaq-100 ETF',
    ticker: 'QQQA',
    positionSize: '5.57 shares',
    sleeve: 'Core ETF',
    role: 'Broad technology-led US equity exposure',
    status: 'Current holding',
    transactionNote: 'Trimmed 1 share on 15 May 2026',
  },
  {
    name: 'VUAG / Vanguard S&P 500 ETF',
    ticker: 'VUAG',
    positionSize: '2.04 shares',
    sleeve: 'Core ETF',
    role: 'Broad US market exposure',
    status: 'Current holding',
    transactionNote: 'Initial portfolio buildout on 3 March 2026',
  },
  {
    name: 'Rheinmetall',
    ticker: 'RHM',
    positionSize: '0.087 shares',
    sleeve: 'Thematic / defence',
    role: 'Defence demand and European security exposure',
    status: 'Current holding',
    transactionNote: 'Dividend received in May 2026',
  },
  {
    name: 'Realty Income',
    ticker: 'O',
    positionSize: '3.28 shares',
    sleeve: 'Defensive / income-style',
    role: 'Real estate income exposure',
    status: 'Current holding',
    transactionNote: 'Added again on 15 May 2026; dividends received',
  },
  {
    name: 'NextEra Energy',
    ticker: 'NEE',
    positionSize: '2.04 shares',
    sleeve: 'Defensive / energy transition',
    role: 'Utility and renewables exposure',
    status: 'Current holding',
    transactionNote: 'Initial portfolio buildout on 3 March 2026',
  },
  {
    name: 'Meta Platforms',
    ticker: 'META',
    positionSize: '0.52 shares',
    sleeve: 'Core quality growth',
    role: 'Advertising, AI, and platform scale',
    status: 'Current holding',
    transactionNote: 'Added across March and April; dividend received',
  },
  {
    name: 'Symbotic',
    ticker: 'SYM',
    positionSize: '3.268 shares',
    sleeve: 'Higher volatility',
    role: 'Robotics and warehouse automation',
    status: 'Current holding',
    transactionNote: 'Added 1.5 shares on 11 June 2026 after an earlier partial sale',
  },
  {
    name: 'SpaceX',
    ticker: 'SPCX',
    positionSize: '1 share',
    sleeve: 'Speculative / long-term opportunity',
    role: 'Early exposure to space infrastructure, satellites, and Starlink',
    status: 'Current holding',
    transactionNote: 'Bought 1 share on 12 June 2026 as a small speculative long-term position',
  },
  {
    name: 'Pershing Square Holdings',
    ticker: 'PSH',
    positionSize: '2 shares',
    sleeve: 'Investor-led holding',
    role: 'Discount-to-NAV exposure to Pershing Square portfolio and Bill Ackman’s capital allocation',
    status: 'Current holding',
    transactionNote: 'Bought 2 shares on 23 June 2026 at 3,922p per share',
  },
  {
    name: 'Airbnb',
    ticker: 'ABNB',
    positionSize: '1.223 shares',
    sleeve: 'Quality growth / travel',
    role: 'Asset-light travel platform exposure',
    status: 'Current holding',
    transactionNote: 'Initial portfolio buildout on 3 March 2026',
  },
  {
    name: 'Berkshire Hathaway',
    ticker: 'BRK.B',
    positionSize: '0.3884 shares',
    sleeve: 'Core quality / ballast',
    role: 'Diversified operating businesses and capital discipline',
    status: 'Current holding',
    transactionNote: 'Initial portfolio buildout on 3 March 2026',
  },
  {
    name: 'Alphabet (Class A)',
    ticker: 'GOOGL',
    positionSize: '0.28 shares',
    sleeve: 'Core quality growth / add-on watchlist',
    role: 'Search, cloud, AI, and platform scale',
    status: 'Small rebuilt position',
    transactionNote: 'Earlier position sold profitably; small re-entry on 3 June 2026',
  },
  {
    name: 'ASML',
    ticker: 'ASML',
    positionSize: 'Closed',
    sleeve: 'Watchlist / AI infrastructure',
    role: 'Semiconductor equipment exposure',
    status: 'Closed on 9 June 2026',
    transactionNote: 'Realised result around £40.59; remains a watchlist name',
  },
  {
    name: 'Microsoft',
    ticker: 'MSFT',
    positionSize: 'Closed',
    sleeve: 'Trade reflection',
    role: 'Quality software and AI infrastructure exposure',
    status: 'Closed on 1 June 2026',
    transactionNote: 'Realised result around £13.94; useful process review',
  },
  {
    name: 'IonQ',
    ticker: 'IONQ',
    positionSize: 'Closed',
    sleeve: 'Speculative lesson',
    role: 'Quantum computing exposure',
    status: 'Closed',
    transactionNote: 'Realised loss around £18.35; useful reminder on volatility and sizing',
  },
];

export const portfolioChangeLog: PortfolioChange[] = [
  {
    date: '23 June 2026',
    type: 'Buy',
    title: 'Bought 2 shares of Pershing Square Holdings',
    text: 'Added Pershing Square Holdings at 3,922p per share for discount-to-NAV exposure and a long-term investor-led holding.',
    relatedSlug: 'week-16-portfolio-summary',
  },
  {
    date: '16 June 2026',
    type: 'Update',
    title: 'Latest transaction export reviewed',
    text: 'Portfolio holdings and cash were updated from the latest transaction export through 16 June 2026. Market value remains a manual/live-pricing item.',
    relatedSlug: 'week-15-portfolio-summary',
  },
  {
    date: '12 June 2026',
    type: 'Buy',
    title: 'Bought 1 share of SpaceX',
    text: 'Added a small speculative long-term position for exposure to space infrastructure, satellites, Starlink, and future optionality.',
    relatedSlug: 'week-15-portfolio-summary',
  },
  {
    date: '11 June 2026',
    type: 'Buy',
    title: 'Added to Symbotic',
    text: 'A deliberate average down in the robotics and warehouse automation sleeve, with the position still treated as higher volatility.',
    relatedSlug: 'week-15-portfolio-summary',
  },
  {
    date: '9 June 2026',
    type: 'Sell',
    title: 'Sold ASML for a realised gain',
    text: 'Closed ASML to lock in profit and raise cash. The lesson is to protect capital while still learning how much room to give high-quality winners.',
    relatedSlug: 'week-15-portfolio-summary',
  },
  {
    date: '9 June 2026',
    type: 'Buy',
    title: 'Added to gold hedge',
    text: 'Bought another iShares Physical Gold share to reduce the average cost and strengthen the macro hedge in the portfolio.',
    relatedSlug: 'week-15-portfolio-summary',
  },
  {
    date: '3 June 2026',
    type: 'Buy',
    title: 'Rebuilt a small Alphabet position',
    text: 'Bought Google/Alphabet back near the planned level after earlier profit-taking, keeping the entry small and disciplined.',
    relatedSlug: 'week-14-portfolio-summary',
  },
  {
    date: '1 June 2026',
    type: 'Sell',
    title: 'Closed Microsoft profitably',
    text: 'Locked in a profitable Microsoft trade and kept the decision in the record as a process review rather than a recommendation.',
    relatedSlug: 'week-13-portfolio-summary',
  },
  {
    date: '15 May 2026',
    type: 'Trim',
    title: 'Trimmed Nasdaq exposure',
    text: 'Sold 1 QQQA share to raise cash after strength, creating more flexibility while keeping broad technology-led exposure.',
    relatedSlug: 'week-11-portfolio-summary',
  },
  {
    date: '7 April 2026',
    type: 'Lesson',
    title: 'Closed IonQ as a sizing lesson',
    text: 'Closed the speculative quantum position at a loss. The main lesson was that exciting themes still need controlled sizing and clear reasoning.',
    relatedSlug: 'week-5-portfolio-summary',
  },
];

export const journalEntries: JournalEntry[] = [
  {
    "slug": "week-16-portfolio-summary",
    "title": "Week 16 - A pullback and the Pershing Square buy",
    "date": "23 June 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 16 did not feel especially good, but it also did not feel terrible. It felt more like a normal pullback after a very strong Week 15.",
    "tags": [
      "Pershing Square",
      "SpaceX",
      "Gold",
      "Cash"
    ],
    "majorEvents": [
      "Bought 2 shares of Pershing Square Holdings",
      "SpaceX pulling back from last week’s strong gain",
      "Rebuild cash slowly and keep protecting capital first"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-16-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-16-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-16-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-16-portfolio-summary/page-02.png",
      "/documents/weekly-summaries/pages/week-16-portfolio-summary/page-03.png",
      "/documents/weekly-summaries/pages/week-16-portfolio-summary/page-04.png"
    ],
    "body": [
      "Snapshot\nCurrent account value\nAround £1,981\nWeek 15 account value\n£2,055.86\nWeekly move\nAbout -£74.86\nStarting capital\n£1,999\nPosition versus starting value\nAbout -£18\nInvestments\nAround £1,940.90\nCash balance\n£40.07\nCurrent cost basis\n£2,039.64\nUnrealised result\n-£98.74 / -4.84%\nMain new trade\nBought 2 shares of Pershing Square Holdings\nMain weekly drag\nSpaceX pulling back from last week’s strong gain\nMain lesson\nRebuild cash slowly and keep protecting capital first",
      "How the week felt\nWeek 16 did not feel especially good, but it also did not feel terrible. It felt more like a normal pullback after a very strong Week 15. Last week the account looked much stronger because SpaceX was up around 30% and the account was sitting at £2,055.86. This week it was back around £1,981, which is frustrating because it puts the portfolio slightly below the original starting capital again.\nThe main reason the week felt worse on paper was SpaceX. Last week it was the biggest winner in the portfolio. This week it pulled back and was slightly down. That is a big swing in a short period of time, but I do not feel emotional about it. It would have been nice to take some profit when it was up strongly, but I bought SpaceX as a long-term holding, not just as a quick trade.",
      "Pershing Square Holdings\nThe main new trade was buying 2 shares of Pershing Square Holdings at 3,922p per share, for a total cost of £78.44. I bought it mainly because of the discount to NAV. The way I see it, I am getting exposure to the companies Pershing owns at a cheaper price than if I bought the underlying companies directly.\nI also like Bill Ackman as an investor. I have looked up to him for years and I think he has made some of the greatest trades on Wall Street. I see Pershing Square as the type of holding that could compound at around 10% to 15% per year over the next 10 to 20 years if the strategy continues to work.\nThis was not meant to be a quick trade. It was more about adding another high-quality, investor-led holding to the account and giving the portfolio exposure to a different style of investing.",
      "Current holdings\nHolding | Ticker | Value | Weight | Result\niShares Physical Gold | SGLN | £350.71 | 18.07% | -£57.99 / -14.19%\nVanguard S&P 500 (Acc) | VUAG | £221.75 | 11.43% | +£23.75 / +11.99%\nMeta Platforms | META | £220.14 | 11.34% | -£25.76 / -10.48%\nRealty Income | O | £150.14 | 7.74% | -£11.51 / -7.12%\nUBS Nasdaq-100 (Acc) | QQQA | £148.01 | 7.63% | +£29.45 / +24.84%\nBerkshire Hathaway | BRK.B | £143.09 | 7.37% | +£3.42 / +2.45%\nNextEra Energy | NEE | £132.28 | 6.82% | -£7.27 / -5.21%\nAirbnb | ABNB | £129.16 | 6.66% | +£9.60 / +8.03%\nSpaceX | SPCX | £111.62 | 5.74% | -£7.32 / -6.15%\nSymbotic | SYM | £96.52 | 4.97% | -£19.92 / -17.11%\nRheinmetall | RHM | £89.10 | 4.59% | -£30.22 / -25.33%\nPershing Square Holdings | PSH | £76.20 | 3.93% | -£2.24 / -2.86%\nAlphabet Class A | GOOGL | £72.30 | 3.73% | -£2.62 / -3.50%",
      "SpaceX and gold\nThe SpaceX pullback was the biggest change. I still believe in the company long term, and I may look to buy more in the future if I have cash and the price gives me a good opportunity. For now, I am happy holding it and not reacting emotionally to the first proper pullback.\nGold is still the largest position and the biggest cash loss. It is frustrating because it has not performed how I would have liked, but I still see it as a hedge. I have been watching and reading more about how governments and central banks think about gold, and that has made me more comfortable with the long-term reason for holding it.",
      "The lesson this week\nThe biggest lesson is cash. After buying Pershing Square, the cash balance is only around £40.07. I like the buy, but it means I have used most of my flexibility. Going forward, I need to rebuild cash slowly and keep protecting capital first.\nI still believe in the positions I own, but Week 16 was a reminder that the portfolio can move quickly in both directions. I do not want to sell good holdings just because of one weak week, but I also do not want to become careless with cash."
    ]
  },
  {
    "slug": "week-15-portfolio-summary",
    "title": "Week 15 - SpaceX and a stronger account",
    "date": "16 June 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 15 was another positive week. The account was sitting at £2,055.86 compared with around £2,023 in Week 14.",
    "tags": [
      "SpaceX",
      "Alphabet",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "Bought 1 share of SpaceX",
      "Gold, Rheinmetall, Meta and Symbotic"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-15-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-15-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-15-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-15-portfolio-summary/page-02.png",
      "/documents/weekly-summaries/pages/week-15-portfolio-summary/page-03.png"
    ],
    "body": [
      "Snapshot\nCurrent account value\n£2,055.86\nWeek 14 account value\nAround £2,023\nMove since Week 14\n+£32.86\nStarting cost basis\n£1,999\nPosition versus starting value\n+£56.86\nReturn versus starting value\n+2.84%\nInvestments\n£1,937.39\nCash balance\n£118.47\nCash as % of portfolio\nAbout 5.8%\nMain new position\nBought 1 share of SpaceX\nMain winner\nSpaceX\nMain unrealised drags\nGold, Rheinmetall, Meta and Symbotic",
      "A better week for the account\nWeek 15 was another positive week. The account was sitting at £2,055.86 compared with around £2,023 in Week 14. That means the portfolio improved by about £32.86 and was around £56.86 above the original starting capital of roughly £1,999.\nThat gave me more breathing room. It did not mean I should become careless, but it did show that the decisions over the last few weeks had helped protect and grow the account.",
      "The SpaceX buy\nThe biggest development was buying SpaceX. I bought one share because I genuinely believe in the company long term and wanted to get exposure as early as possible. It was still speculative because I knew it could easily fall straight after becoming available, and I was prepared to take a small short-term loss if that happened.\nLuckily, the opposite happened. The position was showing around £160 on Trading 212, with the live price around $220 at the latest check, which put it up around 30%+ in the portfolio. That was a very strong start, but I did not want to treat the early profit as guaranteed.",
      "What helped\nSpaceX was the biggest help by far. QQQA also continued to work well and was up around £28.59, or roughly 24%. VUAG was up around £23.30, or roughly 11.77%, which is exactly what I want from a broad S&P 500 holding.\nAirbnb and Berkshire were also positive, and Alphabet was slightly positive after I re-entered around $360. I was pleased with that because it showed I had waited for the price I wanted instead of chasing.",
      "What still hurt\nGold was still the biggest unrealised cash drag, down around £49.18 or 12.03%. I was less worried about that than I would be with a normal equity holding because gold is there as a hedge, but it was still frustrating.\nRheinmetall was still the biggest percentage loser apart from gold in cash terms, down around £33.05 or 27.70%. I had previously thought about cutting 50% of the position if it reached a 30% loss, but I no longer wanted to force that rule. I still understood the long-term defence thesis and did not want to sell at a weak point just to make the red number disappear.\nMeta was down around £15.56 or 6.33%, but I was not worried about Meta as a business. Symbotic was down around £14.65 or 12.58%. I bought more Symbotic deliberately to average down and add to the robotics thesis, but I knew I needed to let the position prove itself rather than keep averaging down blindly.",
      "My main takeaway\nThe week felt positive, but it also reminded me not to confuse a good short-term move with guaranteed progress. SpaceX had worked very well straight away, but it was still a speculative, volatile position. The account was above the starting point, but some positions were still dragging.\nThe goal from here was to keep the discipline: protect capital, avoid getting overexcited, and make sure new buys were still backed by a proper reason."
    ]
  },
  {
    "slug": "week-14-portfolio-summary",
    "title": "Week 14 - Google back in, ASML profit locked",
    "date": "9 June 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 14 felt good for most of the week. The account started strong and reached around £2,023, which was the highest point of the week.",
    "tags": [
      "ASML",
      "Google",
      "Gold",
      "Cash"
    ],
    "majorEvents": [
      "Sold ASML for £40.59 realised profit"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-14-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-14-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-14-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-14-portfolio-summary/page-02.png",
      "/documents/weekly-summaries/pages/week-14-portfolio-summary/page-03.png"
    ],
    "body": [
      "Snapshot\nWeek 13 account value\nAround £2,007\nHighest point in Week 14\nAround £2,023\nAccount value at review\nAround £1,979.98\nStarting value\n£1,999\nCash after trades\nAround £283.65\nMain realised trade\nSold ASML for £40.59 realised profit\nMain new buy\nBought Google at $359.90 and added one SGLN share\nPending order\nOne SpaceX share at $140, not filled yet",
      "A good week that did not end perfectly\nWeek 14 felt good for most of the week. The account started strong and reached around £2,023, which was the highest point of the week. It then came back down to around £1,979.98 on the working valuation, which was annoying because it put the account slightly below the £1,999 starting value again.\nEven so, I do not see the week as bad. I followed through on plans I had already spoken about. I got back into Google around the level I wanted, sold ASML to lock in a strong profit, and added another gold share to increase the hedge. From a discipline point of view, I think the week was positive.",
      "What The Intelligent Investor was changing for me\nI was reading The Intelligent Investor and it was definitely affecting the way I thought about the portfolio. The main thing it was teaching me was discipline: protect capital, be patient, and do not get dragged into whatever the market is doing that day.\nThat was part of why I was happy to take profit in ASML and build up cash. I cannot perfectly call the market, but I did think markets might come down a bit over the next week. I would rather have cash available and a stronger hedge than be fully exposed after a strong run.",
      "The main decisions\nThe best decision was getting back into Google at around $359.90. I had already said I wanted to buy if it came back towards the $360 to $365 area, and that is what happened. I did not chase it higher. I waited and used the cash when the price came to me.\nI also sold ASML to lock in the profit. The position was up around 30%, and the realised profit was £40.59. ASML is still a great company, but I do not think selling a position for a strong gain is something to apologise for. It protected capital and improved the cash position.\nI bought one more share of SGLN because gold was down around 14% and I wanted to strengthen the hedge. I did not want to keep buying gold blindly, but one extra share made sense while markets felt stretched.",
      "Where the portfolio stood after the trades\nArea\nMy view after Week 14\nGoogle\nBack in at $359.90. This followed the plan.\nASML\nSold fully and locked in £40.59 realised profit.\nGold / SGLN\nAdded one share for hedge protection and to average down.\nCash\nAround £283.65, giving more flexibility.\nMeta\nStill high quality; no real business concern.\nVUAG and QQQA\nStill important broad market and Nasdaq exposure.\nRheinmetall\nStill needs watching because it has been weak.\nSymbotic\nStill volatile; automation idea remains interesting.\nRealty Income and NextEra\nStill rate-sensitive but useful for balance."
    ]
  },
  {
    "slug": "week-13-portfolio-summary",
    "title": "Week 13 - Back above the start and a Microsoft trade",
    "date": "2 June 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 13 was positive for the portfolio. The account moved from £1,983.39 to around £2,007, which put it slightly above the original starting point again.",
    "tags": [
      "ASML",
      "Google",
      "Gold",
      "Rheinmetall",
      "Meta",
      "Cash"
    ],
    "majorEvents": [
      "Back above where I started",
      "What was helping and hurting"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-13-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-13-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-13-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-13-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nCurrent account value\nAround £2,007\nWeek 12 account value\n£1,983.39\nMove since Week 12\n+£23.61\nStarting cost basis\n£1,999\nPosition versus starting value\nAbout +£8\nCash balance\n£261.19\nMain trade\nBought Microsoft with around £140 and sold for roughly 10% profit\nGoogle position\nStill closed; waiting for a better re-entry",
      "Back above where I started\nWeek 13 was positive for the portfolio. The account moved from £1,983.39 to around £2,007, which put it slightly above the original starting point again. The gain was not massive, but getting back above the starting value mattered because the account had recovered from the weaker period.\nI was still waiting to re-enter Google. My plan was only to start considering it if the price moved closer to $365, and even then I did not want to deploy all the cash at once. I wanted the price to come to me rather than chase it.",
      "The Microsoft trade\nI made a Microsoft trade during the week that I had not mentioned at the time. I bought around £140 of Microsoft because it was one of the only mega-cap technology stocks that had been down over the past year, so I felt it was relatively safer compared with some of the more stretched tech names.\nThe trade worked. I sold the full position for roughly a 10% profit, which is why the cash position increased by about £14. But the lesson was not just that the trade made money. The bigger lesson was that I need to communicate trades properly before or when they happen. The account is meant to be run with discipline and written reasoning, so I need to stick to that process.",
      "The market and my own mindset\nMarkets had been very strong, and for the most part my trades had played out well. The reason the portfolio did not look stronger was mainly because gold was still down around 11.5%, with a cash loss of about £40.\nI was starting to feel more cautious. U.S. markets were around record highs, driven mainly by enthusiasm around AI and technology. That helped positions like ASML, QQQA, VUAG, Meta and the Microsoft trade. But reading The Intelligent Investor made me think more carefully about bull markets and how dangerous it can be when people start believing prices can keep rising forever.\nI realised that I had started to feel a bit like that myself with AI. That was probably the exact moment when I needed to become more disciplined, not more aggressive.",
      "What was helping and hurting\nQQQ had continued to rally and was up around 24%, even after I had taken some profits earlier. VUAG was up around 12%, which was exactly what I wanted from a core S&P 500 holding. ASML was also strong, up around 25%, showing that the AI infrastructure theme was still working.\nThe biggest drag was still gold. Rheinmetall was the biggest percentage loser, down around 25% or about £30. Realty Income and NextEra were also weak because of rates. Meta was slightly down, but I was not worried about the business because I use its products constantly and understand the strength of the company personally."
    ]
  },
  {
    "slug": "week-12-portfolio-summary",
    "title": "Week 12 - A small recovery without Google",
    "date": "22 May 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 12 was better than Week 11, although it was not a big breakout. The account moved from £1,974.37 to £1,983.39, so the portfolio recovered by £9.02.",
    "tags": [
      "ASML",
      "Google",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "The account moved the right way",
      "My takeaway"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-12-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-12-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-12-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-12-portfolio-summary/page-02.png",
      "/documents/weekly-summaries/pages/week-12-portfolio-summary/page-03.png"
    ],
    "body": [
      "Snapshot\nAccount value\n£1,983.39\nWeek 11 value\n£1,974.37\nWeekly move\n+£9.02 / +0.46%\nStarting cost basis\n£1,999\nOverall result\n-£15.61 / -0.78%\nCash\n£246.34\nMain trade\nNo new trade assumed; Google still not re-entered",
      "The account moved the right way\nWeek 12 was better than Week 11, although it was not a big breakout. The account moved from £1,974.37 to £1,983.39, so the portfolio recovered by £9.02. That is not a huge move, but it brought the account closer to the original cost basis again.\nThe useful part was that the portfolio did not need Google in the account to stabilise. The cash stayed available, and the improvement came from the remaining holdings, mainly ASML, Symbotic and Rheinmetall. At the same time, NextEra, gold and Meta held the account back, so it was not a clean rally.",
      "What happened underneath\nThe wider market was mixed. Early in the week, investors were still worried about inflation, oil and bond yields, which was not helpful for rate-sensitive names like NextEra. Later in the week, sentiment improved as investors became more positive about progress in the Middle East conflict and corporate earnings remained supportive.\nEurope was stronger, especially technology and defence. That helped ASML and Rheinmetall after both had been frustrating recently. Gold was weaker again because higher yields and a firmer dollar made it harder for the hedge to help.",
      "The position impact\nHolding | Weekly move | £ impact | My note\nASML | +7.1% | +£9.16 | Good rebound after last week’s weakness.\nSymbotic | +13.3% | +£8.22 | Sharp bounce, but still volatile.\nRheinmetall | +8.6% | +£7.45 | Useful recovery after the defence-stock reset.\nRealty Income | +0.7% | +£0.98 | Slightly positive, still rate-sensitive.\nQQQA | +0.5% | +£0.69 | Nasdaq exposure held up after the Week 11 trim.\nBerkshire Hathaway | Flat | £0.00 | Did its job as a steady holding.\nVUAG | Flat | £0.00 | Broad market exposure stayed steady.\nAirbnb | -1.2% | -£1.42 | Slightly weaker, not a major issue by itself.\nMeta | -1.4% | -£3.39 | Softer week after helping in Week 11.\nSGLN / Gold | -1.4% | -£4.38 | Hedge dragged again.\nNextEra | -5.9% | -£8.17 | Biggest weekly drag.",
      "My takeaway\nASML was the best sign because it reminded me why the semiconductor infrastructure theme still mattered. Symbotic’s bounce helped, but I did not want to treat one strong week as proof the risk had gone. Rheinmetall finally had a better week, but I still would not average down aggressively unless it stabilised properly.\nThe account was still slightly below the starting value, but it had moved in the right direction. That was enough for Week 12."
    ]
  },
  {
    "slug": "week-11-portfolio-summary",
    "title": "Week 11 - A small pullback after the Google sale",
    "date": "15 May 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 11 was slightly negative, but I would not call it a bad week. The account fell by roughly £12, which is annoying, but it was nothing like the pressure from earlier when the portfolio was around £1,860.",
    "tags": [
      "ASML",
      "Google",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "How it felt without Google",
      "Notes on the main names"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-11-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-11-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-11-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-11-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nEstimated account value\nc. £1,974.37\nWeek 10 value\nc. £1,986.69\nWeekly move\nc. -£12.32 / -0.62%\nStarting cost basis\nc. £1,999\nEstimated cash\nc. £246.34\nMain trade\nSold 1 QQQA share for £25.41\nNot a good week, but not a bad one either\nWeek 11 was slightly negative, but I would not call it a bad week. The account fell by roughly £12, which is annoying, but it was nothing like the pressure from earlier when the portfolio was around £1,860. The account was still close to the original cost basis and I had more cash after trimming one QQQA share.\nThe portfolio still felt under control. It was not one of those weeks where one holding completely damaged the account or where the structure stopped making sense. It was just mixed: some core names helped, some volatile names pulled back, and gold did not offer much protection.",
      "How it felt without Google\nWeek 10 had been about the Google sale and building cash. Week 11 was more about seeing whether the remaining portfolio could hold up without Google in it. Overall, it did hold up fairly well, even though the account was slightly down.\nThe better part of the week was Meta, VUAG and the Nasdaq exposure. That told me the quality growth and broad market side of the portfolio was still working. The weaker part was ASML and Symbotic pulling back. That was a useful reminder that even good themes can be volatile from week to week.",
      "The QQQA trim\nI sold one QQQA share for £25.41. I think that was a sensible small trim because it raised cash without removing the Nasdaq and large-cap technology exposure completely. I still had exposure to the theme, but I also had more flexibility.\nGold was weak again, which was frustrating because SGLN is meant to help balance the portfolio. I still thought it had a role, but I had to be realistic: a hedge can drag as well as protect.",
      "Notes on the main names\nMeta was one of the better parts of the week and still looked like a strong long-term holding. VUAG did what I wanted it to do by giving broad market exposure. ASML was weaker, but I did not think the long-term semiconductor infrastructure case had changed.\nSymbotic was the one to watch most carefully because it fell sharply. Rheinmetall stayed weak, Realty Income and NextEra remained rate-sensitive, and Airbnb was weaker but not in a way that changed the whole view."
    ]
  },
  {
    "slug": "week-10-portfolio-summary",
    "title": "Week 10 - Close to breakeven with cash on the side",
    "date": "11 May 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 10 felt like a transition week. The account was sitting just below the £2,000 area after the Google sale and the latest movements in the remaining holdings.",
    "tags": [
      "ASML",
      "Google",
      "Gold",
      "Rheinmetall",
      "Meta",
      "Cash"
    ],
    "majorEvents": [
      "Where the portfolio stood",
      "What I wanted to do next"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-10-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-10-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-10-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-10-portfolio-summary/page-02.png",
      "/documents/weekly-summaries/pages/week-10-portfolio-summary/page-03.png"
    ],
    "body": [
      "Snapshot\nEstimated account value\n£1,986.69\nInvested amount\nAbout £1,765.87\nCash\n£220.82\nCash weight\n11.12%\nMain winners\nQQQA, VUAG, ASML and Airbnb\nMain drags\nGold, Rheinmetall, Realty Income and Meta",
      "Where the portfolio stood\nWeek 10 felt like a transition week. The account was sitting just below the £2,000 area after the Google sale and the latest movements in the remaining holdings. It was not in a bad place, but it was not in the same clean recovery position as Week 7 and Week 8 either.\nThe important change was that cash had become a meaningful part of the portfolio. I had around £220.82 in cash, or about 11.12% of the account, which gave me dry powder for a possible Google re-entry. That flexibility was useful, but it also meant I had less exposure to one of the strongest large-cap AI names while the market was still rewarding AI-linked businesses.",
      "The strongest and weakest areas\nThe strongest part of the account was still the broad-market and AI infrastructure sleeve. QQQA, VUAG and ASML were doing most of the work in keeping the portfolio close to breakeven. Airbnb also looked healthier than it had earlier in the period.\nThe weak spots were gold, Rheinmetall, Realty Income and Meta. Gold was the largest holding and one of the biggest drags, down 9.28%. Rheinmetall was down 25.96%, which made it the clearest percentage loser. Realty Income was still being affected by rates, and Meta was down even though I still liked the business long term.",
      "Position notes\nHolding | Value | Weight | Current P/L / note\nCash | £220.82 | 11.12% | Dry powder for Google re-entry\nSGLN / Gold | £314.07 | 17.79% | -£32.13 / -9.28%\nMeta Platforms | £231.97 | 13.14% | -£13.93 / -5.66%\nVUAG / S&P 500 | £213.20 | 12.07% | +£15.20 / +7.68%\nQQQA / Nasdaq 100 | £163.78 | 9.27% | +£23.92 / +17.10%\nRealty Income | £149.13 | 8.45% | -£12.51 / -7.74%\nNextEra Energy | £139.36 | 7.89% | -£0.19 / -0.14%\nBerkshire Hathaway | £135.98 | 7.70% | -£3.69 / -2.64%\nASML | £135.65 | 7.68% | +£16.15 / +13.51%\nAirbnb | £126.69 | 7.17% | +£7.13 / +5.96%\nRheinmetall | £88.34 | 5.00% | -£30.98 / -25.96%\nSymbotic | £67.70 | 3.83% | -£0.97 / -1.41%",
      "What I wanted to do next\nThe main task was not to force trades. I wanted to redeploy cash patiently and keep reviewing each holding against its original role. If Google came back to the right level, I could use the cash. If not, there was no need to rush just because the money was available.\nThe account had already moved from a difficult low around £1,860, recovered above £2,000, and then settled slightly below it with cash on the side. That still felt disciplined rather than broken."
    ]
  },
  {
    "slug": "week-9-portfolio-summary",
    "title": "Week 9 - Taking the Alphabet profit and raising cash",
    "date": "04 May 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 9 was not exciting, but it was important. The portfolio was basically sitting around the £2,000 mark, made up of roughly £1,780 in stocks and £220 in cash.",
    "tags": [
      "Alphabet",
      "Symbotic",
      "Cash"
    ],
    "majorEvents": [
      "A reset week",
      "The lesson"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-9-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-9-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-9-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-9-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nStock value\nAround £1,780\nCash\nAround £220\nTotal portfolio value\nAround £2,000\nWeek 8 value\n£2,008.07\nWeekly change\nAbout -£8 / -0.4%\nStarting cost basis\nAbout £1,999\nCash position\nAbout 11% of the portfolio",
      "A reset week\nWeek 9 was not exciting, but it was important. The portfolio was basically sitting around the £2,000 mark, made up of roughly £1,780 in stocks and £220 in cash. Compared with Week 8, the account was only down about £8, so the total value was not really the issue.\nThe bigger change was the structure of the account. I was no longer fully invested because I sold Alphabet and created a proper cash position. That made the portfolio feel more protected and gave me more room to think before putting money back into anything.",
      "The Alphabet sale\nThe best thing this week was locking in the Alphabet gain. Alphabet had become one of the stronger positions in the portfolio, so selling it and taking about £40.63 profit was a decent result. It meant part of the recent recovery had actually been banked rather than just sitting as a paper gain.\nAt the same time, selling Alphabet also removed one of the cleaner quality names from the portfolio. I was happy with the profit, but I did not want to just throw the cash into something weaker for the sake of being invested. The point of raising cash was to become more patient, not more random.",
      "How the account felt afterwards\nThe account felt more careful than exciting. It was no longer chasing losses like it had been earlier, but it also had not built a big enough cushion to become comfortable. One bad week could still take the portfolio back below the starting value.\nSymbotic remained one of the main names to watch. It had recovered well, but I did not want to treat that as proof the risk had disappeared. If earnings were strong, it could help a lot. If guidance disappointed, it could give back some of the recovery quickly.",
      "The lesson\nThe main lesson was that cash can be an active position. Before this, everything had to keep working because the portfolio was basically fully deployed. Now I had some dry powder, and that gave me the ability to wait for a better entry rather than forcing a trade."
    ]
  },
  {
    "slug": "week-8-portfolio-summary",
    "title": "Week 8 - Holding the recovery",
    "date": "28 April 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 8 was more mixed. The account ended at £2,008.07, down from £2,025.84 the week before.",
    "tags": [
      "ASML",
      "Alphabet",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "A cooler week after the recovery",
      "My positioning thoughts"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-8-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-8-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-8-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-8-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nCurrent portfolio value\n£2,008.07\nWeek 7 portfolio value\n£2,025.84\nWeekly change\n-£17.77 / -0.88%\nStarting cost basis\n£1,999\nOverall result\n+£9.07 / +0.45%\nLast month move\nAbout +£170 / +9.7%",
      "A cooler week after the recovery\nWeek 8 was more mixed. The account ended at £2,008.07, down from £2,025.84 the week before. So it was not another push higher, but it also did not undo the recovery. The portfolio was still just above the starting value, which mattered because a few weeks earlier it had been under much more pressure.\nThe bigger picture was still much better than it had been a month earlier. The account was up roughly £170 over the last month, which was about a 9.7% recovery. So the week was not exciting, but it was useful because the portfolio held most of the recent improvement.",
      "What was still working\nThe main support was still coming from the growth and technology side. Alphabet, Meta, the Nasdaq ETF, the S&P 500 ETF, ASML, Airbnb and Symbotic were helping keep the account around breakeven or slightly above the original cost base.\nAlphabet was becoming one of the stronger positions, which was encouraging because it was meant to be a higher-quality core holding. Meta also still looked strong. Symbotic had recovered well from where it had been earlier, but I still did not want to treat one recovery as proof that the risk had disappeared.",
      "What was annoying me\nThe main weak spots were Rheinmetall, SGLN, Realty Income and Berkshire. Rheinmetall was the biggest drag from a percentage point of view, and gold was still down despite being one of the largest positions in the portfolio.\nGold was frustrating because it had not helped as much as expected, but I still viewed it as a hedge. Realty Income also remained under pressure, although that still felt more connected to rates and sentiment than to a broken company thesis.",
      "My positioning thoughts\nI did not think Week 8 called for a major change by itself. The account was slightly down from Week 7, but still much better than it had been a month earlier. The main thing was to avoid forcing action just because the portfolio had cooled off.\nThe watchlist for the next week was clear: whether the winners could keep holding the account together, whether the weaker names would stabilise, and whether macro risks around oil, inflation and rates would come back into focus."
    ]
  },
  {
    "slug": "week-7-portfolio-summary",
    "title": "Week 7 - Back above the starting line",
    "date": "April 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 7 felt like the first properly positive week since the difficult period started. The account recovered to £2,025.84, which put it back above the starting cost basis of around £1,999.",
    "tags": [
      "ASML",
      "Alphabet",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "A genuinely positive week",
      "What I wanted to do next"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-7-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-7-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-7-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-7-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nPortfolio value\n£2,025.84\nStarting cost basis\n£1,999\nOverall result\n+£26.84\nOverall percentage\n+1.34%\nMain recovery names\nSymbotic, Meta, Alphabet, ASML, QQQA and VUAG",
      "A genuinely positive week\nWeek 7 felt like the first properly positive week since the difficult period started. The account recovered to £2,025.84, which put it back above the starting cost basis of around £1,999. That was only a gain of £26.84, or 1.34%, but psychologically it mattered because the portfolio was no longer below the starting line.\nThis did not feel like a random one-day bounce. It felt like the portfolio was improving properly. Symbotic, Meta, Alphabet, ASML, QQQA and VUAG all recovered, and that was encouraging because those names are important parts of the growth and technology side of the account.",
      "Why the week mattered\nThe week showed that patience can pay off, but only when it is backed by discipline. It would have been easy to panic during the weaker weeks. Instead, I held the stronger parts of the portfolio and had already trimmed some speculative exposure earlier, which made the account feel more balanced when the recovery came.\nSymbotic was the most interesting position. It had been one of the more volatile names, so seeing it recover strongly was good. At the same time, because it can move so fast, it was also the name where I started thinking about whether it could make sense to lock in some gains if the market became choppy again.",
      "Still not getting carried away\nEven though the account was back above the starting value, I did not want to get too comfortable. The Middle East situation was still a major risk, especially around Iran and oil. If oil moved higher again, that could bring inflation and rate worries back into the market quickly.\nGold was still down, but I continued to see SGLN as a hedge rather than something that had to perform every week. Rheinmetall was also still under pressure, although I did not think the long-term defence case had completely broken.",
      "What I wanted to do next\nThe main decision was whether to protect some of the recent gains or just let the portfolio run. I did not want to sell for the sake of selling, especially because I was not completely sure where I would put the cash. But after a strong recovery, I also did not want to assume the market would keep moving in a straight line.\nThe main lesson was simple: patience helped, but discipline is what made the patience sensible."
    ]
  },
  {
    "slug": "week-6-portfolio-summary",
    "title": "Week 6 - The first signs of recovery",
    "date": "12 April 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 6 was a better week. The portfolio closed around £1,960, so it was still below the cost base, but it moved in the right direction and felt stronger than the previous few weeks.",
    "tags": [
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta",
      "IonQ"
    ],
    "majorEvents": [
      "Patience looked more sensible than overreacting"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-6-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-6-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-6-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-6-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nPortfolio value\nAround £1,960\nCost base\nRoughly £1,999\nMain improvement\nMost of the portfolio recovered apart from gold and Rheinmetall\nMain lesson\nPatience looked more sensible than overreacting",
      "The account finally moved better\nWeek 6 was a better week. The portfolio closed around £1,960, so it was still below the cost base, but it moved in the right direction and felt stronger than the previous few weeks. After seeing the account around the £1,860 area, even a partial recovery made the situation feel a lot more manageable.\nThe week was still choppy, but most of the portfolio recovered apart from gold and Rheinmetall. That was useful because it showed the stronger parts of the account could still do their job when the market backdrop improved.",
      "Gold and Rheinmetall\nGold was still down around 6% in the portfolio. I thought it could recover towards where we started if disruption around the Strait continued, but it was still frustrating because it had not protected the account in a clean way.\nRheinmetall was weaker as the market seemed to be pricing in the idea that the Iran war could gradually cool off. Even so, I still thought the company had a strong balance sheet and a large order backlog, so I did not see the defence thesis as broken at that point.",
      "The main point\nThe main lesson was that patience still looked more sensible than overreacting. After a few difficult weeks, it would have been easy to become too negative about the whole portfolio. But this week showed that when conditions improve, the stronger parts of the book can recover.\nI still needed to be hardest on IonQ and Symbotic because they were the least dependable positions. But the account itself looked more constructive than it had done before."
    ]
  },
  {
    "slug": "week-5-portfolio-summary",
    "title": "Week 5 - A steadier week, but still not fixed",
    "date": "05 April 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 5 felt better than the account number probably looked. The portfolio was still down overall, sitting around £1,931 against a cost base of roughly £1,999, but it did not feel like the account was falling apart.",
    "tags": [
      "Alphabet",
      "Gold",
      "Symbotic",
      "Meta",
      "IonQ",
      "Airbnb"
    ],
    "majorEvents": [
      "How it felt",
      "The lesson I took"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-5-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-5-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-5-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-5-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nPortfolio value\nAround £1,931\nCost base\nRoughly £1,999\nMain feeling\nSteadier and more controlled than the raw number suggested\nMain weak spots\nIonQ, Symbotic and Airbnb",
      "How it felt\nWeek 5 felt better than the account number probably looked. The portfolio was still down overall, sitting around £1,931 against a cost base of roughly £1,999, but it did not feel like the account was falling apart. It felt more controlled than the weeks before.\nThe pattern was still the same. The stronger, steadier names were helping hold things together, while the higher-risk part of the account was still where most of the pain sat. That mattered because the weakness was not coming from everything at once. It was concentrated.",
      "What helped and what dragged\nRealty Income, NextEra and Meta gave the portfolio a bit more balance. That is exactly why those types of holdings are there. They are not always exciting, but they help stop the account from being completely driven by high-beta names.\nIonQ and Symbotic were again the main drags, with Airbnb also not helping much. That made me think more carefully about the speculative sleeve. I still did not think there was an obvious thesis break, but those positions needed to prove themselves from here rather than just be given unlimited patience.",
      "The lesson I took\nThe biggest lesson was not to confuse a bad mark-to-market with a bad process. The account was still down, but it was healthier than it had been before the rebalance because I had already cut some speculative exposure and added more to the steadier side.\nFor now, the better move still looked like patience and discipline, not forcing new trades. I wanted to watch whether IonQ and Symbotic could stabilise, whether Meta, Alphabet and the ETFs could keep carrying the book, and whether gold plus the income names could continue to cushion volatility."
    ]
  },
  {
    "slug": "week-4-portfolio-summary",
    "title": "Week 4 - Rebalancing instead of panicking",
    "date": "30 March 2026",
    "category": "Weekly Reviews",
    "excerpt": "The account was still sitting around £1,860, compared with roughly £1,999 at the start. So on paper the portfolio was still under pressure.",
    "tags": [
      "ASML",
      "Alphabet",
      "Symbotic",
      "Meta",
      "IonQ"
    ],
    "majorEvents": [
      "Where the account stood",
      "Where the portfolio ended up"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-4-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-4-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-4-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-4-portfolio-summary/page-02.png",
      "/documents/weekly-summaries/pages/week-4-portfolio-summary/page-03.png"
    ],
    "body": [
      "Snapshot\nPortfolio value\nAround £1,860\nStarting value\nAround £1,999\nRealised loss on trims\nAbout $10\nMain action\nTrimmed IonQ and Symbotic; added SGLN, Meta and Realty Income",
      "Where the account stood\nThe account was still sitting around £1,860, compared with roughly £1,999 at the start. So on paper the portfolio was still under pressure. I did not like seeing that, but I still viewed it as a difficult market backdrop rather than proof that the whole structure was wrong.\nThe broad picture was similar to Week 3. The core still made sense, but the volatile sleeve had become the part causing most of the discomfort. That made the next decision fairly clear: I needed to reduce the part of the portfolio that was creating the most unnecessary pressure.",
      "The rebalance\nThe main thing I did was trim some of the speculative exposure. I cut 1.5 shares of IonQ and 0.8 shares of Symbotic, then reallocated into steadier positions: SGLN, Meta and Realty Income. I did not see that as trading for the sake of trading. It was more about improving the balance of the account after seeing how the portfolio behaved under pressure.\nThe trims realised a loss of about $10. That is not something I would want to make a habit of, but in this case I think it was acceptable because the loss was small and the decision made the account healthier. I would rather take a small controlled loss than sit passively in positions that had become too large a source of volatility.",
      "Market backdrop and my view\nThe wider market was still focused on the Middle East and oil. Trump had said attacks would pause for ten days while talks continued, which helped reduce some immediate fear, but it did not remove the uncertainty. Oil was still elevated because investors were worried about escalation and supply disruption.\nMy view at the time was that Iran would probably respect the pause for the time being, or at least avoid doing something that forced immediate escalation before the deadline. That was only my interpretation, not a fact, but it matched the way markets were behaving: calmer than before, but not relaxed.\nFor the portfolio, I expected continued volatility rather than a clean recovery. If diplomacy held, Meta, Alphabet and ASML could recover gradually. If the pause broke, oil and inflation fears could keep putting pressure on growth, REITs and rate-sensitive holdings.",
      "Where the portfolio ended up\nAfter the rebalance, the account looked more controlled. It still had exposure to growth and AI through Meta, Alphabet and ASML. It still had broad exposure through the ETFs. But it was less dependent on the speculative sleeve behaving well every week.\nTicker | Holding | Shares after rebalance\nABNB | Airbnb | 1.2230\nASML | ASML Holding | 0.1190\nBRK.B | Berkshire Hathaway | 0.3884\nGOOGL | Alphabet | 0.8032\nIONQ | IonQ | 2.1190\nMETA | Meta Platforms | 0.4200\nNEE | NextEra Energy | 2.0400\nO | Realty Income | 3.2780\nQQQA | UBS Nasdaq-100 (Acc) | 6.5662\nRHM | Rheinmetall | 0.0868\nSGLN | iShares Physical Gold | 4.7193\nSYM | Symbotic | 1.7680\nVUAG | Vanguard S&P 500 (Acc) | 2.0366"
    ]
  },
  {
    "slug": "week-3-portfolio-summary",
    "title": "Week 3 - The first proper pressure",
    "date": "March 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 3 was the first week where the account really came under pressure. The portfolio was down to £1,860.18 against a starting value of £1,996.96, so the move was not small.",
    "tags": [
      "Gold",
      "Symbotic",
      "IonQ"
    ],
    "majorEvents": [
      "Risk-off market pressure and the volatile sleeve"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-3-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-3-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-3-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-3-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nPortfolio total\n£1,860.18\nStarting value\n£1,996.96\nChange\n-£136.78 / -6.85%\nMain drag\nRisk-off market pressure and the volatile sleeve\nNames most under review\nIonQ and Symbotic",
      "How the drawdown felt\nWeek 3 was the first week where the account really came under pressure. The portfolio was down to £1,860.18 against a starting value of £1,996.96, so the move was not small. A fall of around 6.85% is enough to make you pay attention, especially when the account is still new.\nEven with that, I did not think the whole thing was broken. Most of the weakness looked like it was coming from a broad risk-off move rather than one single holding collapsing. That distinction mattered to me. If one stock had completely damaged the account, that would be one thing. But this felt more like the market turning against the types of assets I owned.",
      "Why it fell\nThe backdrop was difficult. Markets were dealing with geopolitical tension, firmer oil, higher bond yields and weaker confidence that rates would fall quickly. That combination usually hurts growth stocks, speculative names, REITs and utilities at the same time. That explains why the pressure was spread across technology exposure, the Nasdaq ETF, Realty Income, NextEra and even gold.\nThe higher-volatility sleeve was still the part I needed to watch most closely. IonQ and Symbotic were the obvious names to review because they can move sharply and they do not have the same defensive qualities as the bigger, more established companies.",
      "What I decided from here\nThe best move did not look like panic selling. I needed to stay disciplined, avoid averaging down too aggressively, and put the most scrutiny on the weaker-conviction speculative positions first. If markets stabilised, doing very little would probably be the right answer. If pressure worsened, I would trim weaker speculative exposure before touching the core.\nThis week was a reminder that a portfolio can feel fine when it is being built and very different once everything is red. The important thing was to judge the holdings against the original reasons for owning them, not just against one bad week of prices."
    ]
  },
  {
    "slug": "week-2-portfolio-summary",
    "title": "Week 2 - Checking whether the structure still made sense",
    "date": "March 2026",
    "category": "Weekly Reviews",
    "excerpt": "Week 2 gave me a bit more confidence that the original build was not random. The account still felt balanced between quality growth, broad market exposure, defensive holdings and a smaller speculative sleeve.",
    "tags": [
      "ASML",
      "Alphabet",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "My read on the account",
      "What I needed to keep watching"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-2-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-2-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-2-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-2-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nMain read\nPortfolio still broadly behaved how I wanted it to\nCore holdings\nAlphabet, Meta, ASML, ETFs, Berkshire and gold still gave structure\nVolatile area\nSymbotic and IonQ remained the main source of movement\nKey lesson\nThe portfolio should not rely on one theme or one high-beta trade",
      "My read on the account\nWeek 2 gave me a bit more confidence that the original build was not random. The account still felt balanced between quality growth, broad market exposure, defensive holdings and a smaller speculative sleeve. The speculative names were already moving around more than the rest of the account, but they were not big enough to dominate everything.\nThat was important because I did not want the portfolio to become just an IonQ or Symbotic bet. Those names can be exciting, but the account needs a proper base. Alphabet, Meta and ASML were still the cleaner quality-growth side. Berkshire, the ETFs and gold were still helping the account feel more structured.",
      "The different parts of the portfolio\nThe steadier side was doing what I wanted it to do. Gold was there as a hedge, Berkshire was there as a quality ballast, and the ETF sleeve gave me broad exposure without needing every individual stock pick to be right. Realty Income and NextEra were not the most exciting holdings, but their role was never meant to be excitement. They were there to improve balance and resilience.\nThe mixed part was still the speculative sleeve. Symbotic and IonQ were the names most likely to move sharply over short periods. I still felt there was enough operational progress to keep monitoring them, but IonQ especially needed to stay under tight review because it was clearly the most speculative holding.",
      "What I needed to keep watching\nRheinmetall was also a useful reminder that a good company or theme can still fall if expectations have already run too far. The defence case still made sense to me, but the market reaction showed that good news is not always enough when a share price has already moved hard.\n• Keep watching AI capex sentiment around Alphabet, Meta and ASML.\n• Separate Rheinmetall’s long-term defence case from short-term expectations risk.\n• Monitor IonQ and Symbotic through execution, not just price movement.\n• Watch rates for Realty Income and NextEra.\n• Keep treating gold as a hedge rather than a weekly trading position."
    ]
  },
  {
    "slug": "week-1-portfolio-summary",
    "title": "Week 1 - Getting the portfolio started",
    "date": "8 March 2026",
    "category": "Weekly Reviews",
    "excerpt": "This was the first proper week of the portfolio actually being put to work, so I was not trying to judge everything by one short-term result. The main aim was to get the account built in a sensible way from day one.",
    "tags": [
      "ASML",
      "Alphabet",
      "Gold",
      "Symbotic",
      "Rheinmetall",
      "Meta"
    ],
    "majorEvents": [
      "How I saw the first week",
      "What I took from it"
    ],
    "documentUrl": "/documents/weekly-summaries/view/week-1-portfolio-summary/",
    "documentPdfUrl": "/documents/weekly-summaries/week-1-portfolio-summary.pdf",
    "documentPages": [
      "/documents/weekly-summaries/pages/week-1-portfolio-summary/page-01.png",
      "/documents/weekly-summaries/pages/week-1-portfolio-summary/page-02.png"
    ],
    "body": [
      "Snapshot\nStarting point\nFirst week of the portfolio being built and tested\nResult\nClose to flat to slightly negative on entry levels\nMain idea\nBuild a balanced account instead of chasing quick gains\nEarly winners\nBerkshire Hathaway, Airbnb, Rheinmetall, Nasdaq ETF and gold\nEarly weak spots\nSymbotic and IonQ",
      "How I saw the first week\nThis was the first proper week of the portfolio actually being put to work, so I was not trying to judge everything by one short-term result. The main aim was to get the account built in a sensible way from day one. I wanted a mix of quality technology, broad market exposure, a few defensive or income-style positions, and a small amount of more speculative upside.\nLooking back, I think the first week was okay. The account finished close to flat or slightly negative, which I can live with because markets were not especially calm and the portfolio was brand new. What mattered more to me was whether the structure made sense once the prices started moving. On that point, I think the answer was mostly yes.\nSome of the steadier names helped offset the more aggressive positions. Berkshire, Airbnb, Rheinmetall, the Nasdaq ETF and gold were the more helpful parts early on. Symbotic and IonQ were weaker, which is not surprising because those are the higher-volatility names. That already showed me why position sizing matters.",
      "What I wanted the portfolio to be\nThe idea was not to build a portfolio where everything depended on one stock or one theme. Meta, Alphabet and ASML gave me exposure to large, high-quality technology and AI infrastructure. VUAG and QQQA gave broader market exposure. Gold was there to offer some protection if markets became more nervous. Realty Income and NextEra added a different type of exposure, even if they were not the most exciting names.\nThe speculative part of the account was mainly IonQ and Symbotic. I liked the long-term themes, but I also knew those positions could move around a lot. That is why I did not want them to be large enough to control the whole portfolio. They were there to add upside, not to decide the entire outcome.",
      "What I took from it\nThe best part of Week 1 was that I felt I had started with a structure rather than a random list of shares. The portfolio had a growth side, a broad market side, a hedge, and a smaller speculative side. That gave me something to judge future decisions against.\nThe main thing to watch from here was whether I could stay disciplined once the account actually started moving against me. It is easy to say you are long term when nothing has happened yet. The real test would come in the next few weeks if some of the positions started falling properly."
    ]
  },
  {
    "slug": "why-the-rulebook-exists",
    "title": "Why the Rulebook Exists",
    "date": "9 June 2026",
    "category": "Lessons",
    "excerpt": "The rulebook is not abstract. It comes from early crypto profits, leverage mistakes, borrowed money, and the decision to treat investing as a serious long-term craft.",
    "body": [
      "I first became interested in markets during the first week of the COVID-19 lockdown. I was fourteen, and my father asked me and my siblings to each choose an online course. I picked a stock trading course on Udemy, taught by Mohsin Hassan, and then completed a more advanced course afterwards.",
      "That early interest moved into crypto. I made money quickly, mostly through luck, then borrowed money from my parents and made more. The lesson looked positive at first, but the process was not mature.",
      "The mistake came from leverage. I started trading crypto with leverage and eventually lost most of the money. I also tried different crypto projects with a friend, but the overall result was the same: most of the early money was gone.",
      "That is why the rulebook matters. I do not use leverage to trade, I do not borrow aggressively to invest, and I want this portfolio to be built through disciplined ownership of real businesses rather than gambling behaviour."
    ]
  },
  {
    "slug": "google-re-entry-plan",
    "title": "Google Re-entry Plan",
    "date": "5 May 2026",
    "category": "Market Notes",
    "excerpt": "Why a great business can still require patience, and why sitting in cash can be the correct action while waiting for a better setup.",
    "body": [
      "Alphabet remains a business worth studying, but quality alone does not remove the need for entry discipline.",
      "The plan is to define what would make the price attractive, what would break the thesis, and how large the position should be before any trade is made."
    ]
  },
  {
    "slug": "microsoft-trade-reflection",
    "title": "Microsoft Trade Reflection",
    "date": "29 April 2026",
    "category": "Trade Reflections",
    "excerpt": "A profitable trade can still teach process lessons. The question is whether the decision was repeatable, not just whether it worked.",
    "body": [
      "The Microsoft trade closed for roughly 10% profit. That is a good outcome, but the review has to focus on process quality.",
      "The useful question is whether the entry, size, patience, and exit were all supported by written reasoning that could be repeated."
    ]
  }
];

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
  'Review the portfolio weekly.',
  'Keep a short trade journal and weekly summary.',
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
  'Portfolio value updated',
  'Profit/loss calculated',
  'Holdings reviewed',
  'Cash position reviewed',
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
