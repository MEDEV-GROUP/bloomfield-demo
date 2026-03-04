"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Activity,
  BarChart3,
  Bell,
  Briefcase,
  CandlestickChart,
  ChevronRight,
  Coins,
  FileText,
  GitCompareArrows,
  Globe,
  HelpCircle,
  Info,
  Layers,
  LayoutDashboard,
  LineChart,
  LogOut,
  Map,
  Newspaper,
  PieChart,
  Search,
  Settings,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: { title: string; href: string; icon: React.ComponentType<{ className?: string }> }[]
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: "3",
  },
  {
    title: "Marchés",
    href: "/marches",
    icon: TrendingUp,
    children: [
      { title: "Valeurs BRVM", href: "/marches", icon: CandlestickChart },
      { title: "Indices", href: "/marches/indices", icon: LineChart },
      { title: "Devises", href: "/marches/devises", icon: Coins },
    ],
  },
  {
    title: "Portefeuille",
    href: "/portefeuille",
    icon: Briefcase,
    children: [
      { title: "Positions", href: "/portefeuille", icon: Layers },
      { title: "Performance", href: "/portefeuille/performance", icon: Target },
      { title: "Allocation", href: "/portefeuille/allocation", icon: PieChart },
    ],
  },
]

const analyseItems: NavItem[] = [
  {
    title: "Analyse",
    href: "/analyse",
    icon: BarChart3,
    children: [
      { title: "Screener", href: "/analyse/screener", icon: Search },
      { title: "Comparateur", href: "/analyse/comparateur", icon: GitCompareArrows },
    ],
  },
  {
    title: "Macro",
    href: "/macro",
    icon: Globe,
    children: [
      { title: "Indicateurs", href: "/macro", icon: Activity },
      { title: "Carte UEMOA", href: "/macro/carte", icon: Map },
    ],
  },
  {
    title: "Actualités",
    href: "/news",
    icon: Newspaper,
  },
]

const outilsItems: NavItem[] = [
  {
    title: "Alertes",
    href: "/alertes",
    icon: Bell,
    badge: "5",
  },
  {
    title: "Rapports",
    href: "/rapports",
    icon: FileText,
  },
]

function NavItemRenderer({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href
  const isChildActive = item.children?.some((child) => pathname === child.href)

  if (item.children) {
    return (
      <Collapsible defaultOpen={isActive || isChildActive} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={isActive || isChildActive}>
              <item.icon />
              <span>{item.title}</span>
              <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {item.badge && (
            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
          )}
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child.href}>
                  <SidebarMenuSubButton asChild isActive={pathname === child.href}>
                    <Link href={child.href}>
                      <child.icon className="size-3.5" />
                      <span>{child.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        <Link href={item.href}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.badge && (
        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" data-tour="sidebar">
      <SidebarHeader className="px-3 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
            B
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold leading-tight">
              Bloomfield
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              Terminal
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation principale */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavItemRenderer key={item.title} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Analyse & Recherche */}
        <SidebarGroup>
          <SidebarGroupLabel>Analyse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyseItems.map((item) => (
                <NavItemRenderer key={item.title} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Outils */}
        <SidebarGroup>
          <SidebarGroupLabel>Outils</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {outilsItems.map((item) => (
                <NavItemRenderer key={item.title} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="À propos" asChild>
              <a href="https://www.medev-group.com/fr" target="_blank" rel="noopener noreferrer">
                <Info className="size-4" />
                <span>À propos</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Aide" asChild>
              <Link href="/help">
                <HelpCircle />
                <span>Aide</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Paramètres" asChild>
              <Link href="/parametres">
                <Settings />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Déconnexion">
              <LogOut />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
