# Área de membros — Experiência de marca e arquitetura V1

## Objetivo

Substituir a tela provisória da área de membros por uma fundação visual e de experiência coerente com a marca Kali França, preparada para receber autenticação e conteúdo real sem inventar dados, fluxos ou permissões.

Esta especificação descreve a primeira camada do produto. A implementação funcional de login, cadastro, recuperação de acesso, sessão, conteúdo e progresso depende de um contrato técnico posterior para provedor, variáveis de ambiente, modelo de usuário e fonte de conteúdo.

## Evidências que orientam a decisão

- `https://membros.kalifranca.com.br/` responde atualmente com HTTP 200, mas exibe apenas a tela provisória “Área de membros”.
- `apps/kali-franca-membros/app/page.tsx` contém somente o shell provisório; não há autenticação, sessão, conteúdo, módulos ou progresso implementados.
- `apps/kali-franca-membros/app/globals.css` usa estilos genéricos e não está conectado ao sistema visual da Kali França.
- O CRM possui autenticação e regras voltadas a usuários administrativos/comerciais. Sua estrutura não deve ser copiada para a área de membros sem uma decisão explícita de domínio e autorização.
- A fonte visual do projeto é `design-system/Kali Franca - Design System.dc.html`; a implementação de tokens existente está em `brandbook/tokens.css`.
- O cofre `cofre-kali` registra como princípios de experiência: contraste mínimo, foco visível, navegação por teclado, áreas de toque de pelo menos 44px, responsividade e respeito a `prefers-reduced-motion`.

## Decisão de arquitetura

A V1 será construída em duas camadas separadas:

### Camada 1 — Fundação visual e de experiência

Entregar:

- rota de autenticação com estrutura de login e cadastro preparada para integração;
- home autenticada com shell de membro, navegação e estados vazios honestos;
- componentes reutilizáveis para campos, ações, feedback, cabeçalho, navegação e cartões;
- tokens compartilhados com a marca;
- estados visuais de foco, erro, carregamento, sucesso e indisponibilidade de configuração;
- responsividade e acessibilidade testáveis.

### Camada 2 — Integração funcional posterior

Definir em uma etapa própria:

- provedor de autenticação;
- variáveis de ambiente e estratégia de segredos;
- modelo de usuário e papéis;
- recuperação e confirmação de conta;
- proteção de rotas e persistência de sessão;
- fonte real de cursos, módulos, aulas, progresso e permissões;
- telemetria necessária para acompanhar uso e conclusão.

Essa separação permite evoluir a experiência sem acoplar a interface a uma decisão de backend ainda não confirmada.

## Direção visual

A área de membros deve parecer uma extensão natural do universo Kali França: contemplativa, sofisticada e orientada a transformação, com clareza suficiente para uso recorrente.

### Paleta

- Base: Umbra `#0E0B0A` e Vinho Profundo `#3A1424`.
- Profundidade e superfícies: Ameixa Sagrada `#7A2B44` em camadas de baixa opacidade.
- Acentos: Ouro Fosco `#C9A66B` e Cobre Aurora `#C97A52`.
- Texto claro e áreas de leitura: Alabastro `#F4EDE4` e Areia Nude `#E2D4C3`.
- Texto secundário e estados neutros: Névoa Mineral `#9AA39F` e Cinza Cálido `#B7ABA0`.
- Verde Sálvia `#5F7A6A` somente para estados positivos quando houver significado semântico.

### Tipografia

- Display e títulos: Cormorant Garamond.
- Texto de interface: Jost.
- Metadados, labels técnicos e pequenos indicadores: IBM Plex Mono.

### Composição

- Fundo escuro com gradientes radiais discretos em vinho, ameixa e cobre.
- Halos, arcos ou linhas de frequência como elementos atmosféricos de apoio, nunca como ruído atrás de texto ou controles.
- Superfícies com bordas finas, transparência moderada e hierarquia por contraste, não por excesso de sombras.
- Ações principais em ouro/cobre com texto Umbra; ações secundárias em superfície escura com borda visível.
- A experiência deve evitar a aparência de dashboard SaaS genérico: menos widgets, mais percurso, contexto e próxima ação.
- Em telas pequenas, o conteúdo deve priorizar uma coluna, leitura confortável e ações em largura útil.

## Estrutura da autenticação

### Desktop

1. Cabeçalho leve com marca Kali França e retorno ao domínio principal.
2. Painel visual com halo/arco e mensagem curta de acolhimento.
3. Painel de formulário com título, explicação objetiva, campos, ação principal e links auxiliares.
4. Rodapé mínimo com referência de privacidade/termos somente quando os destinos oficiais existirem.

### Mobile

1. Marca no topo.
2. Mensagem de acolhimento compacta.
3. Formulário em largura total com espaçamento vertical generoso.
4. Ação principal sempre visível sem depender de rolagem horizontal.
5. Links de recuperação e criação de conta em ordem de leitura natural.

### Estados do formulário

| Estado | Comportamento esperado |
| --- | --- |
| Inicial | Campos vazios, instruções curtas e CTA disponível conforme regras do formulário. |
| Foco | Campo com indicador de foco visível e rótulo preservado. |
| Validação | Mensagem específica junto ao campo, sem depender apenas de cor. |
| Enviando | CTA bloqueado temporariamente, indicador compreensível e prevenção de duplo envio. |
| Erro de autenticação | Feedback claro, sem expor detalhes sensíveis ou confirmar a existência de uma conta. |
| Sucesso | Redirecionamento ou mensagem de continuidade definidos quando a integração existir. |
| Configuração ausente | Estado operacional explícito para ambiente sem provedor configurado; não simular login bem-sucedido. |

## Estrutura da home autenticada V1

### Shell

- `MemberHeader`: marca, identificação do membro quando disponível e ação de sair quando houver sessão real.
- `MemberNavigation`: navegação primária preparada para início, conteúdos e perfil; itens sem destino real não devem fingir que estão disponíveis.
- Área principal com título contextual e próxima ação.
- Layout que funcione com navegação lateral em desktop e navegação compacta no mobile.

### Conteúdo

- Cartão de continuidade somente quando houver conteúdo e progresso reais.
- Cartões de conteúdo com título, tipo, duração ou progresso somente quando esses dados existirem.
- `EmptyState` acolhedor e orientado à próxima etapa quando ainda não houver conteúdo publicado.
- Nenhum curso, aula, depoimento, percentual ou benefício deve ser inventado para preencher a interface.

## Componentes da primeira camada

### Autenticação

- `BrandMark`
- `AuthShell`
- `AuthPanel`
- `TextField`
- `PasswordField`
- `PrimaryButton`
- `InlineFeedback`
- `LoadingState`

### Área autenticada

- `MemberShell`
- `MemberHeader`
- `MemberNavigation`
- `ContentCard`
- `ProgressIndicator`
- `EmptyState`

Os componentes devem receber conteúdo e estado por propriedades, mantendo a regra de não inventar dados fora da camada de domínio. Não será criada uma biblioteca abstrata maior do que a necessidade da V1.

## Tokens e integração técnica

- Usar os tokens de `brandbook/tokens.css` como fonte existente para primitivos, semântica e componentes.
- Se a aplicação precisar de uma camada compartilhada, importar os tokens por caminho estável e documentar essa dependência; não duplicar os hexadecimais em `globals.css` ou componentes.
- Preservar as famílias tipográficas do design system e fornecer fallbacks locais coerentes.
- Nomear novas variáveis por intenção (`background`, `surface`, `text`, `accent`, `border`, `focus`) e não apenas pela cor visual.
- Manter a solução compatível com o build atual do app; adicionar dependências somente quando houver ganho claro para a experiência ou a acessibilidade.
- Não colocar credenciais, chaves privadas ou valores de produção no repositório.

## Acessibilidade e responsividade

- Validar larguras de 320, 360, 375, 390, 414, 768, 1024 e 1440px.
- Não permitir rolagem horizontal nem corte de conteúdo em telas pequenas.
- Garantir alvos de interação de pelo menos 44px.
- Todo campo precisa de label associada; usar `autocomplete` apropriado.
- Usar `aria-invalid` e `aria-describedby` quando houver erro ou instrução associada.
- Garantir foco visível em teclado e ordem de tabulação lógica.
- Manter contraste mínimo de 4.5:1 para texto normal e validar estados de foco/erro.
- Não comunicar estado somente por cor, movimento ou ícone sem texto acessível.
- Reduzir ou remover animações não essenciais quando `prefers-reduced-motion: reduce` estiver ativo.
- Respeitar zoom do navegador e tamanhos de fonte maiores.

## Testes e critérios de aceitação

Antes de considerar a camada visual pronta, verificar:

- rotas e estados principais renderizam sem erro;
- tokens da marca são carregados pela área de membros;
- não há repetição desnecessária de cores hexadecimais nos estilos da aplicação;
- layout passa pelos breakpoints definidos sem overflow;
- campos têm labels, foco e feedback acessível;
- estados de carregamento, erro, vazio e configuração ausente são honestos;
- `prefers-reduced-motion` é respeitado;
- testes do app passam;
- lint passa;
- build de produção passa.

A integração funcional só poderá ser aceita quando houver uma decisão documentada sobre provedor, ambiente, usuário, permissões e fonte de conteúdo.

## Fora de escopo nesta V1

- Copiar a autenticação ou o modelo de permissões do CRM.
- Criar banco de dados, tabelas, usuários ou migrações sem contrato funcional.
- Inventar cursos, módulos, aulas, progresso, benefícios ou métricas.
- Publicar credenciais, segredos ou configurações privadas.
- Alterar o domínio principal, brandbook ou bio fora do necessário para uma dependência explicitamente compartilhada.
- Fazer marketing, anúncios ou automações antes de haver conteúdo e jornada aprovados.

## Próximo gate

Após a revisão desta especificação, o próximo artefato será um plano executável com ordem de testes e implementação. O primeiro ciclo de código deverá cobrir a camada visual, registrar a decisão no `cofre-kali` e validar localmente. A integração funcional permanecerá como uma etapa separada, condicionada ao contrato técnico documentado.
