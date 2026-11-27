// TiktMeta i18n — locales + UI strings.
// English is the default (served at root). Other locales are subfolders.

export const DEFAULT_LOCALE = 'en';

// code, native label, subfolder path ('' for default English at root)
export const LOCALES = [
  { code: 'en', label: 'English', path: '' },
  { code: 'es', label: 'Español', path: 'es' },
  { code: 'fr', label: 'Français', path: 'fr' },
  { code: 'pt', label: 'Português', path: 'pt' },
  { code: 'de', label: 'Deutsch', path: 'de' },
  { code: 'it', label: 'Italiano', path: 'it' },
  { code: 'nl', label: 'Nederlands', path: 'nl' },
  { code: 'ru', label: 'Русский', path: 'ru' },
  { code: 'uk', label: 'Українська', path: 'uk' },
  { code: 'tr', label: 'Türkçe', path: 'tr' },
  { code: 'ar', label: 'العربية', path: 'ar' },
  { code: 'hi', label: 'हिन्दी', path: 'hi' },
  { code: 'id', label: 'Bahasa Indonesia', path: 'id' },
  { code: 'ms', label: 'Bahasa Melayu', path: 'ms' },
  { code: 'th', label: 'ไทย', path: 'th' },
  { code: 'vi', label: 'Tiếng Việt', path: 'vi' },
  { code: 'tl', label: 'Tagalog', path: 'tl' },
  { code: 'ja', label: '日本語', path: 'ja' },
  { code: 'ko', label: '한국어', path: 'ko' },
  { code: 'zh', label: '中文', path: 'zh' },
  { code: 'sw', label: 'Kiswahili', path: 'sw' },
  { code: 'bn', label: 'বাংলা', path: 'bn' },
  { code: 'ta', label: 'தமிழ்', path: 'ta' },
  { code: 'te', label: 'తెలుగు', path: 'te' },
  { code: 'mr', label: 'मराठी', path: 'mr' },
  { code: 'ur', label: 'اردو', path: 'ur' },
  { code: 'fa', label: 'فارسی', path: 'fa' },
  { code: 'he', label: 'עברית', path: 'he' },
  { code: 'el', label: 'Ελληνικά', path: 'el' },
  { code: 'pl', label: 'Polski', path: 'pl' },
  { code: 'cs', label: 'Čeština', path: 'cs' },
  { code: 'ro', label: 'Română', path: 'ro' },
  { code: 'hu', label: 'Magyar', path: 'hu' },
  { code: 'sv', label: 'Svenska', path: 'sv' },
  { code: 'da', label: 'Dansk', path: 'da' },
];

export const RTL = new Set(['ar', 'ur', 'fa', 'he']);

// English UI strings (full). Other locales fall back to these until translated.
export const UI = {
  en: {
    nav: {
      home: 'Home', tools: 'Tools', blog: 'Blog', howto: 'How to Use',
      about: 'About', contact: 'Contact', faq: 'FAQ',
    },
    hero: {
      title: 'TikTok Downloader — Download Videos Without Watermark · Free',
      subtitle:
        "Paste the link and download in 3 seconds. Video in the creator's original quality, without watermark and without re-encoding — a free online TikTok saver with no sign-up and no app.",
    },
    cta: { title: 'Ready to Download?', text: 'Start downloading your favorite TikTok videos without watermark in their original quality. No registration or installation needed.', btn: 'Get Started' },
    common: {
      safePrivate: 'Safe and Private', noReg: 'No Registration Required',
      quickLinks: 'Quick Links', legal: 'Legal', tools: 'Tools',
      rights: 'All rights reserved.', freeForever: 'Download fast. Free forever.',
      independent: 'is an independent service and is not affiliated, sponsored by, or associated with TikTok or ByteDance Ltd.',
      madeWith: 'Made with', otherTools: 'More tools', otherToolsLead: 'Everything you can save from TikTok, each format with its own dedicated tool.',
      getStarted: 'Get Started', search: 'Search', paste: 'Paste a TikTok link',
      download: 'Download', open: 'Open',
    },
    footer: { tagline: 'The fastest and safest way to download TikTok videos, photos and stories without watermark. 100% free, no sign-up.' },
    steps: { title: 'Download in 3 Steps', lead: 'Three steps. It will take you less than 10 seconds.' },
  },
};

export function getUi(locale) {
  return UI[locale] || UI.en;
}

export function localePath(locale) {
  return LOCALES.find((l) => l.code === locale)?.path ?? '';
}

// Build an on-site path for a locale + locale-agnostic route (e.g. "/tools/x").
export function lp(locale, route) {
  const clean = route === '/' ? '' : route.replace(/^\//, '');
  const base = localePath(locale);
  if (!base) return '/' + clean;
  return `/${base}/${clean}`;
}