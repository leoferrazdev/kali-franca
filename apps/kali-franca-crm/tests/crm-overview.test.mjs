import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getTodayMetrics, demoLeads, demoTasks, FUNNEL_STATES } from '../lib/demo-data.mjs';

test('calcula os seis indicadores da Visão Geral a partir dos dados locais', () => {
  const metrics = getTodayMetrics(demoLeads, demoTasks, new Date('2026-08-13T15:00:00-03:00'));
  assert.deepEqual(metrics, { newLeads: 5, qualifying: 2, offers: 2, won: 1, lost: 1, pendingTasks: 3 });
});

test('a tela inicial explicita os cinco estados e usa a fonte real do CRM', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/page.tsx'), 'utf8');
  for (const state of FUNNEL_STATES) assert.match(source, new RegExp(state.label));
  assert.match(source, /from\('leads'\)/);
});
