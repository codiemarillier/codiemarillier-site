type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro: string;
};

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        )}
        <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-none text-charcoal md:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-slateText md:text-xl">{intro}</p>
      </div>
    </header>
  );
}
