import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigurado = Boolean(url && anonKey)

if (!supabaseConfigurado) {
  // Ajuda a diagnosticar rapidamente um .env não configurado,
  // em vez de deixar o app quebrar silenciosamente numa tela branca.
  console.error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env (veja .env.example).'
  )
}

// Só cria o client de verdade se as duas variáveis existirem — criar
// com strings vazias faz o SDK lançar um erro ao tentar interpretar
// a URL, derrubando a aplicação inteira antes de qualquer render.
export const supabase = supabaseConfigurado ? createClient(url, anonKey) : null