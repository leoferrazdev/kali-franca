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

## Decisão

O Eleva 5D foi preparado como produto autenticado dentro da área de membros, com uma entrada própria em `/membros/eleva/`. Esta etapa deixa o produto navegável e tecnicamente preparado antes da integração comercial com checkout e webhook.

O usuário autenticado e a compra são estados diferentes. A aplicação não simula uma compra: enquanto o entitlement não existir, o estado exibido é **Aguardando liberação**.

## Entregue

- Dashboard protegido em `/membros/eleva/`.
- Onboarding em `/membros/eleva/onboarding/`, com o marco privado “O Corte Energético”.
- Rotas dos cinco movimentos:
  - `/membros/eleva/reprogramar/`
  - `/membros/eleva/alinhar/`
  - `/membros/eleva/manifestar/`
  - `/membros/eleva/sustentar/`
  - `/membros/eleva/elevar/`
- Rotina diária inicial com Reprogramar, Alinhar e Manifestar.
- Calendário semanal, progresso inicial e estados de acesso explícitos.
- Catálogo tipado com a ordem canônica: Reprogramar, Alinhar, Manifestar, Sustentar e Elevar.
- Migration Supabase `202609040003_eleva_5d_foundation.sql` com catálogo, setup, atividades, eventos e políticas RLS.
- Setup privado por usuário e produto; a API não aceita `user_id`, e-mail ou datas de conclusão vindas do cliente.
- Alvos de interação com mínimo de 44 px, labels, foco visível, regiões de status e suporte a `prefers-reduced-motion`.

## Estado honesto da experiência

| Estado | Comportamento |
| --- | --- |
| Prévia | Permite consultar o shell e a estrutura local; não grava dados. |
| Não autenticada | Redireciona para `/login/`. |
| Aguardando liberação | Usuário autenticado sem entitlement; conteúdo permanece bloqueado. |
| Ativa | Estado previsto para a integração comercial; conteúdo poderá ser liberado. |
| Suspensa | Estado previsto para perda ou suspensão do entitlement. |

## Modelo de dados

- `eleva_products`: produto e status de catálogo.
- `eleva_movements`: os cinco movimentos e suas posições.
- `eleva_content_items`: módulos futuros de áudio, vídeo, exercícios e materiais.
- `eleva_member_setups`: registro privado do onboarding por usuário/produto.
- `eleva_daily_activities`: conclusão diária por movimento.
- `eleva_progress_events`: trilha append-only de progresso.

As tabelas têm RLS. Catálogo publicado pode ser lido por usuários autenticados; setup, atividades e eventos são privados por `auth.uid()`. Não há dados fictícios de compra, usuário ou progresso.

## Não entregue nesta etapa

- Checkout Kiwify ou Hotmart.
- Webhook de pagamento.
- Entitlement persistido e sincronizado com o provedor.
- Upload de fotos para Storage.
- Conteúdos reais de áudio, vídeo, caderno, mapa ou playlist.
- Aplicativo nativo para Google Play ou App Store.

## Validação

- Suíte focal do Eleva: 6 testes aprovados.
- Lint do workspace: aprovado.
- Build Next.js de produção: aprovado.
- Rotas geradas confirmadas: `/membros/eleva`, `/membros/eleva/onboarding`, `/membros/eleva/[movement]` e `/api/eleva/setup`.

## Próxima integração determinística

1. Definir checkout e produto comercial no provedor escolhido.
2. Criar webhook idempotente para validar pagamento.
3. Persistir entitlement por usuário e produto, associando pelo e-mail verificado da compra.
4. Fazer o resolver de acesso consultar esse entitlement.
5. Liberar conteúdos e registrar atividades somente após o acesso ativo.
6. Executar teste controlado de compra, cancelamento e reprocessamento do webhook.

## Referências

- [[Eleva 5D - Arquitetura de liberação e acesso V1]]
- [[Eleva 5D - Página de vendas na raiz V2]]
- [[Roadmap - Kalì Franca]]
- Especificação: `docs/superpowers/specs/2026-09-04-eleva-5d-member-foundation-design.md`
- Plano: `docs/superpowers/plans/2026-09-04-eleva-5d-member-foundation.md`
