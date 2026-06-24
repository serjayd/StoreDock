/*
  Warnings:

  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shelves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_shelveId_fkey";

-- DropForeignKey
ALTER TABLE "shelves" DROP CONSTRAINT "shelves_storeId_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_userId_fkey";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "shelves";

-- DropTable
DROP TABLE "stores";

-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "StoreType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelf" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "shelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "status" "ProductStatus" NOT NULL,
    "shelveId" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelf" ADD CONSTRAINT "shelf_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shelveId_fkey" FOREIGN KEY ("shelveId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;
