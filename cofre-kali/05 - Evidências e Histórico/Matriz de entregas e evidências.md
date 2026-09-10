---
title: Matriz de entregas e evidências
aliases:
  - Matriz de estados do projeto
date: 2026-09-10
tags:
  - kali-franca
  - evidencias
  - auditoria
  - historico
type: reference
status: active
area: evidencias
---

# Matriz de entregas e evidências

| Frente | Resultado registrado | Evidência principal | Estado documental |
| --- | --- | --- | --- |
| Monorepo e membros | App Next.js, server e scripts de workspace | commits iniciais e diagnóstico | confirmado no repositório |
| Incidente 503 | Sintoma documentado; causa histórica não confirmada | nota de diagnóstico e verificações públicas posteriores | não confirmado |
| Brandbook | Página online, tokens, composição editorial e preview social | registro de implementação e commits `1b8e7f4`–`5086e75` | publicamente verificado conforme registro |
| Home principal | Home visual demonstrativa na raiz | [[Home visual - Registro de implementação V1]] | publicamente verificado conforme registro |
| Cofre V1 | Hub e áreas semânticas iniciais | commit `5c479e8` | local-validado |
| Bio | Destinos, manifesto, cards sem truncamento e remoção da home futura | [[Bio pública - Registro de implementação V1]] | publicamente verificado conforme registro |
| Clarity | Mapa de calor instalado na bio | projeto `yaiki79vjn` registrado; coleta depende da janela da ferramenta | publicado; coleta operacional sujeita a processamento |
| GA4 | Conta, propriedade, fluxo e evento de clique na bio | ID de medição registrado na nota da bio | publicado; coleta sujeita a processamento |
| Área de membros | Shell, login, cadastro, logout e proteção de rotas | notas de membros e autenticação | publicado/validado por estados separados |
| Mentoria pública | 17 etapas, consentimento e agradecimento | [[Mentoria Frequência da Abundância - Registro de implementação V1]] | publicamente verificado conforme registro |
| CRM da Mentoria | Inbox e detalhe individual restritos à administradora | rotas e RLS documentados | publicamente verificado conforme registro |
| Eleva 5D — vendas | Raiz, V3–V8 e versões editoriais | registros V1, V2, V5, V6, V7 e V8 | raiz pública registrada; V8 local-validada |
| Eleva 5D — produto | Dashboard, onboarding, cinco movimentos, progresso e RLS | [[Eleva 5D - Fundação na área de membros V1]] | ready-for-integration |
| Eleva 5D — liberação | Kiwify, webhook, entitlement e revogação especificados | [[Eleva 5D - Arquitetura de liberação e acesso V1]] | aprovado; implementação comercial pendente |
| Produto 1 e Produto 2 | PDF analisado e mapa mental revisado | PDF local e Whimsical | análise documentada; escopo comercial ainda requer decisão |

## Leitura correta dos estados

- `publicamente verificado` significa que a verificação registrada observou o comportamento em uma data específica; não substitui uma nova verificação após mudanças posteriores.
- `local-validado` significa que testes locais passaram; não prova deployment ou comportamento público.
- `publicado` significa commit/deployment informado; não prova que todos os usuários conseguem concluir o fluxo.
- `pendente` não significa que o trabalho não começou; significa que o critério final ainda não possui evidência suficiente.

## Relações

- [[Linha do tempo do projeto]]
- [[Estado atual e continuidade]]
- [[MOC - Kalì Franca]]
