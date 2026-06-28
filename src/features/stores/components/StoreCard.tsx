import { MapPin } from "lucide-react";

import DeleteStoreButton from "./DeleteStoreButton";
import { TStoreWithShelves } from "@/types/store";

interface StoreCardProps {
  store: TStoreWithShelves;
}

export default function StoreCard({ store }: StoreCardProps) {
  const totalProducts = store.products?.length;

  const lowStock = store.products?.filter(
    (p) => p.status === "LowStock",
  ).length;

  const outOfStock = store.products?.filter(
    (p) => p.status === "OutOfStock",
  ).length;

  return (
    <div
      className={`bg-card rounded-2xl border ${store.isActive && "border-chart-1/70"}`}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-start justify-between">
        <div>
          <h2 className="font-semibold mb-0.5">{store.name}</h2>
          <p className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="size-4" /> {store.address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {store.isActive && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-chart-1/15 text-chart-1">
              Active
            </span>
          )}
          <DeleteStoreButton storeId={store.id} />
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-3 divide-x">
        <div className="px-4 py-3 text-center">
          <p>{totalProducts}</p>
          <span className="text-xs text-muted-foreground">Products</span>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-chart-3 font-semibold">{lowStock}</p>
          <span className="text-xs text-muted-foreground">Low Stock</span>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-chart-5 font-semibold">{outOfStock}</p>
          <span className="text-xs text-muted-foreground">Out Of Stock</span>
        </div>
      </div>
      {/* CTA */}
    </div>
  );
}
