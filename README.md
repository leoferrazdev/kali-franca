# Kali França

Monorepositório do ecossistema digital da Kali França. O workspace inicial é um shell técnico Next.js para `membros.kalifranca.com.br`; não há autenticação, dados ou funcionalidades fictícias. O CRM operacional permanece preparado para um roadmap futuro.

## Arquitetura

- `apps/kali-franca-crm/`: Next.js 16.3 com App Router, React 19, TypeScript, Supabase SSR/Auth e servidor Node compatível com `PORT`.
- `apps/kali-franca-membros/`: shell Next.js sem funcionalidades, destinado à primeira publicação da área de membros.
- `supabase/migrations/`: estrutura PostgreSQL, Auth e RLS sem dados reais.
- `package.json`: npm Workspaces; os scripts da raiz delegam para membros e os comandos `crm:*` preservam o CRM para o roadmap.

## Desenvolvimento local

Requisitos: Node.js 22.x e npm.

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run start
```

O servidor de produção usa `PORT` quando essa variável é fornecida pelo ambiente:

```bash
PORT=3000 npm run start
```

Copie `apps/kali-franca-crm/.env.example` para um arquivo de ambiente local e preencha apenas com as credenciais públicas do projeto Supabase independente da Kali França:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Não reutilize o projeto Supabase da Uli Zarzana. Não versionamos `.env`, usuários, leads, tokens ou chaves privadas. A migration inicial é somente estrutura técnica; aplique-a no projeto Supabase da Kali França antes de cadastrar usuários operacionais.

## Publicação

- `kalifranca.com.br`: site estático em HTML, separado do runtime Node.js deste monorepositório.
- `membros.kalifranca.com.br`: Web App Node.js/Next.js do workspace inicial de membros, sem funcionalidades de produto nesta etapa.
- `crm.kalifranca.com.br`: publicação futura do workspace `apps/kali-franca-crm` como Node.js Web App.

Para membros, use **Websites → Add Website → Node.js Web App → Import Git Repository** com o repositório `leoferrazdev/kali-franca`, branch `main`, Node.js 22.x, diretório raiz, build `npm run build` e entrada `apps/kali-franca-membros/server.mjs`. O workspace não requer variáveis de ambiente nesta etapa. Para o CRM futuro, use os comandos `crm:build` e `crm:start` e cadastre as duas variáveis públicas do Supabase no painel, nunca no GitHub. Antes de substituir qualquer site estático já associado ao domínio, faça backup e verifique o alvo.

## Estados de entrega

Commit, push, build local, deployment Hostinger, domínio público e conexão com Supabase são estados independentes. Cada entrega deve registrar evidência separada para esses estados e não tratar um push como prova de deployment ou conexão com banco.
