import Container from "@/components/shared/Container";
import GraphsContainer from "@/features/dashboard/components/GraphsContainer";
import StatsContainer from "@/features/dashboard/components/StatsContainer";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();

  const store = await prisma.store.findFirst({
    where: {
      userId: session?.user.id,
      isActive: true,
    },
  });

  const shelves = await prisma.shelf.findMany({
    where: {
      storeId: store?.id,
    },
    include: {
      products: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      storeId: store?.id,
    },
  });

  const unitsPerShelf = shelves.map((shelf) => ({
    shelf: shelf.name,
    units: shelf.products.reduce((sum, product) => sum + product.stock, 0),
  }));

  const stockStatus = [
    {
      name: "In Stock",
      value: products?.filter((p) => p.status === "InStock").length,
    },
    {
      name: "Low Stock",
      value: products?.filter((p) => p.status === "LowStock").length,
    },
    {
      name: "Out of Stock",
      value: products?.filter((p) => p.status === "OutOfStock").length,
    },
  ];

  const inventoryValue = shelves.map((shelf) => ({
    shelf: shelf.name,
    value: shelf.products.reduce(
      (sum, product) => sum + product.price * product.stock,
      0,
    ),
  }));

  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container>
      <section className="mb-8 flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{store?.name}</h1>
          <p className="text-muted-foreground">
            {formattedDate} — Real-time inventory overview · {store?.name} Store
          </p>
        </div>
      </section>
      <StatsContainer shelves={shelves} products={products} />
      <GraphsContainer
        unitsPerShelf={unitsPerShelf}
        stockStatus={stockStatus}
        inventoryValue={inventoryValue}
      />
    </Container>
  );
}
