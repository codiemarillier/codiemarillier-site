import { useRef } from 'react';
import V2SubpageFrame from '../components/V2SubpageFrame';
import { journalEntries, plannedLetters } from '../data/siteData';

const firstLetter = plannedLetters.find((letter) => letter.slug === 'my-first-letter' && letter.body?.length);
const portfolioReviews = journalEntries.filter((entry) => ['Weekly Reviews', 'Fortnightly Reviews'].includes(entry.category));
const standaloneEntries = journalEntries.filter((entry) => !['Weekly Reviews', 'Fortnightly Reviews'].includes(entry.category));

export default function V2CapitalResearch() {
  const reviewRailRef = useRef<HTMLDivElement>(null);

  const moveReviewRail = (direction: -1 | 1) => {
    const rail = reviewRailRef.current;
    if (!rail) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.88, 520), behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <V2SubpageFrame
      currentSection="projects"
      eyebrow="Project / Investing and writing"
      title="Codie Capital Research"
      introduction="A public record of my real portfolio, the decisions behind it and the lessons that are easier to see when they are written down. It is personal research, never personalised investment advice."
      backHref="/v2-preview/projects"
      backLabel="Back to projects"
    >
      <section className="v2-light border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">01 / Start here</p>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-none tracking-[-0.04em] text-[#17221e] sm:text-6xl">The letter explains why the record exists.</h2>
            {firstLetter ? (
              <article className="mt-10 border-y border-black/10 bg-transparent py-8 sm:py-10">
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#32634f]">
                  <span>{firstLetter.type}</span><span>{firstLetter.date}</span>{firstLetter.readingTime ? <span>{firstLetter.readingTime}</span> : null}
                </div>
                <h3 className="mt-5 font-serif text-3xl text-[#17221e] sm:text-5xl">{firstLetter.title}</h3>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#52625b]">{firstLetter.summary}</p>
                <a href={`/letters/${firstLetter.slug}`} className="v2-arrow-link mt-8 max-w-md"><span>Read My First Letter</span><span aria-hidden="true">→</span></a>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="v2-sand border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1344px]">
          <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">02 / Journal</p>
            <div>
              <h2 className="max-w-4xl font-serif text-4xl leading-none tracking-[-0.04em] text-[#17221e] sm:text-6xl">The portfolio, week by week.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#52625b]">Move through the reviews in order and open any week independently. On a phone, swipe across the cards or use the arrow controls.</p>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between gap-5 border-t border-black/10 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#32634f]">{portfolioReviews.length} chronological reviews</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => moveReviewRail(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-black/15 text-[#32634f] transition-colors hover:border-[#32634f] hover:bg-white" aria-label="Show previous portfolio reviews">←</button>
              <button type="button" onClick={() => moveReviewRail(1)} className="grid h-11 w-11 place-items-center rounded-full border border-black/15 text-[#32634f] transition-colors hover:border-[#32634f] hover:bg-white" aria-label="Show next portfolio reviews">→</button>
            </div>
          </div>
          <div ref={reviewRailRef} className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5" aria-label="Portfolio reviews by week">
            {portfolioReviews.map((entry, index) => (
              <a key={entry.slug} href={`/journal/${entry.slug}`} className="group flex min-h-72 w-[86vw] max-w-[29rem] shrink-0 snap-start flex-col rounded-2xl border border-black/10 bg-[#f4f1ea] p-6 transition-colors hover:border-[#32634f]/40 hover:bg-white sm:w-[25rem] sm:p-8 lg:w-[29rem]">
                <div className="flex items-start justify-between gap-5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#32634f]"><span>{String(index + 1).padStart(2, '0')} / {entry.category}</span><span className="shrink-0">{entry.date}</span></div>
                <h3 className="mt-6 font-serif text-3xl leading-tight tracking-[-0.03em] text-[#17221e]">{entry.title}</h3>
                <p className="mt-4 line-clamp-3 leading-7 text-[#52625b]">{entry.excerpt}</p>
                <span className="mt-auto pt-7 text-sm font-medium text-[#32634f]">Read this entry <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-light border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">03 / Notes & reflections</p>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-none tracking-[-0.04em] text-[#17221e] sm:text-6xl">Ideas that sit outside the weekly record.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#52625b]">These pieces focus on one rule, decision or trade rather than summarising an entire week.</p>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {standaloneEntries.map((entry) => (
                <a key={entry.slug} href={`/journal/${entry.slug}`} className="group flex min-h-72 flex-col rounded-2xl border border-black/10 bg-white/45 p-6 transition-colors hover:border-[#32634f]/40 hover:bg-white sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.13em] text-[#32634f]"><span>{entry.category}</span><span>{entry.date}</span></div>
                  <h3 className="mt-6 font-serif text-3xl leading-tight tracking-[-0.03em] text-[#17221e]">{entry.title}</h3>
                  <p className="mt-4 leading-7 text-[#52625b]">{entry.excerpt}</p>
                  <span className="mt-auto pt-7 text-sm font-medium text-[#32634f]">Read this piece <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="v2-sand border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">04 / Explore</p>
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.04em] text-[#17221e] sm:text-5xl">The rest of the research record.</h2>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                ['Current portfolio', '/portfolio'],
                ['Investment process', '/process'],
                ['Decision archive', '/decision-archive'],
                ['Mistakes and lessons', '/mistakes-lessons'],
                ['Letters', '/letters'],
                ['Book notes', '/books'],
              ].map(([label, href]) => <a key={href} href={href} className="v2-arrow-link"><span>{label}</span><span aria-hidden="true">→</span></a>)}
            </div>
            <p className="mt-10 max-w-3xl border-l-2 border-[#c8a96a] pl-5 text-sm leading-7 text-[#52625b]">Codie Capital Research documents my own portfolio and developing process. It is not a fund, investment service or recommendation to copy a trade.</p>
          </div>
        </div>
      </section>
    </V2SubpageFrame>
  );
}
