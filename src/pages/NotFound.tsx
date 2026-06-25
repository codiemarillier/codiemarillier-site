import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function NotFound() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="404"
        title="Page Not Found"
        intro="The page you requested could not be found. The main archive links below will take you back into the public record."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {[
            ['Home', '/'],
            ['Portfolio', '/portfolio'],
            ['Journal', '/journal'],
            ['Books', '/books'],
            ['Process', '/process'],
            ['AI-readable archive', '/ai/index.html'],
          ].map(([label, href]) =>
            href.endsWith('.html') ? (
              <a key={href} href={href} className="bg-paper p-6 font-semibold text-charcoal hover:bg-ivory">
                {label}
              </a>
            ) : (
              <Link key={href} to={href} className="bg-paper p-6 font-semibold text-charcoal hover:bg-ivory">
                {label}
              </Link>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
