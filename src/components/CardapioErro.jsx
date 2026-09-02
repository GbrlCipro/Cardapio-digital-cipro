export default function CardapioErro({ onTentarNovamente }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-5 py-20 text-center sm:px-8">
      <span className="text-3xl" aria-hidden="true">⚠️</span>
      <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">
        Não foi possível carregar o cardápio
      </p>
      <p className="max-w-xs text-sm text-tinta-suave">
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <button
        onClick={onTentarNovamente}
        className="mt-2 rounded-full bg-tinta px-5 py-2.5 font-ticket text-xs font-bold uppercase tracking-wide text-papel"
      >
        Tentar novamente
      </button>
    </div>
  )
}
