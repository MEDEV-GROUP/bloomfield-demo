"use client"

import { TickerTape } from "@/components/ticker-tape"
import { WindowManager } from "@/components/window-manager"
import { stocks as initialStocks, type Stock } from "@/data/stocks"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [stockData, setStockData] = useState<Stock[]>(initialStocks)

  // Real-time stock simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData((prev) =>
        prev.map((stock) => {
          if (Math.random() > 0.4) return stock

          const variation = (Math.random() - 0.5) * 0.01
          const newPrice = Math.round(stock.price * (1 + variation))
          const newChange = newPrice - stock.previousClose
          const newChangePercent = Number(
            ((newChange / stock.previousClose) * 100).toFixed(2)
          )
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          }
        })
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TickerTape stocks={stockData} />
      <WindowManager stocks={stockData} />
    </div>
  )
}
