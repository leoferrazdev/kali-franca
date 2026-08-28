import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => readFileSync(resolve(root, ...segments), 'utf8');

test('a V1 possui rotas de entrada, cadastro e área preparada', () => {
  assert.ok(existsSync(resolve(root, 'app', 'page.tsx')));
  assert.ok(existsSync(resolve(root, 'app', 'login', 'page.tsx')));
  assert.ok(existsSync(resolve(root, 'app', 'cadastro', 'page.tsx')));
  assert.ok(existsSync(resolve(root, 'app', 'membros', 'page.tsx')));

  assert.match(read('app', 'page.tsx'), /AuthPage/);
  assert.match(read('app', 'login', 'page.tsx'), /AuthPage/);
  assert.match(read('app', 'cadastro', 'page.tsx'), /AuthPage/);
  assert.match(read('app', 'membros', 'page.tsx'), /MemberHome|MemberShell/);
});

test('a experiência usa componentes de marca e não repete a implementação do CRM', () => {
  for (const component of [
    'BrandMark.tsx',
    'AuthShell.tsx',
    'AuthPanel.tsx',
    'FormField.tsx',
    'PrimaryButton.tsx',
    'MemberShell.tsx',
    'EmptyState.tsx'
  ]) {
    assert.ok(existsSync(resolve(root, 'app', 'components', component)), component);
  }

  const sources = [
    read('app', 'page.tsx'),
    read('app', 'login', 'page.tsx'),
    read('app', 'cadastro', 'page.tsx'),
    read('app', 'membros', 'page.tsx'),
    read('app', 'components', 'AuthPanel.tsx'),
    read('app', 'components', 'MemberShell.tsx')
  ].join('\n');

  assert.doesNotMatch(sources, /leads|dashboard|profiles|offers|tasks/i);
  assert.match(sources, /Área de membros/);
  assert.match(sources, /conteúdo|conteudos/i);
});

test('a autenticação preparada é honesta e acessível', () => {
  const authPanel = read('app', 'components', 'AuthPanel.tsx');
  const formField = read('app', 'components', 'FormField.tsx');
  const feedback = read('app', 'components', 'InlineFeedback.tsx');

  assert.match(authPanel, /Acesso em preparação|configuração|configur/i);
  assert.match(authPanel, /onSubmit/);
  assert.match(feedback, /aria-live/);
  assert.match(formField, /<label/);
  assert.match(formField, /htmlFor/);
  assert.match(formField, /aria-describedby/);
  assert.match(formField, /aria-invalid/);
  assert.match(`${authPanel}\n${formField}`, /autoComplete|autocomplete/);
});

test('os estilos da área importam os tokens compartilhados e cobrem acessibilidade', () => {
  const css = read('app', 'globals.css');

  assert.match(css, /brandbook[\\/]tokens\.css|tokens\.css/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media[^{]+(?:max-width|min-width)/);
  assert.doesNotMatch(css, /#(?:111111|181818|333333|a78bfa|f5f5f5|b9b9b9)\b/i);
});

test('o layout publica metadados coerentes da área de membros', () => {
  const layout = read('app', 'layout.tsx');

  assert.match(layout, /Kalì Franca \| Área de membros/);
  assert.match(layout, /experiência|experiencia|membros/i);
  assert.match(layout, /lang="pt-BR"/);
});
