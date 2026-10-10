import './components/tarwadah-hero';
import './components/tarwadah-product-strip';
import './components/tarwadah-highlights';
import './components/tarwadah-sound';
import './components/tarwadah-gallery';
import './components/tarwadah-features';
import './components/tarwadah-video';
import './components/tarwadah-testimonials';
import './components/tarwadah-buy-now';
import bundle from '../twilight-bundle.json';
import './preview.css';
import { mergePreviewConfig } from './shared/preview-config';
import { animate } from 'motion';
import { language, watchLanguage } from './shared/locale';
import { smoothTo } from './shared/smooth-scroll';

document.body.dataset.tarwadahPreview='true';
const previewLanguage=new URLSearchParams(location.search).get('lang');
if(previewLanguage==='ar'||previewLanguage==='en'){document.documentElement.lang=previewLanguage;document.documentElement.dir=previewLanguage==='ar'?'rtl':'ltr';}

// Only the local full-page preview owns navigation/footer. The publishable
// component bundle leaves those global areas to the merchant's Salla theme.
document.body.insertAdjacentHTML('afterbegin',`<header class="preview-nav"><div class="nav-head"><button aria-label="Open menu" aria-expanded="false" aria-controls="preview-menu" class="menu-button"><span></span><span></span></button><a href="#hero" class="brand">MORAE<sup>®</sup></a><span class="menu-title" aria-hidden="true">Menu</span><a href="#buy-now" aria-label="View product" class="bag"><svg width="22" height="24" viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 9h16l-2 14H6L4 9Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg></a></div><nav id="preview-menu" class="preview-menu" aria-label="Main navigation" inert><a data-label="home" href="#hero">Home</a><a data-label="highlights" href="#highlights">Highlights</a><a data-label="features" href="#features">Features</a><a data-label="testimonials" href="#testimonials">Testimonials</a><a data-label="buy-now" href="#buy-now">Buy Now</a></nav></header><main id="landing"></main>`);
const container=document.getElementById('landing')!;
const compact=new URLSearchParams(location.search).get('template')==='compact';
const names=compact?['hero','product-strip','highlights','features','testimonials','buy-now']:['hero','product-strip','highlights','sound','gallery','features','video','testimonials','buy-now'];
for(const name of names){
  const element=document.createElement(`salla-tarwadah-${name}`);
  element.id=name;element.dataset.section=name;
  const component=bundle.components.find(component=>component.name===`tarwadah-${name}`)!;
  (element as any).config=mergePreviewConfig(Object.fromEntries(component.fields.map(field=>[field.id,field.value])),localStorage.getItem(`form-builder::data_${component.name}`));
  container.append(element);
}
function refreshPreview(){for(const component of bundle.components){const element=document.querySelector(`[data-section="${component.name.replace('tarwadah-','')}"]`);if(element)(element as any).config=mergePreviewConfig(Object.fromEntries(component.fields.map(field=>[field.id,field.value])),localStorage.getItem(`form-builder::data_${component.name}`));}}
window.addEventListener('storage',event=>{if(event.key?.startsWith('form-builder::data_'))refreshPreview();});

document.body.insertAdjacentHTML('beforeend',`<footer class="preview-footer"><img src="https://framerusercontent.com/images/fW5fCdA3xQJj5ptc4pahcEU5mTE.png?width=3136&height=491" alt="MORAE" loading="lazy"><div class="footer-row"><nav aria-label="Footer"><a href="#hero">Home</a><a href="#highlights">Highlights</a><a href="#features">Features</a><a href="#testimonials">Testimonials</a><a href="#buy-now">Buy Now</a></nav></div><div class="preview-tools"><a class="editor-link" href="/editor.html">إعداد عناصر ترواده</a><button class="direction">العربية / AR</button></div></footer>`);
const menu=document.querySelector<HTMLElement>('.preview-menu')!;
const navbar=document.querySelector<HTMLElement>('.preview-nav')!;
const toggle=document.querySelector<HTMLButtonElement>('.menu-button')!;
let menuAnimation:ReturnType<typeof animate>|undefined;
let linkAnimations:Array<ReturnType<typeof animate>>=[];
function setMenu(open:boolean){
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
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const labels:Record<string,[string,string]>={home:['الرئيسية','Home'],highlights:['التفاصيل','Highlights'],features:['المميزات','Features'],testimonials:['آراء العملاء','Testimonials'],'buy-now':['اشترِ الآن','Buy Now']};
function translatePreview(){
  const ar=language()==='ar';
  menu.querySelectorAll<HTMLAnchorElement>('a').forEach(a=>a.textContent=labels[a.dataset.label!][ar?0:1]);
  document.querySelector('.menu-title')!.textContent=ar?'القائمة':'Menu';
  document.querySelector<HTMLButtonElement>('.direction')!.textContent=ar?'English / EN':'العربية / AR';
  toggle.setAttribute('aria-label',ar?'فتح القائمة':'Open menu');
  document.querySelector('.bag')!.setAttribute('aria-label',ar?'عرض المنتج':'View product');
  const footer=['الرئيسية','التفاصيل','المميزات','آراء العملاء','اشترِ الآن'];
  const en=['Home','Highlights','Features','Testimonials','Buy Now'];
  document.querySelectorAll('.footer-row nav:first-child a').forEach((a,i)=>a.textContent=(ar?footer:en)[i]);
}
translatePreview();watchLanguage(()=>{refreshPreview();translatePreview();});
document.querySelector<HTMLButtonElement>('.direction')!.onclick=()=>{const ar=language()!=='ar';document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.lang=ar?'ar':'en';};
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{const target=document.getElementById(a.hash.slice(1));if(target){event.preventDefault();smoothTo(target);}}));
