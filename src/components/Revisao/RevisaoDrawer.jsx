import { useEffect } from 'react'
import loja from '../../config/loja'
import AvisoBanner from '../AvisoBanner'
import { formatarMoeda } from '../../utils/formatarMoeda'
import { calcularTotalPedido } from '../../utils/calcularTotalPedido'

const LABEL_TIPO_PEDIDO = {
  entrega: '🚚 Entrega',
  retirada: '🏪 Retirada no local',
  local: '🍽️ Consumo no local',
}

const LABEL_PAGAMENTO = {
  pix: 'Pix',
  dinheiro: 'Dinheiro',
  credito: 'Cartão de crédito',
  debito: 'Cartão de débito',
}

export default function RevisaoDrawer({ itens, subtotal, dadosCheckout, lojaAberta, onFechar, onVoltar, onEnviar }) {
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

  const { taxaEntrega, total } = calcularTotalPedido(subtotal, dadosCheckout.tipoPedido, loja.taxaEntrega)
  const envioBloqueado = !lojaAberta && loja.bloquearPedidoLojaFechada

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button aria-label="Fechar revisão" onClick={onFechar} className="absolute inset-0 bg-tinta/50 backdrop-blur-[2px]" />

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-papel shadow-xl sm:max-w-lg sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between border-b border-linha px-5 py-4 sm:px-6">
          <button onClick={onVoltar} className="font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">
            ← Voltar
          </button>
          <h2 className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">Revisar pedido</h2>
          <button onClick={onFechar} aria-label="Fechar" className="font-ticket text-xl font-bold text-tinta-suave">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {!lojaAberta && (
            <AvisoBanner>
              {envioBloqueado
                ? 'A loja está fechada no momento. Você pode revisar o pedido, mas o envio pelo WhatsApp só é liberado durante o horário de funcionamento.'
                : 'A loja está fechada no momento, mas ainda é possível enviar o pedido — a confirmação pode demorar um pouco mais.'}
            </AvisoBanner>
          )}

          {/* PEDIDO */}
          <section className="mb-5">
            <h3 className="mb-2 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">Pedido</h3>
            <ul className="flex flex-col gap-3">
              {itens.map((item) => (
                <li key={item.itemId} className="text-sm">
                  <div className="flex justify-between font-semibold text-tinta">
                    <span>{item.quantidade}x {item.nome}</span>
                    <span className="font-ticket">{formatarMoeda(item.precoUnitario * item.quantidade)}</span>
                  </div>
                  {item.variacaoEscolhida && (
                    <p className="text-xs text-tinta-suave">• {item.variacaoEscolhida.label}</p>
                  )}
                  {item.adicionaisEscolhidos?.map((a) => (
                    <p key={a.id} className="text-xs text-tinta-suave">• {a.label}</p>
                  ))}
                  {item.observacao && (
                    <p className="text-xs italic text-tinta-suave">"{item.observacao}"</p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* VALORES */}
          <section className="mb-5 border-t pt-4 font-ticket text-sm" style={{ borderColor: 'var(--color-linha)' }}>
            <div className="flex justify-between text-tinta-suave">
              <span>Subtotal</span>
              <span>{formatarMoeda(subtotal)}</span>
            </div>
            {dadosCheckout.tipoPedido === 'entrega' && (
              <div className="flex justify-between text-tinta-suave">
                <span>Entrega</span>
                <span>{formatarMoeda(taxaEntrega)}</span>
              </div>
            )}
            <div className="mt-1 flex justify-between text-base font-bold text-tinta">
              <span>Total</span>
              <span>{formatarMoeda(total)}</span>
            </div>
          </section>

          {/* CLIENTE */}
          <section className="mb-5 border-t pt-4 text-sm" style={{ borderColor: 'var(--color-linha)' }}>
            <h3 className="mb-1 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">Cliente</h3>
            <p className="text-tinta">{dadosCheckout.nome}</p>
            <p className="text-tinta-suave">{dadosCheckout.whatsapp}</p>
          </section>

          {/* TIPO / ENDEREÇO / MESA */}
          <section className="mb-5 border-t pt-4 text-sm" style={{ borderColor: 'var(--color-linha)' }}>
            <h3 className="mb-1 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">
              {LABEL_TIPO_PEDIDO[dadosCheckout.tipoPedido]}
            </h3>
            {dadosCheckout.tipoPedido === 'entrega' && (
              <p className="text-tinta-suave">
                {dadosCheckout.endereco.rua}, {dadosCheckout.endereco.numero}
                {dadosCheckout.endereco.complemento && ` — ${dadosCheckout.endereco.complemento}`}
                <br />
                {dadosCheckout.endereco.bairro}, {dadosCheckout.endereco.cidade} - {dadosCheckout.endereco.estado}
                {dadosCheckout.endereco.referencia && (
                  <>
                    <br />Referência: {dadosCheckout.endereco.referencia}
                  </>
                )}
              </p>
            )}
            {dadosCheckout.tipoPedido === 'local' && (
              <p className="text-tinta-suave">Mesa {dadosCheckout.mesa}</p>
            )}
          </section>

          {/* PAGAMENTO */}
          <section className="mb-5 border-t pt-4 text-sm" style={{ borderColor: 'var(--color-linha)' }}>
            <h3 className="mb-1 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">Pagamento</h3>
            <p className="text-tinta-suave">
              {LABEL_PAGAMENTO[dadosCheckout.formaPagamento]}
              {dadosCheckout.formaPagamento === 'dinheiro' && (
                dadosCheckout.precisaTroco
                  ? ` — troco para R$ ${dadosCheckout.trocoPara}`
                  : ' — sem troco'
              )}
            </p>
          </section>

          {dadosCheckout.observacao && (
            <section className="border-t pt-4 text-sm" style={{ borderColor: 'var(--color-linha)' }}>
              <h3 className="mb-1 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave">Observação</h3>
              <p className="text-tinta-suave">{dadosCheckout.observacao}</p>
            </section>
          )}
        </div>

        <div className="espaco-seguro-inferior shrink-0 bg-papel px-5 pb-5 pt-4 sm:px-6" style={{ borderTop: '2px dashed var(--color-linha)' }}>
          <button
            onClick={onEnviar}
            disabled={envioBloqueado}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-center font-base text-sm font-semibold transition-transform
              ${envioBloqueado
                ? 'cursor-not-allowed bg-papel-dobra text-tinta-suave'
                : 'bg-aberto text-papel active:scale-[0.98]'
              }`}
          >
            <span aria-hidden="true">{envioBloqueado ? '🔒' : '✓'}</span>
            {envioBloqueado ? 'Loja fechada — envio indisponível' : 'Enviar pedido pelo WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  )
}
