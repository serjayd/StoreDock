"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StockStatusChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#00d4aa", "#f59e0b", "#ef4444"];

export default function StockStatusChart({ data }: StockStatusChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Stock Status</CardTitle>
        <CardDescription>Products by availability</CardDescription>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 space-y-3">
          {data.map((item, index) => {
            const total = data.reduce((sum, d) => sum + d.value, 0);
            const percentage =
              total === 0 ? 0 : Math.round((item.value / total) * 100);

            return (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.value}</span>
                  <span className="text-muted-foreground">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
