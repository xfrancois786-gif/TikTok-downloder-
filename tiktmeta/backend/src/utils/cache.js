// utils/cache.js — tiny KV-backed cache with in-memory fallback.

export async function cacheGet(env, key) {
  try {
    if (env.CACHE) {
      const hit = await env.CACHE.get(key, 'json');
      if (hit) return hit;
    }
  } catch {
    /* ignore cache errors */
  }
  return null;
}

export async function cachePut(env, key, value, ttl = 300) {
  try {
    if (env.CACHE) await env.CACHE.put(key, JSON.stringify(value), { expirationTtl: ttl });
  } catch {
    /* ignore cache errors */
  }
}

export function cacheKey(prefix, url) {
  return `${prefix}:${new URL(url).hostname}${new URL(url).pathname}`;
}