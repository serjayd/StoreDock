"use client";

import { TProduct } from "@/types/products";
import DeleteShelfButton from "./DeleteShelfButton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { updateShelf } from "../actions";

interface ShelvesContainerProps {
  allShelves: {
    id: string;
    name: string;
    storeId: string;
    products: TProduct[];
  }[];
}

export default function ShelvesContainer({
  allShelves,
}: ShelvesContainerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  async function saveName(shelfId: string) {
    await updateShelf(shelfId, editingName);

    setEditingId(null);
    setEditingName("");
  }
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {allShelves.map((s) => {
        const inStock = s.products.filter((p) => p.status === "InStock").length;

        const lowStock = s.products.filter(
          (p) => p.status === "LowStock",
        ).length;

        const outOfStock = s.products.filter(
          (p) => p.status === "OutOfStock",
        ).length;

        const allProducts = s.products.length;

        const health =
          allProducts === 0
            ? 100
            : Math.round(
                ((inStock * 100 + lowStock * 50) / (allProducts * 100)) * 100,
              );

        const healthColor =
          allProducts === 0
            ? "bg-muted"
            : health < 25
              ? "bg-chart-5"
              : health <= 75
                ? "bg-chart-3"
                : "bg-chart-1";

        return (
          <div key={s.id} className="bg-card border p-4 rounded-xl group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                {editingId === s.id ? (
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    autoFocus
                    className="mb-3"
                    onBlur={() => {
                      setEditingId(null);
                      setEditingName("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveName(s.id);

                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditingName("");
                      }
                    }}
                  />
                ) : (
                  <h2
                    className="font-medium hover:cursor-text mb-0.5"
                    onClick={() => {
                      setEditingId(s.id);
                      setEditingName(s.name);
                    }}
                    title="Click to rename"
                  >
                    {s.name}
                  </h2>
                )}
                <p className="text-muted-foreground text-xs">
                  {s.products.length} products
                </p>
              </div>

              <div className="lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                <DeleteShelfButton shelfId={s.id} storeId={s.storeId} />
              </div>
            </div>
            <div className="h-1 w-full rounded-full bg-muted mb-4">
              <div
                className={`h-1 rounded-full transition-all ${healthColor}`}
                style={{ width: `${health}%` }}
              />
            </div>
            <div className="flex items-center gap-3 text-xs">
              {inStock > 0 && (
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-chart-1 block" />
                  <span className="font-medium text-chart-1">
                    {inStock} in stock
                  </span>
                </div>
              )}
              {lowStock > 0 && (
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-chart-3 block" />
                  <span className="font-medium text-chart-3">
                    {lowStock} low stock
                  </span>
                </div>
              )}
              {outOfStock > 0 && (
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-chart-5 block" />
                  <span className="font-medium text-chart-5">
                    {outOfStock} out of stock
                  </span>
                </div>
              )}
              {allProducts === 0 && (
                <p className="text-muted-foreground">Empty Shelf</p>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
