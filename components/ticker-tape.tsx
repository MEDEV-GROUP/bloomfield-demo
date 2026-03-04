"use client"

import { cn } from "@/lib/utils"
import { type Stock } from "@/data/stocks"

interface TickerTapeProps {
  stocks: Stock[]
}

export function TickerTape({ stocks }: TickerTapeProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-card/50">
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {[...stocks, ...stocks].map((stock, i) => (
          <div
            key={`${stock.ticker}-${i}`}
            className="flex shrink-0 items-center gap-2 px-4 py-1.5"
          >
            <span className="font-mono text-xs font-medium text-foreground">
              {stock.ticker}
            </span>
            <span className="font-mono text-xs text-foreground tabular-nums">
              {stock.price.toLocaleString("fr-FR")}
            </span>
            <span
              className={cn(
                "font-mono text-xs tabular-nums",
                stock.changePercent >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {stock.changePercent >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
