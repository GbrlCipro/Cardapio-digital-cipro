export default function QuantidadeStepper({ quantidade, onAlterar, minimo = 1, tamanho = 'normal' }) {
  const diminuir = () => onAlterar(Math.max(minimo, quantidade - 1))
  const aumentar = () => onAlterar(quantidade + 1)

  const tamanhoBotao = tamanho === 'pequeno' ? 'h-8 w-8 text-sm' : 'h-9 w-9 text-base'

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-linha bg-papel px-1 py-1">
      <button
        type="button"
        onClick={diminuir}
        disabled={quantidade <= minimo}
        aria-label="Diminuir quantidade"
        className={`${tamanhoBotao} flex items-center justify-center rounded-full font-ticket font-bold text-tinta transition-colors hover:bg-papel-dobra disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        −
      </button>
      <span className="min-w-[1.5ch] text-center font-ticket text-sm font-bold text-tinta" aria-live="polite">
        {quantidade}
      </span>
      <button
        type="button"
        onClick={aumentar}
        aria-label="Aumentar quantidade"
        className={`${tamanhoBotao} flex items-center justify-center rounded-full font-ticket font-bold text-tinta transition-colors hover:bg-papel-dobra`}
      >
        +
      </button>
    </div>
  )
}
