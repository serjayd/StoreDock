"use client";

import Link from "next/link";
import { SIDEBAR_LINKS } from "./sidebar-data";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface SidebarNavProps {
  isCollapsed: boolean;
}

export default function SidebarNav({ isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-2 px-4 py-6">
        {SIDEBAR_LINKS.map((el) => {
          const activePage = pathname === el.link;
          const Icon = el.icon;

          return (
            <Link
              key={el.label}
              href={el.link}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                activePage
                  ? "text-chart-1 bg-secondary"
                  : "text-muted-foreground hover:bg-secondary/50"
              } transition-colors ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              <Icon className="size-5 shrink-0" />

              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 truncate">
                    {el.label}
                  </span>

                  {activePage && <ChevronRight className="size-3.5 shrink-0" />}
                </>
              )}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
