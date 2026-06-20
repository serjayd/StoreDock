import { Cuboid } from "lucide-react";
import { motion } from "motion/react";

const LINKS = [
  { label: "Dashboard", isStyled: true },
  { label: "My Stores", isStyled: false },
  { label: "Products", isStyled: false },
  { label: "Shelves", isStyled: false },
  { label: "Alerts", isStyled: false },
];

const STATS = [
  { label: "Products", value: "124", style: "text-chart-1" },
  { label: "Low Stock", value: "7", style: "text-chart-3" },
  { label: "Out of Stock", value: "3", style: "text-chart-5" },
  { label: "Value", value: "$7.3k", style: "text-chart-4" },
];

const barHeights = ["45%", "28%", "62%", "35%", "58%", "42%", "70%"];

export default function HeroDashboardExample() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative my-16.5 select-none"
    >
      <div className="rounded-2xl border overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b bg-background">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-chart-5" />
            <span className="w-3 h-3 rounded-full bg-chart-3" />
            <span className="w-3 h-3 rounded-full bg-chart-1" />
          </div>

          <p className="flex-1 mx-4 h-6 rounded-md flex items-center justify-center text-muted-foreground text-xs bg-secondary">
            app.storedock.io/dashboard
          </p>
        </div>

        <div className="flex h-fit sm:h-80">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden sm:block w-44 border-r shrink-0 p-4 space-y-1 bg-sidebar"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="size-6 rounded-sm flex items-center justify-center bg-accent">
                <Cuboid className="text-black size-4" />
              </div>
              <span className="text-xs font-semibold">StoreDock</span>
            </div>

            <div className="flex flex-col gap-1 text-start">
              {LINKS.map((link, i) => (
                <motion.span
                  key={i}
                  className={`text-xs py-1.5 px-3 rounded-xl ${
                    link.isStyled
                      ? "bg-accent/20 text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 p-5 bg-background">
            <p className="text-xs font-semibold mb-3 text-muted-foreground text-start">
              Dashboard · Corner Fresh Market
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="border rounded-lg bg-secondary/50 text-start p-2.5 space-y-1"
                >
                  <h4 className={`text-base font-bold ${stat.style}`}>
                    {stat.value}
                  </h4>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* STOCK MOVEMENTS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 rounded-lg p-3 border bg-[rgba(255,255,255,0.03)]"
            >
              <div className="text-[10px] mb-2 text-[rgba(255,255,255,0.3)]">
                Stock Movements — last 7 days
              </div>

              <div className="flex items-end gap-1.5 h-12">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: h, opacity: 1 }}
                    transition={{
                      delay: 0.6 + i * 0.05,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="flex-1 rounded-t"
                    style={{
                      background:
                        i === barHeights.length - 1
                          ? "rgb(0, 212, 170)"
                          : `rgba(0, 212, 170, ${0.15 + i * 0.03})`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-3xl rounded-full bg-accent"
      />
    </motion.div>
  );
}
