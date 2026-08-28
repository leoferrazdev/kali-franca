import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

test('o workspace de membros possui um shell Next.js executável', () => {
  const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

  assert.equal(packageJson.name, 'kali-franca-membros');
  assert.equal(packageJson.scripts.build, 'next build --webpack');
  assert.equal(packageJson.scripts.start, 'node server.mjs');
  assert.ok(existsSync(resolve(root, 'app', 'layout.tsx')));
  assert.ok(existsSync(resolve(root, 'app', 'page.tsx')));
  assert.ok(existsSync(resolve(root, 'server.mjs')));
});

test('o shell de membros não implementa funcionalidades fictícias', () => {
  const page = readFileSync(resolve(root, 'app', 'page.tsx'), 'utf8');

  assert.match(page, /Área de membros/);
  assert.doesNotMatch(page, /signIn|createClient|leads|dashboard/i);
});

test('o servidor de membros usa a porta fornecida pelo ambiente', () => {
  const serverSource = readFileSync(resolve(root, 'server.mjs'), 'utf8');

  assert.match(serverSource, /process\.env\.PORT/);
  assert.match(serverSource, /next\(\{ dev: false/);
  assert.match(serverSource, /(?:http\.)?createServer/);
});
