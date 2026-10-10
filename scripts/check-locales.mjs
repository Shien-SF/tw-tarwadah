import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {runInNewContext} from 'node:vm';
const defaults=JSON.parse(fs.readFileSync('src/shared/defaults.json'));
const bundle=JSON.parse(fs.readFileSync('twilight-bundle.json'));
const exports={};
runInNewContext(ts.transpileModule(fs.readFileSync('src/shared/locale.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,document:{documentElement:{lang:'ar'}}});
for(const lang of ['ar','en']){
  const values=exports.localize(defaults,lang);
  assert.equal(typeof values.hero.title,'string');
  assert.equal(typeof values.features.items[0].title,'string');
  assert.equal(typeof values.testimonials.items[0].quote,'string');
  assert.equal(typeof values['buy-now'].variants[0].name,'string');
  assert.equal(values.hero.video,defaults.hero.video,'Media URLs are shared, not translated');
  assert.equal(exports.localize({title:'Merchant customization'},lang).title,'Merchant customization');
  const check=(value)=>{if(Array.isArray(value))value.forEach(check);else if(value&&typeof value==='object'){assert.ok(!('ar' in value&&'en' in value),'No locale objects reach the renderer');Object.values(value).forEach(check);}};
  check(values);
}
let count=0;
function schema(fields){
  for(const field of fields){
    if(['text','textarea'].includes(field.format)&&!['cta_target','target'].includes(field.id.split('.').at(-1))){
      assert.equal(field.multilanguage,true,`${field.id} is translatable`);
      assert.ok(field.value.ar?.trim()&&field.value.en?.trim(),`${field.id} has both defaults`);count++;
    }
    if(field.fields)schema(field.fields);
  }
}
bundle.components.forEach(c=>schema(c.fields));
console.log(`Locales checked: ${count} bilingual schema fields, nested content, both languages and merchant overrides.`);
