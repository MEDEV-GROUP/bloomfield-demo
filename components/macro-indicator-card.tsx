"use client"

import { cn } from "@/lib/utils"
import { Sparkline } from "@/components/sparkline"
import {
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  Flame,
  Percent,
  Scale,
  Ship,
  DollarSign,
  type LucideIcon,
} from "lucide-react"

interface MacroIndicatorCardProps {
  label: string
  value: string
  change?: string
  trend: "up" | "down" | "stable"
  icon: "growth" | "inflation" | "rate" | "debt" | "trade" | "currency"
  history?: number[]
}

const iconMap: Record<string, LucideIcon> = {
  growth: Landmark,
  inflation: Flame,
  rate: Percent,
  debt: Scale,
  trade: Ship,
  currency: DollarSign,
}

export function MacroIndicatorCard({
  label,
  value,
  change,
  trend,
  icon,
  history,
}: MacroIndicatorCardProps) {
  const Icon = iconMap[icon] ?? Landmark

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-3">
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md",
          trend === "up" && "bg-green-500/10 text-green-500",
          trend === "down" && "bg-red-500/10 text-red-500",
          trend === "stable" && "bg-blue-500/10 text-blue-500"
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm font-semibold tabular-nums">
            {value}
          </span>
          {change && (
            <span
              className={cn(
                "flex items-center gap-0.5 text-[10px] font-medium",
                trend === "up" && "text-green-500",
                trend === "down" && "text-red-500",
                trend === "stable" && "text-muted-foreground"
              )}
            >
              {trend === "up" && <ArrowUpRight className="size-2.5" />}
              {trend === "down" && <ArrowDownRight className="size-2.5" />}
              {change}
            </span>
          )}
        </div>
      </div>
      {history && history.length > 0 && (
        <Sparkline data={history} className="h-8 w-16 shrink-0" />
      )}
    </div>
  )
}
