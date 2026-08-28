import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const migrationPath = resolve(root, '..', '..', 'supabase/migrations/202608270001_initial_crm.sql');
const seedPath = resolve(root, '..', '..', 'supabase/seed.example.sql');

function readMigration() {
  return readFileSync(migrationPath, 'utf8').toLowerCase();
}

test('migration inicial existe e contém as entidades mínimas do CRM', () => {
  const sql = readMigration();

  for (const table of [
    'profiles',
    'leads',
    'interactions',
    'offers',
    'tasks',
    'funnel_events',
    'community_conversions',
  ]) {
    assert.match(sql, new RegExp(`create table public\\.${table}\\b`));
  }
});

test('migration preserva os estados e perfis determinados pelo CRM', () => {
  const sql = readMigration();

  assert.match(sql, /create type public\.app_role as enum/);
  assert.match(sql, /'administradora'/);
  assert.match(sql, /'comercial'/);
  assert.match(sql, /create type public\.lead_status as enum/);

  for (const status of ['novo', 'qualificando', 'oferta', 'ganho', 'perdido']) {
    assert.match(sql, new RegExp(`'${status}'`));
  }

  assert.match(sql, /status public\.lead_status not null default 'novo'/);
});

test('tabelas CRM possuem RLS e políticas para usuários autenticados', () => {
  const sql = readMigration();

  for (const table of [
    'profiles',
    'leads',
    'interactions',
    'offers',
    'tasks',
    'funnel_events',
    'community_conversions',
  ]) {
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`));
  }

  assert.match(sql, /current_app_role\(\)/);
  assert.match(sql, /is_admin_or_commercial\(\)/);
  assert.match(sql, /to authenticated/);
});

test('eventos do funil são append-only na primeira versão', () => {
  const sql = readMigration();

  assert.match(sql, /revoke update, delete on table public\.funnel_events from authenticated/);
  assert.match(sql, /create policy funnel_events_insert/);
  assert.doesNotMatch(sql, /create policy funnel_events_update/);
  assert.doesNotMatch(sql, /create policy funnel_events_delete/);
  assert.match(sql, /from_status public\.lead_status/);
  assert.match(sql, /to_status public\.lead_status not null/);
});

test('migration e seed não carregam credenciais ou dados reais', () => {
  const migration = readFileSync(migrationPath, 'utf8');
  const seed = readFileSync(seedPath, 'utf8');

  for (const content of [migration, seed]) {
    assert.doesNotMatch(content, /service[_-]?role/i);
    assert.doesNotMatch(content, /supabase\.co/i);
    assert.doesNotMatch(content, /password\s*[:=]/i);
  }
});
