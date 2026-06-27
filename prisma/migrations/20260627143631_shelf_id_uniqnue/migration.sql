/*
  Warnings:

  - A unique constraint covering the columns `[shelfId,sku]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "product_storeId_sku_key";

-- CreateIndex
CREATE UNIQUE INDEX "product_shelfId_sku_key" ON "product"("shelfId", "sku");
