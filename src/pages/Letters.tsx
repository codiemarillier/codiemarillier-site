import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { plannedLetters } from '../data/siteData';

export default function Letters() {
  return (
    <main className="page-fade">
      <PageHeader
        title="Letters"
        intro="Weekly reviews are what happened. Letters are what I learned and how my thinking is changing."
      />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-px border border-line bg-line">
          {plannedLetters.map((letter) => (
            <article key={letter.slug} className="bg-paper p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{letter.type}</p>
                <p className="text-xs font-semibold text-slateText">{letter.date}</p>
              </div>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-charcoal">{letter.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slateText">{letter.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {letter.themes.map((theme) => (
                  <span key={theme} className="border border-line bg-ivory px-3 py-1 text-xs font-semibold text-slateText">
                    {theme}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                Draft in progress
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
