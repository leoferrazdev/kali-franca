# Página Bio — Direção e Contrato V1

## Objetivo

Criar a página pública `https://kalifranca.com.br/bio/` como um ponto único de acesso aos três destinos solicitados: Mentoria, Reprogramação Energética e Canal do YouTube.

## Direção visual

- Usar a referência `https://pocket-kindness-flow.lovable.app/` somente como referência de arquitetura: perfil no topo, cartão central e destinos empilhados.
- Aplicar os tokens compartilhados em `brandbook/tokens.css`, preservando o vocabulário visual da Kali: Umbra, Vinho Profundo, Ameixa Sagrada, Ouro Fosco, Cobre Aurora e Alabastro.
- Usar Cormorant Garamond para o nome e títulos, Jost para leitura e IBM Plex Mono para rótulos/estados.
- Criar uma atmosfera de campo escuro com halos, gradientes quentes e órbitas finas, mantendo o conteúdo como foco.
- Em telas largas, o cartão permanece centralizado com espaço respirado; em telas estreitas, ocupa a largura disponível sem simular uma moldura de telefone.

## Conteúdo e comportamento

1. **Mentoria** — link externo para `https://wa.me/message/R6WHM3W3SGCSE1`.
2. **Reprogramação Energética** — cartão visível, sem `href`, com estado explícito `Em breve`.
3. **Canal do YouTube** — link externo para `https://www.youtube.com/channel/UCeaSCWbFhL3TOuIdYxzH3OQ`.

O perfil exibirá `Kali França`, o texto `Presença, clareza e expansão.` e o asset público já aprovado `/profile.jpg`. Não serão adicionados preços, métricas, depoimentos, garantias ou promessas de resultado.

## Arquitetura técnica

- Rota estática: `bio/index.html`.
- Estilos isolados da página: `bio/styles.css`.
- Tokens: importar `../brandbook/tokens.css` como fonte única de valores visuais.
- Sem JavaScript: navegação baseada em links HTML e estado não clicável para o destino sem URL.
- Metadados: `title`, descrição, canonical, Open Graph e Twitter Card com `https://kalifranca.com.br/profile.jpg`.
- Acessibilidade: skip link, `main`, landmarks, foco visível, alvos de pelo menos 44px, `aria-label` para ícones e `prefers-reduced-motion`.

## Critérios de aceite

- `bio/index.html` existe e contém exatamente três destinos visíveis.
- Mentoria e YouTube têm os URLs fornecidos; Reprogramação Energética não contém link.
- A página importa os tokens e estilos próprios, declara `lang="pt-BR"` e mantém uma única `h1`.
- A imagem `/profile.jpg` é usada no perfil e nos metadados de compartilhamento.
- O contrato estático da página passa junto aos testes existentes.
- A rota local e a rota pública `/bio/` respondem com HTTP 200 após a publicação.

## Fora de escopo

- Não criar checkout, formulário, integração com CRM, analytics ou CMS.
- Não inventar o link da Reprogramação Energética.
- Não alterar a página principal, o brandbook ou a área de membros além do registro documental desta entrega.
