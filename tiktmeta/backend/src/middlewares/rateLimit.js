// middlewares/rateLimit.js — simple per-IP token bucket using KV (best-effort).

export async function rateLimit(env, ip, limit = 20, windowSec = 60) {
  try {
    if (!env.CACHE) return { ok: true };
    const key = `rl:${ip}`;
    const cur = (await env.CACHE.get(key, 'json')) || { count: 0, reset: Date.now() + windowSec * 1000 };
    if (Date.now() > cur.reset) {
      cur.count = 0;
      cur.reset = Date.now() + windowSec * 1000;
    }
    cur.count += 1;
    await env.CACHE.put(key, JSON.stringify(cur), { expirationTtl: windowSec });
    if (cur.count > limit) return { ok: false, retry: Math.ceil((cur.reset - Date.now()) / 1000) };
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

export function clientIp(request) {
  return request.headers.get('cf-connecting-ip') || 'unknown';
}