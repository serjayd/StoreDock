import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { productStatusLabel, productStatusStyles } from "../constants";
import DeleteProductButton from "./DeleteProductButton";
import { TProductWithShelf } from "@/types/products";

const TABLE_HEAD_ROWS = [
  "Product",
  "SKU",
  "Shelf",
  "Price",
  "Stock",
  "Status",
  "Actions",
];

interface ProductsTableProps {
  allProducts: TProductWithShelf[];
  setEditingProduct: (p: TProductWithShelf) => void;
}

export default function ProductsTable({
  allProducts,
  setEditingProduct,
}: ProductsTableProps) {
  return (
    <section className="border rounded-xl bg-card overflow-x-auto">
      <table className="w-full text-sm ">
        <thead>
          <tr className="border-b">
            {TABLE_HEAD_ROWS.map((row) => (
              <th
                key={row}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {row}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="w-full divide-y divide-border">
          {allProducts.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3 font-medium text-muted-foreground font-mono">
                {p.sku}
              </td>
              <td className="px-4 py-3 font-medium">
                <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                  {p.shelf.name}
                </span>
              </td>
              <td className="px-4 py-3 font-medium">
                £{Number(p.price).toFixed(2)}
              </td>
              <td
                className={`px-4 py-3 font-medium ${p.stock === 0 && "text-chart-5"}`}
              >
                {p.stock}{" "}
                <span className="text-muted-foreground text-xs">units</span>
              </td>
              <td className="px-4 py-3 font-medium">
                <span
                  className={`${productStatusStyles[p.status]} px-2 py-1 text-xs rounded-full`}
                >
                  {productStatusLabel[p.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon-xs"
                    variant="secondary"
                    onClick={() => setEditingProduct(p)}
                  >
                    <SquarePen />
                  </Button>
                  <DeleteProductButton shelfId={p.shelfId} productId={p.id} />
                </div>
              </td>
            </tr>
          ))}
          {allProducts.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-6 text-center font-medium font-mono uppercase text-muted-foreground"
              >
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
