import { createContext, useContext, useMemo } from 'react'
import { useLocalStorageState } from '../utils/useLocalStorageState'

const CarrinhoContext = createContext(null)

const CHAVE_STORAGE = 'cardapio.carrinho.v1'

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useLocalStorageState(CHAVE_STORAGE, [])

  function adicionarItem(item) {
    setItens((atual) => [...atual, item])
  }

  function atualizarItem(itemId, itemAtualizado) {
    setItens((atual) => atual.map((i) => (i.itemId === itemId ? itemAtualizado : i)))
  }

  function removerItem(itemId) {
    setItens((atual) => atual.filter((i) => i.itemId !== itemId))
  }

  function alterarQuantidade(itemId, quantidade) {
    setItens((atual) =>
      atual.map((i) => (i.itemId === itemId ? { ...i, quantidade: Math.max(1, quantidade) } : i))
    )
  }

  function limparCarrinho() {
    setItens([])
  }

  const resumo = useMemo(() => {
    const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0)
    const subtotal = itens.reduce((soma, i) => soma + i.precoUnitario * i.quantidade, 0)
    return { totalItens, subtotal }
  }, [itens])

  const valor = {
    itens,
    adicionarItem,
    atualizarItem,
    removerItem,
    alterarQuantidade,
    limparCarrinho,
    ...resumo,
  }

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext)
  if (!contexto) {
    throw new Error('useCarrinho precisa ser usado dentro de um CarrinhoProvider')
  }
  return contexto
}
