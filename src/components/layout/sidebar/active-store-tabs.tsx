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

interface ActiveStoreTabsProps {
  stores: TStore[];
  isCollapsed: boolean;
}

export default function ActiveStoreTabs({
  stores,
  isCollapsed,
}: ActiveStoreTabsProps) {
  const activeStore = stores.find((s) => s.isActive);

  return (
    <div className={`${isCollapsed ? "hidden" : "block"} px-4 py-4 border-b`}>
      <p className="text-xs text-muted-foreground mb-2">Stores</p>

      <Select
        defaultValue={activeStore?.id}
        onValueChange={async (storeId) => {
          await setActiveStore(storeId);
        }}
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
