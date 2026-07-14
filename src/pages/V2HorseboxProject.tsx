import V2SubpageFrame from '../components/V2SubpageFrame';
import { v2HorseboxProjectDetails, v2Projects } from '../data/v2Content';

const horseboxProject = v2Projects.find((project) => project.slug === 'horsebox-conversion');

export default function V2HorseboxProject() {
  if (!horseboxProject) return null;

  return (
    <V2SubpageFrame
      currentSection="projects"
      eyebrow="Project / University"
      title={v2HorseboxProjectDetails.legalName}
      introduction="A friend and I bought old horsebox trailers and explored how they could become useful event units, displays and custom mobile spaces. It was small, practical and much more instructive than the original plan suggested."
      backHref="/v2-preview/projects"
      backLabel="Back to projects"
    >
      <section className="v2-light border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">01 / The project</p><span className="v2-status mt-4">{horseboxProject.status}</span></div>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-none tracking-[-0.04em] text-[#17221e] sm:text-6xl">Learning through materials, costs and real constraints.</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#52625b]">{horseboxProject.summary}</p>
            <p className="mt-6 max-w-3xl leading-8 text-[#52625b]">The idea was to take underused trailers and investigate how repair, design and careful presentation could give them a different commercial use. The work moved between sourcing, budgeting, physical refurbishment, pricing and finding a model that made sense in practice.</p>
            <p className="mt-6 max-w-3xl border-l-2 border-[#c8a96a] pl-5 leading-8 text-[#33443c]">{v2HorseboxProjectDetails.currentUpdate}</p>
            <p className="mt-8 max-w-3xl text-xs leading-6 text-[#6a776f]">{horseboxProject.note}</p>
          </div>
        </div>
      </section>

      <section className="v2-sand border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">02 / Possible uses</p>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-[#17221e] sm:text-5xl">What the trailers could become.</h2>
            <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {v2HorseboxProjectDetails.possibleUses.map((item) => <li key={item} className="flex items-center justify-between py-4 text-[#33443c]"><span>{item}</span><span className="text-[#32634f]" aria-hidden="true">↗</span></li>)}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">03 / The work</p>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-[#17221e] sm:text-5xl">What the project required.</h2>
            <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {v2HorseboxProjectDetails.skills.map((item) => <li key={item} className="py-4 text-[#33443c]">{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="v2-light border-t border-black/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1344px]">
          <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#32634f]">04 / Photographs</p>
            <div>
              <h2 className="max-w-4xl font-serif text-4xl leading-none tracking-[-0.04em] text-[#17221e] sm:text-6xl">The conversion, in pictures.</h2>
              {v2HorseboxProjectDetails.images.length ? (
                <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
                  {v2HorseboxProjectDetails.images.map((image, index) => (
                    <figure key={image.src}>
                      <img
                        src={image.src}
                        srcSet={image.srcSet}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-auto w-full rounded-2xl border border-black/10 object-cover"
                      />
                      <figcaption className="mt-3 text-sm leading-6 text-[#52625b]">{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {[1, 2].map((slot) => <div key={slot} className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-black/20 bg-white/30 p-8 text-center"><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#32634f]">Photo space {String(slot).padStart(2, '0')}</p><p className="mt-3 max-w-xs text-sm leading-6 text-[#6a776f]">Horsebox photographs will appear here once they are supplied and approved for the website.</p></div></div>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="v2-voice-section px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#17221e]/85">05 / What it taught me</p>
          <blockquote className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.035em] text-[#17221e] sm:text-5xl">{horseboxProject.lesson}</blockquote>
        </div>
      </section>
    </V2SubpageFrame>
  );
}
