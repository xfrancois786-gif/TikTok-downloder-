import type { APIRoute } from 'astro';
import { LOCALES, localizedPath } from '../lib/i18n';
import { TOOLS, INFO_PAGES } from '../data/tools';
import { getBlog } from '../lib/content';
import { SITE } from '../data/site';

// All locale-agnostic routes that exist.
function allRoutes(): string[] {
  const blog = getBlog('en').map((p) => `/blog/${p.slug}`);
  return [
    '/',
    '/tools',
    ...TOOLS.map((t) => `/tools/${t.slug}`),
    '/blog',
    ...blog,
    ...INFO_PAGES.map((p) => `/${p.slug}`),
  ];
}

const SITE_URL = process.env.SITE_URL || SITE.url;

export const GET: APIRoute = () => {
  const routes = allRoutes();
  const urls: string[] = [];
  for (const locale of LOCALES) {
    for (const route of routes) {
      urls.push(`  <url><loc>${new URL(localizedPath(locale, route), SITE_URL).href}</loc></url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n'
  )}\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};