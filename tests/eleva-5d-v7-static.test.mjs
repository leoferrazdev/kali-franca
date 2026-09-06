import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v6Path = path.join(root, 'lp-5d', 'v6', 'index.html');
const v7Path = path.join(root, 'lp-5d', 'v7', 'index.html');
const v7CssPath = path.join(root, 'lp-5d', 'v7', 'styles.css');

test('a V7 existe como rota independente da V6', () => {
  assert.ok(fs.existsSync(v7Path), 'A rota lp-5d/v7 deve existir');
  if (!fs.existsSync(v7Path)) return;

  const html = fs.readFileSync(v7Path, 'utf8');
  const v6 = fs.readFileSync(v6Path, 'utf8');
  assert.match(html, /data-v7="true"/);
  assert.match(html, /styles\.css\?v=v7-1/);
  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v7\//);
  assert.deepEqual([...html.matchAll(/<p class="section-index">(\d{2}) \/ /g)].map((match) => match[1]), ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
  assert.notEqual(html, v6, 'A V7 deve ter identificadores próprios sem alterar o arquivo da V6');
});

test('a V7 usa a foto aprovada como background seguro da hero', () => {
  assert.ok(fs.existsSync(v7CssPath), 'O CSS da V7 deve existir');
  if (!fs.existsSync(v7CssPath)) return;

  const html = fs.readFileSync(v7Path, 'utf8');
  const css = fs.readFileSync(v7CssPath, 'utf8');
  assert.match(css, /\.v7-flow \.hero[\s\S]*?background-image:[\s\S]*?kali-hero-autoridade-horizontal-02\.png/);
  assert.match(css, /\.v7-flow \.hero[\s\S]*?::before/);
  assert.match(css, /background-size:\s*cover/);
  assert.match(css, /background-position:[^;]+/);
  assert.match(css, /@media \(max-width:\s*37\.5rem\)[\s\S]*?\.v7-flow \.hero/);
  assert.doesNotMatch(html, /<figure class="hero-image image-frame">/);
});

test('a V7 preserva a jornada, a oferta e o comportamento da V6', () => {
  const html = fs.readFileSync(v7Path, 'utf8');
  const v6App = fs.readFileSync(path.join(root, 'lp-5d', 'v6', 'app.js'), 'utf8');
  const v7App = fs.readFileSync(path.join(root, 'lp-5d', 'v7', 'app.js'), 'utf8');
  assert.match(html, /R\$497/);
  assert.match(html, /data-proof-status="real-testimonial"/g);
  assert.match(html, /QUERO COMEÇAR MINHA JORNADA/);
  assert.match(html, /id="faq"/);
  assert.equal(v7App, v6App);
});

test('a imagem aprovada existe como asset local da V7', () => {
  assert.ok(fs.existsSync(path.join(root, 'fotos', 'geradas-ia', 'kali-hero-autoridade-horizontal-02.png')));
});
