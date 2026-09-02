export default function ListaLabelPreco({ titulo, itens, onAlterar, placeholderLabel }) {
  function atualizarLinha(index, campo, valor) {
    const novaLista = itens.map((item, i) => (i === index ? { ...item, [campo]: valor } : item))
    onAlterar(novaLista)
  }

  function removerLinha(index) {
    onAlterar(itens.filter((_, i) => i !== index))
  }

  function adicionarLinha() {
    onAlterar([...itens, { id: `item-${Date.now().toString(36)}`, label: '', preco: 0 }])
  }

  return (
    <div>
      <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
        {titulo}
      </span>
      <div className="flex flex-col gap-2">
        {itens.map((item, index) => (
          <div key={item.id} className="flex gap-2">
            <input
              type="text"
              value={item.label}
              onChange={(e) => atualizarLinha(index, 'label', e.target.value)}
              placeholder={placeholderLabel}
              className="min-w-0 flex-1 rounded-xl border border-linha bg-papel px-3 py-2 text-sm text-tinta focus:border-tinta focus:outline-none"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              value={item.preco}
              onChange={(e) => atualizarLinha(index, 'preco', Number(e.target.value))}
              className="w-24 rounded-xl border border-linha bg-papel px-3 py-2 text-sm text-tinta focus:border-tinta focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removerLinha(index)}
              aria-label="Remover"
              className="shrink-0 rounded-xl border border-linha px-3 text-tinta-suave"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={adicionarLinha}
        className="mt-2 font-ticket text-xs font-bold uppercase tracking-wide text-carimbo"
      >
        + Adicionar
      </button>
    </div>
  )
}
