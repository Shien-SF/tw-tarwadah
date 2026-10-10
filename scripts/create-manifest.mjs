import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const defaults = JSON.parse(readFileSync(new URL('../src/shared/defaults.json', import.meta.url)));
const bundleFile = new URL('../twilight-bundle.json', import.meta.url);
const bundle = JSON.parse(readFileSync(bundleFile));
const labels = {
  title:'العنوان',note:'النص العلوي',accent_text:'النص المميز',description:'الوصف',cta_label:'نص زر الشراء',cta_target:'معرف قسم الشراء',scroll_label:'نص التمرير',video:'رابط الفيديو',poster:'صورة غلاف الفيديو',detail_label:'نص عرض التفاصيل',target:'معرف القسم المستهدف',image:'الصورة',price:'السعر التجريبي',colors:'الألوان التجريبية',eyebrow:'العنوان الصغير',caption:'النص الختامي',items:'العناصر',text:'النص',label:'وصف القسم',images:'الصور',alt:'وصف الصورة',intro_image:'الصورة الافتتاحية',play_label:'نص تشغيل الفيديو',pause_label:'نص إيقاف الفيديو',quote:'الرأي',author:'الاسم',specs_label:'عنوان المواصفات',specs:'المواصفات',color_label:'عنوان الألوان',quantity_label:'عنوان الكمية',preview_message:'رسالة المعاينة',loading_message:'رسالة التحميل',error_message:'رسالة الخطأ',variants:'الألوان والصور التجريبية',name:'الاسم',color:'اللون',background:'لون الخلفية',foreground:'لون النص',accent:'اللون المميز',product:'المنتج من المتجر'
};
const titles={hero:'ترواده — البانر الرئيسي', 'product-strip':'ترواده — شريط المنتج', highlights:'ترواده — تفاصيل التصميم',sound:'ترواده — تجربة الصوت',gallery:'ترواده — معرض الصور',features:'ترواده — المميزات التقنية',video:'ترواده — فيديو المنتج',testimonials:'ترواده — آراء العملاء','buy-now':'ترواده — شراء المنتج'};
function uuid(name){const h=createHash('sha256').update(`tarwadah:${name}`).digest('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-4${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20,32)}`;}
function field(id,value,section){
  if(value&&typeof value==='object'&&!Array.isArray(value)&&'ar' in value)return {...field(id,value.en,section),value,multilanguage:true};
  if(id==='product')return {id,type:'items',format:'dropdown-list',label:labels[id],icon:'sicon-box',source:'products',searchable:true,multichoice:false,required:false,options:[],selected:[],value:[],description:'اختر نفس المنتج في شريط المنتج وقسم الشراء. بدون اختيار منتج يظهر محتوى المرجع للمعاينة فقط.'};
  if(Array.isArray(value))return {id,type:'collection',format:'collection',label:labels[id]||id,item_label:labels[id]||id,required:false,minLength:0,maxLength:['highlights','gallery'].includes(section)?3:id==='items'?15:10,value,fields:Object.entries(value[0]||{}).map(([key,val])=>field(key,val,section))};
  const format = ['image','poster','intro_image'].includes(id)?'image':['video'].includes(id)?'url':['background','foreground','accent','color'].includes(id)?'color':['description','text','quote','note','preview_message','error_message'].includes(id)?'textarea':'text';
  return {id,type:'string',format,label:labels[id]||id,required:false,value};
}
bundle.name={en:'Tarwadah',ar:'ترواده'};
bundle.description={en:'Independent single-product landing sections inspired by MORAE.',ar:'عناصر مستقلة لصفحات هبوط منتج واحد مستوحاة من MORAE.'};
bundle.components=Object.entries(defaults).map(([section,values])=>{
  const all={...values,...(section==='product-strip'?{product:[]}:{}),background:'#000000',foreground:'#ffffff',accent:'#f17b0e'};
  return {title:titles[section],name:`tarwadah-${section}`,key:uuid(section),icon:'sicon-layout-grid',image:values.poster||values.image||values.intro_image||values.items?.[0]?.image||defaults.hero.poster,fields:Object.entries(all).map(([id,value])=>field(id,value,section))};
});
mkdirSync(new URL('../templates/',import.meta.url),{recursive:true});
const layouts={
  'tarwadah-morae':Object.keys(defaults),
  'tarwadah-compact':['hero','product-strip','highlights','features','testimonials','buy-now']
};
bundle.templates=Object.entries(layouts).map(([name,sections],index)=>{
  const template={id:uuid(name),components:sections.map(section=>({...bundle.components.find(c=>c.name===`tarwadah-${section}`),fields:bundle.components.find(c=>c.name===`tarwadah-${section}`).fields}))};
  writeFileSync(new URL(`../templates/${name}.json`,import.meta.url),JSON.stringify(template,null,2)+'\n');
  return {id:template.id,path:`templates.${name}`,category_id:'1939592358',primary_color:'#f17b0e',thumbnail:defaults.hero.poster,is_default:index===0};
});
writeFileSync(bundleFile,JSON.stringify(bundle,null,2)+'\n');
console.log(`Created ${bundle.components.length} independent sections and ${bundle.templates.length} templates.`);
