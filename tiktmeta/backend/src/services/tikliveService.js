// services/tikliveService.js — talks to the real TikLive API.
// Base: https://api.tikliveapi.com  Auth: X-Api-Key header.
// Cloudflare only proxies JSON — never media bytes. Signed CDN links are
// returned to the browser, which downloads directly from TikTok's CDN.

const BASE = 'https://api.tikliveapi.com';

function apiKey(env) {
  return env.TIKLIVE_API_KEY || env.DOWNLOAD_API_KEY || '';
}

// Build a GET request to the upstream with the API key header.
// TikLive returns HTTP 200 even for errors, with a { message } body,
// so we inspect the payload rather than relying on the status code.
async function get(env, path, params) {
  const key = apiKey(env);
  if (!key) {
    const err = new Error('TIKLIVE_API_KEY is not configured');
    err.code = 'NO_UPSTREAM';
    throw err;
  }
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}${path}?${qs}`, {
    method: 'GET',
    headers: { 'X-Api-Key': key, Accept: 'application/json' },
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    const err = new Error(`Upstream returned non-JSON (${res.status})`);
    err.code = 'UPSTREAM';
    throw err;
  }
  if (!res.ok || (data && data.message)) {
    const err = new Error((data && data.message) || `Upstream ${res.status}`);
    err.code = 'UPSTREAM';
    throw err;
  }
  return data;
}

// Extract the username/handle from a TikTok profile URL.
function usernameFromUrl(url) {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/@([^/]+)/);
    if (m) return m[1];
  } catch {
    /* ignore */
  }
  return null;
}

// Normalize the various upstream payloads into the { ok, links } shape the
// frontend expects, while keeping the raw data available for callers.
function videoResult(data) {
  const links = [];
  if (data.video_hd) links.push({ label: 'Download HD (no watermark)', url: data.video_hd });
  if (data.video) links.push({ label: 'Download (no watermark)', url: data.video });
  return { ok: true, links, video: data.video, video_hd: data.video_hd };
}

export const tikliveService = {
  async downloadVideo(env, url) {
    const data = await get(env, '/download-video/', { url });
    return videoResult(data);
  },

  async downloadMusic(env, url) {
    const data = await get(env, '/download-music/', { url });
    const links = data.music ? [{ label: 'Download MP3', url: data.music }] : [];
    return { ok: true, links, music: data.music };
  },

  // Photo posts: TikLive exposes stills through post-detail. We collect any
  // image URLs available (images[] when present, else the cover stills).
  async downloadPhoto(env, url) {
    const data = await get(env, '/post-detail/', { url });
    const images = Array.isArray(data.images) && data.images.length
      ? data.images.map((im) => (typeof im === 'string' ? im : im.url))
      : [data.origin_cover, data.cover, data.ai_dynamic_cover].filter(Boolean);
    const links = images.map((u, i) => ({ label: `Download photo ${i + 1}`, url: u }));
    return { ok: true, links, images };
  },

  async postDetail(env, url) {
    const data = await get(env, '/post-detail/', { url });
    return { ok: true, ...data };
  },

  async userInfo(env, url) {
    const username = usernameFromUrl(url);
    const params = username ? { username } : { url };
    const data = await get(env, '/userinfo-by-username/', params);
    return { ok: true, ...data };
  },

  // TikLive does not expose a transcript endpoint; return a clear message.
  async transcript() {
    const err = new Error('Transcription is not available from the current provider');
    err.code = 'UNSUPPORTED';
    throw err;
  },
};