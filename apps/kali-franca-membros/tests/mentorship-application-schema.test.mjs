import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', '..', '..');
const migrationPath = resolve(root, 'supabase', 'migrations', '202608300002_mentorship_frequency_applications.sql');
const read = () => (existsSync(migrationPath) ? readFileSync(migrationPath, 'utf8') : '');

const fields = [
  'full_name', 'age_range', 'sex', 'email', 'whatsapp', 'city_state', 'challenge', 'beliefs',
  'energy_tools_experience', 'priority_area', 'current_state', 'predominant_feeling',
  'previous_support', 'perceived_block', 'desired_wins', 'commitment_score', 'investment_readiness'
];

test('a migração cria a tabela exclusiva da aplicação com o contrato completo', () => {
  const sql = read();

  assert.ok(existsSync(migrationPath), 'a migração da mentoria deve existir');
  assert.match(sql, /create table public\.mentorship_applications/i);
  assert.match(sql, /mentorship_slug/i);
  assert.match(sql, /client_submission_id[\s\S]*unique/i);
  assert.match(sql, /consent\s+boolean/i);
  assert.match(sql, /consented_at\s+timestamptz/i);
  assert.match(sql, /status/i);
  assert.match(sql, /created_at\s+timestamptz/i);
  assert.match(sql, /updated_at\s+timestamptz/i);

  for (const field of fields) {
    assert.match(sql, new RegExp(`\\b${field}\\b`, 'i'), field);
  }

  assert.match(sql, /commitment_score[\s\S]*between\s+0\s+and\s+10/i);
  assert.match(sql, /frequencia-da-abundancia/i);
  assert.match(sql, /mentorship_slug[\s\S]*created_at/i);
});

test('a migração aplica RLS com inserção pública mínima e leitura somente administradora', () => {
  const sql = read();

  assert.match(sql, /alter table public\.mentorship_applications enable row level security/i);
  assert.match(sql, /create policy[\s\S]*for insert to anon/i);
  assert.match(sql, /create policy[\s\S]*for select to authenticated/i);
  assert.match(sql, /is_administradora\(\)/i);
  assert.match(sql, /grant insert[\s\S]*mentorship_applications to anon/i);
  assert.match(sql, /grant select[\s\S]*mentorship_applications to authenticated/i);
  assert.match(sql, /revoke all[\s\S]*mentorship_applications from anon/i);
  assert.doesNotMatch(sql, /service_role/i);
});
