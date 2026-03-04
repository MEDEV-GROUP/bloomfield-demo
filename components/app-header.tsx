"use client"

import { NotificationsPopover } from "@/components/notifications-popover"
import { useTheme } from "@/components/theme-provider"
import { useTour } from "@/components/tour-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CircleHelp, Moon, Search, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const pathLabels: Record<string, string> = {
  "": "Dashboard",
  marches: "Marchés",
  indices: "Indices",
  devises: "Devises",
  portefeuille: "Portefeuille",
  performance: "Performance",
  allocation: "Allocation",
  analyse: "Analyse",
  screener: "Screener",
  comparateur: "Comparateur",
  macro: "Macro",
  carte: "Carte UEMOA",
  news: "Actualités",
  alertes: "Alertes",
  rapports: "Rapports",
  parametres: "Paramètres",
  notifications: "Notifications",
  profil: "Mon profil",
  help: "Aide",
}

export function AppHeader() {
  const { theme, toggleTheme } = useTheme()
  const { startTour } = useTour()
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = pathLabels[segment] ?? segment.toUpperCase()
    return { label, href }
  })

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />

      <Breadcrumb>
        <BreadcrumbList className="text-xs">
          <BreadcrumbItem>
            {crumbs.length === 0 ? (
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span key={crumb.href} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-1 items-center justify-end gap-2">
        <div className="relative w-72" data-tour="search">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un titre, un marché..."
            className="h-8 pl-8 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={startTour}
            title="Visite guidée"
          >
            <CircleHelp className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <NotificationsPopover />
          <Link href="/profil">
            <Avatar className="size-7 transition-opacity hover:opacity-80">
              <AvatarFallback className="text-xs">SZ</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
