import './components/tarwadah-hero';
import './components/tarwadah-product-strip';
import './components/tarwadah-highlights';
import './components/tarwadah-sound';
import './components/tarwadah-gallery';
import './components/tarwadah-features';
import './components/tarwadah-video';
import './components/tarwadah-testimonials';
import './components/tarwadah-buy-now';
import templateDefaults from './shared/template-defaults.json';
import './preview.css';
import { mergePreviewConfig, resolvePreviewTemplate } from './shared/preview-config';
import { animate } from 'motion';
import { language, watchLanguage } from './shared/locale';
import { smoothTo } from './shared/smooth-scroll';
import { initPreviewCart } from './preview-cart';
import { initPreviewStore } from './preview-store';

document.body.dataset.tarwadahPreview='true';
const previewLanguage=new URLSearchParams(location.search).get('lang');
if(previewLanguage==='ar'||previewLanguage==='en'){document.documentElement.lang=previewLanguage;document.documentElement.dir=previewLanguage==='ar'?'rtl':'ltr';}

// Only the local full-page preview owns navigation/footer. The publishable
// component bundle leaves those global areas to the merchant's Salla theme.
document.body.insertAdjacentHTML('afterbegin',`<header class="preview-nav"><div class="nav-head"><button aria-label="Open menu" aria-expanded="false" aria-controls="preview-menu" class="menu-button"><span></span><span></span></button><a href="#hero" class="brand"></a><span class="menu-title" aria-hidden="true">Menu</span><button type="button" aria-label="Open cart" aria-expanded="false" aria-controls="preview-cart" class="bag"><svg width="22" height="24" viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 9h16l-2 14H6L4 9Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg><span class="cart-count" hidden></span></button></div><nav id="preview-menu" class="preview-menu" aria-label="Main navigation" inert></nav></header><main id="landing"></main>`);
const container=document.getElementById('landing')!;
const requestedTemplate=new URLSearchParams(location.search).get('template');
const compact=requestedTemplate==='compact';
function refreshPreview(){
  const selected=resolvePreviewTemplate(templateDefaults,requestedTemplate,localStorage.getItem('salla_demo_active_template_id'));
  const sections=selected.template.sections as Record<string,Record<string,any>>;
  const names=selected.template.order.filter(name=>!compact||['hero','product-strip','highlights','features','testimonials','buy-now'].includes(name));
  const next=new Set(names);
  for(const child of Array.from(container.children))if(!next.has((child as HTMLElement).dataset.section!))child.remove();
  for(const [index,name] of names.entries()){
    const element=container.querySelector<HTMLElement>(`[data-section="${name}"]`)||document.createElement(`salla-tarwadah-${name}`);
    element.id=name;element.dataset.section=name;
    (element as any).config=mergePreviewConfig(sections[name],selected.useSession?localStorage.getItem(`form-builder::data_tarwadah-${name}`):null);
    if(container.children[index]!==element)container.insertBefore(element,container.children[index]||null);
  }
  container.dataset.template=selected.name;
}
refreshPreview();
window.addEventListener('storage',event=>{if(event.key?.startsWith('form-builder::data_')||event.key==='salla_demo_active_template_id')refreshPreview();});

document.body.insertAdjacentHTML('beforeend',`<footer class="preview-footer"><div class="footer-brand"></div><div class="footer-row"><nav aria-label="Footer"></nav></div><div class="preview-tools"><a class="editor-link" href="/editor.html">إعداد عناصر ترواده</a><button type="button" class="store-settings"></button><button class="direction">العربية / AR</button></div></footer>`);
const menu=document.querySelector<HTMLElement>('.preview-menu')!;
const navbar=document.querySelector<HTMLElement>('.preview-nav')!;
const toggle=document.querySelector<HTMLButtonElement>('.menu-button')!;
const cart=initPreviewCart(navbar,()=>setMenu(false));
let menuAnimation:ReturnType<typeof animate>|undefined;
let linkAnimations:Array<ReturnType<typeof animate>>=[];
function setMenu(open:boolean){
  if(open)cart.setOpen(false);
  if((toggle.getAttribute('aria-expanded')==='true')===open)return;
  document.querySelector('.menu-title')!.setAttribute('aria-hidden',String(!open));
  (document.querySelector('.brand') as HTMLElement).inert=open;
  (document.querySelector('.bag') as HTMLElement).inert=open;
  menuAnimation?.stop();linkAnimations.forEach(a=>a.stop());
  navbar.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));menu.inert=!open;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  menuAnimation=animate(menu,{height:open?422.03:0},{type:'spring',bounce:.2,duration:reduced?0:.3});
  linkAnimations=Array.from(menu.querySelectorAll('a')).map((link,i)=>animate(link,{opacity:open?1:0},{type:'spring',bounce:.2,duration:reduced?0:.8,delay:open?i*.04:0}));
  toggle.setAttribute('aria-label',language()==='ar'?(open?'إغلاق القائمة':'فتح القائمة'):(open?'Close menu':'Open menu'));
}
toggle.onclick=()=>setMenu(toggle.getAttribute('aria-expanded')!=='true');
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
document.addEventListener('pointerdown',event=>{if(!navbar.contains(event.target as Node))setMenu(false);});
menu.addEventListener('click',event=>{if((event.target as Element).closest('a'))setMenu(false);});
function translatePreview(){
  const ar=language()==='ar';
  document.querySelector('.menu-title')!.textContent=ar?'القائمة':'Menu';
  document.querySelector<HTMLButtonElement>('.direction')!.textContent=ar?'English / EN':'العربية / AR';
  toggle.setAttribute('aria-label',ar?'فتح القائمة':'Open menu');
  cart.translate();
  store.translate();
}
const store=initPreviewStore(()=>setMenu(false));
translatePreview();watchLanguage(()=>{refreshPreview();translatePreview();});
document.querySelector<HTMLButtonElement>('.direction')!.onclick=()=>{const ar=language()!=='ar';document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.lang=ar?'ar':'en';};
document.addEventListener('click',event=>{const a=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');if(!a)return;const target=document.getElementById(a.hash.slice(1));if(target){event.preventDefault();smoothTo(target);}});
