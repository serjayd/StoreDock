"use client";

import Container from "@/components/shared/Container";
import { motion } from "motion/react";
import {
  Bell,
  ChartNoAxesColumn,
  Layers,
  Package,
  Shield,
  Store,
} from "lucide-react";

const FEATURES_DATA = [
  {
    icon: Store,
    label: "Multi-Store Management",
    description:
      "Own and operate multiple locations from a single dashboard. Switch stores in one click, compare performance side by side.",
    styles: "bg-chart-1/20 text-chart-1",
  },
  {
    icon: Layers,
    label: "Visual Shelf Organiser",
    description:
      "See your inventory as physical shelves. Spot empty slots, overstocked racks, and expiring batches at a glance.",
    styles: "bg-chart-2/20 text-chart-2",
  },
  {
    icon: Bell,
    label: "Smart Stock Alerts",
    description:
      "Get notified the moment a product goes low or out of stock — per-store, per-shelf, customisable thresholds.",
    styles: "bg-chart-3/20 text-chart-3",
  },
  {
    icon: ChartNoAxesColumn,
    label: "Real-Time Analytics",
    description:
      "Dashboard charts that update live: stock movements, inventory value, best-selling categories, and more.",
    styles: "bg-chart-4/20 text-chart-4",
  },
  {
    icon: Package,
    label: "Store Templates",
    description:
      "Launch in minutes with pre-built templates for grocery, pet shops, electronics, vape stores, toy shops, and more.",
    styles: "bg-chart-5/20 text-chart-5",
  },
  {
    icon: Shield,
    label: "Secure & Reliable",
    description:
      "Enterprise-grade security and automatic backups so your inventory data is always safe.",
    styles: "bg-chart-1/20 text-chart-1",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 text-xs font-medium bg-chart-2/10 border-chart-2/50 text-chart-2">
            Everything you need
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for the shop floor, not a warehouse dock
          </h2>

          <p className="text-muted-foreground">
            StockFlow is designed for small business owners who run lean
            operations across one or more locations — not enterprise logistics
            teams.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES_DATA.map((el, i) => {
            const Icon = el.icon;

            return (
              <motion.div
                key={el.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="rounded-2xl p-6 border bg-card transition-shadow hover:shadow-lg"
              >
                <div className={`${el.styles} w-fit p-2.5 rounded-xl mb-4`}>
                  <Icon className="size-5" />
                </div>

                <h4 className="text-base font-semibold mb-2">{el.label}</h4>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {el.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
