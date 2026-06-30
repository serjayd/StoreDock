import { TProductWithShelf } from "@/types/products";
import { CircleX } from "lucide-react";

interface outOfStockTableProps {
  outOfStockProducts: TProductWithShelf[];
}

export default function OutOfStockTable({
  outOfStockProducts,
}: outOfStockTableProps) {
  return (
    <section className="border rounded-xl bg-card">
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col divide-y">
          <div className="flex items-center gap-3 p-4 bg-chart-5/10 rounded-tl-xl rounded-tr-xl">
            <CircleX className="size-5 text-chart-5" />
            <h2 className="text-chart-5 text-sm font-semibold">
              Out of Stock — {outOfStockProducts.length} items
            </h2>
          </div>
          {outOfStockProducts.map((p) => (
            <div
              key={p.id}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
            >
              <div className="pb-2 sm:pb-0">
                <h3 className="mb-0.5 font-medium truncate">{p.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.shelf.name} · <span className="font-mono">{p.sku}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-chart-5 sm:text-end text-sm">
                  {p.stock} units
                </p>
                <p className="text-muted-foreground text-sm">
                  Threshold: {p.shelf.lowStockThreshold}
                </p>
              </div>
            </div>
          ))}
          {outOfStockProducts.length === 0 && (
            <p className="text-center text-sm mt-2 text-muted-foreground p-4 uppercase font-mono">
              No products are completely out of stock right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
