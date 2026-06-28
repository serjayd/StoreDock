"use client";

import { TSession } from "@/types/user";
import { motion } from "motion/react";
import PricingCards from "./PricingCards";
import { TIERS } from "../constants";

interface PricingProps {
  session: TSession | null;
}

export default function Pricing({ session }: PricingProps) {
  return (
    <section id="pricing" className="border-t py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 text-xs font-medium bg-chart-4/10 border-chart-4/50 text-chart-4">
            Simple, transparent pricing
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start free. Scale when you&apos;re ready.
          </h2>

          <p className="text-muted-foreground">
            No hidden fees. No annual lock-in. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <PricingCards tiers={TIERS} session={session} variant="landing" />

        {/* Footer note */}
        <motion.p
          className="text-muted-foreground text-sm text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Premium includes a 14-day free trial. No credit card required to
          start.
        </motion.p>
      </div>
    </section>
  );
}
