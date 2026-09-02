import { useEffect, useState } from 'react'
import DadosCliente from './DadosCliente'
import TipoPedido from './TipoPedido'
import Pagamento from './Pagamento'
import ObservacaoPedido from './ObservacaoPedido'
import AvisoBanner from '../AvisoBanner'
import loja from '../../config/loja'
import { validarCheckout } from '../../utils/validarCheckout'

export default function CheckoutDrawer({ dados, onAlterar, lojaAberta, onFechar, onContinuar }) {
  const [erros, setErros] = useState({})

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

  function handleContinuar() {
    const errosEncontrados = validarCheckout(dados)
    setErros(errosEncontrados)

    if (Object.keys(errosEncontrados).length === 0) {
      onContinuar()
    } else {
      // Leva o usuário de volta ao topo do formulário para ver os erros.
      document.getElementById('checkout-conteudo')?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button aria-label="Fechar checkout" onClick={onFechar} className="absolute inset-0 bg-tinta/50 backdrop-blur-[2px]" />

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-papel shadow-xl sm:max-w-lg sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between border-b border-linha px-5 py-4 sm:px-6">
          <h2 className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">Finalizar pedido</h2>
          <button onClick={onFechar} aria-label="Fechar" className="font-ticket text-xl font-bold text-tinta-suave">
            ×
          </button>
        </div>

        <div id="checkout-conteudo" className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {!lojaAberta && loja.bloquearPedidoLojaFechada && (
            <AvisoBanner>
              A loja está fechada no momento. Você pode preencher tudo, mas o envio pelo WhatsApp só é liberado durante o horário de funcionamento.
            </AvisoBanner>
          )}
          <DadosCliente dados={dados} onAlterar={onAlterar} erros={erros} />
          <TipoPedido dados={dados} onAlterar={onAlterar} erros={erros} />
          <Pagamento dados={dados} onAlterar={onAlterar} erros={erros} />
          <ObservacaoPedido
            valor={dados.observacao}
            onAlterar={(observacao) => onAlterar({ ...dados, observacao })}
          />
        </div>

        <div className="espaco-seguro-inferior shrink-0 bg-papel px-5 pb-5 pt-4 sm:px-6" style={{ borderTop: '2px dashed var(--color-linha)' }}>
          <button
            onClick={handleContinuar}
            className="w-full rounded-2xl bg-tinta px-5 py-4 text-center font-base text-sm font-semibold text-papel transition-transform active:scale-[0.98]"
          >
            Revisar pedido
          </button>
        </div>
      </div>
    </div>
  )
}
