/*
  Warnings:

  - Added the required column `total` to the `venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "venda" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
