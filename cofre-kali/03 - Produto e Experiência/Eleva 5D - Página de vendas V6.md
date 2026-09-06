---
title: Eleva 5D - Página de vendas V6
date: 2026-09-06
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - v6
type: implementation-record
status: local-validated
area: produto-e-experiencia
---

# Eleva 5D — Página de vendas V6

## Decisão

A V6 é uma cópia da V5 em rota própria. A única mudança editorial estrutural está no bloco **08 / quem vai te conduzir**, sem alterar a V5.

A nova seção responde diretamente à pergunta: **por que confiar na Kalì para conduzir este processo?**

## Nova narrativa de autoridade

- Título: **Eu também precisei aprender a voltar para mim.**
- A trajetória parte das crises de ansiedade, do desemprego e da dificuldade de sustentar a própria potência.
- O mecanismo pessoal apresentado é perceber quando saiu de si e construir maneiras de voltar.
- O Eleva 5D aparece como consequência dessa experiência, não como uma promessa genérica de manifestação.
- Credenciais preservadas: 8 anos de atuação, 2.500+ pessoas atendidas, 10+ países e 8+ formações.
- A referência à neurociência foi removida para não criar uma dívida de prova científica que não é necessária à proposta atual.
- O depoimento final foi substituído por uma frase coerente com o mecanismo central da jornada.

## Preservações

- V4 permanece intacta.
- V5 permanece intacta e publicada como referência anterior.
- Blocos 04, 05 e 09 foram preservados.
- Bloco 06 continua sendo a prévia HTML/CSS do aplicativo, sem imagens geradas por API e sem apresentar o produto final como já concluído.
- A seção de prova social usa três prints reais fornecidos pelo projeto, com autorização de uso confirmada.
- Oferta de **R$497**, garantia de sete dias, FAQ ampliado e CTA fixo foram preservados da V5.

## Rota

- Página: `/lp-5d/v6/`
- URL prevista: `https://kalifranca.com.br/lp-5d/v6/`

## UX e responsividade

O texto foi organizado em parágrafos curtos, com linha de leitura limitada e uma linha final de credenciais. A imagem da especialista usa carregamento prioritário na V6 por ser um elemento estrutural da seção de autoridade.

## Ajustes visuais posteriores

- A identificação **EU SOU KALÌ FRANCA, TERAPEUTA ENERGÉTICA E MENTORA HÁ 8 ANOS.** agora respeita a largura da coluna de autoridade, quebra linha naturalmente e não é cortada em desktop compacto, tablet ou mobile.
- A identificação recebeu entrelinha e espaçamento de leitura próprios, preservando a hierarquia de etiqueta sem competir com o título da seção.
- O rodapé do mockup do aplicativo recebeu divisor, respiro interno e posicionamento seguro nos breakpoints para separar o progresso da base do componente.
- A composição permanece sem alteração editorial, com as cores e a direção visual aprovadas para a V6.

## Prova social visual

Os relatos foram selecionados e organizados conforme a função narrativa da seção **03 / quando deixa de ser teoria**:

| Posição | Arquivo | Destaque |
| --- | --- | --- |
| 01 | `depoimentos/4.jpeg` | De oscilação para sustentação |
| 02 | `depoimentos/3.jpeg` | De entendimento para movimento |
| 03 | `depoimentos/5.jpeg` | De esforço para confiança |

Os prints são exibidos como imagens dentro de cards nativos da página, com moldura, legenda e comportamento responsivo. O conteúdo visual dos relatos não foi reescrito nem apresentado como texto editorial independente. Os arquivos originais permanecem preservados no diretório `depoimentos/`.

## Validação

- 8 testes específicos da V6 aprovados.
- V6 mantém o `app.js` da V5 sem alterações comportamentais.
- A sequência editorial 01–11 foi preservada.
- A imagem, o título e o corpo narrativo foram verificados localmente no navegador.
- Commit `b281c83` publicado na `main`.
- Publicação pública e verificação HTTP da rota ainda dependem do deployment da Hostinger.

- Os três prints autorizados são referenciados por caminhos locais e nenhum depoimento ou resultado foi fabricado.

## Referências

- [[Eleva 5D - Página de vendas V5]]
- [[Eleva 5D - Página de vendas na raiz V2]]
- [[Roadmap - Kalì Franca]]
