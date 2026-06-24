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
          title="A record for improving the process."
          text="These notes are not here to embarrass me. They are here to make the process more honest, more repeatable, and less dependent on memory."
        />

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {mistakeLessons.map((lesson) => (
            <article key={lesson.slug} className="bg-paper p-6 md:p-8">
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
              <span className="mt-6 inline-flex text-sm font-semibold text-charcoal">
                Planned lesson
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
