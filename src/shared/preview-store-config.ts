export const previewTargets=['hero','highlights','sound','gallery','features','video','testimonials','buy-now'] as const;
export type PreviewStore={name:{ar:string;en:string};logo:string;footer_logo:string;navigation:Array<{target:string;label:{ar:string;en:string}}>};
export const previewStoreDefaults:PreviewStore={name:{ar:'',en:''},logo:'',footer_logo:'',navigation:[
  {target:'hero',label:{ar:'الرئيسية',en:'Home'}},
  {target:'highlights',label:{ar:'التفاصيل',en:'Highlights'}},
  {target:'features',label:{ar:'المميزات',en:'Features'}},
  {target:'testimonials',label:{ar:'آراء العملاء',en:'Testimonials'}},
  {target:'buy-now',label:{ar:'اشترِ الآن',en:'Buy Now'}},
]};
export function imageUrl(value:unknown):string {
  if(typeof value!=='string'||value.length>2048)throw new Error('Invalid image URL');
  const text=value.trim();if(!text)return '';
  if(/^\/(?!\/)[^\\\s]*$/.test(text))return text;
  const url=new URL(text);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw new Error('Invalid image URL');
  return url.href;
}
export function validatePreviewStore(value:any):PreviewStore {
  const text=(v:unknown)=>{if(typeof v!=='string'||v.length>200)throw new Error('Invalid text');return v.trim();};
  const label=(v:any)=>({ar:text(v?.ar),en:text(v?.en)});
  if(!value||!Array.isArray(value.navigation)||value.navigation.length>8)throw new Error('Invalid navigation');
  return {name:label(value.name),logo:imageUrl(value.logo),footer_logo:imageUrl(value.footer_logo),navigation:value.navigation.map((item:any)=>{
    if(!previewTargets.includes(item?.target))throw new Error('Invalid navigation target');
    return {target:item.target,label:label(item.label)};
  })};
}
