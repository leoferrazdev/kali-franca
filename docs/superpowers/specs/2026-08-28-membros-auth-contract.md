# Área de membros — Contrato de autenticação V1

## Decisão

A área de membros usará Supabase Auth como provedor de identidade, conectado por `@supabase/ssr` no app `apps/kali-franca-membros`. A escolha é coerente com a stack já instalada no monorepo e permite sessão SSR com cookies sem introduzir um provedor paralelo.

Essa decisão vale somente para a identidade dos membros. O CRM continua sendo um domínio administrativo/comercial separado; sua tabela `profiles`, papéis, middleware e consultas de negócio não serão reutilizados pela área de membros.

## Configuração

O app aceitará somente:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

As variáveis serão documentadas em `apps/kali-franca-membros/.env.example`. Nenhuma service role key ou credencial privada será necessária no navegador, no repositório ou no build.

Quando a configuração estiver ausente, o produto deverá continuar renderizando a experiência visual e informar a indisponibilidade sem simular cadastro, login ou sessão.

## Rotas e comportamento

| Rota | Sem configuração | Com configuração e sem sessão | Com sessão |
| --- | --- | --- | --- |
| `/` | login preparado | login | redireciona para `/membros/` |
| `/login/` | login preparado | login | redireciona para `/membros/` |
| `/cadastro/` | cadastro preparado | cadastro | redireciona para `/membros/` |
| `/membros/` | preview honesta | redireciona para `/login/` | home protegida |
| `/auth/callback` | erro operacional controlado | troca código por sessão | redireciona para `/membros/` |

O proxy do Next deve atualizar a sessão por `auth.getUser()` e proteger somente a área de membros, sem bloquear os assets públicos ou as rotas de autenticação.

## Cadastro

- Campos: nome, e-mail e senha.
- O nome será enviado como metadata do usuário no próprio Auth, sem criar perfil de negócio nesta fase.
- Em confirmação de e-mail habilitada, exibir instrução para verificar a caixa de entrada.
- Com sessão criada imediatamente, redirecionar para `/membros/`.
- Erros devem ser genéricos e úteis, sem expor detalhes internos do provedor.

## Login

- Campos: e-mail e senha.
- Usar `signInWithPassword` somente no cliente browser do app de membros.
- Sucesso redireciona para `/membros/` e atualiza a árvore server-side.
- Credenciais inválidas retornam mensagem neutra.
- Nenhuma senha deve aparecer em query string, logs ou mensagens de erro.

## Home protegida

- A página server-side valida a sessão novamente como defesa em profundidade.
- A interface pode exibir apenas o e-mail do usuário autenticado nesta V1.
- Conteúdo, módulos, progresso e perfil continuam em estado vazio até existir uma fonte de dados de membros.
- A home não deve consumir leads, profiles do CRM, offers, tasks ou qualquer tabela operacional.

## Segurança e operação

- O cliente browser usa somente a publishable key.
- Cookies de sessão são gerenciados por `@supabase/ssr` e middleware.
- Não criar ou versionar `.env` real.
- Não incluir credenciais em testes, screenshots, commits ou documentação pública.
- A configuração do projeto Supabase e a confirmação de domínio/e-mail são etapas operacionais separadas do código.

## Critérios de aceite

- Login e cadastro usam o cliente Supabase do app de membros quando as variáveis existem.
- Sem variáveis, o build e as páginas continuam funcionando com estado operacional honesto.
- Usuário sem sessão não acessa `/membros/` quando o provedor está configurado.
- Usuário autenticado não permanece em `/login/` ou `/cadastro/`.
- Callback de confirmação troca o código por sessão e retorna à home.
- A home server-side valida `auth.getUser()` e não consulta o CRM.
- Testes, lint e build passam sem secrets.
- A documentação distingue código publicado, configuração Supabase e deploy público.

## Fora de escopo

- Criação do projeto Supabase ou alteração de configurações externas.
- Cadastro de usuário real, envio de e-mail ou confirmação de conta.
- Recuperação completa de senha e atualização de senha.
- Perfil de membro, cursos, módulos, progresso, pagamentos ou conteúdo protegido.
- Papéis administrativos, RLS do CRM ou migrações de negócio.
