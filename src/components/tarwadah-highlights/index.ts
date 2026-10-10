import { css, html } from 'lit';
import { TarwadahElement, sharedStyles } from '../../shared/base';
import { imageLens } from '../../shared/lens';
import { highlightTravel } from '../../shared/reference-motion';
import { watchScene, scrollPosition } from '../../shared/motion';
export default class TarwadahHighlights extends TarwadahElement {
  protected section = 'highlights' as const;
  private cleanup: Array<()=>void> = [];
  static styles = [sharedStyles, css`
    .section{height:907px;padding-top:130px;position:relative}.heading{text-align:center;max-width:264px;margin:auto}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin-bottom:4px;color:#bfbfbf}h2{font-size:36px;font-weight:500;letter-spacing:-.06em;line-height:1}.heading .mono{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em;margin-top:24px;color:#bfbfbf}.cards{position:absolute;inset:0;max-width:1040px;margin:auto;pointer-events:none}.card{position:absolute;width:254px;height:362px;overflow:hidden;background:#080808;pointer-events:auto;transform:translateY(var(--offset,0px))}.card p{position:absolute;z-index:2;bottom:16px;inset-inline:16px;font-size:20px;font-weight:500;line-height:1.2;letter-spacing:-.06em;text-shadow:0 2px 8px #000}.card:nth-child(1){inset-inline-start:0;top:221.89px}.card:nth-child(2){inset-inline-start:calc(50% - 127px);top:295.23px}.card:nth-child(3){inset-inline-end:0;top:400.14px}.caption{position:absolute;inset-inline-end:46px;top:773.203px;color:#bfbfbf;font-family:'TW Roboto Mono',monospace;font-size:14px;letter-spacing:-.02em}
    @media(min-width:810px) and (max-width:1199px){.cards{max-width:calc(100% - 100px)}.card{width:220px;height:314px}.card:nth-child(2){inset-inline-start:calc(50% - 110px)}h2{font-size:28px}}
    @media(max-width:809px){.section{height:1187px;padding-top:130px;overflow:hidden}.heading{max-width:264px}h2{font-size:28px}.cards{max-width:390px}.card:nth-child(1){inset-inline-start:-41px;top:571px}.card:nth-child(2){inset-inline-start:calc(50% - 127px);top:140.984px}.card:nth-child(3){inset-inline-end:-41px;top:694px}.caption{inset-inline-end:20px;top:1053.203px}.card p{font-size:19px}}
    @media(max-width:809px){:host([dir="rtl"]) .section{height:1242px}:host([dir="rtl"]) .card:nth-child(1){top:626px}:host([dir="rtl"]) .card:nth-child(2){top:195.984px}:host([dir="rtl"]) .card:nth-child(3){top:749px}:host([dir="rtl"]) .caption{top:1108.203px}}
  `];
  protected startMotion(){this.cleanup.forEach(stop=>stop());this.cleanup=[];this.renderRoot.querySelectorAll<HTMLElement>('.card').forEach(card=>this.cleanup.push(imageLens(card,card.querySelector('img')!)));this.cleanup.push(watchScene(this,()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const scroll=scrollPosition(this);const offsets=highlightTravel(scroll,matchMedia('(max-width:809px)').matches);this.renderRoot.querySelector<HTMLElement>('.caption')!.style.transform='translateY('+(reduced?0:-scroll*.07)+'px)';this.renderRoot.querySelectorAll<HTMLElement>('.card').forEach((card,i)=>card.style.setProperty('--offset',(reduced?0:offsets[i])+'px'));}));}

  disconnectedCallback(){this.cleanup.forEach(stop=>stop());super.disconnectedCallback();}
  render(){const s=this.settings;return html`<section class="section wrap" aria-label=${s.eyebrow}><header class="heading"><p class="eyebrow">${s.eyebrow}</p><h2>${s.title}</h2><p class="mono">${s.description}</p></header><div class="cards">${s.items.map((item:any)=>html`<figure class="card"><img src=${item.image} alt=${item.title} loading="lazy"><p>${item.title}</p></figure>`)}<p class="caption mono">${s.caption}</p></div></section>`;}
}
