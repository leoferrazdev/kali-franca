---
title: Linha do tempo do projeto
aliases:
  - Histórico completo Kalì Franca
date: 2026-09-10
tags:
  - kali-franca
  - indice
  - historico
  - evidencias
type: index
status: active
area: indice
---

# Linha do tempo do projeto

Registro consolidado a partir das notas do cofre, do histórico da branch `main`, dos artefatos locais e do mapa de produtos revisado no Whimsical. A linha do tempo distingue implementação, documentação, publicação e validação pública.

## 2026-08-27 — Bootstrap e incidente inicial

- O monorepo do projeto foi criado com a aplicação de membros em Next.js e scripts de workspace.
- A home estática inicial foi adicionada.
- O entrypoint do servidor de membros foi corrigido para ancorar o diretório correto do app.
- O painel da Hostinger exibiu `503 Service Unavailable` e uma falha de build sem logs completos. A causa permaneceu não confirmada; a hipótese do painel não foi tratada como diagnóstico conclusivo.

Registros: [[Registro de início do projeto]], [[Diagnóstico - Falha de compilação Hostinger]].

## 2026-08-28 — Brandbook e identidade visual

- O brandbook online foi especificado, implementado e recebeu tokens, composição editorial e prévia social.
- O design system externo foi mapeado para consulta no cofre, incluindo paleta, tipografia, hierarquia, vocabulário gráfico e direção fotográfica.
- A assinatura oficial foi corrigida para **Kalì Franca** em textos públicos e notas, mantendo identificadores técnicos estáveis.

Registros: [[Escopo - Brandbook online]], [[Brandbook online - Registro de implementação V1]], [[Design system - Mapa da fonte V1]], [[Direção fotográfica da fundadora - Kalì Franca V1]].

## 2026-08-28 — Home e arquitetura do cofre

- A home institucional demonstrativa recebeu a identidade visual e os tokens do design system.
- A arquitetura inicial do cofre foi criada com hub e áreas semânticas numeradas.
- O roadmap passou a separar intenção futura de execução concluída.

Registros: [[Home visual - Registro de implementação V1]], [[Arquitetura do cofre Kalì Franca - Registro V1]], [[Roadmap - Kalì Franca]].

## 2026-08-28 — Bio e área de membros

- A bio pública foi criada com três destinos: Mentoria, Reprogramação Energética e YouTube.
- A área de membros recebeu shell visual, rotas de login, cadastro e membros.
- O Supabase Auth foi integrado ao runtime, com URLs de autenticação configuradas.
- O logout e ajustes de responsividade foram implementados.
- A conta operacional de aplicação foi confirmada no Supabase sem registrar senha no projeto; o perfil administrador do CRM foi tratado separadamente como permissão de aplicação.

Registros: [[Bio pública - Registro de implementação V1]], [[Área de membros - Registro de implementação V1]], [[Autenticação e cadastro - Registro de implementação V1]].

## 2026-08-30 — Instrumentação, bio e mentoria

- O Microsoft Clarity foi instalado na bio para mapa de calor.
- O Google Analytics 4 foi configurado para page views e evento `bio_destination_click`.
- A copy do Manifesto de Abundância foi aplicada na bio.
- Os cards da bio foram reorganizados para exibir textos completos no mobile, sem ellipsis.
- O retorno para a home indefinida foi removido.
- A aplicação pública da Mentoria Frequência da Abundância foi criada fora da área de membros, com 17 etapas, consentimento obrigatório e página de agradecimento.
- A inbox do CRM e a página individual das aplicações foram criadas dentro da área autenticada, restritas ao perfil `administradora`.
- O CTA da bio passou a apontar para a aplicação pública da Mentoria.
- O foco inicial da aplicação foi corrigido para não selecionar automaticamente o título introdutório.

Registros: [[Bio pública - Registro de implementação V1]], [[Mentoria Frequência da Abundância - Arquitetura aprovada]], [[Mentoria Frequência da Abundância - Registro de implementação V1]].

## 2026-09-04 — Eleva 5D e área de membros

- A arquitetura de liberação do Eleva 5D foi definida: checkout externo, webhook validado, entitlement no Supabase e acesso protegido na área de membros.
- A página de vendas do Eleva 5D foi publicada na raiz do domínio principal.
- Foram aplicados ajustes de imagem da especialista, favicon, `og:image` e metadados sociais.
- A fundação autenticada do Eleva 5D foi preparada com dashboard, onboarding, cinco movimentos, rotina, progresso, catálogo e contratos Supabase/RLS.
- A integração comercial efetiva, o checkout e o entitlement permaneceram como próximos passos.

Registros: [[Eleva 5D - Arquitetura de liberação e acesso V1]], [[Eleva 5D - Fundação na área de membros V1]], [[Eleva 5D - Página de vendas na raiz V2]].

## 2026-09-06 — V3, V4, V5 e V6

- A V3 foi criada como rota específica sem seções claras.
- A V4 recebeu reconstrução estrutural da jornada, melhorias de CRO, paleta aprovada, grid, prova, oferta, FAQ e responsividade.
- A V5 preservou a V4 e transformou o bloco 06 em prévia HTML/CSS do aplicativo, sem gerar telas por API.
- A garantia foi reformulada para experimentação durante 7 dias.
- A V6 reconstruiu o bloco de autoridade da Kalì e adicionou prints reais autorizados como prova, sem fabricar depoimentos.
- Foram corrigidos contraste, leitura da oferta, cards do método, enquadramento mobile e visibilidade dos CTAs.

Registros: [[Eleva 5D - Página de vendas V5]], [[Eleva 5D - Página de vendas V6]].

## 2026-09-06 — V7 e revisão visual

- A V7 foi criada com a foto aprovada da especialista como background da hero section dark.
- A composição foi mantida responsiva para desktop, tablet e mobile.

Registro: [[Eleva 5D - Página de vendas V7]].

## 2026-09-07 — V8 editorial

- A V8 foi criada como cópia independente da V7.
- O texto final do PDF editorial foi aplicado na primeira dobra, mecanismo, rotina, prova, autoridade, oferta e FAQ.
- As marcações vermelhas do PDF não foram publicadas.
- O preço de `R$497`, o acesso anual, a garantia de 7 dias e a prévia conceitual do aplicativo foram preservados.
- A V8 passou por testes estáticos, testes do workspace de membros e `git diff --check`.

Registro: [[Eleva 5D - Página de vendas V8]].

## 2026-09-10 — Produto 1, Produto 2 e continuidade documental

- O PDF `Estrutura_Produtos_Eleva5D_VidaSensacional.pdf` foi analisado.
- O Produto 1 foi identificado como o Protocolo Vida Sensacional, com 11 dias, vídeos, exercícios, caderno e mapa da vida.
- O Produto 2 foi organizado em cinco módulos: acompanhamento ao vivo, ferramentas gravadas, fundamentos, mecânica/campo e registros/casos.
- O mapa mental do Whimsical foi revisado para incluir os módulos M1–M5, relatos e pontos de validação comercial e de escopo.
- O cofre foi auditado: 29 notas, 6 áreas semânticas existentes, gráfico sem grupos de cor e 5 links internos não resolvidos no estado anterior.
- Foi criada a área de evidências e histórico, a linha do tempo, o inventário da `main`, a matriz de entregas e o registro de continuidade.

## Relações

- [[MOC - Kalì Franca]]
- [[Roadmap - Kalì Franca]]
- [[Estado atual e continuidade]]
- [[Matriz de entregas e evidências]]
- [[Inventário de commits]]
