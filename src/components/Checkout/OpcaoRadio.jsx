export default function OpcaoRadio({ nome, label, selecionado, onSelecionar }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors
        ${selecionado ? 'border-tinta bg-papel-dobra' : 'border-linha'}`}
    >
      <input
        type="radio"
        name={nome}
        checked={selecionado}
        onChange={onSelecionar}
        className="h-4 w-4 accent-carimbo"
      />
      <span className="text-sm font-medium text-tinta">{label}</span>
    </label>
  )
}
