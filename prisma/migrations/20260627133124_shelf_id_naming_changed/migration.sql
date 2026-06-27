/*
  Warnings:

  - You are about to drop the column `shelveId` on the `product` table. All the data in the column will be lost.
  - Added the required column `shelfId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_shelveId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "shelveId",
ADD COLUMN     "shelfId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;
