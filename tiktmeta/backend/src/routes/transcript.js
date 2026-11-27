// routes/transcript.js
import { validateUrl } from '../middlewares/validateUrl.js';
import { cacheGet, cachePut, cacheKey } from '../utils/cache.js';
import { tikliveService } from '../services/tikliveService.js';
import { json, fail } from '../utils/response.js';

export async function transcript(request, env) {
  const v = await validateUrl(request);
  if (v.error) return v.error;
  const key = cacheKey('txt', v.url);
  const cached = await cacheGet(env, key);
  if (cached) return json(cached);
  try {
    const data = await tikliveService.transcript(env, v.url);
    await cachePut(env, key, data);
    return json(data);
  } catch (e) {
    return fail(e);
  }
}