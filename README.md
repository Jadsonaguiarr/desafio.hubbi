<<<<<<< HEAD
Documentação desafio.hubbi

-Motivação
  - A empresa necessitava de um melhor gerenciamento do seu e-commerce, visando o aumento da demanda proporcional ao crescimento da instituição.

-requisitos
  - Cadastro de pedidos de vendas
    - interface para cadastrar uma nova venda
    - interface para visuzalizar todas as vendas

- Cadastrop de pedidos de compras
  - Interface para cadastrar uma compra, permitindo a escolha da venda e do(s) produto(s) que estão sendo comprados
  - interface para visualizar todas as compras

- Tecnologias
  - Backend
    - NodeJs
    - Typescript
    - Postgresql
    - Express
  - Frontend
    - Typescript
    - NextJs
    - Tailwindcss
    - shadcn

- Estrutura do projeto
    - Backend
      - prisma
          - schema.prisma
      - src
          -config 
          - Controller
            - Authenticate.ts
            - CompraController.ts
            - ProdutoController.ts
            - UserController.ts
            - VendaController.ts
          - erros
          - prisma
          - routes
            - authenticate.routes.ts
            - compra.routes.ts
            - index.routes.ts
            - produto.routes.ts
            - user.routes.ts
              - venda.routes.ts
          - server.tsx

- Funcionalidades
  - user
    - Criação de user
      - Existem dois tipos users admins e comuns
    - Pegar um user
  - Autenticação
    - login
    - logout
  - Venda
    - Criar venda
    - Recuperar uma venda
    - Recuperar vendas por user
    - Verificar se a venda foi concluída
    - Pegar todas as vendas
    - Totalizar vendas mensais e o aumento percentual mensal de vendas
  - Produto
    - Criar Produto
    - Recuperar um produto
    - Recuperar todos produtos
  - Compra
    - Criar compra
    - Recuperar todas as vendas



- Como usar o projeto
  - Clone o repositorio
  - entre na pasta desafio.hubbi e rode: docker-compose up --build
  - Espere as imagens carregarem
    - imagens
      - postgresql_hubbi
      - node_frontend
      - node_hubbi
  - Quando tudo carregar abre no seu navegador htttp://localhost:3000 

  
=======
# desafio.hubbi
>>>>>>> 95a38211d0f29a8e19a8904772ab789e6fdb147a
