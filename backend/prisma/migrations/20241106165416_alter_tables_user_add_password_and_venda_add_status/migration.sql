-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "venda" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Entregar';
