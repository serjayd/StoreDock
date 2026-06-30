"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InventoryValueChartProps {
  data: {
    shelf: string;
    value: number;
  }[];
}

export default function InventoryValueChart({
  data,
}: InventoryValueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Value by Shelf</CardTitle>
        <CardDescription>
          Pound value of stocked products per shelf
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />

            <XAxis dataKey="shelf" axisLine={false} tickLine={false} />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#00d4aa"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#00d4aa",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
