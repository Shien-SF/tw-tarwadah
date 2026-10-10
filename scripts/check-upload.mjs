import assert from 'node:assert/strict';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
const origin=process.env.TARWADAH_PREVIEW_URL||'http://127.0.0.1:5173';
const bytes=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6znoAAAAASUVORK5CYII=','base64');
async function upload(body,name='test.png',type='image/png'){
  const form=new FormData();form.append('file',new Blob([body],{type}),name);
  return fetch(`${origin}/__tarwadah/uploads`,{method:'POST',body:form});
}
const response=await upload(bytes);
assert.equal(response.status,200,'The local image uploader accepts an image');
const result=await response.json();
assert.equal(result.success,true);
assert.match(result.data.url,/^\/demo-uploads\/[a-f0-9-]+\.png$/);
const stored=await fetch(new URL(result.data.url,origin));
assert.equal(stored.status,200);
assert.equal(stored.headers.get('content-type'),'image/png');
assert.deepEqual(Buffer.from(await stored.arrayBuffer()),bytes,'Uploaded bytes are preserved instead of replacing the file with the mock image');
const second=await(await upload(bytes,'different.png')).json();
assert.notEqual(second.data.url,result.data.url,'Separate uploads get independent persistent URLs');
assert.equal((await upload('not an image')).status,415,'Reject content disguised as an image');
assert.equal((await upload('<svg/>','test.svg','image/svg+xml')).status,415);
const adapter=await(await fetch(`${origin}/node_modules/@salla.sa/twilight-bundles/dist/vite-plugins/_demo.js`)).text();
assert.ok(adapter.includes('upload-url="/__tarwadah/uploads"'),'The real form builder uses the local uploader');
for(const url of [result.data.url,second.data.url])await unlink(resolve('public',url.slice(1)));
console.log('Upload checked: image persistence, exact bytes, unique URLs and invalid-image rejection.');
