import { state } from 'lit/decorators.js';
import { TarwadahElement, type Config } from './base';
import { selectedProductId, fetchStoreProduct, mockProduct } from './product-api';
import type { PropertyValues } from 'lit';

export type StoreProduct = {
  id: number|string; name: string; url?: string; status?: string; type?: string;
  price?: number | { amount: number; currency?: string }; sale_price?: number;
  regular_price?:number;is_on_sale?:boolean;currency?: string; image?: { url: string; alt?: string }; images?: { url: string }[];
  options?: unknown[]; max_quantity?: number; is_hidden_quantity?: boolean;
};
export function storefront(): any { return (window as any).salla || (window as any).Salla; }
let demoSettings:Promise<any>|undefined;
let demoExpires=0;
function readDemoSettings(){if(!demoSettings||Date.now()>demoExpires){demoExpires=Date.now()+1200;demoSettings=fetch('/__salla_demo/product-settings').then(response=>response.ok?response.json():null).catch(()=>null);}return demoSettings;}
const requests = new Map<number, Promise<StoreProduct>>();
async function details(id: number) {
  if(!requests.has(id))requests.set(id,fetchStoreProduct(storefront(),id).catch(error=>{requests.delete(id);throw error;}));
  return requests.get(id)!;
}

export class TarwadahProductElement extends TarwadahElement {
  @state() protected productData?: StoreProduct;
  @state() protected productLoading=false;
  @state() protected productError=false;
  protected demoProduct=false;
  private demoTimer?:ReturnType<typeof setInterval>;
  private requestedId=-1;
  private selectedChanged=()=>{if(this.requestedId!==this.productId){this.requestedId=this.productId;void this.loadProduct();}};
  connectedCallback(){super.connectedCallback();document.addEventListener('tarwadah:product-change',this.selectedChanged);if(this.isDemo)this.demoTimer=setInterval(()=>{if(!this.productId)void this.loadDemoProduct();},1500);}
  private get isDemo(){return Boolean((window as any).customComponentsRaw||document.body.dataset.tarwadahPreview);}
  private async loadDemoProduct(){if(!this.isDemo)return;try{const settings=await readDemoSettings();if(!settings)return;if(!this.isConnected||this.productId)return;const s=this.settings;const product=mockProduct(settings,s.title,s.image||s.variants?.[0]?.image);if(JSON.stringify(product)!==JSON.stringify(this.productData)){this.demoProduct=Boolean(product);this.productData=product;}}catch{/* Standalone public storefronts never use the local demo route. */}}
  protected get productUnavailable(){return this.productData?.status==='out'||this.productData?.status==='out-and-notify';}
  private generation=0;
  protected get productId() {
    const own=selectedProductId(this.settings.product);
    if(own)return own;
    for(const element of document.querySelectorAll<TarwadahProductElement>('[data-section="buy-now"],[data-section="product-strip"]')){
      if(element!==this){const id=selectedProductId(element.config.product);if(id)return id;}
    }
    return 0;
  }

  protected updated(changed:PropertyValues){
    super.updated(changed);
    this.selectedChanged();if(changed.has('config')){document.dispatchEvent(new Event('tarwadah:product-change'));if(!this.productId)void this.loadDemoProduct();}
  }
  private async loadProduct(){
    const token=++this.generation;
    const id=this.productId;
    this.demoProduct=false;this.productData=undefined;this.productError=false;this.productLoading=Boolean(id);
    if(!id){await this.loadDemoProduct();return;}
    try{const product=await details(id);if(token===this.generation&&this.isConnected)this.productData=product;}
    catch{if(token===this.generation&&this.isConnected)this.productError=true;}
    finally{if(token===this.generation&&this.isConnected)this.productLoading=false;}
  }
  protected get formattedPrice(){
    const product=this.productData;
    if(!product)return this.productId?'':this.settings.price;
    const value=product.sale_price??(typeof product.price==='object'?product.price.amount:product.price)??0;
    const sdk=storefront();
    if(sdk?.money?.format)return sdk.money.format(value);
    const currency=(typeof product.price==='object'?product.price.currency:product.currency)||'SAR';
    return new Intl.NumberFormat(document.documentElement.lang||'ar',{style:'currency',currency}).format(value);
  }
  protected get formattedRegularPrice(){
    const product=this.productData;
    const value=product?.regular_price;
    const current=product?.sale_price??(typeof product?.price==='object'?product.price.amount:product?.price)??0;
    if(!product?.is_on_sale||!value||value<=current)return '';
    const sdk=storefront();
    if(sdk?.money?.format)return sdk.money.format(value);
    const currency=(typeof product.price==='object'?product.price.currency:product.currency)||'SAR';
    return new Intl.NumberFormat(document.documentElement.lang||'ar',{style:'currency',currency}).format(value);
  }
  disconnectedCallback(){this.generation++;this.requestedId=-1;clearInterval(this.demoTimer);document.removeEventListener('tarwadah:product-change',this.selectedChanged);super.disconnectedCallback();}
}
