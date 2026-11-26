/** Global site config (locale-agnostic). */
export const SITE = {
  name: 'TiktoMate',
  // overridden at build by SITE_URL in astro.config / wrangler
  url: 'https://example.com',
  tagline: 'Download TikTok without watermark — original quality, free.',
  description:
    'Free TikTok video downloader. Save videos without watermark in original quality, plus photos, audio MP3, stories and more. No signup, no app.',
  author: 'TiktoMate',
  localeDefault: 'en',
  socials: {
    x: 'https://x.com/',
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
  },
  contactEmail: 'support@example.com',
} as const;

/** Top navigation (locale-agnostic keys; labels come from locale ui.json). */
export const NAV = [
  { key: 'home', route: '/' },
  { key: 'tools', route: '/tools' },
  { key: 'blog', route: '/blog' },
  { key: 'faq', route: '/faq' },
  { key: 'about', route: '/about' },
  { key: 'contact', route: '/contact' },
] as const;