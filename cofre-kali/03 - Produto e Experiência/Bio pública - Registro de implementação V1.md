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

## Atualização editorial — Manifesto de abundância — 2026-08-30

- Cabeçalho mantido como **Kalì Franca** e **BIO / 01**.
- Eyebrow atualizado para **DOMINE A SUA FREQUÊNCIA.**
- Título atualizado para **Mude a sua história.** com o apoio integral do manifesto fornecido.
- Bloco de Mentoria atualizado para **Mentoria Frequência da Abundância**, com a descrição e a ação **QUERO ME ALINHAR AGORA →**; o destino WhatsApp foi preservado.
- Bloco intermediário atualizado para **Eleva 5D: Reprogramação, Alinhamento e Manifestação**, com estado sem link e ação **AGUARDAR O NOVO MOVIMENTO →**.
- Bloco do YouTube atualizado para **Canal do YouTube: Manifestação Prática**, com a descrição e a ação **ASSISTIR AOS CONTEÚDOS →**; o canal foi preservado.
- Títulos e descrições dos blocos agora quebram linha sem truncamento para comportar a copy longa em telas estreitas.
- Contrato editorial: `tests/bio-static.test.mjs` cobre todos os textos aprovados e o estado sem link.

## Ajuste de UX — cards com conteúdo completo — 2026-08-30

- O travessão foi removido do texto de apoio: a frase agora segue com **se tornam uma só e a abundância**.
- A composição dos cards passou de três colunas para duas: ícone à esquerda e conteúdo empilhado à direita.
- Cada card exibe etiqueta, título, descrição e ação em fluxo vertical; a ação recebeu tratamento visual de CTA, sem criar link ou botão aninhado.
- A altura dos cards tornou-se automática e títulos/descrições usam quebra natural, sem `text-overflow: ellipsis`, `white-space: nowrap` ou reticências.
- O estado Eleva 5D permanece semanticamente não interativo e exibe **AGUARDAR O NOVO MOVIMENTO →** como status visual.
- A descrição dos cards usa 1rem para preservar legibilidade em telas pequenas, conforme a revisão `ui-ux-pro-max`.
- O contrato `tests/bio-static.test.mjs` cobre a ausência do travessão no apoio e do truncamento visual.

## Verificação pública — Cards com conteúdo completo — 2026-08-30

- Commit publicado na `main`: `4087863` (`fix: remove truncamento dos cards da bio`).
- `https://kalifranca.com.br/bio/` respondeu HTTP 200 com 6.472 bytes e o CSS versionado respondeu HTTP 200 com 11.975 bytes.
- O HTML público contém `styles.css?v=20260830-cards`, forçando a leitura da folha de estilo atualizada após a divergência de cache.
- O CSS público confirma o layout em duas colunas com conteúdo empilhado, sem `text-overflow: ellipsis`.
- A copy pública não possui reticências e o texto de apoio não contém travessão.
- O navegador do Codex foi recarregado e exibiu integralmente título, descrições e ações dos três cards; Eleva 5D segue sem link.
- A rota pública não contém `503` nem `Service Unavailable`.

## Verificação pública — Manifesto de abundância — 2026-08-30

- Commit publicado na `main`: `d2dd5b7` (`feat: atualiza manifesto de abundancia da bio`).
- `https://kalifranca.com.br/bio/` respondeu HTTP 200 com 6.355 bytes.
- O HTML público contém os textos de **DOMINE A SUA FREQUÊNCIA.**, **Mude a sua história.**, Mentoria Frequência da Abundância, Eleva 5D e Canal do YouTube: Manifestação Prática.
- A navegação pública mantém o destino WhatsApp da Mentoria e o canal oficial do YouTube; o bloco Eleva 5D continua sem elemento de link.
- O navegador do Codex foi recarregado e confirmou a renderização sem a tela 503.
- `npm run test:static`: 19 testes aprovados.
- `npm run test --workspace=kali-franca-membros`: 19 testes aprovados.
- `npm run build`: build de produção aprovado.

## Ajuste de navegação — home futura — 2026-08-30

- O link `footer-home` que retornava para `/` foi removido da bio porque a home pública ainda não está definida.
- O rodapé preserva apenas a marca e o domínio, sem substituir a ausência por um destino fictício.
- A definição da home permanece registrada como item de roadmap futuro.
- O contrato `tests/bio-static.test.mjs` garante a ausência do link e do CSS associado.
- O contrato responsivo foi atualizado para validar o alvo mínimo dos CTAs dos cards, que continuam sendo os elementos acionáveis da página.

## Verificação pública — home futura — 2026-08-30

- Commit publicado na `main`: `842eb83` (`fix: remove retorno para home indefinida da bio`).
- `https://kalifranca.com.br/bio/` respondeu HTTP 200 com o rodapé preservado e sem `footer-home` no HTML.
- `https://kalifranca.com.br/bio/styles.css?v=20260830-cards` respondeu HTTP 200 sem a regra `.footer-home`.
- As respostas públicas não contêm `503` nem `Service Unavailable`.
- `npm run test:static`: 20 testes aprovados.
- `npm run build`: build de produção da área de membros aprovado.

## Google Analytics 4 — acompanhamento da bio — 2026-08-30

- Conta criada: **Kalì Franca** — ID `406399339`.
- Propriedade criada: **Kalì Franca — Bio** — ID `552151142`.
- Fluxo web: `kalifranca.com.br` — ID `15528815163`.
- ID de medição instalado na página: `G-RZGESTEZCK`.
- Fuso configurado: `(GMT-03:00) São Paulo Time`; categoria: **Health**; porte: **Small - 1 to 10 employees**.
- O Enhanced Measurement permaneceu habilitado para page views, scrolls e outbound clicks.
- A bio também envia o evento customizado `bio_destination_click` para os links de Mentoria e YouTube, com os parâmetros `destination`, `destination_url` e `transport_type: beacon`.
- Reprogramação permanece sem evento de clique porque continua sem link interativo.
- Nenhum e-mail, senha, token ou chave privada foi registrado no cofre.
- O Analytics informa que a coleta pode levar até 48 horas para começar e os relatórios podem levar mais tempo para acumular dados.
