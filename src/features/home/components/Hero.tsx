"use client";

import Container from "@/components/shared/Container";
import { motion } from "motion/react";
import HeroDashboardExample from "./HeroDashboardExample";
import { Check, ChevronDown, Zap } from "lucide-react";

const FEATURES = [
  "Single Store Management Forever",
  "No Credit Card Required",
  "Setup in 2 Minutes",
];

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="-z-10 absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <Container className="text-center max-w-5xl">
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
          className="text-muted-foreground mb-10 leading-relaxed text-base md:text-lg"
        >
          StoreDock gives small business owners a real-time view of stock across
          every location — visual shelves, smart alerts, and instant dashboards.
          No spreadsheets. No surprises.
        </motion.p>

        {/* Dashboard Example */}
        <HeroDashboardExample />

        {/* Features */}
        <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
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

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex items-center justify-center mt-20"
        >
          <ChevronDown />
        </motion.div>
      </Container>
    </motion.section>
  );
}
