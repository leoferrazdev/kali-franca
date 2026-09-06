---
title: Eleva 5D V6 - Prova social visual com prints autorizados
date: 2026-09-06
status: approved
type: design-spec
---

# Eleva 5D V6 — prova social visual

## Objetivo

Substituir os três placeholders da seção **03 / quando deixa de ser teoria** por prints reais de conversas fornecidos pelo projeto, mantendo a prova visual reconhecível e aumentando a credibilidade da decisão de compra.

## Decisão

Usar os prints como imagens dentro de cards nativos da página. A adaptação será de apresentação: moldura, espaçamento, legenda e responsividade. O conteúdo da conversa não será transcrito, reescrito ou complementado por afirmações não presentes na fonte.

## Mapeamento

- `depoimentos/4.jpeg` → **De oscilação para sustentação**
- `depoimentos/3.jpeg` → **De entendimento para movimento**
- `depoimentos/5.jpeg` → **De esforço para confiança**

## Requisitos de UX e acessibilidade

- Preservar a leitura do print sem cortes em desktop, tablet e mobile.
- Usar `alt` descritivo para comunicar o sentido principal da imagem.
- Manter a ordem narrativa da seção.
- Identificar os relatos como reais e autorizados sem expor dados pessoais adicionais.
- Não usar o print para sugerir garantia de resultado ou promessa clínica.
- Manter o layout da V5/V6, a paleta aprovada e o CTA fixo.

## Fora de escopo

- Editar o conteúdo das conversas.
- Criar nomes, datas, métricas ou resultados que não estejam nos arquivos.
- Alterar a V5, a V4 ou as imagens originais.
- Gerar novas imagens por API.
