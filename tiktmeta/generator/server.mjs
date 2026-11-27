// server.mjs — all-in-one live server: static frontend + /api proxy to TikLive.
// Serves the built ./frontend and implements the same JSON endpoints as the
// Cloudflare Worker, calling the real TikLive API with the API key.
// Media is never proxied: the browser downloads from TikTok's signed CDN links.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const ROOT = normalize(join(HERE, '..', 'frontend') + '/');
const PORT = Number(process.env.PORT || 5000);
const TIKLIVE = 'https://api.tikliveapi.com';
const KEY = process.env.TIKLIVE_API_KEY || 'b7105ebbe6bb1b80de31042f9629f9b0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const TIKTOK_HOSTS = ['tiktok.com', 'www.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com', 'm.tiktok.com'];
function isTikTokUrl(input) {
  try {
    const u = new URL(input);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    return TIKTOK_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith('.' + h));
  } catch { return false; }
}

async function tiklive(path, params) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`${TIKLIVE}${path}?${qs}`, {
    method: 'GET',
    headers: { 'X-Api-Key': KEY, Accept: 'application/json' },
  });
  const text = await r.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; }
  catch { throw new Error(`Upstream returned non-JSON (${r.status})`); }
  if (!r.ok || (data && data.message)) throw new Error((data && data.message) || `Upstream ${r.status}`);
  return data;
}

function usernameFromUrl(url) {
  try { const m = new URL(url).pathname.match(/\/@([^/]+)/); if (m) return m[1]; } catch {}
  return null;
}

async function handleApi(req, res, pathname) {
  if (pathname === '/api/health' && req.method === 'GET') {
    return json(res, { ok: true, service: 'tiktmeta-api', upstream: KEY ? 'configured' : 'missing', time: new Date().toISOString() });
  }
  if (req.method !== 'POST') return json(res, { ok: false, error: 'Method not allowed' }, 405);
  let body = '';
  for await (const chunk of req) body += chunk;
  let url;
  try { url = JSON.parse(body || '{}').url; }
  catch { return json(res, { ok: false, error: 'Invalid JSON body' }, 400); }
  if (!url || typeof url !== 'string' || !isTikTokUrl(url)) {
    return json(res, { ok: false, error: 'A valid TikTok URL is required' }, 400);
  }
  try {
    if (pathname === '/api/download-video') {
      const d = await tiklive('/download-video/', { url });
      const links = [];
      if (d.video_hd) links.push({ label: 'Download HD (no watermark)', url: d.video_hd });
      if (d.video) links.push({ label: 'Download (no watermark)', url: d.video });
      return json(res, { ok: true, links, video: d.video, video_hd: d.video_hd });
    }
    if (pathname === '/api/download-music') {
      const d = await tiklive('/download-music/', { url });
      return json(res, { ok: true, links: d.music ? [{ label: 'Download MP3', url: d.music }] : [], music: d.music });
    }
    if (pathname === '/api/download-photo') {
      const d = await tiklive('/post-detail/', { url });
      const images = Array.isArray(d.images) && d.images.length
        ? d.images.map((im) => (typeof im === 'string' ? im : im.url))
        : [d.origin_cover, d.cover, d.ai_dynamic_cover].filter(Boolean);
      return json(res, { ok: true, links: images.map((u, i) => ({ label: `Download photo ${i + 1}`, url: u })), images });
    }
    if (pathname === '/api/post-detail') return json(res, { ok: true, ...(await tiklive('/post-detail/', { url })) });
    if (pathname === '/api/user-info') {
      const username = usernameFromUrl(url);
      return json(res, { ok: true, ...(await tiklive('/userinfo-by-username/', username ? { username } : { url })) });
    }
    if (pathname === '/api/transcript') {
      return json(res, { ok: false, error: 'Transcription is not available from the current provider' }, 501);
    }
    if (pathname === '/api/health') return json(res, { ok: true, service: 'tiktmeta-api', upstream: KEY ? 'configured' : 'missing' });
    return json(res, { ok: false, error: 'Not found' }, 404);
  } catch (e) {
    return json(res, { ok: false, error: e.message || 'Upstream error' }, 502);
  }
}

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      return res.end();
    }
    if (pathname.startsWith('/api/')) return handleApi(req, res, pathname);

    let p = pathname;
    let file = normalize(join(ROOT, p));
    if (!file.startsWith(ROOT)) throw new Error('forbidden');
    if (p.endsWith('/') || !extname(p)) file = join(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}).listen(PORT, '0.0.0.0', () => console.log(`TiktMeta live on http://localhost:${PORT}`));