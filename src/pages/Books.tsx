import PageHeader from '../components/PageHeader';
import { readingDevelopment } from '../data/siteData';

function tagsFromCategory(category: string) {
  return category.split('/').map((tag) => tag.trim()).filter(Boolean);
}

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
              Not every book here is directly about investing, but each one has shaped the way I think about risk,
              behaviour, patience, ambition, and using money properly.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {readingDevelopment.map((book) => (
              <article key={book.title} className="grid gap-6 border border-line bg-ivory p-5 shadow-editorial md:grid-cols-[150px_1fr] md:p-6">
                <div className="max-w-[180px] self-start overflow-hidden border border-line bg-paper p-2 md:max-w-none">
                  <img src={book.image} alt={book.imageAlt} className="block h-auto w-full bg-paper" />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {tagsFromCategory(book.category).map((tag) => (
                      <span key={tag} className="border border-line bg-paper px-3 py-1 text-xs font-semibold text-slateText">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-charcoal">{book.title}</h2>
                  <p className="mt-2 text-sm font-semibold text-slateText">{book.author}</p>
                  <p className="mt-5 border-l-2 border-gold bg-paper px-4 py-3 text-sm font-semibold leading-7 text-charcoal">
                    Takeaway: {book.takeaway}
                  </p>
                  <div className="mt-6 grid gap-4 border-t border-line pt-5 text-sm leading-7 text-slateText">
                    {book.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl border border-line bg-ivory p-6 text-center text-base leading-8 text-slateText md:p-8 md:text-lg md:leading-9">
            Together, these books have shaped the way I think about investing and life. I do not see investing as
            separate from personal development. To become a better investor, I also need to become more patient, more
            disciplined, more thoughtful, and more aware of my own behaviour.
          </div>
        </div>
      </section>
    </main>
  );
}
