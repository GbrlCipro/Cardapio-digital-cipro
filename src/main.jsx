import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import RedefinirSenhaScreen from './admin/RedefinirSenhaScreen.jsx'
import ConfiguracaoAusente from './components/ConfiguracaoAusente.jsx'
import { supabaseConfigurado } from './lib/supabaseClient.js'

// Roteamento mínimo: só existem três "páginas" (cardápio público,
// painel administrativo e redefinição de senha), então uma
// biblioteca de rotas seria complexidade desnecessária aqui.
const caminho = window.location.pathname

function Raiz() {
  // Nem o cardápio público nem o painel funcionam sem o Supabase
  // configurado — melhor avisar claramente do que quebrar em branco.
  if (!supabaseConfigurado) return <ConfiguracaoAusente />

  if (caminho.startsWith('/admin/redefinir-senha')) return <RedefinirSenhaScreen />
  if (caminho.startsWith('/admin')) return <AdminApp />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Raiz />
  </StrictMode>,
)