---
title: Brandbook online - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - brandbook
  - implementacao
  - design-system
type: delivery
status: local-validado
area: marca
---

# Brandbook online - Registro de implementação V1

## Entrega

- Rota: `https://kalifranca.com.br/brandbook`
- Arquitetura: página estática independente.
- Fonte visual: `D:\LEONARDO\Kali Franca\design-system\Kalì Franca - Design System.dc.html`.
- Arquivos: `brandbook/index.html`, `brandbook/tokens.css`, `brandbook/styles.css`.
- Teste: `tests/brandbook-static.test.mjs`.
- Asset de prévia social: `profile.jpg`, originado de `referencias/profile.jpg`.

## Decisões aplicadas

- Publicação pública e explícita aprovada.
- Tokens separados em primitivos, semânticos e tokens de componente.
- Conteúdo organizado como consulta editorial, sem CMS e sem autenticação.
- Tipografia baseada em Cormorant Garamond, Jost e IBM Plex Mono.
- A página principal e a área de membros permanecem fora da implementação funcional do brandbook.
- A composição usa superfícies escuras e claras, ouro com uso restrito e motivos de arco, halo e frequência.
- O site principal e o brandbook declaram `https://kalifranca.com.br/profile.jpg` como `og:image` e imagem do Twitter Card.

## Estados de entrega

| Estado | Evidência | Situação |
| --- | --- | --- |
| Arquivos locais | arquivos presentes no repositório | validado |
| Teste estático | `npm run test:static` — 6/6 | validado |
| Testes existentes | `npm test` — contrato estático 6/6 e membros 5/5 | validado |
| Lint | `npm run lint` — exit code 0 | validado |
| Build de membros | `npm run build` — Next 16.3.0, exit code 0 | validado |
| Smoke local | `/`, `/brandbook/` e `/profile.jpg` — HTTP 200 | validado |
| Commit | `49e8af8` — preview social, responsividade e diagnóstico registrado | validado |
| Publicação Hostinger | deploy refletido no domínio observado em 2026-08-28 | validado |
| URL pública | `/brandbook/` e `/profile.jpg` — HTTP 200 em 2026-08-28 | validado |

## Verificação pública atualizada

Em 2026-08-28, após a publicação posterior, `https://kalifranca.com.br/brandbook/` e `https://kalifranca.com.br/profile.jpg` responderam HTTP 200. A ocorrência anterior de HTTP 404 permanece registrada no diagnóstico como evidência histórica.

## Relações

- [[Escopo - Brandbook online]]
- [[Design system - Mapa da fonte V1]]
- [[Design system como base de conhecimento]]
- [[Diagnóstico visual inicial - Experiência web]]
- [[Diagnóstico - Falha de compilação Hostinger]]
