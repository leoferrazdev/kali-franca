---
title: Eleva 5D - Página de vendas V5
date: 2026-09-06
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - v5
type: implementation-record
status: local-validated
area: produto-e-experiencia
---

# Eleva 5D — Página de vendas V5

## Decisão

A V5 é uma cópia da V4 em rota própria, com alterações limitadas à proposta aprovada:

- Preservar integralmente os blocos **04 / O método**, **05 / A rotina do alívio** e **09 / A oferta**.
- Substituir o bloco **06 / Cinco espaços** por uma demonstração visual em HTML/CSS da experiência do aplicativo.
- Manter os depoimentos como placeholders até o fornecimento de depoimentos reais.
- Substituir a garantia pela formulação de experimentação de sete dias.
- Expandir o FAQ com acesso após a compra, início, funcionamento do aplicativo, rotina diária, suporte e garantia.
- Preservar o CTA fixo e adaptar a composição para desktop, tablet e mobile.

## Rota

- Página: `/lp-5d/v5/`
- URL prevista: `https://kalifranca.com.br/lp-5d/v5/`
- A V4 permanece intacta em `/lp-5d/v4/`.

## Bloco 06 — prévia da experiência

O novo bloco é identificado explicitamente como **prévia visual do aplicativo Eleva 5D**. Ele demonstra, sem afirmar que o produto final já está implementado:

- tela inicial do dia;
- player do áudio;
- Caderno da Criadora;
- Âncoras Divinas;
- Mapa da Realização;
- progresso de 12 de 30 dias e 40%.

A composição foi construída apenas com HTML/CSS, sem geração de imagens por API. A estrutura pode ser substituída por screenshots reais quando o aplicativo autenticado estiver visualmente pronto.

## Oferta e FAQ

Garantia exibida:

> Entre, experimente durante 7 dias e decida se o Eleva 5D faz sentido para você.

O FAQ agora cobre a liberação após a compra, início da jornada, funcionamento do aplicativo, rotina de 20 minutos, suporte e garantia, mantendo o preço aprovado de **R$497** pelo acesso anual ao Método no aplicativo personalizado.

## Validação

- Teste de contrato da V5: 7 testes aprovados.
- `app.js` da V5 permanece byte a byte igual ao `app.js` da V4.
- A primeira dobra preserva a composição da V4 por manter também as classes e os atributos `v4-flow`/`data-v4`; a classe `v5-flow` atua somente nos acréscimos da V5.
- Não há alteração nos arquivos da V4.
- Verificação visual local realizada na rota V5 em viewport desktop; regras CSS específicas cobrem desktop, tablet e mobile, incluindo `prefers-reduced-motion`.
- Os placeholders de depoimentos continuam explícitos; nenhuma prova social foi fabricada.

## Estado de entrega

- Implementação local: concluída e validada.
- Commit/push: pendente de solicitação específica.
- Publicação na Hostinger e verificação pública: pendentes.

## Referências

- [[Eleva 5D - Página de vendas na raiz V2]]
- [[Eleva 5D - Página de vendas V1]]
- [[Roadmap - Kalì Franca]]
- Especificação: `docs/superpowers/specs/2026-09-06-eleva-5d-lp-v5-design.md`
- Plano: `docs/superpowers/plans/2026-09-06-eleva-5d-lp-v5.md`
