import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  align?: 'left' | 'center';
  tone?: 'paper' | 'ivory';
  children?: ReactNode;
};

export default function PageHeader({ eyebrow, title, intro, align = 'left', tone = 'paper', children }: PageHeaderProps) {
  const centered = align === 'center';
  const background = tone === 'ivory' ? 'bg-ivory' : 'bg-paper';

  return (
    <header className={`relative overflow-hidden border-b border-line ${background}`}>
      <div className={`relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 ${centered ? 'text-center' : ''}`}>
        {eyebrow && (
          <p className="eyebrow mb-6 text-bodyText">{eyebrow}</p>
        )}
        <h1 className={`font-serif text-5xl font-medium leading-[0.94] tracking-[-0.045em] text-charcoal md:text-7xl lg:text-[5.5rem] ${centered ? 'mx-auto max-w-5xl' : 'max-w-5xl'}`}>
          {title}
        </h1>
        <p className={`mt-7 text-base leading-8 text-bodyText md:text-xl md:leading-9 ${centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}`}>
          {intro}
        </p>
        {children && <div className={centered ? 'mt-8 flex justify-center' : 'mt-8'}>{children}</div>}
      </div>
    </header>
  );
}
