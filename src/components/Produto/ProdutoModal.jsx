import { useEffect, useState } from 'react'
import { formatarMoeda } from '../../utils/formatarMoeda'
import { precoUnitarioTotal } from '../../utils/calcularPrecoItem'
import QuantidadeStepper from './QuantidadeStepper'

export default function ProdutoModal({ produto, itemExistente, onFechar, onAdicionar }) {
  const temVariacao = Boolean(produto.variacoes?.length)
  const variacao = temVariacao ? produto.variacoes[0] : null
  const editando = Boolean(itemExistente)

  const [variacaoEscolhida, setVariacaoEscolhida] = useState(
    itemExistente?.variacaoEscolhida?.opcaoId ?? null
  )
  const [adicionaisEscolhidos, setAdicionaisEscolhidos] = useState(
    itemExistente?.adicionaisEscolhidos?.map((a) => a.id) ?? []
  )
  const [quantidade, setQuantidade] = useState(itemExistente?.quantidade ?? 1)
  const [observacao, setObservacao] = useState(itemExistente?.observacao ?? '')
  const [tentouAdicionar, setTentouAdicionar] = useState(false)
  const [imagemComErro, setImagemComErro] = useState(false)

  // Trava o scroll do fundo enquanto o modal está aberto.
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  // Fecha com a tecla Esc.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onFechar()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onFechar])

  function alternarAdicional(id) {
    setAdicionaisEscolhidos((atual) =>
      atual.includes(id) ? atual.filter((a) => a !== id) : [...atual, id]
    )
  }

  const precoUnitario = precoUnitarioTotal(produto, variacaoEscolhida, adicionaisEscolhidos)
  const variacaoValida = !temVariacao || Boolean(variacaoEscolhida)
  const precoTotal = precoUnitario !== null ? precoUnitario * quantidade : null

  function handleAdicionar() {
    if (!variacaoValida) {
      setTentouAdicionar(true)
      return
    }

    onAdicionar({
      itemId: itemExistente?.itemId ?? `${produto.id}-${Date.now()}`,
      produtoId: produto.id,
      nome: produto.nome,
      quantidade,
      variacaoEscolhida: temVariacao
        ? { variacaoId: variacao.id, opcaoId: variacaoEscolhida, label: variacao.opcoes.find((o) => o.id === variacaoEscolhida)?.label }
        : null,
      adicionaisEscolhidos: produto.adicionais
        .filter((a) => adicionaisEscolhidos.includes(a.id))
        .map((a) => ({ id: a.id, label: a.label, preco: a.preco })),
      observacao: observacao.trim(),
      precoUnitario,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        aria-label="Fechar"
        onClick={onFechar}
        className="absolute inset-0 bg-tinta/50 backdrop-blur-[2px]"
      />

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-papel shadow-xl sm:max-w-lg sm:rounded-3xl">
        {/* Imagem + botão fechar */}
        <div className="relative h-44 w-full shrink-0 bg-papel-dobra sm:h-56">
          {imagemComErro ? (
            <div className="flex h-full w-full items-center justify-center text-4xl" aria-hidden="true">
              🍽️
            </div>
          ) : (
            <img src={produto.imagem} alt="" className="h-full w-full object-cover" onError={() => setImagemComErro(true)} />
          )}
          <button
            onClick={onFechar}
            aria-label="Fechar personalização"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-papel/90 font-ticket text-lg font-bold text-tinta shadow-sm"
          >
            ×
          </button>
        </div>

        {/* Conteúdo rolável */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <h2 className="font-base text-xl font-bold text-tinta">{produto.nome}</h2>
          <p className="mt-1 text-sm text-tinta-suave">{produto.descricao}</p>

          {temVariacao && (
            <fieldset className="mt-5">
              <legend className="mb-2 flex items-center gap-2 font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
                {variacao.nome}
                <span className="rounded-full bg-carimbo px-2 py-0.5 text-[10px] text-papel">Obrigatório</span>
              </legend>
              <div className="flex flex-col gap-2">
                {variacao.opcoes.map((opcao) => {
                  const selecionado = variacaoEscolhida === opcao.id
                  return (
                    <label
                      key={opcao.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors
                        ${selecionado ? 'border-tinta bg-papel-dobra' : 'border-linha'}`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="variacao"
                          checked={selecionado}
                          onChange={() => {
                            setVariacaoEscolhida(opcao.id)
                            setTentouAdicionar(false)
                          }}
                          className="h-4 w-4 accent-carimbo"
                        />
                        <span className="text-sm font-medium text-tinta">{opcao.label}</span>
                      </span>
                      <span className="font-ticket text-sm text-tinta-suave">{formatarMoeda(opcao.preco)}</span>
                    </label>
                  )
                })}
              </div>
              {tentouAdicionar && !variacaoValida && (
                <p className="mt-2 font-ticket text-xs text-fechado">
                  Escolha uma opção de {variacao.nome.toLowerCase()} para continuar.
                </p>
              )}
            </fieldset>
          )}

          {Boolean(produto.adicionais?.length) && (
            <fieldset className="mt-5">
              <legend className="mb-2 font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
                Adicionais
              </legend>
              <div className="flex flex-col gap-2">
                {produto.adicionais.map((adicional) => {
                  const selecionado = adicionaisEscolhidos.includes(adicional.id)
                  return (
                    <label
                      key={adicional.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors
                        ${selecionado ? 'border-tinta bg-papel-dobra' : 'border-linha'}`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selecionado}
                          onChange={() => alternarAdicional(adicional.id)}
                          className="h-4 w-4 accent-carimbo"
                        />
                        <span className="text-sm font-medium text-tinta">{adicional.label}</span>
                      </span>
                      <span className="font-ticket text-sm text-tinta-suave">+{formatarMoeda(adicional.preco)}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-5">
            <label htmlFor="observacao" className="mb-2 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
              Alguma observação?
            </label>
            <textarea
              id="observacao"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Ex: sem cebola"
              rows={2}
              maxLength={140}
              className="w-full resize-none rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta placeholder:text-tinta-suave/60 focus:border-tinta focus:outline-none"
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-ticket text-xs font-bold uppercase tracking-wide text-tinta">Quantidade</span>
            <QuantidadeStepper quantidade={quantidade} onAlterar={setQuantidade} />
          </div>
        </div>

        {/* Rodapé fixo com preço e ação */}
        <div
          className="espaco-seguro-inferior shrink-0 bg-papel px-5 pb-4 pt-5 sm:px-6"
          style={{
            borderTop: '2px dashed var(--color-linha)',
          }}
        >
          <button
            onClick={handleAdicionar}
            className="flex w-full items-center justify-between rounded-2xl bg-tinta px-5 py-4 text-papel transition-transform active:scale-[0.98]"
          >
            <span className="font-base text-sm font-semibold">
              {editando ? 'Salvar alterações' : 'Adicionar ao carrinho'}
            </span>
            <span className="font-ticket text-base font-bold">
              {precoTotal !== null ? formatarMoeda(precoTotal) : '—'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
