import { useEffect, useState } from 'react'

/**
 * Como o carrinho vive em memória por padrão, este hook garante que
 * ele sobreviva a um F5 salvando (e recarregando) o estado do localStorage.
 */
export function useLocalStorageState(chave, valorInicial) {
  const [estado, setEstado] = useState(() => {
    try {
      const salvo = window.localStorage.getItem(chave)
      return salvo ? JSON.parse(salvo) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(estado))
    } catch {
      // Armazenamento indisponível (modo privado, cota excedida, etc.) —
      // o carrinho segue funcionando normalmente em memória.
    }
  }, [chave, estado])

  return [estado, setEstado]
}
