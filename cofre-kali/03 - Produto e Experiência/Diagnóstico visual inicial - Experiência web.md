---
title: Diagnóstico visual inicial - Experiência web
date: 2026-08-28
tags:
  - kali-franca
  - diagnostico
  - ux-ui
  - web
type: source-audit
status: preliminary
area: produto
---

# Diagnóstico visual inicial - Experiência web

> [!warning] Escopo do diagnóstico
> Este registro antecede qualquer implementação. Ele distingue o estado público observado, a estrutura local disponível e as hipóteses de aplicação do design system.

## Pergunta central

Como aplicar o mesmo design system no site institucional e na área de membros sem comprometer funcionalidades existentes, criando uma experiência visual única, consistente e reconhecível como parte da marca Kalì Franca?

## Estado público observado em 2026-08-28

### Site institucional

- URL: [kalifranca.com.br](https://kalifranca.com.br)
- Resposta observada: HTTP 200;
- conteúdo observado: página estática de preparação;
- título: `Kalì Franca`;
- headline: `Um novo espaço está sendo preparado.`

### Área de membros

- URL: [membros.kalifranca.com.br](https://membros.kalifranca.com.br)
- resposta observada: HTTP 200;
- tecnologia observada: Next.js prerenderizado;
- título: `Kalì Franca | Área de membros`;
- conteúdo observado: shell com `Área de membros` e mensagem de próxima etapa.

## Estado local do repositório

- `index.html`: página institucional estática com tema escuro e roxo;
- `apps/kali-franca-membros/`: aplicação Next.js inicial com `layout`, `page` e `globals.css`;
- `apps/kali-franca-crm/`: CRM separado, com escopo futuro e não incluído nesta aplicação visual inicial;
- não foram encontrados componentes compartilhados entre o institucional e os membros;
- não foram encontrados tokens CSS compartilhados;
- não foram encontrados, no escopo atual, login, dashboard, sidebar, listas, módulos, aulas, formulários ou modais implementados.

## Inconsistência estrutural principal

O design system existe como documento visual externo e detalhado, mas a implementação web atual não o consome como fonte de tokens ou componentes. O site e a área de membros ainda são experiências independentes e mínimas.

## Fonte visual observada

O arquivo `D:\LEONARDO\Kali Franca\design-system\Kalì Franca - Design System.dc.html` declara `Brand Design System · V1`, o conceito **Expansão da Potência**, tipografia `Cormorant Garamond`, `IBM Plex Mono` e `Jost`, além da paleta quente documentada em [[Design system - Mapa da fonte V1]].

## Referência secundária de UX

O `ui-ux-pro-max` foi consultado como referência de auditoria. Foram retidos apenas princípios compatíveis com a marca e com a web:

- navegação completa por teclado e ordem lógica de foco;
- hierarquia sequencial de headings;
- skip link quando houver navegação extensa;
- contraste mínimo de 4.5:1 para texto normal;
- alvos de toque com pelo menos 44 px;
- responsividade sem rolagem horizontal;
- carregamento de fontes com fallback e `font-display` adequado;
- labels visíveis, autocomplete e mensagens de erro próximas aos campos;
- estados de loading, erro, sucesso, foco, ativo e desabilitado;
- respeito a `prefers-reduced-motion`.

## Recomendação conflitante descartada

A busca genérica retornou rosa/lavanda, Liquid Glass, Caveat e Quicksand. Essas escolhas não serão adotadas porque contradizem a fonte visual V1 já definida para Kalì Franca. O `ui-ux-pro-max` será usado para qualidade de UX, acessibilidade e responsividade, não para substituir a identidade aprovada.

## Impacto para a arquitetura

Antes de aplicar fases visuais, será necessário definir uma camada compartilhada de tokens e componentes compatível com a stack atual, preservando a separação entre:

1. fonte visual externa;
2. documentação consultável no cofre;
3. tokens e componentes implementáveis;
4. aplicações específicas do institucional e dos membros.

## Notas relacionadas

- [[Design system como base de conhecimento]]
- [[Design system - Mapa da fonte V1]]
- [[Contexto digital do projeto]]
- [[Registro de início do projeto]]
