import { useState } from 'react'
import loja from '../config/loja'

export default function LoginScreen({ onEntrar, erro }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    await onEntrar(email, senha)
    setEnviando(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-papel px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-linha p-6">
        <p className="font-ticket text-[11px] uppercase tracking-[0.25em] text-tinta-suave">
          Painel administrativo
        </p>
        <h1 className="mt-1 font-ticket text-xl font-bold text-tinta">{loja.nome}</h1>

        <div className="mt-6 flex flex-col gap-3">
          <label className="block">
            <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
              E-mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
              Senha
            </span>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
              autoComplete="current-password"
            />
          </label>
        </div>

        {erro && <p className="mt-3 font-ticket text-xs text-fechado">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-5 w-full rounded-2xl bg-tinta px-5 py-3.5 text-center font-base text-sm font-semibold text-papel transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
