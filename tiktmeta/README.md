# TiktMeta

Free TikTok downloader — static frontend on Cloudflare Pages + API-only backend on Cloudflare Workers.

## Structure

```
tiktmeta/
├── frontend/   -> Cloudflare Pages (FREE) — plain static HTML/CSS/JS
├── backend/    -> Cloudflare Workers (FREE) — API only, no media bandwidth
└── generator/  -> Node build scripts (templates + per-locale content)
```

## Build the frontend

```bash
cd generator
npm install        # no deps required, pure Node
node build.mjs     # writes ../frontend
```

English is generated fully first. To add a locale, drop `generator/content/<code>/`
(copy `en`, translate the JSON) and add the code to `LOCALES` in `generator/i18n.mjs`.

## Deploy

- **Frontend:** Cloudflare Pages -> build command `node generator/build.mjs`, output dir `frontend`.
- **Backend:** `cd backend && npx wrangler deploy` (set `DOWNLOAD_API_URL` in `.dev.vars` / dashboard).

## Backend API

`POST https://api.tiktmeta.com/api/download-video` with `{ "url": "https://..." }`.
No video data flows through Cloudflare — the backend only resolves and returns links.