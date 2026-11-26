/**
 * i18n engine — single source of truth for locales.
 *
 * Currently ONE locale (en) at the root. To scale to 30 languages you only:
 *   1. add an entry to LOCALES
 *   2. add src/content/<locale>/ data files (copy en, translate strings)
 * No template changes required. hreflang, canonical, sitemaps and the language
 * switcher are all generated from this list.
 */

export interface Locale {
  /** BCP-47 code used in <html lang> and hreflang. */
  code: string;
  /** Native name shown in the switcher. */
  label: string;
  /** Subfolder prefix. Empty string = default locale at root. */
  path: string;
  /** English name for internal reference. */
  name: string;
}

// Default locale MUST be first and have path: '' (served at /).
export const DEFAULT_LOCALE = 'en';

export const LOCALES: Locale[] = [
  { code: 'en', label: 'English', path: '', name: 'English' },
  { code: 'es', label: 'Español', path: '/es', name: 'Spanish' },
  { code: 'pt', label: 'Português', path: '/pt', name: 'Portuguese' },
  { code: 'fr', label: 'Français', path: '/fr', name: 'French' },
  { code: 'de', label: 'Deutsch', path: '/de', name: 'German' },
  { code: 'it', label: 'Italiano', path: '/it', name: 'Italian' },
  { code: 'id', label: 'Bahasa Indonesia', path: '/id', name: 'Indonesian' },
  { code: 'tr', label: 'Türkçe', path: '/tr', name: 'Turkish' },
  { code: 'ar', label: 'العربية', path: '/ar', name: 'Arabic' },
  { code: 'ja', label: '日本語', path: '/ja', name: 'Japanese' },
];

/** Locales as Astro route params (locale code always present). */
export function localeParams(): { locale: string }[] {
  return LOCALES.map((l) => ({ locale: l.code }));
}

export function localeFor(code: string): Locale | undefined {
  return LOCALES.find((l) => l.code === code);
}

/** Build the on-site path for a locale + a locale-agnostic route (e.g. "/tools"). */
export function localizedPath(locale: Locale, route: string): string {
  const clean = route === '/' ? '' : route.replace(/^\//, '');
  if (!locale.path) return '/' + clean;
  return `${locale.path}/${clean}`;
}

/** Absolute URL for canonical/sitemap/hreflang. */
export function absoluteUrl(site: string, locale: Locale, route: string): string {
  return new URL(localizedPath(locale, route), site).href;
}