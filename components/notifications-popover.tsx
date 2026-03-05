"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Bell,
  Clock,
  Newspaper,
  Settings2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { useState } from "react"

import { news } from "@/data/news"
import { portfolioSummary } from "@/data/portfolio"
import { apiConnections } from "@/data/settings"
import { stocks } from "@/data/stocks"

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifCategory = "marchés" | "portefeuille" | "actualités" | "système"

interface Notification {
  id: string
  category: NotifCategory
  title: string
  description: string
  timestamp: string
  read: boolean
  trend?: "up" | "down"
}

// ─── Génération des notifications à partir des données simulées ───────────────

function buildNotifications(): Notification[] {
  const marketAlerts: Notification[] = stocks
    .filter((s) => Math.abs(s.changePercent) >= 1)
    .map((s) => ({
      id: `market-${s.ticker}`,
      category: "marchés",
      title: `Alerte cours — ${s.ticker}`,
      description: `${s.name} ${s.changePercent > 0 ? "+" : ""}${s.changePercent.toFixed(2)}% à ${s.price.toLocaleString("fr-FR")} XOF`,
      timestamp: "Il y a 15 min",
      read: false,
      trend: s.changePercent > 0 ? "up" : "down",
    }))

  const portfolioAlerts: Notification[] = [
    {
      id: "portfolio-pnl",
      category: "portefeuille",
      title: "Résumé P&L journalier",
      description: `+${portfolioSummary.pnlDay.toLocaleString("fr-FR")} XOF (+${portfolioSummary.pnlDayPercent}%) — Valeur totale : ${portfolioSummary.totalValue.toLocaleString("fr-FR")} XOF`,
      timestamp: "Il y a 1h",
      read: false,
    },
    {
      id: "portfolio-rebalancing",
      category: "portefeuille",
      title: "Suggestion de rééquilibrage",
      description:
        "Le secteur Banques (40,4 %) dépasse l'allocation cible de 5 pts. Revue recommandée.",
      timestamp: "Il y a 3h",
      read: true,
    },
  ]

  const newsAlerts: Notification[] = news.map((item, i) => ({
    id: `news-${item.id}`,
    category: "actualités" as NotifCategory,
    title: item.category,
    description: item.title,
    timestamp: item.timestamp,
    read: i >= 2,
  }))

  const degradedApis = apiConnections.filter((a) => a.status !== "connecté")
  const systemAlerts: Notification[] = [
    ...degradedApis.map((api) => ({
      id: `sys-${api.name.replace(/\s/g, "-").toLowerCase()}`,
      category: "système" as NotifCategory,
      title: `Service dégradé — ${api.name}`,
      description: `Latence anormale détectée : ${api.latency}. Certaines fonctionnalités peuvent être ralenties.`,
      timestamp: "Il y a 30 min",
      read: false,
    })),
    {
      id: "sys-maintenance",
      category: "système" as NotifCategory,
      title: "Maintenance planifiée",
      description:
        "Fenêtre de maintenance le 5 mars 2026 de 02h00 à 04h00 UTC. Le terminal sera temporairement indisponible.",
      timestamp: "Hier",
      read: true,
    },
  ]

  return [...marketAlerts, ...portfolioAlerts, ...newsAlerts, ...systemAlerts].sort(
    (a, b) => Number(a.read) - Number(b.read)
  )
}

const INITIAL_NOTIFICATIONS = buildNotifications()

// ─── Icône contextuelle ─────────────────────────────────────────

function NotifIcon({
  category,
  trend,
  className,
}: {
  category: NotifCategory
  trend?: "up" | "down"
  className?: string
}) {
  if (category === "marchés") {
    return trend === "down" ? (
      <TrendingDown className={cn("size-4 text-red-500", className)} />
    ) : (
      <TrendingUp className={cn("size-4 text-green-500", className)} />
    )
  }
  if (category === "portefeuille") {
    return <Wallet className={cn("size-4 text-blue-400", className)} />
  }
  if (category === "actualités") {
    return <Newspaper className={cn("size-4 text-muted-foreground", className)} />
  }
  return <Settings2 className={cn("size-4 text-amber-500", className)} />
}

const CATEGORY_LABEL: Record<NotifCategory, string> = {
  marchés: "Marchés",
  portefeuille: "Portefeuille",
  actualités: "Actualités",
  système: "Système",
}

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex size-2 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
              <span className="sr-only">{unreadCount} non lues</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[380px] p-0 shadow-lg" sideOffset={8}>
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="px-1.5 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="h-auto px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground"
          >
            Tout lire
          </Button>
        </div>

        <ScrollArea className="flex h-[340px] flex-col">
          {notifications.length === 0 ? (
            <div className="flex h-[340px] flex-col items-center justify-center gap-2 p-6 text-muted-foreground">
              <Bell className="size-6 opacity-20" />
              <p className="text-xs">Aucune notification</p>
            </div>
          ) : (
            <div className="space-y-1 p-3">
              {notifications.map((notif) => (
                <article
                  key={notif.id}
                  className="group relative w-full rounded-md border border-transparent p-2 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => !notif.read && markRead(notif.id)}
                      className="group flex min-w-0 flex-1 items-start gap-2.5 rounded-sm text-left"
                      aria-label={`Notification ${notif.title}`}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "text-xs font-medium leading-snug",
                            notif.read ? "text-foreground/80" : "text-foreground"
                          )}
                        >
                          {notif.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                          {notif.description}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <Clock className="size-2.5" />
                            {notif.timestamp}
                          </span>
                          <span className="text-[10px] text-muted-foreground">&middot;</span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <NotifIcon
                              category={notif.category}
                              trend={notif.trend}
                              className="size-2.5"
                            />
                            {CATEGORY_LABEL[notif.category]}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
