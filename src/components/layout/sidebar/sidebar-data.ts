import {
  Bell,
  CreditCard,
  Layers,
  LayoutDashboard,
  Package,
  Settings,
  Store,
} from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: Store,
    label: "My Stores",
    link: "/stores",
  },
  {
    icon: Package,
    label: "Products",
    link: "/products",
  },
  {
    icon: Layers,
    label: "Shelves",
    link: "/shelves",
  },
  {
    icon: Bell,
    label: "Alerts",
    link: "/alerts",
  },
  {
    icon: CreditCard,
    label: "Subscription",
    link: "/subscription",
  },
  {
    icon: Settings,
    label: "Settings",
    link: "/settings",
  },
];
