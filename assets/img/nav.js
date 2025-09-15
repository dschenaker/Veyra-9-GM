/* ---------- CONFIG: edit only this block ---------- */
const V9_NAV = {
  brandHref: "index.html",
  brandText: "VEYRA-9 · GM Hub",
  phases: [
    {
      label: "Phase I",
      items: [
        { href: "index.html", text: "Arc 1 — Miners’ Desperation" },
        { href: "arc2.html",  text: "Arc 2 — Spire of Quiet Lies" },
        { href: "arc3.html",  text: "Arc 3 — (Title TBD)" },
        { href: "arc4.html",  text: "Arc 4 — (Title TBD)" },
        { href: "arc5.html",  text: "Arc 5 — (Title TBD)" },
        { href: "arc6.html",  text: "Arc 6 — (Title TBD)" },
        { href: "arc7.html",  text: "Arc 7 — (Title TBD)" },
        { href: "arc8.html",  text: "Arc 8 — (Title TBD)" },
        { href: "arc9.html",  text: "Arc 9 — (Title TBD)" }
      ]
    },
    {
      label: "Phase II",
      items: [
        { href: "arc10.html", text: "Arc 10 — Exfil and Testimony" }
      ]
    }
  ],
  utils: [
    { href: "repo.html",         text: "Character Dossier" },
    { href: "player-recap.html", text: "Player Recap" }
  ],
  links: [
    { text:"Dossier", href:"repo.html" },
    { text:"Player Recap", href:"player-recap.html" }
  ],
  showClock: true,   // set false if you don’t want the clock
  clockTZ: "CEST"    // label only
};
/* --------- end CONFIG --------- */

(function(){
  const here = location.pathname.split('/').pop() || "index.html";

  function pill(text){ const b=document.createElement('button'); b.className='v9-pill'; b.type='button'; b.textContent=text; return b; }
  function linkPill(text,href){
    const a=document.createElement('a'); a.className='v9-pill'; a.href=href; a.textContent=text; return a;
  }

  function render(){
    const header = document.querySelector('.v9-header');
    if(!header){ console.warn('Missing .v9-header container'); return; }

    const nav = document.createElement('div');
    nav.className = 'v9-nav';

    // Left brand
    const brand = document.createElement('a');
    brand.className = 'v9-brand v9-pill';
    brand.href = V9_NAV.brandHref; brand.textContent = V9_NAV.brandText;
    nav.appendChild(brand);

    // Phase 1 dropdown
    V9_NAV.phases.slice(0,1).forEach(p => nav.appendChild(dropdown(p)));

    // Center links (Dossier / Player Recap)
    V9_NAV.links.forEach(l => nav.appendChild(linkPill(l.text, l.href)));

    // Clock
    if (V9_NAV.showClock){
      const clock = document.createElement('span');
      clock.className = 'v9-pill v9-clock';
      clock.id='v9-clock';
      nav.appendChild(clock);
      tick(); setInterval(tick,1000);
      function tick(){
        const el=document.getElementById('v9-clock'); if(!el) return;
        el.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'}) + ' ' + V9_NAV.clockTZ;
      }
    }

    // Spacer pushes Phase 2 to far right
    const spacer = document.createElement('div'); spacer.className='v9-spacer';
    nav.appendChild(spacer);

    // Phase 2 dropdown (right-aligned)
    V9_NAV.phases.slice(1).forEach(p => nav.appendChild(dropdown(p)));

    header.innerHTML = ''; header.appendChild(nav);

    function dropdown(phase){
      const dd = document.createElement('div'); dd.className='v9-dd';
      const btn = pill(phase.label + ' ▾');
      btn.addEventListener('click', e => { e.stopPropagation(); dd.classList.toggle('open'); });
      const menu = document.createElement('div'); menu.className='v9-dd-menu';
      phase.items.forEach(it => {
        const a=document.createElement('a'); a.href=it.href; a.textContent=it.text;
        const isActive = (it.href === here) || (it.href==='index.html' && (here===''||here==='index.html'));
        if (isActive) a.classList.add('active');
        menu.appendChild(a);
      });
      dd.appendChild(btn); dd.appendChild(menu);
      return dd;
    }

    // close on outside click / Escape
    document.addEventListener('click', ()=>document.querySelectorAll('.v9-dd.open').forEach(el=>el.classList.remove('open')));
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') document.querySelectorAll('.v9-dd.open').forEach(el=>el.classList.remove('open')); });
  }

  document.addEventListener('DOMContentLoaded', render);
})();