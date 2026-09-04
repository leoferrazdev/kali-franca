# Eleva 5D Sales Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a página pública estática de vendas do Eleva 5D em `/eleva-5d/`, apresentando a experiência com clareza e mantendo o checkout futuro explicitamente separado.

**Architecture:** A nova rota será uma página HTML/CSS independente dentro do site estático principal, consumindo `brandbook/tokens.css` e sem depender do runtime Next.js ou de dados externos. O CTA final apontará para a própria seção de acesso em estado “em preparação”; a futura URL Kiwify poderá substituir somente esse destino depois que o checkout for configurado.

**Tech Stack:** HTML5 semântico, CSS moderno com custom properties existentes, Node.js `node:test` para contratos estáticos, npm Workspaces, Next.js apenas para validação de não-regressão do workspace de membros.

## Global Constraints

- Rota pública: `https://kalifranca.com.br/eleva-5d/`.
- A home em `index.html` permanece inalterada.
- A página usa `brandbook/tokens.css` e as famílias Cormorant Garamond, Jost e IBM Plex Mono.
- Não publicar preço, checkout ativo, garantia, prova social, números de resultado ou disponibilidade não validados.
- Todo controle interativo precisa de área mínima de 44px, foco visível e navegação por teclado.
- O layout precisa funcionar em 320px ou mais, com redução de movimento respeitada.
- Não adicionar dependências npm para a página estática.
- Não versionar credenciais, tokens, variáveis de ambiente ou dados de usuárias.
- Preservar todas as alterações não relacionadas já existentes no worktree.

## Mapa de arquivos

- Create: `eleva-5d/index.html` — documento público, SEO, conteúdo e estrutura semântica.
- Create: `eleva-5d/styles.css` — composição visual da página e contratos responsivos.
- Create: `tests/eleva-5d-sales-page-static.test.mjs` — contratos de conteúdo, segurança editorial, acessibilidade e responsividade.
- Modify: `cofre-kali/00 - Índice/MOC - Kalì Franca.md` — registrar a página como entregável público e ligar à especificação.
- Modify: `cofre-kali/00 - Índice/Roadmap - Kalì Franca.md` — marcar a página V1 e manter checkout/liberação como próximos itens.
- Create: `cofre-kali/03 - Produto e Experiência/Eleva 5D - Página de vendas V1.md` — registro operacional da implementação e seus limites.

---

### Task 1: Criar contratos estáticos da página

**Files:**
- Create: `tests/eleva-5d-sales-page-static.test.mjs`

**Interfaces:**
- Consumes: `eleva-5d/index.html` e `eleva-5d/styles.css` quando existirem.
- Produces: testes executáveis por `npm run test:static` que definem os critérios mínimos da rota.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (...segments) => {
  const file = resolve(root, ...segments);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};

test('a página do Eleva 5D possui rota pública e estrutura semântica', () => {
  const html = read('eleva-5d', 'index.html');

  assert.ok(existsSync(resolve(root, 'eleva-5d', 'index.html')));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Kalì Franca/i);
  assert.match(html, /Eleva 5D/i);
});

test('a página apresenta os cinco movimentos e a rotina dos três movimentos', () => {
  const html = read('eleva-5d', 'index.html');

  for (const movement of ['Reprogramar', 'Alinhar', 'Manifestar', 'Sustentar', 'Elevar']) {
    assert.match(html, new RegExp(movement, 'i'));
  }

  assert.match(html, /Regra dos 3 Movimentos/i);
  assert.match(html, /Corte Energético/i);
});

test('a página mantém a oferta honesta enquanto o checkout não existe', () => {
  const html = read('eleva-5d', 'index.html');

  assert.match(html, /Acesso em preparação/i);
  assert.match(html, /checkout/i);
  assert.doesNotMatch(html, /R\$\s*[0-9]/i);
  assert.doesNotMatch(html, /comprar agora|garantia de resultado|depoimento|\+2[.,]?500/i);
});

test('a página consome a identidade visual compartilhada e tem contratos de acessibilidade', () => {
  const html = read('eleva-5d', 'index.html');
  const styles = read('eleva-5d', 'styles.css');

  assert.match(html, /\.\.\/brandbook\/tokens\.css/i);
  assert.match(html, /profile\.jpg/i);
  assert.match(html, /Pular para o conteúdo/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
});

test('a página mantém a próxima etapa separada da home e da área autenticada', () => {
  const html = read('eleva-5d', 'index.html');

  assert.match(html, /href=["']#acesso["']/i);
  assert.doesNotMatch(html, /membros\.kalifranca\.com\.br/i);
  assert.doesNotMatch(html, /href=["'][^"']*checkout[^"']*["']/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:static -- --test-name-pattern="Eleva 5D"`

Expected: FAIL because `eleva-5d/index.html` and `eleva-5d/styles.css` do not exist yet.

### Task 2: Construir o documento público do Eleva 5D

**Files:**
- Create: `eleva-5d/index.html`

**Interfaces:**
- Consumes: `../brandbook/tokens.css` e `../profile.jpg` para a prévia social.
- Produces: documento navegável em `/eleva-5d/` com os IDs `inicio`, `ciclo`, `rotina`, `marco-inicial` e `acesso`.

- [ ] **Step 1: Write the minimal semantic HTML**

Criar o documento com `lang="pt-BR"`, metadados `description`, `og:*` e `twitter:*`, link de tokens, skip link, cabeçalho, `main` e rodapé. O conteúdo deve incluir:

- hero com “Eleva 5D” e uma descrição da jornada como prática guiada;
- cinco cards editoriais, um para cada movimento;
- três passos da rotina diária;
- explicação do Corte Energético sem ancorar a primeira tela no passado;
- seção final com o estado “Acesso em preparação” e link `href="#acesso"`;
- ligação pública para `/brandbook/`.

- [ ] **Step 2: Run the focused test**

Run: `npm run test:static -- --test-name-pattern="Eleva 5D"`

Expected: The semantic and content assertions pass; the style assertions remain allowed to fail until Task 3.

### Task 3: Aplicar o sistema visual e o comportamento responsivo

**Files:**
- Create: `eleva-5d/styles.css`

**Interfaces:**
- Consumes: `brandbook/tokens.css`.
- Produces: tokens semânticos para fundo, superfície, texto, acento e bordas; componentes `.sales-shell`, `.movement-card`, `.routine-step`, `.access-state` e os estados de foco/hover/pressed.

- [ ] **Step 1: Write the minimal stylesheet**

Implementar o layout editorial em duas colunas no hero e em grade para os movimentos, com `max-width` controlado, espaçamento baseado nos tokens, responsividade até 320px, alvos mínimos de 44px, `:focus-visible` e `@media (prefers-reduced-motion: reduce)`. O CTA de acesso deve parecer um estado informativo, não uma compra disponível.

- [ ] **Step 2: Run the focused test**

Run: `npm run test:static -- --test-name-pattern="Eleva 5D"`

Expected: PASS for all Eleva 5D static tests.

- [ ] **Step 3: Run the complete static suite**

Run: `npm run test:static`

Expected: PASS with zero failures, preserving contracts da home, brandbook, bio, analytics e mentoria.

### Task 4: Registrar a entrega no cofre

**Files:**
- Create: `cofre-kali/03 - Produto e Experiência/Eleva 5D - Página de vendas V1.md`
- Modify: `cofre-kali/00 - Índice/MOC - Kalì Franca.md`
- Modify: `cofre-kali/00 - Índice/Roadmap - Kalì Franca.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-09-04-eleva-5d-sales-page-design.md` e `Eleva 5D - Arquitetura de liberaçao e acesso V1.md`.
- Produces: registro consultável do que foi publicado, do que continua pendente e dos próximos passos de checkout/liberação.

- [ ] **Step 1: Write the implementation record**

Registrar rota, data, status V1, estrutura entregue, limites editoriais, evidências de validação e dependências futuras. Não registrar URL de webhook, segredo ou credencial.

- [ ] **Step 2: Update MOC and roadmap**

Adicionar o link da página V1 e da especificação ao MOC. Marcar apenas a página de vendas como concluída; manter checkout, webhook, entitlement e publicação do produto como próximos itens.

- [ ] **Step 3: Validate Markdown links and status**

Run: `rg -n "Eleva 5D|eleva-5d|checkout|webhook|entitlement" "cofre-kali/00 - Índice/MOC - Kalì Franca.md" "cofre-kali/00 - Índice/Roadmap - Kalì Franca.md" "cofre-kali/03 - Produto e Experiência/Eleva 5D - Página de vendas V1.md"`

Expected: The new route and records are present; the checkout remains marked as pending.

### Task 5: Verificação final e entrega

**Files:**
- Modify: only files listed in Tasks 1–4.

- [ ] **Step 1: Check the diff scope**

Run: `git status --short` and `git diff --check`

Expected: Only the page, its test, its documentation and the explicitly selected vault records appear as task changes; unrelated existing files remain untouched.

- [ ] **Step 2: Run lint and production build**

Run: `npm run lint` and `npm run build`

Expected: Both commands exit with code 0; the Next.js workspace remains healthy even though the new page is static.

- [ ] **Step 3: Run the complete test suite**

Run: `npm test`

Expected: Static and members tests pass with zero failures.

- [ ] **Step 4: Commit the task files**

```bash
git add -- eleva-5d/index.html eleva-5d/styles.css tests/eleva-5d-sales-page-static.test.mjs "cofre-kali/00 - Índice/MOC - Kalì Franca.md" "cofre-kali/00 - Índice/Roadmap - Kalì Franca.md" "cofre-kali/03 - Produto e Experiência/Eleva 5D - Página de vendas V1.md" docs/superpowers/specs/2026-09-04-eleva-5d-sales-page-design.md docs/superpowers/plans/2026-09-04-eleva-5d-sales-page.md
git commit -m "feat: add Eleva 5D sales page"
```

- [ ] **Step 5: Push the approved task to main**

Run: `git push origin main`

Expected: The task commit is accepted by the remote `main`. Public deployment remains a separate state and must be verified after Hostinger publishes the static route.

