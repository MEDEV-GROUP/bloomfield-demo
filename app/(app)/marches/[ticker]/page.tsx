"use client"

import { CandlestickChart } from "@/components/candlestick-chart"
import { PriceCell } from "@/components/price-cell"
import { ScoreGauge } from "@/components/score-gauge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { news } from "@/data/news"
import {
  generateCandlestickData,
  generateOrderBook,
  stockFundamentals,
  stockNews,
  tigranScores,
} from "@/data/stock-details"
import { stocks as initialStocks, type Stock } from "@/data/stocks"
import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"

const periods = ["1J", "1S", "1M", "3M", "6M", "1A", "5A"] as const

export default function FicheValeurPage({
  params,
}: {
  params: Promise<{ ticker: string }>
}) {
  const { ticker } = use(params)
  const tickerUp = ticker.toUpperCase()

  const initialStock = initialStocks.find((s) => s.ticker === tickerUp)
  const [stock, setStock] = useState<Stock | null>(initialStock ?? null)
  const [period, setPeriod] = useState<string>("3M")

  const fundamentals = stockFundamentals[tickerUp]
  const tigran = tigranScores[tickerUp]
  const relatedNewsIds = stockNews[tickerUp] ?? []
  const relatedNews = news.filter((n) => relatedNewsIds.includes(n.id))

  const candlestickData = stock
    ? generateCandlestickData(tickerUp, stock.previousClose, period)
    : []

  const [orderBook, setOrderBook] = useState<{ bids: any[], asks: any[] }>({ bids: [], asks: [] })

  useEffect(() => {
    if (stock) {
      setOrderBook(generateOrderBook(stock.price))
    }
  }, [stock?.price]) // Regenerate when price changes (or initially)

  useEffect(() => {
    if (!stock) return
    const interval = setInterval(() => {
      setStock((prev) => {
        if (!prev) return prev
        if (Math.random() > 0.5) return prev
        const variation = (Math.random() - 0.5) * 0.008
        const newPrice = Math.round(prev.price * (1 + variation))
        const newChange = newPrice - prev.previousClose
        const newChangePercent = Number(
          ((newChange / prev.previousClose) * 100).toFixed(2)
        )
        return {
          ...prev,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
        }
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [stock])

  if (!stock) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Valeur introuvable</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Le ticker &laquo;{tickerUp}&raquo; n&apos;existe pas
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/">Retour au Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* En-tête compact */}
      <div className="flex shrink-0 items-center gap-4 border-b border-border px-4 py-2" data-tour="ticker-header">
        <Button asChild variant="ghost" size="icon" className="size-7">
          <Link href="/">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{stock.name}</span>
          <Badge variant="secondary" className="text-[10px]">
            {stock.ticker}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {stock.sector}
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-5" />

        <div className="flex items-center gap-2">
          <PriceCell price={stock.price} className="text-lg font-bold" />
          <span className="text-xs text-muted-foreground">XOF</span>
          <span
            className={cn(
              "flex items-center gap-0.5 font-mono text-xs",
              stock.change >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {stock.change >= 0 ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {stock.change >= 0 ? "+" : ""}
            {stock.change.toLocaleString("fr-FR")} (
            {stock.changePercent >= 0 ? "+" : ""}
            {stock.changePercent.toFixed(2)}%)
          </span>
        </div>

        <Separator orientation="vertical" className="h-5" />

        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span>
            Ouv{" "}
            <span className="font-mono text-foreground">
              {stock.open.toLocaleString("fr-FR")}
            </span>
          </span>
          <span>
            Haut{" "}
            <span className="font-mono text-foreground">
              {stock.high.toLocaleString("fr-FR")}
            </span>
          </span>
          <span>
            Bas{" "}
            <span className="font-mono text-foreground">
              {stock.low.toLocaleString("fr-FR")}
            </span>
          </span>
          <span>
            Vol{" "}
            <span className="font-mono text-foreground">
              {stock.volume.toLocaleString("fr-FR")}
            </span>
          </span>
        </div>
      </div>

      {/* Corps : Graphique + panneau droit */}
      <div className="flex flex-1 overflow-hidden">
        {/* Zone graphique (prend tout l'espace) */}
        <div className="flex flex-1 flex-col overflow-hidden border-r border-border">
          {/* Period selector */}
          <div className="flex shrink-0 items-center gap-1 border-b border-border px-3 py-1.5">
            {periods.map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "ghost"}
                size="sm"
                className="h-6 px-2.5 text-[10px]"
                onClick={() => setPeriod(p)}
              >
                {p}
              </Button>
            ))}
          </div>

          {/* Chart — remplit tout */}
          <div className="flex-1" data-tour="ticker-chart">
            <CandlestickChart data={candlestickData} />
          </div>
        </div>

        {/* Panneau droit — fixe 280px */}
        <div className="flex w-[280px] shrink-0 flex-col overflow-auto">
          {/* Carnet d'ordres */}
          <div className="border-b border-border px-3 py-2" data-tour="ticker-orderbook">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Carnet d&apos;ordres
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-1 text-[10px] font-medium text-green-500">
                  Bid
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-0">
                      <TableHead className="h-auto px-0 py-0.5 text-[10px]">
                        Prix
                      </TableHead>
                      <TableHead className="h-auto px-0 py-0.5 text-right text-[10px]">
                        Qté
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderBook.bids.map((entry, i) => (
                      <TableRow key={i} className="border-0">
                        <TableCell className="px-0 py-0 font-mono text-[11px] text-green-500">
                          {entry.price.toLocaleString("fr-FR")}
                        </TableCell>
                        <TableCell className="px-0 py-0 text-right font-mono text-[11px]">
                          {entry.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-medium text-red-500">
                  Ask
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-0">
                      <TableHead className="h-auto px-0 py-0.5 text-[10px]">
                        Prix
                      </TableHead>
                      <TableHead className="h-auto px-0 py-0.5 text-right text-[10px]">
                        Qté
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderBook.asks.map((entry, i) => (
                      <TableRow key={i} className="border-0">
                        <TableCell className="px-0 py-0 font-mono text-[11px] text-red-500">
                          {entry.price.toLocaleString("fr-FR")}
                        </TableCell>
                        <TableCell className="px-0 py-0 text-right font-mono text-[11px]">
                          {entry.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Fondamentaux */}
          {fundamentals && (
            <div className="border-b border-border px-3 py-2" data-tour="ticker-fundamentals">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Fondamentaux
              </div>
              <div className="space-y-1">
                {[
                  { label: "PER", value: `${fundamentals.per.toFixed(1)}x` },
                  { label: "ROE", value: `${fundamentals.roe.toFixed(1)}%` },
                  {
                    label: "Div. yield",
                    value: `${fundamentals.dividendYield.toFixed(1)}%`,
                  },
                  { label: "Cap.", value: fundamentals.marketCap },
                  {
                    label: "BPA",
                    value: `${fundamentals.eps.toLocaleString("fr-FR")} XOF`,
                  },
                  {
                    label: "D/CP",
                    value: `${fundamentals.debtToEquity.toFixed(2)}x`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[11px] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Score Tigran */}
          {tigran && (
            <div className="border-b border-border px-3 py-2" data-tour="ticker-tigran">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Bloomfield Tigran
              </div>
              <div className="flex items-center gap-3">
                <ScoreGauge
                  score={tigran.score}
                  rating={tigran.rating}
                  size={80}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-lg font-bold">
                      {tigran.rating}
                    </span>
                    <Badge
                      variant={
                        tigran.outlook === "Positif"
                          ? "default"
                          : tigran.outlook === "Négatif"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-[9px]"
                    >
                      {tigran.outlook}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {tigran.date}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actualités liées */}
          {relatedNews.length > 0 && (
            <div className="px-3 py-2">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Actualités
              </div>
              <div className="space-y-2">
                {relatedNews.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <p className="text-[11px] leading-tight transition-colors group-hover:text-primary">
                      {item.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1">
                      <span className="text-[9px] text-muted-foreground">
                        {item.source}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        &middot;
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
