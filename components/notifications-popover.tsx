"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  Bell,
  CheckCheck,
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
type FilterValue = "tout" | NotifCategory

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

function NotifIcon({ category, trend }: { category: NotifCategory; trend?: "up" | "down" }) {
  if (category === "marchés") {
    return trend === "down" ? (
      <TrendingDown className="size-4 text-red-500" />
    ) : (
      <TrendingUp className="size-4 text-green-500" />
    )
  }
  if (category === "portefeuille") return <Wallet className="size-4 text-blue-400" />
  if (category === "actualités") return <Newspaper className="size-4 text-muted-foreground" />
  return <Settings2 className="size-4 text-amber-500" />
}

// ─── Constantes de style ─────────────────────────────────────────

const CATEGORY_LABELS: Record<NotifCategory, string> = {
  marchés: "Marchés",
  portefeuille: "Portefeuille",
  actualités: "Actualités",
  système: "Système",
}

const ICON_BG: Record<NotifCategory, string> = {
  marchés: "bg-primary/10",
  portefeuille: "bg-blue-500/10",
  actualités: "bg-muted",
  système: "bg-amber-500/10",
}

const BADGE_CLASSES: Record<NotifCategory, string> = {
  marchés: "bg-primary/10 text-primary hover:bg-primary/10",
  portefeuille: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/10",
  actualités: "bg-muted text-muted-foreground hover:bg-muted",
  système: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10",
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "tout", label: "Tout" },
  { value: "marchés", label: "Marchés" },
  { value: "portefeuille", label: "Portef." },
]

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = useState<FilterValue>("tout")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered =
    filter === "tout"
      ? notifications
      : notifications.filter((n) => n.category === filter)

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
            <CheckCheck className="mr-1 size-3" />
            Tout lire
          </Button>
        </div>

        <Tabs
          defaultValue="tout"
          value={filter}
          onValueChange={(val) => setFilter(val as FilterValue)}
          className="flex flex-col"
        >
          <div className="px-4 pt-3 pb-2 border-b">
            <TabsList className="h-8 w-full justify-start grid grid-cols-3">
              {FILTERS.map((f) => (
                <TabsTrigger
                  key={f.value}
                  value={f.value}
                  className="text-[10px] h-6 px-2"
                >
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex h-[340px] flex-col">
            {filtered.length === 0 ? (
              <div className="flex h-[340px] flex-col items-center justify-center gap-2 p-6 text-muted-foreground">
                <Bell className="size-6 opacity-20" />
                <p className="text-xs">Aucune notification</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y">
                <TooltipProvider delayDuration={300}>
                  {filtered.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "group relative flex items-start gap-3 p-4 transition-colors hover:bg-muted/40",
                        !notif.read && "bg-primary/[0.03]"
                      )}
                    >
                      {!notif.read && (
                        <div className="absolute left-0 top-0 h-full w-[2px] bg-primary" />
                      )}

                      <Avatar className={cn("size-8 shrink-0", ICON_BG[notif.category])}>
                        <AvatarFallback className="bg-transparent">
                          <NotifIcon category={notif.category} trend={notif.trend} />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={cn(
                              "text-xs font-medium leading-tight",
                              notif.read ? "text-muted-foreground font-normal" : "text-foreground"
                            )}
                          >
                            {notif.title}
                          </p>
                          <span className="text-[9px] text-muted-foreground shrink-0">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                          {notif.description}
                        </p>
                      </div>

                      {!notif.read && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6 shrink-0 rounded-full opacity-0 group-hover:opacity-100"
                              onClick={() => markRead(notif.id)}
                            >
                              <CheckCheck className="size-3" />
                              <span className="sr-only">Lu</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-[10px]">Lu</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </TooltipProvider>
              </div>
            )}
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
