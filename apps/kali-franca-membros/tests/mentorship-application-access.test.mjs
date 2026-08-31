import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pagePath = resolve(root, 'app', 'membros', 'aplicacoes', 'mentoria-frequencia-da-abundancia', 'page.tsx');
const detailPath = resolve(root, 'app', 'membros', 'aplicacoes', 'mentoria-frequencia-da-abundancia', '[id]', 'page.tsx');
const navigationPath = resolve(root, 'app', 'components', 'MemberNavigation.tsx');
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');

test('o CRM de aplicações fica dentro de membros e exige administradora', () => {
  const page = read(pagePath);
  const detail = read(detailPath);
  const navigation = read(navigationPath);

  assert.ok(existsSync(pagePath), 'a rota administrativa deve existir');
  assert.match(page, /createSupabaseServerClient/);
  assert.match(page, /auth\.getUser/);
  assert.match(page, /profiles/i);
  assert.match(page, /administradora/i);
  assert.match(page, /mentorship_applications/i);
  assert.match(page, /created_at/i);
  assert.match(page, /full_name/i);
  assert.match(detail, /investment_readiness/i);
  assert.match(page, /redirect|forbidden|notFound/i);
  assert.match(navigation, /aplicacoes\/mentoria-frequencia-da-abundancia/i);
  assert.match(navigation, /isAdministrator/);
});

test('a superfície administrativa declara leitura responsiva e sem edição na V1', () => {
  const page = read(pagePath);
  const detail = read(detailPath);

  assert.match(page, /Aplicações|aplicações/i);
  assert.match(page, /Mentoria Frequência da Abundância/i);
  assert.match(`${page}\n${detail}`, /respostas|detalhes|detail|preenchimento completo/i);
  assert.match(`${page}\n${detail}`, /read-only|somente leitura|não permitir edição|não.*editar/i);
  assert.doesNotMatch(`${page}\n${detail}`, /service_role/i);
});
