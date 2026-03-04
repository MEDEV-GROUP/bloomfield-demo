import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { CountryData } from "@/data/macro-countries"

interface CountryComparisonTableProps {
  countries: CountryData[]
  highlightCode?: string | null
}

function TrendCell({ value, suffix = "%", positive = "up" }: { value: number; suffix?: string; positive?: "up" | "down" }) {
  const isGood = positive === "up" ? value > 0 : value < 0
  const isBad = positive === "up" ? value < 0 : value > 0

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-mono tabular-nums",
        isGood && "text-green-500",
        isBad && "text-red-500",
        !isGood && !isBad && "text-muted-foreground"
      )}
    >
      {value > 0 && positive === "up" && <ArrowUpRight className="size-2.5" />}
      {value < 0 && positive === "down" && <ArrowDownRight className="size-2.5" />}
      {value.toFixed(1)}{suffix}
    </span>
  )
}

export function CountryComparisonTable({ countries, highlightCode }: CountryComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 text-xs">Pays</TableHead>
          <TableHead className="h-8 text-right text-xs">PIB (%)</TableHead>
          <TableHead className="h-8 text-right text-xs">Inflation (%)</TableHead>
          <TableHead className="h-8 text-right text-xs">Taux dir. (%)</TableHead>
          <TableHead className="h-8 text-right text-xs">Dette/PIB (%)</TableHead>
          <TableHead className="h-8 text-right text-xs">Bal. com. (Mrd)</TableHead>
          <TableHead className="h-8 text-right text-xs">Pop. (M)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {countries.map((country) => (
          <TableRow
            key={country.code}
            className={cn(
              "border-border/50",
              highlightCode === country.code && "bg-accent/30"
            )}
          >
            <TableCell className="py-2 text-xs">
              <span className="mr-1.5">{country.flag}</span>
              <span className="font-medium">{country.name}</span>
            </TableCell>
            <TableCell className="py-2 text-right text-xs">
              <TrendCell value={country.gdpGrowth} positive="up" />
            </TableCell>
            <TableCell className="py-2 text-right text-xs">
              <TrendCell value={country.inflation} positive="down" />
            </TableCell>
            <TableCell className="py-2 text-right font-mono text-xs tabular-nums text-muted-foreground">
              {country.directRate.toFixed(2)}%
            </TableCell>
            <TableCell className="py-2 text-right text-xs">
              <TrendCell value={country.debtToGdp} positive="down" />
            </TableCell>
            <TableCell className="py-2 text-right font-mono text-xs tabular-nums text-red-500">
              {country.tradeBalance.toFixed(1)}
            </TableCell>
            <TableCell className="py-2 text-right font-mono text-xs tabular-nums">
              {country.population.toFixed(1)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
