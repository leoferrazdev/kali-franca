import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

test('o scaffold Next.js possui scripts e App Router mínimos', () => {
  const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  assert.equal(packageJson.name, 'kali-franca-crm');
  assert.equal(packageJson.scripts.dev, 'next dev');
  assert.equal(packageJson.scripts.build, 'next build --webpack');
  assert.equal(packageJson.scripts.start, 'node server.mjs');
  assert.ok(existsSync(resolve(root, 'app', 'layout.tsx')));
  assert.ok(existsSync(resolve(root, 'app', 'page.tsx')));
  assert.ok(existsSync(resolve(root, 'app', 'globals.css')));
  assert.ok(existsSync(resolve(root, 'next.config.mjs')));
  assert.ok(existsSync(resolve(root, 'server.mjs')));
  assert.equal(existsSync(resolve(root, 'next.config.ts')), false);
});

test('o scaffold não contém segredos nem aponta para o protótipo estático como dependência', () => {
  const packageSource = readFileSync(resolve(root, 'package.json'), 'utf8');
  assert.doesNotMatch(packageSource, /service_role|secret|password/i);
  assert.doesNotMatch(packageSource, /file:.*web[\\/]+crm/);
});

test('o servidor de produção usa a porta fornecida pelo ambiente', () => {
  const serverSource = readFileSync(resolve(root, 'server.mjs'), 'utf8');
  assert.match(serverSource, /process\.env\.PORT/);
  assert.match(serverSource, /next\(\{ dev: false/);
  assert.match(serverSource, /http\s*\.createServer/);
});
