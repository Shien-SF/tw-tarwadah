import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { targetProgress } from '../../shared/reference-motion';
import { TarwadahElement, sharedStyles } from '../../shared/base';
import { observeVideo, watchScene, springChannel } from '../../shared/motion';
export default class TarwadahVideo extends TarwadahElement {
  protected section='video' as const;
  private stop?:()=>void;
  private stopScene?:()=>void;
  private shutter?:ReturnType<typeof springChannel>;
  @state() private playing=false;
  static styles=[sharedStyles,css`
    .film{position:relative;height:960px;overflow:hidden;padding-block:162px;background:#000}video{height:636px;object-fit:cover}.caption{position:absolute;inset-inline:0;top:50%;transform:translateY(-50%);text-align:center;font-family:'TW Roboto Mono',monospace;font-weight:400;font-size:14px;line-height:1.2;letter-spacing:-.02em;text-shadow:0 2px 20px #000}.play{position:absolute;inset-inline-end:56px;top:185px;border:1px solid #ffffff70;border-radius:30px;color:#fff;background:#0005;padding:12px 20px;font-size:12px;opacity:0;transition:opacity .2s}.film:hover .play,.play:focus-visible{opacity:1}.overlay{position:absolute;inset:162px 0;background:#0002;pointer-events:none}
    .shutter{position:absolute;inset-inline:0;height:270px;background:#000;pointer-events:none;z-index:1}.shutter.top{top:160px;transform:translateY(calc(-270px * var(--open,0)))}.shutter.bottom{bottom:160px;transform:translateY(calc(270px * var(--open,0)))}.caption,.play{z-index:2}
    @media(max-width:809px){.caption{padding-inline:20px}.play{inset-inline-end:20px;top:145px;opacity:1}}
  `];
  protected startMotion(){this.stop?.();this.stopScene?.();this.shutter?.destroy();const video=this.renderRoot.querySelector('video')!;this.stop=observeVideo(video);this.shutter=springChannel(0,v=>this.style.setProperty('--open',String(v)),106,50);this.stopScene=watchScene(this,()=>{const box=this.getBoundingClientRect();const open=matchMedia('(prefers-reduced-motion: reduce)').matches?1:targetProgress(box.top,box.height,innerHeight);this.shutter?.set(open);this.dataset.revealProgress=open.toFixed(3);});}

  disconnectedCallback(){this.stop?.();this.stopScene?.();this.shutter?.destroy();super.disconnectedCallback();}
  private toggle(){const video=this.renderRoot.querySelector('video')!;if(video.paused)video.play().catch(()=>{});else video.pause();}
  render(){const s=this.settings;return html`<section class="film" aria-label=${s.title}><video src=${s.video} poster=${s.poster} muted playsinline loop preload="none" @play=${()=>this.playing=true} @pause=${()=>this.playing=false}></video><div class="overlay"></div><div class="shutter top"></div><div class="shutter bottom"></div><h2 class="caption">${s.title}</h2><button class="play mono" @click=${this.toggle} aria-pressed=${this.playing}>${this.playing?s.pause_label:s.play_label}</button></section>`;}
}
