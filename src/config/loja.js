// ============================================================
// CONFIGURAÇÃO CENTRAL DA LOJA
// Altere apenas este arquivo para reutilizar o cardápio em
// outro estabelecimento — nada disso deve ficar espalhado
// pelo resto do código.
// ============================================================

const loja = {
  nome: 'Tanacomanda',
  descricaoCurta: 'Cardápio Digital',
  logo: '/tanacomanda-icone.svg',
  banner: '/tanacomanda-banner-1360x160.jpg', // ex: '/banner.jpg' — ou null para não exibir

  // Número que recebe os pedidos no formato internacional, só dígitos.
  whatsapp: '5564993173254',

  endereco: {
    rua: 'Rua das Palmeiras',
    numero: '450',
    bairro: 'Centro',
    cidade: 'Rio Verde',
    estado: 'GO',
  },

  // Horários por dia da semana. Use null para "fechado o dia todo".
  horarios: {
    domingo: { abre: '00:00', fecha: '23:59' },
    segunda: { abre: '00:00', fecha: '23:59' },
    terca: { abre: '00:00', fecha: '23:59' },
    quarta: { abre: '00:00', fecha: '23:59' },
    quinta: { abre: '00:00', fecha: '23:59' },
    sexta: { abre: '00:00', fecha: '23:59' },
    sabado: { abre: '00:00', fecha: '23:59' },
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
