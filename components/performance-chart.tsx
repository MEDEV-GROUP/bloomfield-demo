"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { PerformancePoint } from "@/data/portfolio"

const chartConfig = {
  portfolio: {
    label: "Portefeuille",
    color: "var(--chart-1)",
  },
  benchmark: {
    label: "BRVM Composite",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

interface PerformanceChartProps {
  data: PerformancePoint[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          tickFormatter={(value: string) => {
            const d = new Date(value)
            return d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" })
          }}
          interval="equidistantPreserveStart"
          minTickGap={60}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          width={40}
          domain={["auto", "auto"]}
          tickFormatter={(v: number) => v.toFixed(0)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value: string) => {
                const d = new Date(value)
                return d.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
              formatter={(value) => {
                const num = Number(value)
                return num.toFixed(2)
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="portfolio"
          stroke="var(--color-portfolio)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="benchmark"
          stroke="var(--color-benchmark)"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
