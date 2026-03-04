export interface MacroIndicator {
  label: string
  value: string
  change?: string
  trend: "up" | "down" | "stable"
  icon: "growth" | "inflation" | "rate" | "currency" | "debt" | "trade" | "reserve" | "employment" | "budget"
}

export const macroIndicators: MacroIndicator[] = [
  {
    label: "PIB CI",
    value: "7,2%",
    change: "+0,4 pts",
    trend: "up",
    icon: "growth",
  },
  {
    label: "Inflation",
    value: "3,8%",
    change: "-0,2 pts",
    trend: "down",
    icon: "inflation",
  },
  {
    label: "Taux BCEAO",
    value: "3,50%",
    trend: "stable",
    icon: "rate",
  },
  {
    label: "XOF/EUR",
    value: "655,96",
    trend: "stable",
    icon: "currency",
  },
  {
    label: "XOF/USD",
    value: "598,45",
    change: "+1,2%",
    trend: "up",
    icon: "currency",
  },
  {
    label: "Dette/PIB",
    value: "52,1%",
    change: "+0,8 pts",
    trend: "up",
    icon: "debt",
  },
  {
    label: "Balance com.",
    value: "-2,1 Mrd",
    change: "-0,3 Mrd",
    trend: "down",
    icon: "trade",
  },
  {
    label: "Réserves BCEAO",
    value: "18,4 Mrd",
    change: "+1,1 Mrd",
    trend: "up",
    icon: "reserve",
  },
  {
    label: "Déficit budg.",
    value: "-4,8%",
    change: "-0,5 pts",
    trend: "down",
    icon: "budget",
  },
]
