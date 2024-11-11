/*
  Warnings:

  - Added the required column `id_venda` to the `compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compra" ADD COLUMN     "id_venda" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
