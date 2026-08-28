# Plano de implementação — Área de membros V1

> Execução inline autorizada pelo proprietário do projeto. A implementação fica restrita à fundação visual e de experiência descrita na especificação; autenticação real e conteúdo protegido continuam fora deste ciclo.

## Resultado esperado

Entregar uma área de membros navegável e responsiva, coerente com o design system da Kali França, sem dados fictícios e sem acoplamento ao CRM:

- `/` e `/login/`: entrada visual para login, com estado de configuração ausente honesto;
- `/cadastro/`: estrutura visual de cadastro, sem criação real de conta;
- `/membros/`: home preparada para sessão, com navegação e estado vazio honesto;
- tokens compartilhados a partir de `brandbook/tokens.css`;
- documentação do avanço e das decisões no `cofre-kali`.

## Restrições de segurança e escopo

- Não copiar `signIn`, middleware, papéis ou modelo de usuário do CRM.
- Não criar tabelas, migrations, clientes Supabase ou chamadas de autenticação.
- Não apresentar sucesso de login/cadastro sem provedor configurado.
- Não inventar aulas, cursos, progresso, depoimentos, métricas ou benefícios.
- Não alterar `index.html`, `brandbook/`, `bio/` ou diretórios não relacionados.
- Não tocar nos diretórios não rastreados existentes: `cofre-kali/.obsidian/`, `design-system/` e `referencias/`.

## Sequência de execução

### 1. Contrato de testes antes do código

Atualizar ou criar testes em `apps/kali-franca-membros/tests/` para verificar:

- rotas de entrada, cadastro e área preparada;
- presença dos componentes e textos essenciais;
- ausência de integrações fictícias e dados inventados;
- importação dos tokens da marca;
- estados de formulário, labels, `autocomplete`, `aria-invalid` e `aria-describedby`;
- `prefers-reduced-motion`, foco visível, breakpoints e ausência de overflow no CSS;
- metadados coerentes da aplicação.

Executar os testes antes da implementação e registrar a falha esperada do contrato novo.

### 2. Tokens e base global

- Importar `brandbook/tokens.css` de forma estável em `app/globals.css`.
- Definir apenas tokens semânticos locais que não existam na fonte compartilhada, evitando repetir os hexadecimais da marca.
- Criar base de reset, tipografia, superfícies, halo atmosférico, focus-visible e redução de movimento.
- Garantir que a organização de estilos continue compatível com `next build --webpack`.

### 3. Componentes de experiência

Criar componentes pequenos e diretamente reutilizáveis no app:

- marca e elementos de atmosfera;
- shell de autenticação;
- campos de texto e senha;
- botão primário e feedback inline;
- shell de membro, cabeçalho e navegação;
- cartão de conteúdo, progresso e estado vazio.

Componentes interativos devem ter estados locais somente para apresentação e não devem simular sessão ou persistência.

### 4. Rotas e conteúdo

- Implementar a entrada `/` como login visual e manter `/login/` como rota explícita.
- Implementar `/cadastro/` com nome, e-mail e senha, descrevendo honestamente que a ativação ainda está em preparação.
- Implementar `/membros/` como preview da home protegida, com estado vazio e indicação de que o conteúdo será liberado após a configuração da conta.
- Usar links reais somente para destinos que existam dentro da aplicação; controles sem integração devem ficar desabilitados ou apresentar estado de configuração.

### 5. Registro no cofre

Criar uma nota em `cofre-kali/03 - Produto e Experiência/` com:

- data e commit;
- escopo entregue;
- rotas e componentes;
- tokens e decisões visuais;
- limites funcionais;
- evidência de testes, lint e build;
- próximos requisitos para autenticação real.

Atualizar o MOC ou roadmap somente se a convenção existente do cofre exigir a entrada no índice.

### 6. Validação e entrega

Executar, nesta ordem:

1. `npm test` na raiz, se houver script de orquestração aplicável;
2. `npm test` em `apps/kali-franca-membros`;
3. `npm run lint` em `apps/kali-franca-membros`;
4. `npm run build` em `apps/kali-franca-membros`;
5. smoke test local do `server.mjs` a partir da raiz;
6. `git diff --check` e inspeção de `git status`.

Se todas as verificações passarem, criar commit com os arquivos da implementação e da documentação, preservando diretórios não relacionados. Depois, publicar na `main` e registrar separadamente a evidência de Git da evidência pública.

## Critérios de aceite

- A área não exibe mais o cartão genérico provisório.
- A interface usa os tokens, famílias tipográficas e paleta da Kali França.
- Login, cadastro e área preparada têm estrutura clara em desktop e mobile.
- Nenhum fluxo afirma que autenticação ou conteúdo funcionam quando não estão configurados.
- Campos e feedback são acessíveis por teclado e leitores de tela.
- Layout não cria overflow horizontal nos breakpoints definidos.
- Testes, lint e build passam.
- O cofre contém o registro do avanço e os limites da entrega.
- Nenhuma alteração não relacionada é incluída no commit.
