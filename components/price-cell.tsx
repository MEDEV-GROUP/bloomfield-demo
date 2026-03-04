"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface PriceCellProps {
  price: number
  className?: string
}

export function PriceCell({ price, className }: PriceCellProps) {
  const cellRef = useRef<HTMLSpanElement>(null)
  const prevPrice = useRef(price)

  useEffect(() => {
    const el = cellRef.current
    if (!el || price === prevPrice.current) return

    el.dataset.flash = price > prevPrice.current ? "up" : "down"
    prevPrice.current = price

    const timer = setTimeout(() => {
      el.dataset.flash = ""
    }, 600)
    return () => clearTimeout(timer)
  }, [price])

  return (
    <span
      ref={cellRef}
      className={cn(
        "font-mono tabular-nums transition-colors duration-300 data-[flash=down]:text-red-400 data-[flash=up]:text-green-400",
        className
      )}
    >
      {price.toLocaleString("fr-FR")}
    </span>
  )
}
