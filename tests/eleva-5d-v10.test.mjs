import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

test('home publica o conteúdo PPM aprovado e mantém as condições comerciais', () => {
  const html = read('lp-5d/v10/index.html');
  assert.match(html, /data-page-version="v10"/);
  assert.doesNotMatch(html, /Hiperfluxo|HIPERFLUXO|áudio teórico|referência aprovada/);
  for (const name of ['Protocolos de Permissão e Manifestação (PPM)', 'PPM | Minha vida sensacional', 'PPM | Soluções Mágicas Divinas', 'PPM | DNA da Riqueza', 'PPM | Saúde e Vitalidade', 'Playlist Oficial Eleva 5D', 'Mapa da Vida Sensacional &amp; Salto de Linha do Tempo', 'O segredo para receber mais é decidir e permitir.']) {
    assert.ok(html.includes(name), name);
  }
  assert.match(html, /20 minutos por dia/);
  assert.match(html, /acesso anual ao Método/);
  assert.match(html, /7 dias para experimentar/);
});

test('versão anterior permanece disponível e a nova reutiliza o mesmo layout e ativos', () => {
  const old = read('lp-5d/v9/index.html');
  const html = read('lp-5d/v10/index.html');
  assert.match(old, /Hiperfluxo/);
  const classes = s => [...s.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(classes(html), classes(old));
  assert.match(html, /\/lp-5d\/v9\/styles.css\?v=9.1/);
  for (const [, url] of html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)) {
    if (/^(https:|#)/.test(url)) continue;
    assert.ok(fs.existsSync(path.join(root, url.split('?')[0])), url);
  }
});
