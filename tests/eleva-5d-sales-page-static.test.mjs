import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => {
  const file = resolve(root, ...segments);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};

test('a página do Eleva 5D possui rota pública e estrutura semântica', () => {
  const html = read('eleva-5d', 'index.html');

  assert.ok(existsSync(resolve(root, 'eleva-5d', 'index.html')));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Kalì Franca/i);
  assert.match(html, /Eleva 5D/i);
});

test('a página apresenta os cinco movimentos e a rotina dos três movimentos', () => {
  const html = read('eleva-5d', 'index.html');

  for (const movement of ['Reprogramar', 'Alinhar', 'Manifestar', 'Sustentar', 'Elevar']) {
    assert.match(html, new RegExp(movement, 'i'));
  }

  assert.match(html, /Regra dos 3 Movimentos/i);
  assert.match(html, /Corte Energético/i);
});

test('a página mantém a oferta honesta enquanto o checkout não existe', () => {
  const html = read('eleva-5d', 'index.html');

  assert.match(html, /Acesso em preparação/i);
  assert.match(html, /checkout/i);
  assert.doesNotMatch(html, /R\$\s*[0-9]/i);
  assert.doesNotMatch(html, /comprar agora|garantia de resultado|depoimento|\+2[.,]?500/i);
});

test('a página consome a identidade visual compartilhada e tem contratos de acessibilidade', () => {
  const html = read('eleva-5d', 'index.html');
  const styles = read('eleva-5d', 'styles.css');

  assert.match(html, /\.\.\/brandbook\/tokens\.css/i);
  assert.match(html, /profile\.jpg/i);
  assert.match(html, /Pular para o conteúdo/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
});

test('a página mantém a próxima etapa separada da home e da área autenticada', () => {
  const html = read('eleva-5d', 'index.html');

  assert.match(html, /href=["']#acesso["']/i);
  assert.doesNotMatch(html, /membros\.kalifranca\.com\.br/i);
  assert.doesNotMatch(html, /href=["'][^"']*checkout[^"']*["']/i);
});

