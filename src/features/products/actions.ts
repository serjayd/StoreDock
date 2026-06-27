"use server";

import prisma from "@/lib/prisma";
import { productSchema } from "./schema";
import { getProductStatus } from "@/utils/getProductStatus";
import { revalidatePath } from "next/cache";

export async function addProduct(data: unknown) {
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const { name, sku, price, stock, shelfId } = parsed.data;

  // 1. Get shelf + storeId
  const shelf = await prisma.shelf.findUnique({
    where: { id: shelfId },
    select: { storeId: true },
  });

  if (!shelf) {
    return { error: "Shelf not found" };
  }

  const storeId = shelf.storeId;

  // 2. Check duplicate SKU inside same shelf (or store if you prefer)
  const existingProduct = await prisma.product.findFirst({
    where: {
      sku,
      shelfId,
    },
  });

  if (existingProduct) {
    return {
      error: "A product with this SKU already exists in this store.",
    };
  }

  // 3. Create product
  try {
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        stock,
        shelfId,
        storeId,
        status: getProductStatus(stock),
      },
    });

    revalidatePath("/products");
    return { success: true, product };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while adding the product.",
    };
  }
}

export async function deleteProduct(productId: string, shelfId: string) {
  const shelf = await prisma.shelf.findUnique({
    where: { id: shelfId },
    select: { storeId: true },
  });

  if (!shelf) {
    return { error: "Shelf not found" };
  }

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while deleting the product.",
    };
  }
}

export async function editProduct(productId: string, data: unknown) {
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const { name, sku, price, stock, shelfId } = parsed.data;

  try {
    const shelf = await prisma.shelf.findUnique({
      where: { id: shelfId },
      select: { storeId: true },
    });

    if (!shelf) {
      return { error: "Shelf not found" };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { storeId: true },
    });

    if (!product) {
      return { error: "Product not found" };
    }

    if (product.storeId !== shelf.storeId) {
      return { error: "Unauthorized action" };
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        sku,
        price,
        stock,
        shelfId,
      },
      include: {
        shelf: true,
      },
    });

    revalidatePath("/products");

    return { success: true, product: updated };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while updating the product.",
    };
  }
}
