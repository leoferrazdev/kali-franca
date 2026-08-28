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

test('a home possui estrutura editorial pública e semântica', () => {
  const html = read(homePath);

  assert.ok(existsSync(homePath));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Demonstração pública/i);
  assert.match(html, /oferta em construção/i);
  assert.match(html, /Expansão(?:\s|<[^>]+>)*da(?:\s|<[^>]+>)*Potência/i);
});

test('a home possui as cinco seções aprovadas e navegação interna', () => {
  const html = read(homePath);
  const ids = ['passagem', 'pilares', 'sistema', 'proximo-movimento'];

  for (const id of ids) {
    assert.match(html, new RegExp(`id=["']${id}["']`, 'i'));
    assert.match(html, new RegExp(`href=["']#${id}["']`, 'i'));
  }
});

test('a home consome o sistema compartilhado e o vocabulário tipográfico', () => {
  const html = read(homePath);
  const styles = read(stylesPath);
  const tokens = read(tokensPath);

  assert.match(html, /brandbook\/tokens\.css/i);
  assert.match(html, /styles\.css/i);
  assert.ok(existsSync(stylesPath));
  assert.ok(existsSync(tokensPath));
  assert.match(styles, /Cormorant Garamond/i);
  assert.match(styles, /Jost/i);
  assert.match(styles, /IBM Plex Mono/i);
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
  assert.doesNotMatch(html, /R\$\s*[0-9]|checkout|comprar agora/i);
});

test('a home preserva a prévia pública de compartilhamento', () => {
  const html = read(homePath);

  assert.match(html, /property=["']og:image["'][^>]+content=["']https:\/\/kalifranca\.com\.br\/profile\.jpg["']/i);
  assert.match(html, /name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i);
  assert.match(html, /href=["']\/brandbook\/?["'][^>]*>[^<]*(sistema|brandbook)/i);
});
