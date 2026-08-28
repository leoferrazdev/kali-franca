import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => readFileSync(resolve(root, ...segments), 'utf8');

test('páginas públicas preservam alvos de toque mínimos', () => {
  for (const stylesheet of ['styles.css', 'brandbook/styles.css', 'bio/styles.css']) {
    assert.match(read(stylesheet), /\.wordmark[\s\S]*?min-height:\s*44px/, stylesheet);
  }

  assert.match(read('bio', 'styles.css'), /\.footer-home[\s\S]*?min-width:\s*44px/);
});
