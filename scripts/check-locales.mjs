import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {runInNewContext} from 'node:vm';
const defaults=JSON.parse(fs.readFileSync('src/shared/defaults.json'));
const bundle=JSON.parse(fs.readFileSync('twilight-bundle.json'));
const templates=JSON.parse(fs.readFileSync('src/shared/template-defaults.json'));
const exports={};
const context={exports,document:{documentElement:{lang:'ar'}},window:{salla:{lang:{get:()=> 'en'}}}};
runInNewContext(ts.transpileModule(fs.readFileSync('src/shared/locale.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
assert.equal(exports.language(),'en','Store SDK language takes precedence over HTML language');
assert.equal(exports.localizedString({ar:'عربي',en:'English'}),'English');
context.window.salla.lang.get=()=> 'ar';
assert.equal(exports.localizedString({ar:'عربي',en:'English'}),'عربي');
for(const value of [null,undefined,{},[],true,{ar:{text:'Invalid'},en:[]}])assert.equal(exports.localizedString(value),'','Non-text values cannot reach text renderers');
assert.equal(exports.localizedString(0),'0');
assert.equal(exports.localizedString({ar:'',en:'Fallback'},'ar'),'','Keep intentionally empty merchant text');
for(const lang of ['ar','en']){
  for(const value of [{ar:'عربي'}, {en:'English'}, {ar:null,en:'English'}]){
    assert.equal(typeof exports.localize({items:[{title:value}]},lang).items[0].title,'string','Partial translations must not reach nested renderers as objects');
  }
  const values=exports.localize(defaults,lang);
  assert.equal(typeof values.hero.title,'string');
  assert.equal(typeof values.features.items[0].title,'string');
  assert.equal(typeof values.testimonials.items[0].quote,'string');
  assert.equal(typeof values['buy-now'].variants[0].name,'string');
  assert.equal(values.hero.video,defaults.hero.video,'Media URLs are shared, not translated');
  assert.equal(exports.localize({title:'Merchant customization'},lang).title,'Merchant customization');
  const check=(value)=>{if(Array.isArray(value))value.forEach(check);else if(value&&typeof value==='object'){assert.ok(!('ar' in value&&'en' in value),'No locale objects reach the renderer');Object.values(value).forEach(check);}};
  check(values);
  for(const [name,template]of Object.entries(templates.templates)){
    const localized=exports.localize(template.sections,lang);
    check(localized);
    assert.equal(typeof localized.hero.title,'string',`${name} title renders in ${lang}`);
    assert.equal(localized.hero.poster,template.sections.hero.poster,`${name} keeps its saved media`);
  }
}
let count=0;
function schema(fields){
  for(const field of fields){
    if(['text','textarea'].includes(field.format)&&!['cta_target','target'].includes(field.id.split('.').at(-1))){
      assert.equal(field.multilanguage,true,`${field.id} is translatable`);
      assert.ok(field.value.ar?.trim()&&field.value.en?.trim(),`${field.id} has both defaults`);count++;
      for(const lang of ['ar','en']){
        assert.equal(exports.localizedString(field.value,lang),field.value[lang],`${field.id} resolves to ${lang}`);
        const other=lang==='ar'?'en':'ar';
        assert.equal(exports.localizedString({[other]:field.value[other]},lang),field.value[other],`${field.id} falls back when ${lang} is missing`);
      }
    }
    if(field.fields)schema(field.fields);
  }
}
bundle.components.forEach(c=>schema(c.fields));
console.log(`Locales checked: ${count} bilingual schema fields, nested content, both languages and merchant overrides.`);
