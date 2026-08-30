import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const bioPath = resolve(import.meta.dirname, '..', 'bio', 'index.html');

test('a bio instala o rastreamento do Microsoft Clarity no head', () => {
  const html = readFileSync(bioPath, 'utf8');
  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? '';

  assert.match(head, /https:\/\/www\.clarity\.ms\/tag\//i);
  assert.match(head, /window, document, ["']clarity["']/i);
  assert.match(head, /yaiki79vjn/);
  assert.equal((html.match(/www\.clarity\.ms\/tag\//gi) || []).length, 1);
});
