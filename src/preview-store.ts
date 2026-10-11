import {html,render} from 'lit';
import {language} from './shared/locale';
import {suspendSmoothScroll} from './shared/smooth-scroll';
import {previewStoreDefaults,previewTargets,validatePreviewStore,type PreviewStore} from './shared/preview-store-config';

// Development-only store identity; production headers belong to the Salla theme.
export function initPreviewStore(closeMenu:()=>void){
  let settings:PreviewStore=structuredClone(previewStoreDefaults);
  const dialog=document.createElement('dialog');dialog.className='preview-store-dialog';dialog.setAttribute('aria-labelledby','preview-store-heading');dialog.setAttribute('data-lenis-prevent','');
  let releaseScroll:(()=>void)|undefined;
  dialog.addEventListener('close',()=>{releaseScroll?.();releaseScroll=undefined;});
  document.body.append(dialog);
  const trigger=document.querySelector<HTMLButtonElement>('.store-settings')!;
  const brand=document.querySelector<HTMLAnchorElement>('.brand')!;
  const footerBrand=document.querySelector<HTMLElement>('.footer-brand')!;
  function apply(){
    closeMenu();
    const name=settings.name[language()]||settings.name.ar||settings.name.en;
    render(settings.logo?html`<img src=${settings.logo} alt=${name}>`:html`${name}`,brand);brand.hidden=!name&&!settings.logo;brand.setAttribute('aria-label',name);
    const footerLogo=settings.footer_logo||settings.logo;
    render(footerLogo?html`<img src=${footerLogo} alt=${name} loading="lazy">`:html`${name}`,footerBrand);footerBrand.hidden=!name&&!footerLogo;
    document.title=name|| (language()==='ar'?'معاينة صفحة الهبوط':'Landing page preview');
    let icon=document.querySelector<HTMLLinkElement>('#preview-store-icon');
    if(settings.logo){if(!icon){icon=document.createElement('link');icon.id='preview-store-icon';icon.rel='icon';document.head.append(icon);}icon.href=settings.logo;}else icon?.remove();
    for(const nav of document.querySelectorAll<HTMLElement>('.preview-menu,.footer-row nav')){
      nav.replaceChildren();for(const item of settings.navigation){
        if(!document.getElementById(item.target))continue;
        const link=document.createElement('a');link.href=`#${item.target}`;link.textContent=item.label[language()]||item.label.ar||item.label.en;
        if(link.textContent)nav.append(link);
      }
    }
    trigger.textContent=language()==='ar'?'إعدادات المتجر للمعاينة':'Preview store settings';
  }
  function editor(){
    render(null,dialog);
    const input=(name:string,value:string,dir='auto')=>html`<input name=${name} value=${value} dir=${dir} maxlength="200">`;
    render(html`<form method="dialog" @submit=${save}>
      <div class="store-settings-heading"><h2 id="preview-store-heading">إعدادات المتجر للمعاينة</h2><button type="button" aria-label="إغلاق" @click=${()=>dialog.close()}>×</button></div>
      <p>هذه إعدادات المعاينة المحلية. المتجر الحقيقي يستخدم شعار واسم المتجر من إعدادات سلة.</p>
      <div class="store-settings-grid"><label>اسم المتجر بالعربي${input('name-ar',settings.name.ar,'rtl')}</label><label>Store name in English${input('name-en',settings.name.en,'ltr')}</label></div>
      ${(['logo','footer_logo'] as const).map(key=>html`<label>${key==='logo'?'شعار الهيدر':'شعار الفوتر (اختياري)'}<input name=${key} value=${settings[key]} dir="ltr" maxlength="2048" placeholder="https://… أو /demo-uploads/…"></label><label>رفع صورة<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" @change=${(e:Event)=>upload(e,key)}></label>`)}
      <h3>روابط القائمة والفوتر</h3>
      ${settings.navigation.map((item,i)=>html`<fieldset><legend>الرابط ${i+1}</legend><label>القسم<select name=${`target-${i}`}>${previewTargets.map(target=>html`<option value=${target} ?selected=${target===item.target}>${({hero:'مقدمة المنتج',highlights:'أبرز التفاصيل',sound:'قصة المنتج',gallery:'معرض الصور',features:'المميزات والفوائد',video:'فيديو المنتج',testimonials:'آراء العملاء','buy-now':'تفاصيل المنتج والشراء'})[target]}</option>`)}</select></label><div class="store-settings-grid"><label>النص بالعربي${input(`ar-${i}`,item.label.ar,'rtl')}</label><label>English label${input(`en-${i}`,item.label.en,'ltr')}</label></div><p>اترك النص فارغًا باللغتين لإخفاء الرابط.</p></fieldset>`)}
      <p class="store-settings-status" role="status"></p><button class="store-settings-save" type="submit">حفظ إعدادات المتجر</button>
    </form>`,dialog);
  }
  function status(message:string){dialog.querySelector<HTMLElement>('.store-settings-status')!.textContent=message;}
  async function upload(event:Event,key:'logo'|'footer_logo'){
    const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return;
    const button=dialog.querySelector<HTMLButtonElement>('[type=submit]')!;button.disabled=true;
    try{status('جارٍ رفع الصورة…');const data=new FormData();data.set('file',file);const response=await fetch('/__tarwadah/uploads',{method:'POST',body:data});const result=await response.json();if(!response.ok)throw new Error();dialog.querySelector<HTMLInputElement>(`input[name=${key}]`)!.value=result.data.url;status('تم رفع الصورة. احفظ الإعدادات لتطبيقها.');}
    catch{status('تعذّر رفع الصورة. استخدم PNG أو JPEG أو GIF أو WebP حتى 10 ميجابايت.');}finally{button.disabled=false;}
  }
  async function save(event:Event){
    event.preventDefault();const button=dialog.querySelector<HTMLButtonElement>('[type=submit]')!;button.disabled=true;
    try{
      const form=new FormData(event.target as HTMLFormElement);const get=(name:string)=>String(form.get(name)||'');
      const updated=validatePreviewStore({name:{ar:get('name-ar'),en:get('name-en')},logo:get('logo'),footer_logo:get('footer_logo'),navigation:settings.navigation.map((_,i)=>({target:get(`target-${i}`),label:{ar:get(`ar-${i}`),en:get(`en-${i}`)}}))});
      const response=await fetch('/__tarwadah/store-settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(updated)});if(!response.ok)throw new Error();
      settings=updated;closeMenu();apply();dialog.close();
    }catch{status('تعذّر الحفظ. راجع روابط الصور وحاول مجددًا.');}finally{button.disabled=false;}
  }
  async function load(){try{const response=await fetch('/__tarwadah/store-settings');if(response.ok)settings=validatePreviewStore(await response.json());}catch{/* Keep an empty store identity until configured. */}apply();}
  trigger.onclick=()=>{closeMenu();editor();dialog.showModal();releaseScroll=suspendSmoothScroll(dialog);};
  window.addEventListener('focus',()=>{if(!dialog.open)void load();});
  apply();void load();
  return {translate:apply};
}
