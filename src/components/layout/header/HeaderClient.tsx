"use client";

import Container from "../../shared/Container";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Menu, Sailboat } from "lucide-react";
import { useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { motion } from "motion/react";
import HeaderMobile from "./HeaderMobile";

interface HeaderProps {
  user: TUser | null;
}

export default function HeaderClient({ user }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent">
            <Sailboat className="text-black" />
          </div>
          <span className="font-semibold text-base tracking-tight">
            StoreDock
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#" className="opacity-60 hover:opacity-100">
            Features
          </Link>
          <Link href="#" className="opacity-60 hover:opacity-100">
            Pricing
          </Link>
          <Link href="#" className="opacity-60 hover:opacity-100">
            Testimonials
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          className="block md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Menu className="size-5" />
        </Button>
      </Container>
      {menuOpen && <HeaderMobile user={user} />}
    </motion.header>
  );
}
