"use client";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import AddProductForm from "./AddProductForm";
import { TShelf } from "@/types/shelves";
import ProductsTable from "./ProductsTable";
import { TProduct } from "@/types/products";
import EditProductForm from "./EditProductForm";
import FilterProducts from "./FilterProducts";

interface ProductsClientWrapperProps {
  shelves: TShelf[];
  allProducts: TProduct[];
}

export default function ProductsClientWrapper({
  shelves,
  allProducts,
}: ProductsClientWrapperProps) {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [shelfId, setShelfId] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" ? true : p.status === status;
      const matchesShelf = shelfId === "all" ? true : p.shelfId === shelfId;

      return matchesSearch && matchesStatus && matchesShelf;
    });
  }, [allProducts, search, status, shelfId]);

  return (
    <div className="overflow-hidden">
      <Container>
        <section className="mb-8 flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Products</h1>
            <p className="text-muted-foreground">
              20 products across 7 shelves
            </p>
          </div>
          <Button
            onClick={() => setAddProductOpen(true)}
            variant="default"
            size="lg"
            className="px-4 cursor-pointer"
          >
            <Plus />
            <span>Add Product</span>
          </Button>
        </section>
        <FilterProducts
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          shelfId={shelfId}
          setShelfId={setShelfId}
          shelves={shelves}
          onReset={() => {
            setSearch("");
            setStatus("all");
            setShelfId("all");
          }}
        />
        <ProductsTable
          allProducts={filteredProducts}
          setEditingProduct={setEditingProduct}
        />
      </Container>
      {addProductOpen && (
        <AddProductForm
          setAddProductOpen={setAddProductOpen}
          shelves={shelves}
        />
      )}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          shelves={shelves}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
