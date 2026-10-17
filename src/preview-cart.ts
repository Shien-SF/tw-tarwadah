import { html, render } from 'lit';
import { animate } from 'motion';
import { language, localizedString, watchLanguage } from './shared/locale';
import emptyCartImage from './assets/empty-cart.png';

type PreviewItem={key:string;name:string;variant:string;image:string;quantity:number;price:number;currency:string};

// Local preview only. The published bundle uses the merchant theme's native cart.
export function initPreviewCart(navbar:HTMLElement,closeMenu:()=>void){
  const bag=navbar.querySelector<HTMLButtonElement>('.bag')!;
  const brand=navbar.querySelector<HTMLElement>('.brand')!;
  const menu=navbar.querySelector<HTMLButtonElement>('.menu-button')!;
  const badge=bag.querySelector<HTMLElement>('.cart-count')!;
  const title=document.createElement('span');title.className='cart-title';title.setAttribute('aria-hidden','true');
  const openCount=document.createElement('output');openCount.className='cart-open-count';openCount.hidden=true;
  const close=document.createElement('button');close.type='button';close.className='cart-close';close.hidden=true;close.textContent='×';
  navbar.querySelector('.nav-head')!.append(title,openCount,close);
  const panel=document.createElement('section');panel.id='preview-cart';panel.className='preview-cart';panel.inert=true;panel.setAttribute('data-lenis-prevent','');
  panel.setAttribute('role','dialog');panel.setAttribute('aria-hidden','true');panel.setAttribute('aria-labelledby','preview-cart-title');title.id='preview-cart-title';navbar.append(panel);
  let items:PreviewItem[]=[],open=false,checkoutNotice=false;
  let animation:ReturnType<typeof animate>|undefined;
  const labels=()=>language()==='ar'?{
    title:'السلة',open:'فتح السلة',close:'إغلاق السلة',empty:'سلتك فارغة',continueShopping:'متابعة التسوق',subtotal:'الإجمالي الفرعي',
    shipping:'تُحسب رسوم الشحن والضرائب والخصومات عند إتمام الطلب.',checkout:'إتمام الطلب',
    decrease:'تقليل الكمية',increase:'زيادة الكمية',remove:'إزالة المنتج',demo:'سلة تجريبية للمعاينة؛ إتمام الطلب متاح في المتجر الحقيقي.',
  }:{title:'Cart',open:'Open cart',close:'Close cart',empty:'Your cart is empty',continueShopping:'Continue Shopping',subtotal:'Subtotal',
    shipping:'Shipping, taxes, and discount codes calculated at checkout.',checkout:'Checkout',
    decrease:'Decrease quantity',increase:'Increase quantity',remove:'Remove item',demo:'Preview cart only; checkout is available in the real store.'};
  const money=(value:number,currency:string)=>new Intl.NumberFormat(language(),{style:'currency',currency}).format(value);
  function update(){
    const l=labels();const count=items.reduce((sum,item)=>sum+item.quantity,0);
    badge.textContent=String(count);badge.hidden=!count;openCount.textContent=String(count);openCount.hidden=!open||!count;title.textContent=l.title;
    bag.setAttribute('aria-label',l.open);close.setAttribute('aria-label',l.close);close.hidden=!open;title.setAttribute('aria-hidden',String(!open));
    render(html`<div class=${`preview-cart-items ${items.length?'':'preview-cart-empty-state'}`}>${items.length?items.map(item=>html`
      <article class="preview-cart-item">
        <img src=${item.image} alt=${localizedString(item.name)}>
        <div class="preview-cart-item-info"><div class="preview-cart-item-heading"><h2>${localizedString(item.name)}</h2><span>${money(item.price,item.currency)}</span></div>
          <p class="preview-cart-variant">${localizedString(item.variant)}</p>
          <div class="preview-cart-item-actions"><div class="preview-cart-quantity"><button aria-label=${l.decrease} ?disabled=${item.quantity<=1} @click=${()=>change(item,-1)}>−</button><output>${item.quantity}</output><button aria-label=${l.increase} ?disabled=${item.quantity>=99} @click=${()=>change(item,1)}>+</button></div><button class="preview-cart-remove" aria-label=${`${l.remove}: ${localizedString(item.name)}`} @click=${()=>{items=items.filter(row=>row!==item);checkoutNotice=false;update();(panel.querySelector<HTMLButtonElement>('.preview-cart-continue')||close).focus();}}>×</button></div>
        </div>
      </article>`):html`<img class="preview-cart-empty-image" src=${emptyCartImage} width="210" height="210" alt=""><p class="preview-cart-empty" role="status">${l.empty}</p><button type="button" class="preview-cart-continue" @click=${()=>setOpen(false)}>${l.continueShopping}</button>`}</div>
      ${items.length?html`<div class="preview-cart-summary"><div class="preview-cart-subtotal"><span>${l.subtotal}</span><output aria-live="polite">${money(items.reduce((sum,item)=>sum+item.price*item.quantity,0),items[0].currency)}</output></div>
        <p>${l.shipping}</p><button class="preview-cart-checkout" ?disabled=${!items.length} @click=${()=>{checkoutNotice=true;update();}}>${l.checkout}</button>
        ${checkoutNotice?html`<p class="preview-cart-notice" role="status">${l.demo}</p>`:''}
      </div>`:''}`,panel);
  }
  function change(item:PreviewItem,amount:number){item.quantity=Math.max(1,Math.min(99,item.quantity+amount));update();}
  function setOpen(next:boolean){
    if(next===open)return;
    if(next)closeMenu();open=next;checkoutNotice=false;
    animation?.stop();navbar.classList.toggle('cart-open',open);panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));
    bag.setAttribute('aria-expanded',String(open));brand.inert=open;menu.inert=open;bag.inert=open;
    update();
    animation=animate(panel,{height:open?Math.max(0,innerHeight*.9-navbar.querySelector<HTMLElement>('.nav-head')!.offsetHeight):0},{type:'spring',bounce:0,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:.4});
    if(open)close.focus();else bag.focus();
  }
  bag.addEventListener('click',()=>setOpen(!open));close.addEventListener('click',()=>setOpen(false));
  document.addEventListener('pointerdown',event=>{if(open&&!navbar.contains(event.target as Node))setOpen(false);});
  document.addEventListener('keydown',event=>{
    if(!open)return;
    if(event.key==='Escape'){event.preventDefault();setOpen(false);}
    if(event.key==='Tab'){
      const controls=[close,...Array.from(panel.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))];
      const first=controls[0],last=controls.at(-1)!;
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('resize',()=>{if(open){animation?.stop();panel.style.height=`${Math.max(0,innerHeight*.9-navbar.querySelector<HTMLElement>('.nav-head')!.offsetHeight)}px`;}});
  document.addEventListener('tarwadah:preview-cart-add',event=>{
    const item=(event as CustomEvent<PreviewItem>).detail;
    if(!item||!Number.isFinite(item.price)||item.price<0||!Number.isFinite(item.quantity))return;
    const existing=items.find(row=>row.key===item.key);
    if(existing)existing.quantity=Math.min(99,existing.quantity+item.quantity);
    else items.push({...item,quantity:Math.max(1,Math.min(99,item.quantity))});
    update();
  });
  watchLanguage(update);update();
  return {setOpen,translate:update};
}
