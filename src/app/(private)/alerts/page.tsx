import Container from "@/components/shared/Container";
import LowStockTable from "@/features/alerts/components/LowStockTable";
import OutOfStockTable from "@/features/alerts/components/OutOfStockTable";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Bell } from "lucide-react";

export default async function AlertsPage() {
  const session = await getSession();

  const store = await prisma.store.findFirst({
    where: {
      userId: session?.user.id,
      isActive: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      storeId: store?.id,
    },
    include: {
      shelf: true,
    },
  });

  const lowStockProducts = products.filter(
    (product) => product.status === "LowStock",
  );

  const outOfStockProducts = products.filter(
    (product) => product.status === "OutOfStock",
  );

  const activeAlerts = products.filter((p) => p.status !== "InStock").length;

  return (
    <Container>
      <section className="mb-8 flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">Alerts</h1>
          <p className="text-muted-foreground">7 items need your attention</p>
        </div>
        <div className="bg-chart-5/20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium">
          <Bell className="size-4 text-chart-5" />
          <p className="text-chart-5">{activeAlerts} Active Alerts</p>
        </div>
      </section>
      <div className="space-y-6">
        <OutOfStockTable outOfStockProducts={outOfStockProducts} />
        <LowStockTable lowStockProducts={lowStockProducts} />
      </div>
    </Container>
  );
}
