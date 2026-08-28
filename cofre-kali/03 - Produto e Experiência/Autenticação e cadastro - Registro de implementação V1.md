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
status: publicamente-verificado-auth-configurado
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

## Configuração operacional do Supabase Auth — 2026-08-28

- Projeto verificado: Kali Franca (`fjnacvlcaveoiwedmdgy`), status Healthy no painel.
- Site URL salva: `https://membros.kalifranca.com.br`.
- Redirect URL salva: `https://membros.kalifranca.com.br/auth/callback`.
- Cadastro de novos usuários: habilitado.
- Provedor de e-mail: habilitado.
- Confirmação de e-mail: habilitada para novos cadastros.
- Usuário de aplicação criado: `leonardoferrazbrasil@gmail.com`.
- UID confirmado: `99b9f2de-ed3b-4cb9-b2cd-67649cd45a4b`.
- Usuário confirmado automaticamente em 2026-08-28 17:04 (horário exibido no painel); nenhum e-mail de confirmação foi enviado.
- A senha temporária foi entregue fora do cofre e não é registrada em arquivos, Git ou notas.

### Limite atual de permissões

A aplicação de membros ainda não possui tabela de perfis, claim `admin`, RBAC ou operações exclusivas de administrador. Portanto, não existe tecnicamente um nível administrador com permissões adicionais neste momento. O usuário criado poderá acessar as rotas existentes quando as variáveis públicas do Supabase forem configuradas na hospedagem, mas essas rotas hoje distinguem apenas usuário autenticado de visitante; qualquer usuário autenticado teria o mesmo alcance atual. O CRM e seu modelo administrativo permanecem separados e não foram reutilizados.

### Pendência de publicação

O host ainda precisa receber `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` no ambiente de produção. Nenhuma chave foi registrada no cofre ou versionada. A conta criada e a configuração do Supabase não comprovam, sozinhas, o login público até essa configuração e um teste controlado de sessão.

## Configuração de produção e verificação pública — 2026-08-28

- Hostinger configurou no ambiente de produção as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; os valores não foram registrados no cofre, em arquivos ou no Git.
- Reimplantação concluída na Hostinger para a branch `main`, commit `c887bbe`, em 58 segundos.
- Configuração confirmada no deploy: diretório raiz `./`, Node `22.x`, comando `npm run build`, entrypoint `apps/kali-franca-membros/server.mjs`.
- Logs do build: Next.js compilado, TypeScript concluído, páginas estáticas geradas e saída finalizada sem erro. Avisos de incompatibilidade do binário SWC com a GLIBC foram contornados pelo fallback WASM e não impediram a publicação.
- Verificação pública sem sessão: `/` HTTP 200; `/login` HTTP 200; `/cadastro` HTTP 200; `/membros` HTTP 307 com `Location: /login/`.
- Conclusão: as variáveis públicas chegaram ao runtime e a proteção server-side da área de membros está ativa. Um login real com a senha temporária não foi executado automaticamente para não retransmitir a credencial; essa é a próxima validação manual controlada.