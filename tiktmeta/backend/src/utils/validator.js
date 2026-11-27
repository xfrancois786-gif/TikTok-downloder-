// utils/validator.js — URL + payload validation helpers.

const TIKTOK_HOSTS = [
  'tiktok.com',
  'www.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
  'm.tiktok.com',
];

export function isTikTokUrl(input) {
  try {
    const u = new URL(input);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    return TIKTOK_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith('.' + h));
  } catch {
    return false;
  }
}

export function normalizeUrl(input) {
  const u = new URL(input);
  u.hash = '';
  return u.toString();
}

export function badRequest(message) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}