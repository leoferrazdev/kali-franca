import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8').replace(/\r\n/g, '\n').trimEnd();
const html = read('index.html');
const archive = 'historico/home-anterior-2026-10-01';

test('a raiz promove a V9 integralmente sem alterar conteúdo e comportamentos', () => {
  const body = s => s.slice(s.indexOf('<body')).replaceAll('/lp-5d/v9/assets/', 'assets/');
  assert.equal(body(html), body(read('lp-5d/v9/index.html')));
  assert.match(html, /data-page-version="v9"/);
  assert.match(html, /rel="canonical" href="https:\/\/kalifranca.com.br\/"/);
  assert.match(html, /property="og:url" content="https:\/\/kalifranca.com.br\/"/);
  assert.match(html, /href="\/lp-5d\/v9\/styles.css\?v=9.1"/);
  assert.match(html, /src="\/lp-5d\/v9\/app.js\?v=9.1"/);
});

test('a raiz mantém imagens e recursos resolvidos após a mudança de endereço', () => {
  for (const [,url] of html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)) {
    if (/^(https:|#)/.test(url)) continue;
    assert.ok(fs.existsSync(path.join(root, url.split('?')[0])), url);
  }
  assert.match(html, /og:image" content="https:\/\/kalifranca.com.br\/lp-5d\/v9\/assets\/kali-social.jpg"/);
});

test('a página anterior permanece guardada com seus estilos e scripts e sem indexação', () => {
  const old = read(`${archive}/index.html`);
  assert.match(old, /data-ab-variant="B"/);
  assert.match(old, /name="robots" content="noindex,follow"/);
  assert.match(old, /<base href="\/">/);
  assert.equal(read(`${archive}/styles.css`), read('styles.css'));
  assert.equal(read(`${archive}/app.js`), read('app.js'));
});
