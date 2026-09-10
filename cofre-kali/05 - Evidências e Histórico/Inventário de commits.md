---
title: Inventário de commits
aliases:
  - Histórico Git da main
date: 2026-09-10
tags:
  - kali-franca
  - evidencias
  - historico
  - operacao
type: reference
status: active
area: evidencias
---

# Inventário de commits

Inventário factual da branch `main`, em ordem cronológica, obtido com `git log main --reverse --date=short --pretty=format:'%h|%ad|%s'`. O histórico registra código, testes, documentação e publicação; a existência de um commit não equivale, sozinha, à verificação pública.

```text
2026-08-27 b265c07 feat: bootstrap kali franca crm monorepo
2026-08-27 a4be4d7 docs: align publication roadmap
2026-08-27 df32c21 feat: add members next app shell
2026-08-27 eaf1fd0 chore: target root scripts to members app
2026-08-27 a30a52f feat: add static homepage
2026-08-28 dbf8d93 fix: anchor members server app directory
2026-08-28 640ccb8 docs: record public 503 recovery verification
2026-08-28 c7c05cc docs: especifica brandbook online
2026-08-28 720493f docs: cria plano do brandbook online
2026-08-28 392d120 test: define contrato estatico do brandbook
2026-08-28 08fb329 test: aceita markup inline no conceito do brandbook
2026-08-28 1b8e7f4 feat: adiciona entrada e tokens do brandbook
2026-08-28 143eec6 feat: aplica composicao editorial do brandbook
2026-08-28 c628a40 docs: registra implementacao do brandbook
2026-08-28 49e8af8 feat: adiciona preview social e registro do brandbook
2026-08-28 5086e75 docs: fecha evidencias do brandbook
2026-08-28 39949f4 docs: registra verificacao publica pendente
2026-08-28 15171e7 docs: versiona cofre inicial do projeto
2026-08-28 68aaa1e docs: especifica aplicacao visual na home
2026-08-28 2bb4a5d docs: cria plano visual da home
2026-08-28 5f885e2 test: define contrato visual da home
2026-08-28 82b4551 feat: estrutura landing demonstrativa da home
2026-08-28 2d56843 feat: aplica design system na home
2026-08-28 234f0fa docs: registra aplicacao visual da home
2026-08-28 b5f44a3 docs: confirma publicacao da home
2026-08-28 9b7bb67 docs: sincroniza evidencias publicas do projeto
2026-08-28 f17eb94 docs: especifica arquitetura do cofre kali
2026-08-28 06ae0de docs: planeja reorganizacao do cofre kali
2026-08-28 5c479e8 docs: organiza arquitetura do cofre kali
2026-08-28 8e65466 docs: fecha arquitetura do cofre kali
2026-08-28 b1eb33a docs: define pagina bio da Kali
2026-08-28 fa32234 feat: adiciona pagina bio da Kali
2026-08-28 7bd7455 docs: registra publicacao da bio
2026-08-28 86bb6ff docs: especifica experiencia da area de membros
2026-08-28 8293525 feat: cria fundacao visual da area de membros
2026-08-28 6b64c93 docs: registra experiencia da area de membros
2026-08-28 f9dbca9 docs: registra estado de publicacao de membros
2026-08-28 6011e57 feat: inicia autenticacao dos membros
2026-08-28 54ffed5 docs: registra autenticacao dos membros
2026-08-28 b66da7a docs: verifica deploy publico de membros
2026-08-28 c887bbe docs: registra conta de membros no Supabase Auth
2026-08-28 d2bd7af docs: registra deploy do auth no hostinger
2026-08-28 324f1da fix: atualiza assinatura da marca para Kalì Franca
2026-08-28 84356d2 docs: registra verificacao publica da assinatura
2026-08-28 29785aa feat: adiciona logout e ajustes responsivos
2026-08-28 04146fa docs: registra verificacao publica do logout
2026-08-30 50d2e78 feat: instala mapa de calor do Clarity na bio
2026-08-30 3c81b36 docs: registra validacao publica do Clarity na bio
2026-08-30 d2dd5b7 feat: atualiza manifesto de abundancia da bio
2026-08-30 bf63e80 docs: registra atualizacao editorial da bio
2026-08-30 c635b0c fix: exibe copy completa nos cards da bio
2026-08-30 4087863 fix: remove truncamento dos cards da bio
2026-08-30 2cc4878 docs: registra ux dos cards completos da bio
2026-08-30 842eb83 fix: remove retorno para home indefinida da bio
2026-08-30 3a2e868 docs: registra remocao da home futura na bio
2026-08-30 990a568 feat: instala analytics e eventos na bio
2026-08-30 62db0e2 docs: registra configuracao do analytics da bio
2026-08-30 4ed39e3 feat: initialize design system documentation, configure Obsidian vault, and import media assets
2026-08-30 d2ca722 feat: create bio landing page with destination links and analytics integration
2026-08-30 20013fe feat: add mentorship application flow and admin inbox
2026-08-30 c33382d docs: record deployed mentorship application
2026-08-30 d44245b feat: add individual mentorship application view
2026-08-30 903ca4b docs: record mentorship application detail release
2026-08-30 7c5ef94 fix: point mentorship bio button to application
2026-08-30 29af311 fix: preserve initial focus on mentorship application
2026-08-30 f87d0f2 docs: record admin access and focus fix
2026-09-04 c3e6dfc feat: publish Eleva 5D sales page
2026-09-04 606ff60 docs: record Eleva 5D public release
2026-09-04 3089d47 feat: publica vendas do Eleva 5D na raiz
2026-09-04 f6b2816 docs: registra verificacao da pagina Eleva na raiz
2026-09-04 b2692a0 fix: ajusta enquadramento da especialista na presenca
2026-09-04 2210c92 fix: versiona stylesheet da pagina raiz
2026-09-04 60e5f2d feat: adiciona favicon inspirado no marker visual
2026-09-04 4945cdc feat: aplica foto social da Kali na pagina principal
2026-09-04 9902756 fix: atualiza metadados da imagem social
2026-09-04 d7773bd feat: atualiza preview social da bio
2026-09-04 5ace739 feat: publica foto de preview social da Kali
2026-09-04 b7e5bfa feat: atualiza preview social do brandbook
2026-09-04 909e3f2 test: define contratos da fundacao do eleva 5d
2026-09-04 7710acc feat: cria fundacao de dados do eleva 5d
2026-09-04 0cf1b0a feat: adiciona dominio do eleva 5d
2026-09-04 d70ffdf feat: adiciona dashboard protegido do eleva 5d
2026-09-04 e68102f feat: prepara experiencia autenticada do eleva 5d
2026-09-04 7c9814d docs: registra fundacao do eleva 5d no cofre
2026-09-04 1257ab7 test: alinha contratos aos metadados sociais atuais
2026-09-04 f6a728f docs: define Eleva 5D purchase access flow
2026-09-04 0a2a370 docs: define Eleva 5D sales page V1
2026-09-04 3d19c8b docs: define fundacao do eleva 5d na area de membros
2026-09-04 9647093 docs: cria plano da fundacao do eleva 5d
2026-09-04 9b923ab chore: ignora worktrees locais
2026-09-06 e6370e4 feat: publica pagina Eleva 5D corrigida na raiz
2026-09-06 dbe89b0 fix: atualiza acesso anual do Eleva 5D
2026-09-06 e15b6ca docs: define landing page v3 do Eleva 5D
2026-09-06 ca48d57 feat: cria landing page v3 do Eleva 5D
2026-09-06 3f29f2a feat: cria primeira dobra v4 do Eleva 5D
2026-09-06 5874293 fix: melhora hierarquia da primeira dobra da v4
2026-09-06 239c2ff feat: atualiza oferta editorial da v4
2026-09-06 b67acf4 refactor: melhora leitura da prova social na v4
2026-09-06 bf765d7 fix: restaura valor do Eleva 5D na oferta
2026-09-06 aef9dbe feat: aplica melhorias de cro na pagina v4
2026-09-06 9c058d2 feat: refina responsividade da landing page v4
2026-09-06 1e3bdb0 feat: redesenha jornada visual da landing v4
2026-09-06 3f3111c fix: aplica paleta aprovada na V4
2026-09-06 e58064e fix: atualiza cache do CSS cromatico da V4
2026-09-06 ac590c3 fix: alinha cards do metodo na V4
2026-09-06 3ed213b fix: renova cache da grade da V4
2026-09-06 b52bb39 fix: destaca tempo diario na oferta V4
2026-09-06 448fd17 fix: atualiza cache da oferta V4
2026-09-06 5c2c50d fix: corrige contraste do tempo diario
2026-09-06 e456077 fix: adapta prova e autoridade ao mobile
2026-09-06 63a06e4 feat: cria landing page V5 do Eleva 5D
2026-09-06 b281c83 feat: cria landing page V6 do Eleva 5D
2026-09-06 06f5b18 docs: registra publicação da landing page V6
2026-09-06 1beefcb feat: adicionar prints reais na prova social da V6
2026-09-06 e3ae062 chore: manter apenas provas selecionadas no repositorio
2026-09-06 029aadb fix: ajustar leitura responsiva da V6
2026-09-06 a9473a1 content: atualizar primeiro depoimento da V6
2026-09-06 94c55c9 feat: criar V7 com hero editorial em background
2026-09-07 b10afaa feat: aplica texto final da landing Eleva 5D V8
```

## Relações

- [[Linha do tempo do projeto]]
- [[Matriz de entregas e evidências]]
- [[Estado atual e continuidade]]
