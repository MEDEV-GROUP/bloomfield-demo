import { cn } from "@/lib/utils"
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  Percent,
  Wallet,
  type LucideIcon,
} from "lucide-react"

interface KPI {
  label: string
  value: string
  change?: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
}

interface PortfolioSummaryProps {
  totalValue: number
  pnlDay: number
  pnlDayPercent: number
  pnlTotal: number
  pnlTotalPercent: number
  annualizedReturn: number
  cashBalance: number
}

function formatLargeXOF(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000) {
    return (value / 1_000_000_000).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " Md"
  }
  if (abs >= 1_000_000) {
    return (value / 1_000_000).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " M"
  }
  return value.toLocaleString("fr-FR")
}

export function PortfolioSummary({
  totalValue,
  pnlDay,
  pnlDayPercent,
  pnlTotal,
  pnlTotalPercent,
  annualizedReturn,
  cashBalance,
}: PortfolioSummaryProps) {
  const kpis: KPI[] = [
    {
      label: "Valeur totale",
      value: formatLargeXOF(totalValue) + " XOF",
      icon: Briefcase,
      trend: "neutral",
    },
    {
      label: "P&L Jour",
      value: (pnlDay >= 0 ? "+" : "") + formatLargeXOF(pnlDay) + " XOF",
      change: (pnlDayPercent >= 0 ? "+" : "") + pnlDayPercent.toFixed(2) + "%",
      trend: pnlDay >= 0 ? "up" : "down",
      icon: pnlDay >= 0 ? TrendingUp : TrendingDown,
    },
    {
      label: "P&L Total",
      value: (pnlTotal >= 0 ? "+" : "") + formatLargeXOF(pnlTotal) + " XOF",
      change: (pnlTotalPercent >= 0 ? "+" : "") + pnlTotalPercent.toFixed(2) + "%",
      trend: pnlTotal >= 0 ? "up" : "down",
      icon: pnlTotal >= 0 ? TrendingUp : TrendingDown,
    },
    {
      label: "Rendement annualisé",
      value: annualizedReturn.toFixed(1) + "%",
      trend: annualizedReturn >= 0 ? "up" : "down",
      icon: Percent,
    },
    {
      label: "Liquidités",
      value: formatLargeXOF(cashBalance) + " XOF",
      trend: "neutral",
      icon: Wallet,
    },
  ]

  return (
    <div className="grid grid-cols-5 gap-3">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <div
            key={kpi.label}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-3"
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-md",
                kpi.trend === "up" && "bg-green-500/10 text-green-500",
                kpi.trend === "down" && "bg-red-500/10 text-red-500",
                kpi.trend === "neutral" && "bg-blue-500/10 text-blue-500"
              )}
            >
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm font-semibold tabular-nums">
                  {kpi.value}
                </span>
                {kpi.change && (
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      kpi.trend === "up" && "text-green-500",
                      kpi.trend === "down" && "text-red-500"
                    )}
                  >
                    {kpi.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
