import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => {
  const file = resolve(root, ...segments);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};
const readMigration = (name) => {
  const file = resolve(root, '..', '..', 'supabase', 'migrations', name);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};

function readTree(...segments) {
  const directory = resolve(root, ...segments);
  if (!existsSync(directory)) return '';

  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = resolve(directory, entry.name);
      if (entry.isDirectory()) return readTree(...segments, entry.name);
      return entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') ? [readFileSync(entryPath, 'utf8')] : [];
    })
    .join('\n');
}

test('o produto Eleva possui entrada autenticada e catálogo dos cinco movimentos', () => {
  assert.ok(existsSync(resolve(root, 'app', 'membros', 'eleva', 'page.tsx')));
  const page = read('app', 'membros', 'eleva', 'page.tsx');
  const catalog = read('lib', 'eleva', 'catalog.ts');

  assert.match(page, /createSupabaseServerClient|MemberShell/);
  assert.match(page, /redirect\(['"]\/login/);
  for (const movement of ['reprogramar', 'alinhar', 'manifestar', 'sustentar', 'elevar']) {
    assert.match(catalog, new RegExp(movement));
  }
});

test('a fundação declara estados honestos e não simula compra', () => {
  const sources = [
    read('lib', 'eleva', 'access.ts'),
    read('app', 'membros', 'eleva', 'page.tsx'),
  ].join('\n');

  assert.match(sources, /pending_purchase|suspended|active|preview/);
  assert.match(sources, /entitlement|acesso|compra/i);
  assert.doesNotMatch(sources, /fake|mockPurchase|compra.*aprovada|service_role/i);
});

test('a migration do Eleva cria catálogo, setup, atividades, eventos e RLS', () => {
  const migration = readMigration('202609040003_eleva_5d_foundation.sql');

  for (const table of [
    'eleva_products',
    'eleva_movements',
    'eleva_content_items',
    'eleva_member_setups',
    'eleva_daily_activities',
    'eleva_progress_events',
  ]) assert.match(migration, new RegExp(`create table public\\.${table}`));

  assert.match(migration, /enable row level security/i);
  assert.match(migration, /auth\.uid\(\)/);
  assert.match(migration, /eleva-5d/);
});

test('o onboarding e o progresso preservam acessibilidade e privacidade', () => {
  const sources = readTree('app', 'membros', 'eleva');
  const globals = read('app', 'globals.css');

  assert.match(sources, /<label/);
  assert.match(sources, /aria-describedby|aria-live/);
  assert.match(sources, /initialCutText|initial_cut_text/);
  assert.match(sources, /activityDate|activity_date/);
  assert.match(globals, /:focus-visible/);
  assert.match(globals, /prefers-reduced-motion/);
});

test('o catálogo preserva a ordem e o foco dos cinco movimentos', () => {
  const catalog = read('lib', 'eleva', 'catalog.ts');
  assert.match(catalog, /position: 1[\s\S]*reprogramar/);
  assert.match(catalog, /position: 2[\s\S]*alinhar/);
  assert.match(catalog, /position: 3[\s\S]*manifestar/);
  assert.match(catalog, /position: 4[\s\S]*sustentar/);
  assert.match(catalog, /position: 5[\s\S]*elevar/);
});

test('o resolver separa usuário autenticado de compra', () => {
  const access = read('lib', 'eleva', 'access.ts');
  assert.match(access, /resolveElevaAccess/);
  assert.match(access, /pending_purchase/);
  assert.match(access, /user\.id|auth\.getUser/);
  assert.doesNotMatch(access, /query.*email|searchParams.*email|password/i);
});
