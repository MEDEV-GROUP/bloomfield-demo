"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react"

const alertsData = [
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
]

export function WidgetAlerts() {
  return (
    <ScrollArea className="h-full min-h-0">
      <div className="space-y-1">
        {alertsData.map((alert, i) => {
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
  )
}
