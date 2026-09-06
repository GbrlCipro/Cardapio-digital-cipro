import loja from '../../config/loja'
import { horarioDeHoje } from '../../utils/horarioFuncionamento'

export default function Header({ aberta }) {
  const horarioHoje = horarioDeHoje(loja.horarios, loja.timezone)

  return (
    <header className="relative bg-tinta text-papel">
      {loja.banner && (
        <div className="w-full bg-tinta flex justify-center overflow-hidden">
          <img
            src={loja.banner}
            alt="Banner da Loja"
            className="w-full h-32 sm:h-40 object-contain"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-5 pb-5 pt-6 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-ticket text-[11px] uppercase tracking-[0.25em] text-papel/60">
              {loja.descricaoCurta}
            </p>
            <h1 className="mt-1 font-ticket text-2xl font-bold leading-tight sm:text-3xl">
              {loja.nome}
            </h1>
          </div>

          {loja.logo && (
            <img
              src={loja.logo}
              alt={loja.nome}
              className="h-12 w-12 shrink-0 rounded-full border border-papel/20 object-cover sm:h-14 sm:w-14"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-ticket text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${aberta ? 'bg-aberto' : 'bg-fechado'}`}
              aria-hidden="true"
            />
            <span className={aberta ? 'text-aberto' : 'text-fechado'}>
              {aberta ? 'Aberto agora' : 'Fechado no momento'}
            </span>
          </span>

          {horarioHoje && <span className="text-papel/60">Hoje: {horarioHoje}</span>}
        </div>
      </div>

      {/* Rasgo serrilhado marcando o fim do "cabeçalho da comanda" */}
      <div className="borda-serrilhada h-4 w-full bg-tinta" aria-hidden="true" />
    </header>
  )
}
