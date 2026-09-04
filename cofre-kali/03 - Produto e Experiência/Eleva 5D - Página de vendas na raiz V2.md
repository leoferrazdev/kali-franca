---
title: Eleva 5D - Página de vendas na raiz V2
aliases:
  - Página de vendas do Eleva 5D na raiz
date: 2026-09-04
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - produto
  - autoridade
type: Registro de implementação
status: publicamente-verificado
area: produto
---

# Eleva 5D — Página de vendas na raiz V2

> [!abstract] Decisão
> A página canônica do Eleva 5D foi transferida para `https://kalifranca.com.br/`. A antiga rota `/eleva-5d/` não mantém conteúdo duplicado e aponta para a raiz.

## O que foi aplicado

- A raiz foi reestruturada como página pública de vendas do Eleva 5D.
- A narrativa foi humanizada com primeira pessoa e com a assinatura “Condução criada por Kalì Franca”.
- A autoridade da especialista é comunicada pelo método, pelo ciclo e pela autoria, sem credenciais, números, depoimentos ou garantias inventadas.
- O hero usa `assets/kali-hero-autoridade-horizontal-02.png`.
- A seção da especialista usa `assets/kali-expansao-editorial-vertical-01.png`.
- A grade dos cinco movimentos foi fechada sem o vazio artificial observado no desktop: 01–03 na primeira linha e 04–05 em duas metades na segunda.
- Foram removidos da página a linguagem de “experiência em construção” e o CTA “Conhecer o brandbook”.
- `profile.jpg` não é referenciado pela página de vendas; os arquivos históricos de origem não foram apagados.

## Contratos preservados

- Acesso permanece em preparação até a definição do checkout e da liberação por entitlement.
- A raiz não aponta para `membros.kalifranca.com.br` nem simula uma compra.
- A página mantém HTML semântico, um único `h1`, skip link, foco visível, alvos mínimos de 44px, responsividade e `prefers-reduced-motion`.

## Arquivos principais

- `index.html`
- `styles.css`
- `assets/kali-hero-autoridade-horizontal-02.png`
- `assets/kali-expansao-editorial-vertical-01.png`
- `eleva-5d/index.html`
- `tests/home-static.test.mjs`
- `tests/eleva-5d-sales-page-static.test.mjs`
- `tests/brandbook-static.test.mjs`
- `docs/superpowers/specs/2026-09-04-eleva-5d-root-sales-page-design.md`
- `docs/superpowers/plans/2026-09-04-eleva-5d-root-page-migration.md`

## Verificação

- Contrato focado: 34 testes aprovados localmente.
- `git diff --check`: aprovado no checkpoint local.
- Verificação pública em 2026-09-04: `/`, `/styles.css`, os dois assets aprovados e `/eleva-5d/` responderam HTTP 200.
- A raiz entregou o título, a autoria da Kalì, a nova seção da especialista e não entregou a linguagem antiga de experiência/oferta em construção nem o CTA para o brandbook.
- Commit remoto da publicação: `3089d47ec01ae84aaaeb043d1b8e41b7be59fc71`.

## Relações

- [[Eleva 5D - Página de vendas V1]] — registro histórico da rota dedicada.
- [[Eleva 5D - Arquitetura de liberação e acesso V1]]
- [[MOC - Kalì Franca]]

