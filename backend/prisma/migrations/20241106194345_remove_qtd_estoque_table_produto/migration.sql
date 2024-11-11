/*
  Warnings:

  - You are about to drop the column `descricao` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `qtd_estoque` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produto" DROP COLUMN "descricao",
DROP COLUMN "qtd_estoque";
