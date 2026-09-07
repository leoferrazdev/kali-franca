---
title: Eleva 5D - Página de vendas V8
date: 2026-09-07
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - v8
type: implementation-record
status: local-validated
area: produto-e-experiencia
---

# Eleva 5D — Página de vendas V8

## Origem e decisão

Esta versão foi criada a partir do documento editorial `pagina-de-vendas/AJUSTES DE TEXTO - PÁGINA DE VENDAS ELEVA 5D - versão final.pdf`. A V8 é uma cópia independente da V7: preserva o histórico das versões anteriores e concentra o texto final aprovado no PDF.

As páginas e marcações visuais do PDF foram tratadas como referência de composição. Os textos identificados nos campos editoriais foram tratados como conteúdo de implementação. Bordas e anotações de revisão do PDF não foram publicadas.

## Implementação

- Rota local: `lp-5d/v8/`.
- Metadados Open Graph e Twitter atualizados para a rota V8.
- Primeira dobra atualizada com a nova promessa de potência máxima, SIM diário, campo sagrado, três movimentos e CTA `QUERO ACESSAR MINHA POTÊNCIA DIVINA`.
- Reconhecimento e mecanismo atualizados com a redação final, incluindo os três estados Gelo/Água/Vapor e seus campos de Estado, Percepção e Ilusão/Travessia/Realidade.
- Rotina atualizada para `05 / A ROTINA DA ALTA FREQUÊNCIA`, com as três Âncoras Vibracionais e os textos de execução do PDF.
- Prévia conceitual do aplicativo preservada, sem gerar imagens por API e sem apresentar a interface como produto finalizado.
- Corte Energético recebeu a frase de decisão final indicada no PDF.
- Autoridade, oferta, preço de `R$497`, condição de acesso anual e garantia de experimentação por 7 dias foram preservados.
- FAQ e CTA final permanecem na sequência da jornada.
- Os três prints de prova permanecem como relatos reais autorizados; nenhum depoimento textual foi fabricado.

## Responsividade e acessibilidade

O CSS mantém a composição V7 para desktop, tablet e mobile. A V8 acrescenta apenas regras de leitura para textos longos dos cards, incluindo rótulos inline do mecanismo e controle do menu extenso em telas estreitas. O CTA móvel, foco visível e movimento reduzido permanecem preservados.

## Validação

- Teste específico da V8: 3/3 aprovados.
- Suíte estática completa: 77/77 aprovados.
- Suíte do workspace de membros: 33/33 aprovados.
- `git diff --check`: aprovado.
- Estado público: ainda depende do deployment da Hostinger; o commit/push não equivale à verificação HTTP pública.

## Arquivos

- `lp-5d/v8/index.html`
- `lp-5d/v8/styles.css`
- `lp-5d/v8/app.js` — cópia comportamental preservada da V7.
- `tests/eleva-5d-v8-static.test.mjs`

## Relações

- [[Eleva 5D - Página de vendas V7]]
- [[Eleva 5D - Página de vendas V6]]
- [[Eleva 5D - Página de vendas V5]]
- [[Eleva 5D - Página de vendas na raiz V2]]
