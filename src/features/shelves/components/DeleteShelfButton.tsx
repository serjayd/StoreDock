"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteShelf } from "../actions";

interface DeleteShelfButtonProps {
  shelfId: string;
  storeId: string;
}

export default function DeleteShelfButton({
  shelfId,
  storeId,
}: DeleteShelfButtonProps) {
  return (
    <Button
      size="icon-sm"
      variant="destructive"
      onClick={async () => {
        await deleteShelf(shelfId, storeId);
      }}
    >
      <Trash />
    </Button>
  );
}
