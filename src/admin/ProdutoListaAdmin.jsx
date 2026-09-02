import { formatarMoeda } from '../utils/formatarMoeda'
import { precoExibicao } from '../utils/precoProduto'

export default function ProdutoListaAdmin({ categorias, produtos, onEditar, onExcluir, onAlternarCampo }) {
  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <span className="text-3xl" aria-hidden="true">🍽️</span>
        <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta-suave">
          Nenhum produto cadastrado
        </p>
        <p className="max-w-xs text-sm text-tinta-suave">Clique em "Novo produto" para começar.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {categorias.map((cat) => {
        const itensDaCategoria = produtos.filter((p) => p.categoriaId === cat.id)
        if (itensDaCategoria.length === 0) return null

        return (
          <section key={cat.id}>
            <h2 className="mb-3 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">
              {cat.emoji} {cat.nome}
            </h2>
            <div className="flex flex-col gap-2">
              {itensDaCategoria.map((produto) => {
                const { valor, aPartirDe } = precoExibicao(produto)
                return (
                  <div
                    key={produto.id}
                    className={`flex items-center gap-3 rounded-2xl border border-linha p-3 ${!produto.disponivel ? 'opacity-60' : ''}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-tinta">
                        {produto.destaque && <span aria-hidden="true">⭐ </span>}
                        {produto.nome}
                      </p>
                      <p className="font-ticket text-xs text-tinta-suave">
                        {aPartirDe && 'a partir de '}{formatarMoeda(valor ?? 0)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAlternarCampo(produto.id, 'disponivel', !produto.disponivel)}
                      className={`shrink-0 rounded-full px-3 py-1.5 font-ticket text-[10px] font-bold uppercase tracking-wide
                        ${produto.disponivel ? 'bg-aberto/10 text-aberto' : 'bg-fechado/10 text-fechado'}`}
                    >
                      {produto.disponivel ? 'Disponível' : 'Indisponível'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onEditar(produto)}
                      className="shrink-0 font-ticket text-xs font-bold uppercase tracking-wide text-tinta"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => onExcluir(produto)}
                      className="shrink-0 font-ticket text-xs font-bold uppercase tracking-wide text-fechado"
                    >
                      Excluir
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
