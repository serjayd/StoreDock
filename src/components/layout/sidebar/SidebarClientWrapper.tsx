"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Cuboid, PanelLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ActiveStoreTabs from "./active-store-tabs";
import SidebarNav from "./sidebar-nav";
import { TStore } from "@/types/store";

interface SidebarClientLayoutProps {
  stores: TStore[];
}

export default function SidebarClientLayout({
  stores,
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
      className="border-r bg-sidebar"
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

      <ActiveStoreTabs stores={stores} isCollapsed={isCollapsed} />

      <SidebarNav isCollapsed={isCollapsed} />
    </motion.aside>
  );
}
