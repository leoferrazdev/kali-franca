import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const appRoot = root;

function read(relativePath) {
  return readFileSync(resolve(appRoot, relativePath), 'utf8');
}

test('o CRM possui login Supabase e proteção de sessão por middleware', () => {
  const login = read('app/login/page.tsx');
  const middleware = read('middleware.ts');

  assert.match(login, /signInWithPassword/);
  assert.match(read('lib/supabase/browser.ts'), /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(middleware, /createServerClient/);
  assert.match(middleware, /login/);
  assert.match(middleware, /auth\.getUser/);
  assert.match(login, /usuários administradores ou comerciais/);
});

test('a Visão Geral consulta a sessão e dados reais do Supabase', () => {
  const page = read('app/page.tsx');

  assert.match(page, /dynamic = ['"]force-dynamic['"]/);
  assert.doesNotMatch(page, /demoLeads|demoTasks|Protótipo com dados fictícios/);
  assert.match(read('lib/supabase/server.ts'), /createServerClient/);
  assert.match(page, /from\('leads'\)/);
  assert.match(page, /from\('offers'\)/);
  assert.match(page, /from\('funnel_events'\)/);
  assert.match(page, /from\('tasks'\)/);
  assert.match(page, /profiles/);
});

test('a Visão Geral trata erro de configuração e ausência de perfil operacional', () => {
  const page = read('app/page.tsx');

  assert.match(page, /Configuração do Supabase/);
  assert.match(page, /perfil operacional/i);
  assert.match(page, /perfil administrador ou comercial/);
  assert.match(page, /Usuário administrador/);
  assert.match(page, /Usuário comercial/);
});

test('o cliente server não expõe service role nem credenciais privadas', () => {
  const server = read('lib/supabase/server.ts');

  assert.match(server, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(server, /SERVICE_ROLE|service_role|SUPABASE_SERVICE_ROLE/);
});
