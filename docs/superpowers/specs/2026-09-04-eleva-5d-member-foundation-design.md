---
title: Eleva 5D - Fundação do produto na área de membros
status: aprovado para especificação
date: 2026-09-04
approved_at: 2026-09-04
---

# Eleva 5D — Fundação do produto na área de membros

## Objetivo

Preparar a área de membros para receber o Eleva 5D como um produto real, com rota, shell de experiência, onboarding, estrutura dos cinco movimentos, contratos de conteúdo e persistência inicial de progresso. Esta fase antecede a integração comercial com checkout, webhook e entitlement real.

O resultado deve permitir que o produto seja apresentado, testado e evoluído como se já existisse para compra, sem simular pagamento, sem criar acesso artificial e sem expor uma sessão de demonstração como acesso adquirido.

## Decisão arquitetural

O Eleva 5D será uma experiência protegida dentro do app Next.js existente em `membros.kalifranca.com.br`. O Supabase Auth continuará sendo a autoridade de identidade e sessão. A interface usará Server Components para obter o usuário e uma camada de domínio separada para resolver o estado do produto.

A primeira versão terá uma fundação de produto independente do provedor comercial. A futura Kiwify entregará eventos para a camada de acesso; nenhuma tela do Eleva dependerá diretamente da Kiwify, Hotmart ou de parâmetros vindos do checkout.

O produto será acessado pela rota canônica:

`/membros/eleva/`

As rotas filhas serão organizadas por movimento e poderão começar como páginas de conteúdo estruturado, sem obrigar a construção de um aplicativo separado ou de uma versão React Native nesta fase.

## Escopo desta fase

### Ambiente

- rota protegida `/membros/eleva/`;
- navegação integrada ao shell atual da área de membros;
- configuração de ambiente documentada sem credenciais privadas versionadas;
- contrato de acesso preparado para receber entitlement posteriormente;
- comportamento honesto quando o Supabase não estiver configurado;
- estados de carregamento, erro, bloqueio e conteúdo vazio.

### Produto

- dashboard inicial do Eleva 5D;
- onboarding “O Corte Energético”;
- calendário de frequência visual;
- indicador de progresso;
- cinco movimentos na ordem oficial:
  1. Reprogramar;
  2. Alinhar;
  3. Manifestar;
  4. Sustentar;
  5. Elevar;
- cartões de entrada para cada movimento;
- contratos de interface para áudio, vídeo, diário, checklist, mapa de realização e playlist;
- rotina diária baseada nos três movimentos: Reprogramar, Alinhar e Manifestar;
- navegação responsiva para desktop e mobile;
- componentes compatíveis com teclado, leitor de tela, foco visível e movimento reduzido.

### Persistência de base

Será preparada a estrutura mínima para o produto, sem dados pessoais reais:

- `eleva_products`: catálogo do produto e estado editorial;
- `eleva_movements`: movimentos, ordem e descrição;
- `eleva_content_items`: conteúdos que poderão ser publicados em cada movimento;
- `eleva_member_setups`: registro privado do onboarding inicial da pessoa;
- `eleva_daily_activities`: conclusão diária de movimentos e atividades;
- `eleva_progress_events`: trilha de eventos de progresso sem apagar histórico.

O vínculo de compra permanecerá no modelo de `entitlements` definido em [[Eleva 5D - Arquitetura de liberação e acesso V1|Eleva 5D - Arquitetura de liberação e acesso V1]], mas não será populado por esta fase.

## Fora do escopo

- checkout Kiwify ou Hotmart;
- endpoint de webhook;
- validação de assinatura comercial;
- criação ou alteração de usuários reais no Supabase;
- conteúdo final de áudio, vídeo, música ou IA;
- assistente “IA Eu Soul” conectado a um modelo;
- notificações push, aplicativo nativo ou publicação em lojas;
- CRM, gestão de vendas ou permissões administrativas;
- acesso baseado somente em e-mail informado no navegador;
- dados ou respostas fictícias de clientes.

## Jornada da pessoa usuária

### Estado sem acesso comercial

1. A pessoa acessa `/membros/eleva/` sem sessão.
2. O guard server-side redireciona para `/login/`.
3. Após login ou cadastro, a pessoa retorna à área de membros.
4. Sem entitlement ativo, a experiência mostra o estado “Acesso aguardando confirmação da compra”, sem exibir a jornada como adquirida.

### Estado de produto preparado

1. Uma pessoa autenticada entra na área de membros.
2. A navegação apresenta o Eleva 5D como produto em preparação para liberação comercial.
3. A página do produto exibe a proposta, os cinco movimentos e a rotina diária.
4. Os módulos sem conteúdo final aparecem como estados editoriais claros, sem botões quebrados ou promessas de disponibilidade.

### Estado futuro com acesso ativo

1. A Kiwify confirma a compra por webhook.
2. O backend registra o entitlement ativo para o e-mail verificado correspondente.
3. A pessoa entra ou cria a conta usando o mesmo e-mail da compra.
4. O guard passa a permitir o onboarding e o conteúdo.
5. O progresso é gravado por usuário, produto, movimento e data.

## Modelo de experiência

### Dashboard

O dashboard será o ponto de retorno diário e terá:

- saudação sem depender de nome completo;
- estado explícito do acesso;
- calendário horizontal com o dia atual e dias concluídos;
- progresso geral do ciclo;
- chamada para retomar o onboarding quando incompleto;
- destaque visual para Manifestar, que é o norte da jornada;
- cartões dos cinco movimentos com ordem, foco e estado.

### Onboarding — O Corte Energético

O onboarding terá duas entradas persistíveis:

- foto atual opcional, armazenada futuramente em bucket privado;
- texto “O que eu não aceito mais na minha vida”.

O registro será consultável pelo perfil e pelo progresso, mas não será o primeiro elemento visual do dashboard depois de concluído. A primeira visita deve priorizar o estado desejado e o próximo movimento.

### Movimentos

| Ordem | Movimento | Fundação preparada |
| --- | --- | --- |
| 01 | Reprogramar | player, Caderno da Criadora e registro diário |
| 02 | Alinhar | Bússola da Verdade Divina e Âncoras Divinas |
| 03 | Manifestar | quatro áreas do Mapa da Realização e ação de aproximação |
| 04 | Sustentar | galeria para áudios e vídeos de musculatura emocional |
| 05 | Elevar | sabedoria profunda e playlist inspiradora |

O conteúdo textual deve preservar a estrutura fornecida em `aplicativo-eleva-5d/Estrutura Aplicativo - Eleva 5d.md`. Não serão adicionadas alegações médicas, terapêuticas ou resultados garantidos.

## Contratos de domínio

O domínio deve possuir tipos equivalentes a:

```ts
type ElevaProduct = {
  slug: 'eleva-5d';
  name: string;
  status: 'preparing' | 'published' | 'archived';
};

type ElevaMovement = {
  slug: 'reprogramar' | 'alinhar' | 'manifestar' | 'sustentar' | 'elevar';
  position: 1 | 2 | 3 | 4 | 5;
  title: string;
  focus: string;
};

type ElevaAccessState =
  | { kind: 'preview'; reason: 'supabase_not_configured' }
  | { kind: 'unauthenticated' }
  | { kind: 'pending_purchase' }
  | { kind: 'active' }
  | { kind: 'suspended' };

type ElevaDailyActivity = {
  movementSlug: ElevaMovement['slug'];
  activityDate: string;
  completedAt: string | null;
};
```

O resolver de acesso não deve aceitar e-mail digitado em formulário como prova de compra. Ele deverá receber o usuário autenticado e consultar a fonte de acesso preparada para entitlement.

## Segurança e privacidade

- toda rota do produto exige sessão server-side;
- dados de onboarding e progresso são privados por `auth.uid()`;
- RLS será aplicada às tabelas do Eleva;
- arquivos de foto serão privados e não terão URL pública por padrão;
- a service role key não será usada no navegador nem registrada no repositório;
- o estado de prévia local nunca será habilitado por valor público de produção;
- nenhuma credencial ou dado real será incluído em seed, teste ou documentação.

## Acessibilidade e responsividade

- hierarquia semântica com um único `h1` por tela;
- foco inicial preservado no navegador, sem mover foco automaticamente para o título;
- todos os controles com alvo mínimo de 44px;
- navegação de movimentos acessível por teclado;
- `aria-current` no movimento ativo;
- estados de erro e salvamento anunciados com região apropriada;
- contraste mantido pelos tokens do design system;
- layout desktop com navegação lateral e layout mobile com navegação compacta;
- `prefers-reduced-motion` respeitado em halos, transições e progresso.

## Testes de aceitação

- rota `/membros/eleva/` existe e usa o shell da área de membros;
- sessão ausente redireciona para `/login/`;
- usuário autenticado sem entitlement vê estado pendente, sem acesso adquirido simulado;
- produto apresenta os cinco movimentos na ordem correta;
- onboarding valida texto, mantém foto opcional e representa os estados de vazio, preenchido e concluído;
- progresso diário diferencia usuário, produto, movimento e data;
- RLS não permite leitura de progresso de outro usuário;
- componentes mantêm alvos de toque e foco acessível;
- página continua renderizável sem configuração do Supabase, com estado honesto de prévia;
- testes do workspace, lint e build passam sem warnings introduzidos pela fundação.

## Ordem de implementação

1. adicionar testes de contrato para catálogo, rota, estados de acesso e persistência;
2. criar migration das tabelas do produto, progresso e RLS;
3. criar catálogo tipado dos cinco movimentos;
4. criar resolver de estado de acesso desacoplado de checkout;
5. criar shell e dashboard `/membros/eleva/`;
6. criar onboarding e estados de persistência;
7. criar cartões e páginas-base dos cinco movimentos;
8. integrar navegação ao shell existente;
9. executar testes, lint, build e smoke test autenticado simulado apenas no ambiente local;
10. registrar a entrega no cofre e, em fase posterior, conectar o entitlement e o webhook.

## Critério de pronto

A fundação estará pronta quando o Eleva 5D existir como uma área de produto navegável, protegida e documentada dentro da área de membros, com catálogo dos cinco movimentos, onboarding, estados honestos de acesso, contratos de persistência e testes automatizados. A compra ainda não será processada nesta fase, mas a arquitetura não deverá exigir refazer a experiência para receber a integração comercial.

## Referências

- [[MOC - Kalì Franca]]
- [[Área de membros - Registro de implementação V1]]
- [[Eleva 5D - Arquitetura de liberação e acesso V1]]
- [[../../aplicativo-eleva-5d/Estrutura Aplicativo - Eleva 5d|Estrutura Aplicativo - Eleva 5D]]
- `apps/kali-franca-membros/app/membros/page.tsx`
- `apps/kali-franca-membros/app/components/MemberShell.tsx`
