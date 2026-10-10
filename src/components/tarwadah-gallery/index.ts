import { css, html } from 'lit';
import { TarwadahElement, sharedStyles } from '../../shared/base';
import { watchScene, springChannel } from '../../shared/motion';
import { imageLens } from '../../shared/lens';
import { targetProgress, galleryFrame } from '../../shared/reference-motion';
export default class TarwadahGallery extends TarwadahElement {
  protected section='gallery' as const;
  private stop?:()=>void;
  private lenses:Array<()=>void>=[];
  private channels:Array<ReturnType<typeof springChannel>>=[];
  static styles=[sharedStyles,css`
    .gallery{position:relative;height:1245px;max-width:1440px;margin:auto;padding:0 0 130px;overflow:visible}.images{position:relative;height:1115px;width:calc(100% - 254px);max-width:1186px;margin:auto}.image{position:absolute;overflow:hidden;border:1px solid #7d7d7d;will-change:transform}.image:nth-child(1){width:48.314%;aspect-ratio:573/376.453;bottom:9px;left:0}.image:nth-child(2){width:29.595%;aspect-ratio:351/508.016;left:28.583%;top:70px}.image:nth-child(3){width:35.076%;aspect-ratio:416/616;right:0;bottom:37px}
    @media(min-width:810px) and (max-width:1199px){.images{width:calc(100% - 100px)}}
    @media(max-width:809px){.gallery{height:1143px;overflow:hidden;padding:0}.images{width:1186px;height:1143px;left:50%;margin:0;transform:translateX(-50%)}.image:nth-child(1){width:573px;aspect-ratio:573/376.453;bottom:-44px;left:557.406px}.image:nth-child(2){width:351px;aspect-ratio:351/508.016;left:339px;top:70px}.image:nth-child(3){width:416px;aspect-ratio:416/616;left:461px;right:auto;bottom:157px}}

  `];
  protected startMotion(){this.stop?.();this.channels.forEach(c=>c.destroy());this.channels=[];this.lenses.forEach(stop=>stop());this.lenses=[];const figures=this.renderRoot.querySelectorAll<HTMLElement>('.image');figures.forEach((figure,i)=>{this.lenses.push(imageLens(figure,figure.querySelector('img')!,[.8,.5,.6][i]));this.channels.push(springChannel(0,p=>{const f=galleryFrame(p,innerWidth)[i];const mobile=matchMedia('(max-width:809px)').matches;const tablet=!mobile&&matchMedia('(max-width:1199px)').matches;const scale=f.scale;figure.style.transform=(mobile&&i===0||tablet&&i===1?'translateX(-50%) ':'')+'translate('+f.x+'px,'+f.y+'px) scale('+scale+')';},165,80));});this.stop=watchScene(this,()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const box=this.getBoundingClientRect();const progress=reduced?1:targetProgress(box.top,box.height,innerHeight);this.channels.forEach(c=>c.set(progress));this.dataset.motionProgress=progress.toFixed(3);});}

  disconnectedCallback(){this.stop?.();this.channels.forEach(c=>c.destroy());this.lenses.forEach(stop=>stop());super.disconnectedCallback();}
  render(){const s=this.settings;return html`<section class="gallery" aria-label=${s.label}><div class="images">${s.images.map((item:any)=>html`<figure class="image"><img src=${item.image} alt=${item.alt} loading="lazy"></figure>`)}</div></section>`;}
}
