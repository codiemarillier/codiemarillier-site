import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import { plannedLetters } from '../data/siteData';

export default function Letters() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Letters"
        title="Letters"
        intro="Letters are longer-form reflections on my investing journey. Unlike the weekly portfolio reviews, these are not only about what changed in the account. They are about what I am learning, how my thinking is developing, and what I am trying to improve over time."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          eyebrow="Coming soon"
          title="A place for longer reflections."
          text="These letters are planned but not written yet. The structure is here so future monthly letters, quarterly letters, and deeper reflections can sit alongside the weekly portfolio record."
        />

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {plannedLetters.map((letter) => (
            <Link key={letter.slug} to={`/letters/${letter.slug}`} className="group bg-paper p-6 transition-colors hover:bg-ivory md:p-8">
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
                Open letter template
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
