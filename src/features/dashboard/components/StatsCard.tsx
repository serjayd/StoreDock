import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatsContainerProps {
  title: string;
  link: string;
  styles: string;
  icon: LucideIcon;
  value: number | string;
}

export default function StatsCard({
  title,
  icon,
  link,
  styles,
  value,
}: StatsContainerProps) {
  const Icon = icon;

  return (
    <Link href={link} className="rounded-xl p-4 border col-span-1 bg-card">
      <div className="flex items-center justify-between mb-3">
        <div className={`${styles} p-2 rounded-lg`}>
          <Icon className="size-5" />
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{value}</h2>
        <p className="text-xs mt-0.5 mb-1 font-medium text-muted-foreground">
          {title}
        </p>
      </div>
    </Link>
  );
}
