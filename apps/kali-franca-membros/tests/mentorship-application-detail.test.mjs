import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const listPath = resolve(root, 'app', 'membros', 'aplicacoes', 'mentoria-frequencia-da-abundancia', 'page.tsx');
const detailPath = resolve(root, 'app', 'membros', 'aplicacoes', 'mentoria-frequencia-da-abundancia', '[id]', 'page.tsx');
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');

test('a inbox aponta cada aplicação para uma tela de preenchimento individual', () => {
  const list = read(listPath);

  assert.match(list, /href=.*mentoria-frequencia-da-abundancia\/\$\{application\.id\}/);
  assert.match(list, /Ver aplicação completa/i);
  assert.doesNotMatch(list, /<details|<summary/);
});

test('a tela individual exige administradora e consulta somente o registro da mentoria', () => {
  const detail = read(detailPath);

  assert.ok(existsSync(detailPath), 'a rota individual deve existir');
  assert.match(detail, /createSupabaseServerClient/);
  assert.match(detail, /auth\.getUser/);
  assert.match(detail, /profiles/);
  assert.match(detail, /administradora/);
  assert.match(detail, /mentorship_applications/);
  assert.match(detail, /mentorship_slug/);
  assert.match(detail, /\.eq\(['"]id['"],\s*id\)/);
  assert.match(detail, /notFound|não encontrada|não foi encontrada/i);
  assert.match(detail, /APPLICATIONS_PATH\s*=\s*['"]\/membros\/aplicacoes\/mentoria-frequencia-da-abundancia['"]/);
  assert.match(detail, /href=\{APPLICATIONS_PATH\}/);
  assert.match(detail, /full_name/);
  assert.match(detail, /predominant_feeling/);
  assert.match(detail, /investment_readiness/);
  assert.match(detail, /consented_at/);
  assert.match(detail, /Somente leitura|somente leitura|read-only/i);
  assert.doesNotMatch(detail, /service_role/i);
  assert.doesNotMatch(detail, /\.delete\(|\.update\(/);
});
