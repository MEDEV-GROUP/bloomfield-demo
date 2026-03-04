"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

interface DonutChartProps {
  data: { sector: string; value: number; color: string }[]
  className?: string
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { sector: string; value: number } }[] }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-1.5 text-xs shadow-md">
      <span className="font-medium">{item.sector}</span>
      <span className="ml-2 font-mono text-muted-foreground">{item.value.toFixed(1)}%</span>
    </div>
  )
}

export function DonutChart({ data, className }: DonutChartProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={2}
            dataKey="value"
            nameKey="sector"
            strokeWidth={0}
            isAnimationActive={false}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
