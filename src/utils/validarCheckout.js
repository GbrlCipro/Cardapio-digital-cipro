import { telefoneValido } from './formatarTelefone'

export function validarCheckout(dados) {
  const erros = {}

  if (!dados.nome.trim()) erros.nome = 'Informe seu nome.'
  if (!dados.whatsapp.trim()) {
    erros.whatsapp = 'Informe seu WhatsApp.'
  } else if (!telefoneValido(dados.whatsapp)) {
    erros.whatsapp = 'Informe um número válido com DDD.'
  }

  if (dados.tipoPedido === 'entrega') {
    if (!dados.endereco.cep.trim()) erros.cep = 'Informe o CEP.'
    if (!dados.endereco.rua.trim()) erros.rua = 'Informe a rua.'
    if (!dados.endereco.numero.trim()) erros.numero = 'Informe o número.'
    if (!dados.endereco.bairro.trim()) erros.bairro = 'Informe o bairro.'
    if (!dados.endereco.cidade.trim()) erros.cidade = 'Informe a cidade.'
    if (!dados.endereco.estado.trim()) erros.estado = 'Informe o estado.'
  }

  if (dados.tipoPedido === 'local' && !dados.mesa.trim()) {
    erros.mesa = 'Informe o número da mesa.'
  }

  if (!dados.formaPagamento) {
    erros.formaPagamento = 'Escolha uma forma de pagamento.'
  }

  if (dados.formaPagamento === 'dinheiro' && dados.precisaTroco === true && !dados.trocoPara.trim()) {
    erros.trocoPara = 'Informe o valor para o troco.'
  }

  return erros
}
