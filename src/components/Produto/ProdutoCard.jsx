import { useState } from 'react'
import { formatarMoeda } from '../../utils/formatarMoeda'
import { precoExibicao } from '../../utils/precoProduto'

export default function ProdutoCard({ produto, onSelecionar }) {
  const { valor, aPartirDe } = precoExibicao(produto)
  const indisponivel = !produto.disponivel
  const [imagemComErro, setImagemComErro] = useState(false)

  return (
    <button
      onClick={() => !indisponivel && onSelecionar(produto)}
      disabled={indisponivel}
      className={`group flex w-full items-stretch gap-4 rounded-2xl border border-linha bg-papel p-3 text-left transition-shadow
        ${indisponivel ? 'opacity-50' : 'hover:shadow-[0_2px_0_0_theme(colors.tinta)] active:translate-y-px'}`}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-papel-dobra sm:h-28 sm:w-28">
        {imagemComErro ? (
          <div className="flex h-full w-full items-center justify-center text-2xl" aria-hidden="true">
            🍽️
          </div>
        ) : (
          <img
            src={produto.imagem}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImagemComErro(true)}
          />
        )}
        {produto.destaque && !indisponivel && (
          <span className="absolute left-1 top-1 rounded-full bg-carimbo px-2 py-0.5 font-ticket text-[10px] font-bold uppercase tracking-wide text-papel">
            Destaque
          </span>
        )}
        {indisponivel && (
          <span className="absolute inset-0 flex items-center justify-center bg-tinta/60 font-ticket text-[10px] font-bold uppercase tracking-wide text-papel">
            Indisponível
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <h3 className="truncate font-base text-base font-semibold text-tinta">{produto.nome}</h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-tinta-suave">{produto.descricao}</p>
        </div>
        <p className="mt-2 font-ticket text-sm font-bold text-tinta">
          {aPartirDe && <span className="font-base font-normal text-tinta-suave">a partir de </span>}
          {formatarMoeda(valor)}
        </p>
      </div>
    </button>
  )
}
