# Eleva 5D V7 — Hero com Background Editorial

## Objetivo

Criar uma nova versão da página de vendas do Eleva 5D em `lp-5d/v7/`, usando a foto aprovada `fotos/geradas-ia/kali-hero-autoridade-horizontal-02.png` como background da primeira dobra, com maior presença humana e sem alterar a V6.

## Decisão visual

A V7 será derivada da V6 em uma rota própria. A hero usará a fotografia em composição full-bleed, com `background-size: cover` e posicionamento editorial controlado. Uma camada de gradiente em Umbra `#0E0B0A` protegerá a copy no lado esquerdo e manterá a imagem legível no lado direito. O conteúdo textual, CTA, manifesto e demais seções permanecerão iguais à V6.

No mobile, o background será reposicionado para manter o rosto da especialista visível, com scrim mais denso e altura adaptada ao conteúdo. A leitura seguirá a ordem: identificação do produto, promessa, explicação curta, CTA, link secundário e resumo da oferta.

## Escopo

- Criar `lp-5d/v7/index.html`, `styles.css` e `app.js` como cópia isolada da V6.
- Alterar somente a composição da primeira dobra e os metadados/identificadores da nova rota.
- Usar a imagem local já aprovada; não gerar imagens por API.
- Preservar as seções 01–11, a oferta de R$497, o FAQ, os CTAs e os depoimentos autorizados da V6.
- Atualizar o cache-busting da folha de estilos da V7.
- Adicionar testes para a existência da rota, uso do background, contraste por overlay, responsividade e preservação da V6.
- Registrar a decisão e a validação no cofre do projeto.

## Critérios de aceite

1. A V6 permanece sem alterações.
2. A V7 existe em `/lp-5d/v7/` e referencia a URL canônica correspondente.
3. A foto aprovada aparece como background da hero, sem depender de um `<img>` separado para essa composição.
4. O overlay mantém a copy e o CTA legíveis no desktop, tablet e mobile.
5. A imagem não ultrapassa o viewport e o rosto permanece em uma área visual útil em telas estreitas.
6. Os testes estáticos e do workspace de membros continuam aprovados.

## Verificação

- `node --test tests/eleva-5d-v7-static.test.mjs`
- `npm test`
- `git diff --check`
- Inspeção local da rota em desktop e mobile quando o servidor de prévia estiver disponível.
