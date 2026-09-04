---
title: Eleva 5D - Página de vendas V1
date: 2026-09-04
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - produto
type: Design specification
status: aprovado
area: produto
---

# Eleva 5D — Página de vendas V1

## Decisão

Criar uma página pública dedicada em `https://kalifranca.com.br/eleva-5d/` como primeiro entregável comercial do Eleva 5D. A página não substituirá a home pública existente e não ficará dentro de `membros.kalifranca.com.br`.

Esta primeira versão apresentará a proposta e a experiência do produto com transparência. O checkout, preço, condições, prova social, garantia e disponibilidade permanecerão fora do escopo até serem definidos e validados.

## Objetivo

Dar ao visitante uma compreensão clara do Eleva 5D, do ciclo de cinco movimentos e da rotina diária recomendada, conduzindo-o a uma expectativa correta sobre o próximo passo: a abertura do acesso.

## Estrutura da experiência

1. **Cabeçalho editorial:** assinatura Kalì Franca, identificação `ELEVA 5D / 01` e navegação interna.
2. **Hero:** promessa de transformação apresentada como prática guiada de retorno ao centro, sem garantia de resultado.
3. **O ciclo:** cinco movimentos — Reprogramar, Alinhar, Manifestar, Sustentar e Elevar — cada um com função explícita.
4. **A rotina:** regra dos três movimentos, com a sequência diária de reprogramar, estabilizar e habitar.
5. **Marco inicial:** explicação do Corte Energético como configuração inicial e registro de ponto de partida.
6. **Acesso:** estado explícito de preparação do checkout, com CTA não transacional e sem simular compra.
7. **Rodapé:** assinatura da marca e ligação para o brandbook público.

## Direção visual

- Fundo umbra, superfícies vinho e acentos ouro fosco/cobre aurora.
- Cormorant Garamond para títulos, Jost para leitura e IBM Plex Mono para metadados.
- Campos editoriais amplos, contornos finos, halos radiais e ritmo assimétrico controlado.
- Tokens compartilhados em `brandbook/tokens.css`; nenhum valor de cor arbitrário na nova página.
- Imagem de prévia social mantida em `profile.jpg`, já definida como `og:image` pública do domínio.

## Requisitos de acessibilidade e responsividade

- HTML semântico com um único `h1`, `main`, landmarks e `aria-labelledby` nas seções.
- Link de salto, estados `:focus-visible`, alvos interativos com no mínimo 44px e navegação por teclado.
- Layout de uma coluna em telas estreitas, sem texto truncado e com medida de leitura controlada.
- Suporte a `prefers-reduced-motion`.
- O estado “Acesso em preparação” será legível e não parecerá um botão de compra ativo.

## Limites e integração futura

- O CTA final será um link interno para a seção de acesso enquanto a URL real do checkout não estiver configurada.
- A futura integração Kiwify deverá substituir apenas o destino e o estado do CTA, preservando a narrativa pública.
- A liberação autenticada continuará seguindo [[../../cofre-kali/03 - Produto e Experiência/Eleva 5D - Arquitetura de liberação e acesso V1|a arquitetura de entitlement aprovada]].

## Critérios de pronto

- A rota `/eleva-5d/` existe e pode ser servida como página estática.
- O visitante entende o produto, os cinco movimentos, a rotina e o marco inicial.
- Não há afirmações comerciais não validadas nem falsa disponibilidade.
- A página consome os tokens da marca e atende aos contratos estáticos de semântica, responsividade e acessibilidade.
- O MOC e o roadmap registram a página como entregável iniciado/concluído e preservam o checkout como próxima etapa.

