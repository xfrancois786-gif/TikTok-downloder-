// utils/response.js — shared JSON helpers.

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function fail(e) {
  const status =
    e.code === 'NO_UPSTREAM' ? 503 :
    e.code === 'UNSUPPORTED' ? 501 :
    502;
  return json({ ok: false, error: e.message || 'Upstream error' }, status);
}