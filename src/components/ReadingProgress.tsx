import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent" aria-hidden="true">
      <div className="h-full origin-left bg-link" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
