import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v7Path = path.join(root, 'lp-5d', 'v7', 'index.html');
const v8Path = path.join(root, 'lp-5d', 'v8', 'index.html');

test('a V8 existe como cópia independente da V7', () => {
  assert.ok(fs.existsSync(v8Path), 'A rota lp-5d/v8 deve existir');
  if (!fs.existsSync(v8Path)) return;

  const html = fs.readFileSync(v8Path, 'utf8');
  const v7 = fs.readFileSync(v7Path, 'utf8');
  assert.match(html, /data-v8="true"/);
  assert.match(html, /styles\.css\?v=v8-1/);
  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v8\//);
  assert.deepEqual([...html.matchAll(/<p class="section-index">(\d{2}) \/ /g)].map((match) => match[1]), ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
  assert.notEqual(html, v7, 'A V8 deve preservar a V7 e possuir identificadores próprios');
});

test('a V8 aplica o texto final do PDF na jornada e na oferta', () => {
  const html = fs.readFileSync(v8Path, 'utf8');
  for (const copy of [
    'Chegou a hora de viver a sua potência máxima como a Criadora Divina que você é.',
    '30 dias de sintonização',
    'Você reconhece alguma dessas frases no seu momento?',
    'Não é sobre mais esforço. Você apenas esqueceu que é a própria Fonte em ação.',
    'Três Âncoras Vibracionais',
    'O prazer de ser você.',
    'Evidências do Colapso da Realidade',
    'Tudo o que você precisa para transformar um novo estado em uma nova identidade.',
    'Entre, experimente durante 7 dias e decida se o Eleva 5D faz sentido para você.',
    'Funciona pelo celular?'
  ]) {
    assert.match(html, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Texto ausente: ${copy}`);
  }
  assert.doesNotMatch(html, /IA Eu Soul/);
  assert.match(html, /data-proof-status="real-testimonial"/g);
});

test('a V8 preserva os assets reais e a prévia conceitual do aplicativo', () => {
  const html = fs.readFileSync(v8Path, 'utf8');
  assert.match(html, /06 \/ dentro do aplicativo/);
  assert.match(html, /prévia conceitual/);
  assert.match(html, /\.\.\/\.\.\/depoimentos\/1\.jpeg/);
  assert.match(html, /\.\.\/\.\.\/depoimentos\/(3|5)\.jpeg/);
  assert.ok(fs.existsSync(path.join(root, 'fotos', 'geradas-ia', 'kali-hero-autoridade-horizontal-02.png')));
});
