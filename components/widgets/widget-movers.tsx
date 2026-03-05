"use client"

import { PriceCell } from "@/components/price-cell"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { type Stock } from "@/data/stocks"
import { ExternalLink, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

interface WidgetMoversProps {
  stocks: Stock[]
}

export function WidgetMovers({ stocks }: WidgetMoversProps) {
  const topGainers = useMemo(
    () =>
      [...stocks]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 5),
    [stocks]
  )

  const topLosers = useMemo(
    () =>
      [...stocks]
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 5),
    [stocks]
  )

  return (
    <ScrollArea className="h-full min-h-0">
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-1 text-xs font-medium text-green-500">
            <TrendingUp className="size-3" />
            Hausses
          </div>
          <Table>
            <TableBody>
              {topGainers.map((stock) => (
                <TableRow key={stock.ticker} className="group relative border-0 hover:bg-accent/50 transition-colors cursor-pointer">
                  <TableCell className="px-0 py-1 text-xs font-medium">
                    <Link href={`/marches/${stock.ticker}`} className="absolute inset-0" />
                    {stock.ticker}
                  </TableCell>
                  <TableCell className="px-0 py-1 text-right">
                    <PriceCell price={stock.price} className="text-xs" />
                  </TableCell>
                  <TableCell className="px-0 py-1 text-right font-mono text-xs text-green-500">
                    +{stock.changePercent.toFixed(2)}%
                  </TableCell>
                  <TableCell className="w-4 py-1 pl-1 pr-0">
                    <ExternalLink className="size-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-1 text-xs font-medium text-red-500">
            <TrendingDown className="size-3" />
            Baisses
          </div>
          <Table>
            <TableBody>
              {topLosers.map((stock) => (
                <TableRow key={stock.ticker} className="group relative border-0 hover:bg-accent/50 transition-colors cursor-pointer">
                  <TableCell className="px-0 py-1 text-xs font-medium">
                    <Link href={`/marches/${stock.ticker}`} className="absolute inset-0" />
                    {stock.ticker}
                  </TableCell>
                  <TableCell className="px-0 py-1 text-right">
                    <PriceCell price={stock.price} className="text-xs" />
                  </TableCell>
                  <TableCell className="px-0 py-1 text-right font-mono text-xs text-red-500">
                    {stock.changePercent.toFixed(2)}%
                  </TableCell>
                  <TableCell className="w-4 py-1 pl-1 pr-0">
                    <ExternalLink className="size-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  )
}
