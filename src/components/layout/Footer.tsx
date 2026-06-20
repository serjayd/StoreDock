"use client";

import Container from "../shared/Container";
import Link from "next/link";
import { Cuboid } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="border-t py-10"
    >
      <Container className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent">
            <Cuboid className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-base tracking-tight">
            StoreDock
          </span>
        </motion.div>

        {/* Links */}
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-3 text-sm"
        >
          <Link
            href="#"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Support
          </Link>
        </motion.ul>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground text-sm"
        >
          StoreDock &copy; {currentYear}
        </motion.p>
      </Container>
    </motion.footer>
  );
}
