// ============================================================
// CONFIGURAÇÃO CENTRAL DA LOJA
// Altere apenas este arquivo para reutilizar o cardápio em
// outro estabelecimento — nada disso deve ficar espalhado
// pelo resto do código.
// ============================================================

const loja = {
  nome: 'Estação Sabor',
  descricaoCurta: 'Pedidos online',
  logo: '/logo.svg',
  banner: null, // ex: '/banner.jpg' — ou null para não exibir

  // Número que recebe os pedidos no formato internacional, só dígitos.
  whatsapp: '5564999999999',

  endereco: {
    rua: 'Rua das Palmeiras',
    numero: '450',
    bairro: 'Centro',
    cidade: 'Rio Verde',
    estado: 'GO',
  },

  // Horários por dia da semana. Use null para "fechado o dia todo".
  horarios: {
    domingo: null,
    segunda: { abre: '18:00', fecha: '23:00' },
    terca: { abre: '18:00', fecha: '23:00' },
    quarta: { abre: '18:00', fecha: '23:00' },
    quinta: { abre: '18:00', fecha: '23:00' },
    sexta: { abre: '18:00', fecha: '23:30' },
    sabado: { abre: '18:00', fecha: '23:30' },
  },

  // Fuso horário fixo da loja — não depende do dispositivo do cliente.
  timezone: 'America/Sao_Paulo',

  // Se true, impede o envio do pedido quando a loja está fechada
  // (o cardápio continua navegável normalmente).
  bloquearPedidoLojaFechada: true,

  formasPagamento: [
    { id: 'pix', label: 'Pix' },
    { id: 'dinheiro', label: 'Dinheiro' },
    { id: 'credito', label: 'Cartão de crédito' },
    { id: 'debito', label: 'Cartão de débito' },
  ],

  // Taxa fixa aplicada quando o cliente escolhe entrega.
  // (Estrutura pensada para futuramente virar taxas por região —
  // não implementado nesta versão.)
  taxaEntrega: 5.0,

  tiposPedido: [
    { id: 'entrega', label: 'Entrega' },
    { id: 'retirada', label: 'Retirada no local' },
    { id: 'local', label: 'Consumo no local' },
  ],
}

export default loja
