export interface Index {
  name: string
  value: number
  change: number
  changePercent: number
  history: number[]
}

export const indices: Index[] = [
  {
    name: "BRVM Composite",
    value: 234.56,
    change: 2.34,
    changePercent: 1.01,
    history: [
      221.3, 224.8, 222.1, 226.5, 223.7, 228.9, 225.2, 220.6, 224.1, 227.8,
      223.4, 229.5, 226.0, 221.8, 225.6, 230.2, 227.1, 222.9, 228.3, 231.7,
      226.8, 229.4, 224.5, 231.0, 228.6, 233.1, 229.9, 235.2, 232.4, 234.56,
    ],
  },
  {
    name: "BRVM 30",
    value: 118.42,
    change: -0.58,
    changePercent: -0.49,
    history: [
      122.8, 119.5, 123.1, 120.4, 117.8, 121.6, 118.2, 124.0, 120.9, 116.5,
      119.8, 123.4, 117.1, 121.2, 118.7, 115.9, 120.5, 122.3, 116.8, 119.1,
      123.7, 118.4, 115.2, 120.8, 117.5, 121.9, 116.3, 119.6, 117.8, 118.42,
    ],
  },
]
