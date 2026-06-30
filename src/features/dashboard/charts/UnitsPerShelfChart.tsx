"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UnitsPerShelfChartProps {
  data: {
    shelf: string;
    units: number;
  }[];
}

const COLORS = [
  "#00d4aa",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#10b981",
];

export default function UnitsPerShelfChart({ data }: UnitsPerShelfChartProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Units in Stock per Shelf</CardTitle>
        <CardDescription>
          Total units currently stocked across each shelf
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {/* IMPORTANT: prevents flex/grid clipping issues */}
        <div className="w-full min-w-0">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                vertical={true}
                strokeDasharray="3 3"
                stroke="#1a2235"
              />

              <XAxis
                dataKey="shelf"
                axisLine={true}
                tickLine={true}
                interval={0}
              />

              <YAxis axisLine={true} tickLine={true} />

              <Tooltip />

              <Bar dataKey="units" barSize={32} radius={[8, 8, 0, 0]}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
