import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const bundle = JSON.parse(readFileSync('twilight-bundle.json'));
const catalog = JSON.parse(readFileSync('docs/components.json'));
assert(bundle.components.length >= 1 && bundle.components.length <= 15);
assert.equal(new Set(bundle.components.map(c => c.name)).size, bundle.components.length);
assert(!bundle.features?.includes('landing-page-templates'), 'Landing templates must not be published.');
assert.equal(bundle.templates?.length || 0, 0);
assert(!existsSync('landing.html') && !existsSync('templates'), 'Archived landing pages must stay outside the release.');
const defaults = JSON.parse(readFileSync('src/shared/defaults.json'));
for (const component of bundle.components) {
  assert(existsSync(`src/components/${component.name}/index.ts`));
  assert.equal(new Set(component.fields.map(f => f.id)).size, component.fields.length);
  assert(component.description?.ar && component.description?.en);
  assert(catalog.some(item => item.name === component.name));
  assert.deepEqual(defaults[component.name.replace('tarwadah-', '')], Object.fromEntries(component.fields.map(f => [f.id, f.value])));
}
console.log(`Bundle checked: ${bundle.components.length} documented standalone components, no landing templates.`);
