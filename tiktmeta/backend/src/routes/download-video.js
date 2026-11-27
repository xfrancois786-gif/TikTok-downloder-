// routes/download-video.js
import { validateUrl } from '../middlewares/validateUrl.js';
import { rateLimit, clientIp } from '../middlewares/rateLimit.js';
import { cacheGet, cachePut, cacheKey } from '../utils/cache.js';
import { tikliveService } from '../services/tikliveService.js';
import { json, fail } from '../utils/response.js';

export async function downloadVideo(request, env) {
  const v = await validateUrl(request);
  if (v.error) return v.error;

  const rl = await rateLimit(env, clientIp(request));
  if (!rl.ok)
    return json({ ok: false, error: 'Rate limit exceeded' }, 429);

  const key = cacheKey('vid', v.url);
  const cached = await cacheGet(env, key);
  if (cached) return json(cached);

  try {
    const data = await tikliveService.downloadVideo(env, v.url);
    await cachePut(env, key, data);
    return json(data);
  } catch (e) {
    return fail(e);
  }
}