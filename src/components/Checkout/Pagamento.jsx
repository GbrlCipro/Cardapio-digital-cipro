import loja from '../../config/loja'
import CampoTexto from './CampoTexto'
import OpcaoRadio from './OpcaoRadio'

export default function Pagamento({ dados, onAlterar, erros }) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 font-ticket text-sm font-bold uppercase tracking-wide text-tinta">
        Forma de pagamento
      </h3>

      <div className="flex flex-col gap-2">
        {loja.formasPagamento.map((forma) => (
          <OpcaoRadio
            key={forma.id}
            nome="pagamento"
            label={forma.label}
            selecionado={dados.formaPagamento === forma.id}
            onSelecionar={() =>
              onAlterar({ ...dados, formaPagamento: forma.id, precisaTroco: null, trocoPara: '' })
            }
          />
        ))}
      </div>
      {erros.formaPagamento && (
        <p className="mt-2 font-ticket text-[11px] text-fechado">{erros.formaPagamento}</p>
      )}

      {dados.formaPagamento === 'dinheiro' && (
        <div className="mt-4 rounded-xl border border-linha p-4">
          <p className="mb-2 font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
            Precisa de troco?
          </p>
          <div className="flex gap-2">
            <OpcaoRadio
              nome="precisaTroco"
              label="Não"
              selecionado={dados.precisaTroco === false}
              onSelecionar={() => onAlterar({ ...dados, precisaTroco: false, trocoPara: '' })}
            />
            <OpcaoRadio
              nome="precisaTroco"
              label="Sim"
              selecionado={dados.precisaTroco === true}
              onSelecionar={() => onAlterar({ ...dados, precisaTroco: true })}
            />
          </div>

          {dados.precisaTroco === true && (
            <CampoTexto
              className="mt-3"
              label="Troco para quanto?"
              obrigatorio
              value={dados.trocoPara}
              onChange={(e) => onAlterar({ ...dados, trocoPara: e.target.value.replace(/[^\d,]/g, '') })}
              placeholder="Ex: 100,00"
              inputMode="decimal"
              erro={erros.trocoPara}
            />
          )}
        </div>
      )}
    </section>
  )
}
