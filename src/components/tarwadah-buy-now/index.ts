import { localizedString } from '../../shared/locale';
import { css, html, type PropertyValues } from 'lit';
import { specIcon } from '../../shared/spec-icons';
import { animate } from 'motion';
import { suspendSmoothScroll } from '../../shared/smooth-scroll';
import { state } from 'lit/decorators.js';
import { sharedStyles } from '../../shared/base';
import { TarwadahProductElement, storefront } from '../../shared/product';

export default class TarwadahBuyNow extends TarwadahProductElement {
  protected section='buy-now' as const;
  @state() private selected=0;
  @state() private quantity=1;
  @state() private notice=false;
  @state() private optionImage='';
  @state() private activeSpec=0;
  private modalAnimation?:ReturnType<typeof animate>;
  private releaseScroll?:()=>void;
  private closingSpecs=false;
  private mountedProduct:number|string=0;
  private slideAnimation?:ReturnType<typeof animate>;
  private resizeSlides?:ResizeObserver;
  private resizeHeader?:ResizeObserver;
  private measureHeader=()=>{const card=this.renderRoot.querySelector<HTMLElement>('.card');const description=this.renderRoot.querySelector<HTMLElement>('.description');if(card&&description)card.style.setProperty('--header-bottom',`${description.getBoundingClientRect().bottom-card.getBoundingClientRect().top}px`);};
  private slidePointer?:{x:number;id:number};
  private get productImages(){return [...new Set([this.productData?.image?.url,...(this.productData?.images||[]).map(i=>i.url),this.optionImage].filter(Boolean))] as string[];}
  private slideTo(){const track=this.renderRoot.querySelector<HTMLElement>('.slides');if(!track)return;const photo=track.parentElement!;const index=this.productId?Math.max(0,this.productImages.indexOf(this.optionImage||this.productData?.image?.url||this.productImages[0])):Math.min(this.selected,Math.max(0,this.settings.variants.length-1));this.slideAnimation?.stop();if(matchMedia('(prefers-reduced-motion: reduce)').matches){track.style.transform='translateX('+(-index*photo.clientWidth)+'px)';return;}this.slideAnimation=animate(track,{x:-index*photo.clientWidth},{type:'spring',bounce:0});}
  private swipeStart=(event:PointerEvent)=>{if(this.productId)return;this.slidePointer={x:event.clientX,id:event.pointerId};(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);};
  private swipeEnd=(event:PointerEvent)=>{if(!this.slidePointer)return;const delta=event.clientX-this.slidePointer.x;this.slidePointer=undefined;const width=(event.currentTarget as HTMLElement).clientWidth;if(Math.abs(delta)>width/4)this.selected=Math.max(0,Math.min(this.settings.variants.length-1,this.selected+(delta<0?1:-1)));};
  private purchaseForm?:HTMLFormElement;
  static styles=[sharedStyles,css`
    .section{padding-block:120px 100px}.card{position:relative;border:1px solid #ffffff20;border-radius:4px;background:#000;padding:39px;max-width:601px;margin:auto;min-height:384px}.info{display:flex;flex-direction:column}h2{font-family:'TW Instrument',serif;font-size:44px;letter-spacing:-.04em;font-weight:400;line-height:1.1;max-width:330px}.description{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em;margin-top:2px;color:#7d7d7d}.specs{margin-top:22.2px;max-width:340px}.specs-toggle{background:none;border:0;padding:0;cursor:pointer;color:inherit;font:inherit;text-decoration:inherit}.specs h3{position:absolute;top:49.4px;inset-inline-end:40px;font-family:'TW Roboto Mono',monospace;font-size:16px;font-weight:400;text-decoration:underline;text-underline-offset:3px;color:#bfbfbf}.specs li{font-family:'TW Roboto Mono',monospace;color:#bbb;font-size:16px;letter-spacing:-.02em;line-height:19.2px;list-style:none;display:flex;gap:8px;align-items:center}.specs li+li{margin-top:8px}.spec-icon{display:grid;place-items:center}.spec-icon svg{width:14px;height:14px;overflow:visible}.spec-icon{width:16px;height:16px;flex:none;color:#bfbfbf}.specs ul{margin:0;padding:0}.swatches{margin-top:12px}.swatches>.mono{display:none}.colors{display:flex;gap:8px;flex-wrap:wrap}.color{border:0;color:#7d7d7d;background:none;padding:0 4px 0 0;font-family:'TW Roboto Mono',monospace;font-size:14px;line-height:19px;letter-spacing:0}.color[aria-pressed=true]{color:var(--tw-accent)}.dot{display:none}.price{font-family:'TW Roboto Mono',monospace;font-size:20px;line-height:26px;color:#8a8a8a;margin-block:12px 0}.gallery{position:absolute;inset-inline-end:39px;top:128.6px;width:147px}.photo{aspect-ratio:1;overflow:hidden;border:1px solid #ffffff12}.photo{touch-action:pan-y}.slides{display:flex;height:100%;will-change:transform;direction:ltr}.slide{width:100%;height:100%;flex:0 0 100%}.photo img{object-fit:contain;background:#000;user-select:none}.actions{display:flex;gap:10px;align-items:stretch;margin-top:26.2px}.quantity{display:flex;align-items:center;background:#222;border-radius:5px;color:#7d7d7d}.quantity{width:109px;justify-content:center;height:44px}.quantity button{background:none;color:inherit;border:0;padding:0;width:32px;height:44px;display:grid;place-items:center;font-size:20px}.quantity output{font-size:16px}.quantity output{min-width:20px;text-align:center;font-family:'TW Roboto Mono',monospace}.actions .button{flex:1;background:#fff;color:#000;font-family:'TW Roboto Mono',monospace;font-size:16px;border-radius:4px;padding:12px 20px;line-height:20px;height:44px}.actions .button:hover{background:var(--tw-accent)}.message{margin-top:16px;color:#bfbfbf;font-size:12px}.native{margin-top:0}::slotted(form){width:100%}
    @media(max-width:809px){.section{padding:120px 0 100px}.card{padding:39px;min-height:705px;max-width:100%}h2{font-size:44px;max-width:none}.description{font-size:16px;max-width:none}.specs{margin-top:290.4px;max-width:none}.specs-toggle{background:none;border:0;padding:0;cursor:pointer;color:inherit;font:inherit;text-decoration:inherit}.specs h3{position:absolute;top:123px;inset-inline-start:39px;inset-inline-end:auto;font-size:16px}.specs li{font-size:16px}.gallery{inset-inline-start:39px;inset-inline-end:auto;top:175px;width:200px}.specs ul{max-width:none;padding:0}.price{font-size:20px}.actions{margin-top:24px;flex-direction:column;gap:10px}.quantity{width:100%;justify-content:space-around;height:45px}.quantity button{height:45px;width:60px}.actions .button{font-size:16px;padding:11px 32px 12px;flex:none}.colors{gap:8px}.color{font-size:14px}}
    .card.real-product .gallery{top:calc(var(--header-bottom,110px) + 19px)}
    @media(max-width:809px){.card.real-product .gallery{top:calc(var(--header-bottom,109px) + 66px)}.card.real-product .specs h3{top:calc(var(--header-bottom,109px) + 14px)}}
    :host([dir=rtl]) .card{min-height:0}:host([dir=rtl]) .specs li{align-items:flex-start}

    .spec-dialog{background:transparent;color:inherit;border:0;padding:0;width:390px;max-width:calc(100vw - 40px);max-height:90svh;overflow:auto;scrollbar-width:none}.spec-dialog::backdrop{background:rgba(0,0,0,.8)}.spec-dialog h2{font-size:44px;text-align:center;max-width:none;margin-bottom:20px}.spec-group{border:1px solid #ffffff20;border-radius:4px;background:#000;margin-top:4px;padding:16px 17px}.spec-heading{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.04em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:start;background:none;border:0;padding:0;color:inherit;width:100%}.spec-plus{position:relative;width:16px;height:16px;flex:none}.spec-plus::before,.spec-plus::after{content:'';position:absolute;inset:7px 1px auto;height:1px;background:#bfbfbf}.spec-plus::after{transform:rotate(90deg);transition:transform .3s ease}.spec-heading[aria-expanded=true] .spec-plus::after{transform:rotate(0)}.spec-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.22,1,.36,1)}.spec-panel.expanded{grid-template-rows:1fr}.spec-panel-inner{min-height:0;overflow:hidden}.spec-body{border-top:1px solid #ffffff10;margin-top:16px;padding-top:10px;display:flex;flex-direction:column;gap:4px}.spec-dialog.closing::backdrop{background:transparent}.spec-dialog::backdrop{transition:background .2s ease}.spec-heading:focus-visible,.spec-close:focus-visible{outline:1px solid var(--tw-accent);outline-offset:4px}@media(prefers-reduced-motion:reduce){.spec-panel,.spec-plus::after,.spec-dialog::backdrop{transition:none}}.spec-body p,.spec-row{font-family:'TW Roboto Mono',monospace;font-size:14px;line-height:19.6px;color:#bfbfbf}.spec-body p:first-child,.spec-body .spec-gap+p{color:#505050;font-size:16px;margin-bottom:4px}.spec-row{display:grid;grid-template-columns:1fr 1.15fr;gap:12px}.spec-gap{height:8px}.spec-close{display:block;margin:24px auto 0;background:none;border:0;color:#bfbfbf;text-decoration:underline;font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:20px}.spec-close:hover{color:var(--tw-accent)}
  `];
  protected updated(changed:PropertyValues){
    super.updated(changed);
    if(changed.has('selected')||changed.has('config')||changed.has('optionImage')||changed.has('productData')){this.slideTo();}
    if(!this.resizeSlides){const photo=this.renderRoot.querySelector('.photo');if(photo){this.resizeSlides=new ResizeObserver(()=>this.slideTo());this.resizeSlides.observe(photo);}}
    if(!this.resizeHeader){this.resizeHeader=new ResizeObserver(this.measureHeader);for(const header of this.renderRoot.querySelectorAll('h2:not(.spec-dialog h2),.description'))this.resizeHeader.observe(header);}
    this.measureHeader();
    const id=this.productData?.id||0;
    if(id!==this.mountedProduct)this.optionImage='';
    if(id!==this.mountedProduct||changed.has('config')){this.mountPurchase();}
  }
  private previewAdd(){
    this.notice=true;
    if(!document.body.dataset.tarwadahPreview)return;
    const variant=this.settings.variants?.[this.selected];
    const price=this.productData?.sale_price??(typeof this.productData?.price==='object'?this.productData.price.amount:this.productData?.price);
    this.dispatchEvent(new CustomEvent('tarwadah:preview-cart-add',{bubbles:true,composed:true,detail:{
      key:`${this.section}:${this.selected}`,name:this.productName,
      variant:variant?.name||'',image:variant?.image||'',quantity:this.quantity,
      price:price??Number(String(this.settings.price).replace(/[^0-9.]/g,'')),
      currency:this.productData?.currency||(String(this.settings.price).includes('$')?'USD':'SAR'),
    }}));
  }
  private openSpecs(){
    const dialog=this.renderRoot.querySelector<HTMLDialogElement>('.spec-dialog')!;
    if(dialog.open)return;
    this.activeSpec=0;this.closingSpecs=false;dialog.classList.remove('closing');dialog.style.removeProperty('opacity');dialog.style.removeProperty('transform');
    dialog.showModal();this.releaseScroll=suspendSmoothScroll(this);
    const cursor=document.querySelector('.tarwadah-cursor');if(cursor)dialog.append(cursor);
    this.modalAnimation?.stop();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)this.modalAnimation=animate(dialog,{opacity:[0,1],y:[12,0]},{duration:.25,ease:[.22,1,.36,1]});
  }
  private async closeSpecs(){
    const dialog=this.renderRoot.querySelector<HTMLDialogElement>('.spec-dialog')!;
    if(!dialog.open||this.closingSpecs)return;
    this.closingSpecs=true;this.modalAnimation?.stop();dialog.classList.add('closing');
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){this.modalAnimation=animate(dialog,{opacity:0,y:8},{duration:.18});await this.modalAnimation;}
    dialog.close();this.restoreCursor();
  }
  private restoreCursor(){
    const cursor=this.renderRoot.querySelector('.tarwadah-cursor');if(cursor)document.body.append(cursor);
    this.releaseScroll?.();this.releaseScroll=undefined;this.closingSpecs=false;
  }
  private mountPurchase(){
    this.purchaseForm?.remove();this.purchaseForm=undefined;this.mountedProduct=this.productData?.id||0;
    const product=this.productData;
    if(!product||this.demoProduct)return;
    // Keep Salla controls in light DOM: native options and cart form discovery
    // use document selectors and the theme's CSS, which cannot cross a shadow root.
    const form=document.createElement('form');form.slot='purchase';form.className='tw-native-purchase';form.method='post';form.enctype='multipart/form-data';
    form.addEventListener('submit',(event)=>{event.preventDefault();storefront().form.onSubmit('cart.addItem',event);});
    const id=document.createElement('input');id.type='hidden';id.name='id';id.value=String(product.id);form.append(id);
    if(product.options?.length){
      const options=document.createElement('salla-product-options');options.setAttribute('product-id',String(product.id));(options as any).options=product.options;
      options.addEventListener('changed',(event)=>{const detail=(event as CustomEvent).detail?.detail;const image=detail?.image;this.optionImage=typeof image==='string'?image:image?.url||'';});
      form.append(options);
    }
    const price=document.createElement('p');price.className='tw-purchase-price';price.append(this.formattedPrice);
    if(this.formattedRegularPrice){const regular=document.createElement('del');regular.textContent=this.formattedRegularPrice;price.append(regular);}form.append(price);
    const actions=document.createElement('div');actions.className='tw-purchase-actions';form.append(actions);
    if(product.is_hidden_quantity){const qty=document.createElement('input');qty.type='hidden';qty.name='quantity';qty.value='1';actions.append(qty);}
    else{const qty=document.createElement('salla-quantity-input');qty.setAttribute('name','quantity');qty.setAttribute('value','1');qty.setAttribute('aria-label',this.settings.quantity_label);if(product.max_quantity)qty.setAttribute('max',String(product.max_quantity));actions.append(qty);}
    const button=document.createElement('salla-add-product-button');button.setAttribute('product-id',String(product.id));button.setAttribute('product-status',product.status||'sale');button.setAttribute('product-type',product.type||'product');button.setAttribute('width','wide');button.setAttribute('type','submit');button.textContent=this.settings.cta_label;actions.append(button);
    this.purchaseForm=form;this.append(form);
    if(!document.getElementById('tw-purchase-styles')){const style=document.createElement('style');style.id='tw-purchase-styles';style.textContent=`
      [data-section="buy-now"] .tw-native-purchase{display:block;color:inherit;margin-top:12px;--color-primary:#fff;--color-primary-reverse:#000}
      [data-section="buy-now"] .tw-purchase-price{font-family:'TW Roboto Mono',monospace;font-size:20px;line-height:26px;color:#8a8a8a;margin:12px 0 0}
      [data-section="buy-now"] .tw-purchase-price del{font-size:14px;margin-inline-start:8px}
      [data-section="buy-now"] .tw-purchase-actions{display:flex;gap:10px;align-items:stretch;margin-top:26.2px}
      [data-section="buy-now"] .tw-purchase-actions salla-add-product-button{flex:1;min-width:0;--color-primary:#fff;--color-primary-reverse:#000}
      [data-section="buy-now"] .tw-purchase-actions salla-add-product-button .s-button-element{min-height:44px;border-radius:4px;font-family:'TW Roboto Mono',monospace;font-size:16px;background:#fff;color:#000;border-color:#fff}
      [data-section="buy-now"] .tw-purchase-actions salla-add-product-button .s-button-element:hover{background:var(--tw-accent,#f17b0e);border-color:var(--tw-accent,#f17b0e)}
      [data-section="buy-now"] .tw-purchase-actions salla-quantity-input{width:109px;flex:0 0 109px;max-width:none;direction:ltr}
      [data-section="buy-now"] .tw-purchase-actions .s-quantity-input-container{height:44px;width:100%;background:#222;border:0;border-radius:5px;color:#7d7d7d}
      [data-section="buy-now"] .tw-purchase-actions .s-quantity-input-input{font-family:'TW Roboto Mono',monospace;color:#7d7d7d;background:transparent}
      [data-section="buy-now"] .tw-native-purchase salla-product-options{display:block;max-width:340px;font-family:'TW Roboto Mono',monospace}
      @media(max-width:809px){[data-section="buy-now"] .tw-purchase-actions{flex-direction:column;margin-top:24px}[data-section="buy-now"] .tw-purchase-actions salla-quantity-input{width:100%;flex:auto}[data-section="buy-now"] .tw-purchase-actions salla-add-product-button{flex:auto}[data-section="buy-now"] .tw-native-purchase salla-product-options{max-width:none}}
      `;document.head.append(style);}
  }
  disconnectedCallback(){this.modalAnimation?.stop();this.renderRoot.querySelector<HTMLDialogElement>('.spec-dialog')?.close();this.restoreCursor();this.slideAnimation?.stop();this.resizeSlides?.disconnect();this.resizeSlides=undefined;this.resizeHeader?.disconnect();this.resizeHeader=undefined;this.purchaseForm?.remove();this.mountedProduct=0;super.disconnectedCallback();}
  render(){
    const s=this.settings;const variants=s.variants||[];const variant=variants[Math.min(this.selected,Math.max(0,variants.length-1))];const product=this.productData;
    const image=this.productId?(this.optionImage||product?.image?.url||product?.images?.[0]?.url):variant?.image;
    return html`<section class="section wrap" aria-label=${this.productName}><div class=${`card ${this.productId?'real-product':''}`}><div class="info"><h2>${this.productName}</h2><p class="description mono">${localizedString(s.description)}</p><div class="specs"><h3 class="mono"><button class="specs-toggle" @click=${this.openSpecs}>${localizedString(s.specs_label)}</button></h3><ul>${s.specs.map((item:any,i:number)=>html`<li class="mono"><span class="spec-icon" aria-hidden="true">${specIcon(i)}</span><span>${localizedString(item.text)}</span></li>`)}</ul></div>
      ${!this.productId?html`<div class="swatches"><p class="mono">${localizedString(s.color_label)}</p><div class="colors">${variants.map((item:any,i:number)=>html`<button class="color mono" aria-pressed=${this.selected===i} @click=${()=>this.selected=i}><span class="dot" style="--swatch:${item.color}"></span>${localizedString(item.name)}</button>`)}</div></div>`:''}
      ${!this.productId?html`<p class="price mono">${this.formattedPrice} ${this.formattedRegularPrice?html`<del style="font-size:14px;margin-inline-start:8px">${this.formattedRegularPrice}</del>`:''}</p>`:''}<div class="native"><slot name="purchase"></slot></div>
      ${this.productLoading?html`<p class="message mono" role="status">${localizedString(s.loading_message)}</p>`:''}${this.productError?html`<p class="message mono" role="alert">${localizedString(s.error_message)}</p>`:''}
      ${!this.productId?html`<div class="actions"><div class="quantity" aria-label=${localizedString(s.quantity_label)}><button aria-label=${this.ui.decrease} ?disabled=${this.quantity<=1} @click=${()=>this.quantity=Math.max(1,this.quantity-1)}>−</button><output aria-live="polite">${this.quantity}</output><button aria-label=${this.ui.increase} @click=${()=>this.quantity=Math.min(99,this.quantity+1)}>+</button></div><button class="button" ?disabled=${this.productUnavailable||!this.isDemo} @click=${this.previewAdd}>${this.productUnavailable?localizedString(s.sold_out_label):localizedString(s.cta_label)}</button></div>${this.notice||(!this.productId&&!this.isDemo)?html`<p class="message mono" role="status">${this.demoProduct?localizedString(s.demo_message):localizedString(s.preview_message)}</p>`:''}`:''}
    </div><div class="gallery"><figure class="photo" @pointerdown=${this.swipeStart} @pointerup=${this.swipeEnd} @pointercancel=${()=>this.slidePointer=undefined}><div class="slides">${this.productId?(image?this.productImages.map(src=>html`<div class="slide" aria-hidden=${src!==image}><img src=${src} alt=${this.productName} draggable="false"></div>`):html`<p class="message mono">${localizedString(s.loading_message)}</p>`):variants.map((item:any,i:number)=>html`<div class="slide" aria-hidden=${i!==this.selected}><img src=${item.image} alt=${`${this.productName} — ${localizedString(item.name)}`} draggable="false"></div>`)}</div></figure></div></div><dialog class="spec-dialog" aria-label=${localizedString(s.details_title)} @close=${this.restoreCursor} @cancel=${(event:Event)=>{event.preventDefault();void this.closeSpecs();}} @click=${(event:Event)=>{if(event.target===event.currentTarget){const mouse=event as MouseEvent;const box=(event.currentTarget as HTMLElement).getBoundingClientRect();if(mouse.clientX<box.left||mouse.clientX>box.right||mouse.clientY<box.top||mouse.clientY>box.bottom)void this.closeSpecs();}}}><h2>${localizedString(s.details_title)}</h2>${(s.detailed_specs||[]).map((group:any,i:number)=>html`<div class="spec-group"><button class="spec-heading" aria-expanded=${this.activeSpec===i} aria-controls=${`spec-panel-${i}`} @click=${()=>this.activeSpec=this.activeSpec===i?-1:i}>${localizedString(group.title)}<span class="spec-plus" aria-hidden="true"></span></button><div id=${`spec-panel-${i}`} class=${`spec-panel ${this.activeSpec===i?'expanded':''}`} ?inert=${this.activeSpec!==i}><div class="spec-panel-inner"><div class="spec-body">${localizedString(group.body).split('\n').map((line:string)=>{const parts=line.split('|');return !line?html`<div class="spec-gap"></div>`:parts.length>1?html`<div class="spec-row"><span>${parts[0].trim()}</span><span>${parts.slice(1).join('|').trim()}</span></div>`:html`<p>${line}</p>`;})}</div></div></div></div>`)}<button class="spec-close" @click=${this.closeSpecs}>${localizedString(s.close_label)}</button></dialog></section>`;
  }
}
