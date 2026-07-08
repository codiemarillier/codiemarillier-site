import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { readingDevelopment } from '../data/siteData';

function tagsFromCategory(category: string) {
  return category.split('/').map((tag) => tag.trim()).filter(Boolean);
}

export default function BookDetail() {
  const { slug } = useParams();
  const bookIndex = readingDevelopment.findIndex((item) => item.slug === slug);
  const book = bookIndex >= 0 ? readingDevelopment[bookIndex] : undefined;

  if (!book) {
    return <Navigate to="/books" replace />;
  }

  const previousBook = bookIndex > 0 ? readingDevelopment[bookIndex - 1] : undefined;
  const nextBook = bookIndex < readingDevelopment.length - 1 ? readingDevelopment[bookIndex + 1] : undefined;
  const tags = tagsFromCategory(book.category);

  return (
    <main className="page-fade">
      <PageHeader eyebrow="Book Summary" title={book.title} intro={`${book.author} / ${book.category}`} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <div className="border border-line bg-paper p-4 shadow-editorial">
            <div className="border border-line bg-ivory p-3">
              <img src={book.image} alt={book.imageAlt} className="mx-auto max-h-[520px] w-full object-contain" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="border border-line bg-ivory px-3 py-1 text-xs font-semibold text-slateText">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <article className="border-y border-line bg-paper px-5 py-8 md:px-8 md:py-10">
          <div className="border-l-2 border-gold bg-ivory px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Main takeaway</p>
            <p className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal">{book.takeaway}</p>
          </div>

          <div className="mt-10 grid gap-7 text-base leading-8 text-slateText md:text-lg md:leading-9">
            {book.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <nav className="mt-10 grid gap-3 border-t border-line pt-8 md:grid-cols-2" aria-label="Related books">
            {previousBook ? (
              <Link
                to={`/books/${previousBook.slug}`}
                className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Previous book
                </span>
                <span className="mt-3 block font-serif text-2xl font-semibold leading-tight text-charcoal">
                  {previousBook.title}
                </span>
              </Link>
            ) : (
              <div className="border border-line bg-ivory p-5 text-sm leading-7 text-slateText">
                This is the first book in the current reading list.
              </div>
            )}

            {nextBook ? (
              <Link
                to={`/books/${nextBook.slug}`}
                className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper md:text-right"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Next book
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-3 block font-serif text-2xl font-semibold leading-tight text-charcoal">
                  {nextBook.title}
                </span>
              </Link>
            ) : (
              <div className="border border-line bg-ivory p-5 text-sm leading-7 text-slateText md:text-right">
                This is the latest book added to the current reading list.
              </div>
            )}
          </nav>

          <Link to="/books" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to books
          </Link>
        </article>
      </section>
    </main>
  );
}
