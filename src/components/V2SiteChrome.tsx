import { useEffect, useRef, useState } from 'react';
import { v2Contact, v2Navigation } from '../data/v2Content';

export type V2NavigationSection = 'about' | 'work' | 'projects' | 'writing' | 'travel' | 'now';

export function V2Header({ currentSection }: { currentSection: V2NavigationSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === 'Tab') {
        const links = Array.from(mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
        const first = menuButtonRef.current;
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b0c]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <a href="/v2-preview" className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white">
          CM<span className="text-[#77c7a2]">.</span>
        </a>
        <nav className="hidden min-w-0 flex-1 justify-center gap-1 lg:flex" aria-label="Website V2 navigation">
          {v2Navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={item.href.endsWith(`/${currentSection}`) ? 'page' : undefined} className="shrink-0 rounded-full px-3 py-2 text-xs text-white/55 transition-colors hover:bg-white/5 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-4 lg:flex"><a href={v2Contact.instagramUrl} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 hover:text-white">Instagram ↗</a><a href="/v2-preview#contact" className="rounded-full border border-[#77c7a2]/30 px-4 py-2 text-xs text-[#9bdbbd]">Contact</a></div>
        <button ref={menuButtonRef} type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden" aria-expanded={menuOpen} aria-controls="v2-detail-mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((open) => !open)}>
          <span className="text-lg" aria-hidden="true">{menuOpen ? '×' : '≡'}</span>
        </button>
      </div>
      {menuOpen && (
        <nav ref={mobileNavRef} id="v2-detail-mobile-nav" className="border-t border-white/10 bg-[#090b0c] px-5 py-4 lg:hidden" aria-label="Website V2 mobile navigation">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2">
            {v2Navigation.map((item, index) => (
              <a ref={index === 0 ? firstLinkRef : undefined} key={item.href} href={item.href} aria-current={item.href.endsWith(`/${currentSection}`) ? 'page' : undefined} className="rounded-lg px-3 py-3 text-sm text-white/65 hover:bg-white/5 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href="/v2-preview#contact" className="rounded-lg px-3 py-3 text-sm text-[#9bdbbd]" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href={v2Contact.instagramUrl} className="rounded-lg px-3 py-3 text-sm text-[#9bdbbd]" onClick={() => setMenuOpen(false)}>Instagram ↗</a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function V2Footer() {
  return (
    <footer className="v2-detail-footer mt-12 border-t border-black/10 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 text-xs text-[#52625b] sm:flex-row sm:items-center sm:justify-between">
        <a href="/v2-preview" className="text-[#33443c] hover:text-black">← Back to Website V2 home</a>
        <div className="flex min-w-0 flex-wrap gap-5"><a className="break-all" href={`mailto:${v2Contact.email}`}>{v2Contact.email}</a><a href={v2Contact.instagramUrl}>{v2Contact.instagramHandle}</a></div>
      </div>
    </footer>
  );
}
