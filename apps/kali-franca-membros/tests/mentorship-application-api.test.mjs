import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const routePath = resolve(root, 'app', 'api', 'mentoria-frequencia-da-abundancia', 'applications', 'route.ts');
const validationPath = resolve(root, 'lib', 'mentorship', 'frequency-application.ts');
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');

test('a API expõe somente o envio público controlado', () => {
  const route = read(routePath);
  const validation = read(validationPath);

  assert.ok(existsSync(routePath), 'a rota da API deve existir');
  assert.ok(existsSync(validationPath), 'a validação compartilhada deve existir');
  assert.match(route, /export async function POST/i);
  assert.match(route, /export async function OPTIONS/i);
  assert.match(`${route}\n${validation}`, /https:\/\/kalifranca\.com\.br/i);
  assert.match(route, /Origin/i);
  assert.match(route, /201|NextResponse\.json/i);
  assert.match(route, /mentorship_applications/i);
  assert.match(route, /client_submission_id/i);
  assert.doesNotMatch(route, /service_role/i);
  assert.match(validation, /consent/i);
  assert.match(validation, /honeypot/i);
  assert.match(validation, /email/i);
  assert.match(validation, /commitment_score/i);
  assert.match(validation, /investment_readiness/i);
});

test('a API não aceita privilégios, expõe PII ou perde o estado em falha', () => {
  const route = read(routePath);
  const validation = read(validationPath);
  const source = `${route}\n${validation}`;

  assert.match(source, /created_at|updated_at|status/);
  assert.match(source, /allowed|accepted|pick|omit|whitelist|fields/i);
  assert.match(source, /body|content-length|size|limit/i);
  assert.match(source, /duplicate|conflict|23505|idempot/i);
  assert.doesNotMatch(source, /console\.(log|error).*?(email|whatsapp|challenge|beliefs|predominant|desired)/i);
  assert.doesNotMatch(source, /return[^\n]*(full_name|email|whatsapp|beliefs|challenge)/i);
});
