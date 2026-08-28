# Plano de implementação — Autenticação e home de membros V1

> Execução inline autorizada pelo proprietário do projeto. O provedor escolhido é Supabase Auth, mas nenhuma configuração externa será criada ou modificada nesta etapa.

## Sequência

### 1. Contrato verificável

- Criar testes para dependências, variáveis de ambiente, cliente browser/server, middleware, callback, formulários e proteção da home.
- Executar os testes antes do código e registrar o estado red.

### 2. Fronteira Supabase

- Adicionar `@supabase/ssr` e `@supabase/supabase-js` como dependências diretas do workspace.
- Criar `.env.example` somente com variáveis públicas.
- Criar configuração compartilhada, cliente browser e cliente server.
- Criar `proxy.ts` com refresh de cookies, redirecionamento de rotas e fail-safe sem configuração.
- Criar callback de confirmação de e-mail.

### 3. Fluxos de login e cadastro

- Conectar `AuthPanel` a `signInWithPassword` e `signUp`.
- Controlar loading, erros neutros, confirmação de e-mail e redirecionamento.
- Evitar envio nativo de campos em query string.
- Preservar a linguagem visual e o estado honesto quando o provedor não estiver configurado.

### 4. Home protegida

- Fazer `MemberHome` server-side.
- Validar a sessão novamente com `auth.getUser()`.
- Exibir e-mail autenticado somente quando houver sessão.
- Manter conteúdo e navegação não implementados como estado vazio, sem consultas ao CRM.
- Ajustar cabeçalho para diferenciar sessão ativa de preview.

### 5. Documentação e validação

- Registrar decisão e evidências no `cofre-kali` via CLI do Obsidian.
- Executar testes focados, monorepo, lint e build.
- Testar smoke local com variáveis ausentes e confirmar que o app não quebra.
- Verificar diff, secrets, alinhamento da `main` e estado público separadamente.

## Arquivos previstos

- `apps/kali-franca-membros/.env.example`
- `apps/kali-franca-membros/lib/supabase/config.ts`
- `apps/kali-franca-membros/lib/supabase/browser.ts`
- `apps/kali-franca-membros/lib/supabase/server.ts`
- `apps/kali-franca-membros/middleware.ts`
- `apps/kali-franca-membros/app/auth/callback/route.ts`
- `apps/kali-franca-membros/app/components/AuthPanel.tsx`
- `apps/kali-franca-membros/app/components/MemberHeader.tsx`
- `apps/kali-franca-membros/app/components/MemberShell.tsx`
- `apps/kali-franca-membros/app/membros/page.tsx`
- testes de contrato do workspace

## Critérios de aceite

- A autenticação real está conectada no código sem secrets.
- A sessão protege `/membros/` quando o ambiente está configurado.
- O app continua compilando e renderizando com ambiente vazio.
- O cadastro não afirma sucesso falso.
- A home não usa dados do CRM nem conteúdo inventado.
- O cofre registra as decisões e a separação entre Git, configuração e deploy.
