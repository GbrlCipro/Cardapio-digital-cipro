import { useEffect } from 'react'
import { formatarMoeda } from '../../utils/formatarMoeda'
import CarrinhoItem from './CarrinhoItem'

export default function CarrinhoDrawer({
  itens,
  totalItens,
  subtotal,
  onFechar,
  onEditarItem,
  onRemoverItem,
  onAlterarQuantidade,
  onLimparCarrinho,
  onIrParaCheckout,
}) {
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onFechar()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onFechar])

  const carrinhoVazio = itens.length === 0

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button aria-label="Fechar carrinho" onClick={onFechar} className="absolute inset-0 bg-tinta/50 backdrop-blur-[2px]" />

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-papel shadow-xl sm:max-w-lg sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between border-b border-linha px-5 py-4 sm:px-6">
          <h2 className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">Seu pedido</h2>
          <button onClick={onFechar} aria-label="Fechar" className="font-ticket text-xl font-bold text-tinta-suave">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6">
          {carrinhoVazio ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <span className="text-3xl" aria-hidden="true">🛒</span>
              <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta-suave">
                Seu carrinho está vazio
              </p>
              <p className="max-w-xs text-sm text-tinta-suave">
                Volte ao cardápio e escolha algo gostoso.
              </p>
            </div>
          ) : (
            <>
              <ul>
                {itens.map((item) => (
                  <CarrinhoItem
                    key={item.itemId}
                    item={item}
                    onEditar={onEditarItem}
                    onRemover={onRemoverItem}
                    onAlterarQuantidade={onAlterarQuantidade}
                  />
                ))}
              </ul>
              <button
                onClick={onLimparCarrinho}
                className="mb-4 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave underline"
              >
                Limpar carrinho
              </button>
            </>
          )}
        </div>

        {!carrinhoVazio && (
          <div className="espaco-seguro-inferior shrink-0 bg-papel px-5 pb-5 pt-4 sm:px-6" style={{ borderTop: '2px dashed var(--color-linha)' }}>
            <div className="mb-3 flex flex-col gap-1 font-ticket text-sm">
              <div className="flex items-center justify-between text-tinta-suave">
                <span>Total de itens</span>
                <span>{totalItens}</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-tinta">
                <span>Subtotal</span>
                <span>{formatarMoeda(subtotal)}</span>
              </div>
            </div>
            <button
              onClick={onIrParaCheckout}
              className="w-full rounded-2xl bg-tinta px-5 py-4 text-center font-base text-sm font-semibold text-papel transition-transform active:scale-[0.98]"
            >
              Continuar para o checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
