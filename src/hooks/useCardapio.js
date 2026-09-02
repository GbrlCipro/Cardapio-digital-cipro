import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { categoriaDoBanco, produtoDoBanco } from '../lib/mapearProduto'

export function useCardapio() {
  const [categorias, setCategorias] = useState([])
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const recarregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)

    const [resCategorias, resProdutos] = await Promise.all([
      supabase.from('categorias').select('*').order('ordem'),
      supabase.from('produtos').select('*').order('ordem'),
    ])

    if (resCategorias.error || resProdutos.error) {
      setErro(resCategorias.error ?? resProdutos.error)
      setCarregando(false)
      return
    }

    setCategorias(resCategorias.data.map(categoriaDoBanco))
    setProdutos(resProdutos.data.map(produtoDoBanco))
    setCarregando(false)
  }, [])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  return { categorias, produtos, carregando, erro, recarregar }
}
