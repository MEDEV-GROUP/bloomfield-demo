"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { news } from "@/data/news"

export function WidgetNews() {
  return (
    <ScrollArea className="h-full min-h-0">
      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <div>
                <p className="text-xs font-medium leading-tight transition-colors group-hover:text-primary">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {item.source}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    &middot;
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
