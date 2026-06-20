"use client";

import Container from "@/components/shared/Container";
import ShelvesExample from "./ShelvesExample";
import { motion } from "motion/react";

const INDICATORS = [
  {
    label: "Green indicator",
    description: "Product is well stocked",
    color: "bg-chart-1",
  },
  {
    label: "Amber indicator",
    description: "Stock below your set threshold",
    color: "bg-chart-3",
  },
  {
    label: "Red indicator",
    description: "Out of stock — needs reorder",
    color: "bg-chart-5",
  },
];

export default function Shelves() {
  return (
    <section className="bg-secondary/10 py-20 border-y">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 text-xs font-medium bg-chart-1/10 border-chart-1/50 text-chart-1">
            Visual shelves
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your inventory, laid out like a real store
          </h2>

          <p className="text-muted-foreground">
            Instead of rows in a spreadsheet, StockFlow shows your inventory as
            physical shelves. Red means out, amber means low, green means
            stocked. Your team gets it instantly — no training needed.
          </p>

          <ul className="mt-6 space-y-3">
            {INDICATORS.map((el, i) => (
              <motion.li
                key={el.label}
                className="flex items-center gap-3 font-medium text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.4,
                }}
              >
                <span
                  className={`${el.color} block size-2.5 rounded-full shrink-0`}
                />
                {el.label} —{" "}
                <span className="text-muted-foreground font-normal">
                  {el.description}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT */}
        <ShelvesExample />
      </Container>
    </section>
  );
}
