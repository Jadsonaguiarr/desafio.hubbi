/*
  Warnings:

  - You are about to drop the `comprador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_id_comprador_fkey";

-- DropTable
DROP TABLE "comprador";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
