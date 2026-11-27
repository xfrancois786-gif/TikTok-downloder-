# TiktMeta — Live Setup

The site is **live now** in this workspace at:

```
https://w5000-1075aa0c617440159a85e69d5441b18a.cloud-agent.kiloapps.ai/
```

The downloader is fully functional: paste a public TikTok link and it returns
clean (no-watermark) HD/SD MP4 links, or MP3 audio, fetched live from the
TikLive API. Media is downloaded directly from TikTok's CDN — never proxied
through Cloudflare.

## How it is wired

- **Frontend** (`frontend/`, static): the downloader calls `/api/download-video`
  on the same origin by default. Override with `window.TIKTMETA_API` (a base URL)
  loaded before `downloader.js` if the API is hosted separately.
- **Live sandbox server** (`generator/server.mjs`): serves the static build and
  implements `/api/*` by calling `https://api.tikliveapi.com` with the
  `X-Api-Key` header. Start with `PORT=5000 node generator/server.mjs`.
- **Cloudflare Worker backend** (`backend/`): same endpoints, for production.
  Key is in `wrangler.toml` `[vars] TIKLIVE_API_KEY`.

## Endpoints (all POST JSON `{ "url": "<tiktok url>" }`)

| Path | Returns |
| --- | --- |
| `/api/download-video` | `{ ok, links:[{label,url}] }` — HD + SD, no watermark |
| `/api/download-music` | `{ ok, links:[…] }` — MP3 audio |
| `/api/download-photo` | `{ ok, links:[…] }` — image stills |
| `/api/post-detail` | full post metadata |
| `/api/user-info` | public profile by username |
| `/api/health` | GET status |

## Deploy to Cloudflare (production)

```bash
# Backend (Workers)
cd backend
npx wrangler login
npx wrangler secret put TIKLIVE_API_KEY   # paste the key; removes need for the var
npx wrangler deploy

# Frontend (Pages) — build output is ../frontend
cd ../generator && node build.mjs --all
npx wrangler pages deploy ../frontend --project-name=tiktmeta
```

Then set `window.TIKTMETA_API = 'https://<worker>.workers.dev'` on the Pages
project (or add a `_redirects`/Pages Function mapping `/api/*` to the Worker).

## Notes

- Each successful upstream request costs 1 TikLive credit; standard limit is
  200 req/min per key. Responses are cached 5 min when a KV `CACHE` binding exists.
- Only public TikTok posts are supported. Private/deleted content returns an error.
- The TikLive key is committed in `wrangler.toml` for convenience; rotate it and
  move it to a Worker secret before any public production use.