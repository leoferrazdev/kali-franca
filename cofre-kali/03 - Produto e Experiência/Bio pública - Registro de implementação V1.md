---
title: Bio pública - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - bio
  - implementacao
  - design-system
type: delivery
status: publicamente-verificado
area: produto
---

# Bio pública — Registro de implementação V1

## Entrega

- Rota: https://kalifranca.com.br/bio/
- Arquivos: bio/index.html e bio/styles.css.
- Contrato estático: tests/bio-static.test.mjs.
- Fonte visual: brandbook/tokens.css.
- Imagem de perfil e prévia social: profile.jpg.

## Destinos publicados

| Destino | Estado | Ação |
| --- | --- | --- |
| Mentoria | link ativo | [Conversar pelo WhatsApp](https://wa.me/message/R6WHM3W3SGCSE1) |
| Reprogramação Energética | sem link por enquanto | Em breve |
| Canal do YouTube | link ativo | [Visitar o canal](https://www.youtube.com/channel/UCeaSCWbFhL3TOuIdYxzH3OQ) |

## Decisões visuais

- A referência https://pocket-kindness-flow.lovable.app/ foi usada apenas para a arquitetura de perfil + cartões de destino.
- A composição foi adaptada para o sistema da Kalì: campo escuro, halos, órbitas, linhas de frequência, superfícies vinho/umbra e ouro de uso restrito.
- A tipografia usa Cormorant Garamond, Jost e IBM Plex Mono.
- O cartão de Reprogramação Energética é um estado não interativo, sem href, para não inventar um destino.
- A página não publica métricas, preços, depoimentos, garantias ou resultados não validados.
- A experiência inclui foco visível, alvos de interação de no mínimo 44px, responsividade e movimento reduzido.

## Estados de entrega

| Estado | Evidência | Situação |
| --- | --- | --- |
| Arquivos locais | bio/index.html, bio/styles.css e teste presentes | validado |
| Teste focado | node --test tests/bio-static.test.mjs — 4/4 | validado |
| Testes estáticos integrados | npm run test:static — 16/16 | validado |
| Smoke local | /, /bio/, /bio/styles.css e /profile.jpg — HTTP 200 | validado |
| Publicação pública | `https://kalifranca.com.br/bio/`, `/bio/styles.css` e `/profile.jpg` — HTTP 200 em 2026-08-28 | validado |

## Verificação pública

Após o push do commit `fa32234`, a rota pública respondeu com:

- `https://kalifranca.com.br/bio/` — HTTP 200, `text/html`, com os destinos de Mentoria, YouTube e o estado `Em breve`.
- `https://kalifranca.com.br/bio/styles.css` — HTTP 200, `text/css`.
- `https://kalifranca.com.br/profile.jpg` — HTTP 200, `image/jpeg`.

O remoto `origin/main` está alinhado ao commit `fa32234`.

## Relações

- [[MOC - Kalì Franca]]
- [[Design system como base de conhecimento]]
- [[Design system - Mapa da fonte V1]]
- [[Home visual - Registro de implementação V1]]
- [[Roadmap - Kalì Franca]]

## Microsoft Clarity — mapa de calor da bio — 2026-08-30

- Projeto oficial criado no navegador próprio do Codex: **Kalì Franca — Bio**.
- URL monitorada: `https://kalifranca.com.br/bio/`.
- Setor selecionado: **Saúde e Bem-estar**.
- Dashboard de instalação: `https://clarity.microsoft.com/projects/view/yaiki79vjn/gettingstarted`.
- O snippet oficial do projeto foi instalado no `<head>` de `bio/index.html`, usando `https://www.clarity.ms/tag/`.
- Contrato automatizado: `tests/bio-clarity.test.mjs`.
- A coleta pode levar até duas horas para exibir dados no painel, conforme aviso do Clarity.
- O projeto preliminar criado em outra sessão de navegador (`yaij2gqp9z`) não foi apagado, pois a exclusão é uma ação destrutiva não solicitada. O projeto oficial desta etapa é `yaiki79vjn`.
- Nenhuma credencial, senha ou chave privada foi registrada no cofre.
- Registro feito diretamente no Markdown porque o aplicativo Obsidian não estava em execução e o CLI estava indisponível.

## Verificação pública — Microsoft Clarity — 2026-08-30

- Commit publicado na `main`: `50d2e78` (`feat: instala mapa de calor do Clarity na bio`).
- `https://kalifranca.com.br/bio/` respondeu HTTP 200 com 5.924 bytes.
- O HTML público contém `https://www.clarity.ms/tag/` e o projeto oficial `yaiki79vjn`.
- O HTML público não contém `503` nem `Service Unavailable` e preserva o título `Kalì Franca — Bio`.
- A aba pública do navegador do Codex foi recarregada e exibiu os três destinos previstos: Mentoria, Reprogramação Energética em breve e Canal do YouTube.
- `npm run test:static`: 18 testes aprovados.
- `npm run test --workspace=kali-franca-membros`: 19 testes aprovados.
- `npm run build`: build de produção aprovado.
- O painel do Clarity permanece configurado; os dados de mapa de calor podem levar até duas horas para aparecer.
