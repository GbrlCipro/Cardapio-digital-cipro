/**
 * Preço unitário do produto de acordo com a variação escolhida
 * (ou o preço base, quando não há variação obrigatória).
 */
export function precoUnitarioBase(produto, variacaoEscolhidaId) {
  if (produto.variacoes?.length) {
    const variacao = produto.variacoes[0]
    const opcao = variacao.opcoes.find((o) => o.id === variacaoEscolhidaId)
    return opcao ? opcao.preco : null
  }
  return produto.precoBase
}

/** Soma o preço dos adicionais selecionados. */
export function precoAdicionais(produto, adicionaisSelecionadosIds) {
  if (!produto.adicionais?.length) return 0
  return produto.adicionais
    .filter((a) => adicionaisSelecionadosIds.includes(a.id))
    .reduce((soma, a) => soma + a.preco, 0)
}

/** Preço unitário total (base/variação + adicionais), ou null se a variação obrigatória ainda não foi escolhida. */
export function precoUnitarioTotal(produto, variacaoEscolhidaId, adicionaisSelecionadosIds) {
  const base = precoUnitarioBase(produto, variacaoEscolhidaId)
  if (base === null) return null
  return base + precoAdicionais(produto, adicionaisSelecionadosIds)
}
