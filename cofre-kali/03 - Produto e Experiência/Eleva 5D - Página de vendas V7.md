---
title: Eleva 5D - Página de vendas V7
date: 2026-09-06
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - v7
type: implementation-record
status: local-validated
area: produto-e-experiencia
---

# Eleva 5D — Página de vendas V7

## Decisão

A V7 é uma cópia independente da V6 criada para testar uma primeira dobra mais humana e imersiva. A foto aprovada `fotos/geradas-ia/kali-hero-autoridade-horizontal-02.png` passou a ocupar o background full-bleed da hero, sem geração de nova imagem por API.

## Composição da hero

- A fotografia é aplicada em CSS com `background-size: cover`.
- O posicionamento editorial privilegia o rosto da especialista no lado direito.
- Um overlay graduado em Umbra `#0E0B0A` protege a headline, o texto de apoio, os CTAs e o resumo da oferta.
- A assinatura “Condução criada por Kalì Franca” foi preservada como elemento HTML sobre a imagem.
- No mobile, a fotografia é reposicionada e o overlay muda para uma composição vertical mais densa, mantendo a sequência de leitura.

## Preservações

- V6 permanece intacta.
- As seções 01–11, a oferta de **R$497**, o FAQ, os CTAs e os três depoimentos autorizados foram preservados.
- O `app.js` da V7 permanece equivalente ao da V6.
- A identidade visual e os tokens compartilhados continuam sendo utilizados.

## Rota

- Página: `/lp-5d/v7/`
- URL prevista: `https://kalifranca.com.br/lp-5d/v7/`

## Responsividade e acessibilidade

A implementação segue a recomendação da `ui-ux-pro-max`: imagem fluida, contraste mínimo de 4,5:1 para texto normal, composição mobile-first nos breakpoints estreitos, foco visível e suporte a `prefers-reduced-motion`. O layout evita overflow horizontal e mantém os alvos interativos existentes.

## Validação

- Suíte específica da V7 aprovada.
- Suíte completa: 74 testes estáticos e 33 testes do workspace de membros aprovados.
- `git diff --check` aprovado.
- Prévia local conferida em desktop; o CSS contém regras específicas para tablet e mobile.
- A publicação pública ainda depende do deployment da Hostinger.
