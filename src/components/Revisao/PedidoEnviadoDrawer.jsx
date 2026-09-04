export default function PedidoEnviadoDrawer({ link, onConcluir, onVoltar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-tinta/50 backdrop-blur-[2px]" />

      <div className="relative flex w-full flex-col overflow-hidden rounded-t-3xl bg-papel p-6 shadow-xl sm:max-w-sm sm:rounded-3xl">
        <span className="text-3xl" aria-hidden="true">📲</span>
        <h2 className="mt-2 font-base text-lg font-bold text-tinta">Pedido pronto</h2>
        <p className="mt-1 text-sm text-tinta-suave">
          O WhatsApp deve ter aberto em outra aba com seu pedido preenchido. Se não abriu, toque no
          link abaixo.
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-2xl bg-aberto px-5 py-4 text-center font-base text-sm font-semibold text-papel"
        >
          Abrir o WhatsApp
        </a>

        <button
          onClick={onConcluir}
          className="mt-3 rounded-2xl bg-tinta px-5 py-4 text-center font-base text-sm font-semibold text-papel"
        >
          ✓ Já enviei — fazer novo pedido
        </button>

        <button
          onClick={onVoltar}
          className="mt-3 font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave"
        >
          ← Voltar e revisar de novo
        </button>
      </div>
    </div>
  )
}