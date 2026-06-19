import { Button } from "@/components/ui/button";
import { TUser } from "@/types/user";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  user: TUser | null;
}

export default function HeaderMobile({ user }: HeaderProps) {
  return (
    <div className="md:hidden p-6 space-y-4 border-t bg-background/95">
      <div className="flex flex-col gap-4">
        <Link href="#" className="opacity-60 hover:opacity-100">
          Features
        </Link>
        <Link href="#" className="opacity-60 hover:opacity-100">
          Pricing
        </Link>
        <Link href="#" className="opacity-60 hover:opacity-100">
          Testimonials
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {!user ? (
          <>
            <Button variant="outline" asChild className="w-full">
              <Link href="/sign-in">Sign In</Link>
            </Button>

            <Button asChild className="w-full">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </>
        ) : (
          <Button asChild className="w-full col-span-2">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
