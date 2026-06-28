import ShelvesClientWrapper from "@/features/shelves/components/ShelvesClientWrapper";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function ShelvesPage() {
  const session = await getSession();

  if (!session?.user?.id) return null;

  const store = await prisma.store.findFirst({
    where: {
      userId: session.user.id,
      isActive: true,
    },
  });

  if (!store) {
    return <ShelvesClientWrapper allShelves={[]} />;
  }

  const allShelves = await prisma.shelf.findMany({
    where: {
      storeId: store.id,
    },
    include: {
      products: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <ShelvesClientWrapper allShelves={allShelves} />;
}
