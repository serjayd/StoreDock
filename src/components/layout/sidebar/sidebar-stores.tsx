"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setActiveStore } from "@/features/stores/actions";
import { TStore } from "@/types/store";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActiveStoreTabsProps {
  stores: TStore[];
  isCollapsed: boolean;
}

export default function SidebarStores({
  stores,
  isCollapsed,
}: ActiveStoreTabsProps) {
  const activeStore = stores.find((s) => s.isActive);

  const [isPending, startTransition] = useTransition();

  const handleChange = (storeId: string) => {
    startTransition(async () => {
      const result = await setActiveStore(storeId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(`Store switched`);
    });
  };

  return (
    <div className={`${isCollapsed ? "hidden" : "block"} px-4 py-4 border-b`}>
      <p className="text-xs text-muted-foreground mb-2">Stores</p>

      <Select
        value={activeStore?.id}
        onValueChange={handleChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a store" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
