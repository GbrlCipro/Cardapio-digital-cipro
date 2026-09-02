import { useState } from 'react'
import loja from '../config/loja'
import LoginScreen from './LoginScreen'
import ProdutoForm from './ProdutoForm'
import ProdutoListaAdmin from './ProdutoListaAdmin'
import CardapioCarregando from '../components/CardapioCarregando'
import CardapioErro from '../components/CardapioErro'
import Toast from '../components/Toast'
import { useAuth } from './hooks/useAuth'
import { useCardapio } from '../hooks/useCardapio'
import { useProdutosAdmin } from './hooks/useProdutosAdmin'

export default function AdminApp() {
  const { carregando: carregandoSessao, autenticado, erroLogin, entrar, sair } = useAuth()
  const { categorias, produtos, carregando, erro, recarregar } = useCardapio()
  const { salvarProduto, excluirProduto, alternarCampo } = useProdutosAdmin(recarregar)

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null)
  const [criandoNovo, setCriandoNovo] = useState(false)
  const [mensagemToast, setMensagemToast] = useState(null)

  function avisar(mensagem) {
    setMensagemToast(mensagem)
    setTimeout(() => setMensagemToast(null), 2200)
  }

  if (carregandoSessao) return null

  if (!autenticado) {
    return <LoginScreen onEntrar={entrar} erro={erroLogin} />
  }

  async function handleSalvar(produto, idOriginal) {
    const resultado = await salvarProduto(produto, idOriginal)
    if (!resultado.erro) {
      setProdutoEmEdicao(null)
      setCriandoNovo(false)
      avisar('✓ Produto salvo')
    }
    return resultado
  }

  async function handleExcluir(produto) {
    if (!window.confirm(`Excluir "${produto.nome}"? Essa ação não pode ser desfeita.`)) return
    const resultado = await excluirProduto(produto.id)
    if (!resultado.erro) avisar('✓ Produto excluído')
  }

  async function handleAlternarCampo(id, campo, valor) {
    await alternarCampo(id, campo, valor)
  }

  return (
    <div className="min-h-screen bg-papel">
      <header className="border-b border-linha bg-tinta text-papel">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p className="font-ticket text-[11px] uppercase tracking-[0.25em] text-papel/60">Painel administrativo</p>
            <h1 className="font-ticket text-lg font-bold">{loja.nome}</h1>
          </div>
          <button onClick={sair} className="font-ticket text-xs font-bold uppercase tracking-wide text-papel/70">
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-ticket text-sm font-bold uppercase tracking-wide text-tinta">Produtos</h2>
          <button
            onClick={() => setCriandoNovo(true)}
            className="rounded-full bg-tinta px-4 py-2 font-ticket text-xs font-bold uppercase tracking-wide text-papel"
          >
            + Novo produto
          </button>
        </div>

        {erro && <CardapioErro onTentarNovamente={recarregar} />}
        {!erro && carregando && <CardapioCarregando />}
        {!erro && !carregando && (
          <ProdutoListaAdmin
            categorias={categorias}
            produtos={produtos}
            onEditar={setProdutoEmEdicao}
            onExcluir={handleExcluir}
            onAlternarCampo={handleAlternarCampo}
          />
        )}
      </div>

      {(criandoNovo || produtoEmEdicao) && (
        <ProdutoForm
          categorias={categorias}
          produtoInicial={produtoEmEdicao}
          onCancelar={() => {
            setProdutoEmEdicao(null)
            setCriandoNovo(false)
          }}
          onSalvar={handleSalvar}
        />
      )}

      <Toast mensagem={mensagemToast} />
    </div>
  )
}
