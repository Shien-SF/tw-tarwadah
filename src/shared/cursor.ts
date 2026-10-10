// One pointer overlay per document, shared by independently mounted sections.
let leases=0;
let dispose:(()=>void)|undefined;
export function useReferenceCursor(){
  if(!leases++){
    const dot=document.createElement('div');dot.className='tarwadah-cursor';dot.setAttribute('aria-hidden','true');
    Object.assign(dot.style,{position:'fixed',top:'0',left:'0',width:'12px',height:'13px',borderRadius:'999px',background:'#fc721b',pointerEvents:'none',zIndex:'2147483647',opacity:'0',willChange:'transform'});
    document.body.append(dot);
    const fine=matchMedia('(min-width:810px) and (hover:hover) and (pointer:fine)');
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    let x=0,y=0,tx=0,ty=0,frame=0,visible=false;
    const draw=()=>{frame=0;const rate=reduced.matches?1:.35;x+=(tx-x)*rate;y+=(ty-y)*rate;dot.style.transform=`translate(${x}px,${y}px) translateY(-50%)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.05)frame=requestAnimationFrame(draw);};
    const move=(e:PointerEvent)=>{if(!fine.matches||e.pointerType==='touch')return;tx=e.clientX+12;ty=e.clientY+16;if(!visible){x=tx;y=ty;visible=true;}dot.style.opacity='1';if(!frame)frame=requestAnimationFrame(draw);};
    const hide=()=>{visible=false;dot.style.opacity='0';};
    const change=()=>{if(!fine.matches)hide();};
    document.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);fine.addEventListener('change',change);
    dispose=()=>{cancelAnimationFrame(frame);dot.remove();document.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide);fine.removeEventListener('change',change);};
  }
  let released=false;return ()=>{if(released)return;released=true;if(!--leases){dispose?.();dispose=undefined;}};
}
