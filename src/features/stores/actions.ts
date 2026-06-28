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
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        stores: true,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.plan === "free" && user.stores.length >= 1) {
      return {
        error: "Upgrade to Premium to create more stores.",
      };
    }

    const isFirstStore = user.stores.length === 0;

    const store = await prisma.store.create({
      data: {
        userId: session.user.id,
        name,
        address,
        type,

        isActive: isFirstStore,

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

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      stores: true,
    },
  });

  if (!user) {
    return { error: "User not found." };
  }

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: session.user.id,
    },
  });

  // 🔒 FREE PLAN RULE
  if (user.plan === "free") {
    if (!store) {
      return { error: "Store not found." };
    }

    // FREE users cannot switch if they somehow have multiple stores
    const storeCount = await prisma.store.count({
      where: {
        userId: session.user.id,
      },
    });

    if (storeCount > 1) {
      return {
        error: "Upgrade to Premium to switch stores.",
      };
    }
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
    return {
      error: "Store not found.",
    };
  }

  const wasActive = store.isActive;

  await prisma.store.delete({
    where: {
      id: storeId,
    },
  });

  if (wasActive) {
    const nextStore = await prisma.store.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (nextStore) {
      await prisma.store.update({
        where: {
          id: nextStore.id,
        },
        data: {
          isActive: true,
        },
      });
    }
  }

  revalidatePath("/stores");

  return {
    success: true,
  };
}
