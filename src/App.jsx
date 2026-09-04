import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Categorias from './components/Categorias/Categorias'
import ProdutoGrid from './components/Produto/ProdutoGrid'
import ProdutoModal from './components/Produto/ProdutoModal'
import CarrinhoBotaoFlutuante from './components/Carrinho/CarrinhoBotaoFlutuante'
import CarrinhoDrawer from './components/Carrinho/CarrinhoDrawer'
import CheckoutDrawer from './components/Checkout/CheckoutDrawer'
import RevisaoDrawer from './components/Revisao/RevisaoDrawer'
import PedidoEnviadoDrawer from './components/Revisao/PedidoEnviadoDrawer'
import CardapioCarregando from './components/CardapioCarregando'
import CardapioErro from './components/CardapioErro'
import Toast from './components/Toast'
import loja from './config/loja'
import { useCardapio } from './hooks/useCardapio'
import { useLojaAberta } from './utils/useLojaAberta'
import { checkoutInicial } from './utils/checkoutInicial'
import { useLocalStorageState } from './utils/useLocalStorageState'
import { gerarMensagemPedido, gerarLinkWhatsapp } from './utils/gerarMensagemWhatsapp'
import { CarrinhoProvider, useCarrinho } from './context/CarrinhoContext'

function AppConteudo() {
  const { categorias, produtos, carregando, erro, recarregar } = useCardapio()

  const [categoriaAtiva, setCategoriaAtiva] = useState(null)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [itemEmEdicao, setItemEmEdicao] = useState(null)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [checkoutAberto, setCheckoutAberto] = useState(false)
  const [revisaoAberta, setRevisaoAberta] = useState(false)
  const [pedidoEnviadoLink, setPedidoEnviadoLink] = useState(null)
  const [dadosCheckout, setDadosCheckout] = useLocalStorageState('cardapio.checkout.v1', checkoutInicial)
  const [mensagemToast, setMensagemToast] = useState(null)

  const aberta = useLojaAberta(loja.horarios, loja.timezone)

  // Enquanto nada foi tocado/rolado ainda, a categoria "ativa" é
  // simplesmente a primeira do cardápio — sem precisar de um efeito.
  const categoriaAtivaExibida = categoriaAtiva ?? categorias[0]?.id ?? null

  // Mantém a aba de categoria ativa sincronizada enquanto o cliente
  // rola manualmente pelo cardápio (não só quando toca numa aba).
  useEffect(() => {
    if (categorias.length === 0) return

    const secoes = categorias
      .map((cat) => document.getElementById(`categoria-${cat.id}`))
      .filter(Boolean)

    if (secoes.length === 0) return

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) {
          const categoriaId = visivel.target.id.replace('categoria-', '')
          setCategoriaAtiva((atual) => (atual === categoriaId ? atual : categoriaId))
        }
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0 }
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [categorias])

  const {
    itens,
    totalItens,
    subtotal,
    adicionarItem,
    atualizarItem,
    removerItem,
    alterarQuantidade,
    limparCarrinho,
  } = useCarrinho()

  useEffect(() => {
    if (!mensagemToast) return
    const timer = setTimeout(() => setMensagemToast(null), 2200)
    return () => clearTimeout(timer)
  }, [mensagemToast])

  function handleSelecionarCategoria(categoriaId) {
    setCategoriaAtiva(categoriaId)
    document
      .getElementById(`categoria-${categoriaId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleEditarItem(item) {
    const produtoDoItem = produtos.find((p) => p.id === item.produtoId)
    if (!produtoDoItem) return
    setCarrinhoAberto(false)
    setItemEmEdicao(item)
    setProdutoSelecionado(produtoDoItem)
  }

  function handleSalvarItem(item) {
    if (itemEmEdicao) {
      atualizarItem(itemEmEdicao.itemId, item)
      setMensagemToast('✓ Item atualizado')
    } else {
      adicionarItem(item)
      setMensagemToast('✓ Adicionado ao carrinho')
    }
    setProdutoSelecionado(null)
    setItemEmEdicao(null)
  }

  function handleFecharModalProduto() {
    setProdutoSelecionado(null)
    setItemEmEdicao(null)
  }

  return (
    <div className="min-h-screen bg-papel">
      <Header aberta={aberta} />

      {erro && <CardapioErro onTentarNovamente={recarregar} />}

      {!erro && carregando && <CardapioCarregando />}

      {!erro && !carregando && (
        <>
          <Categorias
            categorias={categorias}
            categoriaAtiva={categoriaAtivaExibida}
            onSelecionar={handleSelecionarCategoria}
          />
          <ProdutoGrid
            categorias={categorias}
            produtos={produtos}
            onSelecionarProduto={setProdutoSelecionado}
          />
        </>
      )}

      <CarrinhoBotaoFlutuante
        totalItens={totalItens}
        subtotal={subtotal}
        onAbrir={() => setCarrinhoAberto(true)}
      />

      {produtoSelecionado && (
        <ProdutoModal
          produto={produtoSelecionado}
          itemExistente={itemEmEdicao}
          onFechar={handleFecharModalProduto}
          onAdicionar={handleSalvarItem}
        />
      )}

      {carrinhoAberto && (
        <CarrinhoDrawer
          itens={itens}
          totalItens={totalItens}
          subtotal={subtotal}
          onFechar={() => setCarrinhoAberto(false)}
          onEditarItem={handleEditarItem}
          onRemoverItem={removerItem}
          onAlterarQuantidade={alterarQuantidade}
          onLimparCarrinho={limparCarrinho}
          onIrParaCheckout={() => {
            setCarrinhoAberto(false)
            setCheckoutAberto(true)
          }}
        />
      )}

      {checkoutAberto && (
        <CheckoutDrawer
          dados={dadosCheckout}
          onAlterar={setDadosCheckout}
          lojaAberta={aberta}
          onFechar={() => setCheckoutAberto(false)}
          onContinuar={() => {
            setCheckoutAberto(false)
            setRevisaoAberta(true)
          }}
        />
      )}

      {revisaoAberta && (
        <RevisaoDrawer
          itens={itens}
          subtotal={subtotal}
          dadosCheckout={dadosCheckout}
          lojaAberta={aberta}
          onFechar={() => setRevisaoAberta(false)}
          onVoltar={() => {
            setRevisaoAberta(false)
            setCheckoutAberto(true)
          }}
          onEnviar={() => {
            if (!aberta && loja.bloquearPedidoLojaFechada) return
            const mensagem = gerarMensagemPedido({ itens, subtotal, dadosCheckout })
            const link = gerarLinkWhatsapp(mensagem)
            window.open(link, '_blank', 'noopener,noreferrer')
            // Importante: NÃO limpamos o carrinho aqui. Abrir a aba do
            // WhatsApp não é garantia de que o cliente realmente enviou
            // a mensagem — se ele fechar sem enviar, o pedido não pode
            // sumir. A limpeza só acontece quando ele confirma abaixo.
            setRevisaoAberta(false)
            setPedidoEnviadoLink(link)
          }}
        />
      )}

      {pedidoEnviadoLink && (
        <PedidoEnviadoDrawer
          link={pedidoEnviadoLink}
          onVoltar={() => {
            setPedidoEnviadoLink(null)
            setRevisaoAberta(true)
          }}
          onConcluir={() => {
            setPedidoEnviadoLink(null)
            limparCarrinho()
            setDadosCheckout(checkoutInicial)
            setMensagemToast('✓ Pedido concluído. Bom apetite!')
          }}
        />
      )}

      <Toast mensagem={mensagemToast} />
    </div>
  )
}

export default function App() {
  return (
    <CarrinhoProvider>
      <AppConteudo />
    </CarrinhoProvider>
  )
}