import { css, html } from 'lit';
import { animate } from 'motion';
import { TarwadahElement, sharedStyles } from '../../shared/base';
import { watchScene } from '../../shared/motion';
export default class TarwadahSound extends TarwadahElement {
  protected section='sound' as const;
  private stop?:()=>void;
  private colors:Array<ReturnType<typeof animate>>=[];
  static styles=[sharedStyles,css`
    .section{height:866px;padding-block:140px 166px;display:flex;flex-direction:column;align-items:center;text-align:center}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin:8px 0 42.8px;color:#bfbfbf}.text{max-width:662px;font-size:80px;font-weight:500;letter-spacing:-.05em;line-height:.925;white-space:pre-line}.word{color:rgba(255,255,255,.1)}.word.lit{color:var(--tw-ink)}
    @media(max-width:809px){.section{height:551px;padding-top:184px;padding-bottom:100px}.eyebrow{margin:0 0 0}.text{font-size:40px;line-height:.925;max-width:331px}}
  `];
  protected startMotion(){this.stop?.();this.colors.forEach(a=>a.stop());this.colors=[];let previous=-1;this.stop=watchScene(this,()=>{const words=this.renderRoot.querySelectorAll<HTMLElement>('.word');const mobile=matchMedia('(max-width:809px)').matches;const top=this.getBoundingClientRect().top;const start=mobile?47:362;const step=118;const stage=matchMedia('(prefers-reduced-motion: reduce)').matches?6:Math.max(0,Math.min(6,Math.floor((innerHeight-top-start)/step)+1));if(stage===previous)return;previous=stage;const count=words.length;const thresholds=[1,6,10,12,14,21].map(n=>Math.round(n/21*count));const lit=stage?thresholds[stage-1]:0;this.colors.forEach(a=>a.stop());this.colors=Array.from(words).map((word,i)=>animate(word,{color:i<lit?'rgba(255,255,255,1)':'rgba(255,255,255,.1)'},{type:'spring',bounce:.2,duration:1}));this.dataset.motionStage=String(stage);});}

  disconnectedCallback(){this.stop?.();this.colors.forEach(a=>a.stop());super.disconnectedCallback();}
  render(){const s=this.settings;return html`<section class="section wrap"><p class="eyebrow">${s.eyebrow}</p><h2 class="text" aria-label=${s.text}>${s.text.split(/(\s+)/).map((word:string)=>/^\s+$/.test(word)?word:html`<span class="word" aria-hidden="true">${word}</span>`)}</h2></section>`;}
}
