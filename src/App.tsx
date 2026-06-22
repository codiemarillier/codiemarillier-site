import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import CurrentPortfolio from './pages/CurrentPortfolio';
import Disclaimer from './pages/Disclaimer';
import Home from './pages/Home';
import Philosophy from './pages/Philosophy';
import PortfolioJournal from './pages/PortfolioJournal';
import { brand, journalEntries } from './data/siteData';

type RouteMeta = {
  title: string;
  description: string;
};

const defaultMeta: RouteMeta = {
  title: 'Codie Capital Research | Investment Journal by Codie Marillier',
  description:
    "A personal investment journal documenting Codie Marillier's own portfolio reviews, holdings, philosophy, and lessons. Not investment advice.",
};

const siteUrl = 'https://codiemarillier.com';

const staticMeta: Record<string, RouteMeta> = {
  '/': defaultMeta,
  '/about': {
    title: 'About | Codie Capital Research',
    description:
      'The story behind Codie Capital Research, a personal investment journal by Codie Marillier documenting his own portfolio, mistakes, reading, and long-term investing development.',
  },
  '/books': {
    title: 'Books That Shaped My Thinking | Codie Capital Research',
    description:
      "Books that shaped Codie Marillier's thinking about investing, money, discipline, purpose, risk, and long-term decision-making.",
  },
  '/philosophy': {
    title: 'Investment Philosophy | Codie Capital Research',
    description:
      "A private long-term investor's written philosophy around business quality, valuation discipline, risk control, cash patience, and learning from mistakes.",
  },
  '/process': {
    title: 'Investment Process | Codie Capital Research',
    description:
      "Codie Marillier's personal investing process: long-term ownership, written reasoning, risk control, cash discipline, and avoiding leverage.",
  },
  '/journal': {
    title: 'Portfolio Journal | Codie Capital Research',
    description:
      "Weekly portfolio reviews and trade reflections written for accountability around Codie Marillier's own portfolio. Not investment advice.",
  },
  '/portfolio': {
    title: 'Current Portfolio | Codie Capital Research',
    description:
      "A manual record of Codie Marillier's own portfolio structure, holdings, cash, and lessons. Not a model portfolio and not investment advice.",
  },
  '/disclaimer': {
    title: 'Disclaimer | Codie Capital Research',
    description: brand.disclaimer,
  },
};

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
}

function getRouteMeta(pathname: string): RouteMeta {
  if (staticMeta[pathname]) {
    return staticMeta[pathname];
  }

  const journalSlug = pathname.match(/^\/journal\/([^/]+)$/)?.[1];
  if (journalSlug) {
    const entry = journalEntries.find((item) => item.slug === journalSlug);
    if (entry) {
      return {
        title: `${entry.title} | Portfolio Journal | Codie Capital Research`,
        description: `${entry.excerpt} Personal portfolio journal entry by Codie Marillier. Not investment advice.`,
      };
    }
  }

  return defaultMeta;
}

function PageMeta() {
  const location = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    const canonicalUrl = `${siteUrl}${location.pathname === '/' ? '/' : location.pathname}`;

    document.title = meta.title;
    upsertCanonical(canonicalUrl);
    upsertMeta('meta[name="description"]', 'name', 'description', meta.description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  }, [location.pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <PageMeta />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<About />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/process" element={<Philosophy />} />
        <Route path="/journal" element={<PortfolioJournal />} />
        <Route path="/journal/:slug" element={<ArticleDetail type="journal" />} />
        <Route path="/portfolio" element={<CurrentPortfolio />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
