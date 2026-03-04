"use client"

import { useEffect, useRef } from "react"
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  type IChartApi,
  type CandlestickData,
  type HistogramData,
  type Time,
} from "lightweight-charts"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

interface CandlestickChartProps {
  data: {
    time: string | number
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
  className?: string
}

function getChartColors(theme: "light" | "dark") {
  if (theme === "dark") {
    return {
      textColor: "#8b8d97",
      gridColor: "rgba(255,255,255,0.04)",
      borderColor: "rgba(255,255,255,0.08)",
      crosshairColor: "rgba(255,255,255,0.15)",
    }
  }
  return {
    textColor: "#6b7280",
    gridColor: "rgba(0,0,0,0.06)",
    borderColor: "rgba(0,0,0,0.1)",
    crosshairColor: "rgba(0,0,0,0.15)",
  }
}

export function CandlestickChart({ data, className }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return

    const colors = getChartColors(theme)

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: colors.textColor,
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: colors.gridColor },
        horzLines: { color: colors.gridColor },
      },
      rightPriceScale: {
        borderColor: colors.borderColor,
      },
      timeScale: {
        borderColor: colors.borderColor,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        horzLine: { color: colors.crosshairColor },
        vertLine: { color: colors.crosshairColor },
      },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    })

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderDownColor: "#ef4444",
      borderUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      wickUpColor: "#22c55e",
    })

    const candleData: CandlestickData<Time>[] = data.map((d) => ({
      time: d.time as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }))
    candleSeries.setData(candleData)

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    })
    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
    })

    const volumeData: HistogramData<Time>[] = data.map((d) => ({
      time: d.time as Time,
      value: d.volume,
      color: d.close >= d.open ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
    }))
    volumeSeries.setData(volumeData)

    chart.timeScale().fitContent()
    chartRef.current = chart

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        chart.applyOptions({ width, height })
      }
    })
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      chart.remove()
    }
  }, [data, theme])

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full [&_a[href*='tradingview']]:!hidden", className)}
    />
  )
}
