import { AlertTriangle } from 'lucide-react';
import { brand } from '../data/siteData';

type DisclaimerBannerProps = {
  compact?: boolean;
};

export default function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  return (
    <aside className="border-y border-line bg-ivory">
      <div className={`mx-auto flex max-w-7xl gap-3 px-5 md:px-8 ${compact ? 'py-3' : 'py-5'}`}>
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
        <p className="font-mono text-[10px] leading-5 text-bodyText">{brand.disclaimer}</p>
      </div>
    </aside>
  );
}
