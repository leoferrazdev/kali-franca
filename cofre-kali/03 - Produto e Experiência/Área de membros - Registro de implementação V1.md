---
title: Área de membros - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - membros
  - implementacao
  - design-system
  - acessibilidade
type: delivery
status: git-local-validado
area: produto
---

# Área de membros — Registro de implementação V1

## Entrega

- Rota de entrada: https://membros.kalifranca.com.br/
- Rotas preparadas: /, /login/, /cadastro/ e /membros/.
- Aplicação: apps/kali-franca-membros.
- Plano executável: docs/superpowers/plans/2026-08-28-membros-brand-experience.md.
- Commit da implementação: 8293525.
- Especificação de direção: docs/superpowers/specs/2026-08-28-membros-brand-experience-design.md.

## Escopo entregue

- Entrada visual de login em / e /login/.
- Estrutura visual de cadastro em /cadastro/.
- Home preparada em /membros/ com shell, navegação e estado vazio honesto.
- Componentes reutilizáveis para marca, atmosfera, formulário, feedback, shell, navegação, conteúdo, progresso e estado vazio.
- Mensagens de configuração ausente sem simular login, cadastro, sessão ou envio de dados.
- Layout desktop e mobile com navegação mobile sem overflow horizontal.
- Estilos conectados aos tokens compartilhados em brandbook/tokens.css.

## Decisões visuais

- Umbra e Vinho Profundo sustentam o campo; Ameixa Sagrada cria profundidade; Ouro Fosco e Cobre Aurora conduzem ações e detalhes.
- Cormorant Garamond é usada em títulos; Jost em interface; IBM Plex Mono em metadados.
- Halos, arcos e linhas de frequência traduzem expansão e presença sem competir com leitura ou controles.
- A composição evita o dashboard SaaS genérico e prioriza jornada, próxima ação e estados contextuais.
- A home usa um estado vazio porque ainda não há fonte real de conteúdos, módulos ou progresso.
- O símbolo da marca é construído em CSS para manter a entrega independente de um ativo não validado.

## Acessibilidade e responsividade

- Foco visível global com :focus-visible.
- Campos com label, htmlFor, autocomplete, aria-invalid e aria-describedby preparados.
- Feedback operacional com aria-live.
- Alvos principais com altura mínima de 44px.
- Breakpoints para desktop, tablet e mobile.
- Movimento reduzido respeitado com prefers-reduced-motion.
- Verificação visual local em viewport desktop e 390px; document overflow e navigation overflow retornaram false.

## Limites funcionais

- Não foi criado provedor, cliente Supabase, middleware, banco, usuário, sessão, recuperação ou proteção de rota.
- Não foram copiados papéis ou regras do CRM.
- Não foram inventados conteúdos, cursos, aulas, progresso, benefícios ou métricas.
- Os formulários são uma prévia: não enviam dados e informam que a autenticação está em preparação.
- A integração real depende de contrato posterior para provedor, ambiente, usuário, permissões e fonte de conteúdo.

## Evidências de validação

| Estado | Evidência | Situação |
| --- | --- | --- |
| Testes focados | npm test --workspace=kali-franca-membros — 10/10 | validado |
| Testes do monorepo | npm test — 16 estáticos + 10 do app | validado |
| Lint | npm run lint — exit code 0 | validado |
| Build | npm run build — Next 16.3.0, rotas estáticas /, /login, /cadastro e /membros | validado |
| Inspeção visual | Browser local em desktop e viewport 390px | validado |
| Git | main no commit 8293525 | validado localmente |
| Publicação pública | ainda não verificada nesta nota | pendente |

## Próxima etapa determinística

Definir e documentar o contrato técnico da autenticação real antes de conectar qualquer provedor: identidade do usuário, fluxo de convite ou cadastro, recuperação, autorização, fonte de conteúdo e variáveis de ambiente. Até essa decisão, a camada visual permanece como entrega honesta e pública, sem dados protegidos simulados.

## Relações

- [[MOC - Kali França]]
- [[Diagnóstico visual inicial - Experiência web]]
- [[Design system como base de conhecimento]]
- [[Design system - Mapa da fonte V1]]
- [[Roadmap - Kali França]]