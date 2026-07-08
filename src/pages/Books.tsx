import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { readingDevelopment } from '../data/siteData';

function tagsFromCategory(category: string) {
  return category.split('/').map((tag) => tag.trim()).filter(Boolean);
}

export default function Books() {
  const categoryCount = new Set(readingDevelopment.flatMap((book) => tagsFromCategory(book.category))).size;

  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Reading & Development"
        title="Books I Have Read"
        intro="A simple bookshelf of the books that have shaped how I think about investing, money, discipline, purpose, risk, and long-term decision-making."
        align="center"
        tone="ivory"
      />

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="text-base leading-8 text-slateText md:text-lg md:leading-9">
              Not every book here is directly about investing, but each one has shaped the way I think about risk,
              behaviour, patience, ambition, and using money properly. Click a book to read the full reflection.
            </p>
            <dl className="grid grid-cols-2 gap-px border border-line bg-line text-center sm:min-w-[300px]">
              <div className="bg-ivory px-4 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Books</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-charcoal">{readingDevelopment.length}</dd>
              </div>
              <div className="bg-ivory px-4 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Themes</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-charcoal">{categoryCount}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {readingDevelopment.map((book) => (
              <Link
                key={book.slug}
                to={`/books/${book.slug}`}
                className="group flex min-h-[520px] flex-col border border-line bg-ivory p-4 shadow-editorial transition-colors hover:bg-paper focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <div className="aspect-[3/4] overflow-hidden border border-line bg-paper p-2">
                  <img
                    src={book.image}
                    alt={book.imageAlt}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col pt-5">
                  <div className="flex flex-wrap gap-2">
                    {tagsFromCategory(book.category).slice(0, 2).map((tag) => (
                      <span key={tag} className="border border-line bg-paper px-3 py-1 text-xs font-semibold text-slateText">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-charcoal">{book.title}</h2>
                  <p className="mt-2 text-sm font-semibold text-slateText">{book.author}</p>
                  <p className="mt-4 line-clamp-4 flex-1 border-l-2 border-gold bg-paper px-4 py-3 text-sm font-semibold leading-7 text-charcoal">
                    {book.takeaway}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                    Read summary
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
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
