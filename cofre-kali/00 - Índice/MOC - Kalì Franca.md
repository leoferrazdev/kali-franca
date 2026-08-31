---
title: MOC - Kalì Franca
aliases:
  - Kalì Franca
date: 2026-08-28
tags:
  - kali-franca
  - indice
type: index
status: active
area: indice
---

# Kalì Franca — MOC

> [!abstract] Função
> Esta é a entrada central do cofre. Use os links abaixo para consultar contexto, marca, produto, operação e próximos movimentos.

## Estado atual

| Frente | Estado | Registro |
| --- | --- | --- |
| Domínio principal | publicamente-verificado | [[Home visual - Registro de implementação V1]] |
| Área de membros | publicamente-verificado | [[Diagnóstico - Falha de compilação Hostinger]] |
| Brandbook online | publicamente-verificado | [[Brandbook online - Registro de implementação V1]] |
| Design system | referência externa documentada | [[Design system - Mapa da fonte V1]] |

## Contexto e estratégia

- [[Contexto digital do projeto]]
- [[Registro de início do projeto]]
- [[Perfil, Promessa e ICP]]
- [[Escopo - Página de vendas demonstrativa]]

## Marca e design

- [[Design system como base de conhecimento]]
- [[Design system - Mapa da fonte V1]]
- [[Escopo - Brandbook online]]
- [[Brandbook online - Registro de implementação V1]]

## Produto e experiência

- [[Diagnóstico visual inicial - Experiência web]]
- [[Home visual - Registro de implementação V1]]

## Operação e deploy

- [[Diagnóstico - Falha de compilação Hostinger]]

## Decisões e entregas

- [[Escopo - Página de vendas demonstrativa]]
- [[Escopo - Brandbook online]]
- [[Home visual - Registro de implementação V1]]
- [[Brandbook online - Registro de implementação V1]]

## Próximo movimento

- [[Roadmap - Kalì Franca]]
- [[Como usar este cofre]]

## Registro da arquitetura

- [[Arquitetura do cofre Kalì Franca - Registro V1]]

## Bio pública

- [[Bio pública - Registro de implementação V1]]


## Atualização — Área de membros V1

- [[Área de membros - Registro de implementação V1]] registra a fundação visual e de experiência implementada em 2026-08-28.
- Estado desta entrega: Git local validado; publicação pública pendente.
- A autenticação real, conteúdo protegido e permissões permanecem fora do escopo até contrato técnico documentado.


### Verificação pós-push — Área de membros

- O código da V1 está publicado no commit 6b64c93 da main.
- A raiz pública ainda responde com o shell provisório; deploy público pendente.
- As rotas /login/, /cadastro/ e /membros/ não foram consideradas publicadas sem evidência HTTP.


## Atualização — Autenticação e cadastro V1

- [[Autenticação e cadastro - Registro de implementação V1]] registra o início da integração real com Supabase Auth no workspace de membros.
- O código está validado no commit 6011e57; configuração externa, usuário de teste e deploy público permanecem pendentes.
- A home protegida consulta apenas o usuário autenticado e não reutiliza o CRM.


### Verificação pública atualizada — Área de membros

- As quatro rotas públicas da V1 respondem HTTP 200 com a nova interface.
- A home está em modo Prévia da experiência; a autenticação ainda aguarda as variáveis públicas do Supabase no host.
- Estado atual: deploy visual público verificado; autenticação pública pendente de configuração externa.

## Atualização — Supabase Auth e usuário de aplicação — 2026-08-28

- O projeto Supabase `fjnacvlcaveoiwedmdgy` foi verificado como Healthy.
- Configurados: site URL `https://membros.kalifranca.com.br` e callback `https://membros.kalifranca.com.br/auth/callback`.
- Cadastro e provedor de e-mail estão habilitados; confirmação de e-mail permanece habilitada para novos cadastros.
- Criado e confirmado automaticamente o usuário de aplicação `leonardoferrazbrasil@gmail.com`; UID `99b9f2de-ed3b-4cb9-b2cd-67649cd45a4b`.
- O código ainda não possui RBAC ou nível administrador implementado; nenhum claim admin, perfil ou permissão do CRM foi criado.
- A publicação do login permanece pendente das variáveis públicas do Supabase no host e de um teste controlado de sessão.
- A senha temporária não foi registrada no cofre, arquivos ou Git.

## Atualização — Auth configurado no runtime público — 2026-08-28

- Hostinger configurou as duas variáveis públicas do Supabase e publicou o commit `c887bbe` na `main` com status Concluído.
- `/membros` agora responde HTTP 307 para `/login/` quando acessado sem sessão; o estado público de prévia deixou de ser servido pelo runtime configurado.
- O login real com a conta de aplicação criada permanece como validação manual controlada; credenciais não são registradas no cofre.

## Decisão de assinatura da marca — 2026-08-28

- Assinatura oficial: **Kalì Franca**.
- A grafia anterior não deve ser usada em páginas, metadados, textos de interface, notas ou nomes documentais do projeto.
- Identificadores técnicos permanecem estáveis: `kali-franca`, `cofre-kali`, os domínios `kalifranca.com.br` e `membros.kalifranca.com.br`, os caminhos de aplicação e a pasta física `D:\LEONARDO\Kali Franca`.
- O arquivo-fonte visual passou a se chamar `D:\LEONARDO\Kali Franca\design-system\Kalì Franca - Design System.dc.html`; as notas centrais do cofre também foram renomeadas para a nova assinatura.
- Validação desta atualização: nenhuma ocorrência antiga em texto público ou wikilink; somente referências técnicas preservadas.

## Verificação pública da assinatura — 2026-08-28

- O commit `324f1da` foi publicado na `main`; o deployment correspondente da Hostinger aparece como **Concluído** e **Atual**.
- `https://kalifranca.com.br/`, `/brandbook/` e `/bio/` responderam HTTP `200` e exibem **Kalì Franca**.
- `https://membros.kalifranca.com.br/login/` e `/cadastro/` responderam HTTP `200` após o deployment e exibem **Kalì Franca**.
- A verificação pública não encontrou a grafia anterior nas páginas consultadas.

## Atualização — Logout e auditoria responsiva — 2026-08-28

- [[Área de membros - Registro de implementação V1]] registra a criação do logout e a correção dos alvos interativos responsivos.
- Diagnóstico prévio: P0 = 0; os P1 encontrados foram corrigidos; os P2 eram elementos decorativos contidos pelo layout.
- A validação cobriu as páginas públicas, autenticação, prévia da área de membros e login do CRM em retrato e paisagem. Resultado local: sem overflow horizontal funcional e sem alvo interativo abaixo de 44×44 px.
- Estado de entrega: código e documentação locais validados; commit/push e verificação pública desta etapa permanecem pendentes até a publicação.

## Verificação pública — Logout e responsividade — 2026-08-28

- O commit `29785aa` foi publicado na `main` e o deployment da Hostinger aparece como **Concluído** e **Atual**.
- Site principal, brandbook e bio respondem HTTP 200 sem a tela 503.
- Login e cadastro de membros respondem HTTP 200; `/membros` redireciona para `/login` sem sessão.
- O CSS de produção contém o novo `.logout-button` e o alvo mínimo de 44 px.
- Logout autenticado real segue pendente de teste com sessão controlada, sem registrar credenciais no cofre.

## Microsoft Clarity — bio — 2026-08-30

- [[Bio pública - Registro de implementação V1]] registra o projeto **Kalì Franca — Bio** no Clarity e a instalação do rastreamento na rota `/bio/`.
- Projeto oficial desta etapa: `yaiki79vjn`; o projeto preliminar de outra sessão não foi excluído.
- O snippet está no `<head>` de `bio/index.html`; a coleta pode levar até duas horas para apresentar dados.
- O registro foi atualizado diretamente porque o aplicativo Obsidian não estava em execução para o CLI.
- Commit `50d2e78` publicado na `main`; a rota pública `/bio/` respondeu HTTP 200 com o snippet e o projeto oficial.
- `npm run test:static` (18), suíte de membros (19) e `npm run build` foram aprovados.

## Atualização editorial da bio — 2026-08-30

- A copy do **Manifesto de abundância** foi aplicada na bio: eyebrow, título, apoio e três blocos de movimento.
- Mentoria e YouTube preservam os destinos existentes; Reprogramação permanece sem link e sinalizada como novo movimento.
- A tipografia dos blocos foi ajustada para exibir títulos e descrições longos sem truncamento no mobile.
- Commit `d2dd5b7` publicado na `main`; `/bio/` respondeu HTTP 200 com a copy atualizada e sem 503.
- Os testes estáticos (19), a suíte de membros (19) e o build de produção foram aprovados.

## Ajuste de UX da bio — 2026-08-30

- Cards reorganizados em duas colunas com conteúdo empilhado para exibir títulos, descrições e CTAs completos.
- Removido o travessão do texto de apoio e preservado o estado sem link do Eleva 5D.
- Commit `4087863` publicado na `main`; HTML e CSS públicos respondem HTTP 200, com cache-bust e sem truncamento por ellipsis.

## Atualização de navegação da bio — 2026-08-30

- Removido o retorno para `/` do rodapé da bio, pois a home pública ainda não está definida.
- O rodapé permanece com a assinatura e o domínio; a home foi mantida como movimento futuro do roadmap.
- Commit `842eb83` publicado na `main`; `/bio/` e seu CSS respondem HTTP 200 sem `footer-home` e sem 503.
- `npm run test:static` (20) e `npm run build` foram aprovados.

## Google Analytics 4 na bio — 2026-08-30

- A conta **Kalì Franca** (`406399339`), a propriedade **Kalì Franca — Bio** (`552151142`) e o fluxo web (`15528815163`) foram criados no Analytics.
- A bio usa o ID de medição `G-RZGESTEZCK` para page views e envia `bio_destination_click` nos destinos acionáveis.
- [[Bio pública - Registro de implementação V1]] contém os parâmetros de configuração e o estado de coleta.
- Commit `990a568` publicado na `main`; a bio pública respondeu HTTP 200 com o tag e o evento presentes, sem 503.
- As suítes estáticas (21), de membros (19) e o build de produção foram aprovados; a coleta do Analytics permanece sujeita à janela de processamento do Google.

## Mentoria Frequência da Abundância — arquitetura da aplicação — 2026-08-30

- [[Mentoria Frequência da Abundância - Arquitetura aprovada]] registra a URL pública, o fluxo de 17 etapas, o consentimento mínimo e a separação entre aplicação pública e CRM administrativo.
- A experiência pública ficará em `kalifranca.com.br/mentoria-frequencia-da-abundancia/`; o CRM ficará dentro de `membros.kalifranca.com.br` e será exclusivo para `administradora`.
- A persistência será feita em tabela Supabase própria da mentoria, sem duplicação automática em leads na V1.
- [[Mentoria Frequência da Abundância - Registro de implementação V1]] registra o fluxo público, a API, a tabela Supabase, o RLS, a caixa administrativa e as verificações da entrega.
- Estado atual: implementação V1 concluída; migration aplicada no Supabase; commit `20013fe` publicado na `main`; página, API e guarda administrativa verificados publicamente.
