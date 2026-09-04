export default function ConfiguracaoAusente() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-papel px-5 text-center">
      <span className="text-3xl" aria-hidden="true">⚙️</span>
      <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">
        Configuração ausente
      </p>
      <p className="max-w-sm text-sm text-tinta-suave">
        As variáveis <code className="rounded bg-papel-dobra px-1">VITE_SUPABASE_URL</code> e{' '}
        <code className="rounded bg-papel-dobra px-1">VITE_SUPABASE_ANON_KEY</code> não foram
        encontradas. Verifique se o arquivo <code className="rounded bg-papel-dobra px-1">.env</code> existe
        na raiz do projeto (veja <code className="rounded bg-papel-dobra px-1">.env.example</code>) e reinicie
        o servidor.
      </p>
    </div>
  )
}