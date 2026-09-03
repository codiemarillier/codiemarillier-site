const maintenancePage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow, noarchive">
    <title>Temporarily unavailable</title>
    <style>
      :root { color-scheme: dark; font-family: system-ui, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #080a09; color: #f2f1ea; }
      main { width: min(38rem, calc(100% - 3rem)); }
      p { color: #a9b0aa; font-size: 1.05rem; line-height: 1.7; }
      h1 { margin: 0 0 1rem; font-size: clamp(2.25rem, 8vw, 4.75rem); line-height: 0.95; letter-spacing: -0.04em; }
    </style>
  </head>
  <body>
    <main>
      <h1>Temporarily unavailable.</h1>
      <p>This site is offline for now and will return soon.</p>
    </main>
  </body>
</html>`;

export function onRequest(context) {
  return new Response(context.request.method === 'HEAD' ? null : maintenancePage, {
    status: 503,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'text/html; charset=UTF-8',
      'Retry-After': '86400',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
