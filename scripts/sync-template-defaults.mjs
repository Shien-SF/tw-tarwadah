import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
// The manifest owns the standalone defaults. Retain the old command for compatibility.
const bundle = JSON.parse(readFileSync('twilight-bundle.json', 'utf8'));
const values = Object.fromEntries(bundle.components.map(component => [component.name.replace(/^tarwadah-/, ''), Object.fromEntries(component.fields.map(field => [field.id, field.value]))]));
const file = 'src/shared/defaults.json';
if (process.argv.includes('--check')) assert.deepEqual(JSON.parse(readFileSync(file, 'utf8')), values, 'Run pnpm sync:defaults.');
else writeFileSync(file, JSON.stringify(values, null, 2) + '\n');
console.log(`Standalone defaults ${process.argv.includes('--check') ? 'checked' : 'synchronized'}: ${bundle.components.length} components.`);
