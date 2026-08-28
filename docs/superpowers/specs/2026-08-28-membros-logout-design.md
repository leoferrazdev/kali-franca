# Especificação de design — Logout da área de membros

**Data:** 2026-08-28
**Status:** aprovado por autonomia operacional do projeto

## Objetivo

Adicionar um botão de logout à área autenticada de `membros.kalifranca.com.br`, encerrando a sessão real do Supabase no navegador e retornando o membro à tela de login.

## Decisão

O logout será um componente cliente isolado, renderizado no cabeçalho da área de membros quando a página estiver em modo autenticado. Ele usará o mesmo cliente browser já adotado pelo login, chamará `supabase.auth.signOut()`, fará `router.replace('/login/')` e atualizará a árvore server-side com `router.refresh()`.

O cabeçalho continuará sendo um componente server-side. A fronteira interativa ficará somente no novo `LogoutButton`, evitando transformar a estrutura inteira da área de membros em componente cliente.

## Estados e erros

- Inicial: botão `Sair` habilitado.
- Durante o encerramento: botão desabilitado, `aria-busy="true"` e texto `Saindo...`.
- Sucesso: redirecionamento para `/login/`; o `proxy` valida a ausência da sessão nas próximas requisições.
- Falha: a pessoa permanece na área, recebe uma mensagem em região `role="status"` com `aria-live="polite"` e pode tentar novamente.
- Prévia sem configuração pública do Supabase: o botão não é renderizado.

## Interface visual e acessibilidade

O botão usará os tokens já importados em `app/globals.css`, com tratamento visual discreto no cabeçalho, área de toque adequada, foco visível global, contraste coerente e adaptação para telas estreitas. O estado de erro ficará associado ao botão e não dependerá apenas de cor.

## Critérios de aceitação

1. Uma sessão autenticada vê o botão de logout no cabeçalho.
2. O clique chama o logout do Supabase e redireciona para `/login/` quando não há erro.
3. O botão impede cliques repetidos enquanto a operação está pendente.
4. Falhas são comunicadas sem desmontar a página e permitem nova tentativa.
5. A prévia sem Supabase não exibe uma ação de logout fictícia.
6. O contrato está coberto por teste automatizado, o build é concluído e a decisão é registrada no cofre `cofre-kali`.
