"use client";
import { motion } from "motion/react";

const BANNER_DATA = [
  { label: "Businesses using StoreDock", value: "1,200+" },
  { label: "Uptime this year", value: "97%" },
  { label: "Stores managed", value: "2,800+" },
  { label: "Average setup time", value: "2 min" },
];

export default function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border bg-secondary/10"
    >
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {BANNER_DATA.map((el, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.12,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-3xl font-bold mb-1">{el.value}</h3>
            <p className="text-xs text-muted-foreground">{el.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
