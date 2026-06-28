"use client";

import Container from "@/components/shared/Container";
import { motion } from "motion/react";

const REVIEWS = [
  {
    review:
      "StoreDock replaced three spreadsheets and two WhatsApp threads. Now I actually know what's happening across all my shops in real time.",
    author: "Maria Chen",
    authorDetails: "Owner, 4 convenience stores · London, England",
    style: "bg-chart-1",
  },
  {
    review:
      "The shelf view is a game-changer for my team. Staff can see what needs restocking before I even check the dashboard. Saves us hours every week.",
    author: "Marcus Obi",
    authorDetails: "Manager, Pet World chain · Manchester, England",
    style: "bg-chart-2",
  },
  {
    review:
      "I went from losing track of inventory constantly to having zero out-of-stock surprises. The alerts system is incredibly well thought out.",
    author: "Priya Sharma",
    authorDetails: "Owner, Toy Galaxy · Birmingham, England",
    style: "bg-chart-4",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by shop owners
          </h2>

          <p className="text-muted-foreground">
            From solo operators to multi-location businesses.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((el, i) => {
            const logo = el.author
              .split(" ")
              .map((part) => part[0])
              .join("");
            return (
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                }}
                key={i}
                className="bg-card border rounded-2xl p-6 flex flex-col"
              >
                <p className="text-sm leading-relaxed flex-1 mb-4 text-muted-foreground">
                  &quot;{el.review}&quot;
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`${el.style} size-9 rounded-full text-center text-black flex items-center justify-center text-xs font-semibold leading-none`}
                  >
                    {logo}
                  </span>
                  <div className="">
                    <h5 className="text-sm font-medium">{el.author}</h5>
                    <p className="text-muted-foreground text-xs">
                      {el.authorDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
