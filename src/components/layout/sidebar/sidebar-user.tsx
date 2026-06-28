import { TUser } from "@/types/user";
import LogoutButton from "./LogoutButton";

interface SidebarUserProps {
  user: TUser | null;
  isCollapsed: boolean;
}

export default function SidebarUser({ user, isCollapsed }: SidebarUserProps) {
  const userLogoTemplate = user?.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="px-4 py-6 border-t">
      <div
        className={`bg-card flex items-center justify-between ${isCollapsed ? "p-1" : "px-3 py-2.5"} rounded-lg`}
      >
        <div
          className={`${isCollapsed ? "hidden" : "flex"} items-center gap-2.5`}
        >
          <div className="size-7 rounded-full flex items-center justify-center text-xs bg-chart-2 font-semibold shrink-0">
            {user?.image || userLogoTemplate}
          </div>
          <div>
            <h2 className="text-xs font-medium truncate">{user?.name}</h2>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <LogoutButton isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
