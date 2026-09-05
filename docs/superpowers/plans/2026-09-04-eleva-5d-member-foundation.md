# Eleva 5D Member Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar o Eleva 5D como um produto estruturado, navegável e protegido dentro da área de membros, pronto para receber a integração comercial sem simular compras ou acessos.

**Architecture:** O app Next.js existente continuará sendo a superfície autenticada. O catálogo e o progresso terão uma camada de domínio tipada, uma migration própria com RLS e um dashboard em `/membros/eleva/`; o resolver de acesso ficará desacoplado do checkout para receber o entitlement da Kiwify em fase posterior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Supabase Auth via `@supabase/ssr`, PostgreSQL/RLS, CSS compartilhado com `brandbook/tokens.css`, Node test runner e ESLint.

## Global Constraints

- O checkout Kiwify, webhook, validação comercial e entitlement real não serão implementados nesta fase.
- Nenhuma compra, conta, acesso ou conteúdo adquirido será simulado.
- O e-mail digitado no navegador nunca será prova de compra.
- A sessão será validada server-side com `supabase.auth.getUser()`.
- Dados de onboarding e progresso serão privados por `auth.uid()`.
- Nenhuma service role key, credencial, resposta real de cliente ou URL de mídia privada será versionada.
- O texto do produto seguirá `aplicativo-eleva-5d/Estrutura Aplicativo - Eleva 5d.md` sem novas alegações médicas, terapêuticas ou de resultado garantido.
- Todo novo comportamento começará por um teste que falha e terminará com testes, lint e build passando.
- Alterações não relacionadas no working tree serão preservadas.

---

### Task 1: Criar os contratos de teste da fundação

**Files:**
- Create: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`
- Test: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

**Interfaces:**
- Consumes: caminhos e contratos existentes do workspace `kali-franca-membros`.
- Produces: testes que definem a rota, o catálogo, os estados de acesso, o onboarding e a migration esperados pelas tarefas seguintes.

- [ ] **Step 1: Escrever o teste que deve falhar**

Adicionar testes com as seguintes responsabilidades:

```js
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
```

Usar helpers locais `read`, `readMigration` e `readTree` para ler somente arquivos do workspace e manter o teste determinístico.

- [ ] **Step 2: Rodar o teste para confirmar RED**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: FAIL porque a rota `app/membros/eleva`, o catálogo, o resolver e a migration ainda não existem.

- [ ] **Step 3: Commitar somente o teste vermelho**

```powershell
git add -- apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs
git commit -m "test: define contratos da fundacao do eleva 5d"
```

---

### Task 2: Criar a migration de catálogo e progresso

**Files:**
- Create: `supabase/migrations/202609040003_eleva_5d_foundation.sql`
- Modify: `supabase/seed.example.sql`
- Test: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

**Interfaces:**
- Consumes: `public.set_updated_at()` da migration CRM inicial.
- Produces: tabelas e políticas para o catálogo, setup, atividades e eventos de progresso do Eleva 5D.

- [ ] **Step 1: Implementar a migration mínima**

Criar as tabelas com as seguintes regras:

```sql
create table public.eleva_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug = 'eleva-5d'),
  name text not null,
  status text not null default 'preparing' check (status in ('preparing', 'published', 'archived')),
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.eleva_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  slug text not null check (slug in ('reprogramar', 'alinhar', 'manifestar', 'sustentar', 'elevar')),
  position smallint not null check (position between 1 and 5),
  title text not null,
  focus text not null,
  unique (product_id, slug),
  unique (product_id, position)
);

create table public.eleva_content_items (
  id uuid primary key default gen_random_uuid(),
  movement_id uuid not null references public.eleva_movements(id) on delete cascade,
  kind text not null check (kind in ('audio', 'video', 'journal', 'checklist', 'vision', 'playlist', 'article')),
  title text not null,
  description text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  position smallint not null default 1,
  unique (movement_id, kind, position)
);

create table public.eleva_member_setups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  initial_photo_path text,
  initial_cut_text text not null check (char_length(btrim(initial_cut_text)) between 2 and 4000),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table public.eleva_daily_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  movement_id uuid not null references public.eleva_movements(id) on delete cascade,
  activity_date date not null,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  unique (user_id, product_id, movement_id, activity_date)
);

create table public.eleva_progress_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  movement_id uuid references public.eleva_movements(id) on delete set null,
  activity_date date not null,
  event_type text not null check (event_type in ('setup_completed', 'activity_completed', 'activity_reopened')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

Adicionar triggers `set_updated_at` para `eleva_products` e `eleva_member_setups`, índices por produto/data e seed editorial idempotente com o produto e os cinco movimentos oficiais. O seed não deve conter usuário, foto, progresso ou conteúdo fictício de participante.

- [ ] **Step 2: Adicionar RLS e grants restritivos**

Habilitar RLS em todas as tabelas. Permitir leitura autenticada do catálogo editorial; permitir que cada usuário leia e altere somente o próprio setup e as próprias atividades; permitir inserção/leitura própria dos eventos, sem `update` ou `delete` de eventos. Revogar acesso de `anon` e não conceder nenhuma operação a `service_role` no arquivo.

- [ ] **Step 3: Atualizar o seed de referência**

Documentar que o catálogo é inserido pela migration e que o seed local não deve inserir usuários nem dados de progresso. Manter o exemplo de perfil administrativo existente sem qualquer credencial.

- [ ] **Step 4: Rodar o teste para confirmar GREEN**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: os testes de migration passam; os testes de rota e domínio continuam falhando até as tarefas seguintes.

- [ ] **Step 5: Commitar a migration**

```powershell
git add -- supabase/migrations/202609040003_eleva_5d_foundation.sql supabase/seed.example.sql
git commit -m "feat: cria fundacao de dados do eleva 5d"
```

---

### Task 3: Criar catálogo tipado e resolver de acesso

**Files:**
- Create: `apps/kali-franca-membros/lib/eleva/catalog.ts`
- Create: `apps/kali-franca-membros/lib/eleva/access.ts`
- Test: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

**Interfaces:**
- Consumes: migration editorial e `isSupabaseConfigured()`/`createSupabaseServerClient()` existentes.
- Produces: `ELEVA_PRODUCT`, `ELEVA_MOVEMENTS`, `ElevaAccessState` e `resolveElevaAccess()` para as rotas da experiência.

- [ ] **Step 1: Escrever testes de contrato do catálogo e estados**

Estender o teste para exigir:

```js
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
```

- [ ] **Step 2: Rodar os testes para confirmar RED**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: FAIL com arquivos e símbolos ausentes.

- [ ] **Step 3: Implementar o catálogo sem dependência de dados reais**

Exportar tipos e dados imutáveis:

```ts
export type ElevaMovementSlug = 'reprogramar' | 'alinhar' | 'manifestar' | 'sustentar' | 'elevar';

export type ElevaMovement = {
  slug: ElevaMovementSlug;
  position: 1 | 2 | 3 | 4 | 5;
  title: string;
  focus: string;
  modules: string[];
};

export const ELEVA_MOVEMENTS: readonly ElevaMovement[] = [
  { slug: 'reprogramar', position: 1, title: 'Reprogramar', focus: 'Despertar diário e clareza.', modules: ['Player de áudio', 'Caderno da Criadora'] },
  { slug: 'alinhar', position: 2, title: 'Alinhar', focus: 'Retorno ao estado de potência.', modules: ['Bússola da Verdade Divina', 'Âncoras Divinas'] },
  { slug: 'manifestar', position: 3, title: 'Manifestar', focus: 'Visão, sentimento e ação prática.', modules: ['Mapa da Realização', 'Habitar'] },
  { slug: 'sustentar', position: 4, title: 'Sustentar', focus: 'Musculatura emocional e constância.', modules: ['Áudios e vídeos'] },
  { slug: 'elevar', position: 5, title: 'Elevar', focus: 'Expansão da visão e da consciência.', modules: ['Sabedoria profunda', 'Playlist'] },
];
```

Manter o foco em linguagem de experiência, sem acrescentar alegações de saúde ou promessa de resultado.

- [ ] **Step 4: Implementar o resolver de acesso sem checkout**

Definir `resolveElevaAccess(user)` como função server-side. Sem configuração do Supabase, retornar `{ kind: 'preview', reason: 'supabase_not_configured' }`; sem usuário, `{ kind: 'unauthenticated' }`; com usuário autenticado nesta fase, retornar `{ kind: 'pending_purchase' }`. Isolar a leitura futura de entitlement em uma função interna com contrato explícito, sem consultar e-mail digitado no cliente.

- [ ] **Step 5: Rodar os testes focados**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: testes de catálogo e resolver passam; testes de interface continuam falhando.

- [ ] **Step 6: Commitar o domínio**

```powershell
git add -- apps/kali-franca-membros/lib/eleva/catalog.ts apps/kali-franca-membros/lib/eleva/access.ts
git commit -m "feat: adiciona dominio do eleva 5d"
```

---

### Task 4: Criar shell, dashboard e entrada protegida

**Files:**
- Create: `apps/kali-franca-membros/app/membros/eleva/page.tsx`
- Create: `apps/kali-franca-membros/app/components/ElevaAccessState.tsx`
- Create: `apps/kali-franca-membros/app/components/ElevaCalendar.tsx`
- Create: `apps/kali-franca-membros/app/components/ElevaMovementCard.tsx`
- Modify: `apps/kali-franca-membros/app/components/MemberNavigation.tsx`
- Modify: `apps/kali-franca-membros/app/components/MemberShell.tsx`
- Modify: `apps/kali-franca-membros/app/globals.css`
- Test: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

**Interfaces:**
- Consumes: `ELEVA_MOVEMENTS`, `resolveElevaAccess()` e `MemberShell`.
- Produces: dashboard server-rendered em `/membros/eleva/`, navegação ativa e cartões responsivos.

- [ ] **Step 1: Estender os testes de rota e acessibilidade**

Exigir no teste: `dynamic = 'force-dynamic'`, `auth.getUser`, redirecionamento para `/login/`, `MemberShell`, `aria-current`, `aria-live`, `44px`, `prefers-reduced-motion`, `Manifestar` como destaque e os cinco movimentos.

- [ ] **Step 2: Rodar RED**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: FAIL porque os componentes e a rota não existem.

- [ ] **Step 3: Implementar a guarda e o dashboard**

A página deve:

1. obter o usuário com `createSupabaseServerClient().auth.getUser()`;
2. redirecionar sessão ausente para `/login/`;
3. resolver o estado do Eleva;
4. renderizar `MemberShell` com `activePath="eleva"`;
5. mostrar o estado de acesso pendente sem afirmar compra;
6. renderizar calendário, progresso inicial e os cinco cartões;
7. ligar somente cartões preparados a rotas internas, sem links quebrados.

Atualizar o tipo `activePath` e a navegação para incluir `'eleva'`. O link do Eleva deverá aparecer para membro autenticado; a área administrativa de aplicações continuará restrita a `isAdministrator`.

- [ ] **Step 4: Implementar os componentes visuais**

`ElevaAccessState` deverá usar `role="status"` e `aria-live="polite"` para o estado de acesso. `ElevaCalendar` deverá renderizar sete dias derivados de uma data recebida, sem usar a hora do cliente para autorização. `ElevaMovementCard` deverá exibir posição, título, foco, módulos e estado editorial.

- [ ] **Step 5: Implementar CSS dentro dos tokens**

Adicionar classes escopadas `.eleva-*`, usar variáveis do design system, manter navegação lateral no desktop e grade/fluxo compacto no mobile. Não inserir cores hexadecimais fora dos tokens. Garantir foco visível, alvos de toque de pelo menos 44px e bloqueio de animações com `prefers-reduced-motion`.

- [ ] **Step 6: Rodar testes e validar build**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: PASS para rota, estados e acessibilidade.

- [ ] **Step 7: Commitar a entrada do produto**

```powershell
git add -- apps/kali-franca-membros/app/membros/eleva/page.tsx apps/kali-franca-membros/app/components/ElevaAccessState.tsx apps/kali-franca-membros/app/components/ElevaCalendar.tsx apps/kali-franca-membros/app/components/ElevaMovementCard.tsx apps/kali-franca-membros/app/components/MemberNavigation.tsx apps/kali-franca-membros/app/components/MemberShell.tsx apps/kali-franca-membros/app/globals.css
git commit -m "feat: adiciona dashboard protegido do eleva 5d"
```

---

### Task 5: Implementar onboarding e persistência do setup

**Files:**
- Create: `apps/kali-franca-membros/app/membros/eleva/onboarding/page.tsx`
- Create: `apps/kali-franca-membros/app/components/ElevaSetupForm.tsx`
- Create: `apps/kali-franca-membros/app/api/eleva/setup/route.ts`
- Test: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

**Interfaces:**
- Consumes: sessão server-side, produto `eleva-5d` e tabela `eleva_member_setups`.
- Produces: formulário acessível e endpoint autenticado `POST /api/eleva/setup` que faz upsert somente do usuário da sessão.

- [ ] **Step 1: Escrever testes de contrato do onboarding**

Exigir `O Corte Energético`, `initial_cut_text`, foto opcional, `auth.getUser`, `upsert`, rejeição de sessão ausente, `aria-invalid`, `aria-describedby` e `aria-live`.

- [ ] **Step 2: Rodar RED**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: FAIL porque a página, formulário e endpoint ainda não existem.

- [ ] **Step 3: Implementar o endpoint com validação server-side**

O handler deverá:

1. aceitar somente `POST`;
2. obter `user` via `createSupabaseServerClient().auth.getUser()`;
3. retornar `401` sem sessão;
4. validar `initialCutText` aparado entre 2 e 4000 caracteres;
5. aceitar `initialPhotoPath` somente como caminho interno opcional, sem upload público nesta fase;
6. localizar o produto por slug `eleva-5d`;
7. executar `upsert` com conflito `(user_id, product_id)`;
8. retornar JSON sem incluir dados de outros usuários.

O endpoint não aceitará `user_id`, `email`, `completed_at` ou qualquer campo de autorização vindo do cliente.

- [ ] **Step 4: Implementar o formulário e estados**

Usar `<label>` associado ao textarea e ao input de foto, resumo claro do uso da foto, feedback de salvamento, estado de erro e redirecionamento ao dashboard após sucesso. A foto ficará como preparação de contrato e não será enviada a bucket público.

- [ ] **Step 5: Rodar testes focados**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: PASS para onboarding, endpoint e privacidade estática.

- [ ] **Step 6: Commitar onboarding**

```powershell
git add -- apps/kali-franca-membros/app/membros/eleva/onboarding/page.tsx apps/kali-franca-membros/app/components/ElevaSetupForm.tsx apps/kali-franca-membros/app/api/eleva/setup/route.ts
git commit -m "feat: adiciona onboarding inicial do eleva 5d"
```

---

### Task 6: Criar as telas-base dos cinco movimentos e rotina diária

**Files:**
- Create: `apps/kali-franca-membros/app/membros/eleva/[movement]/page.tsx`
- Create: `apps/kali-franca-membros/app/components/ElevaRoutine.tsx`
- Create: `apps/kali-franca-membros/app/components/ElevaContentPlaceholder.tsx`
- Modify: `apps/kali-franca-membros/app/globals.css`
- Test: `apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

**Interfaces:**
- Consumes: `ElevaMovementSlug`, `ELEVA_MOVEMENTS` e o estado de acesso.
- Produces: telas internas navegáveis e honestas para cada movimento, sem conteúdo de mídia inventado.

- [ ] **Step 1: Escrever testes de contrato das telas**

Exigir rota dinâmica, validação contra os cinco slugs, link de retorno ao dashboard, títulos dos movimentos, rotina “Reprogramar, Alinhar e Manifestar” e estado de conteúdo preparado.

- [ ] **Step 2: Rodar RED**

Run: `node --experimental-strip-types --test apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs`

Expected: FAIL porque as telas e componentes não existem.

- [ ] **Step 3: Implementar a rota dinâmica**

Validar o parâmetro contra `ELEVA_MOVEMENTS`; para slug desconhecido usar `notFound()`. A página deve obter sessão, resolver acesso, renderizar título/foco/módulos e manter o conteúdo bloqueado ou em preparação quando não houver entitlement ativo.

- [ ] **Step 4: Implementar a rotina diária**

Renderizar uma seção de três movimentos com estados “não iniciado” e “preparado”. Não marcar atividades como concluídas sem persistência real. Cada ação deverá ter alvo de toque mínimo e nome acessível.

- [ ] **Step 5: Rodar todos os testes do workspace**

Run: `npm test --workspace=kali-franca-membros`

Expected: todos os testes existentes e os novos passam.

- [ ] **Step 6: Commitar as telas**

```powershell
git add -- apps/kali-franca-membros/app/membros/eleva/[movement]/page.tsx apps/kali-franca-membros/app/components/ElevaRoutine.tsx apps/kali-franca-membros/app/components/ElevaContentPlaceholder.tsx apps/kali-franca-membros/app/globals.css apps/kali-franca-membros/tests/eleva-5d-foundation.test.mjs
git commit -m "feat: adiciona movimentos do eleva 5d"
```

---

### Task 7: Documentar a entrega e executar a verificação completa

**Files:**
- Create: `cofre-kali/03 - Produto e Experiência/Eleva 5D - Fundação na área de membros V1.md`
- Modify: `cofre-kali/00 - Índice/Roadmap - Kalì Franca.md`
- Modify: `cofre-kali/00 - Índice/MOC - Kalì Franca.md`
- Test: todos os testes do monorepo

**Interfaces:**
- Consumes: especificação `docs/superpowers/specs/2026-09-04-eleva-5d-member-foundation-design.md` e evidências da implementação.
- Produces: registro consultável no cofre, roadmap atualizado e estado de entrega verificável.

- [ ] **Step 1: Registrar a implementação no cofre**

Documentar decisão, rotas, tabelas, estados honestos de acesso, limites desta fase, critérios de segurança, testes executados e próxima etapa comercial. Registrar que o produto está preparado, mas não liberado por compra.

- [ ] **Step 2: Atualizar MOC e roadmap**

Adicionar wikilinks para a especificação, plano, estrutura do aplicativo e registro da fundação. Marcar a fundação como concluída e a integração Kiwify/webhook como próxima etapa, sem declarar venda ou liberação como concluídas.

- [ ] **Step 3: Executar validação local completa**

Run: `npm test`

Expected: testes estáticos do monorepo e testes do workspace de membros passam.

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: build Next.js concluído sem erro, com `/membros/eleva` dinâmico e sem chaves privadas no bundle.

Run: `git diff --check`

Expected: nenhuma ocorrência de whitespace inválido.

- [ ] **Step 4: Validar smoke test sem configuração e estado protegido**

Iniciar o servidor local sem variáveis de produção e confirmar HTTP 200 nas rotas públicas de autenticação e estado de prévia. Com configuração de Supabase disponível em ambiente controlado, confirmar que `/membros/eleva/` redireciona uma sessão ausente para `/login/`; não usar credencial real em log, teste ou documento.

- [ ] **Step 5: Revisar mudanças e preparar integração**

Executar `git status --short`, confirmar que somente os arquivos da fundação e o registro do cofre foram incluídos nos commits desta execução e preservar qualquer alteração anterior não relacionada. Registrar no handoff que a integração comercial poderá conectar `entitlements` ao resolver sem alterar o catálogo nem as telas.

- [ ] **Step 6: Commitar a documentação da entrega**

```powershell
git add -- "cofre-kali/03 - Produto e Experiência/Eleva 5D - Fundação na área de membros V1.md" "cofre-kali/00 - Índice/Roadmap - Kalì Franca.md" "cofre-kali/00 - Índice/MOC - Kalì Franca.md"
git commit -m "docs: registra fundacao do eleva 5d no cofre"
```

## Handoff

Após concluir este plano, a próxima especificação será a integração comercial: migration/contrato de `entitlements`, adaptador e webhook Kiwify, reconciliação idempotente e liberação real baseada no mesmo e-mail verificado da conta. A implementação atual não deverá antecipar essa etapa nem declarar acesso de compra inexistente.
