---
title: Eleva 5D - Fundação na área de membros V1
aliases:
  - Fundação do Eleva 5D na área de membros
date: 2026-09-04
tags:
  - kali-franca
  - eleva-5d
  - area-de-membros
  - produto
type: implementation-record
status: ready-for-integration
area: produto-experiencia
---

# Eleva 5D — Fundação na área de membros V1

> [!success] Estado da entrega
> A fundação do produto foi publicada na `main` no commit `1257ab7`. Esta etapa prepara o produto autenticado antes do checkout e do entitlement comercial.

## O que foi preparado

- Dashboard protegido em `/membros/eleva/`.
- Onboarding em `/membros/eleva/onboarding/`, com o marco privado “O Corte Energético”.
- Cinco movimentos em rotas próprias: Reprogramar, Alinhar, Manifestar, Sustentar e Elevar.
- Rotina diária inicial com Reprogramar, Alinhar e Manifestar.
- Calendário semanal, progresso inicial e estados explícitos de acesso.
- Catálogo tipado na ordem canônica do ciclo.
- Migration `202609040003_eleva_5d_foundation.sql` com catálogo, setup, atividades, eventos e RLS.
- API de setup privada por usuário/produto; não aceita privilégios, e-mail ou datas vindas do cliente.
- Interface com foco visível, labels, status ao vivo, alvos mínimos de 44 px e movimento reduzido.

## Estados honestos

| Estado | Comportamento |
| --- | --- |
| Prévia | Estrutura consultável; não grava dados. |
| Não autenticada | Redireciona para `/login/`. |
| Aguardando liberação | Usuário autenticado sem entitlement; conteúdo bloqueado. |
| Ativa | Estado reservado para a integração comercial. |
| Suspensa | Estado reservado para perda ou suspensão do entitlement. |

A aplicação não simula compra nem libera conteúdo sem confirmação comercial.

## Modelo de dados

- `eleva_products`: produto e status de catálogo.
- `eleva_movements`: cinco movimentos e posições.
- `eleva_content_items`: módulos futuros.
- `eleva_member_setups`: onboarding privado por usuário/produto.
- `eleva_daily_activities`: conclusão diária por movimento.
- `eleva_progress_events`: trilha append-only de progresso.

## Ainda pendente

Checkout Kiwify/Hotmart, webhook idempotente, entitlement sincronizado, conteúdos reais, upload para Storage e aplicativos nativos. A próxima etapa determinística é integrar pagamento, identificar a compra pelo e-mail verificado e consultar o entitlement no resolver de acesso.

## Validação

Suíte completa: 34 testes estáticos e 32 testes do workspace aprovados; 1 teste condicionado ao servidor foi pulado. Lint aprovado, build Next.js aprovado e smoke test local das rotas `/membros/eleva/`, `/membros/eleva/onboarding/`, `/membros/eleva/reprogramar/` e `/membros/eleva/manifestar/` com HTTP 200.

## Referências

- [[Eleva 5D - Arquitetura de liberação e acesso V1]]
- [[Eleva 5D - Página de vendas na raiz V2]]
- [[Roadmap - Kalì Franca]]
- [Especificação no repositório](../docs/superpowers/specs/2026-09-04-eleva-5d-member-foundation-design.md)
- [Plano no repositório](../docs/superpowers/plans/2026-09-04-eleva-5d-member-foundation.md)