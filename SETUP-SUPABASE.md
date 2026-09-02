# Configuração do Supabase (login + banco de produtos)

Siga esses passos uma vez só, na sua conta. Depois disso o app funciona sozinho.

## 1. Criar o projeto

1. Crie uma conta em https://supabase.com (tem plano gratuito, suficiente para este projeto).
2. Clique em "New project", escolha um nome (ex: `cardapio-estacao-sabor`) e uma senha de banco (guarde-a, mas ela não é usada no app).
3. Aguarde ~2 minutos até o projeto ficar pronto.

## 2. Criar as tabelas

1. No menu lateral, vá em **SQL Editor** → **New query**.
2. Cole o conteúdo do arquivo `supabase/schema.sql` deste projeto e clique em **Run**.
3. (Opcional) Se quiser começar com o cardápio de demonstração já populado, rode também o conteúdo de `supabase/seed.sql` numa nova query. Se preferir começar do zero com seus produtos reais, pule este passo.

## 3. Criar o usuário administrador

1. Vá em **Authentication** → **Users** → **Add user** → **Create new user**.
2. Preencha o e-mail e a senha que você (ou o dono da loja) vai usar para entrar no painel em `/admin`.
3. Não é preciso confirmar e-mail nem nada além disso — é o único usuário do sistema.

## 4. Pegar as chaves do projeto

1. Vá em **Project Settings** (ícone de engrenagem) → **API**.
2. Copie a **Project URL** e a chave **anon public**.

## 5. Configurar o projeto local

1. Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
2. Cole os valores copiados no passo anterior:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
```

3. Rode `npm install` e depois `npm run dev`.
4. O cardápio público está na raiz (`/`), e o painel administrativo em `/admin`.

## Ao hospedar (Vercel, Netlify, etc.)

Configure as mesmas duas variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) no painel da hospedagem — nunca coloque o arquivo `.env` dentro do repositório enviado para produção.

Os arquivos `public/_redirects` (Netlify) e `vercel.json` (Vercel) já estão configurados para que `/admin` funcione corretamente mesmo com atualização de página (F5) ou acesso direto pelo link.

## O que o painel administrativo edita (e o que não edita)

O painel em `/admin` permite criar, editar, excluir produtos e alternar disponibilidade/destaque rapidamente.

Dados como nome da loja, WhatsApp, endereço, horário de funcionamento, formas de pagamento e taxa de entrega continuam em `src/config/loja.js` — edite esse arquivo diretamente no código quando precisar mudar algo ali (foi uma escolha para manter o projeto simples).
