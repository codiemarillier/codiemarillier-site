type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
};

export default function SectionHeader({ eyebrow, title, text, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
      )}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-slateText md:text-lg">{text}</p>}
    </div>
  );
}
