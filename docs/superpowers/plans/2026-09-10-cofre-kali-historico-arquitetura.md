# Cofre Kalì Franca — Arquitetura, histórico e visualização Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organizar o cofre `cofre-kali`, registrar o histórico verificável do projeto desde o bootstrap até o estado atual e tornar pastas e Graph View visualmente distinguíveis pela paleta oficial.

**Architecture:** Preservar o hub numerado existente e adicionar uma área de evidências/histórico. O MOC continuará sendo a porta de entrada; a linha do tempo explicará as etapas; os registros detalhados continuarão nas áreas semânticas. O Explorador usará um CSS snippet por pasta e o Graph View usará grupos de tags, evitando depender de cores implícitas do tema.

**Tech Stack:** Obsidian CLI, Obsidian Flavored Markdown, CSS snippets, Graph View `graph.json`, Git history.

## Global Constraints

- Assinatura pública e documental: `Kalì Franca`; identificadores técnicos existentes permanecem estáveis.
- Não registrar senhas, tokens, chaves privadas ou credenciais.
- Separar fato observado, inferência, hipótese, pendência e publicação pública.
- Preservar notas e alterações existentes; não incluir arquivos temporários ou ativos não relacionados.
- Usar wikilinks para notas do cofre e links Markdown apenas para fontes externas.
- Não tratar commit, deploy, aprovação externa e comportamento público como a mesma evidência.

---

### Task 1: Consolidar a arquitetura de navegação

**Files:**
- Create: `cofre-kali/05 - Evidências e Histórico/README.md`
- Modify: `cofre-kali/00 - Índice/MOC - Kalì Franca.md`
- Modify: `cofre-kali/00 - Índice/Como usar este cofre.md`
- Modify: `cofre-kali/00 - Índice/Roadmap - Kalì Franca.md`

**Interfaces:**
- Consumes: os 29 registros Markdown existentes e a taxonomia atual.
- Produces: um hub que aponta para as seis áreas semânticas, linha do tempo, inventário de commits e matriz de evidências.

- [x] **Step 1: Criar a área de evidências e histórico** com README contendo escopo, classificação de evidência e links para os novos registros.
- [x] **Step 2: Atualizar o MOC** com a nova área, linha do tempo, inventário de commits, matriz de entregas e estado atual.
- [x] **Step 3: Atualizar o guia de uso** com a regra de que cada mudança deve ter data, estado, evidência e link relacionado.
- [x] **Step 4: Atualizar o roadmap** para distinguir concluído, pendente de integração e pendente de publicação.
- [x] **Step 5: Validar navegação** com `obsidian vault=cofre-kali unresolved verbose format=tsv`.

### Task 2: Registrar o histórico completo e o estado atual

**Files:**
- Create: `cofre-kali/00 - Índice/Linha do tempo do projeto.md`
- Create: `cofre-kali/00 - Índice/Estado atual e continuidade.md`
- Create: `cofre-kali/05 - Evidências e Histórico/Inventário de commits.md`
- Create: `cofre-kali/05 - Evidências e Histórico/Matriz de entregas e evidências.md`

**Interfaces:**
- Consumes: histórico `git log`, notas existentes, PDF do Produto 1/2, mapa do Whimsical e estado atual do worktree.
- Produces: registro factual de etapas de 27/08/2026 a 10/09/2026, sem credenciais e sem converter pendências em fatos.

- [x] **Step 1: Reunir o histórico Git** com hash curto, data e assunto de cada commit, preservando a ordem cronológica.
- [x] **Step 2: Agrupar a linha do tempo** em bootstrap/503, marca e brandbook, home e cofre, bio/analytics, mentoria/CRM, autenticação, Eleva 5D e produto/documentação.
- [x] **Step 3: Registrar o mapa de produtos** com Produto 1, Produto 2, módulos M1–M5, relatos e pontos de validação.
- [x] **Step 4: Criar a matriz de evidências** separando `confirmado no repositório`, `validado localmente`, `publicado`, `verificado publicamente`, `pendente` e `não confirmado`.
- [x] **Step 5: Registrar o estado de continuidade** com último commit, branch, alterações não relacionadas, próximos movimentos e regras de segurança.
- [x] **Step 6: Revisar o conteúdo** procurando `senha`, `token`, `secret`, chaves, valores sensíveis e placeholders indevidos.

### Task 3: Normalizar notas sem apagar histórico

**Files:**
- Modify: notas sem frontmatter ou com propriedades inconsistentes dentro de `cofre-kali/`
- Modify: `cofre-kali/03 - Produto e Experiência/Mentoria Frequência da Abundância - Arquitetura aprovada.md`
- Modify: `cofre-kali/03 - Produto e Experiência/Mentoria Frequência da Abundância - Registro de implementação V1.md`

**Interfaces:**
- Consumes: propriedades atuais e taxonomia definida no guia.
- Produces: frontmatter mínimo consistente (`title`, `date`, `tags`, `type`, `status`, `area`) e links internos resolvíveis.

- [x] **Step 1: Corrigir apenas metadados ausentes ou inválidos**, preservando o corpo e o histórico das notas.
- [x] **Step 2: Normalizar `area`** para `indice`, `contexto`, `marca`, `produto`, `operacao` ou `evidencias`.
- [x] **Step 3: Normalizar `type` e `status`** sem alterar o significado dos registros existentes.
- [x] **Step 4: Corrigir links relativos** que apontam para documentos externos ao vault, convertendo-os em links Markdown externos ou marcando-os como fonte de repositório.
- [x] **Step 5: Verificar** `obsidian vault=cofre-kali properties counts format=tsv` e `obsidian vault=cofre-kali unresolved verbose format=tsv`.

### Task 4: Aplicar diferenciação visual ao Explorador e ao Graph View

**Files:**
- Create: `cofre-kali/.obsidian/snippets/cofre-kali.css`
- Modify: `cofre-kali/.obsidian/graph.json`

**Interfaces:**
- Consumes: paleta oficial documentada em `Design system - Mapa da fonte V1.md`.
- Produces: cores consistentes para seis áreas no Explorador e grupos de nós por tags no Graph View.

- [x] **Step 1: Criar o snippet CSS** com seletores por `data-path`, contraste acessível e estados de hover/foco.
- [x] **Step 2: Configurar quatro cores da paleta oficial** no Graph View e usar cores derivadas apenas quando necessário para diferenciar áreas.
- [x] **Step 3: Configurar grupos por tags sem esconder órfãos ou anexos** e manter o gráfico legível.
- [x] **Step 4: Habilitar o snippet** com `obsidian vault=cofre-kali snippet:enable name=cofre-kali`.
- [x] **Step 5: Recarregar o vault** e validar a configuração com `obsidian vault=cofre-kali snippets:enabled` e leitura do `graph.json`.

### Task 5: Validar e versionar a entrega

**Files:**
- Verify: `cofre-kali/00 - Índice/MOC - Kalì Franca.md`
- Verify: `cofre-kali/00 - Índice/Linha do tempo do projeto.md`
- Verify: `cofre-kali/05 - Evidências e Histórico/Matriz de entregas e evidências.md`
- Verify: `cofre-kali/.obsidian/graph.json`

**Interfaces:**
- Consumes: todos os artefatos das tarefas anteriores.
- Produces: cofre navegável, colorido, auditável e com estado de entrega explicitamente separado.

- [x] **Step 1: Executar validação do Obsidian CLI** para arquivos, links, tags, propriedades e snippets.
- [x] **Step 2: Confirmar visualmente** o Graph View e o Explorador na instância aberta do Obsidian.
- [x] **Step 3: Conferir `git diff --check`** e garantir que arquivos temporários e credenciais não foram incluídos.
- [x] **Step 4: Fazer commit somente dos arquivos do plano** na branch `main`, preservando as alterações não relacionadas do worktree.
- [x] **Step 5: Fazer push para `origin/main`** e registrar o hash final no estado de continuidade e na linha do tempo.
