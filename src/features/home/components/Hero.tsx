"use client";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const FEATURES = [
  "No Credit Card Required",
  "Single Store Management Forever",
  "Setup in 2 Minutes",
];

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen pt-28 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="-z-10 absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <Container className="text-center max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 text-xs font-medium bg-accent/20 border-accent text-accent"
        >
          <Zap className="size-4" />
          <span>
            Now with multi-store management — free forever for one location
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight"
        >
          Inventory that <span className="text-accent">actually</span> keeps up
          with your stores
        </motion.h1>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-10 leading-relaxed text-lg"
        >
          StoreDock gives small business owners a real-time view of stock across
          every location — visual shelves, smart alerts, and instant dashboards.
          No spreadsheets. No surprises.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center items-center gap-3 mb-10"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" asChild>
              <Link href="/sign-up" className="py-6">
                Start for Free <ArrowRight />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sign-in" className="py-6">
                Sign In to your account
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          {FEATURES.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-1 text-sm"
            >
              <Check className="text-accent size-4" />
              <span className="text-muted-foreground">{text}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
