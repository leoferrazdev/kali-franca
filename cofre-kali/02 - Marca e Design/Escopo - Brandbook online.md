---
title: Escopo - Brandbook online
date: 2026-08-28
tags:
  - kali-franca
  - brandbook
  - identidade-visual
  - site-institucional
  - decisao
type: decision
status: active
area: marca
---

# Escopo - Brandbook online

## Decisão registrada

Criar a rota `https://kalifranca.com.br/brandbook` como uma página evolutiva para construção, consulta e registro da identidade visual e do brandbook da Kali França.

A página deverá reunir, em uma apresentação web coerente, o conhecimento derivado de `D:\LEONARDO\Kali Franca\design-system`, mantendo o cofre como base de conhecimento e histórico das decisões.

## Visibilidade aprovada

A rota será pública e poderá apresentar de forma explícita o conteúdo do brandbook. A indicação `Documento estratégico / Confidencial` existente na fonte visual é meramente ilustrativa e não constitui uma restrição de publicação.

O conteúdo publicado continuará sujeito à revisão de coerência, acessibilidade e atualização, mas não haverá ocultação automática motivada por essa indicação editorial da fonte.

## Arquitetura aprovada

Foi aprovada a opção 3: página estática independente dentro do site principal, em `https://kalifranca.com.br/brandbook`.

Características da primeira versão:

- baixo acoplamento com a área de membros;
- tokens visuais organizados para evolução posterior;
- conteúdo editorial consultável e explícito;
- ausência de dependência de uma migração do site principal para Next;
- possibilidade de evoluir depois para uma fonte de tokens orientada por dados.

## Plano de implementação

O plano executável foi criado em `docs/superpowers/plans/2026-08-28-brandbook-online.md`.

O plano cobre o contrato estático em TDD, a entrada HTML, os tokens em três camadas, a composição editorial, a integração dos testes, o registro no cofre e a validação local. A execução deve permanecer isolada do workspace de membros e do CRM.

## Conteúdo previsto

- conceito e princípios visuais, com a racionalidade de cada escolha;
- paleta de cores e tokens em três camadas: primitivos, semânticos e tokens de componente;
- tipografia, hierarquia e usos recomendados;
- vocabulário gráfico, composição, profundidade, luz e movimento;
- direção de imagem e direção visual da fundadora;
- componentes, variantes, estados, exemplos e restrições;
- aplicações, incluindo interface, landing page, produtos e redes sociais;
- do/don'ts e histórico de revisões do sistema.

## Fontes e limites

- Fonte visual primária: `D:\LEONARDO\Kali Franca\design-system\Kali Franca - Design System.dc.html`.
- Base de conhecimento e histórico: cofre `cofre-kali`.
- Camada de apresentação: rota pública `/brandbook`.
- A indicação `Documento estratégico / Confidencial` da fonte é apenas ilustrativa e não impede a publicação pública.
- Estratégia, promessas, métricas, preços, disponibilidade e informações internas não devem ser publicados sem revisão e aprovação específica.
- A página não altera o comportamento ou a funcionalidade da área de membros em `https://membros.kalifranca.com.br`.

## Relações

- [[Design system como base de conhecimento]]
- [[Design system - Mapa da fonte V1]]
- [[Diagnóstico visual inicial - Experiência web]]
- [[Contexto digital do projeto]]
- [[Escopo - Página de vendas demonstrativa]]

## Próximo gate

Revisar e aprovar a especificação visual e técnica da primeira versão pública, preservando a rastreabilidade entre a fonte local, os tokens documentados no cofre e a página publicada.
