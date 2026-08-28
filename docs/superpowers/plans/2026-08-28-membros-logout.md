# Logout da área de membros Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um logout real e acessível à área autenticada de membros, corrigir alvos interativos responsivos identificados em auditoria e registrar as evidências no cofre do projeto.

**Architecture:** Manter `MemberHeader` como componente server-side e inserir nele um `LogoutButton` cliente. O botão reutiliza `createSupabaseBrowserClient`, encerra a sessão com `auth.signOut()`, redireciona para `/login/` e deixa o `proxy` validar a proteção da rota.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, `@supabase/ssr`, CSS custom properties do design system, Node.js test runner, Obsidian CLI.

## Global Constraints

- Usar somente as variáveis públicas já documentadas em `.env.example`; nenhuma service role key ou credencial privada entra no código.
- Renderizar logout apenas no modo autenticado; o modo prévia não pode simular uma sessão.
- Preservar o `proxy` como proteção server-side da rota `/membros`.
- Reutilizar tokens de `brandbook/tokens.css` e o padrão visual existente da área.
- Manter textos da interface em português do Brasil e acessíveis por teclado.
- Registrar decisão e evidências no cofre `cofre-kali` via Obsidian CLI.

---

### Task 1: Contrato automatizado do logout

**Files:**
- Create: `apps/kali-franca-membros/tests/logout-contract.test.mjs`
- Read: `apps/kali-franca-membros/app/components/MemberHeader.tsx`

**Interfaces:**
- Consumes: o cabeçalho existente e o cliente browser do Supabase.
- Produces: um teste que falha enquanto o componente e a integração de logout não existem.

- [x] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => readFileSync(resolve(root, ...segments), 'utf8');

test('o logout encerra a sessão e retorna ao login', () => {
  const logout = read('app', 'components', 'LogoutButton.tsx');
  const header = read('app', 'components', 'MemberHeader.tsx');

  assert.ok(existsSync(resolve(root, 'app', 'components', 'LogoutButton.tsx')));
  assert.match(logout, /'use client'/);
  assert.match(logout, /createSupabaseBrowserClient/);
  assert.match(logout, /auth\.signOut\(\)/);
  assert.match(logout, /router\.replace\(['"]\/login\//);
  assert.match(logout, /router\.refresh\(\)/);
  assert.match(logout, /aria-busy/);
  assert.match(logout, /role="status"/);
  assert.match(header, /LogoutButton/);
  assert.match(header, /!preview/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm run test --workspace=kali-franca-membros -- apps/kali-franca-membros/tests/logout-contract.test.mjs`
Expected: FAIL porque `LogoutButton.tsx` ainda não existe.

### Task 2: Implementar o componente e o botão visual

**Files:**
- Create: `apps/kali-franca-membros/app/components/LogoutButton.tsx`
- Modify: `apps/kali-franca-membros/app/components/MemberHeader.tsx`
- Modify: `apps/kali-franca-membros/app/globals.css`

**Interfaces:**
- Consumes: `createSupabaseBrowserClient()` e `useRouter()`.
- Produces: `LogoutButton` com `pending`, erro acessível e navegação pós-logout.

- [x] **Step 1: Write minimal implementation**

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '../../lib/supabase/browser';

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    setPending(true);
    setError('');

    try {
      const { error: signOutError } = await createSupabaseBrowserClient().auth.signOut();
      if (signOutError) throw signOutError;

      router.replace('/login/');
      router.refresh();
    } catch {
      setError('Não foi possível encerrar a sessão. Tente novamente.');
      setPending(false);
    }
  }

  return (
    <div className="logout-control">
      <button className="logout-button" type="button" onClick={handleLogout} disabled={pending} aria-busy={pending}>
        {pending ? 'Saindo...' : 'Sair'}
      </button>
      {error ? <span className="logout-control__error" role="status" aria-live="polite">{error}</span> : null}
    </div>
  );
}
```

- [x] **Step 2: Integrate only in authenticated header state**

```tsx
{!preview ? <LogoutButton /> : null}
```

Place the control alongside the existing member email, session chip, and avatar. Add a bordered, token-based `.logout-button` style, a disabled pending state, and a mobile rule that keeps the action visible while hiding only secondary header details.

- [x] **Step 3: Run focused tests**

Run: `npm run test --workspace=kali-franca-membros`
Expected: all member tests pass, including the logout contract.

### Task 3: Verify, document, and publish

**Files:**
- Modify via Obsidian CLI: `cofre-kali/00 - Índice/MOC - Kalì Franca.md`
- Modify via Obsidian CLI: `cofre-kali/03 - Produto e Experiência/Área de membros - Registro de implementação V1.md`

**Interfaces:**
- Consumes: test/build output and public runtime behavior.
- Produces: durable decision record and a commit pushed to `main`.

- [x] **Step 1: Run repository verification**

```powershell
npm test
npm run lint
npm run crm:test
npm run crm:lint
npm run build
obsidian vault="cofre-kali" unresolved total
git diff --check
```

Expected: zero test failures, zero lint errors, successful Next build, zero unresolved Obsidian links, and clean diff check.

- [x] **Step 2: Record evidence in Obsidian**

Append a dated section to the MOC stating that the authenticated header now exposes logout, that it uses Supabase browser `signOut`, redirects to `/login/`, hides itself in preview, and that automated/local/public validations were executed. Do not record credentials or tokens.

- [x] **Step 3: Commit and push**

```powershell
git add apps/kali-franca-membros docs/superpowers/specs/2026-08-28-membros-logout-design.md docs/superpowers/plans/2026-08-28-membros-logout.md cofre-kali
git commit -m "feat: adiciona logout na area de membros"
git push origin main
```

- [x] **Step 4: Confirm public behavior**

Request `https://membros.kalifranca.com.br/login/` and `https://membros.kalifranca.com.br/membros/` without credentials. The login route must return `200`; the protected route must redirect to `/login/`. Do not claim an authenticated logout test without a controlled session.

### Addendum — Auditoria responsiva executada em 2026-08-28

- Diagnóstico formal antes das alterações: P0 = 0; P1 = alvos abaixo de 44×44 px; P2 = decorações fora da viewport, contidas intencionalmente.
- Corrigidos wordmarks públicos, link de retorno da bio, links auxiliares de autenticação, navegação mobile e controles do cabeçalho de membros.
- Auditadas as rotas públicas, autenticação, prévia de membros e login do CRM em 320, 360, 375, 390, 414, 768, 1024 e 1440 px, além de 568×320, 667×375 e 896×414 px.
- Resultado final: nenhum overflow horizontal funcional e nenhum alvo interativo abaixo de 44×44 px; console sem erros nas páginas verificadas.
