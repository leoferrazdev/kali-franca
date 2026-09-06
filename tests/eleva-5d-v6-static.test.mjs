import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v5Path = path.join(root, 'lp-5d', 'v5', 'index.html');
const v6Path = path.join(root, 'lp-5d', 'v6', 'index.html');
const v6CssPath = path.join(root, 'lp-5d', 'v6', 'styles.css');

test('a V6 nasce como uma rota própria derivada da V5', () => {
  assert.ok(fs.existsSync(v6Path), 'A rota lp-5d/v6 deve existir');
  const html = fs.readFileSync(v6Path, 'utf8');

  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v6\//);
  assert.match(html, /class="v3-flow v4-flow v5-flow v6-flow"/);
  assert.match(html, /data-v5="true"/);
  assert.match(html, /data-v6="true"/);
  assert.match(html, /styles\.css\?v=v6-1/);
});

test('a V6 preserva a experiência visual e a oferta da V5', () => {
  const v5 = fs.readFileSync(v5Path, 'utf8');
  const v6 = fs.readFileSync(v6Path, 'utf8');

  assert.match(v6, /Veja como é estar dentro do Eleva 5D\./);
  assert.match(v6, /Prévia visual do aplicativo Eleva 5D/);
  assert.match(v6, /Entre, experimente durante 7 dias e decida se o Eleva 5D faz sentido para você\./);
  assert.match(v6, /R\$497/);
  assert.match(v6, /Como o acesso é liberado após a compra\?/);
  assert.match(v6, /id="oferta"/);
  assert.match(v6, /id="faq"/);
  assert.equal(v6.match(/id="experiencia-app"/g)?.length, 1);
  assert.equal(v5.match(/id="experiencia-app"/g)?.length, 1);
});

test('a V6 conecta a autoridade da Kalì ao problema central da jornada', () => {
  const html = fs.readFileSync(v6Path, 'utf8');
  const authority = html.slice(html.indexOf('id="especialista"'), html.indexOf('id="oferta"'));

  assert.match(authority, /08 \/ quem vai te conduzir/);
  assert.match(authority, /Eu também precisei aprender a voltar para mim\./);
  assert.match(authority, /Eu sou Kalì Franca, terapeuta energética e mentora há 8 anos\./);
  assert.match(authority, /O que mudou meu caminho não foi descobrir uma forma de nunca mais sentir medo\./);
  assert.match(authority, /aprender a perceber quando eu tinha saído de mim — e construir maneiras de voltar\./);
  assert.match(authority, /mais de <strong>2\.500 pessoas<\/strong>/);
  assert.match(authority, /mais de <strong>10 países<\/strong>/);
  assert.match(authority, /mais de <strong>15 milhões de pessoas<\/strong>/);
  assert.match(authority, /8 anos de atuação · 2\.500\+ pessoas atendidas · 10\+ países · 8\+ formações/);
  assert.match(authority, /Você não precisa se tornar outra pessoa\. Precisa aprender o caminho de volta para quem você já sabe que é\./);
  assert.match(authority, /kali-expansao-editorial-vertical-01\.png[^>]+loading="eager"[^>]+fetchpriority="high"/);
  assert.doesNotMatch(authority, /neurociência/);
  assert.doesNotMatch(authority, /15M\+/);
  assert.doesNotMatch(authority, /Eu não criei o Eleva 5D depois de encontrar todas as respostas/);
});

test('a V6 aplica leitura editorial responsiva ao novo bloco de autoridade', () => {
  const css = fs.readFileSync(v6CssPath, 'utf8');

  assert.match(css, /\.v6-flow \.authority-copy > p:not\([^}]+line-height: 1\.65/);
  assert.match(css, /\.v6-flow \.authority-proof-line[\s\S]*?border-top/);
  assert.match(css, /@media \(max-width:\s*56\.25rem\)[\s\S]*?\.v6-flow \.authority-copy/);
  assert.match(css, /@media \(max-width:\s*37\.5rem\)[\s\S]*?\.v6-flow \.authority-proof-line/);
});

test('a V6 mantém a sequência editorial e usa prints reais autorizados', () => {
  const html = fs.readFileSync(v6Path, 'utf8');
  const indices = [...html.matchAll(/<p class="section-index">(\d{2}) \/ /g)].map((match) => match[1]);
  const v6App = fs.readFileSync(path.join(root, 'lp-5d', 'v6', 'app.js'), 'utf8');
  const v5App = fs.readFileSync(path.join(root, 'lp-5d', 'v5', 'app.js'), 'utf8');

  assert.deepEqual(indices, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
  assert.doesNotMatch(html, /data-proof-status="pending-real-testimonial"/);
  assert.match(html, /data-proof-status="real-testimonial"/g);
  assert.equal(html.match(/data-proof-status="real-testimonial"/g)?.length, 3);
  assert.match(html, /\.\.\/\.\.\/depoimentos\/4\.jpeg/);
  assert.match(html, /\.\.\/\.\.\/depoimentos\/3\.jpeg/);
  assert.match(html, /\.\.\/\.\.\/depoimentos\/5\.jpeg/);
  assert.match(html, /Relato real compartilhado com autorização de uso/);
  assert.match(html, /De oscilação para sustentação/);
  assert.match(html, /De entendimento para movimento/);
  assert.match(html, /De esforço para confiança/);
  assert.doesNotMatch(html, /Eu Soul|sua guia particular/);
  assert.equal(v6App, v5App);
});

test('os três prints selecionados existem como assets locais da prova social', () => {
  for (const file of ['4.jpeg', '3.jpeg', '5.jpeg']) {
    assert.ok(fs.existsSync(path.join(root, 'depoimentos', file)), `depoimentos/${file} deve existir`);
  }
});
