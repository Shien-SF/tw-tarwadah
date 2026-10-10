import {readFileSync,existsSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const bundle=JSON.parse(readFileSync('twilight-bundle.json'));
assert(bundle.components.length>=1&&bundle.components.length<=15,'Bundle must contain 1–15 components.');
assert.equal(new Set(bundle.components.map(c=>c.name)).size,bundle.components.length,'Component names must be unique.');
const defaults=JSON.parse(readFileSync('src/shared/defaults.json'));
for(const component of bundle.components){
  assert(existsSync(`src/components/${component.name}/index.ts`),`Missing component: ${component.name}`);
  assert.equal(new Set(component.fields.map(f=>f.id)).size,component.fields.length,`Duplicate fields: ${component.name}`);
  const section=component.name.replace('tarwadah-','');
  for(const [id,value]of Object.entries(defaults[section]))assert.deepEqual(component.fields.find(f=>f.id===id)?.value,value,`Default drift: ${section}.${id}`);
}
const templates=readdirSync('templates').filter(f=>f.endsWith('.json'));
assert(templates.length>=2&&templates.length<=4,'Landing bundles require 2–4 templates in the current SDK.');
assert.equal(bundle.templates.filter(t=>t.is_default).length,1,'Exactly one default template is required.');
for(const registered of bundle.templates){
  const file=`templates/${registered.path.replace('templates.','')}.json`;
  const template=JSON.parse(readFileSync(file));
  assert.equal(template.id,registered.id,`Template ID mismatch: ${file}`);
  for(const component of template.components){
    const definition=bundle.components.find(c=>c.name===component.name);
    assert(definition,`Unregistered component: ${component.name}`);
    assert.equal(component.key,definition.key);
    assert(Array.isArray(component.fields),`Missing saved fields: ${component.name}`);
  }
}
console.log(`Bundle checked: ${bundle.components.length} components, ${templates.length} templates, all reference defaults synchronized.`);
