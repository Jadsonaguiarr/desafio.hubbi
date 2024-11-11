-- CreateTable
CREATE TABLE "comprador" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "comprador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venda" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_comprador" TEXT NOT NULL,

    CONSTRAINT "venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compra" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compra_produto" (
    "id" TEXT NOT NULL,
    "qtd_produto" INTEGER NOT NULL,
    "id_produto" TEXT NOT NULL,
    "id_compra" TEXT NOT NULL,

    CONSTRAINT "compra_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_venda" (
    "id" TEXT NOT NULL,
    "qtd_produto" INTEGER NOT NULL,
    "id_produto" TEXT NOT NULL,
    "id_venda" TEXT NOT NULL,

    CONSTRAINT "produto_venda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "comprador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra_produto" ADD CONSTRAINT "compra_produto_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra_produto" ADD CONSTRAINT "compra_produto_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_venda" ADD CONSTRAINT "produto_venda_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_venda" ADD CONSTRAINT "produto_venda_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
