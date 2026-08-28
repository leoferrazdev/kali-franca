---
title: Arquitetura do cofre Kali Franca - Registro V1
aliases:
  - Registro da arquitetura do cofre Kali França
date: 2026-08-28
tags:
  - kali-franca
  - obsidian
  - arquitetura
  - implementacao
type: delivery
status: local-validado
area: indice
---

# Arquitetura do cofre Kali Franca - Registro V1

## Entrega

- Vault: `D:\LEONARDO\Kali Franca\cofre-kali`.
- Uso: individual.
- Estrutura: hub central com áreas semânticas numeradas.
- Notas Markdown: 15 após a inclusão deste registro.
- Fonte externa preservada: `D:\LEONARDO\Kali Franca\design-system`.

## Estrutura final

- `00 - Índice`: MOC, roadmap, guia de uso e este registro.
- `01 - Contexto e Estratégia`: 4 notas.
- `02 - Marca e Design`: 4 notas.
- `03 - Produto e Experiência`: 2 notas.
- `04 - Operação e Deploy`: 1 nota.
- `90 - Arquivo`: disponível, sem notas arquivadas nesta etapa.

## Convenção aplicada

As notas movidas receberam a propriedade `area` conforme a pasta: `contexto`, `marca`, `produto` ou `operacao`. Os índices usam `area: indice`. Propriedades históricas foram preservadas.

Tipos controlados: `index`, `context`, `decision`, `reference`, `delivery`, `incident`, `roadmap`.

Status controlados: `active`, `approved`, `preliminary`, `local-validado`, `publicamente-verificado`, `causa-nao-confirmada`, `archived`.

## Validação

- Obsidian CLI reconheceu o vault em `D:\LEONARDO\Kali Franca\cofre-kali`.
- Os 11 títulos existentes foram preservados e movidos sem renomeação.
- O MOC possui navegação por estado atual, contexto, marca, produto, operação, decisões e próximo movimento.
- Os três índices foram criados em `00 - Índice`.
- Links internos não resolvidos: 0.
- Backlinks do MOC: 4 após o registro desta entrega.
- Configurações locais `.obsidian`, fonte `design-system` e referências `referencias` permaneceram preservadas e fora do commit.

## Relações

- [[MOC - Kali França]]
- [[Roadmap - Kali França]]
- [[Como usar este cofre]]


## Versionamento

- Commit da reorganização: 5c479e8.
