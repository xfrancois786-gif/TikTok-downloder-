import type { APIRoute } from 'astro';

/**
 * API-only backend. This endpoint is the ONLY server logic.
 * It forwards the TikTok URL to your own download API and returns a small JSON
 * with the direct media URL. The browser then downloads straight from the
 * source CDN — no media bytes transit Cloudflare (bandwidth ~0).
 *
 * Configure via environment (wrangler secret / .dev.vars):
 *   DOWNLOAD_API_URL   e.g. https://your-api.com/extract
 *   DOWNLOAD_API_KEY   optional bearer token
 *
 * Expected upstream JSON (adapt to your API):
 *   { ok: true, video: { id, url, cover, music } }
 */

interface Env {
  DOWNLOAD_API_URL?: string;
  DOWNLOAD_API_KEY?: string;
}

const JSON = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as unknown as { runtime?: { env?: Env } }).runtime?.env ?? (globalThis as any).__env ?? {};
  const apiUrl = env.DOWNLOAD_API_URL;

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return JSON({ ok: false, error: 'Invalid JSON body.' }, 400);
  }

  const url = (body.url || '').trim();
  if (!/tiktok\.com/i.test(url)) {
    return JSON({ ok: false, error: 'A valid TikTok URL is required.' }, 400);
  }

  if (!apiUrl) {
    return JSON(
      { ok: false, error: 'Download API is not configured (set DOWNLOAD_API_URL).' },
      503
    );
  }

  try {
    const upstream = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.DOWNLOAD_API_KEY ? { Authorization: `Bearer ${env.DOWNLOAD_API_KEY}` } : {}),
      },
      body: JSON.stringify({ url }),
    });

    if (!upstream.ok) {
      return JSON({ ok: false, error: `Upstream API error (${upstream.status}).` }, 502);
    }

    const data = (await upstream.json()) as {
      ok?: boolean;
      error?: string;
      video?: { id?: string; url: string; cover?: string; music?: string };
    };

    if (!data.ok || !data.video?.url) {
      return JSON({ ok: false, error: data.error || 'Could not extract this video.' }, 422);
    }

    return JSON({ ok: true, video: data.video });
  } catch {
    return JSON({ ok: false, error: 'Failed to reach the download API.' }, 502);
  }
};