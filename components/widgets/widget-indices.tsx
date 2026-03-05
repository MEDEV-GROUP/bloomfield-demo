"use client"

import { Sparkline } from "@/components/sparkline"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { indices } from "@/data/indices"

export function WidgetIndices() {
  return (
    <ScrollArea className="h-full min-h-0">
      <div className="space-y-4">
        {indices.map((index) => (
          <div key={index.name}>
            <div className="text-xs text-muted-foreground">
              {index.name}
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-mono text-lg font-semibold tabular-nums">
                  {index.value.toLocaleString("fr-FR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <Badge
                  variant={
                    index.changePercent >= 0 ? "default" : "destructive"
                  }
                  className="text-[10px]"
                >
                  {index.changePercent >= 0 ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </Badge>
              </div>
              <Sparkline data={index.history} className="h-10 w-24 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
