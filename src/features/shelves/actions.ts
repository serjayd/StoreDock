"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { shelfSchema } from "./schema";
import { requireSession } from "@/lib/session";

export async function addShelf(data: unknown) {
  const parsed = shelfSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const { name } = parsed.data;

  try {
    const session = await requireSession();

    const store = await prisma.store.findFirst({
      where: {
        userId: session.user.id,
        isActive: true,
      },
    });

    if (!store) {
      return { error: "No active store found." };
    }

    const shelf = await prisma.shelf.create({
      data: {
        name,
        storeId: store.id,
      },
    });

    revalidatePath("/shelves");
    return { success: true, shelf };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while adding the shelf.",
    };
  }
}

export async function deleteShelf(shelfId: string, storeId: string) {
  const shelf = await prisma.shelf.delete({
    where: { id: shelfId, storeId },
  });

  if (!shelf) {
    return { error: "Shelf not found." };
  }
  revalidatePath("/shelves");
  return { success: true };
}

export async function updateShelf(shelfId: string, name: string) {
  if (!name || name.trim().length === 0) {
    return { error: "Name is required." };
  }

  try {
    const shelf = await prisma.shelf.update({
      where: { id: shelfId },
      data: {
        name: name.trim(),
      },
    });

    revalidatePath("/shelves");

    return { success: true, shelf };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while updating the shelf.",
    };
  }
}
