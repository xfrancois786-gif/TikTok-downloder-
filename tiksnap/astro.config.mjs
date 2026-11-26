import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Single-language now (en at /). The locale list in src/lib/i18n.ts drives
// hreflang/sitemaps; adding locales there + per-locale content is all that's
// needed to scale to 30 languages (1050 pages) without touching templates.
export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  site: 'https://example.com',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'fr', 'de', 'it', 'id', 'tr', 'ar', 'ja'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});