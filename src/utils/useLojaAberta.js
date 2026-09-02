import { useEffect, useState } from 'react'
import { lojaEstaAberta } from './horarioFuncionamento'

const INTERVALO_ATUALIZACAO_MS = 30_000

/**
 * Calcula se a loja está aberta e mantém o valor atualizado enquanto
 * o cliente navega — importante porque a aba pode ficar aberta
 * durante a virada de um horário de funcionamento.
 */
export function useLojaAberta(horarios, timezone) {
  const [aberta, setAberta] = useState(() => lojaEstaAberta(horarios, timezone))

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAberta(lojaEstaAberta(horarios, timezone))
    }, INTERVALO_ATUALIZACAO_MS)
    return () => clearInterval(intervalo)
  }, [horarios, timezone])

  return aberta
}
