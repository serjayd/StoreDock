import {
  Laptop,
  LucideIcon,
  Origami,
  PawPrint,
  ShoppingCart,
  Wind,
  Zap,
} from "lucide-react";
import { StoreType } from "./schema";

export type TShelf = {
  name: string;
  lowStockThreshold: number;
};

export type TStore = {
  icon: LucideIcon;
  type: StoreType;
  label: string;
  description: string;
  styles: string;
  shelves?: TShelf[];
};

export const STORE_DATA: TStore[] = [
  {
    icon: ShoppingCart,
    type: "Grocery",
    label: "Grocery Store",
    description:
      "Full-service grocery with fresh produce, dairy, and packaged goods.",
    styles: "bg-chart-1/10 text-chart-1",
    shelves: [
      { name: "Fruit & Vegetables", lowStockThreshold: 20 },
      { name: "Dairy", lowStockThreshold: 16 },
      { name: "Bakery", lowStockThreshold: 12 },
      { name: "Meat & Poultry", lowStockThreshold: 10 },
      { name: "Frozen Foods", lowStockThreshold: 15 },
      { name: "Drinks", lowStockThreshold: 24 },
      { name: "Snacks", lowStockThreshold: 30 },
      { name: "Household Essentials", lowStockThreshold: 8 },
    ],
  },
  {
    icon: PawPrint,
    type: "Pet",
    label: "Pet Shop",
    description: "Everything your furry, feathered, and finned friends need.",
    styles: "bg-chart-2/10 text-chart-2",
    shelves: [
      { name: "Dog Food", lowStockThreshold: 8 },
      { name: "Cat Food", lowStockThreshold: 8 },
      { name: "Treats", lowStockThreshold: 15 },
      { name: "Toys", lowStockThreshold: 10 },
      { name: "Beds & Furniture", lowStockThreshold: 3 },
      { name: "Collars & Leads", lowStockThreshold: 5 },
      { name: "Aquatics", lowStockThreshold: 6 },
      { name: "Pet Health", lowStockThreshold: 5 },
    ],
  },
  {
    icon: Origami,
    type: "Toy",
    label: "Toy Store",
    description: "Curated toys and games for every age and every adventure.",
    styles: "bg-chart-3/10 text-chart-3",
    shelves: [
      { name: "Action Figures", lowStockThreshold: 10 },
      { name: "Board Games", lowStockThreshold: 6 },
      { name: "Puzzles", lowStockThreshold: 8 },
      { name: "Educational Toys", lowStockThreshold: 6 },
      { name: "Building Blocks", lowStockThreshold: 8 },
      { name: "Arts & Crafts", lowStockThreshold: 10 },
      { name: "Outdoor Toys", lowStockThreshold: 4 },
      { name: "Remote Control Toys", lowStockThreshold: 3 },
    ],
  },
  {
    icon: Wind,
    type: "Vape",
    label: "Vape Shop",
    description: "Premium vaping products, e-liquids, and accessories.",
    styles: "bg-chart-4/10 text-chart-4",
    shelves: [
      { name: "Disposable Vapes", lowStockThreshold: 20 },
      { name: "Pod Systems", lowStockThreshold: 10 },
      { name: "Starter Kits", lowStockThreshold: 5 },
      { name: "E-Liquids", lowStockThreshold: 15 },
      { name: "Nicotine Salts", lowStockThreshold: 15 },
      { name: "Coils", lowStockThreshold: 20 },
      { name: "Tanks & Pods", lowStockThreshold: 10 },
      { name: "Accessories", lowStockThreshold: 5 },
    ],
  },
  {
    icon: Laptop,
    type: "Electronics",
    label: "Electronics Store",
    description: "Phones, laptops, gaming gear, and smart home devices.",
    styles: "bg-chart-5/10 text-chart-5",
    shelves: [
      { name: "Smartphones", lowStockThreshold: 3 },
      { name: "Laptops", lowStockThreshold: 2 },
      { name: "Tablets", lowStockThreshold: 3 },
      { name: "Gaming", lowStockThreshold: 4 },
      { name: "PC Components", lowStockThreshold: 8 },
      { name: "Audio", lowStockThreshold: 6 },
      { name: "Smart Home", lowStockThreshold: 5 },
      { name: "Accessories", lowStockThreshold: 20 },
    ],
  },
  {
    icon: Zap,
    type: "Custom",
    label: "Custom Store",
    description: "Start from scratch and build your own category structure.",
    styles: "bg-secondary-foreground/10 text-secondary-foreground/80",
    shelves: [],
  },
];
