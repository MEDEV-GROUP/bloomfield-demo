"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { stocks as initialStocks, orderBookData, type Stock } from "@/data/stocks"
import { indices } from "@/data/indices"
import { news } from "@/data/news"
import { macroIndicators } from "@/data/macro"
import { TickerTape } from "@/components/ticker-tape"
import { WidgetContainer } from "@/components/widget-container"
import { Sparkline } from "@/components/sparkline"
import { PriceCell } from "@/components/price-cell"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronUp,
  ChevronDown,
  Activity,
  Clock,
  Landmark,
  Flame,
  Percent,
  DollarSign,
  Scale,
  Ship,
  Vault,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"

function generateIntradayData() {
  const data = []
  let price = 17640
  for (let hour = 8; hour <= 16; hour++) {
    for (let min = 0; min < 60; min += 15) {
      price += (Math.random() - 0.48) * 50
      data.push({
        time: `${hour}:${min.toString().padStart(2, "0")}`,
        price: Math.round(price),
      })
    }
  }
  return data
}

export default function DashboardPage() {
  const [stockData, setStockData] = useState<Stock[]>(initialStocks)
  const [intradayData] = useState(() => generateIntradayData())

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

  const topGainers = useMemo(
    () =>
      [...stockData]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 5),
    [stockData]
  )

  const topLosers = useMemo(
    () =>
      [...stockData]
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 5),
    [stockData]
  )

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TickerTape stocks={stockData} />
      <div className="grid flex-1 grid-cols-12 gap-3 overflow-auto p-4">
        {/* Indices BRVM */}
        <WidgetContainer title="Indices BRVM" className="col-span-3">
          <div className="space-y-4">
            {indices.map((index) => (
              <div key={index.name}>
                <div className="text-xs text-muted-foreground">
                  {index.name}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-semibold tabular-nums">
                      {index.value.toLocaleString("fr-FR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <Badge
                      variant={
                        index.changePercent >= 0 ? "default" : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {index.changePercent >= 0 ? "+" : ""}
                      {index.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                  <Sparkline data={index.history} className="h-10 w-28" />
                </div>
              </div>
            ))}
          </div>
        </WidgetContainer>

        {/* Top Movers */}
        <WidgetContainer title="Top Movers" className="col-span-5">
          <div className="grid grid-cols-2 gap-4">
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
        </WidgetContainer>

        {/* Carnet d'ordres */}
        <WidgetContainer title="Carnet d'ordres — SNTS" className="col-span-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 text-xs font-medium text-green-500">
                Achat (Bid)
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-0">
                    <TableHead className="h-auto px-0 py-1 text-xs">
                      Prix
                    </TableHead>
                    <TableHead className="h-auto px-0 py-1 text-right text-xs">
                      Qté
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderBookData.bids.map((entry, i) => (
                    <TableRow key={i} className="border-0">
                      <TableCell className="px-0 py-0.5 font-mono text-xs text-green-500">
                        {entry.price.toLocaleString("fr-FR")}
                      </TableCell>
                      <TableCell className="px-0 py-0.5 text-right font-mono text-xs">
                        {entry.quantity.toLocaleString("fr-FR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <div className="mb-2 text-xs font-medium text-red-500">
                Vente (Ask)
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-0">
                    <TableHead className="h-auto px-0 py-1 text-xs">
                      Prix
                    </TableHead>
                    <TableHead className="h-auto px-0 py-1 text-right text-xs">
                      Qté
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderBookData.asks.map((entry, i) => (
                    <TableRow key={i} className="border-0">
                      <TableCell className="px-0 py-0.5 font-mono text-xs text-red-500">
                        {entry.price.toLocaleString("fr-FR")}
                      </TableCell>
                      <TableCell className="px-0 py-0.5 text-right font-mono text-xs">
                        {entry.quantity.toLocaleString("fr-FR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </WidgetContainer>

        {/* Mini-graphique intraday */}
        <WidgetContainer
          title="SONATEL — Intraday"
          className="col-span-8"
        >
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intradayData}>
                <defs>
                  <linearGradient
                    id="priceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={["auto", "auto"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  width={55}
                  tickFormatter={(v: number) => v.toLocaleString("fr-FR")}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  fill="url(#priceGradient)"
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </WidgetContainer>

        {/* Actualités */}
        <WidgetContainer title="Actualités" className="col-span-4">
          <ScrollArea className="h-52">
            <div className="space-y-3">
              {news.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="flex items-start gap-2">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="text-xs font-medium leading-tight transition-colors group-hover:text-primary">
                        {item.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">
                          {item.source}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          &middot;
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </WidgetContainer>

        {/* Alertes */}
        <WidgetContainer title="Alertes" className="col-span-6">
          <ScrollArea className="h-52">
            <div className="space-y-1">
              {[
                {
                  type: "hausse" as const,
                  icon: ChevronUp,
                  ticker: "SNTS",
                  message: "Franchit les 17 800 XOF",
                  detail: "+1.2%",
                  time: "14:32",
                },
                {
                  type: "volume" as const,
                  icon: BarChart3,
                  ticker: "SGBC",
                  message: "Volume anormal détecté",
                  detail: "×3.2 moy.",
                  time: "13:45",
                },
                {
                  type: "baisse" as const,
                  icon: ChevronDown,
                  ticker: "SLBC",
                  message: "Passe sous les 14 200 XOF",
                  detail: "-0.6%",
                  time: "12:18",
                },
                {
                  type: "hausse" as const,
                  icon: ChevronUp,
                  ticker: "PALC",
                  message: "Nouveau plus haut 30J",
                  detail: "+1.4%",
                  time: "11:50",
                },
                {
                  type: "alert" as const,
                  icon: AlertTriangle,
                  ticker: "SMBC",
                  message: "Baisse consécutive 3 séances",
                  detail: "-1.4%",
                  time: "11:15",
                },
                {
                  type: "volume" as const,
                  icon: BarChart3,
                  ticker: "CIEC",
                  message: "Volume inhabituel",
                  detail: "×2.8 moy.",
                  time: "10:42",
                },
                {
                  type: "hausse" as const,
                  icon: ChevronUp,
                  ticker: "TTLC",
                  message: "Franchit résistance 2 440",
                  detail: "+1.2%",
                  time: "10:05",
                },
                {
                  type: "baisse" as const,
                  icon: ChevronDown,
                  ticker: "ONTBF",
                  message: "Cassure support 3 980",
                  detail: "-1.5%",
                  time: "09:38",
                },
                {
                  type: "info" as const,
                  icon: Activity,
                  ticker: null,
                  message: "Indice BRVM Composite +1.01%",
                  detail: "234,56",
                  time: "09:00",
                },
                {
                  type: "info" as const,
                  icon: Bell,
                  ticker: null,
                  message: "Séance BRVM ouverte — 142 ordres en attente",
                  detail: "",
                  time: "08:00",
                },
              ].map((alert, i) => {
                const Icon = alert.icon
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-accent/50",
                      i === 0 && "bg-accent/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded",
                        alert.type === "hausse" && "bg-green-500/10 text-green-500",
                        alert.type === "baisse" && "bg-red-500/10 text-red-500",
                        alert.type === "volume" && "bg-yellow-500/10 text-yellow-500",
                        alert.type === "alert" && "bg-orange-500/10 text-orange-500",
                        alert.type === "info" && "bg-blue-500/10 text-blue-500"
                      )}
                    >
                      <Icon className="size-3.5" />
                    </div>
                    <div className="flex flex-1 items-center gap-2 overflow-hidden">
                      {alert.ticker && (
                        <span className="shrink-0 font-mono text-[11px] font-semibold">
                          {alert.ticker}
                        </span>
                      )}
                      <span className="truncate text-xs text-muted-foreground">
                        {alert.message}
                      </span>
                    </div>
                    {alert.detail && (
                      <Badge
                        variant={
                          alert.type === "hausse"
                            ? "default"
                            : alert.type === "baisse" || alert.type === "alert"
                              ? "destructive"
                              : "secondary"
                        }
                        className="shrink-0 px-1.5 text-[10px]"
                      >
                        {alert.detail}
                      </Badge>
                    )}
                    <span className="flex shrink-0 items-center gap-1 text-[10px] tabular-nums text-muted-foreground">
                      <Clock className="size-2.5" />
                      {alert.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </WidgetContainer>

        {/* Indicateurs Macro */}
        <WidgetContainer title="Indicateurs Macro" className="col-span-6">
          {(() => {
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
            return (
              <div className="grid grid-cols-3 gap-2">
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
            )
          })()}
        </WidgetContainer>
      </div>
    </div>
  )
}
