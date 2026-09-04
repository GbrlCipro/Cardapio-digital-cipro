import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import loja from '../config/loja'

export default function RedefinirSenhaScreen() {
  const [prontoParaRedefinir, setProntoParaRedefinir] = useState(false)
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    const { data: assinatura } = supabase.auth.onAuthStateChange((evento) => {
      if (evento === 'PASSWORD_RECOVERY') setProntoParaRedefinir(true)
    })
    return () => assinatura.subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setEnviando(true)
    const { error } = await supabase.auth.updateUser({ password: senha })
    setEnviando(false)

    if (error) {
      setErro('Não foi possível atualizar a senha. Tente solicitar um novo link.')
    } else {
      setSucesso(true)
    }
  }

  if (sucesso) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-papel px-5 text-center">
        <span className="text-3xl" aria-hidden="true">✓</span>
        <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">Senha atualizada</p>
        <a href="/admin" className="mt-3 font-ticket text-xs font-bold uppercase tracking-wide text-carimbo">
          Ir para o login
        </a>
      </div>
    )
  }

  if (!prontoParaRedefinir) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-papel px-5 text-center">
        <p className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta-suave">
          Verificando o link…
        </p>
        <p className="max-w-sm text-sm text-tinta-suave">
          Se nada acontecer em alguns segundos, o link pode ter expirado — solicite um novo em
          <code className="ml-1 rounded bg-papel-dobra px-1">/admin</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-papel px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-linha p-6">
        <h1 className="font-ticket text-lg font-bold text-tinta">{loja.nome}</h1>
        <p className="mt-1 text-sm text-tinta-suave">Escolha sua nova senha.</p>

        <div className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
              Nova senha
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-ticket text-xs font-bold uppercase tracking-wide text-tinta">
              Confirmar nova senha
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full rounded-xl border border-linha bg-papel px-4 py-3 text-sm text-tinta focus:border-tinta focus:outline-none"
            />
          </label>
        </div>

        {erro && <p className="mt-3 font-ticket text-xs text-fechado">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-5 w-full rounded-2xl bg-tinta px-5 py-3.5 text-center font-base text-sm font-semibold text-papel disabled:opacity-60"
        >
          {enviando ? 'Salvando…' : 'Salvar nova senha'}
        </button>
      </form>
    </div>
  )
}