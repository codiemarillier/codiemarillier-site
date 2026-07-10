import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { plannedLetters } from '../data/siteData';

const publishedLetters = plannedLetters.filter((letter) => letter.body?.length);

export default function Letters() {
  const featuredLetter = publishedLetters[0];

  return (
    <main className="page-fade">
      <PageHeader
        title="Letters"
        intro="Portfolio reviews record what happened. Letters are longer reflections on what I am learning underneath the account value."
      />

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        {featuredLetter ? (
          <article className="border border-line bg-paper p-6 shadow-editorial md:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">{featuredLetter.type}</p>
              <p className="text-xs font-semibold text-slateText">{featuredLetter.date}</p>
              {featuredLetter.readingTime ? (
                <p className="text-xs font-semibold text-slateText">{featuredLetter.readingTime}</p>
              ) : null}
            </div>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              {featuredLetter.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slateText">{featuredLetter.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredLetter.themes.map((theme) => (
                <span key={theme} className="border border-line bg-paper px-3 py-1 text-xs font-semibold text-slateText">
                  {theme}
                </span>
              ))}
            </div>
            <Link
              to={`/letters/${featuredLetter.slug}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-charcoal px-6 text-sm font-semibold text-paper transition-colors hover:bg-navy"
            >
              Read My First Letter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ) : (
          <div className="border border-line bg-paper p-8 text-center">
            <p className="font-serif text-3xl font-semibold text-charcoal">No letters are published yet.</p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slateText">
              This section will only show full letters once they are ready.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
