import { Check, Sailboat } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const FEATURES = [
  "Multi-store inventory management",
  "Visual shelf organization",
  "Low-stock & out-of-stock alerts",
  "Real-time dashboard analytics",
  "Store templates for fast setup",
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <section className="relative hidden w-120 shrink-0 flex-col justify-between overflow-hidden bg-sidebar px-12 py-12 lg:flex">
        {/* Top */}
        <div className="relative">
          <Link href="/" className="mb-12 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
              <Sailboat className="text-black" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              StoreDock
            </span>
          </Link>

          <h2 className="mb-4 text-4xl font-semibold">
            The smarter way to manage inventory
          </h2>

          <p className="mb-8 text-muted-foreground">
            Run one store or ten. StockFlow keeps every shelf accounted for,
            every alert surfaced, every decision informed.
          </p>

          <div className="space-y-3">
            {FEATURES.map((text: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="rounded-full bg-accent/20 p-1">
                  <Check className="size-3.5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute left-0 top-0 size-64 rounded-full bg-chart-1 opacity-15 blur-3xl" />
        </div>

        {/* Bottom */}
        <div className="relative rounded-xl border p-4">
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            &quot;StoreDock replaced three spreadsheets and two WhatsApp
            threads. Now I actually know what&apos;s happening across all my
            shops.&quot;
          </p>

          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-chart-2 text-xs font-semibold text-black">
              MC
            </div>

            <div>
              <h3 className="text-xs font-medium">Maria Chen</h3>
              <p className="text-xs text-muted-foreground">
                Owner, 4 convenience stores
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 right-0 size-48 rounded-full bg-chart-2 opacity-15 blur-3xl" />
        </div>
      </section>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  );
}
