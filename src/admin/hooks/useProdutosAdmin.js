import { supabase } from '../../lib/supabaseClient'
import { produtoParaBanco } from '../../lib/mapearProduto'

function gerarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function useProdutosAdmin(recarregar) {
  async function salvarProduto(produto, idOriginal) {
    const linha = produtoParaBanco(produto)

    if (idOriginal) {
      const { error } = await supabase.from('produtos').update(linha).eq('id', idOriginal)
      if (error) return { erro: error.message }
    } else {
      linha.id = linha.id || `${gerarSlug(produto.nome)}-${Date.now().toString(36)}`
      const { error } = await supabase.from('produtos').insert(linha)
      if (error) return { erro: error.message }
    }

    await recarregar()
    return { erro: null }
  }

  async function excluirProduto(id) {
    const { error } = await supabase.from('produtos').delete().eq('id', id)
    if (!error) await recarregar()
    return { erro: error?.message ?? null }
  }

  async function alternarCampo(id, campo, valor) {
    const { error } = await supabase.from('produtos').update({ [campo]: valor }).eq('id', id)
    if (!error) await recarregar()
    return { erro: error?.message ?? null }
  }

  return { salvarProduto, excluirProduto, alternarCampo }
}
