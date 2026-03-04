"use client"

import { useState, useMemo } from "react"
import { PriceCell } from "@/components/price-cell"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { Position } from "@/data/portfolio"

type SortKey = "ticker" | "sector" | "quantity" | "averagePrice" | "currentPrice" | "pnl" | "pnlPercent" | "weight"

interface PositionsTableProps {
  positions: Position[]
}

function formatXOF(value: number): string {
  return value.toLocaleString("fr-FR")
}

export function PositionsTable({ positions }: PositionsTableProps) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "weight",
    dir: "desc",
  })

  const handleSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    )
  }

  const sortedPositions = useMemo(() => {
    const sorted = [...positions].sort((a, b) => {
      let aVal: number | string
      let bVal: number | string

      switch (sort.key) {
        case "ticker":
          aVal = a.ticker
          bVal = b.ticker
          break
        case "sector":
          aVal = a.sector
          bVal = b.sector
          break
        case "quantity":
          aVal = a.quantity
          bVal = b.quantity
          break
        case "averagePrice":
          aVal = a.averagePrice
          bVal = b.averagePrice
          break
        case "currentPrice":
          aVal = a.currentPrice
          bVal = b.currentPrice
          break
        case "pnl":
          aVal = (a.currentPrice - a.averagePrice) * a.quantity
          bVal = (b.currentPrice - b.averagePrice) * b.quantity
          break
        case "pnlPercent":
          aVal = ((a.currentPrice - a.averagePrice) / a.averagePrice) * 100
          bVal = ((b.currentPrice - b.averagePrice) / b.averagePrice) * 100
          break
        case "weight":
          aVal = a.weight
          bVal = b.weight
          break
        default:
          return 0
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sort.dir === "asc"
          ? aVal.localeCompare(bVal, "fr")
          : bVal.localeCompare(aVal, "fr")
      }

      return sort.dir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })

    return sorted
  }, [positions, sort])

  const totals = useMemo(() => {
    let totalCost = 0
    let totalMarketValue = 0

    for (const p of positions) {
      totalCost += p.averagePrice * p.quantity
      totalMarketValue += p.currentPrice * p.quantity
    }

    const totalPnl = totalMarketValue - totalCost
    const totalPnlPercent = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0

    return { totalCost, totalMarketValue, totalPnl, totalPnlPercent }
  }, [positions])

  const columns: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "ticker", label: "Valeur" },
    { key: "sector", label: "Secteur" },
    { key: "quantity", label: "Qté", align: "right" },
    { key: "averagePrice", label: "PRU", align: "right" },
    { key: "currentPrice", label: "Cours", align: "right" },
    { key: "pnl", label: "P&L", align: "right" },
    { key: "pnlPercent", label: "P&L %", align: "right" },
    { key: "weight", label: "% Pf", align: "right" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(
                "h-8 cursor-pointer select-none text-xs hover:text-foreground",
                col.align === "right" && "text-right"
              )}
              onClick={() => handleSort(col.key)}
            >
              <span className="inline-flex items-center gap-1">
                {col.label}
                {sort.key === col.key && (
                  sort.dir === "asc" ? (
                    <ChevronUp className="size-3" />
                  ) : (
                    <ChevronDown className="size-3" />
                  )
                )}
              </span>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPositions.map((position) => {
          const pnl = (position.currentPrice - position.averagePrice) * position.quantity
          const pnlPercent = ((position.currentPrice - position.averagePrice) / position.averagePrice) * 100
          const isPositive = pnl >= 0

          return (
            <TableRow key={position.ticker} className="border-border/50">
              <TableCell className="py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold">{position.ticker}</span>
                  <span className="text-muted-foreground">{position.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-2 text-xs">
                <Badge variant="outline" className="text-[10px] font-normal">
                  {position.sector}
                </Badge>
              </TableCell>
              <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
                {formatXOF(position.quantity)}
              </TableCell>
              <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
                {formatXOF(position.averagePrice)}
              </TableCell>
              <TableCell className="py-2 text-right text-xs">
                <PriceCell price={position.currentPrice} />
              </TableCell>
              <TableCell
                className={cn(
                  "py-2 text-right font-mono text-xs tabular-nums",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}{formatXOF(Math.round(pnl))}
              </TableCell>
              <TableCell
                className={cn(
                  "py-2 text-right font-mono text-xs tabular-nums",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}{pnlPercent.toFixed(2)}%
              </TableCell>
              <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
                {position.weight.toFixed(1)}%
              </TableCell>
            </TableRow>
          )
        })}

        {/* Total row */}
        <TableRow className="border-t-2 border-border bg-muted/30 font-medium">
          <TableCell className="py-2 text-xs font-semibold" colSpan={2}>
            Total ({positions.length} positions)
          </TableCell>
          <TableCell className="py-2 text-right" />
          <TableCell className="py-2 text-right" />
          <TableCell className="py-2 text-right font-mono text-xs tabular-nums font-semibold">
            {formatXOF(Math.round(totals.totalMarketValue))}
          </TableCell>
          <TableCell
            className={cn(
              "py-2 text-right font-mono text-xs tabular-nums font-semibold",
              totals.totalPnl >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {totals.totalPnl >= 0 ? "+" : ""}{formatXOF(Math.round(totals.totalPnl))}
          </TableCell>
          <TableCell
            className={cn(
              "py-2 text-right font-mono text-xs tabular-nums font-semibold",
              totals.totalPnlPercent >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {totals.totalPnlPercent >= 0 ? "+" : ""}{totals.totalPnlPercent.toFixed(2)}%
          </TableCell>
          <TableCell className="py-2 text-right font-mono text-xs tabular-nums font-semibold">
            100%
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
