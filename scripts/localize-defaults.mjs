import fs from 'node:fs';
const defaults=JSON.parse(fs.readFileSync('src/shared/defaults.json'));
const arabic=JSON.parse(fs.readFileSync('src/shared/translations.ar.json'));
function translate(value, ar) {
  if(ar===undefined)return value;
  if(typeof ar==='string')return {ar,en:typeof value==='object'?value.en:value};
  if(Array.isArray(value))return value.map((item,i)=>translate(item,ar[i]));
  return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,translate(item,ar[key])]));
}
function migrate(value, fallback) {
  if(fallback&&typeof fallback==='object'&&'ar' in fallback&&'en' in fallback){
    if(value&&typeof value==='object')return {...fallback,...value};
    if(value===undefined||value===null||value===fallback.en)return fallback;
    return /[\u0600-\u06ff]/.test(value)?{...fallback,ar:value}:{...fallback,en:value};
  }
  if(Array.isArray(value))return value.map((v,i)=>migrate(v,fallback?.[i]));
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,migrate(v,fallback?.[k])]));
  return value;
}
function fields(list, values) {
  for(const field of list){
    const key=field.id.split('.').at(-1),fallback=values?.[key];
    field.value=migrate(field.value,fallback);
    if(fallback&&typeof fallback==='object'&&'ar' in fallback)field.multilanguage=true;
    if(field.fields)fields(field.fields,Array.isArray(fallback)?fallback[0]:fallback);
  }
}
for(const section of Object.keys(defaults))defaults[section]=translate(defaults[section],arabic[section]);
fs.writeFileSync('src/shared/defaults.json',JSON.stringify(defaults,null,2)+'\n');
for(const file of ['twilight-bundle.json',...fs.readdirSync('templates').filter(x=>x.endsWith('.json')).map(x=>'templates/'+x)]){
  const bundle=JSON.parse(fs.readFileSync(file));
  for(const component of bundle.components)fields(component.fields,defaults[component.name.replace('tarwadah-','')]);
  fs.writeFileSync(file,JSON.stringify(bundle,null,2)+'\n');
}
console.log('Migrated bilingual defaults and nested fields without replacing saved customizations.');
