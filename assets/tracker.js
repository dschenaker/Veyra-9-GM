(() => {
  const drawer = document.getElementById('v9-tracker-drawer');
  const toggle = document.getElementById('v9-tracker-toggle');
  const roundPill = document.getElementById('v9-round-pill');

  let state = { round: 1, rows: [] };

  function save(){ try{ localStorage.setItem('v9_tracker', JSON.stringify(state)); }catch(e){} }
  function load(){
    try{
      const s = localStorage.getItem('v9_tracker');
      if (s) state = JSON.parse(s);
    }catch(e){}
    render();
  }

  function render(){
    if (roundPill) roundPill.textContent = `Round ${state.round||1}`;
    const host = document.getElementById('v9-rows'); if (!host) return;
    host.innerHTML = '';
    state.rows.slice().sort((a,b)=> (b.init||0)-(a.init||0)).forEach((r,i)=>{
      const row = document.createElement('div');
      row.className = 'row' + (r.dead ? ' dead':'');
      row.innerHTML = `
        <input value="${r.name||''}"  data-k="name">
        <input value="${r.init||''}"  data-k="init"  type="number">
        <input value="${r.ac||''}"    data-k="ac"    type="number">
        <input value="${r.hp||''}"    data-k="hp"    type="number">
        <input value="${r.th||''}"    data-k="th"    type="number">
        <div style="display:flex;gap:6px">
          <button class="btn" data-act="acted">✓</button>
          <button class="btn" data-act="dead">💥</button>
          <button class="btn" data-act="del">🗑</button>
        </div>`;
      row.querySelectorAll('input').forEach(inp=>{
        inp.addEventListener('change', ()=>{
          const key = inp.dataset.k;
          state.rows[i][key] = (inp.type==='number') ? Number(inp.value) : inp.value;
          save();
        });
      });
      row.querySelector('[data-act="del"]').onclick  = ()=>{ state.rows.splice(i,1); save(); render(); };
      row.querySelector('[data-act="dead"]').onclick = ()=>{ state.rows[i].dead = !state.rows[i].dead; save(); render(); };
      row.querySelector('[data-act="acted"]').onclick= ()=>{ state.rows[i].acted= !state.rows[i].acted; save(); render(); };
      host.appendChild(row);
    });
  }

  if (toggle && drawer){
    toggle.addEventListener('click', ()=> drawer.classList.toggle('open'));
  }

  document.getElementById('v9-add')?.addEventListener('click', ()=>{
    const name = document.getElementById('v9-add-name').value.trim();
    if (!name) return;
    state.rows.push({
      name,
      init:Number(document.getElementById('v9-add-init').value||0),
      ac:  Number(document.getElementById('v9-add-ac').value||0),
      hp:  Number(document.getElementById('v9-add-hp').value||0),
      th:  Number(document.getElementById('v9-add-th').value||0),
      dead:false, acted:false
    });
    save(); render();
    ['v9-add-name','v9-add-init','v9-add-ac','v9-add-hp','v9-add-th'].forEach(id=>document.getElementById(id).value='');
  });

  document.getElementById('v9-next')?.addEventListener('click',  ()=>{ state.round=(state.round||1)+1; save(); render(); });
  document.getElementById('v9-clear')?.addEventListener('click', ()=>{ state={round:1,rows:[]}; save(); render(); });

  window.addEventListener('storage', (e)=>{ if (e.key==='v9_tracker') load(); });

  load();
})();