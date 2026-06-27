import ProductsClientWrapper from "@/features/products/components/ProductsClientWrapper";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function ProductsPage() {
  const session = await getSession();

  if (!session?.user?.id) return null;

  const store = await prisma.store.findFirst({
    where: {
      userId: session.user.id,
      isActive: true,
    },
    include: {
      shelves: true,
    },
  });

  const allProducts = await prisma.product.findMany({
    where: {
      storeId: store?.id,
    },
    include: {
      shelf: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <ProductsClientWrapper
      shelves={store?.shelves ?? []}
      allProducts={allProducts}
    />
  );
}
