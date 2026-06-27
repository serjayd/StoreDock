import { TShelf } from "./shelves";

export type TProduct = {
  id: string;
  name: string;
  status: "InStock" | "LowStock" | "OutOfStock";
  sku: string;
  price: number;
  stock: number;
  shelfId: string;
  shelf: TShelf;
};
