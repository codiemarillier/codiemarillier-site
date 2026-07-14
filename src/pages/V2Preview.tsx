import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { readingDevelopment } from '../data/siteData';
import {
  v2Contact,
  v2Identity,
  v2Interests,
  v2Navigation,
  v2Now,
  v2Projects,
  v2TravelImages,
  v2TravelStory,
  v2FeaturedWorkStories,
  v2Voice,
} from '../data/v2Content';

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="v2-label">
      <span aria-hidden="true">//</span> {children}
    </p>
  );
}

function ArrowLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="v2-arrow-link" href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function V2Preview() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.add('v2-preview-active');
    return () => document.body.classList.remove('v2-preview-active');
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstMobileLinkRef.current?.focus();

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

  const recentlyRead = readingDevelopment.slice(0, 3);
  const featuredProjects = v2Projects.filter((project) => project.status !== 'Status to confirm').slice(0, 3);

  const handleSkipLink = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="v2-shell v2-home min-h-screen overflow-hidden bg-[#090b0c] text-[#edf0ec]">
      <a href="#v2-main" className="v2-skip-link" onClick={handleSkipLink}>
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b0c]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white">
            CM<span className="text-[#77c7a2]">.</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="V2 preview navigation">
            {v2Navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-xs text-white/60 transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={v2Contact.instagramUrl} className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white md:inline-flex">Instagram ↗</a>
            <span className="hidden rounded-full border border-[#77c7a2]/30 bg-[#77c7a2]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9bdbbd] sm:inline-flex">
              Local V2 preview · noindex
            </span>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="v2-mobile-nav"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="text-lg" aria-hidden="true">{menuOpen ? '×' : '≡'}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav ref={mobileNavRef} id="v2-mobile-nav" className="border-t border-white/10 bg-[#090b0c] px-5 py-4 lg:hidden" aria-label="V2 mobile navigation">
            <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2">
              {v2Navigation.map((item, index) => (
                <a
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main ref={mainRef} id="v2-main" tabIndex={-1}>
        <section id="top" className="v2-hero relative flex min-h-[760px] items-end pt-32 sm:min-h-screen">
          <div className="v2-orbit" aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
            <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
              <span className="h-2 w-2 rounded-full bg-[#77c7a2] shadow-[0_0_16px_#77c7a2]" />
              {v2Identity.origin} · {v2Identity.currentContext}
            </div>
            <h1 className="max-w-6xl font-serif text-[clamp(4.2rem,13vw,12rem)] font-normal leading-[0.76] tracking-[-0.07em] text-[#f4f4ef]">
              Codie<br />Marillier<span className="text-[#77c7a2]">.</span>
            </h1>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_1fr] lg:items-end">
              <p className="max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">{v2Voice.opening}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <ArrowLink href="/v2-preview/work">Explore my work</ArrowLink>
                <ArrowLink href="/v2-preview/writing">Read my writing</ArrowLink>
                <ArrowLink href="/v2-preview/projects">View current projects</ArrowLink>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="v2-section v2-light border-t border-black/10">
          <div className="v2-section-grid">
            <div><SectionLabel>01 / About</SectionLabel></div>
            <div>
              <h2 className="v2-heading">I am still learning what my life will become.</h2>
              <p className="v2-lead mt-8">{v2Identity.purpose}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">
                Zimbabwe, boarding-school life, cricket, family business, international travel and practical work have all shaped the way I think. I am still working out the exact destination; this website records the direction honestly.
              </p>
              <div className="mt-12 flex flex-wrap gap-2">
                {v2Interests.map((interest) => <span key={interest} className="v2-chip">{interest}</span>)}
              </div>
              <div className="mt-8 max-w-xl"><ArrowLink href="/v2-preview/about">Read the full story</ArrowLink></div>
            </div>
          </div>
        </section>

        <section className="v2-voice-section border-t border-black/10" aria-labelledby="voice-stories-title">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <p className="v2-label"><span aria-hidden="true">//</span> Two early lessons</p>
            <h2 id="voice-stories-title" className="sr-only">Two early stories</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <blockquote className="v2-voice-card"><p>“{v2Voice.firstBusiness}”</p><footer>Zimbabwe · approximately eight years old</footer></blockquote>
              <blockquote className="v2-voice-card"><p>“{v2Voice.france}”</p><footer>France · early 2024</footer></blockquote>
            </div>
          </div>
        </section>

        <section id="zimbabwe" className="v2-section v2-zimbabwe border-t border-white/10">
          <div className="v2-section-grid relative z-10">
            <div><SectionLabel>02 / Zimbabwe</SectionLabel></div>
            <div>
              <p className="font-mono text-[clamp(5rem,17vw,13rem)] font-medium leading-[0.72] tracking-[-0.09em] text-white/[0.06]" aria-hidden="true">ZWE</p>
              <h2 className="v2-heading -mt-3 sm:-mt-8">The place that shaped the starting point.</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div><p className="v2-lead">I grew up in Harare and later went to boarding school in Marondera. Discipline, sport, close friendships and the freedom that came with structure became a lasting part of how I see the world.</p><p className="mt-6 font-serif text-2xl leading-tight text-[#d4af6d]">“{v2Voice.familyBusiness}”</p></div>
                <div className="space-y-6 text-base leading-8 text-white/50">
                  <p>Growing up around my parents’ property business gave me an early view of client relationships, practical problem-solving, entrepreneurship and the sacrifices required to build something useful.</p>
                  <p>That background created gratitude, but also responsibility: to use the opportunities I received well and eventually help create opportunities for other people.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="v2-section v2-light border-t border-black/10">
          <div className="v2-section-grid">
            <div><SectionLabel>03 / Selected work</SectionLabel></div>
            <div>
              <h2 className="v2-heading">“{v2Voice.workQuestion}”</h2>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-3">
                {v2FeaturedWorkStories.map((story, index) => (
                  <article key={story.slug} className="bg-[#0c0f10] p-7">
                    <div className="flex items-center justify-between gap-3"><span className="font-mono text-xs text-[#52625b]">0{index + 1}</span><span className="v2-status">{story.status}</span></div>
                    <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9bdbbd]">{story.location}</p>
                    <h3 className="mt-3 font-serif text-3xl tracking-tight text-white">{story.title}</h3>
                    <p className="mt-5 line-clamp-3 leading-7 text-white/50">{story.summary}</p>
                  </article>
                ))}
              </div>
              <div className="mt-8 max-w-xl"><ArrowLink href="/v2-preview/work">Explore work in depth</ArrowLink></div>
            </div>
          </div>
        </section>

        <section id="projects" className="v2-section v2-sand border-t border-black/10">
          <div className="v2-section-grid">
            <div><SectionLabel>04 / Projects</SectionLabel></div>
            <div>
              <h2 className="v2-heading">Things I am building, testing and researching.</h2>
              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <article key={project.slug} className="v2-project-card v2-project-card-home">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#52625b]">P—0{index + 1}</span>
                      <span className="v2-status">{project.status}</span>
                    </div>
                    <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.15em] text-[#9bdbbd]">{project.type}</p>
                    <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-white">{project.title}</h3>
                    <p className="mt-5 leading-7 text-white/55">{project.summary}</p>
                    <p className="mt-7 border-t border-white/10 pt-5 text-xs leading-5 text-white/38">{project.note}</p>
                  </article>
                ))}
              </div>
              <div className="mt-8 max-w-xl"><ArrowLink href="/v2-preview/projects">View all current projects</ArrowLink></div>
            </div>
          </div>
        </section>

        <section id="travel" className="v2-section v2-travel border-t border-white/10">
          <div className="v2-section-grid relative z-10">
            <div><SectionLabel>05 / Travel</SectionLabel></div>
            <div>
              <figure className="mb-10">
                <img
                  src={v2TravelImages.cambodia.src}
                  srcSet={v2TravelImages.cambodia.srcSet}
                  sizes="(min-width: 1024px) 900px, calc(100vw - 40px)"
                  width={v2TravelImages.cambodia.width}
                  height={v2TravelImages.cambodia.height}
                  alt={v2TravelImages.cambodia.alt}
                  className="w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-white/35">{v2TravelImages.cambodia.caption}</figcaption>
              </figure>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9bdbbd]">Featured place · {v2TravelStory.country}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl">{v2TravelStory.title}</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="v2-lead">{v2TravelStory.summary}</p>
                <p className="text-base leading-8 text-white/50">{v2TravelStory.reflection}</p>
              </div>
              <div className="mt-8 max-w-xl"><ArrowLink href="/v2-preview/travel">Read the travel story</ArrowLink></div>
            </div>
          </div>
        </section>

        <section id="investing" className="v2-section v2-light border-t border-black/10">
          <div className="v2-section-grid">
            <div><SectionLabel>06 / Investing & writing</SectionLabel></div>
            <div>
              <h2 className="v2-heading">Codie Capital Research remains a complete record inside the wider site.</h2>
              <p className="v2-lead mt-8">{v2Voice.crypto}</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <ArrowLink href="/portfolio">Current portfolio</ArrowLink>
                <ArrowLink href="/journal">Portfolio journal</ArrowLink>
                <ArrowLink href="/letters">Letters</ArrowLink>
                <ArrowLink href="/decision-archive">Decision archive</ArrowLink>
              </div>
              <p className="mt-8 text-xs leading-6 text-white/35">Personal investment research only. Not investment advice. The full disclaimer remains attached to the investing archive.</p>
              <div className="mt-8 max-w-xl"><ArrowLink href="/v2-preview/writing">Explore all writing</ArrowLink></div>
            </div>
          </div>
        </section>

        <section id="books" className="v2-section v2-sand border-t border-black/10">
          <div className="v2-section-grid">
            <div><SectionLabel>07 / Reading</SectionLabel></div>
            <div>
              <h2 className="v2-heading">I used to read books under my desk in class.</h2>
              <p className="v2-lead mt-8">{v2Voice.reading}</p>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
                {recentlyRead.map((book) => (
                  <a key={book.slug} href={`/books/${book.slug}`} className="group bg-[#0c0f10] p-7 transition-colors hover:bg-[#111616]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{book.category}</p>
                    <h3 className="mt-8 font-serif text-2xl text-white">{book.title}</h3>
                    <p className="mt-2 text-xs text-white/40">{book.author}</p>
                    <p className="mt-7 text-sm leading-6 text-white/55">{book.takeaway}</p>
                    <span className="mt-8 inline-block text-[#9bdbbd] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
              <div className="mt-6"><ArrowLink href="/books">Open the reading library</ArrowLink></div>
            </div>
          </div>
        </section>

        <section id="now" className="v2-section border-t border-white/10">
          <div className="v2-section-grid">
            <div><SectionLabel>08 / Now</SectionLabel></div>
            <div>
              <h2 className="v2-heading">A small public accountability check.</h2>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <dl className="space-y-7">
                  <div><dt className="v2-dt">Location</dt><dd className="v2-dd">{v2Now.location}</dd></div>
                  <div><dt className="v2-dt">Working on</dt><dd className="v2-dd">{v2Now.work}</dd></div>
                </dl>
                <dl className="space-y-7">
                  <div><dt className="v2-dt">Building</dt><dd className="v2-dd">{v2Now.building.join(' · ')}</dd></div>
                  <div><dt className="v2-dt">Learning</dt><dd className="v2-dd">{v2Now.learning.join(' · ')}</dd></div>
                </dl>
              </div>
              <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.16em] text-white/68">Preview reviewed {v2Now.lastReviewed}</p>
              <div className="mt-8 max-w-xl"><ArrowLink href="/v2-preview/now">Open the full Now page</ArrowLink></div>
            </div>
          </div>
        </section>

        <section id="contact" className="v2-light border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-8 max-w-5xl font-serif text-5xl leading-[0.92] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">Have something worth talking about?</h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/50">Email is the most direct route. Instagram is there for a less formal introduction.</p>
            <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
              <ArrowLink href={`mailto:${v2Contact.email}`}>{v2Contact.email}</ArrowLink>
              <ArrowLink href={v2Contact.instagramUrl}>{`Instagram · ${v2Contact.instagramHandle}`}</ArrowLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Codie Marillier</p>
          <p>Local V2 preview · not published</p>
        </div>
      </footer>
    </div>
  );
}
