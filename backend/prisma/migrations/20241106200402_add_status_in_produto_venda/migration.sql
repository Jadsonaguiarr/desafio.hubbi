/*
  Warnings:

  - Added the required column `status` to the `produto_venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto_venda" ADD COLUMN     "status" TEXT NOT NULL;
