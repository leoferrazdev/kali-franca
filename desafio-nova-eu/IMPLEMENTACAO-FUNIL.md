# Funil Nova Eu

A rota pública prevista é https://kalifranca.com.br/nova-eu/. O botão na bio deve apontar para ela após a validação de compra e entrega.

## Roteamento

O documento “Diagnóstico de Frequência & Permissão” define a pergunta de foco e as quatro perguntas de cada uma das quatro trilhas. As respostas têm peso igual. Em empate, vale a primeira letra entre as empatadas na ordem A, B, C, D. A área escolhida define o e-book. A letra vencedora só define a devolutiva. A primeira versão apresenta os resultados como temas de reflexão.

## Compra e entrega

Usar a área existente em https://membros.kalifranca.com.br/ como primeira opção, com Supabase Auth e uma biblioteca Nova Eu. Criar quatro produtos no checkout, um por e-book. O roteiro registra R$ 88 por oferta. Confirmar o valor no checkout antes de publicar.

Cada identificador de produto recebido do provedor deve corresponder a uma única trilha. Um webhook autenticado deve registrar a compra aprovada e conceder acesso pelo e-mail verificado da conta. Usar o identificador do pedido para processar eventos repetidos com segurança e tratar reembolso ou chargeback conforme o estado do pedido. Em compras de mais de uma trilha, a biblioteca deve reunir todos os acessos ativos.

Guardar PDF e MP3 em armazenamento privado. Verificar, no servidor, se a conta tem acesso ativo ao produto antes de gerar um link temporário para download ou reprodução. Se o subdomínio atual não puder receber a integração, usar a área de membros do provedor de pagamento com os mesmos quatro produtos e controle de acesso por compra.

## Materiais

Cada trilha tem um DOCX próprio. O PDF do Drive é um modelo geral. Preparar a versão final de cada e-book para download. O roteiro oferece Nova Eu e Basta Permitir nas quatro trilhas. A pasta tem duas versões finais de Basta Permitir, de 22 minutos e de 1h11. Definir se a oferta inclui uma ou ambas. O arquivo fontes-entrega.json identifica os originais do Drive para preparação privada.

## Antes de ativar a bio

Configurar os quatro checkouts, conferir os arquivos finais e validar para cada trilha o resultado, o valor, a compra, o login e a liberação apenas do material comprado. Conferir acesso múltiplo, reenvio do webhook, reembolso e bloqueio de acesso sem compra. Ativar o link da bio quando o fluxo estiver pronto.
