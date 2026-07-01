import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Feather, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { plannedLetters } from '../data/siteData';

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent" aria-hidden="true">
      <div className="h-full bg-gold transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function PlannedEntryDetail() {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const section = pathname.startsWith('/letters')
    ? 'letters'
    : pathname.startsWith('/decision-archive')
      ? 'decisions'
      : 'lessons';

  const backLink =
    section === 'letters' ? '/letters' : section === 'decisions' ? '/decision-archive' : '/mistakes-lessons';

  if (section !== 'letters') {
    return <Navigate to={backLink} replace />;
  }

  const entry = plannedLetters.find((item) => item.slug === slug);
  const isPublished = Boolean(entry?.body?.length);

  if (!entry) {
    return <Navigate to="/letters" replace />;
  }

  if (!isPublished) {
    return <Navigate to="/letters" replace />;
  }

  const wordCount = entry.body?.join(' ').split(/\s+/).filter(Boolean).length ?? 0;
  const estimatedMinutes = entry.readingTime ?? `${Math.max(1, Math.round(wordCount / 210))} min read`;
  const firstBodyParagraph = entry.body?.[0] ?? '';

  return (
    <main className="page-fade bg-[#f3eadb]">
      <ReadingProgress />

      <header className="border-b border-line bg-charcoal text-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
          <Link
            to={backLink}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-paper/80 transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Letters
          </Link>

          <div className="mt-10 grid gap-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-gold">{entry.type}</p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-none md:text-7xl">
                {entry.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/78 md:text-xl md:leading-9">{entry.summary}</p>
            </div>

            <dl className="grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Date', entry.date],
                ['Reading time', estimatedMinutes],
                ['Themes', `${entry.themes.length} notes`],
              ].map(([label, value]) => (
                <div key={label} className="bg-charcoal/80 p-4">
                  <dt className="text-xs font-semibold uppercase text-gold">{label}</dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 md:py-16 lg:grid-cols-[240px_minmax(0,760px)_240px] lg:items-start">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-y border-line py-5">
            <p className="font-serif text-2xl font-semibold leading-tight text-charcoal">A longer reflection, not a weekly update.</p>
            <p className="mt-4 text-sm leading-7 text-slateText">
              The weekly reviews record what happened. This letter explains the thinking underneath the record.
            </p>
          </div>
        </aside>

        <article className="min-w-0 bg-paper shadow-editorial">
          <div className="border-b border-line bg-ivory px-5 py-5 md:px-8">
            <div className="flex flex-wrap gap-2">
              {entry.themes.map((theme) => (
                <span key={theme} className="border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-slateText">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div className="px-5 py-8 md:px-10 md:py-12">
            <div className="mb-10 border-l-2 border-gold bg-ivory px-5 py-5">
              <div className="flex items-center gap-3 text-sm font-semibold text-charcoal">
                <Feather className="h-4 w-4 text-gold" aria-hidden="true" />
                <span>From Codie</span>
              </div>
              <p className="mt-4 font-serif text-2xl font-semibold leading-9 text-charcoal md:text-3xl md:leading-10">
                {firstBodyParagraph}
              </p>
            </div>

            <div className="space-y-7">
              {entry.body?.slice(1).map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line text-[1.0625rem] leading-9 text-charcoal md:text-lg md:leading-9">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              <div className="flex gap-3 border border-line bg-ivory p-4">
                <BookOpen className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-charcoal">Long-form reflection</p>
                  <p className="mt-1 text-sm leading-6 text-slateText">Written to explain the process behind the weekly record.</p>
                </div>
              </div>
              <div className="flex gap-3 border border-line bg-ivory p-4">
                <Clock className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-charcoal">{estimatedMinutes}</p>
                  <p className="mt-1 text-sm leading-6 text-slateText">Best read slowly rather than skimmed.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 flex gap-3 border-l-2 border-gold bg-[#f3eadb] px-4 py-4 text-sm leading-7 text-slateText">
              <ShieldCheck className="mt-1 h-4 w-4 flex-none text-gold" aria-hidden="true" />
              <span>This is a personal reflection from my own investment journal. It is not financial advice.</span>
            </p>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 border-y border-line py-5">
            <p className="text-xs font-semibold uppercase text-gold">Reading notes</p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slateText">
              <li>Published {entry.date}.</li>
              <li>{estimatedMinutes}.</li>
              <li>{wordCount.toLocaleString('en-GB')} words.</li>
            </ul>
          </div>
        </aside>

        <Link to={backLink} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-charcoal lg:col-start-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to {section === 'letters' ? 'Letters' : section === 'decisions' ? 'Decision Archive' : 'Mistakes & Lessons'}
        </Link>
      </section>
    </main>
  );
}
