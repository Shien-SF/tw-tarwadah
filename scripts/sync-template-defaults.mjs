import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// Saved templates are the source of truth. Never regenerate or overwrite them.
const bundlePath='twilight-bundle.json';
const bundle=JSON.parse(readFileSync(bundlePath,'utf8'));
const defaultTemplate=bundle.templates.find(template=>template.is_default);
assert(defaultTemplate,'A default template is required');
const normalize=value=>Array.isArray(value)?value.map(normalize):value&&typeof value==='object'
  ?Object.fromEntries(Object.entries(value).filter(([key])=>!key.endsWith('__type')).map(([key,item])=>[key.split('.').at(-1),normalize(item)])):value;
const templates={};
for(const registered of bundle.templates){
  const name=registered.path.replace(/^templates\./,'');
  assert(/^[a-z0-9-]+$/.test(name),'Invalid template path');
  const template=JSON.parse(readFileSync(`templates/${name}.json`,'utf8'));
  assert.equal(template.id,registered.id,`Template ID mismatch: ${name}`);
  const sections={};
  for(const component of template.components){
    const definition=bundle.components.find(item=>item.name===component.name);
    assert(definition,`Unknown component: ${component.name}`);
    const fallback=Object.fromEntries(definition.fields.map(field=>[field.id,field.value]));
    const saved=Object.fromEntries(component.fields.filter(field=>Object.hasOwn(field,'value')&&field.id!=='twilight-bundles-component-name').map(field=>[field.id,normalize(field.value)]));
    sections[component.name.replace(/^tarwadah-/,'')]={...fallback,...saved};
  }
  templates[name]={id:registered.id,order:Object.keys(sections),sections};
}
const defaultName=defaultTemplate.path.replace(/^templates\./,'');
const defaults=templates[defaultName].sections;
for(const component of bundle.components){
  const values=defaults[component.name.replace(/^tarwadah-/,'')];
  if(!values)continue;
  for(const field of component.fields)if(Object.hasOwn(values,field.id))field.value=values[field.id];
}
const outputs={
  'src/shared/template-defaults.json':{defaultTemplate:defaultName,templates},
  'src/shared/defaults.json':defaults,
  [bundlePath]:bundle,
};
let stale=false;
for(const [path,value]of Object.entries(outputs)){
  if(process.argv.includes('--check')){
    try{assert.deepEqual(JSON.parse(readFileSync(path,'utf8')),value);}catch{console.error(`Defaults need synchronization: ${path}`);stale=true;}
  }else{
    const output=JSON.stringify(value,null,path===bundlePath?4:2)+'\n';
    if(readFileSafe(path)!==output)writeFileSync(path,output);
  }
}
function readFileSafe(path){try{return readFileSync(path,'utf8');}catch{return '';}}
if(stale)process.exitCode=1;
else console.log(`Template defaults ${process.argv.includes('--check')?'checked':'synchronized'}: ${Object.keys(templates).length} templates; default ${defaultName}. Saved template files unchanged.`);
