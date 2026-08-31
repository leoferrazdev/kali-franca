---
title: Mentoria Frequência da Abundância - Arquitetura aprovada
aliases:
  - Aplicação Mentoria Frequência da Abundância
status: Implementado V1
tipo: Registro de decisão
dominio: Mentoria Frequência da Abundância
data: 2026-08-30
---

# Mentoria Frequência da Abundância — Arquitetura aprovada

## Decisão

A aplicação pública será exibida em `https://kalifranca.com.br/mentoria-frequencia-da-abundancia/`, fora de `membros.kalifranca.com.br` e sem login para a candidata.

O CRM de aplicações ficará dentro da área autenticada de membros, visível exclusivamente para usuários com perfil `administradora`.

## Fluxo aprovado

- Tela de apresentação.
- Uma tela para cada uma das 17 perguntas.
- Checkbox obrigatório antes do envio: “Concordo que os dados informados sejam usados para analisar minha aplicação e entrar em contato comigo.”
- Página de agradecimento após persistência confirmada.

## Dados e segurança

Os dados serão armazenados em uma tabela exclusiva da mentoria no Supabase, sem duplicação automática em leads na V1. A página pública enviará os dados para uma API técnica no serviço de membros; o navegador não terá acesso a leituras, chaves privadas ou respostas de outras candidatas.

Como o formulário pode conter informações sobre crença/fé e áreas relacionadas à saúde, o desenho restringe a leitura ao perfil `administradora`, evita logs com respostas e não grava dados no navegador após a sessão.

## CRM

Rota prevista: `/membros/aplicacoes/mentoria-frequencia-da-abundancia`.

A administradora verá lista e detalhes completos em layout responsivo. Usuários sem autorização não verão a existência nem o conteúdo das aplicações.

## Referência técnica

- [[MOC - Kalì Franca]]
- Especificação completa no repositório: `docs/superpowers/specs/2026-08-30-mentoria-frequencia-da-abundancia-application-design.md`
- [[Brandbook - Kalì Franca]]
- [[Design System - Kalì Franca]]

## Estado

Arquitetura aprovada em 2026-08-30 e implementada na V1. A implementação está registrada em [[Mentoria Frequência da Abundância - Registro de implementação V1]]. O código e o banco foram validados localmente/remotamente; deploy e verificação pública permanecem estados separados e devem ser confirmados após a publicação.
