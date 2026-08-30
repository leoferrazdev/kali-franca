import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const bioPath = resolve(repositoryRoot, 'bio/index.html');
const stylesPath = resolve(repositoryRoot, 'bio/styles.css');
const tokensPath = resolve(repositoryRoot, 'brandbook/tokens.css');
const socialImagePath = resolve(repositoryRoot, 'profile.jpg');

function read(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

test('a bio pública possui os três destinos acordados', () => {
  const html = read(bioPath);

  assert.ok(existsSync(bioPath), 'bio/index.html deve existir');
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Mentoria/i);
  assert.match(html, /Eleva 5D:\s*Reprogramação, Alinhamento e Manifestação/i);
  assert.match(html, /Canal do YouTube/i);
  assert.match(html, /https:\/\/wa\.me\/message\/R6WHM3W3SGCSE1/i);
  assert.match(html, /https:\/\/www\.youtube\.com\/channel\/UCeaSCWbFhL3TOuIdYxzH3OQ/i);
  assert.doesNotMatch(html, /(?:<a|<button)[^>]+data-destination=["']reprogramacao["']/i);
  assert.equal((html.match(/data-destination=/gi) || []).length, 3);
});

test('a bio preserva compartilhamento, imagem e sistema tipográfico', () => {
  const html = read(bioPath);
  const styles = read(stylesPath);
  const tokens = read(tokensPath);

  assert.ok(existsSync(stylesPath), 'bio/styles.css deve existir');
  assert.ok(existsSync(tokensPath), 'brandbook/tokens.css deve existir');
  assert.ok(existsSync(socialImagePath), 'profile.jpg deve existir');
  assert.match(html, /\.\.\/profile\.jpg/i);
  assert.match(html, /property=["']og:image["'][^>]+content=["']https:\/\/kalifranca\.com\.br\/profile\.jpg["']/i);
  assert.match(html, /name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i);
  assert.match(html, /\.\.\/brandbook\/tokens\.css/i);
  assert.match(html, /styles\.css/i);
  assert.match(styles, /Cormorant(?:\+|\s)Garamond/i);
  assert.match(styles, /Jost/i);
  assert.match(styles, /IBM(?:\+|\s)Plex(?:\+|\s)Mono/i);
  assert.match(tokens, /--kf-color-bg-canvas:\s*var\(--kf-color-umbra-500\)/i);
});

test('a bio possui estrutura acessível e estados responsivos', () => {
  const html = read(bioPath);
  const styles = read(stylesPath);

  assert.match(html, /href=["']#conteudo["'][^>]*>[^<]*Pular para o conteúdo/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.match(html, /aria-label=["']Destinos da Kalì Franca["']/i);
  assert.match(html, /target=["']_blank["']/i);
  assert.match(html, /rel=["']noopener noreferrer["']/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /@media\s*\([^)]*prefers-reduced-motion/i);
  assert.match(styles, /min-height:\s*44px/);
});

test('a bio publica o manifesto de abundância aprovado', () => {
  const html = read(bioPath);

  for (const text of [
    'DOMINE A SUA FREQUÊNCIA.',
    'Saia do modo sobrevivência e assuma o seu lugar de Criadora Divina. No campo da 5D, a sua vontade e a vontade do Criador se tornam uma só — e a abundância deixa de ser uma busca para se tornar o seu estado natural.',
    'Mentoria Frequência da Abundância',
    'O acompanhamento individual para estabilizar sua nova identidade e viver em fluxo total com a sua Fonte Divina.',
    'QUERO ME ALINHAR AGORA →',
    'Eleva 5D: Reprogramação, Alinhamento e Manifestação',
    'Seu lugar sagrado para sustentar sua nova frequência e manifestar seus sonhos.',
    'AGUARDAR O NOVO MOVIMENTO →',
    'Canal do YouTube: Manifestação Prática',
    'Aulas profundas sobre como unir consciência e energia para moldar a sua vida com leveza.',
    'ASSISTIR AOS CONTEÚDOS →'
  ]) {
    assert.ok(html.includes(text), `a bio deve publicar: ${text}`);
  }

  assert.match(html, /<h1[^>]*>Mude a sua\s*<em>história\.<\/em><\/h1>/i);
});

test('a bio não publica afirmações comerciais não validadas', () => {
  const html = read(bioPath);

  assert.doesNotMatch(html, /\+2[.,]?500\s+vidas/i);
  assert.doesNotMatch(html, /10\s+países/i);
  assert.doesNotMatch(html, /depoimento|testemunho|garantia de resultado/i);
  assert.doesNotMatch(html, /R\$\s*[0-9]|checkout|comprar agora/i);
});
