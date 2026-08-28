---
title: Brandbook online - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - brandbook
  - implementacao
  - design-system
type: delivery
status: em-validacao
---

# Brandbook online - Registro de implementação V1

## Entrega

- Rota: `https://kalifranca.com.br/brandbook`
- Arquitetura: página estática independente.
- Fonte visual: `D:\LEONARDO\Kali Franca\design-system\Kali Franca - Design System.dc.html`.
- Arquivos: `brandbook/index.html`, `brandbook/tokens.css`, `brandbook/styles.css`.
- Teste: `tests/brandbook-static.test.mjs`.

## Decisões aplicadas

- Publicação pública e explícita aprovada.
- Tokens separados em primitivos, semânticos e tokens de componente.
- Conteúdo organizado como consulta editorial, sem CMS e sem autenticação.
- Tipografia baseada em Cormorant Garamond, Jost e IBM Plex Mono.
- A página principal e a área de membros permanecem fora da implementação funcional do brandbook.
- A composição usa superfícies escuras e claras, ouro com uso restrito e motivos de arco, halo e frequência.

## Estados de entrega

| Estado | Evidência | Situação |
| --- | --- | --- |
| Arquivos locais | arquivos presentes no repositório | em validação |
| Teste estático | `npm run test:static` | em validação |
| Testes existentes | `npm test` | em validação |
| Lint | `npm run lint` | em validação |
| Build de membros | `npm run build` | em validação |
| Commit | hash do commit | em validação |
| Publicação Hostinger | verificação no painel | pendente até publicação |
| URL pública | HTTP e renderização | pendente até publicação |

## Relações

- [[Escopo - Brandbook online]]
- [[Design system - Mapa da fonte V1]]
- [[Design system como base de conhecimento]]
- [[Diagnóstico visual inicial - Experiência web]]

