import { formatarMoeda } from '../../utils/formatarMoeda'

export default function CarrinhoBotaoFlutuante({ totalItens, subtotal, onAbrir }) {
  if (totalItens === 0) return null

  return (
    <button
      onClick={onAbrir}
      style={{ bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))' }}
      className="fixed inset-x-5 z-30 mx-auto flex max-w-3xl items-center justify-between rounded-2xl bg-tinta px-5 py-4 text-papel shadow-lg transition-transform active:scale-[0.98] sm:inset-x-8"
    >
      <span className="flex items-center gap-2 font-base text-sm font-semibold">
        <span aria-hidden="true">🛒</span>
        {totalItens} {totalItens === 1 ? 'item' : 'itens'}
      </span>
      <span className="font-ticket text-base font-bold">{formatarMoeda(subtotal)}</span>
    </button>
  )
}
