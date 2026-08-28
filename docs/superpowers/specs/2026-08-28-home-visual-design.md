---
title: Home visual Kalì Franca - Especificação V1
date: 2026-08-28
tags:
  - kali-franca
  - home
  - design-system
  - especificacao
  - tdd
type: specification
status: aprovada
---

# Home visual Kalì Franca — Especificação V1

## Contexto

A raiz de `https://kalifranca.com.br/` ainda usa uma página placeholder com CSS próprio, cores roxas e tipografia de sistema. O design system localizado em `D:\LEONARDO\Kali Franca\design-system` define a identidade visual da Kalì Franca e deve orientar a primeira landing page pública demonstrativa.

## Decisões aprovadas

- A raiz `/` será uma landing page editorial demonstrativa.
- A oferta real e definitiva pertence a um roadmap futuro.
- A página será pública e identificará explicitamente seu caráter de demonstração e construção.
- Métricas, depoimentos, preços, disponibilidade, resultados garantidos e promessas não validadas ficam fora da publicação.
- A home continuará estática e independente, sem migração do site principal para Next nesta etapa.
- O brandbook público em `/brandbook/` será o destino do CTA principal.
- A área de membros e o CRM não serão alterados por esta entrega.

## Objetivo

Aplicar na página inicial a identidade visual, a paleta, a tipografia, o vocabulário gráfico, as superfícies e os princípios de composição definidos no design system, convertendo o placeholder em uma experiência pública coerente e consultável.

## Arquitetura de conteúdo

### 1. Capa — expansão

Exibe o conceito `Expansão da Potência`, a marca Kalì Franca, o rótulo `Demonstração pública · oferta em construção`, uma frase de apresentação sem promessa factual e o CTA `Conhecer o sistema` para `/brandbook/`.

### 2. A passagem

Apresenta a narrativa visual de contenção para expansão por meio de texto editorial e composição de luz, sem descrever um resultado comercial garantido.

### 3. Pilares da experiência

Organiza três princípios de leitura da marca: clareza, presença e expansão. Os pilares são linguagem de posicionamento visual, não catálogo de serviços ou prova de atuação.

### 4. Sistema em prática

Demonstra a aplicação conjunta de cores, tipografia, componentes, superfícies, bordas, botões e ritmo editorial em uma composição semelhante a uma landing page.

### 5. Próximo movimento

Convida à consulta do brandbook e informa que a oferta real será definida em evolução posterior. Não haverá checkout, captura de lead, login ou integração comercial.

## Sistema visual

### Cor

- Umbra `#0E0B0A`: fundo dominante e contenção.
- Vinho Profundo `#3A1424`: profundidade e superfícies de transição.
- Ameixa Sagrada `#7A2B44`: energia, transição e estados ativos.
- Ouro Fosco `#C9A66B`: CTA, foco, linhas e palavras-chave.
- Alabastro `#F4EDE4`: superfícies claras e respiro de leitura.
- Cobre Aurora `#C97A52`: ignição dentro de gradientes e campos de luz.
- Areia Nude `#E2D4C3`: cards e molduras suaves.
- Névoa Mineral `#9AA39F`: equilíbrio e estado de apoio.
- Cinza Cálido `#B7ABA0`: texto secundário em fundo escuro.
- Verde Sálvia `#5F7A6A`: estados funcionais de confirmação, quando necessários.

O uso de cor deve preservar temperatura quente, limitar o ouro e evitar roxo, neon, glitter, cromado e blocos de cobre ou ameixa usados como preenchimento indiscriminado.

### Tipografia

- Cormorant Garamond 300/400: títulos, frases de impacto e palavras-chave em itálico.
- Jost 300/400/500: corpo, navegação e interface.
- IBM Plex Mono 400/500: rótulos, índices e metadados.

### Forma e composição

- Espaço negativo como elemento ativo.
- Alternância entre superfícies escuras e claras.
- Linhas finas, círculos, halos e órbitas como vocabulário gráfico.
- Gradientes de Cobre + Ouro + Ameixa apenas dentro de campos de luz.
- Um CTA primário por seção.
- Títulos grandes com quebra controlada e contraste editorial.

## Limites de conteúdo

O design system de referência contém textos demonstrativos, métricas e afirmações que não foram validados para a home. A implementação poderá preservar a linguagem visual desses trechos, mas não publicará automaticamente `+2.500 vidas transformadas`, `10 países`, depoimentos, resultados ou promessas espirituais como fatos da marca.

## Implementação técnica

- `index.html` receberá a estrutura semântica da landing e manterá os metadados de compartilhamento existentes.
- `styles.css` será criado na raiz para separar layout da marca do markup.
- `brandbook/tokens.css` será importado como fonte compartilhada dos tokens primitivos, semânticos e de componentes.
- O CSS da home não duplicará valores de cor em componentes quando um token equivalente existir.
- O layout será mobile-first e usará uma largura máxima de leitura, com `overflow-x` controlado.
- O movimento será decorativo e dispensável; `prefers-reduced-motion: reduce` eliminará transições e animações não essenciais.
- Links, botões e áreas interativas terão foco visível e área mínima de toque de 44px.

## Contrato de validação

`tests/home-static.test.mjs` deverá verificar:

- estrutura semântica da home e presença das cinco seções;
- importação dos tokens e fontes do sistema;
- presença das cores oficiais e do conceito central;
- identificação explícita de demonstração/oferta em construção;
- ausência de métricas e claims excluídos;
- CTA funcional para `/brandbook/`;
- preservação de `og:image` e Twitter Card.

Além do contrato estático, executar:

- `npm test`;
- `npm run lint`;
- `npm run build`;
- smoke test HTTP da raiz e dos assets CSS;
- inspeção visual desktop e mobile;
- `git diff --check`.

## Critério de aceite

A entrega estará apta quando a raiz deixar de exibir o placeholder roxo, apresentar a identidade aprovada em desktop e mobile, não publicar alegações não validadas, mantiver navegação e foco acessíveis, passar todos os comandos de validação e tiver as decisões registradas no cofre `cofre-kali`.
