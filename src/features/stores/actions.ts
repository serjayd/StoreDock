"use server";

import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { storeSchema } from "./schema";

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

    return { success: true, store };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while creating the store." };
  }
}
