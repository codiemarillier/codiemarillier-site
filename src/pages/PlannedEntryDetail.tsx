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
      <div className="h-full bg-link transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
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
    <main className="page-fade bg-[#E9EDF0]">
      <ReadingProgress />

      <header className="border-b border-line bg-mist text-charcoal">
        <div className="mx-auto max-w-[920px] px-5 py-8 md:px-8 md:py-10">
          <Link
            to={backLink}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-link transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Letters
          </Link>

          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateText">Codie Marillier · {entry.type}</p>
              <h1 className="mt-2 max-w-3xl font-serif text-3xl font-semibold leading-tight md:text-4xl">{entry.title}</h1>
            </div>

            <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slateText">
              {[
                ['Date', entry.date],
                ['Reading time', estimatedMinutes],
                ['Themes', `${entry.themes.length} notes`],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-1.5">
                  <dt className="font-medium">{label}:</dt>
                  <dd className="font-semibold text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[920px] px-3 py-8 sm:px-5 md:py-16">

        <article className="relative min-w-0 border border-[#D4D9DD] bg-paper shadow-[0_18px_55px_rgba(11,31,51,0.13)]">
          <div className="border-b border-line px-7 py-5 md:px-16">
            <div className="flex flex-wrap gap-2">
              {entry.themes.map((theme) => (
                <span key={theme} className="border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-slateText">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div className="px-7 py-10 md:px-16 md:py-16 lg:px-20">
            <div className="mb-12 border-b border-line pb-10 text-center">
              <Feather className="mx-auto h-5 w-5 text-gold" aria-hidden="true" />
              <p className="mt-5 font-serif text-2xl font-semibold leading-9 text-charcoal md:text-3xl md:leading-10">{firstBodyParagraph}</p>
              <p className="mt-4 text-sm font-medium text-slateText">{entry.date}</p>
            </div>

            <div className="space-y-6 font-serif">
              {entry.body?.slice(1).map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line text-[1.0625rem] leading-[1.95] text-bodyText md:text-[1.125rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              <div className="flex gap-3 border border-line bg-paper p-4">
                <BookOpen className="mt-0.5 h-5 w-5 flex-none text-slateText" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-charcoal">Long-form reflection</p>
                  <p className="mt-1 text-sm leading-6 text-slateText">Written to explain the process behind the regular record.</p>
                </div>
              </div>
              <div className="flex gap-3 border border-line bg-paper p-4">
                <Clock className="mt-0.5 h-5 w-5 flex-none text-slateText" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-charcoal">{estimatedMinutes}</p>
                  <p className="mt-1 text-sm leading-6 text-slateText">Best read slowly rather than skimmed.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 flex gap-3 border-l-2 border-gold bg-ivory px-4 py-4 text-sm leading-7 text-bodyText">
              <ShieldCheck className="mt-1 h-4 w-4 flex-none text-slateText" aria-hidden="true" />
              <span>This is a personal reflection from my own investment journal. It is not financial advice.</span>
            </p>
          </div>
        </article>

        <Link to={backLink} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-link">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to {section === 'letters' ? 'Letters' : section === 'decisions' ? 'Decision Archive' : 'Mistakes & Lessons'}
        </Link>
      </section>
    </main>
  );
}
