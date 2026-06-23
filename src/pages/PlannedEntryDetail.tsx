import { Link, useLocation, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import {
  decisionArchiveEntries,
  mistakeLessons,
  plannedLetters,
} from '../data/siteData';

const templateFields = {
  letters: ['Title', 'Date', 'Type', 'Short summary', 'Main themes', 'Full letter draft'],
  decisions: [
    'Date',
    'Decision title',
    'Holding / ticker',
    'Action taken',
    'Position type',
    'Why I made the decision',
    'What I expected',
    'What could go wrong',
    'What actually happened',
    'What I learned',
    'Related weekly review',
    'Status',
  ],
  lessons: [
    'Title',
    'Date or period',
    'What happened',
    'Why it mattered',
    'What I got wrong',
    'What I learned',
    'What I would do differently',
    'Related decision or weekly review',
  ],
};

export default function PlannedEntryDetail() {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const letter = plannedLetters.find((item) => item.slug === slug);
  const decision = decisionArchiveEntries.find((item) => item.slug === slug);
  const lesson = mistakeLessons.find((item) => item.slug === slug);

  const entry = letter ?? decision ?? lesson;
  const section = pathname.startsWith('/letters')
    ? 'letters'
    : pathname.startsWith('/decision-archive')
      ? 'decisions'
      : 'lessons';

  if (!entry) {
    return (
      <main className="page-fade">
        <PageHeader eyebrow="Template" title="Entry Not Found" intro="This planned entry could not be found." />
      </main>
    );
  }

  const backLink =
    section === 'letters' ? '/letters' : section === 'decisions' ? '/decision-archive' : '/mistakes-lessons';

  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Planned template"
        title={entry.title}
        intro="This page is a prepared template for a future piece of writing. The full content has not been written yet."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div className="border border-line bg-paper p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Coming soon</p>
          <p className="mt-4 text-base leading-8 text-slateText">
            This entry is planned so the site has the right structure before the full letter, decision memo, or lesson is
            written. It is intentionally not pretending to be finished.
          </p>
        </div>

        <div className="mt-8 grid gap-px border border-line bg-line">
          {templateFields[section].map((field) => (
            <div key={field} className="grid gap-3 bg-paper p-5 md:grid-cols-[220px_1fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{field}</p>
              <p className="text-sm leading-7 text-slateText">To be written.</p>
            </div>
          ))}
        </div>

        <Link to={backLink} className="mt-8 inline-flex text-sm font-semibold text-charcoal">
          Back to {section === 'letters' ? 'Letters' : section === 'decisions' ? 'Decision Archive' : 'Mistakes & Lessons'}
        </Link>
      </section>
    </main>
  );
}
