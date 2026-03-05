"use client"

import { useState, useMemo } from "react"
import { news, type NewsItem } from "@/data/news"
import { stocks } from "@/data/stocks"
import { WidgetContainer } from "@/components/widget-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Newspaper,
  Clock,
  ArrowUpRight,
  ChevronRight,
  X,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Tag,
  Hash,
  ExternalLink,
} from "lucide-react"


/** Toutes les catégories extraites dynamiquement des données */
const ALL_CATEGORIES = "Toutes"

/** Mapping catégorie -> couleur de badge pour cohérence visuelle */
const CATEGORY_COLORS: Record<string, string> = {
  Résultats: "text-green-400 bg-green-500/10 border-green-500/20",
  "Politique monétaire": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Corporate: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Marchés: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Macro: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Notation: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Obligations: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
}

/** Couleur de fallback pour les catégories non mappées */
const DEFAULT_CATEGORY_COLOR =
  "text-muted-foreground bg-muted/50 border-border"

/** Badge de catégorie coloré selon le mapping CATEGORY_COLORS */
function CategoryBadge({ category }: { category: string }) {
  const colorClass = CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium",
        colorClass
      )}
    >
      {category}
    </span>
  )
}

interface NewsDetailPanelProps {
  item: NewsItem
  onClose: () => void
}

function NewsDetailPanel({ item, onClose }: NewsDetailPanelProps) {
  // Cherche les données boursières si un ticker est associé
  const relatedStock = item.relatedTicker
    ? stocks.find((s) => s.ticker === item.relatedTicker)
    : null

  return (
    <div className="flex h-full flex-col">
      {/* Header du panneau */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <CategoryBadge category={item.category} />
            {item.relatedTicker && (
              <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">
                <Hash className="size-2.5" />
                {item.relatedTicker}
              </span>
            )}
          </div>
          <h2 className="text-sm font-semibold leading-snug">{item.title}</h2>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
            {item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/80 hover:text-foreground hover:underline"
              >
                {item.source}
              </a>
            ) : (
              <span className="font-medium text-foreground/80">{item.source}</span>
            )}
            <span>&middot;</span>
            <Clock className="size-3" />
            <span>{item.timestamp}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {/* Résumé de l'article */}
          {item.summary && (
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-accent/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ExternalLink className="size-3" />
                  Lire l&apos;article complet
                </a>
              )}
            </div>
          )}

          {/* Donnée boursière liée si ticker disponible */}
          {relatedStock && (
            <>
              <Separator />
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Valeur associée
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold">
                          {relatedStock.ticker}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {relatedStock.name}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">
                        {relatedStock.sector}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-semibold tabular-nums">
                        {relatedStock.price.toLocaleString("fr-FR")} XOF
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-end gap-0.5 text-xs font-medium tabular-nums",
                          relatedStock.changePercent >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {relatedStock.changePercent >= 0 ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {relatedStock.changePercent >= 0 ? "+" : ""}
                        {relatedStock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      {
                        label: "Volume",
                        value: relatedStock.volume.toLocaleString("fr-FR"),
                      },
                      {
                        label: "Haut",
                        value: relatedStock.high.toLocaleString("fr-FR"),
                      },
                      {
                        label: "Bas",
                        value: relatedStock.low.toLocaleString("fr-FR"),
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded bg-accent/40 p-1.5">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          {label}
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] font-medium tabular-nums">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Secteur associé si pas de ticker */}
          {!relatedStock && item.relatedSector && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Tag className="size-3.5" />
                <span>Secteur : </span>
                <span className="font-medium text-foreground">
                  {item.relatedSector}
                </span>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Composant item de la liste
// ---------------------------------------------------------------------------

interface NewsListItemProps {
  item: NewsItem
  isSelected: boolean
  onClick: () => void
}

function NewsListItem({ item, isSelected, onClick }: NewsListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-md border px-3 py-2.5 text-left transition-colors",
        isSelected
          ? "border-primary/40 bg-primary/5"
          : "border-transparent hover:border-border hover:bg-accent/40"
      )}
    >
      <div className="flex items-start gap-2.5">
        {/* Indicateur coloré catégorie */}
        <div
          className={cn(
            "mt-1.5 size-1.5 shrink-0 rounded-full",
            // Couleur du point basée sur la catégorie
            item.category === "Résultats" && "bg-green-500",
            item.category === "Politique monétaire" && "bg-blue-500",
            item.category === "Corporate" && "bg-purple-500",
            item.category === "Marchés" && "bg-yellow-500",
            item.category === "Macro" && "bg-orange-500",
            item.category === "Notation" && "bg-cyan-500",
            item.category === "Obligations" && "bg-indigo-500",
            !Object.keys(CATEGORY_COLORS).includes(item.category) && "bg-muted-foreground"
          )}
        />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-xs font-medium leading-snug",
              isSelected ? "text-foreground" : "text-foreground/90"
            )}
          >
            {item.title}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <CategoryBadge category={item.category} />
            {item.relatedTicker && (
              <span className="font-mono text-[10px] font-semibold text-muted-foreground">
                {item.relatedTicker}
              </span>
            )}
            {item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-muted-foreground hover:text-foreground hover:underline"
              >
                {item.source}
              </a>
            ) : (
              <span className="text-[10px] text-muted-foreground">
                {item.source}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground">&middot;</span>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <Clock className="size-2.5" />
              {item.timestamp}
            </span>
          </div>
        </div>
        <ChevronRight
          className={cn(
            "mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />
      </div>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Page principale
// ---------------------------------------------------------------------------

export default function NewsPage() {
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES)

  // Calcule les catégories disponibles depuis les données
  const categories = useMemo(() => {
    const cats = Array.from(new Set(news.map((n) => n.category)))
    return [ALL_CATEGORIES, ...cats]
  }, [])

  // News filtrées selon la catégorie sélectionnée
  const filteredNews = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES) return news
    return news.filter((n) => n.category === activeCategory)
  }, [activeCategory])

  // --- Stats pour le panneau latéral ---

  /** Compte par catégorie pour la répartition */
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {}
    news.forEach((n) => {
      counts[n.category] = (counts[n.category] ?? 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, count]) => ({ category: cat, count }))
  }, [])

  /** Tickers les plus cités (avec leur count et données marché) */
  const topTickers = useMemo(() => {
    const counts: Record<string, number> = {}
    news.forEach((n) => {
      if (n.relatedTicker) {
        counts[n.relatedTicker] = (counts[n.relatedTicker] ?? 0) + 1
      }
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ticker, mentions]) => ({
        ticker,
        mentions,
        stock: stocks.find((s) => s.ticker === ticker),
      }))
  }, [])

  /** Sources les plus actives */
  const topSources = useMemo(() => {
    const counts: Record<string, number> = {}
    news.forEach((n) => {
      counts[n.source] = (counts[n.source] ?? 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }))
  }, [])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Newspaper className="size-4 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Actualités</h1>
          <Badge variant="secondary" className="text-[10px]">
            {news.length} articles
          </Badge>
        </div>
        {/* Filtres catégorie */}
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded px-2.5 py-1 text-[11px] font-medium transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Layout principal : liste + panneau contextuel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Colonne liste des news */}
        <div
          className={cn(
            "flex flex-col border-r border-border transition-all",
            selectedItem ? "w-[calc(100%-320px)]" : "w-full"
          )}
        >
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-4">
              {filteredNews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <BarChart3 className="mb-2 size-8 opacity-40" />
                  <p className="text-sm">Aucun article dans cette catégorie</p>
                </div>
              ) : (
                filteredNews.map((item) => (
                  <NewsListItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    onClick={() =>
                      setSelectedItem(
                        selectedItem?.id === item.id ? null : item
                      )
                    }
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Panneau droit : soit détail article, soit sidebar contextuelle */}
        <div className="flex w-80 shrink-0 flex-col overflow-hidden">
          {selectedItem ? (
            // Détail de l'article sélectionné
            <NewsDetailPanel
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          ) : (
            // Sidebar contextuelle : stats et tendances
            <ScrollArea className="flex-1">
              <div className="space-y-3 p-4">
                {/* Répartition par catégorie */}
                <WidgetContainer title="Répartition par catégorie">
                  <div className="space-y-2">
                    {categoryStats.map(({ category, count }) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="flex w-full items-center justify-between rounded px-1 py-0.5 transition-colors hover:bg-accent/50"
                      >
                        <div className="flex items-center gap-2">
                          <CategoryBadge category={category} />
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Barre de progression proportionnelle */}
                          <div className="h-1 w-16 overflow-hidden rounded-full bg-accent">
                            <div
                              className="h-full rounded-full bg-primary/60"
                              style={{
                                width: `${(count / news.length) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="w-4 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                            {count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </WidgetContainer>

                {/* Tickers les plus cités */}
                <WidgetContainer title="Valeurs les plus citées">
                  <div className="space-y-2">
                    {topTickers.map(({ ticker, mentions, stock }) => (
                      <div
                        key={ticker}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold">
                            {ticker}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {mentions} article{mentions > 1 ? "s" : ""}
                          </span>
                        </div>
                        {stock && (
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] tabular-nums">
                              {stock.price.toLocaleString("fr-FR")}
                            </span>
                            <span
                              className={cn(
                                "flex items-center gap-0.5 text-[10px] font-medium tabular-nums",
                                stock.changePercent >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              )}
                            >
                              {stock.changePercent >= 0 ? (
                                <ArrowUpRight className="size-2.5" />
                              ) : (
                                <ArrowUpRight className="size-2.5 rotate-90" />
                              )}
                              {stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </WidgetContainer>

                {/* Sources les plus actives */}
                <WidgetContainer title="Sources actives">
                  <div className="space-y-2">
                    {topSources.map(({ source, count }) => (
                      <div
                        key={source}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-muted-foreground">
                          {source}
                        </span>
                        <Badge
                          variant="secondary"
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </WidgetContainer>

                {/* Note éditoriale Bloomfield */}
                <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-primary" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Bloomfield Review
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Analyses et actualités financières africaines par les équipes
                    éditoriales Bloomfield Intelligence.
                  </p>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  )
}
