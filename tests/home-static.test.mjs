import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const homePath = resolve(repositoryRoot, 'index.html');
const stylesPath = resolve(repositoryRoot, 'styles.css');
const scriptPath = resolve(repositoryRoot, 'app.js');
const tokensPath = resolve(repositoryRoot, 'brandbook/tokens.css');

function read(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

test('a raiz publica a página Eleva 5D promovida e mantém estrutura semântica', () => {
  const html = read(homePath);

  assert.ok(existsSync(homePath));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /data-ab-variant=["']B["']/i);
  assert.match(html, /Eleva 5D/i);
  assert.match(html, /Kalì Franca/i);
});

test('a raiz apresenta os cinco movimentos e as seções principais da jornada', () => {
  const html = read(homePath);

  for (const id of ['metodo', 'especialista', 'oferta']) {
    assert.match(html, new RegExp(`id=["']${id}["']`, 'i'));
    assert.match(html, new RegExp(`href=["']#${id}["']`, 'i'));
  }
  assert.match(html, /id=["']rotina["']/i);
  assert.match(html, /id=["']faq["']/i);

  for (const movement of ['Reprogramar', 'Alinhar', 'Manifestar', 'Sustentar', 'Elevar']) {
    assert.match(html, new RegExp(movement, 'i'));
  }

  assert.match(html, /20 minutos por dia/i);
  assert.match(html, /Eu Soul/i);
  assert.match(html, /Corte Energético/i);
});

test('a raiz usa a identidade compartilhada e os caminhos de produção', () => {
  const html = read(homePath);
  const styles = read(stylesPath);
  const tokens = read(tokensPath);

  assert.match(html, /brandbook\/tokens\.css/i);
  assert.match(html, /fotos\/geradas-ia\/kali-hero-autoridade-horizontal-02\.png/i);
  assert.match(html, /assets\/kali-expansao-editorial-vertical-01\.png/i);
  assert.match(html, /styles\.css\?v=faq-contrast-1/i);
  assert.match(html, /https:\/\/kalifranca\.com\.br\//i);
  assert.ok(existsSync(stylesPath));
  assert.ok(existsSync(tokensPath));
  assert.ok(existsSync(scriptPath));
  assert.match(styles, /Cormorant(?:\+|\s)Garamond/i);
  assert.match(styles, /Jost/i);
  assert.match(styles, /IBM(?:\+|\s)Plex(?:\+|\s)Mono/i);
  assert.match(tokens, /--kf-component-button-primary-bg:\s*var\(--kf-color-accent\)/i);
});

test('a raiz usa contratos de acessibilidade, movimento e tracking', () => {
  const html = read(homePath);
  const styles = read(stylesPath);
  const script = read(scriptPath);

  assert.match(html, /Pular para o conteúdo/i);
  assert.match(html, /data-cta=["']hero["']/i);
  assert.match(html, /data-cta=["']offer["']/i);
  assert.match(html, /data-cta=["']final["']/i);
  assert.match(script, /eleva5d_cta_click/i);
  assert.match(script, /eleva5d_scroll_depth/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /@media\s*\([^)]*prefers-reduced-motion/i);
  assert.match(styles, /min-height:\s*44px/);
});

test('a FAQ publicada mantém contraste legível e cache-busting do CSS', () => {
  const html = read(homePath);
  const styles = read(stylesPath);

  assert.match(html, /styles\.css\?v=faq-contrast-1/i);
  assert.match(styles, /\.section-warm\s*\{[^}]*background:\s*var\(--b-sand\)/i);
  assert.match(styles, /\.faq\s*\{[^}]*background:\s*var\(--b-ink\)[^}]*color:\s*var\(--b-paper\)/i);
  assert.match(styles, /\.faq-list\s+summary\s*\{[^}]*color:\s*var\(--b-paper\)/i);
  assert.match(styles, /\.faq-list\s+details\s+p\s*\{[^}]*color:\s*rgba\(244,237,228,.72\)/i);
});

test('a raiz usa as fotos aprovadas e não expõe rótulo interno da variação', () => {
  const html = read(homePath);

  assert.match(html, /property=["']og:image["'][^>]+content=["']https:\/\/kalifranca\.com\.br\/assets\/kali-og-social-authority\.png["']/i);
  assert.match(html, /name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i);
  assert.doesNotMatch(html, /profile\.jpg/i);
  assert.doesNotMatch(html, /variação B/i);
  assert.doesNotMatch(html, /Conhecer o brandbook|Abrir o brandbook/i);
});

test('a raiz humaniza a especialista com autoria explícita', () => {
  const html = read(homePath);

  assert.match(html, /Condução criada por/i);
  assert.match(html, /Kalì Franca/i);
  assert.match(html, /Eu não criei o Eleva 5D/i);
  assert.match(html, /Terapeuta Energética e Mentora há 8 anos/i);
});
