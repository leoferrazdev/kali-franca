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
- `apps/kali-franca-membros/app/membros/aplicacoes/mentoria-frequencia-da-abundancia/[id]/page.tsx`: página individual somente leitura, com o preenchimento completo agrupado em contato, contexto e prontidão.
- `apps/kali-franca-membros/app/components/MemberNavigation.tsx`: entrada administrativa exibida somente para `administradora`.

## Extensão — listagem e preenchimento individual

A inbox deixou de expandir o preenchimento completo dentro de cada item. A listagem exibe nome, e-mail, data, status e o botão `Ver aplicação completa`, que abre a rota individual usando o UUID técnico da aplicação. A tela individual valida o UUID, confirma sessão e perfil `administradora`, filtra pelo `id` e pelo slug fixo da mentoria e responde com estado neutro para erro ou registro inexistente.

A tela individual mantém todas as 17 respostas, o consentimento e os metadados de recebimento, sem edição, exclusão, exportação ou alteração de status. O layout foi reorganizado para leitura desktop e mobile, com quebra integral de textos e alvos interativos acessíveis.

O design desta extensão está em `docs/superpowers/specs/2026-08-30-mentoria-application-detail-design.md`.

## Atualização da bio

O botão da Mentoria na bio passou a apontar explicitamente para `https://kalifranca.com.br/bio/`, conforme a instrução desta etapa. O link não abre mais o destino de WhatsApp.

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
- Hostinger/deploy: V1 publicada a partir do commit `20013fe`; a extensão de listagem/detalhe e o ajuste da bio foram publicados no commit `d44245b`, ambos na `main`.
- URLs públicas verificadas após a propagação: página pública HTTP 200; botão da Mentoria na bio apontando para `https://kalifranca.com.br/bio/`; preflight da API HTTP 204 com `Access-Control-Allow-Origin` restrito ao domínio principal; POST inválido HTTP 400 sem criação de registro; inbox e rota individual sem sessão HTTP 307 para autenticação.
- Cofre: este registro e [[Mentoria Frequência da Abundância - Arquitetura aprovada]] atualizados.

## Roadmap posterior

- Rate limiting dedicado no endpoint, caso a infraestrutura escolhida ofereça o recurso.
- Política de privacidade e revisão jurídica específica para o tratamento das respostas.
- Edição de status, acompanhamento operacional e automações de contato no CRM.
- Teste controlado de ponta a ponta com dados fictícios e remoção posterior conforme procedimento definido.
