export interface CountryData {
  code: string
  name: string
  flag: string
  gdpGrowth: number
  inflation: number
  directRate: number
  debtToGdp: number
  tradeBalance: number
  population: number
  gdpHistory: number[]
  inflationHistory: number[]
}

export interface BloomfieldForecast {
  indicator: string
  country: string
  current: string
  forecast2026: string
  forecast2027: string
  trend: "up" | "down" | "stable"
}

export const uemoaCountries: CountryData[] = [
  {
    code: "CI",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    gdpGrowth: 7.2,
    inflation: 3.8,
    directRate: 3.5,
    debtToGdp: 52.1,
    tradeBalance: -2.1,
    population: 28.2,
    gdpHistory: [5.8, 6.2, 6.7, 6.5, 7.4, 6.9, 7.0, 7.2],
    inflationHistory: [1.2, 2.4, 3.6, 4.2, 4.5, 4.0, 3.9, 3.8],
  },
  {
    code: "SN",
    name: "Sénégal",
    flag: "🇸🇳",
    gdpGrowth: 8.2,
    inflation: 2.1,
    directRate: 3.5,
    debtToGdp: 68.9,
    tradeBalance: -4.3,
    population: 17.7,
    gdpHistory: [4.5, 5.3, 4.7, 6.5, 4.2, 5.4, 7.1, 8.2],
    inflationHistory: [0.5, 1.2, 2.5, 2.8, 3.1, 2.8, 2.4, 2.1],
  },
  {
    code: "BF",
    name: "Burkina Faso",
    flag: "🇧🇫",
    gdpGrowth: 4.1,
    inflation: 3.2,
    directRate: 3.5,
    debtToGdp: 45.6,
    tradeBalance: -1.8,
    population: 22.1,
    gdpHistory: [5.7, 6.3, 5.1, 3.9, 2.5, 3.2, 3.8, 4.1],
    inflationHistory: [2.0, 1.4, 2.9, 3.5, 4.1, 3.8, 3.5, 3.2],
  },
  {
    code: "ML",
    name: "Mali",
    flag: "🇲🇱",
    gdpGrowth: 3.7,
    inflation: 4.5,
    directRate: 3.5,
    debtToGdp: 49.2,
    tradeBalance: -2.6,
    population: 21.9,
    gdpHistory: [4.8, 5.0, 4.7, 3.1, -1.2, 3.1, 3.4, 3.7],
    inflationHistory: [1.8, 0.7, 2.2, 2.9, 3.8, 5.2, 4.9, 4.5],
  },
  {
    code: "NE",
    name: "Niger",
    flag: "🇳🇪",
    gdpGrowth: 6.9,
    inflation: 2.9,
    directRate: 3.5,
    debtToGdp: 41.3,
    tradeBalance: -3.1,
    population: 25.4,
    gdpHistory: [5.0, 6.5, 5.9, 7.2, 1.3, 3.6, 5.2, 6.9],
    inflationHistory: [2.5, -2.5, 2.8, 3.8, 4.3, 3.6, 3.1, 2.9],
  },
  {
    code: "TG",
    name: "Togo",
    flag: "🇹🇬",
    gdpGrowth: 5.5,
    inflation: 3.0,
    directRate: 3.5,
    debtToGdp: 58.7,
    tradeBalance: -2.9,
    population: 8.8,
    gdpHistory: [4.9, 5.3, 5.5, 5.3, 1.8, 5.1, 5.3, 5.5],
    inflationHistory: [0.9, 0.7, 1.8, 4.5, 7.6, 5.1, 3.8, 3.0],
  },
  {
    code: "BJ",
    name: "Bénin",
    flag: "🇧🇯",
    gdpGrowth: 6.4,
    inflation: 2.5,
    directRate: 3.5,
    debtToGdp: 46.8,
    tradeBalance: -1.5,
    population: 13.4,
    gdpHistory: [6.7, 6.9, 6.4, 6.9, 3.8, 5.5, 6.0, 6.4],
    inflationHistory: [0.8, -0.9, 1.0, 3.0, 1.8, 2.5, 2.8, 2.5],
  },
  {
    code: "GW",
    name: "Guinée-Bissau",
    flag: "🇬🇼",
    gdpGrowth: 3.5,
    inflation: 5.1,
    directRate: 3.5,
    debtToGdp: 72.4,
    tradeBalance: -0.4,
    population: 2.1,
    gdpHistory: [3.8, 4.5, 4.8, 3.0, 1.5, 3.8, 3.2, 3.5],
    inflationHistory: [1.4, 0.8, 1.6, 3.1, 5.9, 7.9, 6.2, 5.1],
  },
]

export const bloomfieldForecasts: BloomfieldForecast[] = [
  {
    indicator: "PIB",
    country: "Côte d'Ivoire",
    current: "7,2%",
    forecast2026: "7,5%",
    forecast2027: "7,8%",
    trend: "up",
  },
  {
    indicator: "PIB",
    country: "Sénégal",
    current: "8,2%",
    forecast2026: "9,1%",
    forecast2027: "8,6%",
    trend: "up",
  },
  {
    indicator: "Inflation",
    country: "Côte d'Ivoire",
    current: "3,8%",
    forecast2026: "3,2%",
    forecast2027: "2,8%",
    trend: "down",
  },
  {
    indicator: "Inflation",
    country: "UEMOA",
    current: "3,4%",
    forecast2026: "2,9%",
    forecast2027: "2,5%",
    trend: "down",
  },
  {
    indicator: "Taux directeur",
    country: "BCEAO",
    current: "3,50%",
    forecast2026: "3,25%",
    forecast2027: "3,00%",
    trend: "down",
  },
  {
    indicator: "PIB",
    country: "Niger",
    current: "6,9%",
    forecast2026: "7,4%",
    forecast2027: "7,2%",
    trend: "up",
  },
  {
    indicator: "PIB",
    country: "Bénin",
    current: "6,4%",
    forecast2026: "6,7%",
    forecast2027: "6,9%",
    trend: "up",
  },
  {
    indicator: "Dette/PIB",
    country: "UEMOA",
    current: "54,2%",
    forecast2026: "52,8%",
    forecast2027: "51,0%",
    trend: "down",
  },
]
