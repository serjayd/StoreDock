"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import CreateStoreForm from "@/features/stores/components/create-store-form";

interface StoresClientLayoutProps {
  children: React.ReactNode;
}

export default function StoresClientWrapper({
  children,
}: StoresClientLayoutProps) {
  const [addStoreOpen, setAddStoreOpen] = useState(false);

  return (
    <section>
      <Container>
        <div className="mb-8 flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">My Stores</h1>
            <p className="text-muted-foreground">Manage your business stores</p>
          </div>
          <Button
            onClick={() => setAddStoreOpen((prev) => !prev)}
            variant="default"
            size="lg"
            className="px-4 cursor-pointer"
          >
            <Plus />
            <span>Add Store</span>
          </Button>
        </div>
        {children}
      </Container>
      {addStoreOpen && <CreateStoreForm setAddStoreOpen={setAddStoreOpen} />}
    </section>
  );
}
