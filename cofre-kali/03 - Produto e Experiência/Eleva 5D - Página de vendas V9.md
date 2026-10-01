---
title: Eleva 5D - Página de vendas V9
date: 2026-10-01
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - v9
type: implementation-record
status: local-validated
area: produto-e-experiencia
---

# Eleva 5D — Página de vendas V9

## Entrega e origem

Página independente em `lp-5d/v9/`, construída a partir da auditoria completa de `conteudo-eleva-5d`. A análise principal está em [[Eleva 5D - Conteúdo final e estratégia comercial V9]]. A raiz e as versões V3–V8 não foram modificadas.

Esta versão passa a organizar a oferta de acordo com o documento oficial atualizado: Despertar/Reprogramar/Manifestar, três masterclasses, 30 áudios, 30 vídeos de Hiperfluxo e oito ferramentas bônus. Os 30 temas estão disponíveis na própria página.

## Composição e razões de cada bloco

| Bloco | Implementação | Problema resolvido e impacto esperado |
| --- | --- | --- |
| Hero | Fotografia aprovada em background desktop; headline legível, formato e CTA claros; copy antes da imagem no mobile | Identificar produto e condução com menos esforço na primeira leitura |
| Resumo da experiência | Quatro itens: 3 masterclasses, 30 dias, 8 ferramentas e aplicativo | Mostrar o tamanho e o formato da entrega antes do texto longo |
| Reconhecimento | Pergunta da masterclass e três situações de oscilação/controle/identidade | Conectar o tema espiritual ao momento concreto da leitora |
| Mecanismo | Três cards de Despertar/Reprogramar/Manifestar | Atualizar o método à fonte principal e tornar a sequência escaneável |
| Rotina | Áudio → vídeo → cotidiano ao lado de prévia HTML/CSS | Tornar tangível o novo componente Hiperfluxo e reduzir dúvida de uso |
| Comece aqui | Três masterclasses com resumo e temas integrais expandíveis | Clarificar preparação e preservar os tópicos sem sobrecarregar a leitura |
| Jornada | Quatro fases com 30 temas na ordem, expansíveis por teclado/toque | Mostrar direção e amplitude sem criar uma longa parede de texto |
| Ferramentas | Destaque de diário/âncoras e lista completa dos oito bônus | Construir valor sem preços fictícios atribuídos aos bônus |
| Relatos | Três prints originais autorizados, excerpts e ampliação | Melhorar legibilidade e confiança, explicando sua origem na mentoria |
| Quem conduz | Trajetória aprovada, fotografia vertical, citação e credenciais | Conectar experiência da especialista à jornada do produto |
| Oferta | Entregáveis à esquerda; card de R$497, anualidade, contato e garantia à direita | Concentrar as informações de decisão e oferecer um próximo passo real |
| FAQ | Onze perguntas sobre conteúdo, tempo, acesso, formato, mentoria e garantia | Reduzir dúvidas antes do contato |
| Fechamento | Convite, CTA e recap de preço/anualidade/garantia | Facilitar o retorno à oferta depois da leitura |

Impactos de conversão são hipóteses de projeto. A entrega não mediu taxa de conversão, receita ou eficácia do conteúdo.

## Comportamento implementado

- Menu por âncoras; scroll com compensação do header.
- Conteúdo integral disponível sem JavaScript.
- Details/summary nativos para masterclasses, quatro fases e FAQ.
- Prints com modal nativo, tecla Escape, fechamento visível, link para original e retorno do foco.
- CTA móvel com preço/anualidade, área segura inferior e recolhimento quando a oferta está visível.
- Eventos de CTA, abertura de conteúdo, relatos e visualização de seções em `dataLayer`, com `version: v9` e sem dados pessoais. Envio remoto depende de um tag de analytics configurado; esta entrega não instala uma conta nova.
- Respeito a `prefers-reduced-motion`, alvos de toque de 44 px ou mais, foco visível e link de pular para conteúdo.

## Assets e fidelidade

As fotografias foram exportadas a partir dos PNGs originais íntegros em `fotos/geradas-ia`, com `sharp`. As cópias antigas em `assets` não foram usadas nesta versão porque o decodificador identificou dados inválidos nelas. Não houve alteração da cena, nova geração ou retoque.

| Derivada | Dimensões | Tamanho |
| --- | --- | --- |
| `assets/kali-hero-1600.webp` | 1600 × 900 | 43.454 bytes |
| `assets/kali-hero-960.webp` | 960 × 540 | 19.944 bytes |
| `assets/kali-presenca.webp` | 692 × 1331 | 42.520 bytes |
| `assets/kali-social.jpg` | 1600 × 900 | 85.518 bytes |

Os prints `depoimentos/1.jpeg`, `3.jpeg` e `5.jpeg` permanecem integrais. Os metadados Open Graph/Twitter apontam para a foto da especialista na própria pasta da V9. O favicon usa o marker visual existente em `/favicon.svg`.

## Verificação local

- Testes de fidelidade da V9: 5/5 aprovados, incluindo os 30 temas na ordem, masterclasses/bônus, assets/âncoras e condições comerciais.
- Suíte estática completa: 82/82 aprovados, incluindo os cinco testes novos.
- Navegador Chromium: nove viewports — 320×740, 375×812, 390×844, 591×1280, 768×1024, 1024×768, 1440×900, 1920×1080 e 844×390.
- Em todas: sem overflow horizontal, imagens carregadas, elementos dentro da viewport e controles visíveis com altura mínima de 44 px.
- Cards lado a lado a partir de 768 px e empilhados abaixo desse breakpoint.
- Retrato da especialista com proporção real de 4:5 no mobile e 3:4 no desktop, sem herdar altura fixa do arquivo; imagem e texto alinhados ao início no desktop.
- Ampliação de print, Escape, retorno de foco, FAQ, comportamento do CTA móvel e eventos verificados.
- Testes adicionais com JavaScript desabilitado e movimento reduzido aprovados.
- Contraste das principais combinações tipográficas validado: Alabastro/Umbra 16,88:1; Cinza Cálido/Vinho 7,16:1; Ouro/Vinho 7,01:1; Alabastro/Ameixa 8,01:1; Umbra/Ouro 8,54:1.
- Capturas locais: `tmp/eleva-v9-audit/`; relatório reproduzível com `node scripts/check-eleva-v9.cjs`.

## Estado de publicação

- Implementação e documentação versionadas no commit `984a29e` (`feat: cria landing Eleva 5D V9 baseada no conteudo final`), com push para `origin/main` confirmado em 01/10/2026.
- O Markdown original mantém seus espaços de quebra de linha e o PDF foi preservado integralmente; os avisos de whitespace da fonte não foram tratados como defeitos da implementação.
- Prévia local: `http://127.0.0.1:4173/lp-5d/v9/`.
- Caminho público previsto: `https://kalifranca.com.br/lp-5d/v9/`.
- O botão da oferta abre o WhatsApp já existente para orientações. Não há checkout novo integrado nesta entrega.
- A página não foi promovida para a raiz e não houve upload FTP neste escopo. Commit/push e publicação pública são estados diferentes.

## Arquivos desta entrega

- `lp-5d/v9/index.html`, `styles.css`, `app.js` e quatro assets.
- `scripts/prepare-eleva-v9-assets.cjs` — exportação das fotografias.
- `scripts/check-eleva-v9.cjs` — verificação responsiva e interações no navegador.
- `tests/eleva-5d-v9-source.test.mjs` — contrato de fidelidade à fonte.
- Os dois arquivos originais de `conteudo-eleva-5d`, adicionados ao versionamento sem alteração.
- Notas de análise, entrega e continuidade no cofre.

## Relações

- [[Eleva 5D - Conteúdo final e estratégia comercial V9]]
- [[Eleva 5D - Página de vendas V8]]
- [[MOC - Kalì Franca]]
- [[Linha do tempo do projeto]]
- [[Estado atual e continuidade]]
