"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { macroIndicators } from "@/data/macro"
import { cn } from "@/lib/utils"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Flame,
  Landmark,
  Percent,
  Scale,
  Ship,
  Vault,
  Wallet,
  type LucideIcon,
} from "lucide-react"

const macroIcons: Record<string, LucideIcon> = {
  growth: Landmark,
  inflation: Flame,
  rate: Percent,
  currency: DollarSign,
  debt: Scale,
  trade: Ship,
  reserve: Vault,
  budget: Wallet,
  employment: Activity,
}

export function WidgetMacro() {
  return (
    <ScrollArea className="h-full min-h-0">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        {macroIndicators.map((indicator) => {
          const Icon = macroIcons[indicator.icon] ?? Activity
          return (
            <div
              key={indicator.label}
              className="flex items-center gap-3 rounded-md bg-accent/30 px-3 py-2.5 transition-colors hover:bg-accent/50"
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded",
                  indicator.trend === "up" && "bg-green-500/10 text-green-500",
                  indicator.trend === "down" && "bg-red-500/10 text-red-500",
                  indicator.trend === "stable" && "bg-blue-500/10 text-blue-500"
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {indicator.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-semibold tabular-nums">
                    {indicator.value}
                  </span>
                  {indicator.change && (
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-[10px] font-medium",
                        indicator.trend === "up" && "text-green-500",
                        indicator.trend === "down" && "text-red-500",
                        indicator.trend === "stable" && "text-muted-foreground"
                      )}
                    >
                      {indicator.trend === "up" && (
                        <ArrowUpRight className="size-2.5" />
                      )}
                      {indicator.trend === "down" && (
                        <ArrowDownRight className="size-2.5" />
                      )}
                      {indicator.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
