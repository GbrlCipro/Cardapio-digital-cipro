import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useAuth() {
  const [sessao, setSessao] = useState(undefined) // undefined = ainda não sabemos
  const [erroLogin, setErroLogin] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSessao(data.session))

    const { data: assinatura } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSessao(novaSessao)
    })

    return () => assinatura.subscription.unsubscribe()
  }, [])

  async function entrar(email, senha) {
    setErroLogin(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) setErroLogin('E-mail ou senha incorretos.')
    return !error
  }

  async function sair() {
    await supabase.auth.signOut()
  }

  return {
    sessao,
    carregando: sessao === undefined,
    autenticado: Boolean(sessao),
    erroLogin,
    entrar,
    sair,
  }
}
