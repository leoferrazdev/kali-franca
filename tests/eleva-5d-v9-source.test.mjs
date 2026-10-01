import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'lp-5d/v9/index.html'), 'utf8');
const source = fs.readFileSync(path.join(root, 'conteudo-eleva-5d/CONTEÚDO ELEVA 5D - FINAL.md'), 'utf8');
const normalize = (value) => value.replace(/\s+/g, ' ').trim();

test('a V9 mantém todos os 30 temas da fonte final e sua ordem cronológica', () => {
  const days = [...source.matchAll(/\*\*Dia (\d+):\*\* Elevando sua frequência para (.+)/g)];
  assert.equal(days.length, 30);
  let position = -1;
  for (const [, number, theme] of days) {
    const next = html.indexOf(`<span>${number.padStart(2, '0')}</span><p>${normalize(theme)}</p>`, position + 1);
    assert.ok(next > position, `Dia ${number} ausente ou fora da ordem do documento`);
    position = next;
  }
  assert.equal((html.match(/data-phase="/g) || []).length, 4);
});

test('a V9 apresenta as três masterclasses e os oito bônus nomeados na fonte', () => {
  for (const item of [
    'O Despertar da Consciência', 'A Reprogramação do Campo', 'A Arte da Manifestação 5D',
    'Protocolo de Manifestação Rápida', 'Protocolo Soluções Mágicas', 'Protocolo DNA da Riqueza',
    'Protocolo de Elevação de Vitalidade', 'Âncoras Vibracionais Diárias', 'Diário da Vida Sensacional',
    'Playlist Oficial Eleva Frequência', 'Ferramenta de Mudança de Linha do Tempo',
  ]) assert.ok(html.includes(item), `Entregável ausente: ${item}`);
  assert.ok(html.includes('áudio teórico e um vídeo rápido de Hiperfluxo por dia'));
});

test('todos os assets locais, âncoras e imagens da V9 resolvem em arquivos reais', () => {
  for (const [, attribute, url] of html.matchAll(/\b(src|href|srcset)="([^"]+)"/g)) {
    if (url.startsWith('https:')) continue;
    if (url.startsWith('#')) {
      assert.ok(html.includes(`id="${url.slice(1)}"`), `Âncora não resolvida: ${url}`);
      continue;
    }
    const filename = url.split('?')[0];
    const target = filename.startsWith('/') ? path.join(root, filename) : path.join(root, 'lp-5d/v9', filename);
    assert.ok(fs.existsSync(target), `${attribute} não resolvido: ${url}`);
    if (/\.(webp|jpg)$/.test(filename)) {
      const signature = fs.readFileSync(target).subarray(0, 12);
      assert.ok(signature.toString('ascii', 0, 4) === 'RIFF' || signature[0] === 0xff, `Imagem inválida: ${filename}`);
    }
  }
});

test('a V9 identifica a origem da prova e oferece um próximo passo acionável', () => {
  assert.ok(html.includes('Esses relatos se referem à mentoria da Kalì.'));
  assert.ok(html.includes('Prévia ilustrativa da organização da experiência.'));
  assert.match(html, /data-cta="offer-contact"/);
  assert.match(html, /href="https:\/\/wa\.me\/message\/R6WHM3W3SGCSE1"/);
  assert.doesNotMatch(html, /data-cta="offer-contact"[^>]*href="#oferta"/);
  assert.doesNotMatch(html, /DEPOIMENTO REAL \d|IA Eu Soul|em até \d+ dias|vagas restantes|contador regressivo/i);
});

test('a V9 preserva preço, acesso anual e garantia aprovados no projeto', () => {
  assert.ok(html.includes('R$497'));
  assert.ok(html.includes('acesso anual ao Método,'));
  assert.ok(html.includes('Entre, experimente durante 7 dias e decida se o Eleva 5D faz sentido para você.'));
  assert.equal((html.match(/<h1 /g) || []).length, 1);
});
