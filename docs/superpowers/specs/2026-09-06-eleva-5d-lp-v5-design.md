# Eleva 5D — V5: demonstração da experiência do aplicativo

**Data:** 2026-09-06  
**Status:** proposta aprovada para especificação  
**Rota:** `/lp-5d/v5/`  
**Base:** V4 da página de vendas

## Objetivo

Criar uma V5 da página de vendas do Eleva 5D que reduza a repetição no meio da jornada e aumente a tangibilidade do produto. O bloco 06 deixa de reapresentar os cinco espaços em texto e passa a mostrar como é a experiência dentro do aplicativo.

## Decisões preservadas

- A V4 permanece intacta.
- A promessa, o preço de R$497, as condições comerciais, a identidade visual e os CTAs aprovados são preservados.
- Os blocos 04 / O método, 05 / A rotina do alívio e 09 / A oferta permanecem na jornada.
- Os depoimentos continuam identificados como pendentes até o recebimento de depoimentos reais; nenhuma prova social será inventada.
- A entrega da V5 não inclui geração de imagens por API.

## Arquitetura editorial da V5

### Bloco 06 — demonstração da experiência

Manter o índice `06`, mas substituir a grade textual de “Cinco espaços” por uma composição de produto:

- título orientado à experiência: “Veja como é estar dentro do Eleva 5D.”;
- introdução curta explicando que a jornada acontece em uma experiência guiada de 30 dias;
- mockup principal de um aplicativo em HTML/CSS, claramente tratado como prévia da experiência;
- três estados demonstrativos: início do dia, prática em áudio e registro no Caderno da Criadora;
- indicadores complementares para Âncoras, Mapa da Realização e progresso dos 30 dias;
- CTA contextual para a oferta.

Os mockups serão componentes semânticos e substituíveis por screenshots reais no futuro. A página não afirmará que uma tela é real enquanto o aplicativo final ainda não estiver validado visualmente.

### Oferta e garantia

Substituir a formulação subjetiva da garantia por uma linguagem de experimentação:

> Entre, experimente durante 7 dias e decida se o Eleva 5D faz sentido para você.

O FAQ deve repetir a condição de forma objetiva, sem prometer uma mudança emocional específica.

### FAQ de decisão

Adicionar ou revisar perguntas sobre:

- como o acesso é liberado após a compra;
- quando a jornada começa;
- como funcionam os 20 minutos por dia;
- acesso pelo celular e aplicativo personalizado;
- suporte durante a jornada;
- garantia de 7 dias;
- valor e acesso anual.

## Direção visual

- Preservar a paleta V5 herdada da marca: Umbra `#0E0B0A`, Vinho Profundo `#3A1424`, Ameixa Sagrada `#7A2B44` e Ouro Fosco `#C9A66B`.
- Usar contraste de superfícies para diferenciar “produto em uso” do fundo editorial.
- No desktop, usar uma composição assimétrica com mockup maior à esquerda e estados de uso à direita.
- No tablet, reduzir o mockup e manter os estados em duas colunas quando houver espaço.
- No mobile, transformar os estados em sequência vertical ou carrossel horizontal acessível, sem texto comprimido ou truncado.
- Manter o CTA móvel fixo com espaço inferior suficiente para não esconder conteúdo.
- Respeitar foco visível, `prefers-reduced-motion`, leitura por teclado e alvos de toque de pelo menos 44px.

## Critérios de aceite

- A rota `/lp-5d/v5/` existe e mantém a V4 sem alterações.
- O bloco 06 não repete a lista textual de Reprogramar, Alinhar, Manifestar, Sustentar e Elevar como conteúdo principal.
- O bloco 06 apresenta visualmente a experiência do aplicativo e informa que se trata de uma prévia quando aplicável.
- O conteúdo do bloco 09 continua presente, incluindo R$497, acesso anual e CTA.
- A garantia usa a formulação de experimentação de 7 dias.
- O FAQ contém acesso, início, funcionamento, suporte e garantia.
- A página funciona em 375px, 768px, 1024px e desktop amplo.
- Não há depoimentos ou resultados inventados.
- Não há dependência de geração de imagem por API.
- Testes estáticos e smoke test local passam.

## Fora de escopo

- Implementação do aplicativo autenticado.
- Integração com checkout ou liberação de acesso.
- Captura de screenshots reais do produto ainda não validado.
- Criação ou edição de depoimentos.
- Publicação no domínio e push para a branch `main` nesta etapa de especificação.
