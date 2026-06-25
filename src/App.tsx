import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import Books from './pages/Books';
import CurrentPortfolio from './pages/CurrentPortfolio';
import DecisionArchive from './pages/DecisionArchive';
import Disclaimer from './pages/Disclaimer';
import Home from './pages/Home';
import Letters from './pages/Letters';
import MistakesLessons from './pages/MistakesLessons';
import NotFound from './pages/NotFound';
import Philosophy from './pages/Philosophy';
import PlannedEntryDetail from './pages/PlannedEntryDetail';
import PortfolioJournal from './pages/PortfolioJournal';
import Process from './pages/Process';
import { brand, journalEntries, plannedLetters } from './data/siteData';

type RouteMeta = {
  title: string;
  description: string;
};

const defaultMeta: RouteMeta = {
  title: 'Codie Capital Research | Investment Journal by Codie Marillier',
  description:
    "Codie Marillier's personal investment journal: a public record of portfolio decisions, weekly reviews, process, and long-term learning. Not investment advice.",
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
  '/letters': {
    title: 'Letters | Codie Capital Research',
    description:
      "Longer-form reflections from Codie Marillier's personal investment journal, covering lessons, discipline, portfolio development, and investing process.",
  },
  '/decision-archive': {
    title: 'Decision Archive | Codie Capital Research',
    description:
      'A structured archive of major investment decisions, including reasoning, expectations, risks, outcomes, and lessons learned.',
  },
  '/mistakes-lessons': {
    title: 'Mistakes & Lessons | Codie Capital Research',
    description:
      'A personal record of investing mistakes, difficult decisions, and lessons learned from managing a real portfolio over time.',
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
  '/404': {
    title: 'Page Not Found | Codie Capital Research',
    description: 'The requested page could not be found on Codie Capital Research.',
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
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;

  if (staticMeta[normalizedPath]) {
    return staticMeta[normalizedPath];
  }

  const journalSlug = normalizedPath.match(/^\/journal\/([^/]+)$/)?.[1];
  if (journalSlug) {
    const entry = journalEntries.find((item) => item.slug === journalSlug);
    if (entry) {
      return {
        title: `${entry.title} | Portfolio Journal | Codie Capital Research`,
        description: `${entry.excerpt} Personal portfolio journal entry by Codie Marillier. Not investment advice.`,
      };
    }
  }

  const letterSlug = normalizedPath.match(/^\/letters\/([^/]+)$/)?.[1];
  if (letterSlug) {
    const entry = plannedLetters.find((item) => item.slug === letterSlug);
    if (entry) {
      return {
        title: `${entry.title} | Letters | Codie Capital Research`,
        description: entry.summary,
      };
    }
  }

  return defaultMeta;
}

function PageMeta() {
  const location = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    const normalizedPath = location.pathname !== '/' ? location.pathname.replace(/\/+$/, '') : location.pathname;
    const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`;

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

function ReactReady() {
  useEffect(() => {
    document.documentElement.classList.add('react-hydrated');
  }, []);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <ReactReady />
      <PageMeta />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/process" element={<Process />} />
        <Route path="/journal" element={<PortfolioJournal />} />
        <Route path="/journal/:slug" element={<ArticleDetail type="journal" />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/letters/:slug" element={<PlannedEntryDetail />} />
        <Route path="/decision-archive" element={<DecisionArchive />} />
        <Route path="/decision-archive/:slug" element={<PlannedEntryDetail />} />
        <Route path="/mistakes-lessons" element={<MistakesLessons />} />
        <Route path="/mistakes-lessons/:slug" element={<PlannedEntryDetail />} />
        <Route path="/portfolio" element={<CurrentPortfolio />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
