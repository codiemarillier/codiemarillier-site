import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand, navLinks } from '../data/siteData';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8" aria-label="Primary">
        <Link to="/" onClick={closeMenu} className="group">
          <span className="block font-serif text-2xl font-semibold leading-none text-charcoal">{brand.name}</span>
          <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slateText">
            {brand.subtitle}
          </span>
        </Link>

        <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-[13px] font-medium transition-colors link-underline xl:text-sm ${
                  isActive ? 'text-charcoal' : 'text-slateText hover:text-charcoal'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-charcoal transition-colors hover:bg-paper focus:outline-none focus:ring-2 focus:ring-gold lg:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        aria-hidden={!open}
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto grid max-w-7xl px-5 py-4 md:px-8">
          {navLinks.map((item) => {
            const active = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                aria-current={active ? 'page' : undefined}
                tabIndex={open ? undefined : -1}
                className={`border-b border-line py-4 text-base font-medium ${
                  active ? 'text-charcoal' : 'text-slateText'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
