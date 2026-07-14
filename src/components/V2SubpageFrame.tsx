import { type MouseEvent, type ReactNode, useEffect, useRef } from 'react';
import { V2Footer, V2Header, type V2NavigationSection } from './V2SiteChrome';

type V2SubpageFrameProps = {
  currentSection: V2NavigationSection;
  eyebrow: string;
  title: string;
  introduction: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export default function V2SubpageFrame({ currentSection, eyebrow, title, introduction, backHref, backLabel, children }: V2SubpageFrameProps) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.add('v2-preview-active');
    return () => document.body.classList.remove('v2-preview-active');
  }, []);

  const handleSkipLink = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="v2-shell v2-detail-shell min-h-screen overflow-x-hidden bg-[#f4f1ea] text-[#17221e]">
      <a href="#v2-subpage-main" className="v2-skip-link" onClick={handleSkipLink}>Skip to content</a>
      <V2Header currentSection={currentSection} />
      <main ref={mainRef} id="v2-subpage-main" tabIndex={-1}>
        <section className="v2-detail-hero px-5 py-16 text-[#edf0ec] sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-[1344px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9bdbbd]">{eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-serif text-[clamp(2.7rem,6vw,6rem)] font-normal leading-[0.95] tracking-[-0.05em] text-white">{title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55 sm:text-xl">{introduction}</p>
          </div>
        </section>
        {children}
        <nav className="v2-light border-t border-black/10 px-5 py-12 sm:px-8 lg:px-12" aria-label="Back to parent page">
          <div className="mx-auto max-w-[1344px]"><a href={backHref} className="v2-arrow-link max-w-md"><span>← {backLabel}</span></a></div>
        </nav>
      </main>
      <V2Footer />
    </div>
  );
}
