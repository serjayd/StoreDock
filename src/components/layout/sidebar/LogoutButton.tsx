"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  isCollapsed?: boolean;
}

export default function LogoutButton({ isCollapsed }: LogoutButtonProps) {
  const handleSignout = async () => {
    await signOut();
    window.location.href = "/";
  };
  return (
    <Button
      size="icon-sm"
      variant="ghost"
      className={`text-muted-foreground ${isCollapsed && "w-full"}`}
      onClick={() => handleSignout()}
    >
      <LogOut />
    </Button>
  );
}
