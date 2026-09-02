import ProdutoCard from './ProdutoCard'

export default function ProdutoGrid({ categorias, produtos, onSelecionarProduto }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-4 sm:px-8">
      {categorias.map((cat) => {
        const itensDaCategoria = produtos.filter((p) => p.categoriaId === cat.id)

        return (
          <section key={cat.id} id={`categoria-${cat.id}`} className="mb-8 scroll-mt-20">
            <h2 className="mb-3 flex items-center gap-2 font-ticket text-sm font-bold uppercase tracking-wide text-tinta-suave">
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.nome}
            </h2>

            {itensDaCategoria.length > 0 ? (
              <div className="flex flex-col gap-3">
                {itensDaCategoria.map((produto) => (
                  <ProdutoCard key={produto.id} produto={produto} onSelecionar={onSelecionarProduto} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-linha px-4 py-6 text-center text-sm text-tinta-suave">
                Nenhum produto disponível nesta categoria no momento.
              </p>
            )}
          </section>
        )
      })}

      {produtos.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <span className="text-3xl" aria-hidden="true">🍽️</span>
          <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta-suave">
            Nenhum produto disponível
          </p>
          <p className="max-w-xs text-sm text-tinta-suave">
            Volte em breve — estamos atualizando o cardápio.
          </p>
        </div>
      )}
    </div>
  )
}

