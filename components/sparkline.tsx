"use client"

import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface SparklineProps {
  data: number[]
  className?: string
}

export function Sparkline({ data, className }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }))
  const isPositive = data[data.length - 1] >= data[0]

  return (
    <div className={cn("h-8 w-20", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
