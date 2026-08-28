# Home Visual Kalì Franca Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static root page into a public editorial demonstration of the Kalì Franca brand, applying the approved design system without publishing unvalidated commercial claims.

**Architecture:** Keep the root as an independent static page. `index.html` owns semantic content and metadata, root `styles.css` owns the landing composition, and `brandbook/tokens.css` remains the shared source for primitive, semantic, and component tokens. The implementation does not alter the members app or CRM.

**Tech Stack:** HTML5, CSS3, shared CSS custom properties, Google Fonts already defined by the source system, Node.js built-in test runner, npm workspaces, Next.js members workspace for regression build.

## Global Constraints

- The root `/` will be a public editorial demonstration landing page.
- The real and definitive offer belongs to a future roadmap.
- The page will identify explicitly its demonstration and construction status.
- Metrics, testimonials, prices, availability, guaranteed results, and unvalidated promises stay out of publication.
- The home remains static and independent; do not migrate the main site to Next in this stage.
- The primary CTA points to the public `/brandbook/` route.
- Do not alter the members app or CRM.
- Use Umbra `#0E0B0A`, Vinho Profundo `#3A1424`, Ameixa Sagrada `#7A2B44`, Ouro Fosco `#C9A66B`, Alabastro `#F4EDE4`, Cobre Aurora `#C97A52`, Areia Nude `#E2D4C3`, Névoa Mineral `#9AA39F`, Cinza Cálido `#B7ABA0`, and Verde Sálvia `#5F7A6A` through existing tokens.
- Use Cormorant Garamond for display, Jost for body/interface, and IBM Plex Mono for labels and metadata.
- Use mobile-first layout, visible focus, minimum 44px interaction targets, controlled horizontal overflow, and reduced-motion support.

---

## File Map

- Modify: `index.html` — root metadata and semantic landing content.
- Create: `styles.css` — root-only composition, surfaces, responsive rules, decorative field, and interaction states.
- Create: `tests/home-static.test.mjs` — static contract for the root page.
- Create: `cofre-kali/Home visual - Registro de implementação V1.md` — decision and validation record after implementation.
- Modify: `cofre-kali/Contexto digital do projeto.md` — relate the root implementation to the public brandbook and official domains.

## Task 1: Establish the Home Contract in RED

**Files:**
- Create: `tests/home-static.test.mjs`
- Read: `index.html`, `brandbook/tokens.css`, `tests/brandbook-static.test.mjs`

**Interfaces:**
- Consumes: root `index.html` and shared `brandbook/tokens.css`.
- Produces: six static tests that later tasks must satisfy.

- [x] **Step 1: Write the failing test**

Create `tests/home-static.test.mjs` with this contract:

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const homePath = resolve(repositoryRoot, 'index.html');
const stylesPath = resolve(repositoryRoot, 'styles.css');
const tokensPath = resolve(repositoryRoot, 'brandbook/tokens.css');

function read(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

test('a home possui estrutura editorial pública e semântica', () => {
  const html = read(homePath);

  assert.ok(existsSync(homePath));
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Demonstração pública/i);
  assert.match(html, /oferta em construção/i);
  assert.match(html, /Expansão(?:\s|<[^>]+>)*da(?:\s|<[^>]+>)*Potência/i);
});

test('a home possui as cinco seções aprovadas e navegação interna', () => {
  const html = read(homePath);
  const ids = ['passagem', 'pilares', 'sistema', 'proximo-movimento'];

  for (const id of ids) {
    assert.match(html, new RegExp(`id=["']${id}["']`, 'i'));
    assert.match(html, new RegExp(`href=["']#${id}["']`, 'i'));
  }
});

test('a home consome o sistema compartilhado e o vocabulário tipográfico', () => {
  const html = read(homePath);
  const styles = read(stylesPath);
  const tokens = read(tokensPath);

  assert.match(html, /brandbook\/tokens\.css/i);
  assert.match(html, /styles\.css/i);
  assert.ok(existsSync(stylesPath));
  assert.ok(existsSync(tokensPath));
  assert.match(styles, /Cormorant Garamond/i);
  assert.match(styles, /Jost/i);
  assert.match(styles, /IBM Plex Mono/i);
  assert.match(tokens, /--kf-component-button-primary-bg:\s*var\(--kf-color-accent\)/i);
});

test('a home usa os estados de interação e movimento acessíveis', () => {
  const html = read(homePath);
  const styles = read(stylesPath);

  assert.match(html, /Pular para o conteúdo/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /@media\s*\([^)]*prefers-reduced-motion/i);
  assert.match(styles, /min-height:\s*44px/);
});

test('a home não publica afirmações comerciais não validadas', () => {
  const html = read(homePath);

  assert.doesNotMatch(html, /\+2[.,]?500\s+vidas/i);
  assert.doesNotMatch(html, /10\s+países/i);
  assert.doesNotMatch(html, /depoimento|testemunho|garantia de resultado/i);
  assert.doesNotMatch(html, /R\$\s*[0-9]|checkout|comprar agora/i);
});

test('a home preserva a prévia pública de compartilhamento', () => {
  const html = read(homePath);

  assert.match(html, /property=["']og:image["'][^>]+content=["']https:\/\/kalifranca\.com\.br\/profile\.jpg["']/i);
  assert.match(html, /name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i);
  assert.match(html, /href=["']\/brandbook\/?["'][^>]*>[^<]*(sistema|brandbook)/i);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/home-static.test.mjs`

Expected: FAIL because the current root is the minimal screen, does not contain the approved section IDs, does not import `styles.css`, and does not identify the demonstration state.

- [x] **Step 3: Commit the RED contract**

```powershell
git add -- tests/home-static.test.mjs
git commit -m "test: define contrato visual da home"
```

## Task 2: Replace the Root Markup with the Approved Semantic Landing

**Files:**
- Modify: `index.html`
- Read: `brandbook/index.html`, `cofre-kali/Escopo - Página de vendas demonstrativa.md`, `docs/superpowers/specs/2026-08-28-home-visual-design.md`

**Interfaces:**
- Consumes: `brandbook/tokens.css`, root `styles.css`, existing `profile.jpg` metadata, and the approved content limits.
- Produces: semantic `header`, `main`, four anchored content sections, footer, skip link, and links to the brandbook.

- [x] **Step 1: Write the static structure**

Replace the inline placeholder document with an HTML document that keeps the existing OG/Twitter metadata and adds these exact structural contracts:

```html
<link rel="stylesheet" href="brandbook/tokens.css">
<link rel="stylesheet" href="styles.css">

<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  <header class="home-cover" id="inicio">
    <div class="home-shell sitebar">
      <a class="wordmark" href="#inicio" aria-label="Kalì Franca, início da página">Kalì Franca</a>
      <p class="mono-label">Demonstração pública · V1</p>
    </div>

    <div class="home-shell cover-grid">
      <div class="cover-copy">
        <p class="eyebrow">Oferta em construção · expressão de marca</p>
        <h1 class="cover-title">Expansão <em>da</em> Potência</h1>
        <p class="cover-lead">Uma experiência de marca em construção: um campo para apresentar presença, clareza e movimento com direção.</p>
        <a class="button-link" href="#passagem">Entrar no campo <span aria-hidden="true">↘</span></a>
      </div>
      <div class="cover-art" aria-hidden="true">
        <span class="art-halo"></span>
        <span class="art-orb"></span>
        <span class="art-line art-line--one"></span>
        <span class="art-line art-line--two"></span>
        <span class="art-caption">01 · contenção → expansão</span>
      </div>
    </div>
  </header>

  <main id="conteudo">
    <section class="chapter chapter-paper" id="passagem" aria-labelledby="passagem-title">
      <div class="home-shell section-grid">
        <p class="chapter-index">01 / a passagem</p>
        <div>
          <p class="eyebrow eyebrow--dark">Do ponto para o campo</p>
          <h2 id="passagem-title">Toda presença começa quando algo encontra espaço para <em>se abrir.</em></h2>
          <p class="lead">A Kalì Franca está construindo uma linguagem que combina profundidade, luz e direção. Esta página é uma demonstração pública do sistema visual em evolução.</p>
        </div>
      </div>
    </section>

    <section class="chapter chapter-dark" id="pilares" aria-labelledby="pilares-title">
      <div class="home-shell">
        <div class="section-heading"><p class="chapter-index">02 / pilares</p><p class="chapter-note">Clareza · presença · expansão</p></div>
        <h2 id="pilares-title">Três princípios para sustentar a <em>experiência.</em></h2>
        <div class="pillar-grid">
          <article class="pillar-card"><span class="card-number">01</span><h3>Clareza</h3><p>O essencial encontra forma, ritmo e espaço para ser percebido.</p></article>
          <article class="pillar-card pillar-card--accent"><span class="card-number">02</span><h3>Presença</h3><p>A atmosfera cria reconhecimento sem depender do excesso.</p></article>
          <article class="pillar-card"><span class="card-number">03</span><h3>Expansão</h3><p>O sistema cresce mantendo direção, contorno e intenção.</p></article>
        </div>
      </div>
    </section>

    <section class="chapter chapter-warm" id="sistema" aria-labelledby="sistema-title">
      <div class="home-shell system-layout">
        <div><p class="chapter-index">03 / sistema em prática</p><h2 id="sistema-title">Sombra quente, <em>luz que avança.</em></h2><p class="lead">Uma composição de superfícies, tipografia e pontos de tensão para mostrar como a identidade se comporta em uma interface pública.</p></div>
        <div class="system-demo" aria-label="Demonstração visual de componentes da marca"><span class="mono-label">surface / primary</span><div class="demo-field"><span class="demo-orb"></span><span class="demo-line"></span></div><div class="demo-actions"><a class="button-link button-link--small" href="/brandbook/">Conhecer o brandbook</a><span class="mono-label">action / gold</span></div></div>
      </div>
    </section>

    <section class="chapter chapter-paper" id="proximo-movimento" aria-labelledby="proximo-title">
      <div class="home-shell closing-layout"><div><p class="eyebrow eyebrow--dark">Próximo movimento</p><h2 id="proximo-title">A oferta real será definida no <em>próximo capítulo.</em></h2></div><div><p class="lead">Por enquanto, esta é uma experiência demonstrativa. Consulte o brandbook para acompanhar os princípios, tokens e decisões visuais que orientam a construção.</p><a class="text-link" href="/brandbook/">Abrir o brandbook público <span aria-hidden="true">↗</span></a></div></div>
    </section>
  </main>

  <footer class="site-footer home-shell"><a class="wordmark" href="#inicio">Kalì Franca</a><p class="mono-label">Demonstração pública · oferta em construção</p><a class="text-link" href="/brandbook/">Brandbook <span aria-hidden="true">↗</span></a></footer>
</body>
```

Update the description, OG title, and OG description to describe the public demonstration instead of the current minimal message. Keep `https://kalifranca.com.br/profile.jpg` unchanged as `og:image` and `twitter:image`.

- [x] **Step 2: Run the home contract**

Run: `node --test tests/home-static.test.mjs`

Expected: the semantic and claim tests pass; the CSS tests fail only because root `styles.css` has not been created.

- [x] **Step 3: Commit the semantic landing**

```powershell
git add -- index.html
git commit -m "feat: estrutura landing demonstrativa da home"
```

## Task 3: Implement the Shared Token-Based Visual Composition

**Files:**
- Create: `styles.css`
- Read: `brandbook/tokens.css`, `brandbook/styles.css`, `design-system/Kalì Franca - Design System.dc.html`

**Interfaces:**
- Consumes: `--kf-*` variables imported from `brandbook/tokens.css`.
- Produces: classes used by `index.html`: `.home-shell`, `.home-cover`, `.sitebar`, `.cover-grid`, `.cover-title`, `.cover-art`, `.chapter`, `.pillar-grid`, `.system-demo`, `.site-footer`, and their responsive states.

- [x] **Step 1: Create the base and token bindings**

Create `styles.css` with these required declarations before adding section-specific rules:

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&family=Jost:wght@300;400;500&display=swap");

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; scroll-padding-top: var(--kf-space-6); }

body {
  min-width: 320px;
  margin: 0;
  overflow-x: hidden;
  background: var(--kf-color-bg-canvas);
  color: var(--kf-color-text-primary);
  font-family: var(--kf-font-body);
  font-weight: 300;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.home-shell { width: min(100% - 3rem, 1240px); margin-inline: auto; }

.skip-link, a { color: inherit; }

.skip-link {
  position: fixed;
  top: var(--kf-space-2);
  left: var(--kf-space-2);
  z-index: 10;
  min-height: 44px;
  padding: var(--kf-space-2) var(--kf-space-3);
  transform: translateY(-160%);
  border: 1px solid var(--kf-color-accent);
  background: var(--kf-color-bg-canvas);
  color: var(--kf-color-text-primary);
}

.skip-link:focus { transform: translateY(0); }

:focus-visible { outline: 2px solid var(--kf-color-accent); outline-offset: 4px; }

.wordmark { color: var(--kf-color-text-primary); font-family: var(--kf-font-display); font-size: clamp(1.65rem, 2vw, 2rem); text-decoration: none; }

.mono-label, .eyebrow, .chapter-index, .chapter-note, .card-number { font-family: var(--kf-font-mono); font-size: .68rem; letter-spacing: .18em; line-height: 1.4; text-transform: uppercase; }

.eyebrow { margin: 0 0 var(--kf-space-3); color: var(--kf-color-accent); }
.eyebrow--dark { color: var(--kf-color-ameixa-sagrada-500); }
.lead { max-width: 650px; color: var(--kf-color-text-secondary); font-size: clamp(1.05rem, 1.7vw, 1.3rem); line-height: 1.75; }

.button-link, .text-link { min-height: 44px; }
.button-link { display: inline-flex; align-items: center; justify-content: center; gap: var(--kf-space-3); padding: .75rem 1.1rem; border: 1px solid var(--kf-color-accent); background: var(--kf-component-button-primary-bg); color: var(--kf-component-button-primary-text); font-family: var(--kf-font-mono); font-size: .68rem; letter-spacing: .12em; text-decoration: none; text-transform: uppercase; transition: background-color 180ms ease, color 180ms ease, transform 180ms ease; }
.button-link:hover { background: var(--kf-color-alabastro-500); color: var(--kf-color-umbra-500); transform: translateY(-2px); }
.text-link { display: inline-flex; align-items: center; gap: var(--kf-space-2); color: var(--kf-color-accent); font-family: var(--kf-font-mono); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; }
```

- [x] **Step 2: Add the dark cover and decorative field**

Use `var(--kf-color-bg-canvas)`, `var(--kf-color-bg-surface)`, `var(--kf-color-accent)`, and `var(--kf-color-accent-warm)` for the cover. Build the orb only with CSS gradients and borders; no new image asset is required. Set the cover title to Cormorant Garamond with a controlled line-height and italic gold keyword. Keep the art decorative with `aria-hidden="true"` from the markup.

- [x] **Step 3: Add paper, dark, and warm chapters**

Define `.chapter-paper` with `var(--kf-color-bg-paper)` and `var(--kf-color-text-on-paper)`, `.chapter-dark` with the canvas/surface semantic tokens, and `.chapter-warm` with `var(--kf-color-bg-surface)` plus a restrained warm gradient. Use grid layouts for the passage, pillars, system demo, and closing section. Component cards must consume `--kf-component-card-bg` and `--kf-component-card-border`; the primary button must consume `--kf-component-button-primary-bg` and `--kf-component-button-primary-text`.

- [x] **Step 4: Add mobile-first and reduced-motion rules**

At `max-width: 760px`, use one-column layouts, `width: calc(100% - 2rem)` shells, `font-size: clamp(3.6rem, 17vw, 5.5rem)` for the cover title, and `min-width: 0` on grid/flex children. Set art elements below the copy and preserve a minimum 44px target for links/buttons. Add:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

- [x] **Step 5: Run the contract and commit the visual system**

Run: `node --test tests/home-static.test.mjs`

Expected: all home contract tests pass with zero failures.

```powershell
git add -- styles.css
git commit -m "feat: aplica design system na home"
```

## Task 4: Register the Decision and Validate the Full Project

**Files:**
- Create: `cofre-kali/Home visual - Registro de implementação V1.md`
- Modify: `cofre-kali/Contexto digital do projeto.md`

**Interfaces:**
- Consumes: actual test, lint, build, smoke-test, and visual-inspection output.
- Produces: durable Obsidian record with separate local, Git, and public-publication states.

- [x] **Step 1: Create the vault record**

Create the note with frontmatter `type: delivery` and `status: local-validado`. Record the root route, the source design system, the shared token file, the exact files changed, the explicit demonstration constraint, and links to `[[Escopo - Página de vendas demonstrativa]]`, `[[Escopo - Brandbook online]]`, and `[[Diagnóstico - Falha de compilação Hostinger]]`.

- [x] **Step 2: Add the root relation to the project context**

Add a note under `## Notas relacionadas` in `cofre-kali/Contexto digital do projeto.md` linking `[[Home visual - Registro de implementação V1]]`.

- [x] **Step 3: Run all automated checks**

Run each command from the repository root:

```powershell
node --test tests/home-static.test.mjs
npm test
npm run lint
npm run build
git diff --check
```

Expected: the home contract passes; root static tests and members tests pass; lint and build exit with code 0; `git diff --check` emits no whitespace errors.

- [x] **Step 4: Smoke-test the static root**

Start `python -m http.server 4173` and request `/`, `/styles.css`, `/brandbook/`, and `/profile.jpg` with `Invoke-WebRequest`. Expected status is `200` for each, with `text/html` for `/`, `text/css` for `/styles.css`, and the existing public asset available at `/profile.jpg`. Stop the server after the test.

- [x] **Step 5: Inspect desktop and mobile rendering**

Capture the root at desktop and 390px mobile widths. Confirm the cover, chapter surfaces, type hierarchy, CTA, orb/orbit field, skip link, internal anchors, no horizontal scroll, and reduced-motion CSS. Do not add screenshots to the repository.

- [x] **Step 6: Commit the record**

```powershell
git add -- 'cofre-kali/Home visual - Registro de implementação V1.md' 'cofre-kali/Contexto digital do projeto.md'
git commit -m "docs: registra aplicacao visual da home"
```

## Task 5: Final Delivery Gate

**Files:**
- Modify: none beyond the files listed above.

- [x] **Step 1: Review the complete diff**

Run: `git diff HEAD~3..HEAD -- index.html styles.css tests/home-static.test.mjs 'cofre-kali/Home visual - Registro de implementação V1.md'`

Confirm there are no unapproved metrics, prices, claims, credentials, unrelated app changes, or references to a fictitious public destination.

- [x] **Step 2: Verify the branch and remote**

Run: `git status --short`, `git branch --show-current`, and `git ls-remote origin refs/heads/main`. Expected branch is `main`; the remote hash must equal the final local HEAD; pre-existing local source directories remain untouched unless explicitly included by the user.

- [x] **Step 3: Push the completed implementation**

```powershell
git push origin main
```

Expected: the implementation commits are accepted by `origin/main`. Public Hostinger deployment remains a separate state and must be verified independently with the panel logs and live HTTP checks.
