import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v5Path = path.join(root, 'lp-5d', 'v5', 'index.html');
const v5CssPath = path.join(root, 'lp-5d', 'v5', 'styles.css');

test('a V5 existe em rota própria e mantém a V4 separada', () => {
  assert.ok(fs.existsSync(v5Path), 'A rota lp-5d/v5 deve existir');
  const html = fs.readFileSync(v5Path, 'utf8');

  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v5\//);
  assert.match(html, /class="v3-flow v4-flow v5-flow"/);
  assert.match(html, /data-v4="true"/);
  assert.match(html, /data-v5="true"/);
  assert.match(html, /styles\.css\?v=v5-1/);
});

test('a V5 não mantém o bloco textual repetido da V4', () => {
  const html = fs.readFileSync(v5Path, 'utf8');

  assert.doesNotMatch(html, /Cinco espaços|id="spaces-title"|data-scroll-marker="spaces"/);
});

test('o bloco 06 demonstra a experiência do aplicativo', () => {
  const html = fs.readFileSync(v5Path, 'utf8');
  const experience = html.slice(html.indexOf('id="experiencia-app"'), html.indexOf('id="marco"'));

  assert.match(experience, /06 \/ dentro do aplicativo/);
  assert.match(experience, /Veja como é estar dentro do Eleva 5D\./);
  assert.match(experience, /prévia da experiência/);
  assert.match(experience, /Início do dia/);
  assert.match(experience, /Player do áudio/);
  assert.match(experience, /Caderno da Criadora/);
  assert.match(experience, /Âncoras Divinas/);
  assert.match(experience, /Mapa da Realização/);
  assert.doesNotMatch(experience, /Cinco espaços/);
});

test('a V5 estiliza o módulo de experiência para os breakpoints principais', () => {
  const css = fs.readFileSync(v5CssPath, 'utf8');

  assert.match(css, /\.v5-flow \.app-experience-layout\s*\{[\s\S]*?grid-template-columns/);
  assert.match(css, /\.v5-flow \.app-experience-states\s*\{[\s\S]*?grid-template-columns/);
  assert.match(css, /@media \(max-width:\s*56\.25rem\)[\s\S]*?\.v5-flow \.app-experience-layout/);
  assert.match(css, /@media \(max-width:\s*37\.5rem\)[\s\S]*?\.v5-flow \.app-experience-states/);
  assert.match(css, /prefers-reduced-motion/);
});

test('a V5 usa garantia de experimentação e FAQ orientado à decisão', () => {
  const html = fs.readFileSync(v5Path, 'utf8');
  const offer = html.slice(html.indexOf('id="oferta"'), html.indexOf('id="faq"'));
  const faq = html.slice(html.indexOf('id="faq"'), html.indexOf('class="final-cta'));

  assert.match(offer, /Entre, experimente durante 7 dias e decida se o Eleva 5D faz sentido para você\./);
  assert.match(faq, /Como o acesso é liberado após a compra\?/);
  assert.match(faq, /Quando posso começar a jornada\?/);
  assert.match(faq, /Existe suporte durante a jornada\?/);
  assert.match(offer, /<strong>R\$497<\/strong>/);
  assert.match(offer, /acesso anual ao Método, pelo seu aplicativo personalizado/);
});

test('a V5 preserva a sequência editorial e a prova real pendente', () => {
  const html = fs.readFileSync(v5Path, 'utf8');
  const indices = [...html.matchAll(/<p class="section-index">(\d{2}) \/ /g)].map((match) => match[1]);

  assert.deepEqual(indices, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
  assert.match(html, /data-proof-status="pending-real-testimonial"/);
  assert.doesNotMatch(html, /Eu Soul|sua guia particular/);
});

test('a V5 preserva o comportamento JavaScript da V4', () => {
  const v4App = fs.readFileSync(path.join(root, 'lp-5d', 'v4', 'app.js'), 'utf8');
  const v5App = fs.readFileSync(path.join(root, 'lp-5d', 'v5', 'app.js'), 'utf8');

  assert.equal(v5App, v4App);
});
