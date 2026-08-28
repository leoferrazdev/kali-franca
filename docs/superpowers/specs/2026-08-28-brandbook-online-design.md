# Especificação de design — Brandbook online Kalì Franca

**Data:** 2026-08-28
**Status:** Em revisão
**Escopo aprovado:** página estática independente em `/brandbook`

## 1. Contexto

O domínio principal `https://kalifranca.com.br` receberá uma página pública para construção, registro e consulta da identidade visual da Kalì Franca. A área de membros em `https://membros.kalifranca.com.br` permanece fora da primeira implementação.

A fonte visual existente está em `D:\LEONARDO\Kali Franca\design-system\Kalì Franca - Design System.dc.html`. O cofre `cofre-kali` registra a origem, as decisões e a evolução; a página transforma esse conhecimento em uma experiência pública consultável.

A indicação editorial `Documento estratégico / Confidencial` presente na fonte foi considerada pelo usuário meramente ilustrativa. A publicação pública e explícita do brandbook está aprovada.

## 2. Objetivo

Criar uma experiência editorial que permita compreender a identidade visual e consultar suas regras sem depender da leitura do arquivo-fonte original.

A página deve comunicar contenção, profundidade e expansão por meio de espaço, luz, escala, contraste controlado e hierarquia tipográfica. O conteúdo precisa ser utilizável como referência por design, produto, conteúdo e desenvolvimento.

## 3. Fora de escopo

- alterar a área de membros;
- migrar o site principal para Next;
- criar login, CMS ou painel administrativo;
- publicar a página de vendas fictícia;
- inventar oferta, preço, depoimento, métricas, promessa ou disponibilidade;
- transformar a primeira versão em uma biblioteca completa de componentes executáveis.

## 4. Direção visual

### Princípios

- **Contenção → expansão:** iniciar com áreas de baixa exposição e revelar cor, luz e escala progressivamente.
- **Calor com profundidade:** priorizar tons terrosos, vinho, ameixa, cobre e dourado fosco sobre fundos escuros ou alabastro.
- **Ouro com escassez:** usar o dourado como sinal de ênfase, não como preenchimento dominante.
- **Editorial com precisão:** combinar uma serif expressiva para títulos, uma sans legível para interface e uma mono para metadados/tokens.
- **Clareza antes do ornamento:** recursos visuais não podem prejudicar leitura, navegação ou contraste.

### Tipografia

- **Cormorant Garamond:** títulos, capítulos e frases de abertura.
- **Jost:** navegação, corpo, descrições, labels e controles.
- **IBM Plex Mono:** índices, valores de tokens, metadados, versões e pequenos marcadores técnicos.

### Paleta de referência

| Papel de origem | Valor |
| --- | --- |
| Umbra | `#0E0B0A` |
| Vinho Profundo | `#3A1424` |
| Ameixa Sagrada | `#7A2B44` |
| Ouro Fosco | `#C9A66B` |
| Alabastro | `#F4EDE4` |
| Cobre Aurora | `#C97A52` |
| Areia Nude | `#E2D4C3` |
| Névoa Mineral | `#9AA39F` |
| Cinza Cálido | `#B7ABA0` |
| Verde Sálvia | `#5F7A6A` |

Os valores acima são a referência factual da fonte V1. A implementação deverá transformá-los em tokens primitivos, semânticos e de componente, sem espalhar hexadecimais arbitrários pelo CSS.

## 5. Arquitetura de informação

### Entrada e navegação

1. **Capa:** nome Brandbook Kalì Franca, versão, status e convite para explorar.
2. **Índice:** navegação persistente por âncoras, com indicação da seção ativa quando houver comportamento em JavaScript.
3. **Introdução:** propósito do brandbook e como consultar a página.

### Seções principais

1. **Essência:** conceito `Expansão da Potência`, princípios e palavras-chave.
2. **Direção visual:** moodboard verbal, rotas, contenção, expansão, luz, profundidade e espaço.
3. **Cores:** paleta visual, nomes, valores, usos recomendados e exemplos de contraste.
4. **Tipografia:** famílias, hierarquia, escala e exemplos de combinação.
5. **Vocabulário gráfico:** formas, linhas, halos, gradientes, textura, composição e movimento.
6. **Imagem:** direção de imagem e orientação para representação visual da fundadora.
7. **Interface:** tokens, superfícies, bordas, estados, controles, cards, navegação e feedback.
8. **Aplicações:** landing page, produtos, redes sociais e outros contextos previstos na fonte.
9. **Do / Don't:** decisões aprovadas, limites e exemplos de uso inadequado.
10. **Evolução:** versão, data de atualização, fonte consultada e registro das próximas revisões.

Cada seção deve conter contexto curto, exemplos visuais ou de interface quando aplicável e a justificativa da regra. A página deve privilegiar consulta progressiva, sem transformar todos os detalhes em um bloco único de texto.

## 6. Arquitetura de tokens

A primeira versão deve adotar três camadas:

### Primitivos

Valores brutos da fonte, por exemplo:

```css
:root {
  --kf-color-umbra-500: #0E0B0A;
  --kf-color-vinho-profundo-500: #3A1424;
  --kf-color-ameixa-sagrada-500: #7A2B44;
  --kf-color-ouro-fosco-500: #C9A66B;
  --kf-color-alabastro-500: #F4EDE4;
  --kf-color-cinza-calido-500: #B7ABA0;
}
```

### Semânticos

Papéis de interface independentes do nome da cor:

```css
:root {
  --kf-color-bg-canvas: var(--kf-color-umbra-500);
  --kf-color-bg-surface: var(--kf-color-vinho-profundo-500);
  --kf-color-text-primary: var(--kf-color-alabastro-500);
  --kf-color-text-muted: var(--kf-color-cinza-calido-500);
  --kf-color-accent: var(--kf-color-ouro-fosco-500);
}
```

### Tokens de componente

Decisões aplicadas a componentes específicos:

```css
:root {
  --kf-component-card-bg: var(--kf-color-bg-surface);
  --kf-component-card-border: color-mix(in srgb, var(--kf-color-accent) 30%, transparent);
  --kf-component-button-primary-bg: var(--kf-color-accent);
  --kf-component-button-primary-text: var(--kf-color-umbra-500);
}
```

Os nomes finais podem ser ajustados durante a implementação para compatibilidade do navegador e legibilidade, mas a separação entre as três camadas é obrigatória. O cofre deverá documentar cada token com origem, finalidade, exemplo e restrição quando essa informação existir.

## 7. Arquitetura técnica

Estrutura inicial proposta:

```text
brandbook/
├── index.html
├── tokens.css
├── styles.css
└── brandbook.js (somente se houver interação validada)
```

- `index.html` será a entrada pública da rota.
- `tokens.css` conterá as três camadas de tokens.
- `styles.css` conterá layout, componentes e responsividade.
- JavaScript será mínimo e opcional, limitado a navegação, estado ativo, cópia de tokens ou melhorias progressivas.
- A implementação não deve exigir dependência externa nova nem alterar o entrypoint atual do site principal.
- A área de membros não deve importar arquivos ou comportamento da primeira versão.

## 8. Requisitos de experiência

- HTML semântico com um único `h1` e hierarquia de headings coerente.
- Link de salto para o conteúdo principal.
- Navegação completa por teclado e foco visível.
- Contraste mínimo de 4.5:1 para texto normal sempre que a combinação for apresentada como leitura principal.
- Alvos interativos com pelo menos 44px na área de toque.
- Nenhum scroll horizontal em viewport móvel.
- Imagens com `alt` descritivo; imagens decorativas identificadas adequadamente.
- `font-display` e fallback tipográfico para evitar texto invisível.
- Respeito a `prefers-reduced-motion`.
- Índice e componentes funcionais mesmo quando JavaScript estiver indisponível, quando possível.
- Estados de foco, hover, ativo e desabilitado documentados para componentes interativos.

## 9. Rastreabilidade e manutenção

Toda decisão implementada deve ter correspondência no cofre. Alterações de paleta, tipografia, componentes ou princípios devem atualizar:

- a nota correspondente no `cofre-kali`;
- a versão exibida na página;
- a fonte ou decisão que motivou a mudança;
- a data e o responsável pelo registro, quando disponíveis.

A página é uma camada pública de apresentação. O cofre permanece o registro histórico e de decisão; o arquivo local de design system permanece a fonte visual de origem até que uma fonte canônica posterior seja aprovada.

## 10. Critérios de aceitação da implementação

- `https://kalifranca.com.br/brandbook` responde com HTTP 200 após publicação.
- A página apresenta as seções previstas e usa os tokens documentados.
- A experiência funciona em desktop e mobile sem overflow horizontal.
- A navegação por teclado alcança índice, links e controles.
- O contraste dos textos principais é validado.
- O site principal existente continua respondendo corretamente.
- A área de membros continua respondendo corretamente.
- Testes e build existentes do repositório continuam passando.
- A alteração é isolada da área de membros e não introduz credenciais, dados privados ou serviços externos não aprovados.

## 11. Alternativas avaliadas

- **Migração para Next compartilhado:** rejeitada para a primeira versão por ampliar o risco e o escopo.
- **Brandbook orientado por JSON desde o início:** mantido como evolução futura; não é necessário para validar a primeira experiência pública.
- **Página estática independente:** aprovada por compatibilidade com o site atual, baixo acoplamento e possibilidade de evoluir os tokens posteriormente.
