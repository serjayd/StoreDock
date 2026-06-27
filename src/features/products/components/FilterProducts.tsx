"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TShelf } from "@/types/shelves";
import { RotateCcw, Search } from "lucide-react";

interface FilterProductsProps {
  search: string;
  setSearch: (v: string) => void;

  status: string;
  setStatus: (v: string) => void;

  shelfId: string;
  setShelfId: (v: string) => void;

  shelves: TShelf[];

  onReset: () => void;
}

export default function FilterProducts({
  search,
  setSearch,
  status,
  setStatus,
  shelves,
  shelfId,
  setShelfId,
  onReset,
}: FilterProductsProps) {
  return (
    <section className="mb-4 grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Search */}
      <div className="relative md:col-span-7">
        <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Search by name or SKU..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="md:col-span-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="InStock">In Stock</SelectItem>
              <SelectItem value="LowStock">Low Stock</SelectItem>
              <SelectItem value="OutOfStock">Out Of Stock</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Shelf */}
      <div className="md:col-span-2">
        <Select value={shelfId} onValueChange={setShelfId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Shelf" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Shelfs</SelectItem>
              {shelves.map((shelf) => (
                <SelectItem key={shelf.id} value={shelf.id}>
                  {shelf.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      <div className="md:col-span-1 flex justify-end">
        <Button
          variant="outline"
          onClick={onReset}
          size="icon"
          className="w-full"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </section>
  );
}
