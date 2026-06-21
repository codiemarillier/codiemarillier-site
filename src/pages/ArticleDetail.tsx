import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { brand, journalEntries } from '../data/siteData';

type ArticleType = 'journal';

type ArticleDetailProps = {
  type: ArticleType;
};

const articleContext = {
  journal: {
    label: 'Portfolio journal entry',
    purpose: 'A public record of my own portfolio decisions, lessons, and weekly review discipline.',
    prompts: ['What changed?', 'Was the reasoning clear?', 'What should be watched next?'],
  },
};

function isArticleSectionHeading(text: string) {
  const firstLine = text.split('\n')[0].trim();
  const remaining = text.split('\n').slice(1).join('\n').trim();

  return (
    remaining.length > 0 &&
    (/^\d+\.\s+[A-Z]/.test(firstLine) ||
      [
        'Snapshot',
        'Current view',
        'Weekly Commentary',
        'How the week felt',
        'What helped the portfolio',
        'What helped and what hurt',
        'What still concerns me',
        'Trades and changes',
        'My thoughts on positioning',
        'Thoughts on positioning',
        'Main lesson from the week',
        'What I want to watch next week',
        'Action plan',
        'Overall conclusion',
        'Why prices fell last week',
        'What may happen this week',
        'Position review',
        'Google cash plan',
      ].includes(firstLine))
  );
}

function splitArticleSection(text: string) {
  const [heading, ...rest] = text.split('\n');
  return {
    heading: heading.trim(),
    content: rest.join('\n').trim(),
  };
}

export default function ArticleDetail({ type }: ArticleDetailProps) {
  const { slug } = useParams();
  const collection = journalEntries;
  const article = collection.find((item) => item.slug === slug);
  const articleIndex = collection.findIndex((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  const context = articleContext[type];
  const previousArticle = articleIndex > 0 ? collection[articleIndex - 1] : undefined;
  const nextArticle = articleIndex < collection.length - 1 ? collection[articleIndex + 1] : undefined;
  const eyebrow = 'Portfolio journal';

  const backHref = '/journal';
  const meta = `${article.date} / ${article.category}`;
  const hasDocumentPreview = 'documentPages' in article && Boolean(article.documentPages?.length);

  return (
    <main className="page-fade">
      <PageHeader eyebrow={eyebrow} title={article.title} intro={article.excerpt} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <article className="min-w-0 border-y border-line bg-paper px-5 py-8 md:px-8 md:py-10">
          <div className="mb-9 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-line bg-ivory px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <FileText className="h-4 w-4" aria-hidden="true" />
              {meta}
            </span>
            <span className="inline-flex items-center gap-2 border border-line bg-ivory px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slateText">
              <BookOpen className="h-4 w-4 text-gold" aria-hidden="true" />
              {context.label}
            </span>
          </div>

          {hasDocumentPreview ? (
            <section id="document-preview" className="mb-10 border border-line bg-ivory p-3 shadow-editorial">
              <div className="flex flex-col gap-3 border-b border-line bg-paper p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Original document preview</p>
                  <p className="mt-2 text-sm leading-6 text-slateText">
                    This weekly review is shown as rendered pages from the original document, so it works even if the browser PDF viewer fails.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={article.documentUrl}
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-line bg-ivory px-4 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-paper"
                  >
                    Open Document
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="grid gap-6 bg-[#efe7da] p-3 md:p-6">
                {article.documentPages?.map((page, index) => (
                  <figure key={page} className="m-0">
                    <img
                      src={page}
                      alt={`${article.title} page ${index + 1}`}
                      className="w-full border border-line bg-white shadow-editorial"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      Page {index + 1}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {!hasDocumentPreview ? (
            <div className="space-y-7 text-lg leading-9 text-slateText">
              {article.body.map((paragraph, index) => {
                if (isArticleSectionHeading(paragraph)) {
                  const section = splitArticleSection(paragraph);

                  return (
                    <section key={`${section.heading}-${index}`} className="border-t border-line pt-7 first:border-t-0 first:pt-0">
                      <h2 className="font-serif text-3xl font-semibold leading-tight text-charcoal">{section.heading}</h2>
                      <p className="mt-4 whitespace-pre-line text-base leading-8 text-slateText md:text-lg md:leading-9">
                        {section.content}
                      </p>
                    </section>
                  );
                }

                return (
                  <p key={`${paragraph.slice(0, 32)}-${index}`} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          ) : null}

          <aside className="mt-10 border-l-2 border-gold bg-ivory px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Important boundary</p>
            <p className="mt-3 text-sm leading-7 text-slateText">
              This is part of my personal investment research and portfolio journal. It is not investment advice, it is
              not a recommendation, and it should not be used as a reason to copy any trade.
            </p>
          </aside>

          <nav className="mt-10 grid gap-3 border-t border-line pt-8 md:grid-cols-2" aria-label="Related articles">
            {previousArticle ? (
              <Link
                to={`${backHref}/${previousArticle.slug}`}
                className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-3 block font-serif text-2xl font-semibold leading-tight text-charcoal">
                  {previousArticle.title}
                </span>
              </Link>
            ) : (
              <div className="border border-line bg-ivory p-5 text-sm leading-7 text-slateText">
                This is the latest journal entry.
              </div>
            )}

            {nextArticle ? (
              <Link
                to={`${backHref}/${nextArticle.slug}`}
                className="group border border-line bg-ivory p-5 transition-colors hover:bg-paper md:text-right"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Next
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-3 block font-serif text-2xl font-semibold leading-tight text-charcoal">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div className="border border-line bg-ivory p-5 text-sm leading-7 text-slateText md:text-right">
                This is the earliest journal entry in the current record.
              </div>
            )}
          </nav>

          <Link to={backHref} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to journal
          </Link>
        </article>

        <aside className="grid gap-5 lg:sticky lg:top-24">
          <section className="border border-line bg-paper p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why this page exists</p>
            <p className="mt-4 text-sm leading-7 text-slateText">{context.purpose}</p>
          </section>

          <section className="border border-line bg-paper p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Review prompts</p>
            <ul className="mt-5 grid gap-3">
              {context.prompts.map((prompt) => (
                <li key={prompt} className="border border-line bg-ivory px-4 py-3 text-sm font-semibold text-charcoal">
                  {prompt}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-line bg-[#efe7da] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Not advice</p>
                <p className="mt-3 text-sm leading-7 text-slateText">{brand.disclaimer}</p>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
