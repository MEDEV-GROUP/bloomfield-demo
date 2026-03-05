"use client"

import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

function generateIntradayData() {
  const data = []
  let price = 17640
  for (let hour = 8; hour <= 16; hour++) {
    for (let min = 0; min < 60; min += 15) {
      price += (Math.random() - 0.48) * 50
      data.push({
        time: `${hour}:${min.toString().padStart(2, "0")}`,
        price: Math.round(price),
      })
    }
  }
  return data
}

export function WidgetIntradayChart() {
  const [intradayData] = useState(() => generateIntradayData())

  return (
    <div className="h-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={intradayData}>
          <defs>
            <linearGradient
              id="priceGradientFloat"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={["auto", "auto"]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            width={55}
            tickFormatter={(v: number) => v.toLocaleString("fr-FR")}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            fill="url(#priceGradientFloat)"
            strokeWidth={1.5}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
