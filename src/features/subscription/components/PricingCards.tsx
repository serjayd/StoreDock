"use client";

import { Button } from "@/components/ui/button";
import { TSession, TUser } from "@/types/user";
import { Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { TTier } from "../types";

interface PricingCardProps {
  tiers: TTier[];
  session?: TSession | null;
  user?: TUser;
}

export default function PricingCards({
  tiers,
  session,
  user,
}: PricingCardProps) {
  const router = useRouter();

  const handleSubscribe = async (priceId: string | null) => {
    if (!session || !session.user) {
      router.push("/sign-in");
      return;
    }

    if (!priceId) return;

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data && data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Checkout link not found");
      }
    } catch (error) {
      console.error("Error creating checkout session: ", error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data && data.url) {
        window.location.assign(data.url);
      }
    } catch (error) {
      console.error("Error opening billing portal: ", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {tiers.map((el, i) => {
        return (
          <motion.div
            key={el.id}
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
              <div className="absolute inset-0 bg-linear-to-tr from-chart-4/5 via-transparent to-chart-4/30 opacity-40 blur-2xl" />
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
                    {user?.plan === "free" ? "Most popular" : "Active"}
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
              onClick={
                !user || user.plan === "free"
                  ? () => handleSubscribe(el.priceId)
                  : () => handleManageSubscription()
              }
              size="lg"
              type="button"
              variant={el.isSelected === true ? "default" : "outline"}
              className={`
                    w-full z-1 cursor-pointer
                    ${el.isSelected ? "bg-chart-4 hover:bg-chart-4/80 text-white" : ""}
                  `}
            >
              {!user || user.plan === "free"
                ? el.buttonText
                : el.buttonActiveSubscriptionText}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
