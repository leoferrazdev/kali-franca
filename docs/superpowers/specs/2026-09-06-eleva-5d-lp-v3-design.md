---
title: Eleva 5D - Landing page V3
date: 2026-09-06
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - design
type: Design specification
status: aprovado-para-revisao
area: produto
---

# Eleva 5D — Landing page V3

## Decisão

Criar uma terceira versão independente da página de vendas em `https://kalifranca.com.br/lp-5d/v3/`. A versão não substitui a página canônica da raiz nem a referência técnica existente em `/eleva-5d-b/`.

A V3 usará um canvas editorial contínuo, sem seções claras em superfícies claras, cards destacados ou blocos com aparência de módulos independentes. A diferenciação entre momentos será feita por composição, ritmo, tipografia, linhas editoriais, espaços de respiro e mudanças sutis de tonalidade.

## Objetivo da versão

Testar uma experiência de venda mais imersiva e autoral para o Eleva 5D, aproximando a página de um manifesto visual. A pessoa deve perceber uma única jornada narrativa, e não uma sequência de caixas comerciais.

## Arquitetura da experiência

1. **Abertura:** assinatura Kalì Franca, identificação Eleva 5D, promessa principal, foto de autoridade e CTA.
2. **Reconhecimento:** frases de identificação apresentadas como texto editorial contínuo, sem cards.
3. **Transição de consciência:** narrativa 3D, 4D e 5D usando escala, alinhamento e mudança cromática gradual.
4. **Método:** Reprogramar, Alinhar e Manifestar em uma sequência vertical única, com marcadores numerados.
5. **Rotina e produto:** descrição dos 20 minutos diários e dos cinco espaços do aplicativo integrada ao fluxo.
6. **Eu Soul e Corte Energético:** dois momentos de profundidade com composição assimétrica e imagens/elementos gráficos discretos.
7. **Presença:** apresentação humanizada da especialista, com foto aprovada e autoria em primeira pessoa.
8. **Oferta:** preço anual de R$497, conteúdo incluído, garantia e CTA, mantendo o mesmo canvas visual.
9. **FAQ e encerramento:** perguntas frequentes e CTA final sem mudança para uma superfície clara.

## Direção visual

- **Superfície:** umbra e vinho profundo como campo contínuo principal.
- **Contraste:** papel alabastro somente para texto e detalhes tipográficos, nunca como bloco de seção dominante.
- **Acentos:** ouro fosco, cobre e ameixa para índices, linhas, estados de foco e CTAs.
- **Separação:** linhas de 1px, bordas parciais, números de movimento e espaçamento vertical; sem cards flutuantes ou sombras pesadas.
- **Tipografia:** Cormorant Garamond para títulos e frases-manifesto; Jost para leitura; IBM Plex Mono para índices, metadados e microcopy.
- **Imagem:** usar `assets/kali-og-social-authority.png` para prévia social e as fotos aprovadas existentes para hero e presença.
- **Movimento:** revelações suaves por entrada no viewport, sempre desativadas ou reduzidas com `prefers-reduced-motion`.

## Responsividade e acessibilidade

- Uma coluna em telas estreitas, preservando a ordem narrativa.
- Testar em 375px, 768px, 1024px e 1440px, incluindo orientação paisagem.
- Nenhum overflow horizontal funcional.
- Um único `h1`, landmarks semânticos e link para pular ao conteúdo.
- Links e botões com área mínima de 44px.
- Contraste mínimo de 4,5:1 para texto de leitura e divisores perceptíveis no canvas escuro.
- FAQ com `details/summary`, foco visível e estados expandidos compreensíveis.
- Nenhum texto essencial truncado por ellipsis.

## Conversão e tracking

- CTA primário no hero, oferta e encerramento, todos apontando para o estado de acesso definido enquanto o checkout não estiver conectado.
- Manter os identificadores `data-cta="hero"`, `data-cta="offer"` e `data-cta="final"`.
- Preservar os eventos `eleva5d_cta_click` e `eleva5d_scroll_depth`.
- Não simular checkout, compra, pagamento ou liberação de acesso.

## Escopo técnico

- Criar `lp-5d/v3/index.html`, `lp-5d/v3/styles.css` e `lp-5d/v3/app.js`.
- Reutilizar os tokens em `brandbook/tokens.css` e os assets aprovados sem alterar a página da raiz.
- Criar contratos estáticos específicos da V3 para rota, conteúdo, paths, acessibilidade, contraste, responsividade e tracking.
- A rota deve ser servida pelo mesmo host estático do domínio principal.

## Critérios de aceite

- `/lp-5d/v3/` responde como rota independente.
- A composição não apresenta seções claras ou cards claros dominantes.
- A narrativa contém os cinco movimentos e a oferta anual de R$497.
- O texto da FAQ permanece legível no fundo escuro.
- As fotos aprovadas carregam e não há referências a `profile.jpg` ou ao rótulo interno `variação B`.
- A versão canônica na raiz e `/eleva-5d-b/` permanecem funcionais.
- Suítes estáticas, verificação de sintaxe e revisão visual local passam antes do commit.
- O commit final é publicado na `main`, seguido de verificação HTTP pública da nova rota.

## Fora do escopo

- Alterar a página canônica da raiz.
- Integrar checkout, webhook, entitlement ou liberação na área de membros.
- Criar conteúdo real do aplicativo ou telas nativas para lojas.
- Alterar o design system global.
