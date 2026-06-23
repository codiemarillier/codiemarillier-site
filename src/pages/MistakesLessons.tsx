import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import { mistakeLessons } from '../data/siteData';

export default function MistakesLessons() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Mistakes & Lessons"
        title="Mistakes & Lessons"
        intro="This section is for recording mistakes, difficult decisions, and lessons from the portfolio. The aim is not to avoid mistakes completely, but to make sure I learn from them, improve my process, and do not repeat the same errors without understanding them."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Coming soon"
          title="A record for honest reviews."
          text="These lesson cards are planned placeholders. Future entries will explain what happened, why it mattered, what I got wrong, what I learned, and what I would do differently."
        />

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {mistakeLessons.map((lesson) => (
            <Link key={lesson.slug} to={`/mistakes-lessons/${lesson.slug}`} className="group bg-paper p-6 transition-colors hover:bg-ivory md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{lesson.period}</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-charcoal">{lesson.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slateText">{lesson.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {lesson.themes.map((theme) => (
                  <span key={theme} className="border border-line bg-ivory px-3 py-1 text-xs font-semibold text-slateText">
                    {theme}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                Open lesson template
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
