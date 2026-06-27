"use client";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ShelvesContainer from "./ShelvesContainer";
import { TProduct } from "@/types/products";
import { useState } from "react";
import AddShelfForm from "./AddShelfForm";

interface ShelvesClientWrapperProps {
  allShelves: {
    id: string;
    name: string;
    storeId: string;
    products: TProduct[];
  }[];
}

export default function ShelvesClientWrapper({
  allShelves,
}: ShelvesClientWrapperProps) {
  const [addShelfOpen, setAddShelfOpen] = useState(false);

  return (
    <div>
      <Container>
        <section className="mb-8 flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Shelves</h1>
            <p className="text-muted-foreground">
              {allShelves.length} shelves total
            </p>
          </div>
          <Button
            onClick={() => setAddShelfOpen(true)}
            variant="default"
            size="lg"
            className="px-4 cursor-pointer"
          >
            <Plus />
            <span>Add Shelf</span>
          </Button>
        </section>
        <ShelvesContainer allShelves={allShelves} />
      </Container>
      {addShelfOpen && <AddShelfForm setAddShelfOpen={setAddShelfOpen} />}
    </div>
  );
}
