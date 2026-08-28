# Kalì Franca

Monorepositório do ecossistema digital da Kalì Franca. O workspace inicial é um shell técnico Next.js para `membros.kalifranca.com.br`; não há autenticação, dados ou funcionalidades fictícias. O CRM operacional permanece preparado para um roadmap futuro.

## Arquitetura

- `apps/kali-franca-crm/`: Next.js 16.3 com App Router, React 19, TypeScript, Supabase SSR/Auth e servidor Node compatível com `PORT`.
- `apps/kali-franca-membros/`: Next.js com fundação visual, Supabase Auth preparado e home protegida para a área de membros.
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

Para o CRM, copie `apps/kali-franca-crm/.env.example` para um arquivo de ambiente local. Para a área de membros, use `apps/kali-franca-membros/.env.example`. Em ambos os casos, preencha somente as credenciais públicas do projeto Supabase independente da Kalì Franca:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Não reutilize o projeto Supabase da Uli Zarzana. Não versionamos `.env`, usuários, leads, tokens ou chaves privadas. A migration inicial é somente estrutura técnica do CRM; ela não configura conteúdo ou perfil de membros. A autenticação de membros usa o Auth do projeto Supabase da Kalì Franca e continua em estado honesto quando as variáveis estão ausentes.

## Publicação

- `kalifranca.com.br`: site estático em HTML, separado do runtime Node.js deste monorepositório.
- `membros.kalifranca.com.br`: Web App Node.js/Next.js do workspace de membros, com login/cadastro Supabase e home protegida.
- `crm.kalifranca.com.br`: publicação futura do workspace `apps/kali-franca-crm` como Node.js Web App.

Para membros, use **Websites → Add Website → Node.js Web App → Import Git Repository** com o repositório `leoferrazdev/kali-franca`, branch `main`, Node.js 22.x, diretório raiz, build `npm run build` e entrada `apps/kali-franca-membros/server.mjs`. Cadastre `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` nas variáveis do Web App para ativar login, cadastro e proteção da home; sem elas, o app permanece em preview e não cria sessões. Para o CRM futuro, use os comandos `crm:build` e `crm:start` e cadastre as mesmas variáveis públicas no painel, nunca no GitHub. Antes de substituir qualquer site estático já associado ao domínio, faça backup e verifique o alvo.

## Estados de entrega

Commit, push, build local, deployment Hostinger, domínio público e conexão com Supabase são estados independentes. Cada entrega deve registrar evidência separada para esses estados e não tratar um push como prova de deployment ou conexão com banco.
