"use server";

import { revalidatePath } from "next/cache";
import { userSchema } from "./schema";

import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function editUser(data: unknown) {
  const parsed = userSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const session = await requireSession();

  const { name, email } = parsed.data;

  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name,
        email,
      },
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while updating the user.",
    };
  }
}
