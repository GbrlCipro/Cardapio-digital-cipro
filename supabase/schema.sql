-- ============================================================
-- SCHEMA DO CARDÁPIO — rode isto no SQL Editor do seu projeto
-- Supabase (Project > SQL Editor > New query > colar e rodar).
-- ============================================================

create table if not exists categorias (
  id text primary key,           -- slug, ex: 'burgers'
  nome text not null,
  emoji text,
  ordem int not null default 0
);

create table if not exists produtos (
  id text primary key,           -- slug, ex: 'x-bacon'
  categoria_id text not null references categorias(id) on delete cascade,
  nome text not null,
  descricao text,
  imagem_url text,
  disponivel boolean not null default true,
  destaque boolean not null default false,
  preco_base numeric(10,2),      -- null quando o produto tem variação obrigatória
  variacoes jsonb not null default '[]',   -- [{ id, nome, opcoes: [{ id, label, preco }] }]
  adicionais jsonb not null default '[]',  -- [{ id, label, preco }]
  ordem int not null default 0,
  atualizado_em timestamptz not null default now()
);

-- Mantém "atualizado_em" sempre em dia a cada edição.
create or replace function marcar_atualizado()
returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_produtos_atualizado on produtos;
create trigger trigger_produtos_atualizado
  before update on produtos
  for each row execute function marcar_atualizado();

-- ============================================================
-- SEGURANÇA (Row Level Security)
-- Qualquer pessoa pode LER (o cardápio é público).
-- Só usuários autenticados (o admin) podem CRIAR/EDITAR/EXCLUIR.
-- ============================================================

alter table categorias enable row level security;
alter table produtos enable row level security;

create policy "Categorias são públicas para leitura"
  on categorias for select
  using (true);

create policy "Produtos são públicos para leitura"
  on produtos for select
  using (true);

create policy "Só autenticado pode escrever categorias"
  on categorias for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Só autenticado pode escrever produtos"
  on produtos for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
