import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/siteData';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10" aria-label="Primary">
        <Link to="/" onClick={closeMenu} className="group flex min-w-0 items-center gap-3 pr-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-charcoal font-mono text-[11px] font-medium tracking-[-0.06em] text-white transition-transform duration-300 group-hover:rotate-6">
            CM
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-xl font-medium leading-none text-charcoal sm:text-[1.35rem]">Codie Capital</span>
            <span className="mt-1.5 block truncate font-mono text-[8px] uppercase tracking-[0.2em] text-bodyText sm:text-[9px]">
              Research / Journal
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-paper p-1 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-[11px] font-semibold transition-all xl:px-4 xl:text-xs ${
                  isActive ? 'bg-charcoal text-paper shadow-sm' : 'text-charcoal hover:bg-ivory'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/journal"
          className="group hidden min-h-10 items-center gap-2 rounded-full bg-link px-4 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 xl:inline-flex"
        >
          Latest thinking
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-charcoal transition-colors hover:bg-mist focus:outline-none focus:ring-2 focus:ring-link lg:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        aria-hidden={!open}
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[calc(100dvh-72px)] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-4 py-5 sm:px-6">
          {navLinks.map((item) => {
            const active = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                aria-current={active ? 'page' : undefined}
                tabIndex={open ? undefined : -1}
                className={`flex min-h-14 items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                  active ? 'bg-charcoal text-paper' : 'text-charcoal hover:bg-ivory'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
