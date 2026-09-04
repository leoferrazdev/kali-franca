---
title: Eleva 5D - Liberação e acesso por compra
status: Aprovado para implementação
date: 2026-09-04
---

# Eleva 5D — Liberação e acesso por compra

## Objetivo

Definir a jornada determinística para liberar o Eleva 5D a uma pessoa que concluiu a compra, usando o checkout da Kiwify na primeira versão, a autenticação existente da área de membros e o Supabase como autoridade de acesso.

## Decisão arquitetural

O checkout permanece externo à aplicação. A Kiwify confirma a transação por webhook; o backend valida e normaliza o evento; o Supabase registra uma permissão de produto (`entitlement`) e a área de membros consulta essa permissão antes de entregar o Eleva 5D.

O produto não será liberado por redirecionamento do checkout, parâmetro de URL, e-mail digitado no navegador, alteração de perfil ou ação manual do frontend.

O provedor inicial é a Kiwify. O domínio interno terá um adaptador de provedor para permitir Hotmart no futuro sem modificar a regra de acesso. O Eleva ficará em `https://membros.kalifranca.com.br/membros/eleva`.

## Jornada do comprador

1. A pessoa acessa a página de vendas do Eleva 5D.
2. O CTA direciona para o checkout da Kiwify.
3. A pessoa informa no checkout o mesmo e-mail que usará na área de membros.
4. A Kiwify envia um evento ao endpoint de webhook do projeto.
5. O backend autentica o evento, confirma o produto `eleva_5d`, normaliza o status e grava o evento de forma idempotente.
6. O backend cria ou atualiza o entitlement da compra.
7. A pessoa entra ou cria sua conta em `membros.kalifranca.com.br`.
8. Se a conta já existir, o entitlement é associado ao usuário.
9. Se a conta ainda não existir, o entitlement permanece pendente por e-mail até o cadastro com o e-mail verificado da compra.
10. Com entitlement ativo, a pessoa acessa `/membros/eleva` e inicia o onboarding do Eleva 5D.

O redirecionamento pós-compra é apenas uma conveniência de navegação. A confirmação real é o evento validado pelo servidor.

## Separação de domínios do modelo

| Conceito | Responsabilidade |
| --- | --- |
| `auth.users` | Identidade, sessão e login Supabase |
| `profiles.role` | Permissão operacional, como `administradora` |
| `entitlements` | Direito de uso de um produto comprado |
| `billing_webhook_events` | Auditoria e idempotência dos eventos externos |
| `eleva_progress` | Progresso diário e estado da jornada do produto |

Ser administrador não concede acesso ao Eleva automaticamente. Acesso de produto e privilégio operacional são regras independentes.

## Persistência mínima

### `entitlements`

Campos previstos: `id`, `user_id` anulável, `product_code`, `status`, `provider`, `provider_customer_email`, `provider_order_id`, `purchased_at`, `expires_at`, `revoked_at` e `metadata`.

Restrições: `provider + provider_order_id` único; produto limitado ao código `eleva_5d`; status normalizado para `pending`, `active`, `suspended` ou `revoked`; nenhum dado de cartão armazenado.

### `billing_webhook_events`

Campos previstos: `id`, `provider`, `provider_event_id`, `event_type`, `payload_hash`, `processing_status`, `received_at`, `processed_at` e `failure_reason`.

O identificador do evento deve ser único por provedor. O payload bruto não será exibido em logs; quando necessário para suporte, será armazenado apenas de acordo com a política de retenção definida para dados pessoais.

## Contrato interno do provedor

Todo webhook externo deverá ser convertido para um evento interno equivalente:

```ts
type CommerceEvent = {
  provider: 'kiwify' | 'hotmart';
  eventId: string;
  productCode: 'eleva_5d';
  status: 'pending' | 'paid' | 'refunded' | 'cancelled' | 'chargeback';
  buyerEmail: string;
  orderId: string;
  occurredAt: string;
};
```

`normalizeKiwifyEvent` e `normalizeHotmartEvent` serão responsáveis somente pelo formato de cada plataforma. `fulfillCommerceEvent` será responsável por idempotência, vínculo e atualização do entitlement.

## Vínculo da conta

O vínculo automático usa o e-mail normalizado e verificado no Supabase Auth. O sistema não associará compras por nome, telefone ou correspondência aproximada.

Após o cadastro, o servidor poderá vincular entitlements pendentes do mesmo e-mail verificado. O frontend apenas consulta o resultado; não cria permissões.

## Controle de acesso

Toda rota e API do Eleva usará uma função equivalente a `requireElevaAccess()`:

1. obter o usuário pelo Supabase Auth;
2. rejeitar sessão ausente;
3. consultar entitlement ativo para `product_code = 'eleva_5d'` e `user_id = auth.uid()`;
4. permitir onboarding e conteúdo somente quando o status for `active`;
5. exibir estado de compra pendente ou acesso não localizado quando a permissão não existir.

As políticas RLS permitirão que a pessoa leia apenas seus próprios entitlements. O processamento de webhook usará ambiente de servidor protegido; chaves administrativas nunca serão enviadas ao navegador.

## Estados de experiência

- **Compra confirmada:** acesso pronto e CTA para entrar.
- **Cadastro pendente:** instrução para criar conta com o e-mail da compra.
- **Confirmação em andamento:** compra recebida, processamento ainda pendente.
- **Compra não localizada:** orientar conferência do e-mail ou suporte.
- **Acesso suspenso ou revogado:** informar que a permissão deixou de estar ativa, preservando o histórico.

## Reversões e reconciliação

Eventos de reembolso, cancelamento, chargeback ou expiração não apagam o histórico. Eles alteram o estado do entitlement e bloqueiam o acesso conforme a política comercial vigente.

O endpoint deve rejeitar eventos inválidos, processar duplicidades sem criar novo acesso e permitir reprocessamento seguro de falhas. O CRM administrativo deverá futuramente exibir a situação do entitlement e o último evento recebido para reconciliação.

## Testes de aceitação

- Compra aprovada recebida uma vez cria um único entitlement ativo.
- O mesmo webhook repetido não duplica acesso.
- Compra aprovada antes do cadastro é vinculada depois ao cadastro com o mesmo e-mail.
- Usuário já cadastrado acessa o Eleva após a compra aprovada.
- E-mail diferente não cria associação automática.
- Reembolso, cancelamento e chargeback retiram ou suspendem o acesso.
- Webhook sem autenticação válida não altera o banco.
- Usuário sem sessão é enviado ao login.
- Usuário autenticado sem entitlement vê o estado de acesso não liberado.
- Usuário com entitlement ativo vê onboarding ou dashboard do Eleva.

## Ordem de implementação

1. Migration de produtos, entitlements e eventos de webhook.
2. Adaptador Kiwify e função de fulfillment idempotente.
3. Vínculo seguro de entitlement durante o acesso/cadastro.
4. Guard de acesso e estados de `/membros/eleva`.
5. Testes automatizados e smoke test com eventos representativos.
6. Configuração do webhook na Kiwify e teste de reenvio/reconciliação.
7. Implementação do conteúdo e progresso diário do Eleva.

## Critério de liberação

O Eleva 5D só será considerado liberado quando houver: evento de pagamento validado, entitlement ativo associado ao usuário correto, acesso protegido por sessão e entitlement, testes de duplicidade/reversão aprovados e verificação pública separada do deploy.
