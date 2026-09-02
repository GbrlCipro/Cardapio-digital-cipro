/**
 * Produtos sem variação têm precoBase.
 * Produtos com variação obrigatória (ex: Tamanho) mostram o menor preço
 * entre as opções, prefixado por "a partir de".
 */
export function precoExibicao(produto) {
  if (produto.variacoes?.length) {
    const precos = produto.variacoes[0].opcoes.map((o) => o.preco)
    return { valor: Math.min(...precos), aPartirDe: true }
  }
  return { valor: produto.precoBase, aPartirDe: false }
}
