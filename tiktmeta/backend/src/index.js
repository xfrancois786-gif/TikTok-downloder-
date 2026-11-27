// src/index.js — TiktMeta API entry (Cloudflare Workers, API-only).
import { downloadVideo } from './routes/download-video.js';
import { downloadMusic } from './routes/download-music.js';
import { downloadPhoto } from './routes/download-photo.js';
import { postDetail } from './routes/post-detail.js';
import { userInfo } from './routes/user-info.js';
import { transcript } from './routes/transcript.js';
import { health } from './routes/health.js';
import { json } from './utils/response.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function withCors(res) {
  const h = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS)) h.set(k, v);
  return new Response(res.body, { status: res.status, headers: h });
}

const ROUTES = {
  '/api/download-video': downloadVideo,
  '/api/download-music': downloadMusic,
  '/api/download-photo': downloadPhoto,
  '/api/post-detail': postDetail,
  '/api/user-info': userInfo,
  '/api/transcript': transcript,
  '/api/health': health,
  '/health': health,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/api')) {
      return withCors(
        json({
          ok: true,
          name: 'TiktMeta API',
          endpoints: Object.keys(ROUTES),
          upstream: (env.TIKLIVE_API_KEY || env.DOWNLOAD_API_KEY) ? 'configured' : 'missing',
        })
      );
    }

    const handler = ROUTES[url.pathname];
    if (!handler) return withCors(json({ ok: false, error: 'Not found' }, 404));

    if (request.method !== 'POST') {
      return withCors(json({ ok: false, error: 'Method not allowed' }, 405));
    }

    try {
      return withCors(await handler(request, env));
    } catch (e) {
      return withCors(json({ ok: false, error: e.message || 'Server error' }, 500));
    }
  },
};