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
    <header className={`border-b border-line ${background}`}>
      <div className={`mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 ${centered ? 'text-center' : ''}`}>
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        )}
        <h1 className={`font-serif text-5xl font-semibold leading-none text-charcoal md:text-7xl ${centered ? 'mx-auto max-w-4xl' : 'max-w-4xl'}`}>
          {title}
        </h1>
        <p className={`mt-7 text-lg leading-8 text-slateText md:text-xl ${centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}`}>
          {intro}
        </p>
        {children && <div className={centered ? 'mt-8 flex justify-center' : 'mt-8'}>{children}</div>}
      </div>
    </header>
  );
}
