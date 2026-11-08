import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function moduleAt(file){const exports={};const source=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;runInNewContext(source,{exports,URL});return exports;}
const api=moduleAt('src/shared/product-api.ts');
assert.equal(api.selectedProductId([{value:42}]),42);
assert.equal(api.selectedProductId({id:42}),42);
assert.equal(api.selectedProductId('javascript:alert(1)'),0);
let ready=false,called=false;
const product=await api.fetchStoreProduct({onReady:callback=>{ready=true;callback();},product:{getDetails:async(id,include)=>{assert(ready);assert.equal(id,42);assert.equal(include[0],'images');called=true;return {data:{id:42,name:'Merchant product',price:0}};}}},42);
assert(called);assert.equal(product.name,'Merchant product');assert.equal(product.price,0);
const demo=api.mockProduct({enabled:true,status:'available',price:100,isOnSale:true,regularPrice:150},'Preview product');
assert.equal(demo.price,100);assert.equal(demo.regular_price,150);assert.equal(demo.status,'sale');
assert.equal(api.mockProduct({enabled:true,status:'out',price:0},'Preview').status,'out');
assert.equal(api.mockProduct({enabled:false},'Preview'),undefined);
const preview=moduleAt('src/shared/preview-config.ts');
const saved=preview.mergePreviewConfig({price:259,title:'Reference'},JSON.stringify({price:100,items:[{'items.title':{ar:'تعديل',en:'Edited'}}]}));
assert.equal(saved.price,100);assert.equal(saved.title,'Reference');assert.equal(saved.items[0].title.ar,'تعديل');
assert.equal(preview.mergePreviewConfig({price:259},'{invalid').price,259);

const navigation=moduleAt('src/shared/navigation.ts');
for(const value of ['javascript:alert(1)','data:text/html,hi','//evil.test','https://user:pass@example.com','/\\evil.test','https://example.com/\npath'])assert.equal(navigation.actionUrl(value),'');
assert.equal(navigation.actionUrl('/products/example'),'/products/example');
assert.equal(navigation.actionUrl('https://example.com/product'),'https://example.com/product');
assert.equal(navigation.actionUrl('#section'),'#section');
console.log('Product and navigation checked: SDK readiness, merchant overrides, zero prices, and safe independent action URLs.');
