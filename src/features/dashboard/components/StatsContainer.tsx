import { TProduct } from "@/types/products";
import { TShelf } from "@/types/shelves";
import StatsCard from "./StatsCard";
import {
  CircleX,
  Package,
  PoundSterling,
  Tag,
  TriangleAlert,
} from "lucide-react";

interface StatsContainerProps {
  shelves: TShelf[];
  products: TProduct[];
}

export default function StatsContainer({
  shelves,
  products,
}: StatsContainerProps) {
  const totalProducts = products.length;
  const totalShelves = shelves.length;

  const lowStockProducts = products?.filter(
    (p) => p.status === "LowStock",
  ).length;

  const outOfStockProducts = products?.filter(
    (p) => p.status === "OutOfStock",
  ).length;

  const totalInventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-5 mb-6">
      <StatsCard
        title="Total Products"
        link="/products"
        styles="bg-chart-1/20 text-chart-1"
        icon={Package}
        value={totalProducts}
      />
      <StatsCard
        title="Total Shelves"
        link="/shelves"
        styles="bg-chart-2/20 text-chart-2"
        icon={Tag}
        value={totalShelves}
      />
      <StatsCard
        title="Low Stock"
        link="/alerts"
        styles="bg-chart-3/20 text-chart-3"
        icon={TriangleAlert}
        value={lowStockProducts}
      />
      <StatsCard
        title="Out of Stock"
        link="/alerts"
        styles="bg-chart-5/20 text-chart-5"
        icon={CircleX}
        value={outOfStockProducts}
      />
      <StatsCard
        title="Inventory Value"
        link="/products"
        styles="bg-chart-4/20 text-chart-4"
        icon={PoundSterling}
        value={`£${totalInventoryValue}`}
      />
    </section>
  );
}
