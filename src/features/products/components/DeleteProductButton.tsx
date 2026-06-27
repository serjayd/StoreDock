"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteProduct } from "../actions";

export default function DeleteProductButton({
  shelfId,
  productId,
}: {
  shelfId: string;
  productId: string;
}) {
  return (
    <Button
      variant="destructive"
      size="icon-xs"
      onClick={async () => {
        await deleteProduct(productId, shelfId);
      }}
    >
      <Trash />
    </Button>
  );
}
