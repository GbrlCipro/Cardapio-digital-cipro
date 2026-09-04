import { useState } from 'react'
import loja from '../config/loja'

export default function LoginScreen({ onEntrar, erro, onSolicitarRedefinicaoSenha }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [modoRedefinir, setModoRedefinir] = useState(false)
  const [mensagemRedefinir, setMensagemRedefinir] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    await onEntrar(email, senha)
    setEnviando(false)
  }

  async function handleSolicitarRedefinicao(e) {
    e.preventDefault()
    setEnviando(true)
    const resultado = await onSolicitarRedefinicaoSenha(email)
    setEnviando(false)
    setMensagemRedefinir(
      resultado.erro
        ? 'Não foi possível enviar o e-mail. Confira o endereço e tente novamente.'
        : 'Se esse e-mail estiver cadastrado, você vai receber um link para redefinir a senha.'
    )
  }

  if (modoRedefinir) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-papel px-5">
        <form onSubmit={handleSolicitarRedefinicao} className="w-full max-w-sm rounded-2xl border border-linha p-6">
          <h1 className="font-ticket text-lg font-bold text-tinta">Redefinir senha</h1>
          <p className="mt-1 text-sm text-tinta-suave">
            Informe seu e-mail de acesso. Vamos enviar um link para você criar uma senha nova.
          </p>

          <label className="mt-4 block">
            <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
              E-mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
            />
          </label>

          {mensagemRedefinir && <p className="mt-3 font-ticket text-xs text-tinta-suave">{mensagemRedefinir}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-5 w-full rounded-2xl bg-tinta px-5 py-3.5 text-center font-base text-sm font-semibold text-papel disabled:opacity-60"
          >
            {enviando ? 'Enviando…' : 'Enviar link de redefinição'}
          </button>

          <button
            type="button"
            onClick={() => {
              setModoRedefinir(false)
              setMensagemRedefinir(null)
            }}
            className="mt-3 w-full font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave"
          >
            ← Voltar para o login
          </button>
        </form>
      </div>
    )
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

        <button
          type="button"
          onClick={() => setModoRedefinir(true)}
          className="mt-3 w-full font-ticket text-xs font-bold uppercase tracking-wide text-tinta-suave"
        >
          Esqueci minha senha
        </button>
      </form>
    </div>
  )
}