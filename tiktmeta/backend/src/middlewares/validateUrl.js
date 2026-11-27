// middlewares/validateUrl.js — validate TikTok URL from JSON body.

import { isTikTokUrl, normalizeUrl, badRequest } from '../utils/validator.js';

export async function validateUrl(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return { error: badRequest('Invalid JSON body') };
  }
  const url = body?.url;
  if (!url || typeof url !== 'string' || !isTikTokUrl(url)) {
    return { error: badRequest('A valid TikTok URL is required') };
  }
  return { url: normalizeUrl(url) };
}