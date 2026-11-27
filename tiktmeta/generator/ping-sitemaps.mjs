// ping-sitemaps.mjs — submit the sitemap to search engines after deploying.
// Usage: SITE_DOMAIN=https://your-host node ping-sitemaps.mjs
// Google: /ping?sitemap=  (deprecated for GET but still accepted by Bing/IndexNow)
// Bing + Yandex + others: IndexNow batch endpoint.
import { fileURLToPath } from 'node:url';

const DOMAIN = (process.env.SITE_DOMAIN || 'https://tiktmeta.com').replace(/\/$/, '');
// IndexNow key: generate once and host at `${DOMAIN}/<key>.txt` containing the key.
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

const sitemapUrl = `${DOMAIN}/sitemap.xml`;

async function ping(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    console.log(`${res.status}  ${url}`);
  } catch (e) {
    console.log(`ERR   ${url}  (${e.message})`);
  }
}

async function indexNow() {
  if (!INDEXNOW_KEY) {
    console.log('IndexNow skipped (set INDEXNOW_KEY and host /<key>.txt).');
    return;
  }
  // Submit the homepage + sitemap; IndexNow is for changed URLs.
  const payload = {
    host: new globalThis.URL(DOMAIN).host,
    key: INDEXNOW_KEY,
    keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: [`${DOMAIN}/`, sitemapUrl],
  };
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    console.log(`IndexNow ${res.status}`);
  } catch (e) {
    console.log(`IndexNow ERR (${e.message})`);
  }
}

console.log(`Pinging sitemaps for ${DOMAIN}\n`);
await Promise.all([
  ping(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
  ping(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
]);
await indexNow();
console.log('\nDone. Also submit the sitemap in Google Search Console and Bing Webmaster Tools for best results.');