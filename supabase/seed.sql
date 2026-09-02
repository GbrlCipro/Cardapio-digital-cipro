-- ============================================================
-- DADOS DE DEMONSTRAÇÃO — rode depois do schema.sql, se quiser
-- começar com o mesmo cardápio de exemplo. Opcional: você pode
-- pular isto e cadastrar os produtos reais direto pelo painel.
-- ============================================================

insert into categorias (id, nome, emoji, ordem) values
  ('burgers', 'Hambúrgueres', '🍔', 1),
  ('porcoes', 'Porções', '🍟', 2),
  ('bebidas', 'Bebidas', '🥤', 3),
  ('sobremesas', 'Sobremesas', '🍰', 4)
on conflict (id) do nothing;

insert into produtos (id, categoria_id, nome, descricao, imagem_url, disponivel, destaque, preco_base, variacoes, adicionais, ordem) values
  ('x-bacon', 'burgers', 'X-Bacon', 'Pão brioche, hambúrguer artesanal 160g, queijo, bacon crocante e molho especial da casa.', 'https://picsum.photos/seed/x-bacon/600/450', true, true, 29.9, '[]', '[{"id":"bacon-extra","label":"Bacon extra","preco":5},{"id":"queijo-extra","label":"Queijo extra","preco":3},{"id":"ovo","label":"Ovo","preco":2}]', 1),
  ('x-salada', 'burgers', 'X-Salada', 'Pão brioche, hambúrguer artesanal 160g, queijo, alface, tomate e maionese da casa.', 'https://picsum.photos/seed/x-salada/600/450', true, false, 26.9, '[]', '[{"id":"bacon-extra","label":"Bacon extra","preco":5},{"id":"queijo-extra","label":"Queijo extra","preco":3},{"id":"ovo","label":"Ovo","preco":2}]', 2),
  ('x-tudo', 'burgers', 'X-Tudo', 'Dois hambúrgueres artesanais, queijo duplo, bacon, ovo, alface, tomate e molho especial.', 'https://picsum.photos/seed/x-tudo/600/450', false, false, 36.9, '[]', '[]', 3),
  ('batata-frita', 'porcoes', 'Batata Frita', 'Porção generosa de batatas crocantes, temperadas na hora.', 'https://picsum.photos/seed/batata-frita/600/450', true, true, null, '[{"id":"tamanho","nome":"Tamanho","opcoes":[{"id":"pequena","label":"Pequena","preco":18},{"id":"media","label":"Média","preco":25},{"id":"grande","label":"Grande","preco":32}]}]', '[{"id":"cheddar-bacon","label":"Cheddar e bacon","preco":8}]', 1),
  ('onion-rings', 'porcoes', 'Onion Rings', 'Anéis de cebola empanados e fritos até ficarem crocantes.', 'https://picsum.photos/seed/onion-rings/600/450', true, false, 22.0, '[]', '[]', 2),
  ('coca-2l', 'bebidas', 'Coca-Cola 2L', 'Garrafa de 2 litros, gelada.', 'https://picsum.photos/seed/coca-2l/600/450', true, false, 14.0, '[]', '[]', 1),
  ('suco-laranja', 'bebidas', 'Suco de Laranja', 'Suco natural, feito na hora.', 'https://picsum.photos/seed/suco-laranja/600/450', true, false, null, '[{"id":"tamanho","nome":"Tamanho","opcoes":[{"id":"300ml","label":"300ml","preco":8},{"id":"500ml","label":"500ml","preco":12}]}]', '[]', 2),
  ('petit-gateau', 'sobremesas', 'Petit Gâteau', 'Bolo de chocolate com recheio cremoso, servido com sorvete de creme.', 'https://picsum.photos/seed/petit-gateau/600/450', true, true, 19.9, '[]', '[]', 1)
on conflict (id) do nothing;
