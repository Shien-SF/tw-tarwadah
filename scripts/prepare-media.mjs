import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { basename, resolve, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve('.');
const target = resolve('artifacts/salla-submission');
mkdirSync(`${target}/media`, {recursive:true});
const manifest = JSON.parse(readFileSync('twilight-bundle.json', 'utf8'));
const mappings = new Map();
function walk(value, path = '$') {
  if (typeof value === 'string' && (value.startsWith('/demo-uploads/') || value.startsWith('docs/screenshots/'))) {
    const source = value.startsWith('/demo-uploads/') ? `public${value}` : value;
    const absolute = resolve(source);
    if (!absolute.startsWith(root + sep) || !existsSync(absolute)) throw Error(`Missing media: ${source}`);
    const name = basename(source);
    const existing = mappings.get(value);
    if (existing) existing.locations.push(path);
    else { copyFileSync(absolute, `${target}/media/${name}`); mappings.set(value, {original:value,source,upload:`media/${name}`,locations:[path]}); }
  } else if (Array.isArray(value)) value.forEach((item,i)=>walk(item,`${path}[${i}]`));
  else if (value && typeof value === 'object') for (const [key,item] of Object.entries(value)) walk(item,`${path}.${key}`);
}
walk(manifest);
const baseArgument = process.argv.find(arg => arg.startsWith('--base-url='));
if (baseArgument) {
  const base = new URL(baseArgument.slice('--base-url='.length).replace(/\/?$/, '/'));
  if (base.protocol !== 'https:' || base.username || base.password || /^(localhost|127\.|0\.)/.test(base.hostname)) throw Error('Use a public HTTPS base URL without credentials.');
  // Refuse rewriting to unreachable image URLs. Upload the prepared media/ folder first.
  const replacements = new Map();
  for (const [original,item] of mappings) {
    const url = new URL(item.upload,base).href;
    const response = await fetch(url,{method:'GET',headers:{Range:'bytes=0-0'},signal:AbortSignal.timeout(20000)});
    const contentType=response.headers.get('content-type')||'';
    await response.body?.cancel();
    if (!response.ok || !contentType.startsWith('image/')) throw Error(`Upload and check ${url}: HTTP ${response.status}, ${contentType}`);
    replacements.set(original,url);
  }
  function replace(value) {if(typeof value==='string')return replacements.get(value)||value;if(Array.isArray(value))return value.map(replace);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,replace(v)]));return value;}
  writeFileSync('twilight-bundle.json',JSON.stringify(replace(manifest),null,4)+'\n');
  execFileSync(process.execPath,['scripts/sync-template-defaults.mjs'],{stdio:'inherit'});
}
writeFileSync(`${target}/media-map.json`,JSON.stringify([...mappings.values()],null,2)+'\n');
for (const file of ['merchant-guide.html','merchant-guide.md','listing-copy.md','SALLA-SUBMISSION.md']) if(existsSync(`docs/${file}`)) copyFileSync(`docs/${file}`,`${target}/${file}`);
// The guide references screenshots/ while manifest images use media/.
mkdirSync(`${target}/screenshots`,{recursive:true});
for(const component of manifest.components){const file=`docs/screenshots/${component.name}.png`;if(existsSync(file))copyFileSync(file,`${target}/screenshots/${component.name}.png`);}
console.log(`Prepared ${mappings.size} image files in ${relative(root,target)}. Upload this folder to HTTPS hosting, then run: node scripts/prepare-media.mjs --base-url=https://YOUR-HOST/PATH/`);
