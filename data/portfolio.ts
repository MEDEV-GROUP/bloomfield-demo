export interface Position {
  ticker: string
  name: string
  sector: string
  quantity: number
  averagePrice: number
  currentPrice: number
  weight: number
}

export interface SectorAllocation {
  sector: string
  value: number
  color: string
}

export interface PerformancePoint {
  date: string
  portfolio: number
  benchmark: number
}

export const portfolioSummary = {
  totalValue: 248_560_000,
  totalCost: 231_200_000,
  pnlTotal: 17_360_000,
  pnlTotalPercent: 7.51,
  pnlDay: 1_245_000,
  pnlDayPercent: 0.50,
  annualizedReturn: 12.8,
  cashBalance: 15_400_000,
  currency: "XOF",
}

export const positions: Position[] = [
  {
    ticker: "SNTS",
    name: "SONATEL",
    sector: "Télécoms",
    quantity: 3200,
    averagePrice: 16_500,
    currentPrice: 17_850,
    weight: 24.3,
  },
  {
    ticker: "SGBC",
    name: "SGBCI",
    sector: "Banques",
    quantity: 4500,
    averagePrice: 10_800,
    currentPrice: 11_500,
    weight: 22.0,
  },
  {
    ticker: "SLBC",
    name: "SOLIBRA",
    sector: "Brasseries",
    quantity: 1800,
    averagePrice: 13_900,
    currentPrice: 14_200,
    weight: 10.9,
  },
  {
    ticker: "PALC",
    name: "PALM CI",
    sector: "Agro-industrie",
    quantity: 2400,
    averagePrice: 6_750,
    currentPrice: 7_200,
    weight: 7.4,
  },
  {
    ticker: "BOAC",
    name: "BOA CI",
    sector: "Banques",
    quantity: 3000,
    averagePrice: 5_950,
    currentPrice: 6_250,
    weight: 8.0,
  },
  {
    ticker: "NSBC",
    name: "NSIA Banque",
    sector: "Banques",
    quantity: 2100,
    averagePrice: 6_600,
    currentPrice: 6_800,
    weight: 6.1,
  },
  {
    ticker: "CIEC",
    name: "CIE",
    sector: "Énergie",
    quantity: 5000,
    averagePrice: 1_980,
    currentPrice: 2_100,
    weight: 4.5,
  },
  {
    ticker: "TTLC",
    name: "TOTAL CI",
    sector: "Énergie",
    quantity: 3500,
    averagePrice: 2_350,
    currentPrice: 2_450,
    weight: 3.7,
  },
  {
    ticker: "SMBC",
    name: "SMB",
    sector: "Banques",
    quantity: 1200,
    averagePrice: 8_600,
    currentPrice: 8_400,
    weight: 4.3,
  },
  {
    ticker: "ONTBF",
    name: "ONATEL BF",
    sector: "Télécoms",
    quantity: 2800,
    averagePrice: 4_100,
    currentPrice: 3_950,
    weight: 4.7,
  },
  {
    ticker: "STBC",
    name: "SITAB",
    sector: "Tabac",
    quantity: 1500,
    averagePrice: 5_400,
    currentPrice: 5_500,
    weight: 3.5,
  },
  {
    ticker: "SDCC",
    name: "SODECI",
    sector: "Services publics",
    quantity: 800,
    averagePrice: 4_250,
    currentPrice: 4_300,
    weight: 0.6,
  },
]

export const sectorAllocations: SectorAllocation[] = [
  { sector: "Banques", value: 40.4, color: "var(--chart-1)" },
  { sector: "Télécoms", value: 29.0, color: "var(--chart-2)" },
  { sector: "Brasseries", value: 10.9, color: "var(--chart-3)" },
  { sector: "Agro-industrie", value: 7.4, color: "var(--chart-4)" },
  { sector: "Énergie", value: 8.2, color: "var(--chart-5)" },
  { sector: "Tabac", value: 3.5, color: "oklch(0.7 0.15 330)" },
  { sector: "Services publics", value: 0.6, color: "oklch(0.65 0.12 200)" },
]

function generatePerformanceData(): PerformancePoint[] {
  const data: PerformancePoint[] = []
  let portfolio = 100
  let benchmark = 100

  const start = new Date(2025, 2, 1)
  for (let i = 0; i < 365; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)

    const day = date.getDay()
    if (day === 0 || day === 6) continue

    portfolio += (Math.random() - 0.46) * 0.8
    benchmark += (Math.random() - 0.48) * 0.7

    data.push({
      date: date.toISOString().slice(0, 10),
      portfolio: Number(portfolio.toFixed(2)),
      benchmark: Number(benchmark.toFixed(2)),
    })
  }

  return data
}

export const performanceData = generatePerformanceData()
