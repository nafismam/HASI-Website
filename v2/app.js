'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
window.matchMedia('(min-width: 801px)').addEventListener('change',closeMenu);
const grid=document.querySelector('#project-grid');
const search=document.querySelector('#project-search');
const more=document.querySelector('#load-more');
const count=document.querySelector('#result-count');
let category='All', limit=6;
const escapeHTML=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 const query=search.value.trim().toLowerCase();
 const matches=projects.map((p,index)=>({...p,index})).filter(p=>(category==='All'||p.category===category)&&`${p.title} ${p.description}`.toLowerCase().includes(query));
 grid.innerHTML=matches.slice(0,limit).map(p=>`<article class="project-card"><div class="project-image"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)}" loading="lazy"><span class="tag">${escapeHTML(p.category)}</span></div><div class="project-body"><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.description)}</p><button data-project="${p.index}" aria-label="Read about ${escapeHTML(p.title)}">Explore project <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></button></div></article>`).join('')||'<p class="empty">No projects found. Try another search or select a different category.</p>';
 count.textContent=`Showing ${Math.min(matches.length,limit)} of ${matches.length} projects`;
 more.hidden=matches.length<=limit;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;limit=6;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));
search.addEventListener('input',()=>{limit=6;render();});
more.addEventListener('click',()=>{const previous=limit;limit+=6;render();grid.querySelectorAll('[data-project]')[previous]?.focus();});
const dialog=document.querySelector('#detail-dialog');
const content=document.querySelector('#dialog-content');
let previousFocus;
function openDialog(image,title,body,label){previousFocus=document.activeElement;content.innerHTML=`<img class="dialog-image" src="${escapeHTML(image)}" alt="${escapeHTML(title)}"><div class="dialog-body"><p class="eyebrow">${escapeHTML(label)}</p><h2 id="dialog-title">${escapeHTML(title)}</h2><p>${escapeHTML(body)}</p></div>`;dialog.showModal();document.body.classList.add('modal-open');}
grid.addEventListener('click',e=>{const button=e.target.closest('[data-project]');if(!button)return;const p=projects[Number(button.dataset.project)];openDialog(p.image,p.title,p.description,p.category+' / Project archive');});
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>openDialog(button.dataset.photo,button.querySelector('h3').textContent.replace('↗','').trim(),button.dataset.caption,'From our communities')));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('akramedhasi@yahoo.com');status.textContent='Email copied';}catch{status.textContent='Please select and copy the email address above.';}});
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navigation.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
render();
