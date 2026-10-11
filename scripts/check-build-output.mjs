import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { posix } from 'node:path';

// An optional Git revision checks the same repository snapshot Twilight CI reads.
const revision = process.argv[2];
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const read = file => revision ? git('show', `${revision}:${file}`) : readFileSync(file, 'utf8');
const bundle = JSON.parse(read('twilight-bundle.json'));
const files = revision
  ? git('ls-tree', '-r', '--name-only', revision, 'dist').split('\n').filter(Boolean)
  : existsSync('dist') ? readdirSync('dist').map(name => `dist/${name}`) : [];
const javascript = new Set(files.filter(file => file.endsWith('.js')));
assert(javascript.size, 'Build output: dist/ is missing or empty in the release snapshot.');
for (const component of bundle.components) {
  assert(javascript.has(`dist/${component.name}.js`), `Missing release entry: dist/${component.name}.js`);
}
for (const file of javascript) {
  const source = read(file);
  assert(source.trim(), `Empty build output: ${file}`);
  for (const [, dependency] of source.matchAll(/["'](\.\/[^"']+\.js)["']/g)) {
    const target = posix.join(posix.dirname(file), dependency);
    assert(javascript.has(target), `${file} imports missing shared output: ${target}`);
  }
}
console.log(`Build output checked${revision ? ` at ${revision}` : ''}: ${bundle.components.length} entries and ${javascript.size - bundle.components.length} shared files.`);
