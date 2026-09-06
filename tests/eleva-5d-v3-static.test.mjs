import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');

test('a V3 existe na rota independente e usa o contrato editorial', () => {
  const html = read('lp-5d/v3/index.html');
  assert.ok(existsSync(resolve(root, 'lp-5d/v3/index.html')));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Eleva 5D/i);
  assert.match(html, /Kalì Franca/i);
  assert.match(html, /R\$497/i);
  assert.match(html, /acesso anual ao Método/i);
  assert.doesNotMatch(html, /variação B|ELEVA 5D \/ B/i);
});

test('a V3 contém narrativa, cinco movimentos, FAQ e CTAs rastreáveis', () => {
  const html = read('lp-5d/v3/index.html');
  for (const movement of ['Reprogramar', 'Alinhar', 'Manifestar', 'Sustentar', 'Elevar']) {
    assert.match(html, new RegExp(movement, 'i'));
  }
  for (const cta of ['hero', 'offer', 'final']) {
    assert.match(html, new RegExp(`data-cta=["']${cta}["']`, 'i'));
  }
  assert.match(html, /perguntas frequentes|antes de você entrar/i);
  assert.match(html, /<details>/i);
});

test('a V3 usa paths de produção e acessibilidade básica', () => {
  const html = read('lp-5d/v3/index.html');
  const styles = read('lp-5d/v3/styles.css');
  const script = read('lp-5d/v3/app.js');
  assert.match(html, /brandbook\/tokens\.css/i);
  assert.match(html, /assets\/kali-og-social-authority\.png/i);
  assert.match(html, /Pular para o conteúdo/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(script, /eleva5d_cta_click/i);
  assert.match(script, /eleva5d_scroll_depth/i);
});

test('a V3 usa canvas contínuo e contraste claro no fundo escuro', () => {
  const styles = read('lp-5d/v3/styles.css');
  assert.match(styles, /--v3-ink|--b-ink/i);
  assert.match(styles, /background:\s*var\(--v3-ink\)/i);
  assert.match(styles, /color:\s*var\(--v3-paper\)/i);
  assert.match(styles, /\.v3-flow|\.continuous-canvas/i);
  assert.doesNotMatch(styles, /background:\s*#fff|background:\s*white/i);
});

test('a V3 mantém as outras rotas de vendas independentes', () => {
  assert.ok(existsSync(resolve(root, 'index.html')));
  assert.ok(existsSync(resolve(root, 'eleva-5d-b/index.html')));
});
