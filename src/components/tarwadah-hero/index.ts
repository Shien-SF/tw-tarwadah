import { css, html } from 'lit';
import { animate } from 'motion';
import { heroFrame, heroScale } from '../../shared/reference-motion';
import { TarwadahElement, sharedStyles } from '../../shared/base';
import { watchScene, refreshScenes, springChannel, scrambleText } from '../../shared/motion';

export default class TarwadahHero extends TarwadahElement {
  protected section = 'hero' as const;
  private stop?: () => void;
  private mediaEvents?: AbortController;
  private scaleSpring?:ReturnType<typeof springChannel>;
  private scrambles:Array<()=>void>=[];
  private noteAnimations:Array<ReturnType<typeof animate>>=[];
  static styles = [sharedStyles, css`
    .hero{height:1750px;position:relative;padding-bottom:100px;overflow:clip}.float{position:absolute;inset:0;height:100svh;min-height:650px;pointer-events:none}.scene{position:sticky;top:0;height:100svh;min-height:650px;overflow:visible}.film{position:absolute;left:50%;top:50%;width:calc(100% - 164px);max-width:1276px;height:auto;aspect-ratio:1276/718;object-fit:contain;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1))}.content{position:absolute;inset:0;max-width:1552px;margin:auto;}.note{position:absolute;top:27.2%;inset-inline-start:32.75%;width:180px;font-size:12px;line-height:1}.accent{position:absolute;top:41.4%;inset-inline-start:60.75%;width:180px;font-size:12px;line-height:1;color:var(--tw-accent)}.bottom{position:absolute;inset-inline:56px;bottom:64px;display:grid;grid-template-columns:1fr 74.27px 197px;align-items:end;gap:100px}h1.display{max-width:390px;font-size:56px;letter-spacing:-.05em;line-height:.9}.scroll{background:none;border:0;color:inherit;padding:0;text-align:start}.scroll,.action p,.action .button{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em}.action p{margin-bottom:14px}.action .button{width:121px;height:44px;padding:12px 28px;border-radius:6px}.fallback{background:#000}
    @media(min-width:810px) and (max-width:1439px){h1.display{font-size:48px;max-width:335px}.bottom{gap:80px;grid-template-columns:1fr 70px 180px}.scroll,.action p,.action .button{font-size:14px}}
    @media(max-width:809px){.hero{height:1750px}.scene{height:100svh;min-height:670px}.film{width:185.385%;max-width:none;height:auto;left:50%;top:40.52%;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1));object-fit:contain;object-position:center}.note{top:22.985%;inset-inline-start:13.59%;max-width:185px}.accent{top:30.57%;inset-inline-start:42.56%;white-space:nowrap}.bottom{inset-inline:20px;bottom:55px;display:block}.bottom h1{max-width:360px;font-size:56px;margin-bottom:30px}.action{display:block;margin-top:14px}.action p{font-size:12px;max-width:240px}.action .button{font-size:14px;width:auto;height:40px}.scroll{font-size:14px}}
  `];
  protected startMotion() {
    this.stop?.();this.mediaEvents?.abort();this.mediaEvents=new AbortController();
    const video = this.renderRoot.querySelector('video')!;
    let target=0;this.scaleSpring?.destroy();this.noteAnimations.forEach(a=>a.stop());this.noteAnimations=[];this.scaleSpring=springChannel(1,v=>this.style.setProperty('--hero-scale',String(v)),500,60);
    let previous=0,direction='up',turnAt=0;
    const notes=this.renderRoot.querySelectorAll<HTMLElement>('.note,.accent');this.scrambles.forEach(stop=>stop());this.scrambles=[];notes.forEach(note=>{note.style.opacity='1';delete note.dataset.direction;this.scrambles.push(scrambleText(note));});
    const seek=()=>{if(video.readyState>=1&&!video.seeking&&Math.abs(video.currentTime-target)>.001)video.currentTime=target;};
    video.addEventListener('loadedmetadata',refreshScenes,{signal:this.mediaEvents.signal});
    video.addEventListener('seeked',seek,{signal:this.mediaEvents.signal});
    this.stop = watchScene(this, () => {
      const box = this.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -box.top / Math.max(1, innerHeight)));
      const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      target=reduced?0:heroFrame(-box.top,video.duration||0);
      seek();this.scaleSpring?.set(reduced?1:heroScale(-box.top,box.height));
      this.style.setProperty('--media-pin',Math.max(0,-this.renderRoot.querySelector('.scene')!.getBoundingClientRect().top)+'px');
      const travel=-box.top;const next=travel>previous?'down':travel<previous?'up':direction;
      if(next!==direction){direction=next;turnAt=travel;}
      if(Math.abs(travel-turnAt)>4&&!reduced){notes.forEach((note,i)=>{if(note.dataset.direction===direction)return;note.dataset.direction=direction;this.noteAnimations.push(animate(note,{opacity:direction==='down'?0:1},{type:'spring',bounce:.2,duration:1.2,delay:i*.2}));});}
      previous=travel;
      this.dataset.motionProgress=p.toFixed(3);
    });
  }
  disconnectedCallback() { this.stop?.();this.mediaEvents?.abort();this.scaleSpring?.destroy();this.noteAnimations.forEach(a=>a.stop());this.scrambles.forEach(stop=>stop()); super.disconnectedCallback(); }
  render() {
    const s = this.settings;
    return html`<section class="hero" aria-label=${s.title}><div class="scene fallback">
      <video class="film" src=${s.video} poster=${s.poster} muted playsinline preload="auto" aria-hidden="true"></video>
      <div class="content">
      <div class="bottom"><h1 class="display">${s.title}</h1><button class="mono scroll" @click=${() => this.jump('highlights')}>${s.scroll_label}</button><div class="action"><p class="mono">${s.description}</p><button class="button" @click=${() => this.jump(s.cta_target)}>${s.cta_label}</button></div></div></div>
    </div><div class="float"><p class="mono note">${s.note}</p><p class="mono accent">${s.accent_text}</p></div></section>`;
  }
}
