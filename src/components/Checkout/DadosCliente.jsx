import CampoTexto from './CampoTexto'
import { formatarTelefone } from '../../utils/formatarTelefone'

export default function DadosCliente({ dados, onAlterar, erros }) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 font-ticket text-sm font-bold uppercase tracking-wide text-tinta">
        Seus dados
      </h3>
      <div className="flex flex-col gap-3">
        <CampoTexto
          label="Nome"
          obrigatorio
          value={dados.nome}
          onChange={(e) => onAlterar({ ...dados, nome: e.target.value })}
          placeholder="Seu nome completo"
          erro={erros.nome}
        />
        <CampoTexto
          label="WhatsApp"
          obrigatorio
          value={dados.whatsapp}
          onChange={(e) => onAlterar({ ...dados, whatsapp: formatarTelefone(e.target.value) })}
          placeholder="(64) 99999-9999"
          inputMode="numeric"
          erro={erros.whatsapp}
        />
      </div>
    </section>
  )
}
