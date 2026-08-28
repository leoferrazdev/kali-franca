import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => readFileSync(resolve(root, ...segments), 'utf8');

test('o logout da área de membros encerra a sessão e retorna ao acesso', () => {
  const componentPath = resolve(root, 'app', 'components', 'LogoutButton.tsx');
  assert.ok(existsSync(componentPath));

  const source = read('app', 'components', 'LogoutButton.tsx');
  assert.match(source, /'use client'/);
  assert.match(source, /createSupabaseBrowserClient/);
  assert.match(source, /auth\.signOut/);
  assert.match(source, /router\.replace\(['"]\/login\//);
  assert.match(source, /router\.refresh\(\)/);
  assert.match(source, /disabled=\{pending\}/);
  assert.match(source, /aria-busy=\{pending\}/);
  assert.match(source, /aria-live="polite"/);
});

test('o cabeçalho integra o logout somente fora da prévia', () => {
  const header = read('app', 'components', 'MemberHeader.tsx');

  assert.match(header, /import \{ LogoutButton \}/);
  assert.match(header, /preview \? null : <LogoutButton \/>/);
});

test('o logout mantém alvos de toque acessíveis no header e na autenticação', () => {
  const css = read('app', 'globals.css');

  assert.match(css, /\.logout-button[\s\S]*?min-height:\s*44px/);
  assert.match(css, /\.brand-mark[\s\S]*?min-height:\s*44px/);
  assert.match(css, /\.auth-panel__links a[\s\S]*?min-height:\s*44px/);
  assert.match(css, /\.auth-panel__links a[\s\S]*?min-width:\s*44px/);
  assert.match(css, /\.secondary-link[\s\S]*?min-height:\s*44px/);
  assert.match(css, /\.member-navigation__link[\s\S]*?min-height:\s*44px/);
});
