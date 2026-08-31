export type RouteDefinition = {
  id: string;
  path: string;
  title: string;
  description: string;
  sitemap: boolean;
  staticPage: boolean;
  indexable: boolean;
  legacyAliases?: string[];
};

export const siteIdentity = {
  personName: 'Codie Marillier',
  baseUrl: 'https://codiemarillier.com',
  investing: {
    name: 'Codie Capital Research',
    subtitle: 'An investment journal by Codie Marillier',
    disclaimer:
      'This website is a personal investment research and portfolio journal. It is not investment advice. I am not FCA-authorised, I do not manage money for other people, and nothing on this site should be treated as a recommendation to buy, sell, or hold any investment. All trades, holdings, research notes, and opinions shown here relate to my own personal portfolio and my own decision-making process. Do not copy my trades. Always do your own research and seek professional advice where appropriate.',
  },
} as const;

export const publicRouteManifest: RouteDefinition[] = [
  {
    id: 'home',
    path: '/',
    title: 'Codie Marillier | Investment Journal & Research',
    description:
      "Codie Marillier's public record of investment thinking, decisions, percentage performance, research, and long-term learning. Personal finances remain private.",
    sitemap: true,
    staticPage: true,
    indexable: true,
    legacyAliases: ['/start'],
  },
  {
    id: 'about',
    path: '/about',
    title: 'About | Codie Capital Research',
    description:
      'The story behind Codie Capital Research, a personal investment journal by Codie Marillier documenting his own portfolio, mistakes, reading, and long-term investing development.',
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'books',
    path: '/books',
    title: 'Books I Have Read | Codie Capital Research',
    description:
      'A bookshelf of books Codie Marillier has read, with reflections on investing, money, discipline, purpose, risk, and long-term decision-making.',
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'philosophy',
    path: '/philosophy',
    title: 'Investment Philosophy | Codie Capital Research',
    description:
      "A private long-term investor's written philosophy around business quality, valuation discipline, risk control, cash patience, and learning from mistakes.",
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'process',
    path: '/process',
    title: 'Investment Process | Codie Capital Research',
    description:
      "Codie Marillier's personal investing process: long-term ownership, written reasoning, risk control, cash discipline, and avoiding leverage.",
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'journal',
    path: '/journal',
    title: 'Portfolio Journal | Codie Capital Research',
    description:
      "Portfolio reviews and trade reflections written for accountability around Codie Marillier's own portfolio. Not investment advice.",
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'letters',
    path: '/letters',
    title: 'Letters | Codie Capital Research',
    description:
      "Longer-form reflections from Codie Marillier's personal investment journal, covering lessons, discipline, portfolio development, and investing process.",
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'decision-archive',
    path: '/decision-archive',
    title: 'Decision Archive | Codie Capital Research',
    description:
      'A structured archive of major investment decisions, including reasoning, expectations, risks, outcomes, and lessons learned.',
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'mistakes-lessons',
    path: '/mistakes-lessons',
    title: 'Mistakes & Lessons | Codie Capital Research',
    description:
      'A personal record of investing mistakes, difficult decisions, and lessons learned from managing a real portfolio over time.',
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'portfolio',
    path: '/portfolio',
    title: 'Current Portfolio | Codie Capital Research',
    description:
      "A manual record of Codie Marillier's own holdings, rounded allocation weights, percentage performance, decisions, and lessons. Not a model portfolio or investment advice.",
    sitemap: true,
    staticPage: true,
    indexable: true,
    legacyAliases: ['/current-portfolio'],
  },
  {
    id: 'disclaimer',
    path: '/disclaimer',
    title: 'Disclaimer | Codie Capital Research',
    description: siteIdentity.investing.disclaimer,
    sitemap: true,
    staticPage: true,
    indexable: true,
  },
  {
    id: 'not-found',
    path: '/404',
    title: 'Page Not Found | Codie Capital Research',
    description: 'The requested page could not be found on Codie Capital Research.',
    sitemap: false,
    staticPage: true,
    indexable: false,
  },
  {
    id: 'v2-preview',
    path: '/v2-preview',
    title: 'Website V2 Preview | Codie Marillier',
    description:
      'A private local preview of Codie Marillier’s broader personal website. Not intended for search indexing or production publication.',
    sitemap: false,
    staticPage: true,
    indexable: false,
  },
  ...[
    ['about', 'About', 'A private preview of Codie Marillier’s broader personal biography and background.'],
    ['work', 'Work', 'A private preview of selected work experiences and practical lessons.'],
    ['projects', 'Projects', 'A private preview of active, researching and unconfirmed-status projects.'],
    ['writing', 'Writing', 'A private preview gateway to Codie Marillier’s preserved writing and investment archive.'],
    ['travel', 'Travel', 'A private preview of travel stories focused on people and perspective.'],
    ['now', 'Now', 'A private preview of Codie Marillier’s current work, learning and priorities.'],
  ].map(([slug, label, description]) => ({
    id: `v2-preview-${slug}`,
    path: `/v2-preview/${slug}`,
    title: `${label} | Website V2 Preview | Codie Marillier`,
    description,
    sitemap: false,
    staticPage: true,
    indexable: false,
  })),
  {
    id: 'v2-preview-capital-research',
    path: '/v2-preview/capital-research',
    title: 'Codie Capital Research | Website V2 Preview | Codie Marillier',
    description: 'A private preview gateway to Codie Marillier’s investment letter, journal entries, portfolio and research process.',
    sitemap: false,
    staticPage: true,
    indexable: false,
  },
  {
    id: 'v2-preview-horsebox-conversion',
    path: '/v2-preview/projects/horsebox-conversion',
    title: 'O and C Cotswolds Trailers Ltd | Website V2 Preview | Codie Marillier',
    description: 'A private preview of Codie Marillier’s documented horsebox conversion company and its practical lessons.',
    sitemap: false,
    staticPage: true,
    indexable: false,
  },
];

export const routeMetaByPath = Object.fromEntries(
  publicRouteManifest.map(({ path, title, description }) => [path, { title, description }]),
) as Record<string, { title: string; description: string }>;

export const routeDefinitionByPath = Object.fromEntries(
  publicRouteManifest.map((route) => [route.path, route]),
) as Record<string, RouteDefinition>;
