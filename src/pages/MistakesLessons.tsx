import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function MistakesLessons() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Mistakes & Lessons"
        title="Mistakes & Lessons"
        intro="This section will become a proper record of mistakes, difficult decisions, and process lessons once full entries are written."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <div className="border border-line bg-paper p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Coming soon</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-charcoal">No full lesson notes are published yet.</h2>
          <p className="mt-4 text-base leading-8 text-slateText">
            I will use this page for real reviews of mistakes and difficult decisions. Until those are written properly,
            the weekly journal and process page are the best places to read.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/journal" className="text-sm font-semibold text-charcoal">
              Read the weekly journal
            </Link>
            <Link to="/process" className="text-sm font-semibold text-charcoal">
              See the process
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
