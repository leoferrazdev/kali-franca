---
title: Eleva 5D - Analytics e Clarity da home
date: 2026-10-01
tags:
  - kali/analytics
  - kali/deploy
status: implementado
---

# Analytics da home Eleva 5D

Relacionados: [[Eleva 5D - Página de vendas V9]] · [[MOC - Kalì Franca]].

## Configuração autorizada

- Página: https://kalifranca.com.br/.
- GA4: conta Kalì Franca `406399339`, propriedade `552151142`, fluxo web `15528815163`, medição `G-RZGESTEZCK`.
- Propriedade e fluxo renomeados para **Kalì Franca — Site e Bio**, preservando o histórico existente da bio.
- URL do fluxo: domínio principal. Fuso São Paulo, moeda BRL, medição aprimorada ativa e redação de e-mails ativa, verificados no painel.
- Novo Clarity exclusivo da home: **Kalì Franca — Eleva 5D | Home V9**, ID `yr5sw9xx5z`, categoria Carreira e Educação.
- Clarity da bio `yaiki79vjn` mantido sem alteração. Mascaramento Equilibrado do projeto novo preservado.

## Instrumentação

| Evento | Finalidade |
| --- | --- |
| page_view | Visita à home pelo GA4 |
| eleva5d_cta_click | Posição e destino do CTA |
| eleva5d_contact_click | Clique nos CTAs de WhatsApp da oferta e FAQ |
| eleva5d_offer_view | Visualização da oferta |
| eleva5d_section_view | Seções vistas |
| eleva5d_testimonial_open | Abertura do print original |
| eleva5d_curriculum_open | Expansão da jornada |
| eleva5d_details_open | Expansão de detalhes/FAQ |

Eventos comportamentais encaminhados a GA4 e Clarity. `eleva5d_contact_click` criado como evento principal no GA4, uma vez por sessão, sem valor monetário atribuído. Um clique para contato **não é compra nem lead confirmado**. Checkout continua fora desta entrega.

Scripts adicionados apenas ao HTML da home; a URL V9 conserva a instrumentação JS, mas não recebe tags externas próprias. Ads personalization e Google signals desativados nesta configuração. Parâmetros personalizados não contêm e-mail, telefone ou identificadores de usuários. Não foi instalada integração OAuth, alterado acesso de membros ou fabricado evento de compra.

## Verificação e limites

- 88 testes estáticos aprovados, incluindo três testes preventivos de analytics.
- Validar separadamente publicação do HTML, carregamento das tags, envio de eventos e processamento nos painéis. Push isolado não prova coleta pública.
- A política de privacidade e o mecanismo de consentimento precisam de avaliação própria; esta instalação não equivale a uma certificação de conformidade.
- Painéis podem demorar a consolidar dados; ausência inicial de relatórios não é prova de falha da tag.

## Referências técnicas

- [Eventos GA4](https://developers.google.com/analytics/devguides/collection/ga4/events).
- [API Clarity e mascaramento](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api).
