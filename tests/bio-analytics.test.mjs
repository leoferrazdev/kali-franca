import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const bioPath = resolve(root, 'bio', 'index.html');

test('a bio instala o Google Analytics 4 e mede cliques nos destinos', () => {
  const html = readFileSync(bioPath, 'utf8');
  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? '';

  assert.match(head, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-RZGESTEZCK/i);
  assert.match(head, /gtag\(['"]config['"],\s*['"]G-RZGESTEZCK['"]\)/i);
  assert.equal((head.match(/googletagmanager\.com\/gtag\/js\?id=/gi) || []).length, 1);
  assert.match(html, /gtag\(['"]event['"],\s*['"]bio_destination_click['"]/i);
  assert.match(html, /data-destination/);
  assert.match(html, /destination_url/);
});
