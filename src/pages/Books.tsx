import PageHeader from '../components/PageHeader';
import { readingDevelopment } from '../data/siteData';

export default function Books() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Reading & Development"
        title="Books That Shaped My Thinking"
        intro="These are the books that have had the biggest influence on how I think about investing, money, discipline, purpose, risk, and long-term decision-making."
        align="center"
        tone="ivory"
      />

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-8 text-slateText md:text-lg md:leading-9">
              Not every book here is directly about investing, but each one has shaped the way I think about building
              wealth, staying patient, controlling emotions, and pursuing something meaningful over time.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-line bg-line">
            {readingDevelopment.map((book) => (
              <article key={book.title} className="grid gap-7 bg-ivory p-5 md:grid-cols-[190px_1fr] md:p-7 lg:p-9">
                <div className="max-w-[220px] self-start overflow-hidden border border-line bg-paper p-2 shadow-editorial md:max-w-none">
                  <img src={book.image} alt={book.imageAlt} className="block h-auto w-full bg-paper" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{book.category}</p>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
                    {book.title}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-slateText">{book.author}</p>
                  <div className="mt-6 grid gap-5 text-base leading-8 text-slateText">
                    {book.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl border border-line bg-ivory p-6 text-center text-base leading-8 text-slateText md:p-8 md:text-lg md:leading-9">
            Together, these books have shaped the way I think about investing and life. The investing books have taught
            me about value, risk, discipline, contrarian thinking, and protecting capital. The personal books have taught
            me about purpose, resilience, ambition, perspective, and using money properly. I do not see investing as
            separate from personal development. To become a better investor, I also need to become more patient, more
            disciplined, more thoughtful, and more aware of my own behaviour.
          </div>
        </div>
      </section>
    </main>
  );
}
