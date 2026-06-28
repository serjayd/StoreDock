import { StoreType } from "@/features/stores/schema";
import { TShelf } from "./shelves";
import { TProduct } from "./products";

export type TStore = {
  id: string;
  userId: string;
  name: string;
  type: StoreType;
  address: string;
  isActive: boolean;
};

export type TStoreWithShelves = {
  id: string;
  userId: string;
  name: string;
  type: StoreType;
  address: string;
  isActive: boolean;
  shelves?: TShelf[];
  products?: TProduct[];
};
