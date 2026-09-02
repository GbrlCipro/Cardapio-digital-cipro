import { useState } from 'react'
import ListaLabelPreco from './components/ListaLabelPreco'

const PRODUTO_VAZIO = {
  id: null,
  categoriaId: '',
  nome: '',
  descricao: '',
  imagem: '',
  disponivel: true,
  destaque: false,
  precoBase: 0,
  variacoes: [],
  adicionais: [],
}

export default function ProdutoForm({ categorias, produtoInicial, onCancelar, onSalvar }) {
  const [produto, setProduto] = useState(produtoInicial ?? {
    ...PRODUTO_VAZIO,
    categoriaId: categorias[0]?.id ?? '',
  })
  const [temVariacao, setTemVariacao] = useState(Boolean(produtoInicial?.variacoes?.length))
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)

  function alterar(campo, valor) {
    setProduto((atual) => ({ ...atual, [campo]: valor }))
  }

  function alterarOpcoesVariacao(opcoes) {
    setProduto((atual) => ({
      ...atual,
      variacoes: [{ id: 'tamanho', nome: 'Tamanho', opcoes }],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)

    if (!produto.nome.trim() || !produto.categoriaId) {
      setErro('Preencha ao menos o nome e a categoria.')
      return
    }

    const produtoFinal = {
      ...produto,
      variacoes: temVariacao ? produto.variacoes : [],
      precoBase: temVariacao ? null : Number(produto.precoBase) || 0,
    }

    setSalvando(true)
    const resultado = await onSalvar(produtoFinal, produtoInicial?.id ?? null)
    setSalvando(false)

    if (resultado?.erro) setErro(resultado.erro)
  }

  const opcoesVariacao = produto.variacoes?.[0]?.opcoes ?? []

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button aria-label="Fechar" onClick={onCancelar} className="absolute inset-0 bg-tinta/50 backdrop-blur-[2px]" />

      <form
        onSubmit={handleSubmit}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-papel shadow-xl sm:max-w-lg sm:rounded-3xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-linha px-5 py-4 sm:px-6">
          <h2 className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">
            {produtoInicial ? 'Editar produto' : 'Novo produto'}
          </h2>
          <button type="button" onClick={onCancelar} className="font-ticket text-xl font-bold text-tinta-suave">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">Nome</span>
              <input
                type="text"
                value={produto.nome}
                onChange={(e) => alterar('nome', e.target.value)}
                className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">Descrição</span>
              <textarea
                value={produto.descricao}
                onChange={(e) => alterar('descricao', e.target.value)}
                rows={2}
                className="w-full resize-none rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">Categoria</span>
              <select
                value={produto.categoriaId}
                onChange={(e) => alterar('categoriaId', e.target.value)}
                className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
              >
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.emoji} {cat.nome}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
                URL da imagem
              </span>
              <input
                type="text"
                value={produto.imagem}
                onChange={(e) => alterar('imagem', e.target.value)}
                placeholder="https://…"
                className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
              />
            </label>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-tinta">
                <input
                  type="checkbox"
                  checked={produto.disponivel}
                  onChange={(e) => alterar('disponivel', e.target.checked)}
                  className="h-4 w-4 accent-carimbo"
                />
                Disponível
              </label>
              <label className="flex items-center gap-2 text-sm text-tinta">
                <input
                  type="checkbox"
                  checked={produto.destaque}
                  onChange={(e) => alterar('destaque', e.target.checked)}
                  className="h-4 w-4 accent-carimbo"
                />
                Destaque
              </label>
            </div>

            <label className="flex items-center gap-2 border-t border-linha pt-3 text-sm text-tinta">
              <input
                type="checkbox"
                checked={temVariacao}
                onChange={(e) => setTemVariacao(e.target.checked)}
                className="h-4 w-4 accent-carimbo"
              />
              Este produto tem tamanhos com preços diferentes
            </label>

            {temVariacao ? (
              <ListaLabelPreco
                titulo="Tamanhos"
                itens={opcoesVariacao}
                onAlterar={alterarOpcoesVariacao}
                placeholderLabel="Ex: Grande"
              />
            ) : (
              <label className="block">
                <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
                  Preço
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={produto.precoBase ?? 0}
                  onChange={(e) => alterar('precoBase', e.target.value)}
                  className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
                />
              </label>
            )}

            <ListaLabelPreco
              titulo="Adicionais"
              itens={produto.adicionais ?? []}
              onAlterar={(lista) => alterar('adicionais', lista)}
              placeholderLabel="Ex: Bacon extra"
            />
          </div>

          {erro && <p className="mt-4 font-ticket text-xs text-fechado">{erro}</p>}
        </div>

        <div className="espaco-seguro-inferior shrink-0 bg-papel px-5 pb-5 pt-4 sm:px-6" style={{ borderTop: '2px dashed var(--color-linha)' }}>
          <button
            type="submit"
            disabled={salvando}
            className="w-full rounded-2xl bg-tinta px-5 py-4 text-center font-base text-sm font-semibold text-papel transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {salvando ? 'Salvando…' : 'Salvar produto'}
          </button>
        </div>
      </form>
    </div>
  )
}
