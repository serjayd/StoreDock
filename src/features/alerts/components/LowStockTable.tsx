import { TProductWithShelf } from "@/types/products";
import { TriangleAlert } from "lucide-react";

interface LowStockTableProps {
  lowStockProducts: TProductWithShelf[];
}

export default function LowStockTable({
  lowStockProducts,
}: LowStockTableProps) {
  return (
    <section className="border rounded-xl bg-card">
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col divide-y">
          <div className="flex items-center gap-3 p-4 bg-chart-3/10 rounded-tl-xl rounded-tr-xl">
            <TriangleAlert className="size-5 text-chart-3" />
            <h2 className="text-chart-3 text-sm font-semibold">
              Low Stock — {lowStockProducts.length} items
            </h2>
          </div>
          {lowStockProducts.map((p) => (
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
                <p className="font-semibold text-chart-3 sm:text-end text-sm">
                  {p.stock} units
                </p>
                <p className="text-muted-foreground text-sm">
                  Threshold: {p.shelf.lowStockThreshold}
                </p>
              </div>
            </div>
          ))}
          {lowStockProducts.length === 0 && (
            <p className="text-center text-sm mt-2 text-muted-foreground p-4 uppercase font-mono">
              No products are currently running low on stock.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
