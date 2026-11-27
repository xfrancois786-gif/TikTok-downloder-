// TiktMeta static site generator.
// Usage: node build.mjs [--locale=en] [--all]
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOOLS, BLOG, PAGES, TOOL_CATEGORIES, BLOG_CATEGORIES, COUNTS } from './data.mjs';
import { LOCALES, DEFAULT_LOCALE } from './i18n.mjs';
import { localizedTools, localizedBlog } from './content.mjs';
import * as T from './templates.mjs';
import { CSS, MAIN_JS, DL_JS, LOGO, OG, HERO, JPG_B64, MIN_CSS, MIN_MAIN_JS, MIN_DL_JS } from './assets.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'frontend');
const DOMAIN = (process.env.SITE_DOMAIN || 'https://tiktmeta.com').replace(/\/$/, '');

const args = process.argv.slice(2);
const only = args.includes('--all') ? null : (args.find((a) => a.startsWith('--locale='))?.split('=')[1] || DEFAULT_LOCALE);

async function w(path, content) {
  const full = join(OUT, path);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, content);
}

async function buildLocale(locale) {
  const prefix = locale === DEFAULT_LOCALE ? '' : locale + '/';
  const p = (route) => prefix + (route === '/' ? '' : route.replace(/^\//, '')) + '/index.html';
  // home
  await w(p('/'), T.home(locale));
  // tools
  await w(p('/tools'), T.toolsIndex(locale));
  for (const t of localizedTools(locale)) await w(p(`/tools/${t.category}/${t.slug}`), T.toolPage(locale, t));
  // blog
  await w(p('/blog'), T.blogIndex(locale));
  for (const b of localizedBlog(locale)) await w(p(`/blog/${b.category}/${b.slug}`), T.blogPost(locale, b));
  // pages
  for (const pg of PAGES) await w(p(`/pages/${pg.slug}`), T.infoPage(locale, pg));
}

async function writeAssets() {
  await w('assets/css/style.css', MIN_CSS);
  await w('assets/js/main.js', MIN_MAIN_JS);
  await w('assets/js/downloader.js', MIN_DL_JS);
  await w('assets/img/logo.svg', LOGO);
  await w('assets/img/og-image.svg', OG);
  await w('assets/img/hero.svg', HERO);
  await w('assets/img/og-image.jpg', Buffer.from(JPG_B64, 'base64'));
  await w('assets/img/hero.jpg', Buffer.from(JPG_B64, 'base64'));
  await w('favicon.svg', LOGO);
  await w('favicon.ico', Buffer.from(JPG_B64, 'base64'));
  await w('manifest.json', JSON.stringify({ name: 'TiktMeta', short_name: 'TiktMeta', start_url: '/', display: 'standalone', background_color: '#0b0b10', theme_color: '#e11d48', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] }, null, 2));
  await w('404.html', T.notFound());
  await w('feed.xml', buildFeed());
  await w('_headers', `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
/404.html
  Cache-Control: public, max-age=0, must-revalidate
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/feed.xml
  Content-Type: application/rss+xml; charset=utf-8
`);
  await w('_redirects', buildRedirects());
}

// RSS 2.0 feed of the latest blog posts.
function buildFeed() {
  const items = BLOG.slice(0, 20)
    .map((p) => {
      const link = url(`/blog/${p.category}/${p.slug}`, DEFAULT_LOCALE);
      return `    <item>
      <title>${p.title}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${blogFeedDesc(p)}</description>
      <pubDate>Thu, 27 Nov 2026 00:00:00 GMT</pubDate>
    </item>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${'TiktMeta'} Blog</title>
    <link>${DOMAIN}/blog</link>
    <description>TikTok download guides, how-tos and answers.</description>
    <language>en</language>
    <lastBuildDate>Thu, 27 Nov 2026 00:00:00 GMT</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function blogFeedDesc(p) {
  const b = blogBodySafe(p);
  return b;
}

// Lightweight description (avoids importing template internals).
function blogBodySafe(p) {
  return `${p.title} — a clear, practical guide. Everything you need to know, no fluff.`;
}

// Legacy / English aliases -> canonical new structure (301).
function buildRedirects() {
  const map = [
    ['/tiktok-downloader', '/tools/video/tiktok-video-downloader'],
    ['/tiktok-downloader-without-watermark', '/tools/video/tiktok-no-watermark-downloader'],
    ['/tiktok-watermark-remover', '/tools/video/tiktok-watermark-remover'],
    ['/tiktok-hd-downloader', '/tools/video/tiktok-hd-downloader'],
    ['/tiktok-to-mp3', '/tools/converter/tiktok-to-mp3'],
    ['/tiktok-to-mp4', '/tools/converter/tiktok-to-mp4'],
    ['/how-to-download', '/blog/how-to-download/how-to-download-tiktok-without-watermark'],
    ['/about', '/pages/about'],
    ['/contact', '/pages/contact'],
    ['/faq', '/pages/faq'],
    ['/privacy-policy', '/pages/privacy-policy'],
    ['/terms-of-service', '/pages/terms-of-service'],
    ['/dmca', '/pages/dmca'],
    ['/cookie-policy', '/pages/cookie-policy'],
    ['/how-to-use', '/pages/how-to-use'],
  ];
  return map.map(([from, to]) => `${from} ${to} 301`).join('\n') + '\n';
}

const LASTMOD = '2026-11-27';

function url(route, locale) {
  const prefix = locale === DEFAULT_LOCALE ? '' : locale + '/';
  return DOMAIN + '/' + prefix + (route === '/' ? '' : route.replace(/^\//, ''));
}

// One <url> entry with hreflang alternates for every locale.
function urlEntry(route, locale, priority, changefreq) {
  const loc = url(route, locale);
  const alts = LOCALES.map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${url(route, l.code)}" />`
  ).join('\n');
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alts}
  </url>`;
}

async function writeRobotsAndSitemaps(locales) {
  await w('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);
  const tools = [], blog = [], pages = [];
  for (const l of locales) {
    tools.push(urlEntry('/tools', l.code, '0.9', 'weekly'));
    for (const t of TOOLS) tools.push(urlEntry(`/tools/${t.category}/${t.slug}`, l.code, '0.8', 'weekly'));
    blog.push(urlEntry('/blog', l.code, '0.9', 'weekly'));
    for (const b of BLOG) blog.push(urlEntry(`/blog/${b.category}/${b.slug}`, l.code, '0.7', 'monthly'));
    for (const pg of PAGES) pages.push(urlEntry(`/pages/${pg.slug}`, l.code, '0.5', 'monthly'));
  }
  const wrap = (arr) =>
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${arr.join('\n')}\n</urlset>\n`;
  await w('sitemap-tools.xml', wrap(tools));
  await w('sitemap-blog.xml', wrap(blog));
  await w('sitemap-pages.xml', wrap(pages));
  await w('sitemap-images.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url><loc>${DOMAIN}/</loc><image:image><image:loc>${DOMAIN}/assets/img/og-image.jpg</image:loc><image:title>${'TiktMeta'} — TikTok Downloader</image:title></image:image><image:image><image:loc>${DOMAIN}/assets/img/hero.jpg</image:loc><image:title>TikTok Downloader hero</image:title></image:image></url>\n</urlset>\n`);
  await w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${DOMAIN}/sitemap-tools.xml</loc></sitemap>\n  <sitemap><loc>${DOMAIN}/sitemap-blog.xml</loc></sitemap>\n  <sitemap><loc>${DOMAIN}/sitemap-pages.xml</loc></sitemap>\n  <sitemap><loc>${DOMAIN}/sitemap-images.xml</loc></sitemap>\n</sitemapindex>\n`);
  // home is in the index; count all url entries across the three files
  return 1 + tools.length + blog.length + pages.length;
}

const locales = only ? LOCALES.filter((l) => l.code === only) : LOCALES;
await rm(OUT, { recursive: true, force: true });
await writeAssets();
for (const l of locales) await buildLocale(l.code);
const total = await writeRobotsAndSitemaps(locales);

const perLocale = 1 + 1 + TOOLS.length + 1 + BLOG.length + PAGES.length;
console.log(`Built ${locales.length} locale(s): ${perLocale} pages each = ${locales.length * perLocale} pages (+ assets, sitemaps).`);
console.log(`Tools: ${COUNTS.tools} | Blog: ${COUNTS.blog} | Pages: ${COUNTS.pages} | Per-locale total: ${perLocale}`);
console.log(`Sitemap URLs: ${total}`);