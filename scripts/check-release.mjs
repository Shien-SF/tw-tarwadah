import { readFileSync, readdirSync, existsSync } from 'node:fs';

// Content validation is separate from compilation: a local preview can render
// images that a merchant's storefront can never reach.
const files = ['twilight-bundle.json', 'src/shared/defaults.json',
  ...readdirSync('templates').filter(name => name.endsWith('.json')).map(name => `templates/${name}`)];
const failures = [];
function checkUrl(value, file, path) {
  if (!value || typeof value !== 'string') return;
  let url;
  try { url = new URL(value); } catch { /* Relative local media cannot survive publishing. */ }
  if (!url || url.protocol !== 'https:' || /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/i.test(url.hostname)) {
    failures.push(`${file} ${path}: ${value}`);
  }
}
function walk(value, file, path = '$') {
  if (Array.isArray(value)) { value.forEach((item, i) => walk(item, file, `${path}[${i}]`)); return; }
  if (!value || typeof value !== 'object') return;
  if (['image', 'url'].includes(value.format)) checkUrl(value.value, file, `${path}.value`);
  for (const [key, child] of Object.entries(value)) {
    if (['image', 'poster', 'intro_image', 'video'].includes(key)) checkUrl(child, file, `${path}.${key}`);
    walk(child, file, `${path}.${key}`);
  }
}
for (const file of files) walk(JSON.parse(readFileSync(file, 'utf8')), file);
const bundle = JSON.parse(readFileSync('twilight-bundle.json', 'utf8'));
for (const template of bundle.templates) {
  if (!/^https:\/\//.test(template.thumbnail) && !existsSync(template.thumbnail)) failures.push(`Missing thumbnail: ${template.thumbnail}`);
}
if (existsSync('dist/demo-uploads')) failures.push('dist/demo-uploads: local editor uploads must not be shipped in the component bundle.');
if (failures.length) {
  console.error(`Release content check FAILED (${failures.length} issues):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else console.log('Release content checked: HTTPS media, no local upload paths, template thumbnails exist. Live-store verification is still required.');
