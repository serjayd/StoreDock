"use client";

import { Cuboid, PanelLeft } from "lucide-react";
import Link from "next/link";
import SidebarNav from "./sidebar-nav";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{
        width: 0,
        opacity: 0,
      }}
      animate={{
        width: isCollapsed ? 80 : 288,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={` border-r bg-sidebar`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent">
              <Cuboid className="text-primary-foreground size-5" />
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          className={`cursor-e-resize ${isCollapsed ? "w-full" : "w-fit"}`}
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <PanelLeft />
        </Button>
      </div>
      <SidebarNav isCollapsed={isCollapsed} />
    </motion.aside>
  );
}
