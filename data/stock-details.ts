import type { OrderBook } from "./stocks"

export interface StockFundamentals {
  per: number
  roe: number
  dividendYield: number
  marketCap: string
  eps: number
  bookValue: number
  debtToEquity: number
}

export interface TigranScore {
  rating: string
  score: number
  outlook: "Stable" | "Positif" | "Négatif"
  date: string
}

export interface OHLCVCandle {
  time: string | number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export const stockFundamentals: Record<string, StockFundamentals> = {
  SNTS: { per: 14.2, roe: 18.5, dividendYield: 3.2, marketCap: "1 785 Mrd XOF", eps: 1257, bookValue: 6800, debtToEquity: 0.45 },
  SLBC: { per: 11.8, roe: 22.1, dividendYield: 4.1, marketCap: "568 Mrd XOF", eps: 1203, bookValue: 5440, debtToEquity: 0.32 },
  SGBC: { per: 9.5, roe: 15.8, dividendYield: 5.2, marketCap: "920 Mrd XOF", eps: 1211, bookValue: 7680, debtToEquity: 0.68 },
  SIBC: { per: 8.7, roe: 14.2, dividendYield: 4.8, marketCap: "412 Mrd XOF", eps: 557, bookValue: 3930, debtToEquity: 0.55 },
  CIEC: { per: 12.3, roe: 11.5, dividendYield: 3.8, marketCap: "285 Mrd XOF", eps: 171, bookValue: 1487, debtToEquity: 0.72 },
  SDCC: { per: 10.8, roe: 13.2, dividendYield: 4.5, marketCap: "198 Mrd XOF", eps: 398, bookValue: 3016, debtToEquity: 0.41 },
  TTLC: { per: 13.1, roe: 16.7, dividendYield: 3.5, marketCap: "345 Mrd XOF", eps: 187, bookValue: 1120, debtToEquity: 0.58 },
  BOAB: { per: 7.9, roe: 12.8, dividendYield: 5.8, marketCap: "156 Mrd XOF", eps: 747, bookValue: 5840, debtToEquity: 0.62 },
  BOAC: { per: 8.4, roe: 13.5, dividendYield: 5.1, marketCap: "225 Mrd XOF", eps: 744, bookValue: 5511, debtToEquity: 0.59 },
  NSBC: { per: 9.2, roe: 14.8, dividendYield: 4.3, marketCap: "310 Mrd XOF", eps: 739, bookValue: 5000, debtToEquity: 0.51 },
  ONTBF: { per: 11.5, roe: 10.2, dividendYield: 3.9, marketCap: "178 Mrd XOF", eps: 343, bookValue: 3366, debtToEquity: 0.48 },
  PALC: { per: 15.6, roe: 9.8, dividendYield: 2.8, marketCap: "142 Mrd XOF", eps: 462, bookValue: 4714, debtToEquity: 0.38 },
  STBC: { per: 10.2, roe: 11.1, dividendYield: 6.2, marketCap: "89 Mrd XOF", eps: 539, bookValue: 4860, debtToEquity: 0.29 },
  TTLS: { per: 12.8, roe: 15.3, dividendYield: 3.6, marketCap: "124 Mrd XOF", eps: 178, bookValue: 1163, debtToEquity: 0.53 },
  SMBC: { per: 7.5, roe: 16.1, dividendYield: 5.5, marketCap: "205 Mrd XOF", eps: 1120, bookValue: 6957, debtToEquity: 0.64 },
}

export const tigranScores: Record<string, TigranScore> = {
  SNTS: { rating: "A+", score: 88, outlook: "Stable", date: "15 jan. 2026" },
  SLBC: { rating: "A", score: 82, outlook: "Positif", date: "20 déc. 2025" },
  SGBC: { rating: "A", score: 80, outlook: "Stable", date: "10 jan. 2026" },
  SIBC: { rating: "BBB+", score: 72, outlook: "Stable", date: "05 nov. 2025" },
  CIEC: { rating: "BBB", score: 65, outlook: "Positif", date: "18 déc. 2025" },
  SDCC: { rating: "BBB+", score: 70, outlook: "Stable", date: "22 oct. 2025" },
  TTLC: { rating: "A-", score: 78, outlook: "Stable", date: "12 jan. 2026" },
  BOAB: { rating: "BBB", score: 63, outlook: "Négatif", date: "08 sept. 2025" },
  BOAC: { rating: "BBB+", score: 68, outlook: "Stable", date: "15 oct. 2025" },
  NSBC: { rating: "A-", score: 75, outlook: "Positif", date: "20 jan. 2026" },
  ONTBF: { rating: "BBB", score: 61, outlook: "Négatif", date: "30 nov. 2025" },
  PALC: { rating: "BBB-", score: 55, outlook: "Stable", date: "05 déc. 2025" },
  STBC: { rating: "BBB", score: 60, outlook: "Stable", date: "18 nov. 2025" },
  TTLS: { rating: "A-", score: 76, outlook: "Stable", date: "25 jan. 2026" },
  SMBC: { rating: "BBB+", score: 69, outlook: "Négatif", date: "10 déc. 2025" },
}

export const stockNews: Record<string, string[]> = {
  SNTS: ["1", "4"],
  SLBC: ["4"],
  SGBC: ["3", "4"],
  SIBC: ["4"],
  CIEC: ["5"],
  SDCC: ["5"],
  TTLC: ["5"],
  BOAB: ["2"],
  BOAC: ["2"],
  NSBC: ["2"],
  ONTBF: ["4"],
  PALC: ["5"],
  STBC: ["4"],
  TTLS: ["5"],
  SMBC: ["2", "4"],
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function tickerToSeed(ticker: string): number {
  let hash = 0
  for (let i = 0; i < ticker.length; i++) {
    hash = (hash << 5) - hash + ticker.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) || 1
}

export function generateCandlestickData(
  ticker: string,
  basePrice: number,
  period: string
): OHLCVCandle[] {
  const rand = seededRandom(tickerToSeed(ticker) + period.length * 31)
  const data: OHLCVCandle[] = []

  let count: number
  let dateStep: "minute" | "day" | "week"
  let startDate: Date

  switch (period) {
    case "1J":
      count = 78
      dateStep = "minute"
      startDate = new Date(2026, 2, 3, 8, 0)
      break
    case "1S":
      count = 35
      dateStep = "minute"
      startDate = new Date(2026, 1, 24, 8, 0)
      break
    case "1M":
      count = 22
      dateStep = "day"
      startDate = new Date(2026, 1, 3)
      break
    case "3M":
      count = 66
      dateStep = "day"
      startDate = new Date(2025, 11, 3)
      break
    case "6M":
      count = 132
      dateStep = "day"
      startDate = new Date(2025, 8, 3)
      break
    case "1A":
      count = 252
      dateStep = "day"
      startDate = new Date(2025, 2, 3)
      break
    case "5A":
      count = 260
      dateStep = "week"
      startDate = new Date(2021, 2, 3)
      break
    default:
      count = 22
      dateStep = "day"
      startDate = new Date(2026, 1, 3)
  }

  let price = basePrice * (0.85 + rand() * 0.15)
  const volatility = dateStep === "minute" ? 0.003 : dateStep === "week" ? 0.025 : 0.015
  const currentDate = new Date(startDate)

  for (let i = 0; i < count; i++) {
    if (i > 0) {
      if (dateStep === "minute") {
        currentDate.setMinutes(currentDate.getMinutes() + 5)
      } else if (dateStep === "day") {
        currentDate.setDate(currentDate.getDate() + 1)
        while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
          currentDate.setDate(currentDate.getDate() + 1)
        }
      } else {
        currentDate.setDate(currentDate.getDate() + 7)
      }
    }

    const change = (rand() - 0.48) * volatility * price
    const open = Math.round(price)
    price += change
    const close = Math.round(price)
    const high = Math.round(Math.max(open, close) + rand() * volatility * price * 0.5)
    const low = Math.round(Math.min(open, close) - rand() * volatility * price * 0.5)
    const volume = Math.round(1000 + rand() * 15000)

    const timeValue =
      dateStep === "minute"
        ? Math.floor(currentDate.getTime() / 1000)
        : `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`

    data.push({ time: timeValue, open, high, low, close, volume })
  }

  return data
}

export function generateOrderBook(currentPrice: number): OrderBook {
  const bids: OrderBook["bids"] = []
  const asks: OrderBook["asks"] = []
  const step = Math.max(5, Math.round(currentPrice * 0.0003))

  for (let i = 0; i < 5; i++) {
    bids.push({
      price: currentPrice - step * i,
      quantity: Math.round(100 + Math.random() * 800),
    })
    asks.push({
      price: currentPrice + step * (i + 1),
      quantity: Math.round(100 + Math.random() * 800),
    })
  }

  return { bids, asks }
}
