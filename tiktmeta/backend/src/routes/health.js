// routes/health.js
import { json } from '../utils/response.js';

export async function health(request, env) {
  return json({
    ok: true,
    service: 'tiktmeta-api',
    upstream: (env.TIKLIVE_API_KEY || env.DOWNLOAD_API_KEY) ? 'configured' : 'missing',
    time: new Date().toISOString(),
  });
}