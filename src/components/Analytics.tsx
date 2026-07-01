import { useEffect } from 'react';

const defaultCloudflareAnalyticsToken = '9cec7afa81f942b08160035130003070';
const cloudflareAnalyticsToken = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN || defaultCloudflareAnalyticsToken;
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
