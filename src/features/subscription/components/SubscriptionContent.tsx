"use client";

import { motion } from "motion/react";
import { Shield, Star } from "lucide-react";
import { TSession, TUser } from "@/types/user";
import PricingCards from "./PricingCards";
import { TIERS } from "../constants";

interface SubscriptionContentProps {
  user: TUser | null;
  session: TSession;
}

export default function SubscriptionContent({
  user,
  session,
}: SubscriptionContentProps) {
  const formatRenewalDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isFree = !user || user.plan === "free";

  return (
    <>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-1">Subscription</h1>
        {isFree ? (
          <p className="text-muted-foreground">
            You&apos;re on the{" "}
            <strong className="capitalize text-white">free</strong> plan.
            Upgrade for unlimited stores and shelves.
          </p>
        ) : (
          <p className="text-muted-foreground">
            You&apos;re on the{" "}
            <strong className="capitalize text-chart-4">{user.plan}</strong>{" "}
            plan. Thank you for supporting StoreDock.
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`${
          isFree ? "bg-card" : "bg-chart-4/10 border-chart-4/40"
        } border p-4 rounded-xl flex items-center justify-between mb-8`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`${isFree ? "bg-secondary" : "bg-chart-4/20"} p-2.5 rounded-full w-fit`}
          >
            {isFree ? (
              <Shield className="text-muted-foreground size-4" />
            ) : (
              <Star className="text-chart-4 size-4" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-sm capitalize">
              StoreDock {user?.plan || "free"}
            </h2>
            <p className="text-muted-foreground text-xs">
              {isFree
                ? "No charge · Free forever"
                : "Renews monthly · £19.99/month"}
            </p>
          </div>
        </div>
        <span
          className={`${
            isFree
              ? "bg-secondary text-muted-foreground"
              : "bg-chart-4/20 text-chart-4"
          } text-xs px-3 py-1 rounded-full font-semibold`}
        >
          {isFree ? (
            "Current"
          ) : (
            <>
              {user?.stripeCurrentPeriodEnd &&
                `Until: ${formatRenewalDate(user.stripeCurrentPeriodEnd)}`}
            </>
          )}
        </span>
      </motion.div>

      <PricingCards
        tiers={TIERS}
        user={user || undefined}
        session={session}
        variant="billing"
      />
    </>
  );
}
