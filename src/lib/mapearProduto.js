export function produtoDoBanco(linha) {
  return {
    id: linha.id,
    categoriaId: linha.categoria_id,
    nome: linha.nome,
    descricao: linha.descricao ?? '',
    imagem: linha.imagem_url ?? '',
    disponivel: linha.disponivel,
    destaque: linha.destaque,
    precoBase: linha.preco_base !== null ? Number(linha.preco_base) : null,
    variacoes: linha.variacoes ?? [],
    adicionais: linha.adicionais ?? [],
    ordem: linha.ordem ?? 0,
  }
}

export function produtoParaBanco(produto) {
  return {
    id: produto.id,
    categoria_id: produto.categoriaId,
    nome: produto.nome,
    descricao: produto.descricao || null,
    imagem_url: produto.imagem || null,
    disponivel: produto.disponivel,
    destaque: produto.destaque,
    preco_base: produto.precoBase,
    variacoes: produto.variacoes ?? [],
    adicionais: produto.adicionais ?? [],
    ordem: produto.ordem ?? 0,
  }
}

export function categoriaDoBanco(linha) {
  return {
    id: linha.id,
    nome: linha.nome,
    emoji: linha.emoji ?? '',
    ordem: linha.ordem ?? 0,
  }
}
