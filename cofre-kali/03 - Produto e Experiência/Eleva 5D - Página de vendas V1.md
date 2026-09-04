---
title: Eleva 5D - Página de vendas V1
aliases:
  - Página de vendas do Eleva 5D
date: 2026-09-04
tags:
  - kali-franca
  - eleva-5d
  - pagina-de-vendas
  - produto
type: Registro de implementação
status: validado-localmente
area: produto
---

# Eleva 5D — Página de vendas V1

> [!abstract] Entregável
> Página pública estática criada em `https://kalifranca.com.br/eleva-5d/` como primeiro entregável comercial do Eleva 5D.

## O que foi entregue

- Hero editorial com a proposta do Eleva 5D e a assinatura **Kalì Franca**.
- Apresentação dos cinco movimentos: Reprogramar, Alinhar, Manifestar, Sustentar e Elevar.
- Explicação da Regra dos 3 Movimentos e da rotina diária de referência.
- Explicação do Corte Energético como marco inicial consultável, sem colocar o passado no centro da primeira tela.
- Estado explícito **Acesso em preparação**, sem simular checkout ou compra.
- Navegação interna, prévia de compartilhamento com `profile.jpg`, foco visível, alvos mínimos de 44px e layout responsivo.

## Limites da V1

- A página não publica preço, condições, garantia, prova social, números de resultado ou disponibilidade não validados.
- O CTA final permanece interno à página até que a URL real da Kiwify seja configurada.
- A home em `kalifranca.com.br/` não foi substituída.
- O acesso autenticado continua pertencendo à área de membros e seguirá o entitlement aprovado em [[Eleva 5D - Arquitetura de liberação e acesso V1]].

## Arquivos

- `eleva-5d/index.html`
- `eleva-5d/styles.css`
- `tests/eleva-5d-sales-page-static.test.mjs`
- `docs/superpowers/specs/2026-09-04-eleva-5d-sales-page-design.md`
- `docs/superpowers/plans/2026-09-04-eleva-5d-sales-page.md`

## Evidências locais

- O contrato TDD da página falhou antes da implementação pela ausência da rota.
- Após a implementação, os cinco testes específicos do Eleva 5D passaram dentro da suíte estática.
- A suíte estática passou com 31 testes no checkpoint da implementação.

## Próximo movimento

1. Definir e publicar a oferta no checkout Kiwify.
2. Configurar webhook autenticado e idempotente.
3. Criar entitlement no Supabase e liberar `/membros/eleva` para o mesmo e-mail da compra.
4. Verificar deployment e comportamento público separadamente da validação local.

## Referências

- [[MOC - Kalì Franca]]
- [[Eleva 5D - Arquitetura de liberação e acesso V1]]
- `docs/superpowers/specs/2026-09-04-eleva-5d-sales-page-design.md`

