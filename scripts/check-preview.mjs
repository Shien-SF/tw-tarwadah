import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
const origin=process.env.TARWADAH_PREVIEW_URL || 'http://127.0.0.1:5173';
const response=await fetch(`${origin}/node_modules/@salla.sa/twilight-bundles/dist/vite-plugins/_demo.js`);
assert.equal(response.status,200);
const source=await response.text();
const method=source.match(/static getComponentData\(e\) \{([\s\S]*?)\n  \}\n  \/\*\*/)?.[1];
assert.ok(method,'SDK data reader exists');
assert.ok(source.includes('src="/node_modules/.salla-temp/preview.html"'),'Editor iframe resolves to the SDK preview from its friendly URL');
// Execute the actual served data-reader, at the boundary used by empty cards.
const read=runInNewContext(`(function(e){${method}\n})`,{
  window:{customComponentsRaw:{hero:{fields:[{id:'title',value:'Reference title'},{id:'items',value:[{title:'Reference image'}]}]}}},
  localStorage:{getItem:()=>null,setItem:()=>{throw new Error('Must not overwrite customization');}},console,
});
const helpers={prepareDataForRendering:data=>data,htmlSafeString:text=>text};
assert.deepEqual(JSON.parse(read.call(helpers,'hero')),{title:'Reference title',items:[{title:'Reference image'}]});
const saved=runInNewContext(`(function(e){${method}\n})`,{
  window:{customComponentsRaw:{}},localStorage:{getItem:()=>JSON.stringify({title:'Merchant customization'})},console,
});
assert.deepEqual(JSON.parse(saved.call(helpers,'hero')),{title:'Merchant customization'});
for(const path of ['/landing.html','/editor.html','/node_modules/.salla-temp/preview.html']){
  const page=await fetch(`${origin}${path}`);assert.equal(page.status,200,`${path} is available`);
  const html=await page.text();assert.ok(!html.includes('/@fsD:'),'No malformed Windows module URLs');
}
console.log('Preview checked: defaults render without saving, saved edits win, preview/editor routes work.');
