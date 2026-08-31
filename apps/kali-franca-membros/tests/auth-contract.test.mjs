import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => readFileSync(resolve(root, ...segments), 'utf8');

test('o workspace declara a fronteira de configuração pública do Supabase', () => {
  const packageJson = JSON.parse(read('package.json'));
  const environment = read('.env.example');

  assert.ok(packageJson.dependencies['@supabase/ssr']);
  assert.ok(packageJson.dependencies['@supabase/supabase-js']);
  assert.match(environment, /NEXT_PUBLIC_SUPABASE_URL=/);
  assert.match(environment, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=/);
  assert.doesNotMatch(environment, /SERVICE_ROLE|service_role|SUPABASE_SERVICE_ROLE/i);
});

test('o app possui clientes browser e server fail-safe', () => {
  assert.ok(existsSync(resolve(root, 'lib', 'supabase', 'config.ts')));
  assert.ok(existsSync(resolve(root, 'lib', 'supabase', 'browser.ts')));
  assert.ok(existsSync(resolve(root, 'lib', 'supabase', 'server.ts')));

  const config = read('lib', 'supabase', 'config.ts');
  const browser = read('lib', 'supabase', 'browser.ts');
  const server = read('lib', 'supabase', 'server.ts');

  assert.match(config, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(config, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(browser, /createBrowserClient/);
  assert.match(server, /createServerClient/);
  assert.match(server, /cookies\(\)/);
  assert.match(`${config}\n${browser}\n${server}`, /Configuração do Supabase ausente/);
  assert.doesNotMatch(`${config}\n${browser}\n${server}`, /SERVICE_ROLE|service_role|SUPABASE_SERVICE_ROLE/i);
});

test('o proxy atualiza a sessão e protege somente a área de membros', () => {
  const proxy = read('proxy.ts');
  const config = read('lib', 'supabase', 'config.ts');

  assert.match(proxy, /export async function proxy/);
  assert.match(proxy, /auth\.getUser/);
  assert.match(proxy, /\/membros/);
  assert.match(proxy, /\/login/);
  assert.match(proxy, /NextResponse\.redirect/);
  assert.match(`${proxy}\n${config}`, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(`${proxy}\n${config}`, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(proxy, /matcher/);
  assert.doesNotMatch(proxy, /leads|profiles|offers|tasks/i);
});

test('o callback troca o código por sessão sem expor credenciais', () => {
  const callback = read('app', 'auth', 'callback', 'route.ts');

  assert.match(callback, /exchangeCodeForSession/);
  assert.match(callback, /searchParams\.get\(['"]code['"]\)/);
  assert.match(callback, /\/membros/);
  assert.doesNotMatch(callback, /SERVICE_ROLE|service_role|password.*searchParams/i);
});

test('login e cadastro usam Auth do próprio app e redirecionam após sucesso', () => {
  const authPanel = read('app', 'components', 'AuthPanel.tsx');

  assert.match(authPanel, /createSupabaseBrowserClient/);
  assert.match(authPanel, /signInWithPassword/);
  assert.match(authPanel, /signUp/);
  assert.match(authPanel, /router\.replace\(['"]\/membros\//);
  assert.match(authPanel, /emailRedirectTo/);
  assert.match(authPanel, /Acesso em preparação|Configuração do Supabase|configuração/i);
  assert.doesNotMatch(authPanel, /leads|profiles|offers|tasks/i);
});

test('a home valida a sessão e consulta apenas o perfil para a navegação administrativa', () => {
  const memberPage = read('app', 'membros', 'page.tsx');

  assert.match(memberPage, /createSupabaseServerClient/);
  assert.match(memberPage, /auth\.getUser/);
  assert.match(memberPage, /redirect\(['"]\/login/);
  assert.match(memberPage, /user\.email|email/);
  assert.match(memberPage, /dynamic\s*=\s*['"]force-dynamic['"]/);
  assert.match(memberPage, /profiles/);
  assert.match(memberPage, /isAdministrator|role/);
  assert.doesNotMatch(memberPage, /leads|offers|tasks|community_conversions/i);
});
