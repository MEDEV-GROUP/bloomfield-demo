"use client"

import { useState, useMemo } from "react"
import { uemoaCountries, bloomfieldForecasts } from "@/data/macro-countries"
import { UEMOAMap } from "@/components/uemoa-map"
import { MacroIndicatorCard } from "@/components/macro-indicator-card"
import { CountryComparisonTable } from "@/components/country-comparison-table"
import { WidgetContainer } from "@/components/widget-container"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Globe, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"

export default function MacroPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const activeCountry = useMemo(() => {
    if (!selectedCountry) return null
    return uemoaCountries.find((c) => c.code === selectedCountry) ?? null
  }, [selectedCountry])

  // Build indicators from selected country or UEMOA averages
  const indicators = useMemo(() => {
    if (activeCountry) {
      return [
        {
          label: `PIB ${activeCountry.name}`,
          value: `${activeCountry.gdpGrowth}%`,
          change: "+0,4 pts",
          trend: "up" as const,
          icon: "growth" as const,
          history: activeCountry.gdpHistory,
        },
        {
          label: "Inflation",
          value: `${activeCountry.inflation}%`,
          change: activeCountry.inflation < 4 ? "-0,2 pts" : "+0,3 pts",
          trend: activeCountry.inflation < 4 ? ("down" as const) : ("up" as const),
          icon: "inflation" as const,
          history: activeCountry.inflationHistory,
        },
        {
          label: "Taux directeur BCEAO",
          value: `${activeCountry.directRate.toFixed(2)}%`,
          trend: "stable" as const,
          icon: "rate" as const,
        },
        {
          label: "Dette/PIB",
          value: `${activeCountry.debtToGdp}%`,
          change: "+0,8 pts",
          trend: "up" as const,
          icon: "debt" as const,
        },
        {
          label: "Balance commerciale",
          value: `${activeCountry.tradeBalance} Mrd`,
          trend: "down" as const,
          icon: "trade" as const,
        },
        {
          label: "XOF / EUR",
          value: "655,96",
          trend: "stable" as const,
          icon: "currency" as const,
        },
      ]
    }

    // UEMOA aggregate view
    return [
      {
        label: "PIB UEMOA (moy.)",
        value: "5,7%",
        change: "+0,3 pts",
        trend: "up" as const,
        icon: "growth" as const,
        history: [4.8, 5.2, 5.0, 5.3, 3.1, 4.5, 5.2, 5.7],
      },
      {
        label: "Inflation UEMOA",
        value: "3,4%",
        change: "-0,4 pts",
        trend: "down" as const,
        icon: "inflation" as const,
        history: [1.3, 0.9, 2.1, 3.4, 4.2, 4.6, 3.9, 3.4],
      },
      {
        label: "Taux directeur BCEAO",
        value: "3,50%",
        trend: "stable" as const,
        icon: "rate" as const,
      },
      {
        label: "Dette/PIB UEMOA",
        value: "54,2%",
        change: "+0,6 pts",
        trend: "up" as const,
        icon: "debt" as const,
      },
      {
        label: "Balance com. UEMOA",
        value: "-2,3 Mrd",
        trend: "down" as const,
        icon: "trade" as const,
      },
      {
        label: "XOF / EUR",
        value: "655,96",
        trend: "stable" as const,
        icon: "currency" as const,
      },
    ]
  }, [activeCountry])

  const filteredForecasts = useMemo(() => {
    if (!selectedCountry) return bloomfieldForecasts
    const country = uemoaCountries.find((c) => c.code === selectedCountry)
    if (!country) return bloomfieldForecasts
    return bloomfieldForecasts.filter(
      (f) => f.country === country.name || f.country === "BCEAO" || f.country === "UEMOA"
    )
  }, [selectedCountry])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Globe className="size-4 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Données Macroéconomiques</h1>
          <Badge variant="secondary" className="text-[10px]">
            UEMOA
          </Badge>
        </div>
        <Select
          value={selectedCountry ?? "all"}
          onValueChange={(v) => setSelectedCountry(v === "all" ? null : v)}
        >
          <SelectTrigger className="h-8 w-48 text-xs">
            <SelectValue placeholder="Tous les pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pays (UEMOA)</SelectItem>
            {uemoaCountries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.flag} {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {/* Indicators band — full width */}
        <div className="grid grid-cols-6 gap-3">
          {indicators.map((ind) => (
            <MacroIndicatorCard
              key={ind.label}
              label={ind.label}
              value={ind.value}
              change={ind.change}
              trend={ind.trend}
              icon={ind.icon}
              history={ind.history}
            />
          ))}
        </div>

        {/* Map + Bloomfield Forecast */}
        <div className="grid grid-cols-12 gap-3">
          {/* Map */}
          <WidgetContainer title="Carte UEMOA" className="col-span-5">
            <UEMOAMap
              countries={uemoaCountries}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
          </WidgetContainer>

          {/* Bloomfield Forecast */}
          <WidgetContainer
            title="Prévisions Bloomfield Forecast"
            className="col-span-7"
            action={
              <Badge variant="outline" className="gap-1 text-[10px]">
                <Sparkles className="size-2.5" />
                Propriétaire
              </Badge>
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-8 text-xs">Indicateur</TableHead>
                  <TableHead className="h-8 text-xs">Pays / Zone</TableHead>
                  <TableHead className="h-8 text-right text-xs">Actuel</TableHead>
                  <TableHead className="h-8 text-right text-xs">
                    <span className="inline-flex items-center gap-1">
                      2026e
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">
                        BF
                      </Badge>
                    </span>
                  </TableHead>
                  <TableHead className="h-8 text-right text-xs">
                    <span className="inline-flex items-center gap-1">
                      2027e
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">
                        BF
                      </Badge>
                    </span>
                  </TableHead>
                  <TableHead className="h-8 text-right text-xs">Tendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForecasts.map((f, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell className="py-2 text-xs font-medium">
                      {f.indicator}
                    </TableCell>
                    <TableCell className="py-2 text-xs text-muted-foreground">
                      {f.country}
                    </TableCell>
                    <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
                      {f.current}
                    </TableCell>
                    <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
                      {f.forecast2026}
                    </TableCell>
                    <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
                      {f.forecast2027}
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      <span
                        className={cn(
                          "inline-flex items-center gap-0.5 text-xs",
                          f.trend === "up" && "text-green-500",
                          f.trend === "down" && "text-red-500",
                          f.trend === "stable" && "text-muted-foreground"
                        )}
                      >
                        {f.trend === "up" && <ArrowUpRight className="size-3" />}
                        {f.trend === "down" && <ArrowDownRight className="size-3" />}
                        {f.trend === "up" ? "Hausse" : f.trend === "down" ? "Baisse" : "Stable"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </WidgetContainer>
        </div>

        {/* Country Comparison */}
        <WidgetContainer title="Comparaison multi-pays">
          <CountryComparisonTable
            countries={uemoaCountries}
            highlightCode={selectedCountry}
          />
        </WidgetContainer>
      </div>
    </div>
  )
}
