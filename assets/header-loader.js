(async function(){
  try{
    const host = document.querySelector('#site-header');
    if(!host) return;
    const res = await fetch('assets/header.html', {cache:'no-store'});
    host.innerHTML = await res.text();
    // Close dropdowns when clicking outside (stable on desktop + mobile)
    document.addEventListener('click', (e)=>{
      document.querySelectorAll('.dropdown').forEach(d=>{
        if(!d.contains(e.target)) d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded','false');
      });
    });
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Escape') document.activeElement?.blur();
    });
  }catch(e){ console.warn('header load failed', e); }
})();
