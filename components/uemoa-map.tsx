"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { uemoaCountries as mapCountries, UEMOA_VIEWBOX } from "@/data/uemoa-map"
import type { CountryData } from "@/data/macro-countries"

interface UEMOAMapProps {
  countries: CountryData[]
  selectedCountry: string | null
  onSelectCountry: (code: string | null) => void
}

function getGrowthColor(gdpGrowth: number): string {
  if (gdpGrowth >= 7) return "var(--chart-1)"
  if (gdpGrowth >= 5) return "var(--chart-2)"
  if (gdpGrowth >= 3) return "var(--chart-4)"
  return "var(--chart-5)"
}

export function UEMOAMap({ countries, selectedCountry, onSelectCountry }: UEMOAMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const getCountryData = (code: string) => countries.find((c) => c.code === code)

  const hoveredData = hoveredCountry ? getCountryData(hoveredCountry) : null

  return (
    <div className="relative">
      <svg
        viewBox={UEMOA_VIEWBOX}
        className="h-full w-full"
        style={{ minHeight: 260 }}
      >
        {mapCountries.map((mc) => {
          const data = getCountryData(mc.code)
          const isSelected = selectedCountry === mc.code
          const isHovered = hoveredCountry === mc.code

          return (
            <g key={mc.id}>
              <path
                d={mc.path}
                fill={data ? getGrowthColor(data.gdpGrowth) : "var(--muted)"}
                fillOpacity={isSelected || isHovered ? 0.9 : 0.5}
                stroke={isSelected ? "var(--foreground)" : "var(--border)"}
                strokeWidth={isSelected ? 2.5 : 1}
                strokeLinejoin="round"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredCountry(mc.code)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() =>
                  onSelectCountry(selectedCountry === mc.code ? null : mc.code)
                }
              />
              <text
                x={mc.labelX}
                y={mc.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none fill-foreground text-[11px] font-semibold"
              >
                {mc.code}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Tooltip au hover */}
      {hoveredData && (
        <div
          className={cn(
            "pointer-events-none absolute right-2 top-2 rounded-md border border-border bg-popover px-3 py-2 shadow-md"
          )}
        >
          <div className="text-xs font-semibold">
            {hoveredData.flag} {hoveredData.name}
          </div>
          <div className="mt-1 space-y-0.5 text-[10px] text-muted-foreground">
            <div>PIB : <span className="font-mono text-foreground">{hoveredData.gdpGrowth}%</span></div>
            <div>Inflation : <span className="font-mono text-foreground">{hoveredData.inflation}%</span></div>
            <div>Pop. : <span className="font-mono text-foreground">{hoveredData.population} M</span></div>
          </div>
        </div>
      )}

      {/* Légende */}
      <div className="mt-2 flex items-center justify-center gap-3">
        {[
          { label: "≥ 7%", color: "var(--chart-1)" },
          { label: "5–7%", color: "var(--chart-2)" },
          { label: "3–5%", color: "var(--chart-4)" },
          { label: "< 3%", color: "var(--chart-5)" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <div
              className="size-2.5 rounded-sm opacity-60"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
        <span className="text-[10px] text-muted-foreground/50">PIB</span>
      </div>
    </div>
  )
}
