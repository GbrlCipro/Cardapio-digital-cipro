export default function AvisoBanner({ children }) {
  return (
    <div
      role="alert"
      className="mb-5 flex items-start gap-2 rounded-xl border border-fechado/30 bg-fechado/10 px-4 py-3 text-sm text-fechado"
    >
      <span aria-hidden="true">⚠️</span>
      <span>{children}</span>
    </div>
  )
}
