"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { deleteStore } from "../actions";

export default function DeleteStoreButton({ storeId }: { storeId: string }) {
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await deleteStore(storeId);
      }}
    >
      <X />
    </Button>
  );
}
