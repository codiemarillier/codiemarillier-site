export type VerificationState = 'documented' | 'requires confirmation';

export type V2WorkStory = {
  slug: string;
  title: string;
  location: string;
  status: 'Current' | 'Past';
  summary: string;
  responsibilities: string[];
  lesson: string;
  verification: VerificationState;
};

export type V2Project = {
  slug: string;
  title: string;
  status: 'Active' | 'Researching' | 'Status to confirm';
  type: string;
  summary: string;
  note: string;
  problem: string;
  whatIDid: string[];
  lesson: string;
  verification: VerificationState;
  detailHref?: string;
  detailLabel?: string;
};

export type V2Image = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const v2Identity = {
  name: 'Codie Marillier',
  origin: 'Born and raised in Zimbabwe',
  currentContext: 'Currently living and working in England',
  purpose:
    'This website exists because it is a showcase of who I am personally, and something to hold me accountable for what I want to achieve in the future.',
  introduction:
    'My interests span property, investing, entrepreneurship, practical work, travel, sport and reading. This is a record of where those interests lead—and what I learn along the way.',
} as const;

export const v2Voice = {
  opening:
    'I am a young Zimbabwean building experience across property, investing, entrepreneurship, practical work, travel and reading. I am not presenting myself as an expert. The interesting part is that I am at the beginning—and I am trying to build deliberately.',
  familyBusiness:
    'I often joke that I was my parents’ second-born child because their property company was their first. What I saw behind the business was client relationships, practical problems, responsibility and years of work. It taught me that entrepreneurship is something you keep doing, not simply something you call yourself.',
  firstBusiness:
    'My brother and I started our first business when I was eight. It funded tuck-shop money and, eventually, a dog. The exit was less impressive: I went to boarding school.',
  france:
    'I originally moved to France to work on superyachts. Zimbabwe being landlocked eventually became a fairly important consideration.',
  university:
    'After two years at university, I decided to leave because I wanted to change my environment, work more directly and build towards the life I genuinely wanted.',
  crypto:
    'I made money in cryptocurrency early, became overconfident and eventually lost most of it through leveraged trading and chasing losses. It was painful, but it became one of the main reasons I now care so deeply about risk, position sizing and written decisions.',
  reading:
    'I have loved reading for as long as I can remember. As a teenager, I sometimes read books under my desk during class. I am still trying to read roughly one book each week—not to collect titles, but to keep changing how I think.',
  meaning:
    'For me, a good life is less about constant excitement and more about belonging, useful work, shared experiences, people I love and avoiding the regret of never trying.',
  workQuestion: 'What will be better because I worked today?',
  direction:
    'The direction is to learn from impressive people, build judgement and credibility internationally, and eventually apply that experience to meaningful opportunities in Zimbabwe.',
} as const;

export const v2PersonalityNotes = [
  { label: 'Most proud of', value: 'Genuine kindness and trying to meet people without preconceived judgement.' },
  { label: 'Still working on', value: 'Discipline, routines, fitness, nutrition, consistency and using time better.' },
  { label: 'Happiest when', value: 'Spending time with family—belonging and presence rather than constant excitement.' },
  { label: 'Curious about', value: 'Business, history, economics, psychology, physics, consciousness, time and the unknown.' },
] as const;

export const v2Navigation = [
  { label: 'About', href: '/v2-preview/about' },
  { label: 'Work', href: '/v2-preview/work' },
  { label: 'Projects', href: '/v2-preview/projects' },
  { label: 'Writing', href: '/v2-preview/writing' },
  { label: 'Travel', href: '/v2-preview/travel' },
  { label: 'Now', href: '/v2-preview/now' },
] as const;

export const v2Interests = [
  'Property',
  'Investing',
  'Entrepreneurship',
  'Zimbabwe',
  'Travel',
  'Cricket',
  'Reading',
  'Risk & decisions',
] as const;

export const v2WorkStories: V2WorkStory[] = [
  {
    slug: 'sweden',
    title: 'Working in Sweden',
    location: 'Sweden',
    status: 'Past',
    summary:
      'I lived and worked on a large property, helping with its day-to-day running and watching at close range how an ambitious entrepreneur approached problems, responsibility and daily life.',
    responsibilities: ['Property operations', 'Practical preparation', 'Large-event setup'],
    lesson: 'It showed me what ambition looks like when it becomes systems, responsibility and action rather than just talk.',
    verification: 'documented',
  },
  {
    slug: 'england-estate',
    title: 'Estate work in England',
    location: 'England',
    status: 'Current',
    summary:
      'I currently work on an estate being developed into a wedding and events venue. The work ranges from grounds and repairs to maintenance, building tasks and whatever practical problem needs solving next.',
    responsibilities: ['Estate maintenance', 'Grounds improvement', 'Repairs and building tasks'],
    lesson: 'I try to look at the property by asking: if I owned this, how would I want it to look?',
    verification: 'documented',
  },
  {
    slug: 'marquee-work',
    title: 'Marquee & event installation',
    location: 'England',
    status: 'Past',
    summary:
      'I spent several months turning empty spaces into wedding and party venues: unloading, erecting structures, laying floors, setting stages and dismantling it all again.',
    responsibilities: ['Structure installation', 'Flooring and stages', 'Event setup and dismantling'],
    lesson: 'It was some of the hardest physical work I have done, but a good friend, a strong team and a visible finish line made it satisfying.',
    verification: 'documented',
  },
];

// Keep documented experiences in the source record even when they are not part
// of the current public edit of the Work page.
export const v2FeaturedWorkStories = v2WorkStories.filter((story) => story.slug !== 'marquee-work');

export const v2Projects: V2Project[] = [
  {
    slug: 'codie-capital-research',
    title: 'Codie Capital Research',
    status: 'Active',
    type: 'Investing & writing',
    summary:
      'My public investment record: the real portfolio, regular reviews, research, letters, decisions, mistakes and the process I am still trying to improve.',
    note: 'The investing sub-brand remains intact inside the broader personal website.',
    problem: 'It is easy to remember an investment outcome and quietly rewrite the quality of the decision that produced it.',
    whatIDid: ['Recorded the real portfolio', 'Published regular reviews', 'Built a written rulebook', 'Kept mistakes visible'],
    lesson: 'A good outcome is not always a good decision, and a difficult short-term result does not automatically break a thesis.',
    verification: 'documented',
    detailHref: '/v2-preview/capital-research',
    detailLabel: 'Explore Codie Capital Research',
  },
  {
    slug: 'website-v2',
    title: 'Personal Website V2',
    status: 'Active',
    type: 'Accountability system',
    summary:
      'I am rebuilding this site from a narrow investment journal into a living record of my work, projects, travel, reading and long-term direction.',
    note: 'This preview is the first contained implementation step.',
    problem: 'The original website answered how I invest, but barely answered who I am.',
    whatIDid: ['Audited the investment archive', 'Structured the broader personal story', 'Separated verified facts from open questions', 'Built this local preview'],
    lesson: 'A personal website only becomes useful when it is honest enough for friends to recognise the person behind it.',
    verification: 'documented',
  },
  {
    slug: 'horsebox-conversion',
    title: 'O and C Cotswolds Trailers Ltd',
    status: 'Status to confirm',
    type: 'Entrepreneurial project',
    summary:
      'A friend and I bought old horsebox trailers and explored turning them into event units, displays and custom mobile spaces while we were at university.',
    note: 'The legal company name is confirmed. A second horsebox is still being renovated; the company’s formal operating status still needs confirmation.',
    problem: 'Old horsebox trailers could potentially become useful event units, displays and mobile spaces instead of remaining underused assets.',
    whatIDid: ['Sourcing and budgeting', 'Repairs and tool work', 'Painting and spraying', 'Design, pricing and outreach'],
    lesson: 'A real project teaches you to adapt when the original business model meets materials, customers, costs and partnership in practice.',
    verification: 'requires confirmation',
    detailHref: '/v2-preview/projects/horsebox-conversion',
    detailLabel: 'View the horsebox project',
  },
  {
    slug: 'zimbabwe-property-access',
    title: 'Zimbabwe property access research',
    status: 'Researching',
    type: 'Property research',
    summary:
      'I am exploring why conventional property finance is so difficult to access in Zimbabwe and which ownership models might be worth investigating.',
    note: 'Research only—not an investment offer, product or guarantee.',
    problem: 'Conventional mortgages are difficult to access, wages are low relative to property prices and many transactions require full cash payment.',
    whatIDid: ['Studied fractional ownership ideas', 'Considered shared-equity and tenant-to-ownership models', 'Explored clubs and development partnerships', 'Identified legal and investor-protection questions'],
    lesson: 'A compelling problem is not yet a product. Legal, regulatory, tax, governance and investor-protection work must come first.',
    verification: 'documented',
  },
];

export const v2HorseboxProjectDetails = {
  legalName: 'O and C Cotswolds Trailers Ltd',
  currentUpdate:
    'The project includes the blue horsebox shown here and a second horsebox that is still being renovated. The final gallery image is the newest progress photograph, supplied on 14 July 2026.',
  possibleUses: [
    'Promotional stands',
    'Branded event units',
    'Mobile displays',
    'Wedding installations',
    'Information booths',
    'Pop-up uses',
    'Custom client builds',
  ],
  skills: [
    'Sourcing and budgeting',
    'Tools, materials and repairs',
    'Painting and spraying',
    'Design and pricing',
    'Marketing and outreach',
    'Partnership and adapting the model',
  ],
  images: [
    {
      src: '/images/horsebox/blue-horsebox-front-1200.jpg',
      srcSet:
        '/images/horsebox/blue-horsebox-front-720.jpg 720w, /images/horsebox/blue-horsebox-front-1200.jpg 1200w',
      width: 900,
      height: 1200,
      alt: 'Front three-quarter view of a bright blue horsebox with timber doors, parked beneath trees.',
      caption: 'Front three-quarter view of the blue horsebox with the timber doors fitted.',
    },
    {
      src: '/images/horsebox/blue-horsebox-side-1200.jpg',
      srcSet:
        '/images/horsebox/blue-horsebox-side-720.jpg 720w, /images/horsebox/blue-horsebox-side-1200.jpg 1200w',
      width: 1075,
      height: 1200,
      alt: 'Side view of the blue horsebox showing its tandem wheels and externally mounted spare wheel.',
      caption: 'Side view showing the blue exterior, tandem wheels and mounted spare wheel.',
    },
    {
      src: '/images/horsebox/blue-horsebox-rear-1200.jpg',
      srcSet:
        '/images/horsebox/blue-horsebox-rear-720.jpg 720w, /images/horsebox/blue-horsebox-rear-1200.jpg 1200w',
      width: 900,
      height: 1200,
      alt: 'Rear three-quarter view of the blue horsebox with timber rear doors and an open upper section.',
      caption: 'Rear three-quarter view showing the timber doors and upper opening.',
    },
    {
      src: '/images/horsebox/horsebox-renovation-interior-1200.jpg',
      srcSet:
        '/images/horsebox/horsebox-renovation-interior-720.jpg 720w, /images/horsebox/horsebox-renovation-interior-1200.jpg 1200w',
      width: 675,
      height: 1200,
      alt: 'Open horsebox interior during renovation, with tools on the floor and the blue horsebox visible behind it.',
      caption: 'Newest photograph — interior renovation work in progress, with the blue horsebox visible behind.',
    },
  ],
} as const;

export const v2TravelStory = {
  country: 'Cambodia',
  title: 'The people become the place.',
  summary:
    'Cambodia is my current favourite, not because of a country count, but because of the people I met while travelling alone—especially a guide named Dara.',
  reflection:
    'The strongest travel stories are rarely just about where you went. They are about the people who changed how the place felt.',
  verification: 'documented' as VerificationState,
};

export const v2TravelImages: Record<'cambodia' | 'franceMarina' | 'franceYachtWork' | 'monaco', V2Image> = {
  cambodia: {
    src: '/images/travel/angkor-wat-cambodia-985.jpg',
    srcSet:
      '/images/travel/angkor-wat-cambodia-720.jpg 720w, /images/travel/angkor-wat-cambodia-985.jpg 985w',
    width: 985,
    height: 640,
    alt: 'Angkor Wat in Cambodia framed by palm trees beneath a cloudy sky.',
    caption: 'Angkor Wat, Cambodia.',
  },
  franceMarina: {
    src: '/images/travel/south-france-yacht-marina-1600.jpg',
    srcSet:
      '/images/travel/south-france-yacht-marina-800.jpg 800w, /images/travel/south-france-yacht-marina-1600.jpg 1600w',
    width: 1600,
    height: 1200,
    alt: 'A large white superyacht moored among other yachts in a Mediterranean marina.',
    caption: 'Around the marinas while pursuing yacht work in the south of France.',
  },
  franceYachtWork: {
    src: '/images/travel/south-france-yacht-work-1136.jpg',
    srcSet:
      '/images/travel/south-france-yacht-work-720.jpg 720w, /images/travel/south-france-yacht-work-1136.jpg 1136w',
    width: 1136,
    height: 640,
    alt: 'Rows of motor yachts in a harbour during Codie’s time working around yachts in the south of France.',
    caption: 'Yacht work in the south of France.',
  },
  monaco: {
    src: '/images/travel/monaco-harbour-1600.jpg',
    srcSet:
      '/images/travel/monaco-harbour-800.jpg 800w, /images/travel/monaco-harbour-1600.jpg 1600w',
    width: 1200,
    height: 1600,
    alt: 'Codie standing on a balcony overlooking the harbour in Monaco.',
    caption: 'Overlooking the harbour in Monaco.',
  },
};

export const v2Now = {
  label: 'Now / preview',
  location: 'England',
  work: 'Practical estate work and grounds improvement',
  building: ['Website V2', 'Codie Capital Research', 'A more consistent personal operating system'],
  learning: ['Property', 'Investment research', 'Business models', 'Discipline and follow-through'],
  lastReviewed: '13 July 2026',
} as const;

export const v2LifeChapters = [
  {
    title: 'Zimbabwe',
    context: 'Harare and Marondera',
    text: 'I grew up in Harare and attended Hellenic and Ruzawi before moving to Peterhouse for high school in Marondera. Boarding school became one of the most important periods of my life. I loved living closely with friends, playing sport every afternoon and having freedom inside a strong structure. The discipline mattered, but so did the friendships and the feeling of belonging to something larger than myself.',
  },
  {
    title: 'Cricket and sport',
    context: 'A formative discipline',
    text: 'Sport was part of everyday life. I played cricket, hockey, rugby and tennis, with cricket always at the centre. My father played cricket for Zimbabwe, which is why I joke that I came out of the womb holding a cricket bat. Sport taught me preparation, competition, teamwork, resilience and the difference between natural ability and sustained effort. A gruesome knee injury near the end of high school changed the future I had imagined for myself.',
  },
  {
    title: 'France and Europe',
    context: 'Early 2024 onward',
    text: 'In early 2024, I moved to the south of France intending to work on superyachts. I lived around Antibes, Cannes and Monaco, walked the docks looking for opportunities and completed day work cleaning teak, polishing stainless steel and maintaining the presentation standards expected on board. I completed yachting-related training, although the exact qualification names still need verification. After France I travelled in Spain, moved to Sweden and later travelled around Europe using money I had saved from working.',
  },
  {
    title: 'University decision',
    context: 'After two years',
    text: 'At university I initially studied real estate before moving into agriculture and business management. After two years, I realised the environment was no longer helping me build the habits, discipline or direction I wanted. Leaving was not an attack on education and it was not a decision to do nothing. I decided to change my environment, work more directly, take greater responsibility and build towards the life I genuinely wanted.',
  },
  {
    title: 'England now',
    context: 'Current chapter',
    text: 'I am currently working on an estate in England that is being developed into a wedding and events venue. The days can involve grounds improvement, maintenance, repairs, building tasks and whatever practical problem needs solving next. I enjoy being trusted with an area and seeing visible progress. Alongside that work, I am continuing Codie Capital Research, rebuilding this website and trying to create a more consistent personal operating system.',
  },
] as const;

export const v2SecondaryWork = [
  {
    title: 'Early lawn-care service',
    text: 'My brother and I started with a petrol-powered mower, recurring customers and arranged labour. Boarding school ended the operation.',
  },
  {
    title: 'Yacht day work',
    text: 'I cleaned teak, polished stainless steel, washed exterior spaces and learned how demanding presentation standards can be.',
  },
  {
    title: 'Gardening and landscaping',
    text: 'I enjoy outdoor work with visible progress. Less successful roles also taught me how much clear expectations, purpose, trust and payment matter.',
  },
  {
    title: 'Construction and demolition',
    text: 'I enjoy practical work where I can see the result at the end of the day.',
  },
  {
    title: 'Freight and supply chain',
    text: 'I saw more of the coordination, logistics and systems behind how goods move through a business. The employer remains unnamed pending confirmation.',
  },
] as const;

export const v2Principles = [
  { title: 'Improve by one percent', text: 'Small improvements can compound.' },
  { title: 'Never miss twice', text: 'A bad day or broken habit should not be repeated the following day.' },
  { title: 'Follow through', text: 'Words and actions should match.' },
  { title: 'Protect sleep', text: 'Aim for roughly 7.5 to 8.5 hours.' },
  { title: 'Take regret seriously', text: 'The cost of never trying can exceed a well-considered failure.' },
] as const;

export const v2WritingGateways = [
  { title: 'Portfolio Journal', href: '/journal', text: 'Regular portfolio reviews, trade reflections and lessons from a real personal account.' },
  { title: 'Letters', href: '/letters', text: 'Longer reflections on discipline, portfolio development and how thinking changes over time.' },
  { title: 'Investment Process', href: '/process', text: 'The rules for risk, position sizing, cash, patience and written decisions.' },
  { title: 'Books', href: '/books', text: 'Reading notes focused on what each book changed.' },
  { title: 'Decision Archive', href: '/decision-archive', text: 'The structure for recording important decisions without pretending unfinished notes are published work.' },
  { title: 'Mistakes & Lessons', href: '/mistakes-lessons', text: 'A place for honest review of errors and the process changes that follow.' },
] as const;

export const v2Contact = {
  email: 'codieandrew2609@gmail.com',
  instagramHandle: '@codiemarillier',
  instagramUrl: 'https://www.instagram.com/codiemarillier/',
  approvedForPreview: true,
} as const;
