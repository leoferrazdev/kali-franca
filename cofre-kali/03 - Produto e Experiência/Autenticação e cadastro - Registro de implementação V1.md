---
title: Autenticação e cadastro - Registro de implementação V1
date: 2026-08-28
tags:
  - kali-franca
  - membros
  - autenticacao
  - cadastro
  - supabase
  - implementacao
type: delivery
status: publicamente-verificado-preview
area: produto
---

# Autenticação e cadastro — Registro de implementação V1

## Decisão arquitetural

- Provedor escolhido: Supabase Auth.
- Integração: @supabase/ssr com cliente browser, cliente server e cookies de sessão.
- Escopo: identidade dos membros da Kali França, separado do CRM administrativo/comercial.
- A home /membros/ é dinâmica e valida auth.getUser() server-side antes de exibir a área protegida.
- O proxy do Next atualiza a sessão e redireciona membros sem sessão para /login/.
- Usuários autenticados são redirecionados de /, /login/ e /cadastro/ para /membros/.

## Configuração

O workspace aceita somente:

- NEXT_PUBLIC_SUPABASE_URL;
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.

O arquivo apps/kali-franca-membros/.env.example documenta a configuração pública. Nenhuma service role key, credencial privada ou valor de produção foi criado ou versionado.

Sem variáveis configuradas, as páginas permanecem renderizáveis e exibem estado honesto de preparação; nenhuma sessão é simulada.

## Fluxos entregues

| Fluxo | Rota | Com configuração |
| --- | --- | --- |
| Login | / e /login/ | signInWithPassword, redirecionamento para /membros/ e refresh server-side |
| Cadastro | /cadastro/ | signUp com nome em metadata e callback de confirmação de e-mail |
| Callback | /auth/callback | troca code por sessão e retorno para /membros/ |
| Home | /membros/ | guarda server-side e identificação por e-mail; conteúdo permanece vazio |
| Recuperação | login | permanece explicitamente fora do escopo desta V1 |

## Segurança e separação de domínio

- O CRM não foi reutilizado: sem profiles, leads, offers, tasks, roles ou permissões administrativas.
- O formulário usa estado controlado e não envia senha em query string.
- Erros de autenticação são neutros e não expõem detalhes internos do provedor.
- O callback não aceita senha nem service role.
- A home usa dynamic = force-dynamic para impedir pré-renderização estática sem validação da sessão.
- A configuração externa do projeto Supabase, domínio de redirect, confirmação de e-mail e usuários reais são operações separadas do código.

## Evidências

| Estado | Evidência | Situação |
| --- | --- | --- |
| Testes focados | npm test --workspace=kali-franca-membros — 16/16 | validado |
| Testes do monorepo | npm test — 16 estáticos + 16 do app | validado |
| Lint | npm run lint — exit code 0 | validado |
| Build | npm run build — /auth/callback e /membros dinâmicos; demais rotas estáticas | validado |
| Smoke sem configuração | /, /login/, /cadastro/ e /membros/ locais — HTTP 200 | validado |
| Git | commit 6011e57 na main local | validado |
| Configuração Supabase | projeto, URL, key, redirect e e-mail ainda não configurados neste ambiente | pendente |
| Deploy público | host ainda não atualizado na última verificação | pendente |

## Próxima etapa determinística

Configurar o projeto Supabase próprio da Kali França no ambiente de deploy e validar o fluxo com um usuário de teste controlado. Somente após essa evidência implementar recuperação de senha, perfil de membro, conteúdo, módulos, progresso e regras de publicação.

## Relações

- [[MOC - Kali França]]
- [[Área de membros - Registro de implementação V1]]
- [[Diagnóstico visual inicial - Experiência web]]
- [[Design system como base de conhecimento]]
- [[Roadmap - Kali França]]


## Verificação pública — 2026-08-28

- https://membros.kalifranca.com.br/ — HTTP 200 e nova experiência presente.
- https://membros.kalifranca.com.br/login/ — HTTP 200 e nova experiência presente.
- https://membros.kalifranca.com.br/cadastro/ — HTTP 200 e nova experiência presente.
- https://membros.kalifranca.com.br/membros/ — HTTP 200, nova experiência e estado vazio presentes.
- A home pública exibe Prévia da experiência, não Sessão ativa; as variáveis públicas do Supabase ainda não estão configuradas no host.
- Conclusão: deploy visual público verificado; autenticação pública ainda pendente de configuração externa.