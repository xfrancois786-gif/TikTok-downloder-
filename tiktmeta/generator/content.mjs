// content.mjs — per-locale content with English fallback + per-item rich content.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOOLS, BLOG } from './data.mjs';

const DIR = dirname(fileURLToPath(import.meta.url));
const cache = new Map();

function load(code) {
  if (cache.has(code)) return cache.get(code);
  let data = {};
  try {
    data = JSON.parse(readFileSync(join(DIR, 'content', `${code}.json`), 'utf8'));
  } catch {
    data = {};
  }
  cache.set(code, data);
  return data;
}

// Merge all per-item files content/items/<prefix>*.json -> { tools, blog }.
function loadItems(prefix) {
  const out = { tools: {}, blog: {} };
  try {
    const dir = join(DIR, 'content', 'items');
    for (const f of readdirSync(dir).filter((x) => x.startsWith(prefix) && x.endsWith('.json'))) {
      const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      Object.assign(out.tools, d.tools || {});
      Object.assign(out.blog, d.blog || {});
    }
  } catch {
    /* no items yet */
  }
  return out;
}

function deepMerge(base, over) {
  if (Array.isArray(base)) return Array.isArray(over) ? over : base;
  if (base && typeof base === 'object') {
    const out = { ...base };
    for (const k of Object.keys(over || {})) out[k] = deepMerge(base[k], over[k]);
    return out;
  }
  return over === undefined ? base : over;
}

const BASE = load('en');
const ITEMS_EN = loadItems('en-');

export function getContent(locale) {
  if (locale === 'en') return deepMerge(BASE, ITEMS_EN);
  return deepMerge(BASE, load(locale));
}

export function localizedTools(locale) {
  const c = getContent(locale);
  const titles = c.toolTitles || {};
  return TOOLS.map((t) => {
    const title = titles[t.slug] || t.title;
    return { ...t, title, h1: title };
  });
}

export function localizedBlog(locale) {
  const c = getContent(locale);
  const titles = c.blogTitles || {};
  return BLOG.map((p) => {
    const title = titles[p.slug] || p.title;
    return { ...p, title, h1: title };
  });
}

export function fill(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}