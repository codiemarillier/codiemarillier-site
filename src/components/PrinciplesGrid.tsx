import { principles } from '../data/siteData';

export default function PrinciplesGrid() {
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {principles.map((principle, index) => (
        <article key={principle.title} className="bg-paper p-6 transition-colors hover:bg-ivory">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Principle {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="font-serif text-3xl font-semibold text-charcoal">{principle.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slateText">{principle.text}</p>
        </article>
      ))}
    </div>
  );
}
