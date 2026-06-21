import { AlertTriangle } from 'lucide-react';
import { brand } from '../data/siteData';

type DisclaimerBannerProps = {
  compact?: boolean;
};

export default function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  return (
    <aside className="border-y border-line bg-[#efe7da]">
      <div className={`mx-auto flex max-w-7xl gap-3 px-5 md:px-8 ${compact ? 'py-3' : 'py-5'}`}>
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
        <p className="text-sm leading-6 text-slateText">{brand.disclaimer}</p>
      </div>
    </aside>
  );
}
