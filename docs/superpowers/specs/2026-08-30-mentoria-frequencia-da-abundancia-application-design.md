# Especificação de design — Aplicação Mentoria Frequência da Abundância

**Data:** 2026-08-30
**Status:** Implementado V1
**Escopo:** primeira versão da aplicação pública e da caixa de entrada administrativa

## Decisões aprovadas

- A página pública será `https://kalifranca.com.br/mentoria-frequencia-da-abundancia/`.
- A candidata não precisará criar conta nem fazer login.
- O CRM será exibido dentro de `membros.kalifranca.com.br`.
- Apenas usuários autenticados com perfil `administradora` poderão visualizar aplicações.
- A coleta usará um checkbox obrigatório, sem texto adicional, com a frase: “Concordo que os dados informados sejam usados para analisar minha aplicação e entrar em contato comigo.”
- Os dados ficarão em uma tabela exclusiva da mentoria, sem cópia automática para `leads` nesta V1.

## Objetivo e não objetivos

O objetivo é transformar a aplicação em um fluxo guiado de uma pergunta por tela, persistir o envio completo e disponibilizar a leitura segura para a administradora.

Ficam fora da V1: autenticação da candidata, pagamento, agendamento, automações de e-mail/WhatsApp, aprovação ou recusa dentro do CRM, conversão automática em lead e publicação de respostas individuais fora da área administrativa.

## Experiência pública

### Fluxo

1. Tela de apresentação com o texto aprovado da Mentoria Frequência da Abundância e botão de início.
2. Dezessete telas, uma para cada pergunta, com indicador de progresso, botão de avançar e retorno para a etapa anterior.
3. A pergunta 17 contém também o checkbox obrigatório e o botão final de envio.
4. Tela de sucesso com a mensagem de agradecimento aprovada.

Não haverá tela extra de revisão para evitar uma etapa não solicitada. O avanço só será liberado quando a resposta da etapa atual for válida. O estado ficará em memória durante a sessão; respostas não serão gravadas em `localStorage`, URL ou parâmetros de consulta.

### Conteúdo e campos

Os rótulos, textos introdutórios, alternativas e mensagem de sucesso serão reproduzidos conforme o briefing aprovado. O contrato de dados usará nomes técnicos estáveis:

`full_name`, `age_range`, `sex`, `email`, `whatsapp`, `city_state`, `challenge`, `beliefs`, `energy_tools_experience`, `priority_area`, `current_state`, `predominant_feeling`, `previous_support`, `perceived_block`, `desired_wins`, `commitment_score`, `investment_readiness`.

O `consent` será persistido como evidência booleana do checkbox aceito, acompanhado de `consented_at`. A API também receberá `client_submission_id` para tornar uma nova tentativa segura contra duplicação.

### Visual e acessibilidade

- Aplicar os tokens existentes em `brandbook/tokens.css`, respeitando a identidade Kalì Franca.
- Usar o contraste escuro vinho/plum/cobre/dourado já definido no sistema visual, sem inventar uma paleta paralela.
- Layout mobile-first, com leitura confortável em 375 px e expansão progressiva para telas maiores.
- Manter alvos de toque de pelo menos 44 px, foco visível, navegação por teclado, `aria-live` para feedback e suporte a `prefers-reduced-motion`.
- Textos longos quebrarão naturalmente; nenhum título, descrição ou alternativa será truncado por ellipsis.
- Estados explícitos: etapa inicial, preenchimento, erro de validação, envio, erro de rede com tentativa preservada e sucesso.

## Arquitetura técnica

### Fronteiras

```text
 candidata
    |
    | GET
    v
 kalifranca.com.br/mentoria-frequencia-da-abundancia/
    |
    | POST com Origin permitido
    v
 membros.kalifranca.com.br/api/mentoria-frequencia-da-abundancia/applications
    |
    | Supabase com chave pública e RLS
    v
 public.mentorship_applications
    ^
    | SELECT protegido por perfil administradora
    |
 membros.kalifranca.com.br/membros/aplicacoes/mentoria-frequencia-da-abundancia
```

A interface continuará estática no domínio principal. A API ficará no serviço Next.js de membros apenas como fronteira técnica invisível; isso não muda o endereço público da experiência nem coloca a candidata dentro da área de membros.

### API de envio

Endpoint: `POST /api/mentoria-frequencia-da-abundancia/applications`.

Regras do endpoint:

- aceitar somente `Origin: https://kalifranca.com.br`;
- controlar tamanho máximo do corpo e validar todos os campos no servidor;
- ignorar ou rejeitar `status`, `created_at`, `updated_at` e qualquer campo de privilégio enviado pelo cliente;
- fixar o slug da mentoria e o status inicial no servidor;
- aceitar apenas `consent: true`;
- usar `client_submission_id` único para respostas idempotentes;
- responder com sucesso apenas com `{ accepted: true }`, sem devolver identificadores ou dados pessoais;
- não registrar respostas em logs, URLs ou mensagens de erro;
- retornar mensagens neutras para falha de rede ou indisponibilidade.

O navegador nunca receberá chave `service_role`. A inserção pública será limitada à operação de criação pela política RLS específica da tabela; leituras públicas serão proibidas. A proteção contra abuso inicial será composta por validação, origem permitida, limite de corpo, campo honeypot não visível e idempotência. Rate limiting dedicado permanece como hardening posterior se a infraestrutura escolhida oferecer esse recurso.

## Modelo de dados

Tabela dedicada: `public.mentorship_applications`.

Campos previstos:

- `id uuid` como chave primária;
- `mentorship_slug text` com valor fixo `frequencia-da-abundancia`;
- `status text` inicial `nova`, preparado para evolução operacional;
- os 17 campos de resposta listados acima;
- `consent boolean` e `consented_at timestamptz`;
- `client_submission_id uuid unique`;
- `created_at timestamptz` e `updated_at timestamptz`.

Restrições: nome, faixa etária, sexo, e-mail, WhatsApp, cidade/estado e todas as respostas devem ser obrigatórios conforme o briefing; `commitment_score` deve ser inteiro entre 0 e 10; `email` deve passar por validação de formato; textos devem ter limites de tamanho definidos no servidor. O índice principal será por `mentorship_slug, created_at desc`.

As perguntas sobre crença/fé e áreas relacionadas à saúde podem conter dados pessoais sensíveis. Por isso, a V1 restringe a leitura à administradora, evita cópias e logs, não expõe os registros à candidata e não adiciona texto de consentimento além do aprovado. Este desenho não constitui declaração de conformidade jurídica; uma política de privacidade e revisão jurídica são itens posteriores ao escopo atual.

## CRM administrativo dentro da área de membros

O módulo será implementado na aplicação `kali-franca-membros`, reutilizando a autenticação Supabase existente. A rota prevista é:

`/membros/aplicacoes/mentoria-frequencia-da-abundancia`

Comportamento:

- usuário não autenticado: redirecionar para o login;
- usuário autenticado sem perfil `administradora`: negar acesso sem revelar registros;
- administradora: listar aplicações mais recentes e abrir os detalhes completos em uma visualização responsiva;
- desktop: tabela resumida com painel de detalhe;
- mobile: cartões empilhados com expansão acessível;
- mostrar data, status, dados de contato e respostas completas;
- não permitir edição ou mudança de status na V1;
- incluir o módulo na navegação apenas quando o perfil tiver autorização.

A autorização será aplicada em três camadas: guarda de rota no servidor, consulta do perfil autenticado e RLS de leitura na tabela. O app CRM separado permanece fora da superfície pública deste módulo e não será usado para contornar a autorização da área de membros.

## Privacidade, erros e observabilidade

- Não persistir dados pessoais no navegador após o término da sessão.
- Preservar o formulário em memória quando o envio falhar e permitir nova tentativa.
- Não colocar respostas no histórico do navegador ou na query string.
- Medir apenas eventos operacionais sem payload pessoal: início, avanço, erro de validação, erro de envio e sucesso.
- Se analytics for instalado, os eventos não conterão e-mail, telefone, texto livre ou identificadores de aplicação.

## Verificação e entrega

Antes da publicação serão exigidos testes de contrato da migração/RLS, validação do fluxo de cada etapa, validação do endpoint e controle de acesso da administradora. Também serão executados os testes existentes de membros, build, lint e verificação pública da nova URL.

Estados serão registrados separadamente: código local, migração aplicada no Supabase, deploy da Hostinger, verificação da URL pública e atualização do cofre. Nenhuma credencial será registrada no repositório ou no cofre.

## Critérios de aceite

- A URL pública responde sem depender de login e apresenta o fluxo completo.
- Todas as 17 respostas chegam à tabela correta, uma única vez por envio.
- O checkbox impede envio quando não aceito.
- A tela de sucesso aparece somente após persistência confirmada.
- Falhas de rede não apagam as respostas já preenchidas.
- Usuário não autenticado ou não administradora não consegue consultar aplicações.
- A administradora visualiza cada aplicação completa dentro da área de membros.
- Não há truncamento visual dos textos aprovados em mobile ou desktop.
- Os testes automatizados, builds e verificações públicas passam antes do commit e push para `main`.
