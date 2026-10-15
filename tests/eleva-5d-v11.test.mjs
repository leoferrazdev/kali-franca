import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
test('a nova home identifica V11 sem perder analytics e acesso ao contato', () => {
  const html = read('index.html');
  assert.match(html, /data-page-version="v11"/);
  assert.match(html, /G-RZGESTEZCK/);
  assert.match(html, /yr5sw9xx5z/);
  assert.match(html, /https:\/\/wa.me\/message\/R6WHM3W3SGCSE1/);
  const final = html.slice(html.indexOf('class="section final-invitation"'), html.indexOf('<footer'));
  assert.doesNotMatch(final, /final-details|Um tema, uma prática/);
});
test('a V11 resolve recursos e preserva seções, fotos e a V10', () => {
  const html = read('lp-5d/v11/index.html');
  const old = read('lp-5d/v10/index.html');
  const sections = s => [...s.matchAll(/data-section="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(sections(html), sections(old));
  for (const [, url] of html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)) {
    if (/^(https:|#)/.test(url)) continue;
    assert.ok(fs.existsSync(path.join(root, url.split('?')[0])), url);
  }
  assert.match(old, /data-page-version="v10"/);
});
