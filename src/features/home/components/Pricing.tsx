"use client";

import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const PRICES = [
  {
    label: "Free",
    value: "£0",
    valueLabel: "forever",
    description: "Get started with one location.",
    items: [
      "1 store",
      "3 shelves per store",
      "Unlimited products",
      "Dashboard analytics",
      "Low-stock alerts",
      "Store templates",
    ],
    link: "/dashboard",
    linkLabel: "Start Free",
    isSelected: false,
  },
  {
    label: "Premium",
    value: "£19.99",
    valueLabel: "/ month",
    description: "For growing businesses with multiple locations.",
    items: [
      "Unlimited stores",
      "Unlimited shelves",
      "Unlimited products",
      "Advanced analytics",
      "Priority alerts",
      "All store templates",
      "Data export (CSV)",
      "Priority support",
    ],
    link: "#",
    linkLabel: "Start 14-day trial",
    isSelected: true,
    isPopular: true,
  },
];

export default function Pricing() {
  return (
    <section className="border-t py-20 px-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {PRICES.map((el, i) => (
            <motion.div
              key={el.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
              }}
              className={`
                relative flex flex-col justify-between border p-6 rounded-2xl overflow-hidden
                transition-all
                ${
                  el.isSelected
                    ? "bg-chart-4/5 border-chart-4/50 shadow-lg shadow-chart-4/10"
                    : "bg-card/50"
                }
              `}
            >
              {/* subtle glow for featured */}
              {el.isSelected && (
                <div className="absolute inset-0 bg-linear-to-tr from-chart-4/10 via-transparent to-chart-4/10 opacity-40 blur-2xl" />
              )}

              {/* Heading */}
              <div className="mb-6 relative">
                <h2 className="font-semibold text-sm flex items-center justify-between gap-2 mb-4">
                  <span className="flex items-center gap-2">
                    {el.isPopular && (
                      <Zap className="size-4 text-chart-4 animate-pulse" />
                    )}
                    {el.label}
                  </span>

                  {el.isPopular && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-chart-4/20 text-chart-4">
                      Most popular
                    </span>
                  )}
                </h2>

                <h3 className="text-3xl font-bold mb-2">
                  {el.value}{" "}
                  <span className="text-sm text-muted-foreground font-normal">
                    {el.valueLabel}
                  </span>
                </h3>

                <p className="text-sm text-muted-foreground mb-6">
                  {el.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {el.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1 + j * 0.12,
                      }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check
                        className={`size-4 ${
                          el.isSelected ? "text-chart-4" : "text-chart-1"
                        }`}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                asChild
                variant={el.isSelected === true ? "default" : "outline"}
                className={`
                  w-full z-1
                  ${el.isSelected ? "bg-chart-4 hover:bg-chart-4/80 text-white" : ""}
                `}
              >
                <Link href={el.link}>{el.linkLabel}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

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
