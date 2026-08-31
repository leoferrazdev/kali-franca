# Design — Detalhe individual da aplicação de mentoria

**Data:** 2026-08-30
**Status:** Implementação autorizada

## Objetivo

Permitir que a administradora visualize primeiro uma caixa de entrada resumida e, em seguida, abra o preenchimento completo de uma aplicação individual.

## Navegação

- Listagem: `/membros/aplicacoes/mentoria-frequencia-da-abundancia`.
- Detalhe: `/membros/aplicacoes/mentoria-frequencia-da-abundancia/[id]`.
- Cada aplicação da listagem terá um link explícito para o detalhe completo.
- O detalhe terá retorno claro para a listagem e preservará o logout da área de membros.

## Autorização e dados

A rota individual será server-rendered, exigirá sessão e perfil `administradora` antes de consultar a tabela. A consulta usará o `id` validado como UUID e o slug fixo da mentoria. Registro ausente, UUID inválido ou erro de consulta não revelarão dados: a rota exibirá estado neutro ou `notFound`.

O detalhe será somente leitura. Não haverá edição, exclusão, alteração de status, exportação ou inclusão de dados no navegador.

## Interface

O cabeçalho exibirá contexto da mentoria, nome, status e data de recebimento. As respostas serão agrupadas em contato, contexto e prontidão, com texto integral, quebra natural e sem ellipsis. O consentimento será mostrado com data/hora. A composição reutilizará os tokens da área de membros, foco visível e layout responsivo.

## Verificação

Os contratos devem comprovar: link da listagem para cada detalhe, guarda `administradora`, filtro por `id` + slug, leitura somente, ausência de `service_role` e build das duas rotas.
