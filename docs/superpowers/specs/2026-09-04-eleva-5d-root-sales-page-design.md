---
title: Eleva 5D - Página de vendas na raiz
date: 2026-09-04
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - produto
  - autoridade
type: Design specification
status: aprovado
---

# Eleva 5D — Página de vendas na raiz

## Decisão

A página canônica de vendas do Eleva 5D ocupará a raiz de `https://kalifranca.com.br/`. A antiga rota `/eleva-5d/` deixa de manter uma segunda experiência e passa a apontar para a raiz, evitando conteúdo duplicado e mensagens antigas.

O brandbook não será apresentado como CTA nesta página. A raiz deverá comunicar diretamente o produto, a jornada e a condução da especialista.

## Direção de experiência

- Humanizar a narrativa com primeira pessoa e autoria explícita de Kalì Franca.
- Reforçar autoridade por método, presença e clareza de condução, sem inventar credenciais, números, depoimentos ou garantias.
- Manter a proposta honesta enquanto checkout, preço e liberação ainda não estão configurados.
- Corrigir a grade dos cinco movimentos para três cards na primeira linha e dois cards equilibrados na segunda, sem lacunas artificiais.

## Imagens aprovadas

- Hero: `assets/kali-hero-autoridade-horizontal-02.png`.
- Presença da especialista: `assets/kali-expansao-editorial-vertical-01.png`.
- As imagens aprovadas são cópias públicas dos arquivos em `fotos/geradas-ia/`.
- `profile.jpg` e variantes retocadas não serão referenciados pela página de vendas. Os arquivos históricos de origem permanecem preservados fora do escopo destrutivo desta entrega.

## Estrutura

1. Hero com retrato horizontal, proposta do Eleva 5D, autoria e CTA interno.
2. Ciclo em cinco movimentos.
3. Regra dos 3 Movimentos para o dia real.
4. Seção “a especialista” com retrato vertical e texto em primeira pessoa.
5. Corte Energético como marco inicial.
6. Acesso em preparação, sem simular checkout.

## Contratos

- Um único `h1`, HTML semântico, skip link, foco visível e alvos de toque de pelo menos 44px.
- Tokens compartilhados em `brandbook/tokens.css`.
- Layout responsivo, sem truncamento textual e com suporte a `prefers-reduced-motion`.
- `og:image` e `twitter:image` usam o retrato horizontal aprovado.
- Nenhum link para `/brandbook/`, checkout inexistente ou área autenticada será exibido na página.

## Critério de pronto

A raiz responde com a página do Eleva 5D, os ativos aprovados respondem publicamente, a antiga rota não exibe conteúdo duplicado, os testes estáticos e o build passam, e o cofre registra o commit e a verificação HTTP após publicação.

