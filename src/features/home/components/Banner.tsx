"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { TSession } from "@/types/user";

interface BannerProps {
  session: TSession;
}

export default function Banner({ session }: BannerProps) {
  return (
    <section className="py-24">
      <div className="max-w-4xl px-4 mx-auto text-center relative">
        {/* Glow background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="absolute inset-0 rounded-3xl blur-2xl bg-chart-1"
        />

        {/* Card */}
        <motion.div
          className="relative rounded-3xl border px-10 py-16 bg-background/60 backdrop-blur-md"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 leading-snug"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to take control of your inventory?
          </motion.h2>

          {/* Text */}
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of small business owners who&apos;ve stopped guessing
            and started knowing.
          </motion.p>

          {/* Buttons */}
          {!session?.user ? (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Create free account <ArrowRight />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
