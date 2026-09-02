export default function Toast({ mensagem }) {
  if (!mensagem) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-tinta px-5 py-2.5 font-ticket text-xs font-bold text-papel shadow-lg"
    >
      {mensagem}
    </div>
  )
}
