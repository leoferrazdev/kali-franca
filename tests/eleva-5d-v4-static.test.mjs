import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v4Path = path.join(root, 'lp-5d', 'v4', 'index.html');
const v3Path = path.join(root, 'lp-5d', 'v3', 'index.html');

test('a V4 publica a nova primeira dobra do Eleva 5D', () => {
  assert.ok(fs.existsSync(v4Path), 'A rota lp-5d/v4 deve existir');
  const html = fs.readFileSync(v4Path, 'utf8');

  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v4\//);
  assert.match(html, /data-v4="true"/);
  assert.match(html, /<p class="eyebrow">ELEVA 5D<\/p>/);
  assert.match(html, /<h1 id="hero-title">Pare de acessar a sua melhor versão por alguns momentos e voltar ao medo logo depois\.<\/h1>/);
  assert.match(html, /Em 20 minutos por dia, o Eleva 5D te guia por uma prática de 30 dias para reprogramar a forma como você se enxerga, voltar ao seu centro e começar a agir a partir da mulher que já sabe a vida que quer viver\./);
  assert.match(html, /Sem transformar o seu desenvolvimento pessoal em mais uma obrigação\./);
  assert.match(html, /<p class="hero-steps"><strong>Reprogramar\. Alinhar\. Manifestar\.<\/strong> Três movimentos diários para você sair da oscilação entre “eu sei que sou capaz” e “será que isso é mesmo para mim\?” — até confiança, presença e realização deixarem de ser momentos isolados e começarem a fazer parte da sua identidade\.<\/p>/);
  assert.match(html, /<li><strong>20 minutos por dia<\/strong><\/li>/);
  assert.match(html, /<li><strong>30 dias guiados<\/strong><\/li>/);
  assert.match(html, /<li><strong>aplicativo personalizado<\/strong><\/li>/);
  assert.match(html, /QUERO COMEÇAR MINHA JORNADA NO ELEVA 5D/);
});

test('a V4 altera somente a primeira dobra em relação à V3', () => {
  const v3 = fs.readFileSync(v3Path, 'utf8');
  const v4 = fs.readFileSync(v4Path, 'utf8');
  const downstreamMarker = '<section class="section section-paper recognition"';

  assert.equal(
    v4.slice(v4.indexOf(downstreamMarker)),
    v3.slice(v3.indexOf(downstreamMarker)),
    'O conteúdo posterior à primeira dobra deve permanecer idêntico'
  );
});
