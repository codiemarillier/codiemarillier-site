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
        <p className="eyebrow mb-5 text-bodyText">{eyebrow}</p>
      )}
      <h2 className="font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-charcoal md:text-6xl">{title}</h2>
      {text && <p className="mt-6 text-base leading-8 text-bodyText md:text-lg md:leading-9">{text}</p>}
    </div>
  );
}
