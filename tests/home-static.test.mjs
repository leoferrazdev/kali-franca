import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const homePath = resolve(repositoryRoot, 'index.html');
const stylesPath = resolve(repositoryRoot, 'styles.css');
const tokensPath = resolve(repositoryRoot, 'brandbook/tokens.css');

function read(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

test('a raiz possui a página de vendas do Eleva 5D com estrutura semântica', () => {
  const html = read(homePath);

  assert.ok(existsSync(homePath));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Eleva 5D/i);
  assert.match(html, /Kalì Franca/i);
  assert.match(html, /uma escolha/i);
});

test('a raiz apresenta o ciclo, a rotina, a presença da especialista e o acesso', () => {
  const html = read(homePath);
  const ids = ['ciclo', 'rotina', 'presenca-kali', 'marco-inicial', 'acesso'];

  for (const id of ids) {
    assert.match(html, new RegExp(`id=["']${id}["']`, 'i'));
    assert.match(html, new RegExp(`href=["']#${id}["']`, 'i'));
  }

  for (const movement of ['Reprogramar', 'Alinhar', 'Manifestar', 'Sustentar', 'Elevar']) {
    assert.match(html, new RegExp(movement, 'i'));
  }

  assert.match(html, /Regra dos 3 Movimentos/i);
  assert.match(html, /Corte Energético/i);
});

test('a home consome o sistema compartilhado e o vocabulário tipográfico', () => {
  const html = read(homePath);
  const styles = read(stylesPath);
  const tokens = read(tokensPath);

  assert.match(html, /brandbook\/tokens\.css/i);
  assert.match(html, /styles\.css/i);
  assert.ok(existsSync(stylesPath));
  assert.ok(existsSync(tokensPath));
  assert.match(styles, /Cormorant(?:\+|\s)Garamond/i);
  assert.match(styles, /Jost/i);
  assert.match(styles, /IBM(?:\+|\s)Plex(?:\+|\s)Mono/i);
  assert.match(tokens, /--kf-component-button-primary-bg:\s*var\(--kf-color-accent\)/i);
});

test('a home usa os estados de interação e movimento acessíveis', () => {
  const html = read(homePath);
  const styles = read(stylesPath);

  assert.match(html, /Pular para o conteúdo/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /@media\s*\([^)]*prefers-reduced-motion/i);
  assert.match(styles, /min-height:\s*44px/);
});

test('a home não publica afirmações comerciais não validadas', () => {
  const html = read(homePath);

  assert.doesNotMatch(html, /\+2[.,]?500\s+vidas/i);
  assert.doesNotMatch(html, /10\s+países/i);
  assert.doesNotMatch(html, /depoimento|testemunho|garantia de resultado/i);
  assert.doesNotMatch(html, /R\$\s*[0-9]|checkout|comprar agora|experiência em construção|oferta em construção/i);
});

test('a home usa as fotos aprovadas recentes e não o retrato antigo', () => {
  const html = read(homePath);

  assert.match(html, /property=["']og:image["'][^>]+content=["']https:\/\/kalifranca\.com\.br\/assets\/kali-og-social-authority\.png["']/i);
  assert.match(html, /name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i);
  assert.match(html, /assets\/kali-hero-autoridade-horizontal-02\.png/i);
  assert.match(html, /assets\/kali-expansao-editorial-vertical-01\.png/i);
  assert.doesNotMatch(html, /profile\.jpg/i);
  assert.doesNotMatch(html, /href=["']\/brandbook\/?["']/i);
  assert.doesNotMatch(html, /Conhecer o brandbook|Abrir o brandbook/i);
});

test('a raiz humaniza a especialista com autoria explícita e primeira pessoa', () => {
  const html = read(homePath);

  assert.match(html, /Condução criada por Kalì Franca/i);
  assert.match(html, /Eu criei o Eleva 5D/i);
  assert.match(html, /especialista/i);
});

test('a grade dos cinco movimentos fecha a composição desktop sem lacunas artificiais', () => {
  const styles = read(stylesPath);

  assert.match(styles, /\.movement-card--wide\s*\{[\s\S]*grid-column:\s*span 3/i);
  assert.doesNotMatch(styles, /grid-column:\s*2\s*\/\s*span 4/i);
});

