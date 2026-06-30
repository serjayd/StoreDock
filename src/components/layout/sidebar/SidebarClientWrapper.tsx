"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Cuboid, PanelLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SidebarNav from "./sidebar-nav";
import { TStore } from "@/types/store";
import SidebarStores from "./sidebar-stores";
import SidebarUser from "./sidebar-user";
import { TUser } from "@/types/user";

interface SidebarClientLayoutProps {
  stores: TStore[];
  user: TUser | null;
  activeAlerts: number;
}

export default function SidebarClientLayout({
  stores,
  user,
  activeAlerts,
}: SidebarClientLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: isCollapsed ? 80 : 288,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="border-r bg-sidebar h-screen flex flex-col fixed left-0 top-0 z-10"
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent">
              <Cuboid className="size-5 text-background" />
            </div>
          </Link>
        )}

        <Button
          variant="ghost"
          className={isCollapsed ? "w-full" : "w-fit"}
          onClick={() => setIsCollapsed((p) => !p)}
        >
          <PanelLeft />
        </Button>
      </div>

      <div className="flex flex-col flex-1">
        <SidebarStores stores={stores} isCollapsed={isCollapsed} />
        <SidebarNav isCollapsed={isCollapsed} activeAlerts={activeAlerts} />
      </div>
      <SidebarUser user={user} isCollapsed={isCollapsed} />
    </motion.aside>
  );
}
