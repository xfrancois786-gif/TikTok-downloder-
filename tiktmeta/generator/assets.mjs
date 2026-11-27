export const CSS = `/* TiktMeta styles */
:root{--brand:#e11d48;--bg:#0b0b10;--card:#15151c;--text:#e8e8ef;--muted:#9a9aa8;--line:#262630;--header:rgba(11,11,16,.9);--footer:#08080c;--sel:#222;color-scheme:dark}
[data-theme="light"]{--bg:#ffffff;--card:#f6f7f9;--text:#0f1220;--muted:#5b6070;--line:#e3e6ea;--header:rgba(255,255,255,.9);--footer:#f0f2f5;--sel:#e9ecf1;color-scheme:light}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
a{color:#ff5c7a;text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.site-header{position:sticky;top:0;z-index:50;background:var(--header);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.header-inner{display:flex;align-items:center;gap:20px;height:62px}
.brand{display:flex;align-items:center;gap:8px;font-weight:800;color:var(--text);font-size:20px}
.brand-mark{color:var(--brand)}
.nav{display:flex;gap:4px;flex:1;flex-wrap:wrap}
.nav-link{color:var(--muted);padding:8px 10px;border-radius:8px;font-weight:600;font-size:15px;cursor:pointer;list-style:none}
.nav-link:hover,.nav-link.active{color:var(--text);background:var(--card);text-decoration:none}
.nav-drop{position:relative}.nav-drop-menu{position:absolute;top:100%;left:0;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px;min-width:200px;display:none;max-height:70vh;overflow:auto}
.nav-drop:hover .nav-drop-menu{display:block}
.nav-drop-menu a{display:block;padding:7px 10px;color:var(--muted);border-radius:6px;font-size:14px}
.lang{position:relative}.lang-toggle{cursor:pointer;color:var(--muted);padding:8px 10px;list-style:none;font-weight:600}
.lang-menu{position:absolute;right:0;top:100%;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px;min-width:160px;display:none;max-height:70vh;overflow:auto}
.lang:hover .lang-menu{display:block}
.lang-option{display:block;padding:6px 10px;color:var(--muted);border-radius:6px;font-size:14px}.lang-option.selected{color:var(--text);background:var(--sel)}
.main{padding:28px 20px 60px}
.hero{text-align:center;padding:40px 0 20px}
.hero h1{font-size:clamp(28px,5vw,46px);line-height:1.15;margin:0 0 14px}
.hero p{color:var(--muted);max-width:720px;margin:0 auto 22px}
.dl-form{display:flex;gap:10px;max-width:620px;margin:0 auto}
.dl-form input{flex:1;padding:14px 16px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:16px}
.dl-btn{display:inline-block;background:var(--brand);color:#fff;border:0;padding:14px 22px;border-radius:12px;font-weight:700;font-size:16px;cursor:pointer}
.dl-result{max-width:620px;margin:16px auto 0;padding:14px;background:var(--card);border:1px solid var(--line);border-radius:12px}
.section{margin:40px 0}.section h2{font-size:clamp(22px,3vw,30px);margin:0 0 8px}
.lead{color:var(--muted);margin:0 0 20px}
.page-sub{color:var(--brand);font-weight:700;margin:0 0 10px;font-size:clamp(16px,2.2vw,20px)}
.grid{display:grid;gap:16px}.grid-3{grid-template-columns:repeat(3,1fr)}
.tool-grid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.post-grid{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
.card h3{margin:0 0 6px;font-size:17px}.card p{margin:0;color:var(--muted);font-size:15px}
.tool-card .go{display:inline-block;margin-top:10px;color:var(--brand);font-weight:700;font-size:14px}
.step-num{display:inline-block;background:var(--brand);color:#fff;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;font-weight:700;margin-bottom:10px}
.feature-ico{display:inline-flex;color:var(--brand);margin-bottom:10px}
.feature-card h3{margin-top:0}
.post-body h3{margin:22px 0 6px;font-size:18px}
.stats-row{display:flex;flex-wrap:wrap;gap:14px;margin:18px 0 6px}
.stat{flex:1 1 120px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;text-align:center}
.stat-value{display:block;font-size:22px;font-weight:800;color:var(--brand)}
.stat-label{display:block;color:var(--muted);font-size:13px;margin-top:4px}
.steps-list{margin:10px 0 14px;padding-left:22px}
.steps-list li{margin:8px 0;color:var(--fg);font-size:15px}
.tip{background:var(--card);border-left:3px solid var(--brand);border-radius:8px;padding:10px 14px;color:var(--muted);font-size:14px}
.feature-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:22px 0 6px}
.mini-feat{display:flex;gap:10px;align-items:flex-start;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px}
.mini-feat .ico-wrap{color:var(--brand);margin-top:2px}
.mini-feat strong{display:block;font-size:14px}
.mini-feat small{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.compat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.compat-item{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.compat-item strong{display:block;font-size:15px}
.compat-item span{color:var(--muted);font-size:13px}
.dl-preview{display:flex;gap:14px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;margin:8px 0;max-width:420px}
.dl-preview img{width:96px;height:128px;object-fit:cover;border-radius:8px;background:#0002;flex:none}
.dl-meta{min-width:0}
.dl-meta strong{display:block;font-size:14px;line-height:1.3;word-break:break-word}
.dl-meta small{display:block;color:var(--muted);font-size:12px;margin-top:6px}
.dl-card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;max-width:460px;margin:8px 0}
.dl-head{font-weight:700;font-size:14px;color:var(--brand);margin-bottom:12px}
.dl-top{display:flex;gap:14px;align-items:flex-start}
.dl-cover{width:96px;height:170px;object-fit:cover;border-radius:10px;background:#0002;flex:none}
.dl-info{min-width:0;flex:1}
.dl-author{display:flex;gap:8px;align-items:center;margin-bottom:8px}
.dl-avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;flex:none}
.dl-author strong{display:block;font-size:14px;line-height:1.2}
.dl-author small{display:block;color:var(--muted);font-size:12px}
.dl-cap{font-size:13px;line-height:1.35;margin:6px 0;word-break:break-word}
.dl-stats{color:var(--muted);font-size:12px;margin-top:6px}
.dl-opts{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.dl-opt{display:flex;justify-content:flex-start;align-items:center;gap:12px;width:100%;text-align:left;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:12px 14px;cursor:pointer;font:inherit;color:inherit;position:relative;overflow:hidden}
.dl-opt:hover{border-color:var(--brand)}
.dl-opt small{color:var(--muted);font-size:12px}
.dl-ico{flex:none;color:var(--brand);display:inline-flex}
.dl-label{flex:1;min-width:0}
.dl-opt.is-loading .dl-ico{color:var(--muted)}
.dl-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:transparent}
.dl-opt.is-loading .dl-bar{background:var(--line)}
.dl-fill{display:block;height:100%;width:0;background:var(--brand);transition:width .15s}
@media(max-width:820px){.feature-strip{grid-template-columns:1fr 1fr}.compat-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.feature-strip,.compat-grid{grid-template-columns:1fr}}
.cta{text-align:center}
.crumbs{color:var(--muted);font-size:14px;margin:8px 0 18px}
.post-body{max-width:780px;margin:0 auto}.post-body h1{font-size:clamp(26px,4vw,38px);margin:0 0 12px}.post-body h2{margin:28px 0 8px;font-size:22px}
.faq-item{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0}
.faq-item summary{cursor:pointer;font-weight:600}.faq-item p{color:var(--muted);margin:8px 0 0}
.site-footer{border-top:1px solid var(--line);background:var(--footer);margin-top:40px}
.footer-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding:40px 20px}
.footer-col h4{margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
.footer-col a{display:block;color:var(--muted);font-size:14px;padding:3px 0}
.footer-about .brand{margin-bottom:10px}
.badges{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
.badge{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:4px 10px;font-size:12px;color:var(--muted)}
.fineprint{color:var(--muted);font-size:13px;margin:4px 0}
.footer-bottom{padding:20px;border-top:1px solid var(--line);display:flex;gap:20px;flex-wrap:wrap}
.muted{color:var(--muted)}
@media(max-width:820px){.grid-3{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr 1fr}.header-inner{flex-wrap:wrap;height:auto;padding:10px 0}}
.post-meta{color:var(--muted);font-size:14px;margin:0 0 14px}
.ico{display:inline-block;vertical-align:-0.15em;flex:none}
.brand-mark{display:inline-flex;align-items:center}
.badge .ico,.dl-btn .ico,.lang-toggle .ico{margin-right:6px}
.footer-col h4 .ico,.section h2 .ico,.card h3 .ico{margin-right:8px}
.go .ico{margin-left:4px}
.heart{color:var(--brand)}
.theme-toggle{display:inline-flex;align-items:center;justify-content:center;background:var(--card);border:1px solid var(--line);color:var(--text);border-radius:10px;padding:8px;cursor:pointer}
.theme-light-icon{display:none}
[data-theme="light"] .theme-dark-icon{display:none}
[data-theme="light"] .theme-light-icon{display:inline}
.lang-toggle{display:inline-flex;align-items:center;gap:6px;background:var(--card);border:1px solid var(--line);color:var(--text);border-radius:10px;padding:8px 12px;font-weight:600;cursor:pointer}
.lang-toggle .ico:last-child{color:var(--muted)}
.lang-modal{position:fixed;inset:0;z-index:100}
.lang-modal[hidden]{display:none}
.lang-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(2px)}
.lang-panel{position:relative;margin:8vh auto 0;width:min(560px,92vw);max-height:80vh;display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);overflow:hidden}
.lang-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid var(--line)}
.lang-head strong{font-size:16px}
.lang-x{background:none;border:0;color:var(--muted);cursor:pointer;padding:4px;display:inline-flex}
.lang-search{margin:14px 18px 6px;padding:12px 14px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-size:15px}
.lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;padding:10px 14px 18px;overflow-y:auto;overscroll-behavior:contain}
.lang-option{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:11px 14px;border-radius:10px;color:var(--muted);font-weight:600;border:1px solid transparent}
.lang-option:hover{background:var(--bg);color:var(--text)}
.lang-option.selected{color:var(--text);background:var(--sel);border-color:var(--line)}
.lang-option .ico{color:var(--brand)}
@media(max-width:520px){.lang-grid{grid-template-columns:1fr}}
`;

export const MAIN_JS = `// TiktMeta UI: theme toggle + language modal + dropdown close.
(function(){
  var tgl=document.querySelector('[data-theme-toggle]');
  if(tgl){ tgl.addEventListener('click',function(){
    var cur=document.documentElement.getAttribute('data-theme')==='light'?'light':'dark';
    var next=cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
  }); }
  var modal=document.querySelector('[data-lang-modal]');
  var openBtn=document.querySelector('[data-lang-open]');
  if(modal&&openBtn){
    var search=modal.querySelector('[data-lang-search]');
    var opts=[].slice.call(modal.querySelectorAll('.lang-option'));
    function open(){ modal.hidden=false; document.body.style.overflow='hidden'; if(search){search.value='';filter('');search.focus();} }
    function close(){ modal.hidden=true; document.body.style.overflow=''; }
    function filter(q){ q=(q||'').toLowerCase().trim(); opts.forEach(function(o){ o.style.display=(!q||o.getAttribute('data-name').indexOf(q)>=0)?'':'none'; }); }
    openBtn.addEventListener('click',open);
    modal.querySelectorAll('[data-lang-close]').forEach(function(b){ b.addEventListener('click',close); });
    if(search)search.addEventListener('input',function(){ filter(search.value); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!modal.hidden)close(); });
  }
  document.addEventListener('click',function(e){ document.querySelectorAll('.nav-drop').forEach(function(d){ if(!d.contains(e.target))d.removeAttribute('open'); }); });
})();`;

export const DL_JS = `// TiktMeta downloader: clipboard auto-detect + auto-fetch on paste.
(function(){
  var form=document.getElementById('dl');if(!form)return;
  var input=document.getElementById('url');
  var result=document.getElementById('result');
  var API=(window.TIKTMETA_API||'')+'/api/post-detail';
  var TIKTOK=/(https?:\\/\\/(?:vm|vt|www|m)?\\.?tiktok\\.com\\/[^\\s]+|https?:\\/\\/[^\\s]*tiktok\\.com\\/[^\\s]+)/i;
  function findUrl(text){ if(!text)return null; var m=String(text).match(TIKTOK); return m?m[0]:null; }
  function isTikTok(u){ try{var h=new URL(u).hostname;return /(^|\\.)tiktok\\.com$/i.test(h);}catch(e){return false;} }
  var busy=false;
  function show(html){ if(result){result.hidden=false;result.innerHTML=html;} }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function fileName(url,label){
    var ext='mp4'; var m=String(url).split('?')[0].match(/\.([a-z0-9]{2,4})$/i); if(m)ext=m[1].toLowerCase();
    if(/mp3|audio/i.test(label||''))ext='mp3';
    if(/photo/i.test(label||''))ext='jpg';
    return 'tiktmeta-'+Date.now()+'.'+ext;
  }
  function saveBlob(blob,name){
    var obj=URL.createObjectURL(blob);
    var a=document.createElement('a'); a.href=obj; a.download=name; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(obj); a.remove(); },1500);
  }
  var DL_ICON='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
  // Try each candidate URL in order; blob-download the first that passes CORS.
  function download(cands,label,btn){
    var list=cands.filter(Boolean); if(!list.length){return;}
    var old=btn.innerHTML;
    var bar=btn.querySelector('.dl-bar'); var fill=btn.querySelector('.dl-fill'); var txt=btn.querySelector('.dl-label');
    btn.disabled=true; btn.classList.add('is-loading');
    if(txt)txt.textContent='Downloading...';
    function reset(){ btn.disabled=false; btn.classList.remove('is-loading'); btn.innerHTML=old; }
    function attempt(i){
      if(i>=list.length){ reset(); window.open(list[0],'_blank','noopener'); return; }
      fetch(list[i],{mode:'cors'}).then(function(r){
        if(!r.ok)throw new Error('HTTP '+r.status);
        var total=Number(r.headers.get('content-length'))||0;
        if(!r.body||!window.ReadableStream){ return r.blob().then(function(b){ done(b); }); }
        var reader=r.body.getReader(); var chunks=[]; var got=0;
        function pump(){ return reader.read().then(function(res){
          if(res.done){ done(new Blob(chunks)); return; }
          chunks.push(res.value); got+=res.value.length;
          if(fill&&total){ fill.style.width=Math.min(100,Math.round(got/total*100))+'%'; }
          return pump();
        }); }
        return pump();
      }).then(function(){},function(){ attempt(i+1); });
      function done(blob){
        saveBlob(blob,fileName(list[i],label));
        if(fill){ fill.style.width='100%'; }
        if(txt)txt.textContent='Downloaded';
        setTimeout(reset,1600);
      }
    }
    attempt(0);
  }
  function fmtCount(n){ n=Number(n)||0; if(n>=1000000)return (n/1000000).toFixed(1).replace(/\.0$/,'')+'M'; if(n>=1000)return (n/1000).toFixed(1).replace(/\.0$/,'')+'K'; return String(n); }
  function fmtSize(b){ b=Number(b)||0; if(b>=1048576)return (b/1048576).toFixed(1)+' MB'; if(b>=1024)return Math.round(b/1024)+' KB'; return b+' B'; }
  function render(d){
    if(d&&d.ok===false){ show('<p>'+esc(d.error||'Could not fetch this link.')+'</p>'); return; }
    var cover=d.cover||d.origin_cover||d.ai_dynamic_cover||'';
    var title=d.title||''; var author=(d.author&&d.author.unique_id)||'';
    var nick=(d.author&&d.author.nickname)||author; var avatar=(d.author&&d.author.avatar)||'';
    var stats='';
    var parts=[];
    if(d.play_count!=null)parts.push(fmtCount(d.play_count)+' views');
    if(d.digg_count!=null)parts.push(fmtCount(d.digg_count)+' likes');
    if(d.comment_count!=null)parts.push(fmtCount(d.comment_count)+' comments');
    if(parts.length)stats='<div class="dl-stats">'+esc(parts.join(' \\u00b7 '))+'</div>';
    var card='<div class="dl-card">';
    card+='<div class="dl-head">Result ready</div>';
    card+='<div class="dl-top">';
    if(cover)card+='<img class="dl-cover" src="'+esc(cover)+'" alt="'+esc(title||'cover')+'" loading="lazy" referrerpolicy="no-referrer">';
    card+='<div class="dl-info">';
    if(nick||avatar){ card+='<div class="dl-author">'+(avatar?'<img class="dl-avatar" src="'+esc(avatar)+'" alt="" referrerpolicy="no-referrer">':'')+'<span><strong>'+esc(nick||author)+'</strong>'+(author?'<small>@'+esc(author)+'</small>':'')+'</span></div>'; }
    if(title)card+='<p class="dl-cap">'+esc(title)+'</p>';
    card+=stats;
    card+='</div></div>';
    var model=[
      {label:'Standard quality',note:d.size?fmtSize(d.size):'',cands:[d.play]},
      {label:'HD \\u00b7 Original quality',note:d.hd_size?fmtSize(d.hd_size):'',cands:[d.hdplay,d.play]},
      d.music?{label:'MP3 audio',note:'',cands:[d.music]}:null
    ].filter(Boolean);
    card+='<div class="dl-opts">'+model.map(function(b,i){return '<button type="button" class="dl-opt" data-i="'+i+'"><span class="dl-ico">'+DL_ICON+'</span><span class="dl-label">'+esc(b.label)+(b.note?'<small>\\u00b7 '+esc(b.note)+'</small>':'')+'</span><span class="dl-bar"><span class="dl-fill"></span></span></button>';}).join('')+'</div>';
    card+='</div>';
    show(card);
    if(result){
      result.querySelectorAll('button.dl-opt').forEach(function(b){ b.addEventListener('click',function(){ var m=model[+b.getAttribute('data-i')]; download(m.cands,m.label,b); }); });
      result.querySelectorAll('img').forEach(function(im){ im.addEventListener('error',function(){ im.style.visibility='hidden'; }); });
    }
  }
  function analyze(){
    var url=(input.value||'').trim(); if(!url){return;}
    var found=findUrl(url)||url; if(!isTikTok(found)){show('<p>Please paste a valid TikTok link.</p>');return;}
    input.value=found; if(busy)return; busy=true; show('<p>Analyzing...</p>');
    fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:found})})
      .then(function(r){ return r.json().then(function(d){ return {status:r.status,body:d}; }); })
      .then(function(res){ if(res.status>=400&&res.body&&res.body.ok===false){ show('<p>'+esc(res.body.error||('HTTP '+res.status))+'</p>'); return; } render(res.body); })
      .catch(function(err){ show('<p>Could not reach the download service. Please try again ('+esc(err.message)+').</p>'); })
      .finally(function(){ busy=false; });
  }
  form.addEventListener('submit',function(e){ e.preventDefault(); analyze(); });
  input.addEventListener('paste',function(e){
    var cd=e.clipboardData||window.clipboardData; var text=cd?cd.getData('text'):'';
    var found=findUrl(text); if(found){ e.preventDefault(); input.value=found; analyze(); }
  });
  function fromClipboard(){
    if(!navigator.clipboard||!navigator.clipboard.readText)return;
    navigator.clipboard.readText().then(function(t){
      var found=findUrl(t); if(found && !input.value){ input.value=found; }
    }).catch(function(){});
  }
  fromClipboard();
  window.addEventListener('focus',fromClipboard);
  document.addEventListener('visibilitychange',function(){ if(!document.hidden)fromClipboard(); });
})();`;

export const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#e11d48"/><path d="M32 14v30m0 0l-11-11m11 11l11-11" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const OG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0b0b10"/><rect x="0" y="0" width="1200" height="8" fill="#e11d48"/><text x="80" y="300" font-family="system-ui" font-size="64" font-weight="800" fill="#fff">TiktMeta</text><text x="80" y="370" font-family="system-ui" font-size="28" fill="#9a9aa8">Download TikTok without watermark — free</text></svg>`;
export const HERO = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><rect width="1200" height="600" fill="#15151c"/><circle cx="600" cy="300" r="120" fill="#e11d48" opacity="0.2"/></svg>`;
// 1x1 jpg placeholder (base64)
export const JPG_B64 = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==';

// --- conservative minifiers (safe: preserve JS newlines for ASI) ---
export function minifyCss(s) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}
export function minifyJs(s) {
  return s
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('//'))
    .join('\n');
}
export const MIN_CSS = minifyCss(CSS);
export const MIN_MAIN_JS = minifyJs(MAIN_JS);
export const MIN_DL_JS = minifyJs(DL_JS);
