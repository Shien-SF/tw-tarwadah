import Lenis from 'lenis';
import { refreshScenes } from './motion';

type Scroller = Window | HTMLElement;
type Lease = { lenis: Lenis; count: number; owned: boolean };
const instances = new Map<Scroller, Lease>();
export function scrollRoot(element: HTMLElement): Scroller {
  for (let parent=element.parentElement; parent; parent=parent.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(parent).overflowY) && parent.scrollHeight>parent.clientHeight+1) return parent;
    if(parent===document.body)break;
  }
  return window;
}
export function useSmoothScroll(element: HTMLElement) {
  const root=scrollRoot(element);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=false;
  const start=()=>{
    if(reduced.matches || active)return;
    let lease=instances.get(root);
    if(!lease){
      const existing=root===window?(window as any).lenis:undefined;
      const lenis=existing?.scrollTo&&existing?.on?existing:new Lenis({
        wrapper:root,content:root===window?document.documentElement:(root as HTMLElement).firstElementChild||root as HTMLElement,
        autoRaf:true,duration:1,smoothWheel:true,syncTouch:false,anchors:true,
        prevent:node=>!!node.closest('dialog,[data-lenis-prevent],salla-product-options,salla-quantity-input'),
      });
      lease={lenis,count:0,owned:!existing};instances.set(root,lease);
      lenis.on('scroll',refreshScenes);
      if(!document.getElementById('tarwadah-lenis-css')){
        const style=document.createElement('style');style.id='tarwadah-lenis-css';
        style.textContent='html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-stopped{overflow:clip}.lenis [data-lenis-prevent]{overscroll-behavior:contain}';
        document.head.append(style);
      }
    }
    lease.count++;active=true;element.dataset.smoothScroll='lenis';
  };
  const stop=()=>{
    if(!active)return;
    active=false;delete element.dataset.smoothScroll;
    const lease=instances.get(root)!;
    if(--lease.count===0){lease.lenis.off('scroll',refreshScenes);if(lease.owned)lease.lenis.destroy();instances.delete(root);}
  };
  const change=()=>{if(reduced.matches)stop();else start();refreshScenes();};
  start();reduced.addEventListener('change',change);
  return ()=>{reduced.removeEventListener('change',change);stop();};
}
export function smoothTo(element: HTMLElement) {
  const lease=instances.get(scrollRoot(element));
  if(lease&&!matchMedia('(prefers-reduced-motion: reduce)').matches)lease.lenis.scrollTo(element,{duration:1});
  else element.scrollIntoView({behavior:'instant'});
}
