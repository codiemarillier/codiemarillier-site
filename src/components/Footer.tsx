import { Link } from 'react-router-dom';
import { brand, footerLinks } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div>
          <p className="font-serif text-3xl font-semibold">{brand.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#c7bda9]">{brand.subtitle}</p>
          <p className="mt-6 max-w-2xl text-sm font-semibold leading-7 text-[#f4ead8]">
            Personal investment journal only. Not financial advice. Do not copy my trades.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d8d0c0]">{brand.disclaimer}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:justify-self-end">
          {footerLinks.map((link) =>
            link.href.endsWith('.html') ? (
              <a key={link.href} href={link.href} className="text-[#e7decd] transition-colors hover:text-white">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className="text-[#e7decd] transition-colors hover:text-white">
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#b8ad9a] md:px-8">
        Copyright {new Date().getFullYear()} Codie Capital Research. Educational and journalistic content only.
      </div>
    </footer>
  );
}
