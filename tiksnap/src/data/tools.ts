/**
 * Tool catalog — locale-agnostic. Each tool has a stable slug (used in the URL)
 * and an icon. Localized title/description live in content/<locale>/tools.json
 * keyed by slug. Add a tool here + its copy in each locale = new page everywhere.
 */
export interface ToolDef {
  slug: string;
  icon: string; // lucide-style name hint (informational)
  /** Primary keyword for SEO, per-locale override in tools.json */
  h1: string;
}

export const TOOLS: ToolDef[] = [
  { slug: 'quitar-marca-de-agua-tiktok', icon: 'eraser', h1: 'Remove TikTok Watermark' },
  { slug: 'descargar-fotos-tiktok', icon: 'image', h1: 'Download TikTok Photos' },
  { slug: 'descargar-tiktok-hd', icon: 'sparkles', h1: 'Download TikTok in HD' },
  { slug: 'descargar-tiktok-hdr', icon: 'sun', h1: 'Download TikTok in HDR' },
  { slug: 'descargar-audio-tiktok', icon: 'music', h1: 'Download TikTok Audio' },
  { slug: 'descargar-live-photo-tiktok', icon: 'aperture', h1: 'Download TikTok Live Photo' },
  { slug: 'descargar-historias-tiktok', icon: 'circle-dot', h1: 'Download TikTok Stories' },
  { slug: 'descargar-carrusel-tiktok', icon: 'layers', h1: 'Download TikTok Carousel' },
  { slug: 'descargar-tiktok-iphone', icon: 'smartphone', h1: 'Download TikTok on iPhone' },
  { slug: 'descargar-tiktok-android', icon: 'tablet', h1: 'Download TikTok on Android' },
  { slug: 'descargar-tiktok-pc', icon: 'monitor', h1: 'Download TikTok on PC' },
  { slug: 'tiktok-a-mp4', icon: 'file-video', h1: 'TikTok to MP4' },
  { slug: 'descargar-tiktok-sin-marca-de-agua-app', icon: 'download', h1: 'TikTok Downloader App' },
  { slug: 'transcribir-video-tiktok', icon: 'captions', h1: 'Transcribe TikTok Video' },
  { slug: 'ver-foto-de-perfil-tiktok', icon: 'user', h1: 'View TikTok Profile Photo' },
  { slug: 'tono-de-llamada-tiktok', icon: 'bell', h1: 'TikTok Ringtone' },
  { slug: 'poner-tiktok-de-fondo-de-pantalla', icon: 'wallpaper', h1: 'TikTok Wallpaper' },
  { slug: 'tiktok-estado-de-whatsapp', icon: 'message-circle', h1: 'TikTok to WhatsApp Status' },
  { slug: 'descargar-tiktok-4k', icon: 'sparkles', h1: 'Download TikTok in 4K' },
  { slug: 'tiktok-a-gif', icon: 'image', h1: 'TikTok to GIF' },
  { slug: 'descargar-miniatura-tiktok', icon: 'image', h1: 'TikTok Thumbnail Downloader' },
  { slug: 'descargar-sonido-tiktok', icon: 'music', h1: 'TikTok Sound Downloader' },
  { slug: 'descargar-tiktok-mac', icon: 'laptop', h1: 'Download TikTok on Mac' },
  { slug: 'descargar-tiktok-chromebook', icon: 'monitor', h1: 'Download TikTok on Chromebook' },
  { slug: 'tiktok-a-instagram', icon: 'instagram', h1: 'TikTok to Instagram Reels' },
  { slug: 'tiktok-a-discord', icon: 'message-square', h1: 'TikTok to Discord' },
  { slug: 'recortar-tiktok', icon: 'scissors', h1: 'TikTok Video Cutter' },
  { slug: 'ampliar-foto-perfil-tiktok', icon: 'zoom-in', h1: 'TikTok Profile Picture Zoom' },
  { slug: 'descargar-tiktok-sin-anuncios', icon: 'shield', h1: 'TikTok Downloader No Ads' },
];

/** Static info/legal pages (locale-agnostic slugs). */
export const INFO_PAGES = [
  { slug: 'como-usar', key: 'howto' },
  { slug: 'preguntas-frecuentes', key: 'faq' },
  { slug: 'acerca-de', key: 'about' },
  { slug: 'contacto', key: 'contact' },
  { slug: 'terminos', key: 'terms' },
  { slug: 'privacidad', key: 'privacy' },
  { slug: 'dmca', key: 'dmca' },
  { slug: 'politica-de-cookies', key: 'cookies' },
] as const;