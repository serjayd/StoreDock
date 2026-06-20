"use client";

import { motion } from "motion/react";

type BarValue = number;

type Category = {
  title: string;
  borderColor: string;
  bgColor: string;
  bars: BarValue[];
};

const getBarColor = (value: number) => {
  if (value === 0) return "rgb(239, 68, 68)";
  if (value < 50) return "rgb(245, 158, 11)";
  return "rgb(0, 212, 170)";
};

const getFillColor = (value: number) => {
  if (value === 0) return "rgba(239, 68, 68, 0.19)";
  if (value < 50) return "rgba(245, 158, 11, 0.19)";
  return "rgba(0, 212, 170, 0.19)";
};

function BarChart({ title, borderColor, bgColor, bars }: Category) {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-xs mb-1.5 font-medium text-muted-foreground">
        {title}
      </div>

      <div
        className="relative rounded-lg px-3 pt-3 pb-4"
        style={{
          background: "rgba(255, 255, 255, 0.024)",
          borderWidth: "1px 1px 4px",
          borderStyle: "solid",
          borderColor,
        }}
      >
        <div className="flex gap-2 items-end">
          {bars.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm flex items-end"
                style={{
                  height: 32,
                  background: bgColor,
                  border: "1px solid rgba(59, 130, 246, 0.145)",
                }}
              >
                {/* animated bar */}
                <motion.div
                  className="w-full rounded-sm"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.03,
                  }}
                  style={{
                    background: getFillColor(value),
                  }}
                />
              </div>

              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.3,
                }}
                style={{ background: getBarColor(value) }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const DATA: Category[] = [
  {
    title: "Drinks",

    borderColor: "rgba(59, 130, 246, 0.208)",
    bgColor: "rgba(59, 130, 246, 0.07)",
    bars: [100, 100, 0, 100, 100, 100, 0, 100],
  },
  {
    title: "Snacks",
    borderColor: "rgba(245, 158, 11, 0.208)",
    bgColor: "rgba(245, 158, 11, 0.07)",
    bars: [100, 30, 100, 100, 0, 100, 100, 20],
  },
  {
    title: "Dairy",
    borderColor: "rgba(232, 237, 245, 0.208)",
    bgColor: "rgba(232, 237, 245, 0.07)",
    bars: [0, 100, 100, 20, 100, 0, 100, 100],
  },
  {
    title: "Fruits",
    borderColor: "rgba(239, 68, 68, 0.208)",
    bgColor: "rgba(239, 68, 68, 0.07)",
    bars: [100, 100, 100, 40, 100, 100, 0, 100],
  },
];

export default function ShelvesExample() {
  return (
    <motion.div
      className="rounded-2xl p-6 bg-card border"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {DATA.map((category) => (
        <BarChart key={category.title} {...category} />
      ))}
    </motion.div>
  );
}
