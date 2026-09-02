export default function ObservacaoPedido({ valor, onAlterar }) {
  return (
    <section className="mb-2">
      <label className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
        Alguma observação sobre o pedido?
      </label>
      <textarea
        value={valor}
        onChange={(e) => onAlterar(e.target.value)}
        placeholder="Ex: entregar depois das 20h"
        rows={2}
        maxLength={200}
        className="w-full resize-none rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta placeholder:text-tinta-suave/60 focus:border-tinta focus:outline-none"
      />
    </section>
  )
}
