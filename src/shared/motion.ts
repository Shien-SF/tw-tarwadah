import { animate, motionValue } from 'motion';
type Scene = { element: HTMLElement; update: (progress: number) => void; visible: boolean };
const scenes = new Set<Scene>();
let frame = 0;
function refresh() {
  frame = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  scenes.forEach(scene => {
    if (!scene.visible) return;
    const box = scene.element.getBoundingClientRect();
    scene.update(reduced ? 1 : Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height))));
  });
}
function schedule() { if (!frame) frame = requestAnimationFrame(refresh); }

export function watchScene(element: HTMLElement, update: Scene['update']) {
  const scene: Scene = { element, update, visible: true };
  if (!scenes.size) {
    // Capture scroll from nested preview containers as well as the window.
    document.addEventListener('scroll', schedule, { passive: true, capture: true });
    addEventListener('resize', schedule);
  }
  scenes.add(scene);
  const observer = new IntersectionObserver(entries => { scene.visible = entries[0].isIntersecting; schedule(); }, { rootMargin: '100px' });
  observer.observe(element);
  schedule();
  return () => {
    observer.disconnect(); scenes.delete(scene);
    if (!scenes.size) { document.removeEventListener('scroll', schedule, true); removeEventListener('resize', schedule); cancelAnimationFrame(frame); frame = 0; }
  };
}

export function refreshScenes() { schedule(); }

export function scrollPosition(element: HTMLElement) {
  for(let parent=element.parentElement;parent;parent=parent.parentElement){
    if(/(auto|scroll)/.test(getComputedStyle(parent).overflowY)&&parent.scrollHeight>parent.clientHeight+1)return parent.scrollTop;
    if(parent===document.body)break;
  }
  return scrollY;
}

export function springChannel(initial:number, write:(value:number)=>void, stiffness:number,damping:number){
  const value=motionValue(initial);let target=initial;
  const stop=value.on('change',write);write(initial);
  return {set(next:number){if(Math.abs(next-target)<.00001)return;target=next;if(matchMedia('(prefers-reduced-motion: reduce)').matches)value.jump(next);else animate(value,next,{type:'spring',stiffness,damping,mass:1,restDelta:.001});},destroy(){stop();value.destroy();}};
}

export function scrambleText(element:HTMLElement){
  const text=element.textContent||'';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return ()=>{};
  const alphabet=/[\u0600-\u06ff]/.test(text)?'ابتثجحخدذرزسشصضطظعغفقكلمنهوي':'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?~';
  const random=document.createElement('span'),future=document.createElement('span');future.style.opacity='0';
  const animation=animate(0,1,{delay:1,duration:(text.length+10)*.032,ease:'linear',onUpdate:p=>{
    const end=Math.min(text.length,Math.floor(p*(text.length+10))),done=Math.max(0,end-10);
    random.textContent=Array.from(text.slice(done,end)).map((_,i)=>alphabet[(Math.floor(p*997)+i*17)%alphabet.length]).join('');
    future.textContent=text.slice(end);element.replaceChildren(document.createTextNode(text.slice(0,done)),random,future);
  },onComplete:()=>{element.textContent=text;}});
  return ()=>{animation.stop();element.textContent=text;};
}

// Match each authored entry target; generic blur/wipe effects are not in MORAE.
export function revealContent(root: ParentNode) {
  const host=(root as ShadowRoot).host as HTMLElement;
  if(!host)return ()=>{};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return ()=>{};
  type Entry={selector:string;y?:number;delay?:number;duration?:number;opacity?:number;threshold?:number;repeat?:boolean};
  const entries:Record<string,Entry[]>={
    hero:[{selector:'.bottom',y:20,delay:1}],
    highlights:[{selector:'.eyebrow',y:20},{selector:'h2',y:20,delay:.2},{selector:'.heading .mono',y:20,delay:.4},{selector:'.card:nth-child(1)',y:60,delay:.4,duration:1.4},{selector:'.card:nth-child(2)',y:60,delay:.5,duration:1.4},{selector:'.card:nth-child(3)',y:60,delay:.7,duration:1.4},{selector:'.caption',y:110}],
    features:[{selector:'.feature',opacity:.5,duration:.7,repeat:true}],
    video:[{selector:'.caption',delay:.6,repeat:true}],
    testimonials:[{selector:'.eyebrow',y:20},{selector:'h2',y:20,delay:.1},{selector:'.viewport:nth-child(1)',duration:.8,threshold:1},{selector:'.viewport:nth-child(2)',delay:.2,duration:.8,threshold:1},{selector:'.caption',y:20,delay:.4}],
    'buy-now':[{selector:'.info h2',y:20}],
  };
  const pending=(entries[host.dataset.section||'']||[]).flatMap(entry=>Array.from(root.querySelectorAll<HTMLElement>(entry.selector)).map(element=>({entry,element,played:false,active:false,animation:undefined as ReturnType<typeof animate>|undefined})));
  pending.forEach(({entry,element})=>{element.style.opacity=String(entry.opacity??0);if(entry.y)element.style.translate='0 '+entry.y+'px';});
  const stop=watchScene(host,()=>{
    pending.forEach(item=>{
      const {entry,element}=item;
      const top=(host.dataset.section==='features'?element:host).getBoundingClientRect().top;
      const active=top<=innerHeight*(entry.threshold??.5)+1;
      if(active===item.active || (!entry.repeat&&item.played))return;
      item.active=active;if(active)item.played=true;item.animation?.stop();
      item.animation=animate(active?0:1,active?1:0,{type:host.dataset.section==='features'?'keyframes':'spring',bounce:.2,duration:entry.duration??1.2,delay:active?(entry.delay??0):0,ease:[.92,.03,.56,1],onUpdate:p=>{element.style.opacity=String((entry.opacity??0)+(1-(entry.opacity??0))*p);if(entry.y)element.style.translate='0 '+entry.y*(1-p)+'px';}});
    });
  });
  const cancel=()=>{stop();pending.forEach(({element,animation})=>{animation?.stop();element.style.removeProperty('opacity');element.style.removeProperty('translate');});};
  reduced.addEventListener('change',cancel);
  return ()=>{cancel();reduced.removeEventListener('change',cancel);};
}

export function observeVideo(video: HTMLVideoElement, autoplay = true) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
    else video.pause();
  });
  observer.observe(video);
  return () => { observer.disconnect(); video.pause(); };
}
