import loja from '../../config/loja'
import { formatarMoeda } from '../../utils/formatarMoeda'
import { formatarCep } from '../../utils/formatarCep'
import CampoTexto from './CampoTexto'
import OpcaoRadio from './OpcaoRadio'

export default function TipoPedido({ dados, onAlterar, erros }) {
  function alterarEndereco(campo, valor) {
    onAlterar({ ...dados, endereco: { ...dados.endereco, [campo]: valor } })
  }

  return (
    <section className="mb-6">
      <h3 className="mb-3 font-ticket text-sm font-bold uppercase tracking-wide text-tinta">
        Como você quer receber?
      </h3>

      <div className="flex flex-col gap-2">
        {loja.tiposPedido.map((tipo) => (
          <OpcaoRadio
            key={tipo.id}
            nome="tipoPedido"
            label={tipo.label}
            selecionado={dados.tipoPedido === tipo.id}
            onSelecionar={() => onAlterar({ ...dados, tipoPedido: tipo.id })}
          />
        ))}
      </div>

      {dados.tipoPedido === 'entrega' && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-linha p-4">
          <div className="grid grid-cols-2 gap-3">
            <CampoTexto
              label="CEP"
              obrigatorio
              value={dados.endereco.cep}
              onChange={(e) => alterarEndereco('cep', formatarCep(e.target.value))}
              placeholder="00000-000"
              inputMode="numeric"
              erro={erros.cep}
              className="col-span-1"
            />
            <CampoTexto
              label="Número"
              obrigatorio
              value={dados.endereco.numero}
              onChange={(e) => alterarEndereco('numero', e.target.value)}
              placeholder="Nº"
              erro={erros.numero}
              className="col-span-1"
            />
          </div>
          <CampoTexto
            label="Rua"
            obrigatorio
            value={dados.endereco.rua}
            onChange={(e) => alterarEndereco('rua', e.target.value)}
            placeholder="Nome da rua"
            erro={erros.rua}
          />
          <CampoTexto
            label="Complemento"
            value={dados.endereco.complemento}
            onChange={(e) => alterarEndereco('complemento', e.target.value)}
            placeholder="Apto, bloco, referência interna (opcional)"
          />
          <CampoTexto
            label="Bairro"
            obrigatorio
            value={dados.endereco.bairro}
            onChange={(e) => alterarEndereco('bairro', e.target.value)}
            placeholder="Bairro"
            erro={erros.bairro}
          />
          <div className="grid grid-cols-2 gap-3">
            <CampoTexto
              label="Cidade"
              obrigatorio
              value={dados.endereco.cidade}
              onChange={(e) => alterarEndereco('cidade', e.target.value)}
              erro={erros.cidade}
            />
            <CampoTexto
              label="Estado"
              obrigatorio
              value={dados.endereco.estado}
              onChange={(e) => alterarEndereco('estado', e.target.value.toUpperCase().slice(0, 2))}
              placeholder="GO"
              erro={erros.estado}
            />
          </div>
          <CampoTexto
            label="Ponto de referência"
            value={dados.endereco.referencia}
            onChange={(e) => alterarEndereco('referencia', e.target.value)}
            placeholder="Ex: próximo ao mercado (opcional)"
          />
          <p className="font-ticket text-[11px] text-tinta-suave">
            Não encontrou seu endereço? Sem problema — preencha os campos manualmente.
          </p>
          <p className="flex items-center justify-between border-t border-linha pt-3 font-ticket text-xs font-bold text-tinta">
            <span>Taxa de entrega</span>
            <span>{formatarMoeda(loja.taxaEntrega)}</span>
          </p>
        </div>
      )}

      {dados.tipoPedido === 'retirada' && (
        <div className="mt-4 rounded-xl border border-linha p-4 text-sm">
          <p className="font-semibold text-tinta">Retirar em:</p>
          <p className="mt-1 text-tinta-suave">
            {loja.endereco.rua}, {loja.endereco.numero} — {loja.endereco.bairro}, {loja.endereco.cidade}/{loja.endereco.estado}
          </p>
        </div>
      )}

      {dados.tipoPedido === 'local' && (
        <div className="mt-4">
          <CampoTexto
            label="Número da mesa"
            obrigatorio
            value={dados.mesa}
            onChange={(e) => onAlterar({ ...dados, mesa: e.target.value })}
            placeholder="Ex: 12"
            inputMode="numeric"
            erro={erros.mesa}
          />
        </div>
      )}
    </section>
  )
}
