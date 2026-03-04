"use client"

import { useState } from "react"
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Wallet,
  Newspaper,
  Settings2,
  CheckCheck,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { stocks } from "@/data/stocks"
import { portfolioSummary } from "@/data/portfolio"
import { news } from "@/data/news"
import { apiConnections } from "@/data/settings"

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
  /** Pour les alertes de cours : indique le sens de variation */
  trend?: "up" | "down"
}

// ─── Génération des notifications à partir des données simulées ───────────────

/**
 * Construit la liste initiale de notifications en agrégeant les données
 * des différents modules : marchés, portefeuille, news, système.
 * Les notifications non lues sont remontées en tête de liste.
 */
function buildNotifications(): Notification[] {
  // Alertes cours — seuil : variation ≥ 1 %
  const marketAlerts: Notification[] = stocks
    .filter((s) => Math.abs(s.changePercent) >= 1)
    .map((s) => ({
      id: `market-${s.ticker}`,
      category: "marchés" as NotifCategory,
      title: `Alerte cours — ${s.ticker}`,
      description: `${s.name} ${s.changePercent > 0 ? "+" : ""}${s.changePercent.toFixed(2)}% à ${s.price.toLocaleString("fr-FR")} XOF`,
      timestamp: "Il y a 15 min",
      read: false,
      trend: (s.changePercent > 0 ? "up" : "down") as "up" | "down",
    }))

  // P&L journalier + suggestion de rééquilibrage
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

  // Actualités — les 2 premières sont non lues
  const newsAlerts: Notification[] = news.map((item, i) => ({
    id: `news-${item.id}`,
    category: "actualités" as NotifCategory,
    title: item.category,
    description: item.title,
    timestamp: item.timestamp,
    read: i >= 2,
  }))

  // Alertes système — dérivées des statuts API réels
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

  // Non lues en tête, lues en bas
  return [...marketAlerts, ...portfolioAlerts, ...newsAlerts, ...systemAlerts].sort(
    (a, b) => Number(a.read) - Number(b.read)
  )
}

const INITIAL_NOTIFICATIONS = buildNotifications()

// ─── Icône contextuelle par catégorie ─────────────────────────────────────────

function NotifIcon({
  category,
  trend,
}: {
  category: NotifCategory
  trend?: "up" | "down"
}) {
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

// ─── Constantes de style par catégorie ─────────────────────────────────────────

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
  { value: "portefeuille", label: "Portefeuille" },
  { value: "actualités", label: "Actualités" },
  { value: "système", label: "Système" },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = useState<FilterValue>("tout")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered =
    filter === "tout"
      ? notifications
      : notifications.filter((n) => n.category === filter)

  /** Marque toutes les notifications comme lues */
  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  /** Marque une notification individuelle comme lue au clic */
  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="size-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="gap-2"
        >
          <CheckCheck className="size-4" />
          Tout marquer comme lu
        </Button>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex items-center gap-1">
        {FILTERS.map((f) => {
          // Nombre de non lues pour chaque filtre (affiché sous forme de badge)
          const count =
            f.value === "tout"
              ? notifications.filter((n) => !n.read).length
              : notifications.filter((n) => n.category === f.value && !n.read).length

          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                filter === f.value
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              {f.label}
              {count > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Liste des notifications */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
                <Bell className="size-8 opacity-30" />
                <p className="text-sm">Aucune notification dans cette catégorie</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={cn(
                      "flex w-full items-start gap-4 px-4 py-4 text-left transition-colors hover:bg-accent/40",
                      !notif.read && "bg-primary/3"
                    )}
                  >
                    {/* Icône contextuelle */}
                    <div
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                        ICON_BG[notif.category]
                      )}
                    >
                      <NotifIcon category={notif.category} trend={notif.trend} />
                    </div>

                    {/* Contenu textuel */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "pointer-events-none px-1.5 py-0 text-[10px] font-medium",
                            BADGE_CLASSES[notif.category]
                          )}
                        >
                          {CATEGORY_LABELS[notif.category]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{notif.timestamp}</span>
                      </div>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          notif.read && "font-normal text-muted-foreground"
                        )}
                      >
                        {notif.title}
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {notif.description}
                      </p>
                    </div>

                    {/* Indicateur de non-lecture */}
                    {!notif.read && (
                      <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
