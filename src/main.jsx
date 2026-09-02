import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'

// Roteamento mínimo: só existem duas "páginas" (cardápio público e
// painel administrativo), então uma biblioteca de rotas seria
// complexidade desnecessária para este projeto.
const ehAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {ehAdmin ? <AdminApp /> : <App />}
  </StrictMode>,
)
