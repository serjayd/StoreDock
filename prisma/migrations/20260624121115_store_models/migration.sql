-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('InStock', 'LowStock', 'OutOfStock');

-- CreateEnum
CREATE TYPE "StoreType" AS ENUM ('Grocery', 'Pet', 'Toy', 'Vape', 'Electronics', 'Custom');

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
CREATE TABLE "shelve" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "shelve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Stock" INTEGER NOT NULL,
    "Status" "ProductStatus" NOT NULL,
    "shelveId" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelve" ADD CONSTRAINT "shelve_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shelveId_fkey" FOREIGN KEY ("shelveId") REFERENCES "shelve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
