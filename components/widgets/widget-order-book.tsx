"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { orderBookData } from "@/data/stocks"

export function WidgetOrderBook() {
  return (
    <ScrollArea className="h-full min-h-0">
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-medium text-green-500">
            Achat (Bid)
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-0">
                <TableHead className="h-auto px-0 py-1 text-xs">
                  Prix
                </TableHead>
                <TableHead className="h-auto px-0 py-1 text-right text-xs">
                  Qté
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderBookData.bids.map((entry, i) => (
                <TableRow key={i} className="border-0">
                  <TableCell className="px-0 py-0.5 font-mono text-xs text-green-500">
                    {entry.price.toLocaleString("fr-FR")}
                  </TableCell>
                  <TableCell className="px-0 py-0.5 text-right font-mono text-xs">
                    {entry.quantity.toLocaleString("fr-FR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="mb-2 text-xs font-medium text-red-500">
            Vente (Ask)
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-0">
                <TableHead className="h-auto px-0 py-1 text-xs">
                  Prix
                </TableHead>
                <TableHead className="h-auto px-0 py-1 text-right text-xs">
                  Qté
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderBookData.asks.map((entry, i) => (
                <TableRow key={i} className="border-0">
                  <TableCell className="px-0 py-0.5 font-mono text-xs text-red-500">
                    {entry.price.toLocaleString("fr-FR")}
                  </TableCell>
                  <TableCell className="px-0 py-0.5 text-right font-mono text-xs">
                    {entry.quantity.toLocaleString("fr-FR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  )
}
