---
title: Eleva 5D - Página de vendas V10
date: 2026-10-15
tags:
  - kali/site
  - kali/eleva-5d
status: implementado
---

# Página de vendas V10 — conteúdo PPM

Relacionados: [[Eleva 5D - Página de vendas V9]], [[Eleva 5D - Analytics e Clarity da home]], [[MOC - Kalì Franca]].

## Especificação aprovada

Aplicar somente os sete ajustes identificados na comparação do PDF `eleva-5d-c/CONTEÚDO ELEVA 5D - FINAL.pdf` com a home pública, sem redesenhar a página. Home promovida à V10 e cópia navegável em `/lp-5d/v10/`. V9 preservada em `/lp-5d/v9/`.

## Alterações

- Hiperfluxo substituído por Protocolos de Permissão e Manifestação (PPM), incluindo SEO, rotina, prévia, oferta e FAQ.
- Mecanismo descrito como proposta espiritual do método, sem alegar validação científica ou resultados garantidos.
- Caixa de ferramentas atualizada: PPM Minha vida sensacional; PPM Soluções Mágicas Divinas; PPM DNA da Riqueza; PPM Saúde e Vitalidade; Playlist Oficial Eleva 5D; Mapa da Vida Sensacional & Salto de Linha do Tempo. Âncoras e Diário preservados.
- Terceira aula inclui “O segredo para receber mais é decidir e permitir”, na sequência do PDF.
- Nomenclatura pública “aulas mestras”. Classes CSS e seletores internos preservados para evitar regressões.
- “Áudio teórico” substituído por “áudio de expansão da consciência”.
- Removida expressão interna “referência aprovada” do FAQ.

## Preservações

Mesmo CSS, grids, fotos, fontes, paleta, seções, depoimentos e funções. Ativos e CSS da V9 reutilizados por URLs absolutas. R$497, acesso anual, garantia de sete dias, aproximadamente 20 minutos por dia e 30 temas mantidos. Nenhuma integração de checkout adicionada. GA4 e Clarity da home preservados, com identificação `v10` nos parâmetros; rota de versão segue o padrão V9 sem tags externas próprias.

## Validação

90 testes estáticos aprovados após dois testes preventivos inicialmente falharem por ausência da V10. QA em navegador nas larguras 320, 375, 390, 591, 768, 1024, 1440, 1920 e 844 px: sem overflow, imagens quebradas ou erros JavaScript. FAQ, ampliação de prints, devolução de foco, CTA mobile, movimento reduzido e leitura sem JavaScript verificados. Evidências em `tmp/eleva-v9-audit/` (relatório identifica a URL V10). Verificar publicação pública separadamente do push. Arquivos externos e alterações pré-existentes do workspace não fazem parte desta entrega.

Publicação: implementação `4699445` enviada à main. Após o processamento da hospedagem, home pública respondeu HTTP 200 com identificação V10, caixa de ferramentas PPM e sem Hiperfluxo. Rota `/lp-5d/v10/` publicada; V9 mantida para consulta.
