"use server";

import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { storeSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function createStore(data: unknown) {
  const parsed = storeSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const session = await requireSession();

  const { name, address, type, shelves = [] } = parsed.data;

  try {
    const store = await prisma.store.create({
      data: {
        userId: session.user.id,
        name,
        address,
        type,

        shelves: {
          create: shelves.map((shelf) => ({
            name: shelf.name,
          })),
        },
      },
      include: {
        shelves: true,
      },
    });

    revalidatePath("/stores");
    return { success: true, store };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while creating the store." };
  }
}

export async function setActiveStore(storeId: string) {
  const session = await requireSession();

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: session.user.id,
    },
  });

  if (!store) {
    return { error: "Store not found." };
  }

  await prisma.$transaction([
    prisma.store.updateMany({
      where: {
        userId: session.user.id,
      },
      data: {
        isActive: false,
      },
    }),

    prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        isActive: true,
      },
    }),
  ]);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteStore(storeId: string) {
  const session = await requireSession();

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: session.user.id,
    },
  });

  if (!store) {
    return { error: "Store not found." };
  }

  await prisma.store.delete({
    where: {
      id: storeId,
    },
  });

  revalidatePath("/stores");
  return { success: true };
}
