import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { plannedLetters } from '../data/siteData';

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

  return (
    <main className="page-fade">
      <PageHeader
        eyebrow={`${entry.type} / ${entry.date}${entry.readingTime ? ` / ${entry.readingTime}` : ''}`}
        title={entry.title}
        intro={entry.summary}
      />

      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <article className="border-y border-line py-10">
          <div className="mb-8 flex flex-wrap gap-2">
            {entry.themes.map((theme) => (
              <span key={theme} className="border border-line bg-paper px-3 py-1 text-xs font-semibold text-slateText">
                {theme}
              </span>
            ))}
          </div>
          <div className="space-y-6">
            {entry.body?.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line text-lg leading-9 text-charcoal">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-gold pl-4 text-sm leading-7 text-slateText">
            This is a personal reflection from my own investment journal. It is not financial advice.
          </p>
        </article>

        <Link to={backLink} className="mt-8 inline-flex text-sm font-semibold text-charcoal">
          Back to {section === 'letters' ? 'Letters' : section === 'decisions' ? 'Decision Archive' : 'Mistakes & Lessons'}
        </Link>
      </section>
    </main>
  );
}
