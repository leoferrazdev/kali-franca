# Plano de implementação — Mentoria Frequência da Abundância

> **Execução:** após a escolha do usuário entre subagente ou execução inline, seguir este plano em ordem. Cada etapa deve começar pelo teste correspondente e terminar com evidência local.

## Resultado esperado

Entregar uma aplicação pública em `https://kalifranca.com.br/mentoria-frequencia-da-abundancia/`, com 17 perguntas em telas sequenciais, persistência segura no Supabase e visualização completa dentro de `membros.kalifranca.com.br/membros/aplicacoes/mentoria-frequencia-da-abundancia`, exclusiva para `administradora`.

Manter a página pública estática no domínio principal e usar uma API técnica no serviço Next.js de membros. Preservar a separação entre a aplicação da candidata e o CRM administrativo. Não incluir login da candidata, pagamento, automações ou conversão automática para `leads`.

## Regras de execução

- Usar TDD: escrever teste que falha, executar para confirmar o vermelho, implementar o mínimo, executar novamente e refatorar.
- Reaproveitar os tokens de `brandbook/tokens.css` e os padrões existentes de Supabase/Auth da aplicação de membros.
- Não usar `service_role` no navegador nem registrar credenciais, respostas de candidatas ou PII em logs/documentação.
- Não sobrescrever as alterações existentes nem os diretórios não rastreados `cofre-kali/.obsidian/`, `design-system/`, `fotos/` e `referencias/`.
- Fazer alterações com `apply_patch`; adicionar somente arquivos pertencentes a esta entrega.
- O CRM desta entrega será uma rota na aplicação `kali-franca-membros`; o app separado `kali-franca-crm` não será usado para contornar autorização.

## Fase 1 — Contratos e diagnóstico verificável

### 1.1 Confirmar o estado antes da implementação

- Verificar `git status --short` e manter o inventário das alterações não relacionadas.
- Reconsultar os arquivos de autenticação, shell/navegação de membros, configuração Supabase, `proxy.ts`, `app/globals.css` e os testes existentes.
- Executar a busca de UI/UX da skill `ui-ux-pro-max` para o contexto de formulário multi-etapas premium, registrando apenas decisões aplicáveis aos tokens existentes.

### 1.2 Criar os testes primeiro

Adicionar contratos que inicialmente falhem:

- `tests/mentorship-application-static.test.mjs`: rota/HTML público, 17 perguntas, textos aprovados, navegação, endpoint, checkbox obrigatório e ausência de respostas em URL/localStorage.
- `apps/kali-franca-membros/tests/mentorship-application-schema.test.mjs`: nomes dos campos, slug, consentimento, idempotência, status inicial, grants, RLS pública de inserção e RLS administrativa de leitura.
- `apps/kali-franca-membros/tests/mentorship-application-api.test.mjs`: origem permitida, métodos, payload inválido, consentimento falso, limites, honeypot, resposta neutra e mapeamento sem campos privilegiados.
- `apps/kali-franca-membros/tests/mentorship-application-access.test.mjs`: rota administrativa usa sessão no servidor, exige `administradora`, não expõe dados para usuário comum e lista todos os campos da aplicação.

Executar o conjunto novo para registrar o estado vermelho antes de qualquer implementação.

## Fase 2 — Modelo Supabase e fronteira de dados

### 2.1 Criar a migração

Adicionar `supabase/migrations/202608300002_mentorship_frequency_applications.sql` com:

- tabela `public.mentorship_applications`;
- `id`, `mentorship_slug`, `status`, os 17 campos de resposta, `consent`, `consented_at`, `client_submission_id`, `created_at` e `updated_at`;
- `client_submission_id` único e índice por slug/data;
- validações SQL para slug, status, consentimento e escala de 0 a 10;
- defaults controlados pelo banco para slug, status e timestamps;
- RLS habilitado;
- policy `anon` apenas para `insert`, exigindo slug, consentimento e status inicial válidos;
- policy `authenticated` de `select` somente quando `public.is_administradora()` for verdadeiro;
- ausência de `select`, `update` e `delete` para `anon`;
- grants mínimos para `anon` inserir e `authenticated` consultar;
- trigger de atualização de `updated_at` conforme o padrão já existente, se disponível.

Não confiar em valores de status, slug ou timestamps vindos do cliente. Evitar duplicação na tabela `leads` nesta V1.

### 2.2 Aplicar e verificar no Supabase

- Abrir o projeto Supabase `fjnacvlcaveoiwedmdgy` no SQL Editor usando o navegador interno já aberto.
- Executar a migração completa.
- Verificar tabela, colunas, índices, grants e policies por consultas de metadados/SQL Editor.
- Não executar comandos destrutivos e não registrar dados reais de candidatas como teste.
- Registrar no cofre somente o nome da migração, o estado aplicado e evidências técnicas, nunca credenciais ou PII.

## Fase 3 — API pública de submissão

### 3.1 Implementar o contrato puro de validação

Adicionar módulo reutilizável, por exemplo `apps/kali-franca-membros/lib/mentorship/frequency-application.ts`, contendo:

- contrato TypeScript do payload;
- validação server-side dos campos obrigatórios e limites de texto;
- validação de e-mail e escala;
- validação de `consent === true`;
- rejeição do honeypot preenchido;
- normalização sem alterar o sentido das respostas;
- lista explícita de campos aceitos, descartando campos de privilégio;
- geração/validação de `client_submission_id`.

### 3.2 Implementar a rota

Adicionar `apps/kali-franca-membros/app/api/mentoria-frequencia-da-abundancia/applications/route.ts`:

- aceitar `POST` e `OPTIONS` para CORS controlado;
- permitir somente `Origin: https://kalifranca.com.br`;
- limitar corpo e rejeitar JSON inválido;
- usar cliente Supabase público no servidor, sem `service_role` e sem elevar permissões;
- inserir somente o payload validado, fixando slug/status/consentimento no servidor;
- retornar `201` com `{ id }` sem dados pessoais;
- tratar conflito de `client_submission_id` de forma idempotente;
- devolver mensagens neutras, sem refletir textos do formulário em logs ou erros;
- impedir qualquer método de leitura público.

Executar os testes de API novamente e confirmar o verde.

## Fase 4 — Página pública multi-etapas

### 4.1 Criar HTML e estilos

Adicionar:

- `mentoria-frequencia-da-abundancia/index.html`;
- `mentoria-frequencia-da-abundancia/styles.css`;
- `mentoria-frequencia-da-abundancia/app.js`.

Implementar layout mobile-first baseado em `brandbook/tokens.css`, com apresentação, indicador de progresso, pergunta atual, retorno, avanço, envio e sucesso. Usar os textos fornecidos e a assinatura **Kalì Franca**.

### 4.2 Implementar comportamento

- Modelar as 17 etapas em uma estrutura única e determinística.
- Renderizar uma pergunta por vez, sem ellipsis ou truncamento.
- Validar a etapa antes de avançar.
- Manter o estado em memória e preservá-lo em erro de rede.
- Não usar `localStorage`, query string ou URL para respostas.
- Gerar `client_submission_id` por tentativa de aplicação.
- Exibir o checkbox apenas na etapa final, com exatamente o texto aprovado.
- Mostrar sucesso apenas após `201` confirmado pela API.
- Emitir eventos operacionais sem PII, se a instrumentação existente for reutilizada.

### 4.3 Acessibilidade e responsividade

- Associar labels e controles corretamente.
- Mover foco para o título/controle da etapa quando a tela mudar.
- Usar `aria-live` para progresso e erros.
- Garantir foco visível e alvos de toque de pelo menos 44 px.
- Testar 375 px, desktop, teclado e `prefers-reduced-motion`.

Executar os testes estáticos, abrir a página localmente e verificar visualmente as dimensões prioritárias.

## Fase 5 — Caixa de entrada administrativa em membros

### 5.1 Criar a consulta protegida

Adicionar a rota de servidor `apps/kali-franca-membros/app/membros/aplicacoes/mentoria-frequencia-da-abundancia/page.tsx` e componentes auxiliares quando necessário:

- obter usuário com `createSupabaseServerClient()`;
- redirecionar não autenticados para o login;
- consultar `profiles` e exigir role `administradora`;
- negar sem revelar existência/quantidade para outras roles;
- consultar apenas aplicações da mentoria, ordenadas por `created_at desc`;
- tratar erro de banco sem vazar payload.

### 5.2 Criar a superfície CRM

- Adicionar entrada de navegação condicional somente para administradora.
- Exibir lista resumida e detalhe completo, com tabela/painel no desktop e cartões expansíveis no mobile.
- Mostrar data, status, contatos e todas as 17 respostas.
- Manter a V1 somente leitura; não criar botões de aprovação, recusa ou alteração de status.
- Usar tokens e componentes visuais existentes de membros.
- Garantir que usuário comercial, membro comum e visitante não tenham acesso por UI nem por RLS.

Executar os testes de acesso e a suíte existente de membros.

## Fase 6 — Documentação e cofre

Atualizar:

- `cofre-kali/03 - Produto e Experiência/Mentoria Frequência da Abundância - Arquitetura aprovada.md`: status, arquivos finais, migração aplicada, estado de deploy e verificações;
- `cofre-kali/00 - Índice/MOC - Kalì Franca.md`: link para o registro de implementação;
- criar `cofre-kali/03 - Produto e Experiência/Mentoria Frequência da Abundância - Registro de implementação V1.md` com decisões, contrato, segurança, estados de entrega e pendências futuras.

Registrar somente fatos técnicos agregados. Não registrar respostas de candidatas, e-mails, telefones, senhas, tokens ou chaves privadas.

## Fase 7 — Verificação completa e publicação

Executar, nesta ordem, guardando a saída:

1. testes novos em vermelho antes do código e verdes após cada implementação;
2. `npm run test:static`;
3. `npm run test --workspace=kali-franca-membros`;
4. `npm run lint`;
5. `npm run build`;
6. `git diff --check`;
7. teste local do HTML público e endpoint com payload inválido, sem criar registro real;
8. verificação da migração/RLS no Supabase;
9. commit dos arquivos nomeados, preservando diretórios não relacionados;
10. `git push origin main` conforme solicitado;
11. verificação pública de `https://kalifranca.com.br/mentoria-frequencia-da-abundancia/` e da API, documentando separadamente deploy e resposta HTTP;
12. se o deploy da área de membros estiver separado, verificar a rota administrativa somente com a sessão autorizada disponível, sem expor credenciais.

Não declarar a entrega concluída se build, testes, migração ou verificação pública não tiverem evidência atual.

## Critérios finais de aceite

- Página pública no domínio principal, sem login da candidata.
- 17 perguntas em telas sequenciais e conteúdo completo sem truncamento.
- Checkbox obrigatório com exatamente o texto aprovado.
- Persistência idempotente na tabela dedicada.
- Nenhuma leitura pública ou acesso de usuário não administradora.
- Aplicações completas disponíveis dentro da área de membros para `administradora`.
- Estados de código, Supabase, deploy, verificação e cofre registrados separadamente.
- Commit e push feitos na `main`, sem incluir trabalho não relacionado.
