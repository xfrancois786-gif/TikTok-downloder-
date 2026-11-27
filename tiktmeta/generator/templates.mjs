// TiktMeta HTML templates (content-driven, per-locale with English fallback).
import { TOOL_CATEGORIES } from './data.mjs';
import { CATEGORIES } from './data.mjs';
import { LOCALES, DEFAULT_LOCALE, lp, RTL } from './i18n.mjs';
import { getContent, localizedTools, localizedBlog, fill } from './content.mjs';
import { MIN_CSS } from './assets.mjs';
import { icon, CATEGORY_ICON } from './icons.mjs';

const SITE = 'TiktMeta';
const DOMAIN = 'https://tiktmeta.com';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ORG_LD = { '@context': 'https://schema.org', '@type': 'Organization', name: SITE, url: DOMAIN + '/', logo: DOMAIN + '/assets/img/logo.svg' };
const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE,
  url: DOMAIN + '/',
  potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: DOMAIN + '/tools?q={search_term_string}' }, 'query-input': 'required name=search_term_string' },
};

function crumbLd(locale, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: DOMAIN + lp(locale, it.route) })),
  };
}

function head({ title, description, locale, route, jsonLd }) {
  const canonical = DOMAIN + lp(locale, route === '/' ? '/' : route);
  const hreflangs = LOCALES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${DOMAIN + lp(l.code, route)}" />`).join('\n    ');
  const graph = [ORG_LD, WEBSITE_LD, ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])];
  const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  return `<!doctype html>
<html lang="${locale}" dir="${RTL.has(locale) ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} — ${SITE}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="author" content="${SITE}" />
  <link rel="canonical" href="${canonical}" />
  ${hreflangs}
  <link rel="alternate" hreflang="x-default" href="${DOMAIN + lp(DEFAULT_LOCALE, route)}" />
  <meta property="og:site_name" content="${SITE}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${DOMAIN}/assets/img/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${DOMAIN}/assets/img/og-image.jpg" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="alternate" type="application/rss+xml" title="${SITE} Blog" href="${DOMAIN}/feed.xml" />
  <script>(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();</script>
  <style>${MIN_CSS}</style>
  ${ld}
</head>`;
}

function header(locale, route) {
  const ui = getContent(locale).ui;
  const labels = getContent(locale).categoryLabels;
  const home = lp(locale, '/');
  const nav = [
    ['home', '/'],
    ['tools', '/tools'],
    ['blog', '/blog'],
    ['howto', '/pages/how-to-use'],
    ['about', '/pages/about'],
    ['contact', '/pages/contact'],
    ['faq', '/pages/faq'],
  ];
  const items = nav
    .map(([key, r]) => {
      const label = ui.nav[key] || key;
      if (key === 'tools')
        return `<details class="nav-drop"><summary class="nav-link">${label}</summary><div class="nav-drop-menu"><a href="${lp(locale, '/tools')}">${ui.common.tools}</a>${TOOL_CATEGORIES.map((c) => `<a href="${lp(locale, '/tools')}#${c}">${labels[c]}</a>`).join('')}</div></details>`;
      return `<a class="nav-link" href="${lp(locale, r)}">${label}</a>`;
    })
    .join('\n        ');
  const langs = LOCALES.map((l) => `<a href="${lp(l.code, route)}" hreflang="${l.code}" class="lang-option${l.code === locale ? ' selected' : ''}" data-name="${esc((l.label + ' ' + l.code).toLowerCase())}">${l.label}${l.code === locale ? icon('check', 16, 'ico') : ''}</a>`).join('\n          ');
  const currentLabel = LOCALES.find((l) => l.code === locale)?.label || locale;
  return `<header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="${home}"><span class="brand-mark ico-wrap">${icon('download', 22, 'ico')}</span><span class="brand-name">${SITE}</span></a>
    <nav class="nav" aria-label="Main">
        ${items}
    </nav>
    <button type="button" class="theme-toggle" data-theme-toggle aria-label="Toggle light/dark">${icon('sun', 18, 'ico theme-light-icon')}${icon('moon', 18, 'ico theme-dark-icon')}</button>
    <button type="button" class="lang-toggle" data-lang-open aria-haspopup="dialog" aria-label="${ui.common.language}">${icon('globe', 16, 'ico')}<span>${currentLabel}</span>${icon('chevron-down', 14, 'ico')}</button>
  </div></header>
  <div class="lang-modal" data-lang-modal hidden>
    <div class="lang-backdrop" data-lang-close></div>
    <div class="lang-panel" role="dialog" aria-modal="true" aria-label="${ui.common.language}">
      <div class="lang-head"><strong>${ui.common.language}</strong><button type="button" class="lang-x" data-lang-close aria-label="Close">${icon('x', 18, 'ico')}</button></div>
      <input class="lang-search" type="search" placeholder="${ui.common.searchLanguage}" data-lang-search autocomplete="off" />
      <div class="lang-grid">
          ${langs}
      </div>
    </div>
  </div>`;
}

function footer(locale) {
  const c = getContent(locale);
  const ui = c.ui;
  const tools = localizedTools(locale);
  const toolsCol = (cat) =>
    `<div class="footer-col"><h4>${icon(CATEGORY_ICON[cat], 16, 'ico')} ${c.categoryLabels[cat]}</h4>${tools.filter((t) => t.category === cat).map((t) => `<a href="${lp(locale, '/tools/' + cat + '/' + t.slug)}">${esc(t.title)}</a>`).join('')}</div>`;
  const cols = TOOL_CATEGORIES.map(toolsCol).join('\n        ');
  return `<footer class="site-footer"><div class="wrap footer-grid">
        <div class="footer-col footer-about">
          <div class="brand"><span class="brand-mark ico-wrap">${icon('download', 22, 'ico')}</span><span class="brand-name">${SITE}</span></div>
          <p class="muted">${ui.footer.tagline}</p>
          <div class="badges"><span class="badge">${icon('shield', 14, 'ico')}${ui.common.safePrivate}</span><span class="badge">${icon('user-check', 14, 'ico')}${ui.common.noReg}</span></div>
          <p class="fineprint">${SITE} ${ui.common.independent}</p>
        </div>
        <div class="footer-col"><h4>${ui.common.quickLinks}</h4>
          <a href="${lp(locale, '/pages/how-to-use')}">${ui.nav.howto}</a>
          <a href="${lp(locale, '/pages/about')}">${ui.nav.about}</a>
          <a href="${lp(locale, '/pages/contact')}">${ui.nav.contact}</a>
          <a href="${lp(locale, '/pages/faq')}">${ui.nav.faq}</a>
        </div>
        <div class="footer-col"><h4>${ui.common.legal}</h4>
          <a href="${lp(locale, '/pages/terms-of-service')}">Terms of Service</a>
          <a href="${lp(locale, '/pages/privacy-policy')}">Privacy Policy</a>
          <a href="${lp(locale, '/pages/dmca')}">DMCA</a>
          <a href="${lp(locale, '/pages/cookie-policy')}">Cookie Policy</a>
        </div>
        ${cols}
      </div>
      <div class="wrap footer-bottom">
        <p class="fineprint">© 2026 ${SITE}. ${ui.common.rights}</p>
        <p class="fineprint">${ui.common.freeForever}</p>
        <p class="fineprint">${ui.common.madeWith} ${icon('heart', 14, 'ico heart')} in the Dominican Republic</p>
      </div>
    </footer>`;
}

function form(locale) {
  const ui = getContent(locale).ui;
  return `<form id="dl" class="dl-form" data-locale="${locale}">
    <input type="text" id="url" name="url" placeholder="${ui.common.paste}" autocomplete="off" required />
    <button type="submit" class="dl-btn">${icon('search', 18, 'ico')}${ui.common.search}</button>
  </form>
  <div id="result" class="dl-result" hidden></div>`;
}

function shell({ title, description, locale, route, jsonLd, body, script = true }) {
  return `${head({ title, description, locale, route, jsonLd })}
<body>
  ${header(locale, route)}
  <main class="wrap main">
    ${body}
  </main>
  ${footer(locale)}
  <script src="/assets/js/main.js" defer></script>
  ${script ? '<script src="/assets/js/downloader.js" defer></script>' : ''}
</body>
</html>`;
}

// ---- pages ----
export function home(locale) {
  const c = getContent(locale);
  const ui = c.ui;
  const tools = localizedTools(locale);
  const home = c.home || {};
  const ld = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: SITE, applicationCategory: 'MultimediaApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: ui.hero.subtitle };
  const steps = c.catCopy.video.steps;
  const features = (home.features || [])
    .map((f) => `<div class="card feature-card"><span class="feature-ico ico-wrap">${icon(f.icon, 22, 'ico')}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`)
    .join('\n      ');
  const guide = home.guide || { sections: [] };
  const faq = home.faq || { items: [] };
  const faqLd = faq.items.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) }
    : null;
  const body = `
  <section class="hero">
    <h1>${esc(ui.hero.title)}</h1>
    <p>${esc(ui.hero.subtitle)}</p>
    ${form(locale)}
  </section>
  <section class="section"><h2>${ui.steps.title}</h2><p class="lead">${ui.steps.lead}</p>
    <div class="grid grid-3">${steps.map((s, i) => `<div class="card"><span class="step-num">${i + 1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join('')}</div>
  </section>
  ${features ? `<section class="section"><h2>${esc(home.featuresTitle || ui.common.whyChoose || 'Why choose ' + SITE)}</h2>
    <div class="grid grid-3">${features}</div>
  </section>` : ''}
  ${guide.sections.length ? `<article class="post-body section"><h2>${esc(guide.title)}</h2>${guide.lead ? `<p class="lead">${esc(guide.lead)}</p>` : ''}${guide.sections.map((s) => `<h3>${esc(s.h)}</h3><p>${esc(s.p)}</p>`).join('\n    ')}</article>` : ''}
  ${home.responsible ? `<section class="section"><div class="card"><p class="muted">${esc(home.responsible)}</p></div></section>` : ''}
  ${faq.items.length ? `<section class="section"><h2>${esc(faq.title)}</h2>${faq.lead ? `<p class="lead">${esc(faq.lead)}</p>` : ''}${faq.items.map((f) => `<details class="faq-item"><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}</section>` : ''}
  <section class="section"><h2>${ui.common.otherTools}</h2><p class="lead">${ui.common.otherToolsLead}</p>
    <div class="grid tool-grid">${tools.map((x) => `<a class="card tool-card" href="${lp(locale, '/tools/' + x.category + '/' + x.slug)}"><h3>${esc(x.title)}</h3><span class="go">${ui.common.open} ${icon('arrow-right', 16, 'ico')}</span></a>`).join('')}</div>
  </section>
  <section class="section"><div class="card cta"><h2 style="margin-top:0">${ui.cta.title}</h2><p class="muted">${ui.cta.text}</p><p><a class="dl-btn" href="#dl">${ui.common.getStarted}</a></p></div></section>`;
  return shell({ title: ui.hero.title, description: ui.hero.subtitle, locale, route: '/', jsonLd: faqLd ? [ld, faqLd] : ld, body });
}

export function toolsIndex(locale) {
  const c = getContent(locale);
  const ui = c.ui;
  const tools = localizedTools(locale);
  const ld = [
    crumbLd(locale, [{ name: ui.nav.home, route: '/' }, { name: ui.nav.tools, route: '/tools' }]),
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: tools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.title, url: DOMAIN + lp(locale, `/tools/${t.category}/${t.slug}`) })) },
  ];
  const body = `
  <section class="section"><h1>${ui.nav.tools}</h1><p class="lead">${ui.common.otherToolsLead}</p></section>
  ${TOOL_CATEGORIES.map((cat) => `<section class="section" id="${cat}"><h2>${icon(CATEGORY_ICON[cat], 22, 'ico')} ${c.categoryLabels[cat]}</h2>
    <div class="grid tool-grid">${tools.filter((t) => t.category === cat).map((t) => `<a class="card tool-card" href="${lp(locale, '/tools/' + cat + '/' + t.slug)}"><h3>${esc(t.title)}</h3><span class="go">${ui.common.open} ${icon('arrow-right', 16, 'ico')}</span></a>`).join('')}</div></section>`).join('\n  ')}`;
  return shell({ title: ui.nav.tools, description: ui.common.otherToolsLead, locale, route: '/tools', jsonLd: ld, body, script: false });
}

export function toolPage(locale, tool) {
  const c = getContent(locale);
  const ui = c.ui;
  const copy = c.catCopy[tool.category];
  const item = (c.tools && c.tools[tool.slug]) || null;
  const h1 = item?.h1 || tool.h1;
  const intro = item?.intro || fill(copy.intro, { t: tool.title });
  const steps = item?.steps || copy.steps;
  const faqs = item?.faqs || c.toolFaq.map((f) => [fill(f[0], { t: tool.title }), f[1]]);
  const sections = item?.sections || [];
  const ld = [
    crumbLd(locale, [{ name: ui.nav.home, route: '/' }, { name: ui.nav.tools, route: '/tools' }, { name: tool.title, route: `/tools/${tool.category}/${tool.slug}` }]),
    { '@context': 'https://schema.org', '@type': 'WebPage', name: tool.title, description: intro },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) },
    ...(tool.category === 'device' ? [{ '@context': 'https://schema.org', '@type': 'HowTo', name: tool.title, step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s[0], text: s[1] })) }] : []),
  ];
  const tp = c.toolPage || {};
  const featStrip = (tp.features || [])
    .map((f) => `<div class="mini-feat"><span class="ico-wrap">${icon(f.icon, 18, 'ico')}</span><span><strong>${esc(f.label)}</strong><small>${esc(f.text)}</small></span></div>`)
    .join('');
  const compat = tp.compat
    ? `<section class="section"><h2>${esc(tp.compat.title)}</h2>${tp.compat.lead ? `<p class="lead">${esc(tp.compat.lead)}</p>` : ''}<div class="compat-grid">${(tp.compat.items || []).map((it) => `<div class="compat-item"><strong>${esc(it[0])}</strong><span>${esc(it[1])}</span></div>`).join('')}</div></section>`
    : '';
  const responsible = tp.responsible
    ? `<section class="section"><div class="card"><h3 style="margin-top:0">${esc(ui.common.responsibleUse || 'Responsible Use')}</h3><p class="muted">${esc(tp.responsible)}</p></div></section>`
    : '';
  const body = `
  <div class="crumbs"><a href="${lp(locale, '/')}">${ui.nav.home}</a> / <a href="${lp(locale, '/tools')}">${ui.nav.tools}</a> / ${esc(tool.title)}</div>
  <section class="hero tool-hero">
    <h1>${esc(h1)}</h1>
    <p>${esc(intro)}</p>
    ${form(locale)}
    ${featStrip ? `<div class="feature-strip">${featStrip}</div>` : ''}
  </section>
  <section class="section"><h2>${ui.steps.title}</h2><div class="grid grid-3">
    ${steps.map((s, i) => `<div class="card"><span class="step-num">${i + 1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join('')}
  </div></section>
  ${sections.length ? `<article class="post-body section">${sections.map((s) => `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`).join('\n    ')}</article>` : ''}
  ${compat}
  ${responsible}
  <section class="section"><h2>${ui.nav.faq}</h2>${faqs.map((f) => `<details class="faq-item"><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}</section>
  <section class="section"><h2>${ui.common.otherTools}</h2><p class="lead">${ui.common.otherToolsLead}</p>
    <div class="grid tool-grid">${localizedTools(locale).filter((t) => t.category === tool.category && t.slug !== tool.slug).map((t) => `<a class="card tool-card" href="${lp(locale, '/tools/' + t.category + '/' + t.slug)}"><h3>${esc(t.title)}</h3><span class="go">${ui.common.open} ${icon('arrow-right', 16, 'ico')}</span></a>`).join('')}</div>
  </section>
  <section class="section"><div class="card cta"><h2 style="margin-top:0">${esc(ui.cta.title)}</h2><p class="muted">${esc(ui.cta.text)}</p><p><a class="dl-btn" href="#dl">${esc(ui.common.getStarted)}</a></p></div></section>`;
  return shell({ title: tool.title, description: intro, locale, route: `/tools/${tool.category}/${tool.slug}`, jsonLd: ld, body });
}

export function blogIndex(locale) {
  const c = getContent(locale);
  const ui = c.ui;
  const blog = localizedBlog(locale);
  const ld = [
    crumbLd(locale, [{ name: ui.nav.home, route: '/' }, { name: ui.nav.blog, route: '/blog' }]),
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: blog.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: DOMAIN + lp(locale, `/blog/${p.category}/${p.slug}`) })) },
  ];
  const body = `
  <section class="section"><h1>${ui.nav.blog}</h1><p class="lead">${ui.common.otherToolsLead}</p></section>
  ${[...new Set(blog.map((p) => p.category))].map((cat) => `<section class="section"><h2>${cat.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())}</h2>
    <div class="grid post-grid">${blog.filter((p) => p.category === cat).map((p) => `<a class="card post-card" href="${lp(locale, '/blog/' + cat + '/' + p.slug)}"><h3>${esc(p.title)}</h3></a>`).join('')}</div></section>`).join('\n  ')}`;
  return shell({ title: ui.nav.blog, description: ui.common.otherToolsLead, locale, route: '/blog', jsonLd: ld, body, script: false });
}

export function blogPost(locale, post) {
  const c = getContent(locale);
  const ui = c.ui;
  const bb = c.blogBody;
  const item = (c.blog && c.blog[post.slug]) || null;
  const h1 = item?.h1 || post.h1;
  const intro = item?.intro || fill(bb.intro, { t: post.title });
  const sections = item?.sections || bb.sections.map((s) => ({ h: fill(s[0], { t: post.title }), p: fill(s[1], { t: post.title }) }));
  const faqs = item?.faqs || [];
  const ld = [
    crumbLd(locale, [{ name: ui.nav.home, route: '/' }, { name: ui.nav.blog, route: '/blog' }, { name: post.title, route: `/blog/${post.category}/${post.slug}` }]),
    { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: intro, datePublished: '2026-01-01', dateModified: '2026-11-27', author: { '@type': 'Organization', name: SITE } },
  ];
  const body = `
  <div class="crumbs"><a href="${lp(locale, '/')}">${ui.nav.home}</a> / <a href="${lp(locale, '/blog')}">${ui.nav.blog}</a> / ${esc(post.title)}</div>
  <article class="post-body">
    <h1>${esc(h1)}</h1>
    <p class="post-meta">${bb.by} ${SITE} · ${bb.updated}</p>
    <p class="lead">${esc(intro)}</p>
    ${sections.map((s) => `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`).join('\n    ')}
    ${faqs.length ? `<h2>${ui.nav.faq}</h2>${faqs.map((f) => `<details class="faq-item"><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}` : ''}
  </article>`;
  return shell({ title: post.title, description: intro, locale, route: `/blog/${post.category}/${post.slug}`, jsonLd: ld, body, script: false });
}

export function infoPage(locale, page) {
  const c = getContent(locale);
  const ui = c.ui;
  const navMap = { howto: ui.nav.howto, about: ui.nav.about, contact: ui.nav.contact, faq: ui.nav.faq };
  const bodyKeyMap = { privacy: 'privacy-policy', terms: 'terms-of-service', cookies: 'cookie-policy' };
  const b = c.pageBody[bodyKeyMap[page.key] || page.key] || { intro: '', sections: [] };
  const intro = fill(b.intro, { site: SITE });
  const title = navMap[page.key] || page.title;
  const crumb = crumbLd(locale, [{ name: ui.nav.home, route: '/' }, { name: title, route: `/pages/${page.slug}` }]);
  const base = { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: intro };
  // Normalize a section (array [h, p] or object {h, p, steps, tip}) to a common shape.
  const norm = (s) => (Array.isArray(s) ? { h: s[0], p: s[1] } : { h: s.h, p: s.p, steps: s.steps, tip: s.tip });
  const sections = (b.sections || []).map(norm);
  const groups = b.groups || null;
  const pageFaqs = groups ? groups.flatMap((g) => g.items || []) : b.faqs || (page.key === 'faq' ? c.faqPage : null);
  let extra = [];
  if (page.key === 'howto') {
    extra = [{ '@context': 'https://schema.org', '@type': 'HowTo', name: title, step: sections.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.h, text: fill(s.p || '', { site: SITE }) })) }];
  }
  if (pageFaqs && pageFaqs.length) {
    extra.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pageFaqs.map((f) => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) });
  }
  const ld = [crumb, base, ...extra];
  const stats = (b.stats || [])
    .map((s) => `<div class="stat"><span class="stat-value">${esc(s.value)}</span><span class="stat-label">${esc(s.label)}</span></div>`)
    .join('');
  const features = (b.features || [])
    .map((f) => `<div class="card feature-card"><span class="feature-ico ico-wrap">${icon(f.icon, 22, 'ico')}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`)
    .join('\n      ');
  const cta = b.cta
    ? `<section class="section"><div class="card cta"><h2 style="margin-top:0">${esc(b.cta.title)}</h2><p class="muted">${esc(b.cta.text)}</p><p><a class="dl-btn" href="${lp(locale, '/')}">${esc(b.cta.label || ui.common.getStarted)}</a></p></div></section>`
    : '';
  const body = `
  <div class="crumbs"><a href="${lp(locale, '/')}">${ui.nav.home}</a> / ${esc(title)}</div>
  <article class="post-body">
    <h1>${esc(title)}</h1>
    ${b.subtitle ? `<p class="page-sub">${esc(fill(b.subtitle, { site: SITE }))}</p>` : ''}
    <p class="lead">${esc(intro)}</p>
    ${stats ? `<div class="stats-row">${stats}</div>` : ''}
    ${sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p ? `<p>${esc(fill(s.p, { site: SITE }))}</p>` : ''}${s.steps && s.steps.length ? `<ol class="steps-list">${s.steps.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}${s.tip ? `<p class="tip">${esc(fill(s.tip, { site: SITE }))}</p>` : ''}`).join('\n    ')}
    ${pageFaqs && pageFaqs.length && page.key !== 'faq' ? `<h2>${ui.nav.faq}</h2>${pageFaqs.map((f) => `<details class="faq-item"><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}` : ''}
  </article>
  ${groups ? groups.map((g) => `<section class="section faq-group"><h2>${esc(g.title)}</h2>${g.desc ? `<p class="lead">${esc(g.desc)}</p>` : ''}${g.items.map((f) => `<details class="faq-item"><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}</section>`).join('\n  ') : ''}
  ${b.responsible ? `<section class="section"><div class="card"><p class="muted">${esc(fill(b.responsible, { site: SITE }))}</p></div></section>` : ''}
  ${features ? `<section class="section">${b.featuresTitle ? `<h2>${esc(b.featuresTitle)}</h2>` : ''}<div class="grid grid-3">${features}</div></section>` : ''}
  ${cta}`;
  return shell({ title, description: intro, locale, route: `/pages/${page.slug}`, jsonLd: ld, body, script: false });
}

export function notFound(locale = DEFAULT_LOCALE) {
  const c = getContent(locale);
  const ui = c.ui;
  const nf = ui.notFound;
  const body = `
  <section class="hero">
    <h1>${esc(nf.title)}</h1>
    <p>${esc(nf.text)}</p>
    <p><a class="dl-btn" href="${lp(locale, '/')}">${nf.back}</a></p>
  </section>
  <section class="section"><h2>${nf.popular}</h2>
    <div class="grid tool-grid">${localizedTools(locale).slice(0, 12).map((t) => `<a class="card tool-card" href="${lp(locale, '/tools/' + t.category + '/' + t.slug)}"><h3>${esc(t.title)}</h3><span class="go">${ui.common.open} ${icon('arrow-right', 16, 'ico')}</span></a>`).join('')}</div>
  </section>`;
  return shell({ title: nf.title, description: nf.text, locale, route: '/', jsonLd: null, body, script: false });
}