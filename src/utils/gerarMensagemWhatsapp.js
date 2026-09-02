import loja from '../config/loja'
import { formatarMoeda } from './formatarMoeda'
import { calcularTotalPedido } from './calcularTotalPedido'

const LABEL_TIPO_PEDIDO = {
  entrega: '🚚 Entrega',
  retirada: '🏪 Retirada no local',
  local: '🍽️ Consumo no local',
}

const LABEL_PAGAMENTO = {
  pix: '💳 Pix',
  dinheiro: '💵 Dinheiro',
  credito: '💳 Cartão de crédito',
  debito: '💳 Cartão de débito',
}

function formatarItem(item) {
  const linhas = [`${item.quantidade}x ${item.nome}`]

  if (item.variacaoEscolhida) {
    linhas.push(`• ${item.variacaoEscolhida.label}`)
  }

  item.adicionaisEscolhidos?.forEach((adicional) => {
    linhas.push(`• ${adicional.label}`)
  })

  if (item.observacao) {
    linhas.push(`Observação: ${item.observacao}`)
  }

  return linhas.join('\n')
}

/**
 * Monta a mensagem completa e organizada do pedido, no mesmo formato
 * que um funcionário da loja vai ler e continuar o atendimento.
 */
export function gerarMensagemPedido({ itens, subtotal, dadosCheckout }) {
  const { taxaEntrega, total } = calcularTotalPedido(subtotal, dadosCheckout.tipoPedido, loja.taxaEntrega)

  const blocos = []

  blocos.push('🛎️ *NOVO PEDIDO*')

  blocos.push(
    ['*CLIENTE*', `Nome: ${dadosCheckout.nome}`, `WhatsApp: ${dadosCheckout.whatsapp}`].join('\n')
  )

  blocos.push(['*PEDIDO*', ...itens.map(formatarItem)].join('\n\n'))

  const linhasValores = [`Subtotal: ${formatarMoeda(subtotal)}`]
  if (dadosCheckout.tipoPedido === 'entrega') {
    linhasValores.push(`Entrega: ${formatarMoeda(taxaEntrega)}`)
  }
  linhasValores.push(`*TOTAL: ${formatarMoeda(total)}*`)
  blocos.push(['*VALORES*', ...linhasValores].join('\n'))

  blocos.push(['*TIPO*', LABEL_TIPO_PEDIDO[dadosCheckout.tipoPedido]].join('\n'))

  if (dadosCheckout.tipoPedido === 'entrega') {
    const e = dadosCheckout.endereco
    const linhasEndereco = [
      '*ENDEREÇO*',
      `${e.rua}, nº ${e.numero}${e.complemento ? ` — ${e.complemento}` : ''}`,
      `${e.bairro}`,
      `${e.cidade} - ${e.estado}`,
      `CEP: ${e.cep}`,
    ]
    if (e.referencia) linhasEndereco.push(`Referência: ${e.referencia}`)
    blocos.push(linhasEndereco.join('\n'))
  }

  if (dadosCheckout.tipoPedido === 'local') {
    blocos.push(['*MESA*', dadosCheckout.mesa].join('\n'))
  }

  const linhasPagamento = ['*PAGAMENTO*', LABEL_PAGAMENTO[dadosCheckout.formaPagamento]]
  if (dadosCheckout.formaPagamento === 'dinheiro') {
    if (dadosCheckout.precisaTroco) {
      linhasPagamento.push(`Troco para: R$ ${dadosCheckout.trocoPara}`)
    } else {
      linhasPagamento.push('Não precisa de troco')
    }
  }
  blocos.push(linhasPagamento.join('\n'))

  if (dadosCheckout.observacao) {
    blocos.push(['*OBSERVAÇÃO*', dadosCheckout.observacao].join('\n'))
  }

  return blocos.join('\n\n')
}

export function gerarLinkWhatsapp(mensagem) {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
