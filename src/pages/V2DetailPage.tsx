import { type MouseEvent, type ReactNode, useEffect, useRef } from 'react';
import { V2Footer, V2Header } from '../components/V2SiteChrome';
import {
  v2Identity,
  v2Interests,
  v2LifeChapters,
  v2Navigation,
  v2Now,
  v2Principles,
  v2Projects,
  v2SecondaryWork,
  v2TravelImages,
  v2TravelStory,
  v2FeaturedWorkStories,
  v2WritingGateways,
  v2Voice,
} from '../data/v2Content';

export type V2DetailPageKind = 'about' | 'work' | 'projects' | 'writing' | 'travel' | 'now';

const pageMeta: Record<V2DetailPageKind, { eyebrow: string; title: string; introduction: string }> = {
  about: {
    eyebrow: 'About / The longer version',
    title: 'I am still learning what my life will become.',
    introduction: 'I grew up in Zimbabwe, around boarding school, sport, family, property and people I still care deeply about. Since then I have worked and travelled across very different places while trying to build a direction that is genuinely mine.',
  },
  work: {
    eyebrow: 'Work / Selected experience',
    title: 'What will be better because I worked today?',
    introduction: 'I am most motivated when the work has visible progress, real responsibility, a clear purpose, a good team and someone worth learning from.',
  },
  projects: {
    eyebrow: 'Projects / Building and researching',
    title: 'Some ideas worked. Some changed shape. Some are still questions.',
    introduction: 'I have started projects because I enjoy turning a problem into something real. They have also taught me that the original plan rarely survives contact with costs, customers, materials and other people.',
  },
  writing: {
    eyebrow: 'Writing / The public record',
    title: 'A good outcome is not always a good decision.',
    introduction: 'I write because memory is too good at making old decisions look smarter than they were. Codie Capital Research is the record: the portfolio, reviews, letters, books, mistakes and the process I am still building.',
  },
  travel: {
    eyebrow: 'Travel / People and perspective',
    title: 'The people become the place.',
    introduction: 'I remember travel through the people I met, the ways they lived and the perspective I carried away—not through a country count.',
  },
  now: {
    eyebrow: 'Now / Public accountability',
    title: 'Building towards the life I genuinely wanted.',
    introduction: 'This is the honest current version: where I am, what I am working on, what I am trying to learn and what still needs improving.',
  },
};

function PageSection({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="v2-detail-section v2-light border-t border-black/10 py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9DBBE8]">// {label}</p>
        <div>
          <h2 className="max-w-4xl font-serif text-4xl leading-[1] tracking-[-0.04em] text-white sm:text-6xl">{title}</h2>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

function AboutContent() {
  return (
    <>
      <PageSection label="Origin" title="Zimbabwe is home. It is where the story starts.">
        <div className="grid gap-8 text-base leading-8 text-white/55 md:grid-cols-2">
          <p>I grew up in Harare and later moved to boarding school in Marondera. Discipline, sport, friendship and freedom within a strong structure became central parts of how I developed.</p>
          <p>{v2Voice.familyBusiness}</p>
        </div>
      </PageSection>
      <PageSection label="Chapters" title="The experiences behind the current direction.">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {v2LifeChapters.map((chapter) => (
            <article key={chapter.title} className="grid gap-4 py-7 md:grid-cols-[12rem_1fr]">
              <div><h3 className="text-lg text-white">{chapter.title}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-white/30">{chapter.context}</p></div>
              <p className="max-w-3xl leading-7 text-white/55">{chapter.text}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection label="Interests" title="Curiosity crosses categories.">
        <p className="mb-9 max-w-3xl text-lg leading-8 text-white/55">{v2Voice.reading}</p>
        <div className="flex flex-wrap gap-2">{v2Interests.map((interest) => <span key={interest} className="v2-chip">{interest}</span>)}</div>
        <a href="/books" className="v2-arrow-link mt-10 max-w-xl"><span>Explore the books that changed how I think</span><span aria-hidden="true">↗</span></a>
      </PageSection>
    </>
  );
}

function WorkContent() {
  return (
    <section className="v2-detail-section v2-light border-t border-black/10 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-5 border-b border-black/10 pb-12 md:grid-cols-[11rem_1fr] md:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#2F5FA7]">// The first one</p>
          <div>
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] text-[#0B1F33] sm:text-4xl">Tuck-shop money, a dog and an early exit.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#687684]">{v2Voice.firstBusiness}</p>
          </div>
        </div>

        <div className="divide-y divide-black/10">
          {v2FeaturedWorkStories.map((story, index) => (
            <article key={story.slug} className="grid gap-5 bg-transparent py-12 md:grid-cols-[11rem_1fr] md:gap-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#2F5FA7]">0{index + 1} / {story.location}</p>
                <span className="v2-status mt-3">{story.status}</span>
              </div>
              <div>
                <h2 className="font-serif text-3xl tracking-[-0.035em] text-[#0B1F33] sm:text-4xl">{story.title}</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#687684]">{story.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">{story.responsibilities.map((item) => <li key={item} className="v2-chip">{item}</li>)}</ul>
                <p className="mt-7 max-w-3xl border-l-2 border-[#B08D3A] pl-5 font-serif text-xl leading-7 text-[#263442]">{story.lesson}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-black/10 pt-12">
          <div className="grid gap-5 md:grid-cols-[11rem_1fr] md:gap-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#2F5FA7]">// Other work</p>
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] text-[#0B1F33] sm:text-4xl">Useful experience does not always need a grand title.</h2>
              <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
                {v2SecondaryWork.map((item) => (
                  <article key={item.title} className="grid gap-2 bg-transparent py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                    <h3 className="text-base font-medium text-[#0B1F33]">{item.title}</h3>
                    <p className="leading-7 text-[#687684]">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsContent() {
  return (
    <PageSection label="Current set" title="Active work, research and status still to confirm.">
      <div className="divide-y divide-black/10 border-y border-black/10">
        {v2Projects.map((project, index) => (
          <article key={project.slug} className="grid gap-8 bg-transparent py-10 lg:grid-cols-[4rem_1fr]">
            <p className="font-mono text-xs text-[#2F5FA7]">0{index + 1}</p>
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#2F5FA7]">{project.type}</p><h3 className="mt-3 font-serif text-4xl text-[#0B1F33] sm:text-5xl">{project.title}</h3></div><span className="v2-status">{project.status}</span></div>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#263442]">{project.summary}</p>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#2F5FA7]">The problem</p><p className="mt-3 leading-7 text-[#687684]">{project.problem}</p></div>
                <div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#2F5FA7]">What I did</p><ul className="mt-3 space-y-2 text-[#687684]">{project.whatIDid.map((item) => <li key={item}>— {item}</li>)}</ul></div>
              </div>
              <blockquote className="mt-9 border-l-2 border-[#B08D3A] pl-5 font-serif text-2xl leading-tight text-[#263442]">{project.lesson}</blockquote>
              <p className="mt-7 text-xs leading-5 text-[#687684]">{project.note}</p>
              {project.detailHref && project.detailLabel ? <a href={project.detailHref} className="v2-arrow-link mt-7 max-w-xl"><span>{project.detailLabel}</span><span aria-hidden="true">→</span></a> : null}
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

function WritingContent() {
  return (
    <>
      <PageSection label="Boundary" title="Personal research, never personalised advice.">
        <p className="max-w-3xl text-xl leading-9 text-white/55">{v2Voice.crypto}</p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">Codie Capital Research documents one personal portfolio and one developing process. It is not a fund, investment service or recommendation to copy a trade.</p>
        <a href="/disclaimer" className="v2-arrow-link mt-8 max-w-xl"><span>Read the full investing disclaimer</span><span aria-hidden="true">↗</span></a>
      </PageSection>
      <PageSection label="Archive" title="The existing investment record remains intact.">
        <p className="max-w-3xl text-lg leading-8 text-white/55">All existing portfolio data, reviews, letters, book notes, decisions, process pages and disclosures keep their current URLs. The personal site adds context around that archive; it does not erase or rename it.</p>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {v2WritingGateways.map((item) => <a key={item.href} href={item.href} className="group rounded-2xl border border-white/10 p-6 transition-colors hover:border-[#B08D3A]/40"><div className="flex justify-between gap-4"><h3 className="text-xl text-white">{item.title}</h3><span className="text-[#9DBBE8]" aria-hidden="true">↗</span></div><p className="mt-4 leading-7 text-white/50">{item.text}</p></a>)}
        </div>
      </PageSection>
    </>
  );
}

function TravelContent() {
  const franceImages = [v2TravelImages.franceMarina, v2TravelImages.franceYachtWork, v2TravelImages.monaco];

  return (
    <>
      <PageSection label="Featured story" title={`${v2TravelStory.country}: ${v2TravelStory.title}`}>
        <figure>
          <img
            src={v2TravelImages.cambodia.src}
            srcSet={v2TravelImages.cambodia.srcSet}
            sizes="(min-width: 1024px) 960px, calc(100vw - 40px)"
            width={v2TravelImages.cambodia.width}
            height={v2TravelImages.cambodia.height}
            alt={v2TravelImages.cambodia.alt}
            className="w-full rounded-2xl object-cover"
            decoding="async"
          />
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-[#687684]">{v2TravelImages.cambodia.caption}</figcaption>
        </figure>
        <div className="mt-10 grid gap-8 md:grid-cols-2"><p className="text-xl leading-9 text-white/68">{v2TravelStory.summary}</p><p className="text-base leading-8 text-white/50">{v2TravelStory.reflection}</p></div>
      </PageSection>
      <PageSection label="France and Monaco" title="A landlocked start, then days around the docks.">
        <p className="max-w-3xl text-lg leading-8 text-white/55">I moved to the south of France to pursue superyacht work, walked the docks looking for opportunities and completed day work maintaining the standards expected on board. That chapter also took me through Monaco before I travelled onwards in Europe.</p>
        <blockquote className="mt-10 max-w-4xl font-serif text-3xl leading-tight text-[#0B1F33] sm:text-5xl">“{v2Voice.france}”</blockquote>
        <div className="mt-12 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-12">
          {franceImages.map((image, index) => (
            <figure key={image.src} className={index === 0 ? 'lg:col-span-7' : index === 1 ? 'lg:col-span-5' : 'md:col-start-2 lg:col-span-5 lg:col-start-8'}>
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={index === 0 ? '(min-width: 1024px) 560px, (min-width: 768px) 50vw, calc(100vw - 40px)' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, calc(100vw - 40px)'}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className="h-auto w-full rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-3 text-sm leading-6 text-[#687684]">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </PageSection>
      <PageSection label="Approach" title="Perspective matters more than a country count.">
        <p className="max-w-3xl text-lg leading-8 text-white/55">Travel has included Africa, Europe and Asia, including solo travel, yacht day work in the south of France, time in Spain and Sweden, and wider European travel funded from work. Exact counts and dates remain unpublished until verified.</p>
      </PageSection>
    </>
  );
}

function NowContent() {
  return (
    <>
      <PageSection label="Current" title={`Living and working in ${v2Now.location}.`}>
        <dl className="grid gap-8 md:grid-cols-2">
          <div><dt className="v2-dt">Work</dt><dd className="v2-dd">{v2Now.work}</dd></div>
          <div><dt className="v2-dt">Building</dt><dd className="v2-dd">{v2Now.building.join(' · ')}</dd></div>
          <div><dt className="v2-dt">Learning</dt><dd className="v2-dd">{v2Now.learning.join(' · ')}</dd></div>
          <div><dt className="v2-dt">Last reviewed</dt><dd className="v2-dd">{v2Now.lastReviewed}</dd></div>
        </dl>
      </PageSection>
      <PageSection label="Principles" title="Simple rules for the work in progress.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">{v2Principles.map((principle) => <article key={principle.title} className="bg-[#102A43] p-7"><h3 className="text-xl text-white">{principle.title}</h3><p className="mt-3 leading-7 text-white/50">{principle.text}</p></article>)}</div>
      </PageSection>
      <PageSection label="Direction" title="Learn internationally. Apply it meaningfully in Zimbabwe.">
        <p className="max-w-3xl text-xl leading-9 text-white/55">{v2Voice.direction}</p>
        <p className="mt-7 max-w-3xl text-base leading-8 text-white/50">{v2Voice.meaning}</p>
      </PageSection>
    </>
  );
}

const pageContent: Record<V2DetailPageKind, () => ReactNode> = {
  about: AboutContent,
  work: WorkContent,
  projects: ProjectsContent,
  writing: WritingContent,
  travel: TravelContent,
  now: NowContent,
};

export default function V2DetailPage({ page }: { page: V2DetailPageKind }) {
  const meta = pageMeta[page];
  const Content = pageContent[page];
  const mainRef = useRef<HTMLElement>(null);
  const pageIndex = v2Navigation.findIndex((item) => item.href.endsWith(`/${page}`));
  const previousPage = v2Navigation[pageIndex - 1];
  const nextPage = v2Navigation[pageIndex + 1];

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
    <div className="v2-shell v2-detail-shell min-h-screen overflow-x-hidden bg-[#F7F8FA] text-[#0B1F33]">
      <a href="#v2-detail-main" className="v2-skip-link" onClick={handleSkipLink}>Skip to content</a>
      <V2Header currentSection={page} />
      <main ref={mainRef} id="v2-detail-main" tabIndex={-1} className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <section className={`v2-detail-hero flex items-end text-[#F7F8FA] ${page === 'work' ? 'min-h-[38vh] py-12 sm:min-h-[44vh] sm:py-14' : 'min-h-[72vh] py-20 sm:py-28'}`}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9DBBE8]">{meta.eyebrow}</p>
            <h1 className={`max-w-6xl break-words font-serif font-normal tracking-[-0.05em] text-white ${page === 'work' ? 'mt-5 text-[clamp(2.5rem,4.2vw,4.8rem)] leading-[1]' : 'mt-7 text-[clamp(2.7rem,9vw,8rem)] leading-[0.9]'}`}>{meta.title}</h1>
            <p className={`${page === 'work' ? 'mt-6' : 'mt-9'} max-w-3xl text-lg leading-8 text-white/55 sm:text-xl`}>{meta.introduction}</p>
          </div>
        </section>
        <Content />
        <nav className="v2-detail-adjacent v2-light grid gap-3 border-t border-black/10 py-12 sm:grid-cols-2" aria-label="Adjacent V2 pages">
          {previousPage ? <a href={previousPage.href} className="rounded-2xl border border-white/10 p-5 text-white/55 transition-colors hover:border-[#B08D3A]/35 hover:text-white"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">Previous</span><span className="mt-2 block text-lg">← {previousPage.label}</span></a> : <span />}
          {nextPage ? <a href={nextPage.href} className="rounded-2xl border border-white/10 p-5 text-right text-white/55 transition-colors hover:border-[#B08D3A]/35 hover:text-white"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">Next</span><span className="mt-2 block text-lg">{nextPage.label} →</span></a> : null}
        </nav>
      </main>
      <V2Footer />
    </div>
  );
}
