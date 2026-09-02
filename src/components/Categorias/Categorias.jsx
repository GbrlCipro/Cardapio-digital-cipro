export default function Categorias({ categorias, categoriaAtiva, onSelecionar }) {
  return (
    <nav
      className="sticky top-0 z-20 border-b border-linha bg-papel/95 backdrop-blur"
      aria-label="Categorias do cardápio"
    >
      <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-5 py-3 sm:px-8" style={{ scrollbarWidth: 'thin' }}>
        {categorias.map((cat) => {
          const ativa = cat.id === categoriaAtiva
          return (
            <button
              key={cat.id}
              onClick={() => onSelecionar(cat.id)}
              aria-current={ativa ? 'true' : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 font-ticket text-xs font-bold uppercase tracking-wide transition-colors
                ${ativa
                  ? 'border-carimbo bg-carimbo text-papel'
                  : 'border-linha bg-papel text-tinta-suave hover:border-tinta-suave'
                }`}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.nome}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
