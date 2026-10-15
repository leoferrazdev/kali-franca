---
title: Eleva 5D - Página de vendas V11
date: 2026-10-15
tags:
  - kali/site
  - kali/eleva-5d
status: implementado
---

# V11 — ajustes finais de conteúdo

Relacionados: [[Eleva 5D - Página de vendas V10]], [[Eleva 5D - Analytics e Clarity da home]], [[MOC - Kalì Franca]].

## Escopo autorizado

Aplicar a comparação aprovada do PDF `eleva-5d-c/AJUSTES NA PÁGINA FINAL DO ELEVA 5D.pdf`, sem redesenhar o layout. Nova rota `/lp-5d/v11/` e promoção da home; V10 preservada.

## Conteúdo

- Primeira dobra, botão “Quero começar agora”, faixa de 30 dias, identificação da dor e rotina revisados.
- PPM detalhado na rotina, prévia e ferramentas. Os quatro primeiros protocolos passam a usar hífen no nome.
- História da Kalì substituída pela revisão aprovada, mantendo provas e credenciais.
- Oferta: 30 dias de áudios de expansão da consciência e 30 dias com PPM; 12x de R$51,40 ou R$497 à vista. Total parcelado: R$616,80. Nenhuma afirmação de parcelamento sem juros.
- FAQ revisado: 20 a 30 minutos diários, acesso por 12 meses, conteúdo gravado, e-mail de acesso, Android/iOS, possibilidade de bônus futuros, suporte no Portal e garantia incondicional de sete dias.
- Segurança editorial: link e instruções para definir senha, sem prometer envio de senha por e-mail. Ressalvas de saúde e ausência de garantia de resultados preservadas.
- Encerramento sem a frase “Um tema, uma prática...” e sem o resumo de preço abaixo do CTA; botão “Quero começar agora”. Preço continua na oferta e no CTA fixo.

## Limites operacionais

Condições comerciais e de entrega fornecidas e aprovadas pelo usuário no PDF. Esta entrega altera a página de vendas; não implementa nem certifica checkout, disparo de e-mail, canal interno de suporte, aplicativo nativo ou publicação em lojas. Os CTAs externos continuam no WhatsApp existente. Essas integrações precisam de validação operacional antes de concluir vendas; não confundir publicação da copy com funcionamento técnico. Nenhuma compra real foi simulada.

## Preservação e QA

Mesmo CSS-base da V9/V10, fotos, grids, seções e funções. Pequeno ajuste isolado em `content.css` coloca o prefixo do parcelamento em linha própria para impedir overflow mobile. Analytics mantido com identificação v11. 92 testes estáticos aprovados; verificação responsiva e publicação são etapas separadas.

QA responsivo aprovado em nove larguras: 320, 375, 390, 591, 768, 1024, 1440, 1920 e 844 px. Sem overflow, imagens quebradas ou erros JavaScript. FAQ, prints ampliados, Escape/foco, CTA mobile, movimento reduzido e conteúdo sem JavaScript verificados. Relatório e screenshots locais em `tmp/eleva-v9-audit/`, identificando a URL V11.
