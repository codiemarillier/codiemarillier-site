import { useEffect } from 'react';

const cloudflareAnalyticsToken = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN;
const analyticsEnabledInDev = import.meta.env.VITE_ANALYTICS_ENABLE_DEV === 'true';

export default function Analytics() {
  useEffect(() => {
    if (!cloudflareAnalyticsToken) return;
    if (import.meta.env.DEV && !analyticsEnabledInDev) return;
    if (document.querySelector('script[data-codie-analytics="cloudflare"]')) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset.codieAnalytics = 'cloudflare';
    script.dataset.cfBeacon = JSON.stringify({
      token: cloudflareAnalyticsToken,
      spa: true,
    });

    document.body.appendChild(script);
  }, []);

  return null;
}
