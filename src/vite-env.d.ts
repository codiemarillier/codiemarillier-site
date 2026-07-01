/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN?: string;
  readonly VITE_ANALYTICS_ENABLE_DEV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
