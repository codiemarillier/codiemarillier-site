import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { JournalEntry } from '../data/siteData';

function readLabel(block: string, labels: string[]) {
  const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);

  for (const label of labels) {
    const index = lines.findIndex((line) => line.toLowerCase() === label.toLowerCase());
    if (index >= 0 && lines[index + 1]) return lines[index + 1];
  }

  return '';
}

function getCardFacts(entry: JournalEntry) {
  const snapshot = entry.body[0] ?? '';
  const accountValue =
    readLabel(snapshot, ['Account value at review', 'Current account value', 'Account value', 'Estimated account value']) ||
    'Not recorded';
  const weeklyMove =
    readLabel(snapshot, ['Move since Week 14', 'Weekly move']) ||
    (entry.category === 'Weekly Reviews' ? 'Qualitative review only' : 'Not recorded');
  const mainLessonBlock =
    entry.body.find((block) => /main lesson|main lessons|overall conclusion/i.test(block)) ?? entry.excerpt;
  const mainLesson =
    mainLessonBlock
      .replace(/^\d+\.\s*/g, '')
      .replace(/^(Main lessons? from (the )?Week \d+|Main lesson from the week|Overall conclusion)\n/i, '')
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.length > 35) ?? entry.excerpt;

  return {
    accountValue,
    weeklyMove,
    mainLesson: mainLesson.replace(/\s+/g, ' ').replace(/^The main lesson (this week )?is that /i, '').slice(0, 170),
  };
}

export default function JournalTimeline({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="grid gap-4">
      {entries.map((entry) => {
        const facts = getCardFacts(entry);

        return (
          <article
            key={entry.slug}
            className="group border border-line bg-paper p-5 transition-colors hover:bg-ivory md:p-7"
          >
            <div className="grid gap-5 md:grid-cols-[180px_1fr_auto] md:items-start">
              <div>
                <p className="text-sm font-semibold text-charcoal">{entry.date}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">{entry.category}</p>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-semibold text-charcoal">{entry.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slateText">{entry.excerpt}</p>
              </div>
              <Link
                to={`/journal/${entry.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
              >
                Read more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <dl className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
              {[
                ['Account value', facts.accountValue],
                ['Weekly move', facts.weeklyMove],
                ['Main lesson', facts.mainLesson],
              ].map(([label, value]) => (
                <div key={label} className="bg-ivory p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slateText">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        );
      })}
    </div>
  );
}
