/*
  Warnings:

  - A unique constraint covering the columns `[storeId,sku]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storeId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_sku_key";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "storeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_storeId_sku_key" ON "product"("storeId", "sku");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
