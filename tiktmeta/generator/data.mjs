// TiktMeta catalog — single source of truth for tools, blog, pages.
// Slugs are exact (match the requested URL structure). Titles are derived.

export const CATEGORIES = {
  video: { label: 'Video', icon: '🎬' },
  converter: { label: 'Converter', icon: '🔁' },
  photo: { label: 'Photo', icon: '🖼️' },
  audio: { label: 'Audio', icon: '🎵' },
  text: { label: 'Text', icon: '📝' },
  device: { label: 'Device', icon: '📱' },
  pro: { label: 'Pro Tools', icon: '⚡' },
};

const SLUGS = {
  video: [
    'tiktok-video-downloader',
    'tiktok-hd-downloader',
    'tiktok-4k-downloader',
    'tiktok-no-watermark-downloader',
    'tiktok-watermark-remover',
    'tiktok-bulk-downloader',
    'tiktok-playlist-downloader',
    'tiktok-favorites-downloader',
    'tiktok-private-video-downloader',
    'tiktok-long-video-downloader',
    'tiktok-live-video-downloader',
    'tiktok-duet-downloader',
  ],
  converter: [
    'tiktok-to-mp4',
    'tiktok-to-mp3',
    'tiktok-to-gif',
    'tiktok-to-wav',
    'tiktok-to-webm',
    'tiktok-to-jpg',
    'tiktok-to-png',
    'tiktok-to-reels-converter',
    'tiktok-to-shorts-converter',
    'tiktok-to-whatsapp-status',
  ],
  photo: [
    'tiktok-photo-downloader',
    'tiktok-slideshow-downloader',
    'tiktok-story-downloader',
    'tiktok-live-photo-downloader',
    'tiktok-thumbnail-downloader',
    'tiktok-carousel-downloader',
    'tiktok-profile-picture-downloader',
    'tiktok-wallpaper-downloader',
  ],
  audio: [
    'tiktok-sound-downloader',
    'tiktok-music-downloader',
    'tiktok-audio-extractor',
    'tiktok-sound-as-ringtone',
    'tiktok-voice-downloader',
    'tiktok-original-sound-downloader',
    'tiktok-trending-sound-finder',
    'tiktok-podcast-downloader',
  ],
  text: [
    'tiktok-caption-downloader',
    'tiktok-transcript-generator',
    'tiktok-video-to-text',
    'tiktok-subtitle-downloader',
    'tiktok-auto-caption-generator',
    'tiktok-hashtag-generator',
    'tiktok-bio-generator',
    'tiktok-username-generator',
  ],
  device: [
    'tiktok-on-iphone',
    'tiktok-on-android',
    'tiktok-on-pc',
    'tiktok-on-mac',
    'tiktok-on-chromebook',
    'tiktok-on-ipad',
  ],
  pro: [
    'tiktok-downloader-app',
    'tiktok-downloader-api',
    'tiktok-profile-downloader',
    'tiktok-analytics-checker',
    'tiktok-follower-counter',
    'tiktok-money-calculator',
    'tiktok-video-quality-checker',
    'tiktok-video-compressor',
  ],
};

const TOKEN = {
  tiktok: 'TikTok', to: 'to', mp4: 'MP4', mp3: 'MP3', gif: 'GIF', wav: 'WAV',
  webm: 'WebM', mov: 'MOV', avi: 'AVI', mkv: 'MKV', jpg: 'JPG', png: 'PNG',
  webp: 'WebP', hd: 'HD', '4k': '4K', '8k': '8K', hdr: 'HDR', pc: 'PC',
  mac: 'Mac', iphone: 'iPhone', ipad: 'iPad', android: 'Android',
  chromebook: 'Chromebook', samsung: 'Samsung', huawei: 'Huawei',
  windows: 'Windows', linux: 'Linux', asmr: 'ASMR', api: 'API',
  reels: 'Reels', shorts: 'Shorts', whatsapp: 'WhatsApp', telegram: 'Telegram',
};

function titleize(slug) {
  return slug
    .split('-')
    .map((t) => (TOKEN[t] ? TOKEN[t] : t.charAt(0).toUpperCase() + t.slice(1)))
    .join(' ')
    .replace(/\bTiktok\b/g, 'TikTok');
}

export const TOOLS = Object.entries(SLUGS).flatMap(([category, slugs]) =>
  slugs.map((slug) => ({
    slug,
    category,
    title: titleize(slug),
    h1: titleize(slug),
  }))
);

export const TOOL_CATEGORIES = Object.keys(SLUGS);

const BLOG_GROUPS = {
  'how-to-download': [
    'how-to-download-tiktok-without-watermark',
    'how-to-download-tiktok-videos-on-iphone',
    'how-to-download-tiktok-videos-on-android',
    'how-to-download-tiktok-videos-on-pc',
    'how-to-download-tiktok-photos',
    'how-to-download-tiktok-stories',
    'how-to-download-tiktok-slideshow',
    'how-to-download-tiktok-live-photos',
    'how-to-download-tiktok-in-hd',
    'how-to-download-tiktok-in-4k',
    'how-to-convert-tiktok-to-mp3',
    'how-to-convert-tiktok-to-mp4',
    'how-to-save-tiktok-without-posting',
    'how-to-download-your-own-tiktok-videos',
    'how-to-download-private-tiktok-videos',
  ],
  guides: [
    'how-to-go-live-on-tiktok',
    'how-to-get-more-views-on-tiktok',
    'how-to-get-more-followers-on-tiktok',
    'how-to-make-money-on-tiktok',
    'how-to-use-tiktok-without-account',
    'how-to-remove-tiktok-watermark',
    'how-to-repost-tiktok-on-reels',
    'how-to-repost-tiktok-on-youtube-shorts',
    'how-to-save-tiktok-sound-as-ringtone',
    'how-to-set-tiktok-video-as-wallpaper',
    'how-to-download-tiktok-profile-picture',
    'how-to-transcribe-tiktok-video',
    'how-to-download-tiktok-captions',
    'how-to-share-tiktok-to-whatsapp-status',
    'best-time-to-post-on-tiktok',
  ],
  'legal-quality': [
    'is-it-legal-to-download-tiktok-videos',
    'is-tiktok-downloader-safe',
    'why-tiktok-download-fails',
    'what-quality-do-you-get-from-tiktok',
    'tiktok-mp4-vs-mp3-difference',
    'tiktok-hd-vs-4k-vs-hdr',
    'why-tiktok-video-has-no-sound-after-download',
    'why-tiktok-video-is-blurry-after-download',
    'can-you-download-deleted-tiktok-videos',
    'can-you-download-tiktok-without-app',
    'tiktok-downloader-vs-screen-recording',
    'best-tiktok-downloader-in-2026',
    'tiksnap-vs-tiktmeta-comparison',
    'snaptik-vs-tiktmeta-comparison',
    'tiktok-copyright-rules-you-must-know',
    'how-to-give-credit-to-tiktok-creator',
    'how-to-use-downloaded-tiktok-for-school',
    'how-to-use-downloaded-tiktok-for-business',
    'does-tiktok-notify-when-you-download',
    'how-to-download-tiktok-without-watermark-on-iphone',
  ],
};

export const BLOG = Object.entries(BLOG_GROUPS).flatMap(([category, slugs]) =>
  slugs.map((slug) => ({ slug, category, title: titleize(slug), h1: titleize(slug) }))
);

export const BLOG_CATEGORIES = Object.keys(BLOG_GROUPS);

export const PAGES = [
  { slug: 'how-to-use', key: 'howto', title: 'How to Use' },
  { slug: 'about', key: 'about', title: 'About' },
  { slug: 'contact', key: 'contact', title: 'Contact' },
  { slug: 'faq', key: 'faq', title: 'FAQ' },
  { slug: 'privacy-policy', key: 'privacy', title: 'Privacy Policy' },
  { slug: 'terms-of-service', key: 'terms', title: 'Terms of Service' },
  { slug: 'dmca', key: 'dmca', title: 'DMCA' },
  { slug: 'cookie-policy', key: 'cookies', title: 'Cookie Policy' },
];

// 1 home + 1 tools index + 100 tools + 1 blog index + 50 blog + 8 pages = 161
export const COUNTS = {
  tools: TOOLS.length,
  blog: BLOG.length,
  pages: PAGES.length,
};