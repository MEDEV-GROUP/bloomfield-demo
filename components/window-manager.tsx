"use client"

import { FloatingWindow } from "@/components/floating-window"
import { WidgetAlerts } from "@/components/widgets/widget-alerts"
import { WidgetIndices } from "@/components/widgets/widget-indices"
import { WidgetIntradayChart } from "@/components/widgets/widget-intraday-chart"
import { WidgetMacro } from "@/components/widgets/widget-macro"
import { WidgetMovers } from "@/components/widgets/widget-movers"
import { WidgetNews } from "@/components/widgets/widget-news"
import { WidgetOrderBook } from "@/components/widgets/widget-order-book"
import { type Stock } from "@/data/stocks"
import { cn } from "@/lib/utils"
import { useWindowStore, type WindowType } from "@/store/window-store"
import { LayoutGrid } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"

interface WindowManagerProps {
  stocks: Stock[]
}

const TOUR_TARGET_BY_TYPE: Partial<Record<WindowType, string>> = {
  INDICES: "widget-indices",
  MOVERS: "widget-movers",
  INTRADAY_CHART: "widget-chart",
  ALERTS: "widget-alerts",
}

function WidgetRenderer({ type, stocks }: { type: WindowType; stocks: Stock[] }) {
  switch (type) {
    case "INDICES":
      return <WidgetIndices />
    case "MOVERS":
      return <WidgetMovers stocks={stocks} />
    case "ORDER_BOOK":
      return <WidgetOrderBook />
    case "INTRADAY_CHART":
      return <WidgetIntradayChart />
    case "NEWS":
      return <WidgetNews />
    case "ALERTS":
      return <WidgetAlerts />
    case "MACRO":
      return <WidgetMacro />
    default:
      return <div className="text-sm text-muted-foreground">Widget inconnu</div>
  }
}

export function WindowManager({ stocks }: WindowManagerProps) {
  const { windows, toggleMinimize, focusWindow, resetLayout, initializeDefaults } = useWindowStore()
  const desktopRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  const minimizedWindows = windows.filter((w) => w.isMinimized)
  const visibleWindows = windows.filter((w) => !w.isMinimized)

  // Initialize default windows based on actual desktop area dimensions
  useEffect(() => {
    if (initialized.current) return
    if (windows.length > 0) return
    initialized.current = true

    requestAnimationFrame(() => {
      if (!desktopRef.current) return
      const { width, height } = desktopRef.current.getBoundingClientRect()
      if (width === 0 || height === 0) return
      initializeDefaults(width, height)
    })
  }, [initializeDefaults, windows.length])

  useEffect(() => {
    const handleTourStart = () => {
      if (!desktopRef.current) return
      const { width, height } = desktopRef.current.getBoundingClientRect()
      if (width === 0 || height === 0) return
      resetLayout(width, height)
    }

    window.addEventListener("bloomfield:tour:start", handleTourStart)
    return () => window.removeEventListener("bloomfield:tour:start", handleTourStart)
  }, [resetLayout])

  const handleReorganize = useCallback(() => {
    if (!desktopRef.current) return
    const { width, height } = desktopRef.current.getBoundingClientRect()
    resetLayout(width, height)
  }, [resetLayout])

  const getMaximizeBounds = useCallback(() => {
    if (!desktopRef.current) return undefined
    const { width, height } = desktopRef.current.getBoundingClientRect()
    if (width <= 0 || height <= 0) return undefined
    return {
      x: 0,
      y: 0,
      width: Math.round(width),
      height: Math.round(height),
    }
  }, [])

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Desktop area — floating windows */}
      <div ref={desktopRef} className="relative flex-1 overflow-hidden">
        {visibleWindows.map((win) => (
          <FloatingWindow
            key={win.id}
            window={win}
            tourId={TOUR_TARGET_BY_TYPE[win.type]}
            getMaximizeBounds={getMaximizeBounds}
          >
            <WidgetRenderer type={win.type} stocks={stocks} />
          </FloatingWindow>
        ))}
      </div>

      {/* Taskbar — always visible */}
      <div className="flex h-9 shrink-0 items-center gap-1 border-t border-border bg-accent/40 px-2">
        {/* Reorganize button */}
        <button
          type="button"
          onClick={handleReorganize}
          className={cn(
            "flex h-7 items-center gap-1.5 rounded px-3 text-xs font-medium",
            "bg-primary/10 border border-primary/20 text-primary",
            "transition-colors hover:bg-primary/20"
          )}
          title="Réorganiser les fenêtres"
        >
          <LayoutGrid className="size-3.5" />
          <span>Réorganiser</span>
        </button>

        {/* Minimized windows */}
        {minimizedWindows.map((win) => (
          <button
            key={win.id}
            type="button"
            onClick={() => {
              toggleMinimize(win.id)
              focusWindow(win.id)
            }}
            className={cn(
              "flex h-7 items-center gap-1.5 rounded px-3 text-xs font-medium",
              "bg-card border border-border shadow-sm",
              "transition-colors hover:bg-accent"
            )}
          >
            <div className="size-2 rounded-full bg-primary" />
            <span className="max-w-[120px] truncate">{win.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
