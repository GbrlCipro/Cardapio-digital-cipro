export default function CampoTexto({
  label,
  obrigatorio,
  erro,
  className = '',
  ...inputProps
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
        {label}
        {obrigatorio && <span className="text-carimbo"> *</span>}
      </span>
      <input
        {...inputProps}
        className={`w-full rounded-xl border bg-papel px-4 py-3 text-sm text-tinta placeholder:text-tinta-suave/60 focus:outline-none
          ${erro ? 'border-fechado' : 'border-linha focus:border-tinta'}`}
      />
      {erro && <span className="mt-1 block font-ticket text-[11px] text-fechado">{erro}</span>}
    </label>
  )
}
