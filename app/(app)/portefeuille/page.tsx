"use client"

import { useState, useEffect, useMemo } from "react"
import {
  positions as initialPositions,
  sectorAllocations,
  performanceData,
  type Position,
} from "@/data/portfolio"
import { PortfolioSummary } from "@/components/portfolio-summary"
import { PerformanceChart } from "@/components/performance-chart"
import { PositionsTable } from "@/components/positions-table"
import { DonutChart } from "@/components/donut-chart"
import { WidgetContainer } from "@/components/widget-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, FileDown } from "lucide-react"

export default function PortefeuillePage() {
  const [positionData, setPositionData] = useState<Position[]>(initialPositions)

  // Real-time price simulation (~30% of positions updated every 4s)
  useEffect(() => {
    const interval = setInterval(() => {
      setPositionData((prev) =>
        prev.map((pos) => {
          if (Math.random() > 0.3) return pos

          const variation = (Math.random() - 0.5) * 0.008
          const newPrice = Math.round(pos.currentPrice * (1 + variation))
          return { ...pos, currentPrice: newPrice }
        })
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Recalculate summary from live position data
  const summary = useMemo(() => {
    let totalMarketValue = 0
    let totalCost = 0

    for (const pos of positionData) {
      totalMarketValue += pos.currentPrice * pos.quantity
      totalCost += pos.averagePrice * pos.quantity
    }

    const pnlTotal = totalMarketValue - totalCost
    const pnlTotalPercent = totalCost > 0 ? (pnlTotal / totalCost) * 100 : 0

    // Simulated day P&L as a fraction of total P&L
    const pnlDay = Math.round(pnlTotal * 0.072)
    const pnlDayPercent = totalMarketValue > 0 ? (pnlDay / totalMarketValue) * 100 : 0

    return {
      totalValue: totalMarketValue,
      pnlDay,
      pnlDayPercent,
      pnlTotal,
      pnlTotalPercent,
      annualizedReturn: 12.8,
      cashBalance: 15_400_000,
    }
  }, [positionData])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Briefcase className="size-4 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Portefeuille</h1>
          <Badge variant="secondary" className="text-[10px]">
            {positionData.length} positions
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <FileDown className="size-3.5" />
          Exporter PDF
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {/* KPIs */}
        <PortfolioSummary
          totalValue={summary.totalValue}
          pnlDay={summary.pnlDay}
          pnlDayPercent={summary.pnlDayPercent}
          pnlTotal={summary.pnlTotal}
          pnlTotalPercent={summary.pnlTotalPercent}
          annualizedReturn={summary.annualizedReturn}
          cashBalance={summary.cashBalance}
        />

        {/* Allocation + Performance */}
        <div className="grid grid-cols-12 gap-3">
          {/* Donut */}
          <WidgetContainer title="Allocation sectorielle" className="col-span-4">
            <div className="flex items-center gap-4">
              <div className="h-44 w-44 shrink-0">
                <DonutChart data={sectorAllocations} />
              </div>
              <div className="space-y-1.5">
                {sectorAllocations.map((sector) => (
                  <div key={sector.sector} className="flex items-center gap-2">
                    <div
                      className="size-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {sector.sector}
                    </span>
                    <span className="ml-auto font-mono text-xs tabular-nums">
                      {sector.value.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </WidgetContainer>

          {/* Performance Chart */}
          <WidgetContainer
            title="Performance vs BRVM Composite (base 100)"
            className="col-span-8"
          >
            <PerformanceChart data={performanceData} />
          </WidgetContainer>
        </div>

        {/* Positions Table */}
        <WidgetContainer title="Positions">
          <PositionsTable positions={positionData} />
        </WidgetContainer>
      </div>
    </div>
  )
}
