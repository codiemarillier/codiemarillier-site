import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Analytics from './components/Analytics';
import { routeDefinitionByPath, routeMetaByPath, siteIdentity } from './data/siteConfig';

const Footer = lazy(() => import('./components/Footer'));
const Navbar = lazy(() => import('./components/Navbar'));
const ReadingProgress = lazy(() => import('./components/ReadingProgress'));
const About = lazy(() => import('./pages/About'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const BookDetail = lazy(() => import('./pages/BookDetail'));
const Books = lazy(() => import('./pages/Books'));
const CurrentPortfolio = lazy(() => import('./pages/CurrentPortfolio'));
const DecisionArchive = lazy(() => import('./pages/DecisionArchive'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Home = lazy(() => import('./pages/Home'));
const Letters = lazy(() => import('./pages/Letters'));
const MistakesLessons = lazy(() => import('./pages/MistakesLessons'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Philosophy = lazy(() => import('./pages/Philosophy'));
const PlannedEntryDetail = lazy(() => import('./pages/PlannedEntryDetail'));
const PortfolioJournal = lazy(() => import('./pages/PortfolioJournal'));
const Process = lazy(() => import('./pages/Process'));
const V2Preview = lazy(() => import('./pages/V2Preview'));
const V2DetailPage = lazy(() => import('./pages/V2DetailPage'));
const V2CapitalResearch = lazy(() => import('./pages/V2CapitalResearch'));
const V2HorseboxProject = lazy(() => import('./pages/V2HorseboxProject'));

type RouteMeta = {
  title: string;
  description: string;
};

type ResolvedRouteMeta = RouteMeta & {
  knownRoute: boolean;
};

const siteUrl = siteIdentity.baseUrl;
const staticMeta: Record<string, RouteMeta> = routeMetaByPath;
const defaultMeta: RouteMeta = staticMeta['/'];

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

async function getRouteMeta(pathname: string): Promise<ResolvedRouteMeta> {
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;

  if (staticMeta[normalizedPath]) {
    return { ...staticMeta[normalizedPath], knownRoute: true };
  }

  const journalSlug = normalizedPath.match(/^\/journal\/([^/]+)$/)?.[1];
  if (journalSlug) {
    const { journalEntries } = await import('./data/siteData');
    const entry = journalEntries.find((item) => item.slug === journalSlug);
    if (entry) {
      return {
        title: `${entry.title} | Portfolio Journal | Codie Capital Research`,
        description: `${entry.excerpt} Personal portfolio journal entry by Codie Marillier. Not investment advice.`,
        knownRoute: true,
      };
    }
  }

  const letterSlug = normalizedPath.match(/^\/letters\/([^/]+)$/)?.[1];
  if (letterSlug) {
    const { plannedLetters } = await import('./data/siteData');
    const entry = plannedLetters.find((item) => item.slug === letterSlug);
    if (entry) {
      return {
        title: `${entry.title} | Letters | Codie Capital Research`,
        description: entry.summary,
        knownRoute: true,
      };
    }
  }

  const bookSlug = normalizedPath.match(/^\/books\/([^/]+)$/)?.[1];
  if (bookSlug) {
    const { readingDevelopment } = await import('./data/siteData');
    const book = readingDevelopment.find((item) => item.slug === bookSlug);
    if (book) {
      return {
        title: `${book.title} | Books | Codie Capital Research`,
        description: `${book.takeaway} Book reflection by Codie Marillier.`,
        knownRoute: true,
      };
    }
  }

  return { ...(staticMeta['/404'] ?? defaultMeta), knownRoute: false };
}

function PageMeta() {
  const location = useLocation();

  useEffect(() => {
    let active = true;
    const normalizedPath = location.pathname !== '/' ? location.pathname.replace(/\/+$/, '') : location.pathname;
    const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`;
    const staticRoute = routeDefinitionByPath[normalizedPath];

    void getRouteMeta(location.pathname).then((meta) => {
      if (!active) return;
      const shouldNoIndex = staticRoute ? !staticRoute.indexable : !meta.knownRoute;
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
      upsertMeta('meta[name="robots"]', 'name', 'robots', shouldNoIndex ? 'noindex, follow' : 'index, follow');
    });

    return () => {
      active = false;
    };
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

function RouteLoading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-current opacity-45">Loading page…</span>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isV2Preview = pathname === '/v2-preview' || pathname.startsWith('/v2-preview/');

  return (
    <div className={isV2Preview ? 'min-h-screen bg-[#090b0c]' : 'min-h-screen bg-ivory text-bodyText'}>
      {!isV2Preview && (
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-link px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0">
          Skip to content
        </a>
      )}
      <Analytics />
      <ReactReady />
      <PageMeta />
      <ScrollToTop />
      {!isV2Preview && (
        <Suspense fallback={null}>
          <ReadingProgress />
          <Navbar />
        </Suspense>
      )}
      <div id="main-content">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:slug" element={<BookDetail />} />
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
          <Route path="/current-portfolio" element={<Navigate to="/portfolio" replace />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/v2-preview" element={<V2Preview />} />
          <Route path="/v2-preview/about" element={<V2DetailPage page="about" />} />
          <Route path="/v2-preview/work" element={<V2DetailPage page="work" />} />
          <Route path="/v2-preview/projects" element={<V2DetailPage page="projects" />} />
          <Route path="/v2-preview/capital-research" element={<V2CapitalResearch />} />
          <Route path="/v2-preview/projects/horsebox-conversion" element={<V2HorseboxProject />} />
          <Route path="/v2-preview/writing" element={<V2DetailPage page="writing" />} />
          <Route path="/v2-preview/travel" element={<V2DetailPage page="travel" />} />
          <Route path="/v2-preview/now" element={<V2DetailPage page="now" />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      {!isV2Preview && <Suspense fallback={null}><Footer /></Suspense>}
    </div>
  );
}
