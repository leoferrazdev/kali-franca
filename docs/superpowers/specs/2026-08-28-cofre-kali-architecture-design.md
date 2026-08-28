---
title: Arquitetura do cofre Kalì Franca
date: 2026-08-28
tags:
  - kali-franca
  - obsidian
  - arquitetura
  - base-de-conhecimento
type: decision
status: approved
---

# Arquitetura do cofre Kalì Franca

## Objetivo

Transformar `cofre-kali` em uma base de conhecimento pessoal, navegável e evolutiva para decisões, identidade, produto, operação e roadmap da Kalì Franca.

## Contexto confirmado

- Vault ativo: `D:\LEONARDO\Kali Franca\cofre-kali`.
- Uso atual: individual, sem necessidade de permissões, revisão de equipe ou workflow de aprovação colaborativa.
- Estado auditado: 11 notas Markdown na raiz, com registros de contexto, design system, brandbook, home, diagnóstico e escopo.
- O design system fonte permanece em `D:\LEONARDO\Kali Franca\design-system` e será referenciado, não duplicado no vault.
- O repositório do projeto versiona o vault e a documentação relacionada; configurações locais do Obsidian permanecem preservadas.

## Decisão arquitetural

Adotar um hub central com áreas semânticas numeradas. O hub concentra a navegação e as áreas agrupam conhecimento por contexto de decisão, reduzindo dispersão sem introduzir um framework genérico ou dependência de plugins.

```text
cofre-kali/
├── 00 - Índice/
│   ├── MOC - Kalì Franca.md
│   ├── Roadmap - Kalì Franca.md
│   ├── Como usar este cofre.md
│   └── Arquitetura do cofre Kalì Franca - Registro V1.md
├── 01 - Contexto e Estratégia/
├── 02 - Marca e Design/
├── 03 - Produto e Experiência/
├── 04 - Operação e Deploy/
└── 90 - Arquivo/
```

Os números estabilizam a ordem visual das pastas. Nenhum arquivo será apagado ou renomeado durante a migração inicial.

## Distribuição das notas existentes

| Área | Notas |
| --- | --- |
| `01 - Contexto e Estratégia` | `Contexto digital do projeto.md`, `Registro de início do projeto.md`, `Perfil, Promessa e ICP.md`, `Escopo - Página de vendas demonstrativa.md` |
| `02 - Marca e Design` | `Design system como base de conhecimento.md`, `Design system - Mapa da fonte V1.md`, `Escopo - Brandbook online.md`, `Brandbook online - Registro de implementação V1.md` |
| `03 - Produto e Experiência` | `Diagnóstico visual inicial - Experiência web.md`, `Home visual - Registro de implementação V1.md` |
| `04 - Operação e Deploy` | `Diagnóstico - Falha de compilação Hostinger.md` |

## Hub central

`00 - Índice/MOC - Kalì Franca.md` será a entrada principal e conterá:

- estado atual dos domínios principal, membros e brandbook;
- links para contexto e estratégia;
- links para decisões de marca e design system;
- links para entregas de produto e experiência;
- links para incidentes, deploy e validações públicas;
- decisões vigentes e suas notas de origem;
- entregas recentes com estado verificável;
- acesso direto ao roadmap.

`00 - Índice/Roadmap - Kalì Franca.md` conterá somente iniciativas futuras já identificadas, especialmente a substituição da página de vendas demonstrativa por uma oferta definitiva. Cada item terá estado explícito e não será apresentado como compromisso ou fato comercial.

`00 - Índice/Como usar este cofre.md` explicará como criar notas, escolher a área, preencher propriedades, separar evidência de hipótese e atualizar o MOC. O registro `00 - Índice/Arquitetura do cofre Kalì Franca - Registro V1.md` conservará a evidência da migração e suas validações.

## Convenção de propriedades

As notas serão normalizadas para o seguinte conjunto mínimo:

```yaml
---
title: Nome da nota
aliases:
  - Nome alternativo
date: 2026-08-28
tags:
  - kali-franca
type: context
status: active
area: contexto
---
```

Valores controlados:

- `type`: `index`, `context`, `decision`, `reference`, `delivery`, `incident`, `roadmap`.
- `status`: `active`, `approved`, `preliminary`, `local-validado`, `publicamente-verificado`, `causa-nao-confirmada`, `archived`.
- `area`: `contexto`, `marca`, `produto`, `operacao`, `indice`.

Propriedades específicas já existentes, como `source`, serão preservadas quando forem úteis para rastreabilidade.

## Links e rastreabilidade

- Notas internas usarão `[[wikilinks]]`.
- URLs externas continuarão em Markdown convencional.
- A movimentação será feita pelo Obsidian CLI para permitir atualização de links internos.
- Após cada lote, serão consultados backlinks e links não resolvidos.
- Evidência histórica não será apagada para fazer o estado atual parecer mais simples; atualizações serão adicionadas como seções datadas.
- Alterações do vault serão versionadas com commits separados e descritivos.

## Limites

- Não criar permissões, times, workflows de aprovação ou automações colaborativas nesta fase.
- Não duplicar o arquivo-fonte do design system dentro do vault.
- Não criar dashboards dependentes de Dataview, Bases ou plugins externos.
- Não alterar a aplicação web, a área de membros, o CRM ou o conteúdo comercial como parte desta reorganização.
- Não converter hipóteses de marketing, oferta ou roadmap em decisões aprovadas.

## Critérios de sucesso

- As 11 notas existentes estão distribuídas nas áreas corretas sem exclusões.
- Os três arquivos de navegação e o registro de arquitetura estão criados e vinculados ao MOC.
- As propriedades mínimas estão consistentes.
- O MOC aponta para todas as áreas e decisões atuais.
- Não existem links internos quebrados introduzidos pela migração.
- O Obsidian CLI reconhece o vault, as pastas e os arquivos após a reorganização.
- O estado final do Git distingue arquivos versionados de configurações e fontes locais preservadas.
