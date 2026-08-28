---
title: Home visual - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - home
  - design-system
  - implementacao
type: delivery
status: local-validado
---

# Home visual - Registro de implementação V1

## Entrega

- Rota: `https://kalifranca.com.br/`
- Arquitetura: landing page estática editorial, pública e demonstrativa.
- Fonte visual: `D:\LEONARDO\Kali Franca\design-system\Kali Franca - Design System.dc.html`.
- Tokens compartilhados: `brandbook/tokens.css`.
- Arquivos principais: `index.html`, `styles.css`, `brandbook/tokens.css`.
- Contrato estático: `tests/home-static.test.mjs`.
- Asset de prévia social: `profile.jpg`, originado de `referencias/profile.jpg`.

## Decisões aplicadas

- Conceito central: **Expansão da Potência**.
- Estrutura aprovada: capa, passagem, pilares da experiência, sistema em prática e próximo movimento.
- Conteúdo identificado de forma explícita como `Demonstração pública · V1` e `Oferta em construção`.
- A página não publica métricas, preços, depoimentos, resultados ou promessas comerciais não validadas.
- A composição usa superfícies escuras e claras, ouro com uso restrito, cobre, vinho, ameixa, halos, órbitas, linhas de frequência e gradientes quentes.
- Tipografia consumida pelos tokens compartilhados: Cormorant Garamond, Jost e IBM Plex Mono.
- O CTA institucional direciona para `/brandbook/`, mantendo o brandbook como base de consulta pública da identidade.
- `profile.jpg` permanece declarado como `og:image` e imagem do Twitter Card.

## Estados de entrega

| Estado | Evidência | Situação |
| --- | --- | --- |
| Arquivos locais | `index.html` e `styles.css` presentes no repositório | validado |
| Contrato da home | `node --test tests/home-static.test.mjs` — 6/6 | validado |
| Testes estáticos integrados | `npm run test:static` — 12/12 | validado |
| Testes do workspace | `npm test` — estáticos 12/12 e membros 5/5 | validado |
| Lint | `npm run lint` — exit code 0 | validado |
| Build de membros | `npm run build` — Next 16.3.0, exit code 0 | validado |
| Smoke local | `/`, `/styles.css`, `/brandbook/` e `/profile.jpg` — HTTP 200 | validado |
| Inspeção visual | desktop e viewport CSS mobile de 390px | validado localmente |
| Commit da implementação visual | `2d56843` — aplica design system na home | validado |
| Publicação Hostinger | deploy externo refletido nos domínios observados | validado |
| URL pública | observação em 2026-08-28: `/`, `/styles.css`, `/brandbook/`, `/profile.jpg` e `membros.kalifranca.com.br/` — HTTP 200 | validado |

## Verificação pública

Em 2026-08-28, a home publicada respondeu com o conceito `Expansão da Potência`, o rótulo `Demonstração pública`, o CTA para `/brandbook/` e a referência `https://kalifranca.com.br/profile.jpg`. O stylesheet público respondeu `text/css` e preservou a ligação com os tokens compartilhados.

## Relações

- [[Escopo - Página de vendas demonstrativa]]
- [[Escopo - Brandbook online]]
- [[Brandbook online - Registro de implementação V1]]
- [[Design system - Mapa da fonte V1]]
- [[Design system como base de conhecimento]]
- [[Diagnóstico - Falha de compilação Hostinger]]
