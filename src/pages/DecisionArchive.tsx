import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function DecisionArchive() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Decision Archive"
        title="Decision Archive"
        intro="This section will eventually hold full decision memos for major buys, sells, trims, and holds. It is intentionally simple until proper memos exist."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <div className="border border-line bg-paper p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">Coming soon</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-charcoal">No full decision memos are published yet.</h2>
          <p className="mt-4 text-base leading-8 text-slateText">
            I do not want this page to look finished before the work exists. When a full memo is written, this page will
            record the reasoning, expectations, risks, outcome, and lessons.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/journal" className="text-sm font-semibold text-link">
              Read the weekly journal
            </Link>
            <Link to="/process" className="text-sm font-semibold text-link">
              See the process
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
