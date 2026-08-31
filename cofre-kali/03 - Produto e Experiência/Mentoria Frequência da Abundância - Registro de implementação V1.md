---
title: Mentoria Frequência da Abundância - Registro de implementação V1
aliases:
  - Aplicação de mentoria - implementação V1
status: Implementado V1
tipo: Registro de implementação
dominio: Mentoria Frequência da Abundância
data: 2026-08-30
---

# Mentoria Frequência da Abundância — Registro de implementação V1

## Resultado

A aplicação pública da Mentoria Frequência da Abundância foi implementada como um fluxo sem login, com apresentação, 17 telas de perguntas, consentimento obrigatório e página de agradecimento após persistência confirmada.

- URL pública: `https://kalifranca.com.br/mentoria-frequencia-da-abundancia/`
- API técnica: `https://membros.kalifranca.com.br/api/mentoria-frequencia-da-abundancia/applications`
- Caixa administrativa: `https://membros.kalifranca.com.br/membros/aplicacoes/mentoria-frequencia-da-abundancia`
- A caixa administrativa exige sessão e perfil `administradora`.

## Implementação

- `mentoria-frequencia-da-abundancia/index.html`: conteúdo, metadados, 17 perguntas, alternativas e consentimento aprovado.
- `mentoria-frequencia-da-abundancia/styles.css`: identidade visual baseada em `brandbook/tokens.css`, layout responsivo e alvos interativos acessíveis.
- `mentoria-frequencia-da-abundancia/app.js`: estado em memória, navegação por etapas, validação, envio idempotente, estados de erro e sucesso.
- `apps/kali-franca-membros/lib/mentorship/frequency-application.ts`: contrato de validação compartilhado pelo endpoint.
- `apps/kali-franca-membros/app/api/mentoria-frequencia-da-abundancia/applications/route.ts`: endpoint `POST` com origem permitida, limite de corpo, honeypot, consentimento, validação e resposta neutra `{ accepted: true }`.
- `apps/kali-franca-membros/app/membros/aplicacoes/mentoria-frequencia-da-abundancia/page.tsx`: inbox administrativa somente leitura, com lista, expansão e respostas completas.
- `apps/kali-franca-membros/app/components/MemberNavigation.tsx`: entrada administrativa exibida somente para `administradora`.

## Banco e segurança

O projeto Supabase `fjnacvlcaveoiwedmdgy` recebeu a fundação do CRM e a tabela dedicada `public.mentorship_applications`.

- Migration-base: `supabase/migrations/202608270001_initial_crm.sql`.
- Migration da mentoria: `supabase/migrations/202608300002_mentorship_frequency_applications.sql`.
- A tabela possui 25 colunas, chave técnica, slug fixo, status operacional, 17 respostas, consentimento, timestamp de consentimento, idempotência e timestamps.
- RLS: `anon` pode somente inserir uma aplicação válida; `authenticated` pode somente ler quando `public.is_administradora()` for verdadeiro.
- O endpoint não usa `service_role`, não devolve PII, não registra respostas em URLs/logs e não grava respostas no navegador.
- Não houve inserção de aplicação real durante a implementação.

As perguntas de crença/fé e áreas relacionadas à saúde podem conter dados pessoais sensíveis. A V1 mantém a leitura restrita à administradora e não constitui declaração de conformidade jurídica; política de privacidade e revisão jurídica permanecem itens futuros.

## Verificação

Testes de contrato implementados:

- `tests/mentorship-application-static.test.mjs`
- `apps/kali-franca-membros/tests/mentorship-application-schema.test.mjs`
- `apps/kali-franca-membros/tests/mentorship-application-api.test.mjs`
- `apps/kali-franca-membros/tests/mentorship-application-access.test.mjs`

Também foram preservados e ajustados apenas os contratos existentes necessários para a navegação administrativa consultar `profiles`; o acesso a demais tabelas do CRM continua fora da home de membros.

## Estados de entrega

- Código: implementado e versionado no repositório.
- Supabase: migrations-base e específica aplicadas no projeto informado; estrutura conferida com tabela, funções, políticas, índices e grants.
- Hostinger/deploy: confirmar após o push na `main`.
- URLs públicas: confirmar após a propagação do deploy; resposta pública não é inferida a partir do build local.
- Cofre: este registro e [[Mentoria Frequência da Abundância - Arquitetura aprovada]] atualizados.

## Roadmap posterior

- Rate limiting dedicado no endpoint, caso a infraestrutura escolhida ofereça o recurso.
- Política de privacidade e revisão jurídica específica para o tratamento das respostas.
- Edição de status, acompanhamento operacional e automações de contato no CRM.
- Teste controlado de ponta a ponta com dados fictícios e remoção posterior conforme procedimento definido.
