import { formatarMoeda } from '../../utils/formatarMoeda'
import QuantidadeStepper from '../Produto/QuantidadeStepper'

export default function CarrinhoItem({ item, onEditar, onRemover, onAlterarQuantidade }) {
  const subtotalItem = item.precoUnitario * item.quantidade

  return (
    <li className="flex gap-3 border-b border-linha py-4 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <button onClick={() => onEditar(item)} className="text-left">
            <p className="font-base text-sm font-semibold text-tinta underline decoration-linha decoration-2 underline-offset-2">
              {item.nome}
            </p>
          </button>
          <p className="shrink-0 font-ticket text-sm font-bold text-tinta">{formatarMoeda(subtotalItem)}</p>
        </div>

        {item.variacaoEscolhida && (
          <p className="mt-0.5 text-xs text-tinta-suave">{item.variacaoEscolhida.label}</p>
        )}

        {item.adicionaisEscolhidos?.length > 0 && (
          <ul className="mt-0.5 text-xs text-tinta-suave">
            {item.adicionaisEscolhidos.map((a) => (
              <li key={a.id}>+ {a.label}</li>
            ))}
          </ul>
        )}

        {item.observacao && (
          <p className="mt-0.5 text-xs italic text-tinta-suave">"{item.observacao}"</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <QuantidadeStepper
            quantidade={item.quantidade}
            onAlterar={(q) => onAlterarQuantidade(item.itemId, q)}
            tamanho="pequeno"
          />
          <button
            onClick={() => onRemover(item.itemId)}
            className="font-ticket text-xs font-bold uppercase tracking-wide text-fechado"
          >
            Remover
          </button>
        </div>
      </div>
    </li>
  )
}
