---
title: Diagnóstico - Falha de compilação Hostinger
date: 2026-08-28
tags:
  - kali-franca
  - deploy
  - hostinger
  - diagnostico
type: incident
status: causa-nao-confirmada
area: operacao
---

# Diagnóstico - Falha de compilação Hostinger

## Sintoma

O painel de publicação exibiu `503 Service Unavailable` e, em outra tentativa, informou que a compilação falhou sem apresentar logs de build. A mensagem automática sugeriu verificar `apps/kali-franca-membros/server.mjs`, workspaces e scripts.

Essa sugestão é uma hipótese do painel, não uma evidência conclusiva.

## Evidências verificadas

- `apps/kali-franca-membros/server.mjs` existe no checkout local e no `origin/main`.
- `apps/kali-franca-membros/package.json` e `next.config.mjs` existem.
- O workspace raiz declara `apps/*` e possui `package-lock.json`.
- O app de membros usa `next build --webpack` e inicia por `node server.mjs`.
- O entrypoint ancora explicitamente o diretório do app Next em `server.mjs`.
- Antes da interrupção local de dependências, `npm run lint` e `npm run build` concluíram com sucesso.
- A tentativa local posterior de reinstalação encontrou `ENOTEMPTY` em `node_modules`; a falha subsequente de `next` ausente é um artefato do ambiente local e não prova a causa no Hostinger.
- O commit `5086e75` foi enviado e confirmado em `origin/main`.
- Na verificação pública posterior, `https://kalifranca.com.br/` respondeu `200`, mas ainda sem a nova URL de `og:image`; `https://kalifranca.com.br/profile.jpg` e `https://kalifranca.com.br/brandbook/` responderam `404`.

## Atualização da verificação pública

Em 2026-08-28, após a publicação dos commits da home visual, uma nova verificação observou HTTP 200 para `https://kalifranca.com.br/`, `https://kalifranca.com.br/styles.css`, `https://kalifranca.com.br/brandbook/`, `https://kalifranca.com.br/profile.jpg` e `https://membros.kalifranca.com.br/`. A home também passou a conter a `og:image` esperada e o conceito publicado. Essa evidência confirma o estado público atual, mas não identifica retroativamente a causa do 503 histórico; por isso, o status da causa permanece não confirmado.

## Configurações a conferir no hPanel

| Cenário | Raiz da aplicação | Entry file | Build command | Output directory |
| --- | --- | --- | --- | --- |
| Monorepo | raiz do repositório | `apps/kali-franca-membros/server.mjs` | `npm run build` | `apps/kali-franca-membros/.next` se exigido pelo painel |
| App isolado | `apps/kali-franca-membros` | `server.mjs` | `npm run build` no diretório do app | `.next` se exigido pelo painel |

Em ambos os cenários, conferir Node 22.x, gerenciador npm e instalação baseada no lockfile. A seleção final depende de como a aplicação foi cadastrada no hPanel.

## Próxima evidência necessária

Obter o log de build completo e uma captura dos campos de raiz, entry file, comando de build, versão Node, gerenciador e output directory. Também é necessário confirmar a publicação do commit `5086e75`. Sem esses dados, a causa permanece não confirmada e não deve ser marcada como corrigida.

Referências operacionais: [configuração de Node.js Web App no Hostinger](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/), [deploy de aplicação Node.js](https://www.hostinger.com/in/tutorials/deploy-node-js-application) e [solução de falha de compilação](https://www.hostinger.com/support/fix-failed-to-build-application-error-hostinger-node-js/).
