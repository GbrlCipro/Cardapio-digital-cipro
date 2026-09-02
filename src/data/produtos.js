// ============================================================
// CATEGORIAS E PRODUTOS — ARQUIVO LEGADO
// Desde a integração com Supabase, o cardápio público lê os
// dados do banco (veja src/hooks/useCardapio.js), não mais
// daqui. Este arquivo só existe como referência — foi a partir
// dele que supabase/seed.sql foi escrito.
// ============================================================

export const categorias = [
  { id: 'burgers', nome: 'Hambúrgueres', emoji: '🍔' },
  { id: 'porcoes', nome: 'Porções', emoji: '🍟' },
  { id: 'bebidas', nome: 'Bebidas', emoji: '🥤' },
  { id: 'sobremesas', nome: 'Sobremesas', emoji: '🍰' },
]

export const produtos = [
  {
    id: 'x-bacon',
    categoriaId: 'burgers',
    nome: 'X-Bacon',
    descricao: 'Pão brioche, hambúrguer artesanal 160g, queijo, bacon crocante e molho especial da casa.',
    imagem: 'https://picsum.photos/seed/x-bacon/600/450',
    disponivel: true,
    destaque: true,
    precoBase: 29.9,
    variacoes: [],
    adicionais: [
      { id: 'bacon-extra', label: 'Bacon extra', preco: 5 },
      { id: 'queijo-extra', label: 'Queijo extra', preco: 3 },
      { id: 'ovo', label: 'Ovo', preco: 2 },
    ],
  },
  {
    id: 'x-salada',
    categoriaId: 'burgers',
    nome: 'X-Salada',
    descricao: 'Pão brioche, hambúrguer artesanal 160g, queijo, alface, tomate e maionese da casa.',
    imagem: 'https://picsum.photos/seed/x-salada/600/450',
    disponivel: true,
    destaque: false,
    precoBase: 26.9,
    variacoes: [],
    adicionais: [
      { id: 'bacon-extra', label: 'Bacon extra', preco: 5 },
      { id: 'queijo-extra', label: 'Queijo extra', preco: 3 },
      { id: 'ovo', label: 'Ovo', preco: 2 },
    ],
  },
  {
    id: 'x-tudo',
    categoriaId: 'burgers',
    nome: 'X-Tudo',
    descricao: 'Dois hambúrgueres artesanais, queijo duplo, bacon, ovo, alface, tomate e molho especial.',
    imagem: 'https://picsum.photos/seed/x-tudo/600/450',
    disponivel: false,
    destaque: false,
    precoBase: 36.9,
    variacoes: [],
    adicionais: [],
  },
  {
    id: 'batata-frita',
    categoriaId: 'porcoes',
    nome: 'Batata Frita',
    descricao: 'Porção generosa de batatas crocantes, temperadas na hora.',
    imagem: 'https://picsum.photos/seed/batata-frita/600/450',
    disponivel: true,
    destaque: true,
    precoBase: null,
    variacoes: [
      {
        id: 'tamanho',
        nome: 'Tamanho',
        opcoes: [
          { id: 'pequena', label: 'Pequena', preco: 18.0 },
          { id: 'media', label: 'Média', preco: 25.0 },
          { id: 'grande', label: 'Grande', preco: 32.0 },
        ],
      },
    ],
    adicionais: [
      { id: 'cheddar-bacon', label: 'Cheddar e bacon', preco: 8 },
    ],
  },
  {
    id: 'onion-rings',
    categoriaId: 'porcoes',
    nome: 'Onion Rings',
    descricao: 'Anéis de cebola empanados e fritos até ficarem crocantes.',
    imagem: 'https://picsum.photos/seed/onion-rings/600/450',
    disponivel: true,
    destaque: false,
    precoBase: 22.0,
    variacoes: [],
    adicionais: [],
  },
  {
    id: 'coca-2l',
    categoriaId: 'bebidas',
    nome: 'Coca-Cola 2L',
    descricao: 'Garrafa de 2 litros, gelada.',
    imagem: 'https://picsum.photos/seed/coca-2l/600/450',
    disponivel: true,
    destaque: false,
    precoBase: 14.0,
    variacoes: [],
    adicionais: [],
  },
  {
    id: 'suco-laranja',
    categoriaId: 'bebidas',
    nome: 'Suco de Laranja',
    descricao: 'Suco natural, feito na hora.',
    imagem: 'https://picsum.photos/seed/suco-laranja/600/450',
    disponivel: true,
    destaque: false,
    precoBase: null,
    variacoes: [
      {
        id: 'tamanho',
        nome: 'Tamanho',
        opcoes: [
          { id: '300ml', label: '300ml', preco: 8.0 },
          { id: '500ml', label: '500ml', preco: 12.0 },
        ],
      },
    ],
    adicionais: [],
  },
  {
    id: 'petit-gateau',
    categoriaId: 'sobremesas',
    nome: 'Petit Gâteau',
    descricao: 'Bolo de chocolate com recheio cremoso, servido com sorvete de creme.',
    imagem: 'https://picsum.photos/seed/petit-gateau/600/450',
    disponivel: true,
    destaque: true,
    precoBase: 19.9,
    variacoes: [],
    adicionais: [],
  },
]
