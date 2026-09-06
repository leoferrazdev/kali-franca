# Eleva 5D V7 Hero Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a V7 da página de vendas com a foto aprovada como background full-bleed da hero, preservando a V6 e toda a jornada editorial.

**Architecture:** A V7 será uma cópia física e independente da V6 em `lp-5d/v7/`. O HTML da hero manterá a estrutura semântica e o conteúdo da V6, enquanto o CSS da V7 substituirá a composição da fotografia por uma camada de background com overlay graduado e regras específicas para telas estreitas.

**Tech Stack:** HTML estático, CSS responsivo, JavaScript vanilla compartilhado, Node.js `node:test`, Obsidian Flavored Markdown.

## Global Constraints

- Não modificar os arquivos da V6.
- Usar somente `fotos/geradas-ia/kali-hero-autoridade-horizontal-02.png` como fotografia da nova hero.
- Não gerar imagens por API.
- Preservar copy, oferta, depoimentos autorizados, FAQ, CTAs e sequência editorial da V6.
- Manter contraste mínimo de 4,5:1 para texto normal e respeitar movimento reduzido.
- Validar 375px, 768px, 1024px e 1440px.

---

### Task 1: Criar a rota independente da V7

**Files:**
- Create: `lp-5d/v7/index.html`
- Create: `lp-5d/v7/styles.css`
- Create: `lp-5d/v7/app.js`
- Test: `tests/eleva-5d-v7-static.test.mjs`

**Interfaces:**
- Consumes: arquivos equivalentes da V6.
- Produces: rota `/lp-5d/v7/` com os mesmos contratos editoriais e comportamentais da V6.

- [x] **Step 1: Write the failing test**

Adicionar ao teste uma verificação de que a V7 existe, referencia `data-v7="true"`, usa `styles.css?v=v7-1`, mantém a sequência 01–11 e não altera a V6.

```js
test('a V7 existe como rota independente da V6', () => {
  assert.ok(fs.existsSync(v7Path));
  const html = fs.readFileSync(v7Path, 'utf8');
  const v6 = fs.readFileSync(v6Path, 'utf8');
  assert.match(html, /data-v7="true"/);
  assert.match(html, /styles\.css\?v=v7-1/);
  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v7\//);
  assert.deepEqual([...html.matchAll(/<p class="section-index">(\d{2}) \/ /g)].map((m) => m[1]), ['01','02','03','04','05','06','07','08','09','10','11']);
  assert.equal(fs.readFileSync(v6Path, 'utf8'), v6);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/eleva-5d-v7-static.test.mjs`

Expected: FAIL because the V7 files and test module do not exist yet.

- [x] **Step 3: Write minimal implementation**

Copiar a V6 para a V7 e alterar apenas os identificadores de rota, classe `v7-flow`, título/URL da versão e o query string do CSS. Manter `app.js` byte a byte igual ao da V6.

```powershell
Copy-Item -LiteralPath 'lp-5d/v6/index.html' -Destination 'lp-5d/v7/index.html'
Copy-Item -LiteralPath 'lp-5d/v6/styles.css' -Destination 'lp-5d/v7/styles.css'
Copy-Item -LiteralPath 'lp-5d/v6/app.js' -Destination 'lp-5d/v7/app.js'
```

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/eleva-5d-v7-static.test.mjs`

Expected: PASS para a existência e independência estrutural da V7.

### Task 2: Aplicar o background editorial da hero

**Files:**
- Modify: `lp-5d/v7/index.html`
- Modify: `lp-5d/v7/styles.css`
- Test: `tests/eleva-5d-v7-static.test.mjs`

**Interfaces:**
- Consumes: `--b-ink`, `--v4-wine`, `--v4-gold` e a imagem local aprovada.
- Produces: hero V7 com fotografia full-bleed, overlay de contraste e comportamento adaptativo.

- [x] **Step 1: Write the failing test**

Adicionar verificações de que a V7 referencia a imagem aprovada no CSS, não mantém a fotografia como `<figure class="hero-image">`, define overlay e possui regras mobile.

```js
test('a V7 usa a foto aprovada como background seguro da hero', () => {
  const html = fs.readFileSync(v7Path, 'utf8');
  const css = fs.readFileSync(v7CssPath, 'utf8');
  assert.match(css, /\.v7-flow \.hero[\s\S]*?background-image:[\s\S]*?kali-hero-autoridade-horizontal-02\.png/);
  assert.match(css, /\.v7-flow \.hero[\s\S]*?::before/);
  assert.match(css, /background-size:\s*cover/);
  assert.match(css, /background-position:[^;]+/);
  assert.match(css, /@media \(max-width:\s*37\.5rem\)[\s\S]*?\.v7-flow \.hero/);
  assert.doesNotMatch(html, /<figure class="hero-image image-frame">/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/eleva-5d-v7-static.test.mjs`

Expected: FAIL because a cópia ainda usa a composição de imagem da V6.

- [x] **Step 3: Write minimal implementation**

No HTML, substituir o `figure` da hero por um elemento decorativo sem conteúdo textual, mantendo a imagem aprovada como referência no CSS. No CSS, usar uma camada de overlay independente e conteúdo acima dela:

```css
.v7-flow .hero {
  isolation: isolate;
  overflow: hidden;
  background-image: url('../../fotos/geradas-ia/kali-hero-autoridade-horizontal-02.png');
  background-position: 72% 50%;
  background-size: cover;
}

.v7-flow .hero::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(90deg, rgba(14, 11, 10, .98) 0%, rgba(14, 11, 10, .9) 38%, rgba(14, 11, 10, .38) 72%, rgba(14, 11, 10, .58) 100%);
  content: '';
}

.v7-flow .hero-grid,
.v7-flow .hero-manifesto {
  position: relative;
  z-index: 1;
}

@media (max-width: 37.5rem) {
  .v7-flow .hero {
    background-position: 68% 50%;
  }

  .v7-flow .hero::before {
    background: linear-gradient(180deg, rgba(14, 11, 10, .9) 0%, rgba(14, 11, 10, .82) 46%, rgba(14, 11, 10, .97) 100%);
  }
}
```

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/eleva-5d-v7-static.test.mjs`

Expected: PASS para background, overlay, posição e responsividade.

### Task 3: Registrar, validar e publicar

**Files:**
- Create: `cofre-kali/03 - Produto e Experiência/Eleva 5D - Página de vendas V7.md`
- Modify: `tests/eleva-5d-v7-static.test.mjs`

**Interfaces:**
- Consumes: V7 implementada e testes verdes.
- Produces: registro consultável no cofre e commit publicado na `main`.

- [x] **Step 1: Write the failing test**

Adicionar testes para a preservação da oferta, do CTA, do FAQ, dos três prints autorizados e da equivalência do `app.js` com a V6.

```js
test('a V7 preserva a jornada, a oferta e o comportamento da V6', () => {
  const html = fs.readFileSync(v7Path, 'utf8');
  const v6App = fs.readFileSync(path.join(root, 'lp-5d', 'v6', 'app.js'), 'utf8');
  const v7App = fs.readFileSync(path.join(root, 'lp-5d', 'v7', 'app.js'), 'utf8');
  assert.match(html, /R\$497/);
  assert.match(html, /data-proof-status="real-testimonial"/g);
  assert.match(html, /QUERO COMEÇAR MINHA JORNADA/);
  assert.match(html, /id="faq"/);
  assert.equal(v7App, v6App);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/eleva-5d-v7-static.test.mjs`

Expected: PASS se a cópia foi preservada; se alguma referência da rota ou conteúdo não foi adaptada corretamente, corrigir antes da validação final.

- [x] **Step 3: Write minimal implementation**

Criar a nota do cofre com a decisão visual, os breakpoints, a origem da imagem e o estado de validação. Atualizar a documentação somente com fatos verificáveis.

- [x] **Step 4: Run test to verify it passes**

Run: `npm test`

Expected: 74 testes estáticos e 33 testes do workspace de membros aprovados, incluindo a nova suíte da V7.

- [x] **Step 5: Commit**

```powershell
git diff --check
git add -- 'lp-5d/v7' 'tests/eleva-5d-v7-static.test.mjs' 'docs/superpowers/specs/2026-09-06-eleva-5d-v7-hero-background-design.md' 'docs/superpowers/plans/2026-09-06-eleva-5d-v7-hero-background.md' 'cofre-kali/03 - Produto e Experiência/Eleva 5D - Página de vendas V7.md'
git commit -m "feat: criar V7 com hero editorial em background"
git push origin main
```
