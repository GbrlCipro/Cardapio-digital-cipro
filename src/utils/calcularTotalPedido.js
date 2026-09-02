export function calcularTotalPedido(subtotal, tipoPedido, taxaEntrega) {
  const taxa = tipoPedido === 'entrega' ? taxaEntrega : 0
  return {
    taxaEntrega: taxa,
    total: subtotal + taxa,
  }
}
