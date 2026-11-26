/**
 * Content loader — reads per-locale JSON from src/content/<locale>/.
 * Falls back to English if a locale file is missing, so adding a language is
 * incremental (translate file by file) without breaking the build.
 */
import { DEFAULT_LOCALE } from './i18n';

const modules = import.meta.glob('../content/*/*.json', { eager: true }) as Record<
  string,
  unknown
>;

function unwrap<T>(mod: unknown): T | undefined {
  if (mod == null) return undefined;
  if (typeof mod === 'object' && 'default' in (mod as Record<string, unknown>)) {
    return (mod as { default: T }).default;
  }
  return mod as T;
}

function load<T>(locale: string, file: string, fallback: T): T {
  const hit = unwrap<T>(modules[`../content/${locale}/${file}`]);
  if (hit != null) return hit;
  const en = unwrap<T>(modules[`../content/${DEFAULT_LOCALE}/${file}`]);
  return en ?? fallback;
}

export interface UiContent {
  nav: Record<string, string>;
  common: Record<string, string>;
  hero: { title: string; subtitle: string; placeholder: string; invalid: string; hd: string };
  features: { title: string; text: string }[];
  footer: { tagline: string };
}

export interface ToolContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export interface InfoContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body?: string;
  steps?: { title: string; text: string }[];
  faqs?: { q: string; a: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  intro: string;
  sections: { h: string; p: string }[];
}

export interface HowtoContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  stats: { value: string; label: string }[];
  stepsTitle: string;
  stepsLead: string;
  steps: { title: string; text: string }[];
  devicesTitle: string;
  devicesLead: string;
  devices: { name: string; steps: string[]; tip: string }[];
  featuresTitle: string;
  features: { title: string; text: string }[];
  formatsTitle: string;
  formats: { title: string; text: string }[];
  resolutionTitle: string;
  resolution: string;
  troubleTitle: string;
  troubleshooting: { q: string; a: string }[];
  faqTitle: string;
  faqLead: string;
  faqs: { q: string; a: string }[];
}

export const getUi = (locale: string) => load<UiContent>(locale, 'ui.json', {} as UiContent);
export const getTools = (locale: string) =>
  load<Record<string, ToolContent>>(locale, 'tools.json', {});
export const getPages = (locale: string) => load<InfoContent[]>(locale, 'pages.json', []);
export const getBlog = (locale: string) => load<BlogPost[]>(locale, 'blog.json', []);
export const getHowto = (locale: string) =>
  load<Record<string, HowtoContent>>(locale, 'howto.json', {});

export interface FaqContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  categories: { name: string; blurb: string; faqs: { q: string; a: string }[] }[];
}

export const getFaq = (locale: string) =>
  load<FaqContent | null>(locale, 'faq.json', null);