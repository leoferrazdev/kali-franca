# Brandbook Online Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar uma página estática editorial em `https://kalifranca.com.br/brandbook` para consulta e registro explícito da identidade visual da Kali França.

**Architecture:** A rota será uma entrada estática independente em `brandbook/index.html`, servida pelo mesmo site estático do domínio principal. `brandbook/tokens.css` será a fonte de tokens primitivos, semânticos e de componente da página; `brandbook/styles.css` cuidará do layout, dos componentes editoriais, da responsividade e dos estados de acessibilidade. JavaScript não será necessário para a primeira versão.

**Tech Stack:** HTML semântico, CSS custom properties, CSS Grid/Flexbox, fontes Cormorant Garamond/Jost/IBM Plex Mono com fallbacks locais e Node.js 22 `node:test` para o contrato estático.

## Global Constraints

- Rota pública: `https://kalifranca.com.br/brandbook`.
- Fonte visual: `D:\LEONARDO\Kali Franca\design-system\Kali Franca - Design System.dc.html`.
- Tokens obrigatoriamente separados em primitivos, semânticos e tokens de componente.
- A paleta de referência inclui Umbra `#0E0B0A`, Vinho Profundo `#3A1424`, Ameixa Sagrada `#7A2B44`, Ouro Fosco `#C9A66B`, Alabastro `#F4EDE4`, Cobre Aurora `#C97A52`, Areia Nude `#E2D4C3`, Névoa Mineral `#9AA39F`, Cinza Cálido `#B7ABA0` e Verde Sálvia `#5F7A6A`.
- A página deve usar Cormorant Garamond, Jost e IBM Plex Mono com fallback tipográfico e `font-display` quando houver carregamento remoto.
- A imagem `D:\LEONARDO\Kali Franca\referencias\profile.jpg` deve ser publicada como `https://kalifranca.com.br/profile.jpg` e declarada como `og:image` e Twitter Card.
- Nenhum hexadecimal arbitrário deve ser usado em regras de componente fora da camada de tokens.
- O site principal existente, a área de membros e o CRM não devem ter seu comportamento alterado.
- Não adicionar CMS, autenticação, dados reais, integrações externas, checkout, métricas ou promessas comerciais.
- Todo avanço de implementação deve ser registrado em uma nota do `cofre-kali`.
- A entrega deve distinguir código local, commit, publicação e verificação pública.

---

## Mapa de arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `tests/brandbook-static.test.mjs` | Contrato automatizado da entrada, conteúdo, tokens e requisitos CSS da página pública. |
| `package.json` | Incluir o teste estático no comando de testes da raiz sem remover os testes de membros. |
| `brandbook/index.html` | Documento HTML público, semântico e progressivamente navegável. |
| `brandbook/tokens.css` | Tokens primitivos, semânticos e de componente, além das métricas base. |
| `brandbook/styles.css` | Direção editorial, layout, componentes, responsividade, foco e movimento reduzido. |
| `profile.jpg` | Asset público usado pela prévia de compartilhamento do site e do brandbook. |
| `cofre-kali/Brandbook online - Registro de implementação V1.md` | Registro da implementação, fontes, decisões e evidências de validação. |

## Task 1: Criar o contrato estático em RED

**Files:**
- Create: `tests/brandbook-static.test.mjs`

**Interfaces:**
- Consumes: arquivos estáticos que serão criados nas tarefas seguintes.
- Produces: asserções executáveis para a estrutura pública, o conteúdo editorial, a arquitetura de tokens e os requisitos CSS.

- [x] **Step 1: Write the failing test**

Criar `tests/brandbook-static.test.mjs` com o contrato abaixo:

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const brandbookRoot = resolve(repositoryRoot, 'brandbook');
const indexPath = resolve(brandbookRoot, 'index.html');
const tokensPath = resolve(brandbookRoot, 'tokens.css');
const stylesPath = resolve(brandbookRoot, 'styles.css');

function readIfPresent(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

test('a rota estática do brandbook possui entrada pública semântica', () => {
  const html = readIfPresent(indexPath);

  assert.ok(existsSync(indexPath), 'brandbook/index.html deve existir');
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<title>[^<]*Brandbook[^<]*Kali França/i);
  assert.match(html, /<a[^>]+href=["']#conteudo["'][^>]*>[^<]*Pular/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.doesNotMatch(html, /503|Service Unavailable|novo espaço está sendo preparado/i);
});

test('o índice aponta para todas as seções consultáveis do brandbook', () => {
  const html = readIfPresent(indexPath);
  const sectionIds = [
    'essencia',
    'direcao-visual',
    'cores',
    'tipografia',
    'vocabulario-grafico',
    'imagem',
    'interface',
    'aplicacoes',
    'do-dont',
    'evolucao'
  ];

  for (const sectionId of sectionIds) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`, 'i'));
    assert.match(html, new RegExp(`href=["']#${sectionId}["']`, 'i'));
  }
});

test('a página explicita o conceito, as fontes tipográficas e a origem do sistema', () => {
  const html = readIfPresent(indexPath);

  assert.match(html, /Expansão(?:\s|<[^>]+>)*da(?:\s|<[^>]+>)*Potência/i);
  assert.match(html, /Cormorant Garamond/i);
  assert.match(html, /Jost/i);
  assert.match(html, /IBM Plex Mono/i);
  assert.match(html, /Kali Franca - Design System\.dc\.html/i);
});

test('os tokens preservam as três camadas do design system', () => {
  const tokens = readIfPresent(tokensPath);

  assert.ok(existsSync(tokensPath), 'brandbook/tokens.css deve existir');
  assert.match(tokens, /--kf-color-umbra-500:\s*#0E0B0A/i);
  assert.match(tokens, /--kf-color-vinho-profundo-500:\s*#3A1424/i);
  assert.match(tokens, /--kf-color-ouro-fosco-500:\s*#C9A66B/i);
  assert.match(tokens, /--kf-color-alabastro-500:\s*#F4EDE4/i);
  assert.match(tokens, /--kf-color-bg-canvas:\s*var\(--kf-color-umbra-500\)/i);
  assert.match(tokens, /--kf-color-text-primary:\s*var\(--kf-color-alabastro-500\)/i);
  assert.match(tokens, /--kf-component-card-bg:\s*var\(--kf-color-bg-surface\)/i);
  assert.match(tokens, /--kf-component-button-primary-bg:\s*var\(--kf-color-accent\)/i);
});

test('o CSS documenta foco, responsividade e movimento reduzido', () => {
  const html = readIfPresent(indexPath);
  const styles = readIfPresent(stylesPath);

  assert.match(html, /tokens\.css/i);
  assert.match(html, /styles\.css/i);
  assert.ok(existsSync(stylesPath), 'brandbook/styles.css deve existir');
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media\s*\([^)]*prefers-reduced-motion/i);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /min-height:\s*44px/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/brandbook-static.test.mjs`

Expected: FAIL because `brandbook/index.html`, `brandbook/tokens.css` and `brandbook/styles.css` ainda não existem. A falha deve apontar a ausência da entrada estática, não erro de sintaxe do teste.

- [x] **Step 3: Commit**

```bash
git add tests/brandbook-static.test.mjs
git commit -m "test: define contrato estatico do brandbook"
```

## Task 2: Criar a entrada HTML e os tokens

**Files:**
- Create: `brandbook/index.html`
- Create: `brandbook/tokens.css`

**Interfaces:**
- Consumes: contrato de `tests/brandbook-static.test.mjs` e valores auditados em `design-system/Kali Franca - Design System.dc.html`.
- Produces: documento público semântico e nomes de tokens estáveis para o CSS editorial.

- [x] **Step 1: Write the minimal HTML structure**

O documento deve conter `doctype`, `lang="pt-BR"`, metadados de viewport/description, os links para `tokens.css` e `styles.css`, o link de salto, uma capa, índice e `main#conteudo`.

O índice deve apontar exatamente para estes IDs: `essencia`, `direcao-visual`, `cores`, `tipografia`, `vocabulario-grafico`, `imagem`, `interface`, `aplicacoes`, `do-dont` e `evolucao`.

Cada seção deve ter um `h2` único e conteúdo real derivado da fonte, incluindo:

```html
<section id="essencia" class="chapter chapter-dark" aria-labelledby="essencia-title">
  <p class="chapter-index">01 / essência</p>
  <h2 id="essencia-title">Expansão da Potência</h2>
  <p class="lead">A identidade parte do instante em que algo contido se solta e passa a ocupar espaço: do ponto para o campo.</p>
</section>

<section id="cores" class="chapter chapter-light" aria-labelledby="cores-title">
  <p class="chapter-index">03 / sistema cromático</p>
  <h2 id="cores-title">Sombra quente, luz que avança</h2>
  <div class="swatch-grid" aria-label="Paleta de cores Kali França">
    <article class="swatch swatch-umbra"><span>Umbra</span><code>#0E0B0A</code></article>
    <article class="swatch swatch-vinho"><span>Vinho Profundo</span><code>#3A1424</code></article>
    <article class="swatch swatch-ameixa"><span>Ameixa Sagrada</span><code>#7A2B44</code></article>
    <article class="swatch swatch-ouro"><span>Ouro Fosco</span><code>#C9A66B</code></article>
    <article class="swatch swatch-alabastro"><span>Alabastro</span><code>#F4EDE4</code></article>
  </div>
</section>

<section id="tipografia" class="chapter chapter-dark" aria-labelledby="tipografia-title">
  <p class="chapter-index">04 / tipografia</p>
  <h2 id="tipografia-title">Revista, interface e precisão</h2>
  <div class="type-specimen">
    <p class="type-display">Cormorant Garamond</p>
    <p class="type-body">Jost sustenta a leitura e a interface.</p>
    <p class="type-mono">IBM Plex Mono / metadados / tokens</p>
  </div>
</section>
```

As demais seções devem registrar direção visual, vocabulário gráfico, imagem, interface, aplicações, do/don't e evolução, sem inserir preço, oferta, depoimento, métrica ou promessa comercial não aprovada.

- [x] **Step 2: Criar `brandbook/tokens.css`**

Usar esta base completa de nomes e aliases, expandindo os valores da paleta semântica sem inserir cores fora da fonte:

```css
:root {
  --kf-color-umbra-500: #0E0B0A;
  --kf-color-vinho-profundo-500: #3A1424;
  --kf-color-ameixa-sagrada-500: #7A2B44;
  --kf-color-ouro-fosco-500: #C9A66B;
  --kf-color-alabastro-500: #F4EDE4;
  --kf-color-cobre-aurora-500: #C97A52;
  --kf-color-areia-nude-500: #E2D4C3;
  --kf-color-nevoa-mineral-500: #9AA39F;
  --kf-color-cinza-calido-500: #B7ABA0;
  --kf-color-verde-salvia-500: #5F7A6A;

  --kf-space-1: 0.5rem;
  --kf-space-2: 0.75rem;
  --kf-space-3: 1rem;
  --kf-space-4: 1.5rem;
  --kf-space-5: 2rem;
  --kf-space-6: 3rem;
  --kf-space-7: 5rem;
  --kf-space-8: 8rem;

  --kf-font-display: "Cormorant Garamond", Georgia, serif;
  --kf-font-body: "Jost", Arial, sans-serif;
  --kf-font-mono: "IBM Plex Mono", "Courier New", monospace;

  --kf-color-bg-canvas: var(--kf-color-umbra-500);
  --kf-color-bg-surface: var(--kf-color-vinho-profundo-500);
  --kf-color-bg-paper: var(--kf-color-alabastro-500);
  --kf-color-bg-muted: var(--kf-color-areia-nude-500);
  --kf-color-text-primary: var(--kf-color-alabastro-500);
  --kf-color-text-secondary: var(--kf-color-cinza-calido-500);
  --kf-color-text-on-paper: var(--kf-color-umbra-500);
  --kf-color-accent: var(--kf-color-ouro-fosco-500);
  --kf-color-accent-warm: var(--kf-color-cobre-aurora-500);
  --kf-color-border-dark: rgba(244, 237, 228, 0.18);
  --kf-color-border-light: rgba(14, 11, 10, 0.16);

  --kf-component-card-bg: var(--kf-color-bg-surface);
  --kf-component-card-border: var(--kf-color-border-dark);
  --kf-component-button-primary-bg: var(--kf-color-accent);
  --kf-component-button-primary-text: var(--kf-color-umbra-500);
  --kf-component-code-bg: rgba(14, 11, 10, 0.08);
  --kf-component-swatch-radius: 999px;
}
```

- [x] **Step 3: Run the contracts available at this task boundary**

Run: `node --test --test-name-pattern="rota estática|índice|explicita|tokens" tests/brandbook-static.test.mjs`

Expected: os quatro testes de entrada, índice, conteúdo e tokens passam; o teste de CSS fica selecionado como skipped pelo padrão de nome e será executado integralmente na tarefa seguinte.

- [x] **Step 4: Commit**

```bash
git add brandbook/index.html brandbook/tokens.css
git commit -m "feat: adiciona entrada e tokens do brandbook"
```

## Task 3: Implementar a composição editorial e os requisitos de UX

**Files:**
- Create: `brandbook/styles.css`

**Interfaces:**
- Consumes: `brandbook/index.html` e `brandbook/tokens.css`.
- Produces: layout editorial responsivo, componentes de paleta/tipografia e estados acessíveis.

- [x] **Step 1: Criar o CSS base e os componentes**

O CSS deve começar com reset previsível e carregar as famílias aprovadas com fallback:

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&family=Jost:wght@300;400;500&display=swap");

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--kf-color-bg-canvas);
  color: var(--kf-color-text-primary);
  font-family: var(--kf-font-body);
  font-weight: 300;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; }
.skip-link {
  position: fixed;
  top: var(--kf-space-2);
  left: var(--kf-space-2);
  z-index: 10;
  min-height: 44px;
  padding: var(--kf-space-2) var(--kf-space-3);
  transform: translateY(-160%);
}
.skip-link:focus { transform: translateY(0); }
```

O layout deve usar uma coluna editorial larga no desktop, índice com posição sticky quando houver espaço e uma única coluna no mobile. A capa deve trabalhar com fundo Umbra, título em Cormorant Garamond e marcador em IBM Plex Mono. O ouro deve ser reservado para índices, linhas, ênfases e pequenos sinais de navegação.

- [x] **Step 2: Implementar foco, toque e movimento reduzido**

Adicionar regras equivalentes às seguintes:

```css
a:focus-visible,
summary:focus-visible,
button:focus-visible {
  outline: 2px solid var(--kf-color-accent);
  outline-offset: 4px;
}

.toc a,
.toc summary,
.button-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}

@media (max-width: 760px) {
  body { overflow-x: hidden; }
  .chapter { padding: var(--kf-space-7) var(--kf-space-4); }
  .toc { position: static; }
  .swatch-grid { grid-template-columns: 1fr; }
  .cover-title { font-size: clamp(3.5rem, 18vw, 7rem); }
}
```

Validar que os fundos claros usam texto escuro, os fundos escuros usam Alabastro e os elementos em Ouro Fosco não sejam usados como corpo longo de texto.

- [x] **Step 3: Run the contract test**

Run: `node --test tests/brandbook-static.test.mjs`

Expected: PASS em todos os testes do contrato estático.

- [x] **Step 4: Commit**

```bash
git add brandbook/styles.css
git commit -m "feat: aplica composicao editorial do brandbook"
```

## Task 4: Integrar o teste estático e registrar a implementação no cofre

**Files:**
- Modify: `package.json`
- Create: `cofre-kali/Brandbook online - Registro de implementação V1.md`

**Interfaces:**
- Consumes: testes e arquivos estáticos das tarefas anteriores.
- Produces: execução do contrato pela rotina raiz e registro consultável da entrega.

- [x] **Step 1: Integrar o teste ao script da raiz**

Alterar somente o script `test` de `package.json`, preservando todos os demais scripts:

```json
"test": "npm run test:static && npm run test --workspace=kali-franca-membros",
"test:static": "node --test tests/*.test.mjs"
```

- [x] **Step 2: Criar a nota de implementação no cofre**

Criar a nota Obsidian com frontmatter e registro objetivo:

```markdown
---
title: Brandbook online - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - brandbook
  - implementacao
  - design-system
type: delivery
status: local-validado
---

# Brandbook online - Registro de implementação V1

## Entrega

- Rota: `https://kalifranca.com.br/brandbook`
- Arquitetura: página estática independente.
- Fonte visual: `D:\LEONARDO\Kali Franca\design-system\Kali Franca - Design System.dc.html`.
- Arquivos: `brandbook/index.html`, `brandbook/tokens.css`, `brandbook/styles.css`.

## Decisões aplicadas

- Publicação pública e explícita aprovada.
- Tokens separados em primitivos, semânticos e tokens de componente.
- Conteúdo organizado como consulta editorial, sem CMS e sem autenticação.
- Tipografia baseada em Cormorant Garamond, Jost e IBM Plex Mono.

## Estados de entrega

| Estado | Evidência | Situação |
| --- | --- | --- |
| Arquivos locais | arquivos presentes no repositório | registrar após validação |
| Teste estático | `npm run test:static` | registrar saída |
| Testes existentes | `npm test` | registrar saída |
| Lint | `npm run lint` | registrar saída |
| Build de membros | `npm run build` | registrar saída |
| Commit | hash do commit | registrar após commit |
| Publicação Hostinger | verificação no painel | pendente até publicação |
| URL pública | HTTP e renderização | pendente até publicação |

## Relações

- [[Escopo - Brandbook online]]
- [[Design system - Mapa da fonte V1]]
- [[Design system como base de conhecimento]]
- [[Diagnóstico visual inicial - Experiência web]]
```

Substituir os campos de evidência por resultados reais somente depois de executar os comandos correspondentes. Não registrar sucesso sem saída verificável.

- [x] **Step 3: Run the root test suite**

Run: `npm test`

Expected: o contrato estático e os testes do workspace de membros terminam com exit code 0.

- [x] **Step 4: Commit**

```powershell
git add package.json "cofre-kali/Brandbook online - Registro de implementação V1.md"
git commit -m "docs: registra implementacao do brandbook"
```

## Task 5: Validar regressão, renderização local e entrega

**Files:**
- Modify: `cofre-kali/Brandbook online - Registro de implementação V1.md` com evidências reais.

**Interfaces:**
- Consumes: todos os arquivos implementados e os scripts existentes do monorepo.
- Produces: evidência separada para testes locais, build, publicação e verificação pública.

- [x] **Step 1: Run the static test independently**

Run: `npm run test:static`

Expected: todos os testes da página pública passam.

- [x] **Step 2: Run the complete existing checks**

Run, em sequência:

```powershell
npm test
npm run lint
npm run build
git diff --check
```

Expected: todos os comandos terminam com exit code 0. O build e o lint continuam direcionados ao workspace de membros sem alterações funcionais nessa aplicação.

- [x] **Step 3: Smoke-test the static route locally**

A partir da raiz do repositório, iniciar um servidor estático disponível no ambiente:

```powershell
python -m http.server 4173
```

Em outro terminal, validar a entrada e o conteúdo:

```powershell
$response = Invoke-WebRequest -Uri 'http://127.0.0.1:4173/brandbook/'
if ($response.StatusCode -ne 200) { throw "HTTP inesperado: $($response.StatusCode)" }
if ($response.Content -notmatch 'Expansão da Potência') { throw 'Conteúdo principal ausente.' }
```

Expected: HTTP 200 e conteúdo principal presente. Encerrar o servidor depois do smoke test.

- [x] **Step 4: Verificar manualmente em desktop e mobile**

Confirmar no navegador:

- a rota `/brandbook/` abre sem recursos 404;
- o link “Pular para o conteúdo” funciona;
- o índice leva a cada capítulo;
- a navegação por teclado mantém foco visível;
- não há scroll horizontal em viewport móvel;
- o texto continua legível nas superfícies claras e escuras;
- `prefers-reduced-motion` não produz animação obrigatória.

- [x] **Step 5: Atualizar a nota do cofre com evidências**

Preencher a tabela de estados com os resultados reais dos comandos e manter `Publicação Hostinger` e `URL pública` como pendentes se essa etapa não tiver sido solicitada ou executada.

- [x] **Step 6: Commit final de evidências**

```bash
git add "cofre-kali/Brandbook online - Registro de implementação V1.md"
git commit -m "docs: registra validacao do brandbook"
```

## Task 6: Configurar imagem de prévia social

**Files:**
- Modify: `tests/brandbook-static.test.mjs`
- Modify: `index.html`
- Modify: `brandbook/index.html`
- Create: `profile.jpg` a partir de `referencias/profile.jpg`

**Interfaces:**
- Consumes: o retrato aprovado em `referencias/profile.jpg`.
- Produces: metadados Open Graph e Twitter Card para o domínio principal e para `/brandbook/`.

- [x] **Step 1: Write the failing test**

O contrato exige que `profile.jpg` exista na raiz pública e que os dois documentos contenham `og:image` apontando para `https://kalifranca.com.br/profile.jpg`, `og:type=website` e `twitter:card=summary_large_image`.

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/brandbook-static.test.mjs`

Observed: o sexto teste falhou porque `profile.jpg` e os metadados sociais ainda não existiam.

- [x] **Step 3: Write minimal implementation**

Copiar o asset aprovado sem alterar seu conteúdo e inserir, em cada página, os metadados correspondentes à própria URL:

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://kalifranca.com.br/brandbook/">
<meta property="og:image" content="https://kalifranca.com.br/profile.jpg">
<meta property="og:image:alt" content="Retrato de Kali França">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://kalifranca.com.br/profile.jpg">
```

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/brandbook-static.test.mjs`

Observed: 6 testes passaram, incluindo o contrato de prévia social.

## Self-review do plano

- A especificação foi coberta por tarefas de HTML, tokens, CSS, acessibilidade, responsividade, fonte, rastreabilidade e validação.
- O contrato RED é executado antes da criação dos arquivos estáticos.
- Os nomes das três camadas de tokens usados pelos testes aparecem na implementação planejada.
- A rotina raiz preserva os testes existentes de membros.
- Publicação e URL pública permanecem estados separados de código, commit e build.
- Os arquivos não rastreados existentes em `cofre-kali/` e `design-system/` não são adicionados por curinga; apenas os caminhos da entrega são versionados.
