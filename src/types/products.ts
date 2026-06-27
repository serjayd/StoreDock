import { TShelf } from "./shelves";

export type TProductWithShelf = {
  id: string;
  name: string;
  status: "InStock" | "LowStock" | "OutOfStock";
  sku: string;
  price: number;
  stock: number;
  shelfId: string;
  shelf: TShelf;
};

export type TProduct = {
  id: string;
  name: string;
  status: "InStock" | "LowStock" | "OutOfStock";
  sku: string;
  price: number;
  stock: number;
  shelfId: string;
};
