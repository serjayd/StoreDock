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
      { name: "Fruit & Vegetables" },
      { name: "Dairy" },
      { name: "Bakery" },
      { name: "Meat & Poultry" },
      { name: "Frozen Foods" },
      { name: "Drinks" },
      { name: "Snacks" },
      { name: "Household Essentials" },
    ],
  },
  {
    icon: PawPrint,
    type: "Pet",
    label: "Pet Shop",
    description: "Everything your furry, feathered, and finned friends need.",
    styles: "bg-chart-2/10 text-chart-2",
    shelves: [
      { name: "Dog Food" },
      { name: "Cat Food" },
      { name: "Treats" },
      { name: "Toys" },
      { name: "Beds & Furniture" },
      { name: "Collars & Leads" },
      { name: "Aquatics" },
      { name: "Pet Health" },
    ],
  },
  {
    icon: Origami,
    type: "Toy",
    label: "Toy Store",
    description: "Curated toys and games for every age and every adventure.",
    styles: "bg-chart-3/10 text-chart-3",
    shelves: [
      { name: "Action Figures" },
      { name: "Board Games" },
      { name: "Puzzles" },
      { name: "Educational Toys" },
      { name: "Building Blocks" },
      { name: "Arts & Crafts" },
      { name: "Outdoor Toys" },
      { name: "Remote Control Toys" },
    ],
  },
  {
    icon: Wind,
    type: "Vape",
    label: "Vape Shop",
    description: "Premium vaping products, e-liquids, and accessories.",
    styles: "bg-chart-4/10 text-chart-4",
    shelves: [
      { name: "Disposable Vapes" },
      { name: "Pod Systems" },
      { name: "Starter Kits" },
      { name: "E-Liquids" },
      { name: "Nicotine Salts" },
      { name: "Coils" },
      { name: "Tanks & Pods" },
      { name: "Accessories" },
    ],
  },
  {
    icon: Laptop,
    type: "Electronics",
    label: "Electronics Store",
    description: "Phones, laptops, gaming gear, and smart home devices.",
    styles: "bg-chart-5/10 text-chart-5",
    shelves: [
      { name: "Smartphones" },
      { name: "Laptops" },
      { name: "Tablets" },
      { name: "Gaming" },
      { name: "PC Components" },
      { name: "Audio" },
      { name: "Smart Home" },
      { name: "Accessories" },
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
