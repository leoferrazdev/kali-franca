import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => {
  const file = resolve(root, ...segments);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};

test('a versão B existe em rota separada e mantém a oferta principal', () => {
  const html = read('eleva-5d-b', 'index.html');

  assert.ok(existsSync(resolve(root, 'eleva-5d-b', 'index.html')));
  assert.match(html, /data-ab-variant=["']B["']/i);
  assert.match(html, /Eleva 5D/i);
  assert.match(html, /R\$497/i);
  assert.match(html, /7 dias de garantia/i);
  assert.match(html, /acesso anual ao Método/i);
});

test('a versão B preserva o conteúdo estratégico do material-fonte', () => {
  const html = read('eleva-5d-b', 'index.html');

  for (const phrase of [
    'Criadora Divina',
    'Reprogramar',
    'Alinhar',
    'Manifestar',
    'Sustentar',
    'Elevar',
    '20 minutos por dia',
    'Eu Soul',
    'Corte Energético',
    'Terapeuta Energética e Mentora há 8 anos',
    '2.500+',
    '15M+',
    'Antes de você entrar',
    'Quero acessar o Eleva 5D agora',
  ]) {
    assert.match(html, new RegExp(phrase.replace(/[+]/g, '\\+'), 'i'));
  }
});

test('a versão B aplica a marca, acessibilidade, responsividade e tracking da variação', () => {
  const html = read('eleva-5d-b', 'index.html');
  const styles = read('eleva-5d-b', 'styles.css');
  const script = read('eleva-5d-b', 'app.js');

  assert.match(html, /brandbook\/tokens\.css/i);
  assert.match(html, /fotos\/geradas-ia\/kali-hero-autoridade-horizontal-02\.png/i);
  assert.match(html, /styles\.css\?v=faq-contrast-1/i);
  assert.match(html, /assets\/kali-expansao-editorial-vertical-01\.png/i);
  assert.match(html, /Pular para o conteúdo/i);
  assert.match(html, /data-cta=["']hero["']/i);
  assert.match(html, /data-cta=["']offer["']/i);
  assert.match(html, /data-cta=["']final["']/i);
  assert.match(script, /eleva5d_cta_click/i);
  assert.match(script, /eleva5d_scroll_depth/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /\.section-warm\s*\{[^}]*background:\s*var\(--b-sand\)/i);
  assert.match(styles, /\.faq\s*\{[^}]*background:\s*var\(--b-ink\)[^}]*color:\s*var\(--b-paper\)/i);
  assert.match(styles, /\.faq-list\s+summary\s*\{[^}]*color:\s*var\(--b-paper\)/i);
});

test('a variação B promovida usa a raiz como produção e não expõe rótulo interno', () => {
  const html = read('index.html');

  assert.match(html, /data-ab-variant=["']B["']/i);
  assert.match(html, /property=["']og:url["'][^>]+content=["']https:\/\/kalifranca\.com\.br\/["']/i);
  assert.doesNotMatch(html, /variação B/i);
  assert.doesNotMatch(html, /\.\.[\\/]fotos|\.\.[\\/]assets|\.\.[\\/]brandbook/i);
});
