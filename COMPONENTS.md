# Bloomfield Terminal — Composants & Architecture de référence

> **Version :** 1.0 | **Date :** 2026-03-03
> **Stack :** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (new-york)

---

## Configuration projet

| Clé | Valeur |
|---|---|
| **Style shadcn** | `new-york` |
| **RSC** | `true` (React Server Components activés) |
| **Base color** | `zinc` |
| **CSS variables** | `true` (oklch dans `app/globals.css`) |
| **Icônes** | `lucide-react` (Lucide Icons) |
| **Alias imports** | `@/components`, `@/components/ui`, `@/lib`, `@/hooks` |
| **Config shadcn** | `components.json` à la racine |
| **CSS global** | `app/globals.css` — contient tous les tokens (light + `.dark`) |
| **Utilitaire `cn()`** | `lib/utils.ts` — merge `clsx` + `tailwind-merge` |

### Thème CSS variables

Les couleurs sont définies en oklch dans `app/globals.css` sous `:root` (light) et `.dark` (dark).
Pour la démo Bloomfield on appliquera la classe `dark` sur `<html>` pour le thème terminal financier.

Variables principales : `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1` à `--chart-5`, `--sidebar-*`.

---

## Dépendances clés

| Package | Rôle |
|---|---|
| `radix-ui` | Primitives accessibles (base de tous les composants shadcn) |
| `lucide-react` | Bibliothèque d'icônes — import : `import { IconName } from "lucide-react"` |
| `recharts` | Graphiques (utilisé par le composant `chart`) |
| `class-variance-authority` | Variants de composants (utilisé par `button`, `badge`, `sidebar`) |
| `clsx` + `tailwind-merge` | Merge de classes CSS via `cn()` |
| `tw-animate-css` | Animations Tailwind |

---

## Composants UI — Référence complète

### Layout & Conteneurs

#### `card` — `@/components/ui/card`

Container principal pour les widgets du dashboard.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"
```

| Export | Rôle |
|---|---|
| `Card` | Conteneur racine — `rounded-xl border bg-card shadow-sm` |
| `CardHeader` | En-tête avec grille auto (titre + action) — `px-6` |
| `CardTitle` | Titre — `font-semibold leading-none` |
| `CardDescription` | Sous-titre — `text-sm text-muted-foreground` |
| `CardAction` | Zone action en haut à droite du header |
| `CardContent` | Corps du contenu — `px-6` |
| `CardFooter` | Pied — `flex items-center px-6` |

**Usage Bloomfield :** Widget container pour chaque panel du dashboard (indices, movers, carnet d'ordres, news, etc.)

---

#### `separator` — `@/components/ui/separator`

Ligne de séparation horizontale ou verticale.

```tsx
import { Separator } from "@/components/ui/separator"
// <Separator orientation="horizontal" /> (défaut)
// <Separator orientation="vertical" />
```

---

#### `scroll-area` — `@/components/ui/scroll-area`

Zone scrollable custom avec scrollbar stylisée (Radix ScrollArea).

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

**Usage Bloomfield :** Listes de news, carnet d'ordres, watchlists scrollables dans les widgets.

---

#### `sheet` — `@/components/ui/sheet`

Panel latéral glissant (overlay). Basé sur Radix Dialog.

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
```

| Prop `side` | Position |
|---|---|
| `right` (défaut) | Droite |
| `left` | Gauche |
| `top` | Haut |
| `bottom` | Bas |

**Usage Bloomfield :** Panneau de détail valeur, paramètres utilisateur.

---

#### `sidebar` — `@/components/ui/sidebar`

Système complet de sidebar avec collapse, tooltips, et mode mobile (sheet).

```tsx
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarMenuSub,
  SidebarTrigger, SidebarRail, SidebarInset, SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"
```

| Constante | Valeur |
|---|---|
| `SIDEBAR_WIDTH` | `16rem` (256px) |
| `SIDEBAR_WIDTH_ICON` | `3rem` (48px, mode collapsed) |
| `SIDEBAR_WIDTH_MOBILE` | `18rem` (288px) |
| `SIDEBAR_KEYBOARD_SHORTCUT` | `b` (Ctrl/Cmd+B toggle) |

**Variants sidebar :** `"sidebar"` (défaut, avec inset), `"floating"` (avec bordure arrondie), `"inset"` (encadré).
**Collapsible :** `"offcanvas"` | `"icon"` | `"none"`.

**Composition type :**
```tsx
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Section</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Label">
                <Icon /> <span>Label</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
  <SidebarInset>{/* page content */}</SidebarInset>
</SidebarProvider>
```

**Usage Bloomfield :** Navigation principale — Dashboard, Marchés, Portefeuilles, Analyse, Macro, News, Admin.

---

### Data Display

#### `table` — `@/components/ui/table`

Tableau HTML stylisé.

```tsx
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table"
```

**Usage Bloomfield :** Tableaux de positions portefeuille, top movers, carnet d'ordres, indicateurs macro.

---

#### `badge` — `@/components/ui/badge`

Label compact avec variantes de couleur.

```tsx
import { Badge, badgeVariants } from "@/components/ui/badge"
```

| Variant | Style |
|---|---|
| `default` | `bg-primary text-primary-foreground` |
| `secondary` | `bg-secondary text-secondary-foreground` |
| `destructive` | `bg-destructive text-white` |
| `outline` | Bordure, fond transparent |

**Usage Bloomfield :** Tags sectoriels, badges de variation (+1.2%, -0.5%), statuts d'ordres, scores de risque.

---

#### `avatar` — `@/components/ui/avatar`

Image de profil avec fallback.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
```

**Usage Bloomfield :** Profil utilisateur dans le header/sidebar.

---

#### `skeleton` — `@/components/ui/skeleton`

Placeholder de chargement (rectangle animé pulse).

```tsx
import { Skeleton } from "@/components/ui/skeleton"
// <Skeleton className="h-4 w-[200px]" />
```

**Usage Bloomfield :** Loading state des widgets dashboard, graphiques, tableaux.

---

#### `chart` — `@/components/ui/chart`

Wrapper Recharts avec theming shadcn et tooltips intégrés.

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle, type ChartConfig } from "@/components/ui/chart"
```

**Config type :**
```tsx
const chartConfig: ChartConfig = {
  value: { label: "Cours", color: "var(--chart-1)" },
  benchmark: { label: "BRVM Composite", color: "var(--chart-2)" },
}
```

**Composition :**
```tsx
<ChartContainer config={chartConfig}>
  <LineChart data={data}>
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line dataKey="value" />
  </LineChart>
</ChartContainer>
```

Recharts components à utiliser directement : `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `Line`, `Bar`, `Area`, `Pie`, `XAxis`, `YAxis`, `CartesianGrid`, `ResponsiveContainer`, etc.

**Usage Bloomfield :** Graphiques performance portefeuille, sparklines, donut allocation sectorielle, courbes intraday. Pour les graphiques financiers complexes (chandeliers), utiliser Lightweight Charts (TradingView) séparément.

---

### Navigation

#### `tabs` — `@/components/ui/tabs`

Onglets de navigation contextuelle.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

**Usage Bloomfield :** Onglets fiche valeur (Cours | Fondamentaux | Risque | Actualités), onglets période (1J | 1S | 1M | etc.)

---

#### `dropdown-menu` — `@/components/ui/dropdown-menu`

Menu déroulant complet avec sous-menus, checkboxes, radio, raccourcis.

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
```

**Usage Bloomfield :** Menu utilisateur (profil, déconnexion), actions contextuelle sur widgets (expand, refresh, close), tri des colonnes.

---

### Formulaires

#### `button` — `@/components/ui/button`

Bouton avec variants et tailles via `class-variance-authority`.

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
```

| Variant | Style |
|---|---|
| `default` | `bg-primary text-primary-foreground` |
| `destructive` | `bg-destructive text-white` |
| `outline` | Bordure, fond `bg-background` |
| `secondary` | `bg-secondary text-secondary-foreground` |
| `ghost` | Transparent, hover `bg-accent` |
| `link` | Texte souligné au hover |

| Size | Dimensions |
|---|---|
| `default` | `h-9 px-4` |
| `xs` | `h-6 px-2 text-xs` |
| `sm` | `h-8 px-3` |
| `lg` | `h-10 px-6` |
| `icon` | `size-9` (carré) |
| `icon-xs` | `size-6` |
| `icon-sm` | `size-8` |
| `icon-lg` | `size-10` |

Prop `asChild` pour rendre comme `<a>` ou autre via Radix `Slot`.

---

#### `input` — `@/components/ui/input`

Champ de saisie texte stylisé.

```tsx
import { Input } from "@/components/ui/input"
// <Input type="text" placeholder="Rechercher..." />
```

**Usage Bloomfield :** Barre de recherche globale, formulaire login, filtres.

---

#### `select` — `@/components/ui/select`

Sélecteur dropdown complet (Radix Select).

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from "@/components/ui/select"
```

**Usage Bloomfield :** Sélecteur de période graphique (1J/1S/1M/1A), sélecteur pays données macro, filtres.

---

#### `label` — `@/components/ui/label`

Label de formulaire accessible (Radix Label).

```tsx
import { Label } from "@/components/ui/label"
// <Label htmlFor="email">Email</Label>
```

---

#### `switch` — `@/components/ui/switch`

Toggle on/off (Radix Switch). Variants de taille : `"default"` et `"sm"`.

```tsx
import { Switch } from "@/components/ui/switch"
// <Switch id="setting" checked={value} onCheckedChange={setValue} />
```

**Usage Bloomfield :** Paramètres notifications, toggles de préférences utilisateur.

---

### Feedback & Overlays

#### `dialog` — `@/components/ui/dialog`

Modale centrée avec overlay.

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
```

Prop `showCloseButton` sur `DialogContent` (défaut `true`).

**Usage Bloomfield :** Confirmations d'actions, détails d'alertes.

---

#### `tooltip` — `@/components/ui/tooltip`

Infobulle au hover.

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
```

**Important :** Wrapper `<TooltipProvider>` requis dans le layout racine.

**Usage Bloomfield :** Tooltips sur icônes sidebar (mode collapsed), détails cours au hover, labels des graphiques.

---

#### `popover` — `@/components/ui/popover`

Bulle contextuelle au clic (plus riche qu'un tooltip).

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
```

**Usage Bloomfield :** Détail d'une notification, filtre avancé, mini-formulaire contextuel.

---

## Hooks

#### `useIsMobile` — `@/hooks/use-mobile`

Détecte si la largeur est < 768px. Utilisé par `sidebar` pour le mode mobile (sheet).

```tsx
import { useIsMobile } from "@/hooks/use-mobile"
const isMobile = useIsMobile() // boolean
```

---

## Composants custom à créer (non shadcn)

Ces composants sont spécifiques au métier financier et ne sont pas fournis par shadcn :

| Composant | Rôle | Dépendance suggérée |
|---|---|---|
| `TickerTape` | Bandeau défilant cours BRVM | CSS animation custom |
| `Sparkline` | Mini-graphique inline de tendance | Recharts `<LineChart>` simplifié |
| `ScoreGauge` | Jauge circulaire score Bloomfield Tigran | SVG custom ou Recharts `<PieChart>` |
| `PriceCell` | Cellule tableau avec flash vert/rouge | CSS transition + state |
| `CandlestickChart` | Graphique chandeliers japonais | `lightweight-charts` (TradingView) |
| `WidgetContainer` | Wrapper widget avec header actions (expand/refresh/close) | Composition `Card` + custom |
| `MarketMap` | Carte UEMOA interactive | SVG custom |
| `DonutChart` | Allocation sectorielle portefeuille | Recharts `<PieChart>` |

---

## Structure de fichiers

```
bloomfield/
├── app/
│   ├── globals.css          # Tokens CSS (light + dark), imports Tailwind v4
│   ├── layout.tsx           # Layout racine (TooltipProvider requis)
│   └── page.tsx             # Page d'accueil
├── components/
│   └── ui/                  # 20 composants shadcn (NE PAS MODIFIER sauf override volontaire)
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-mobile.ts        # Hook détection mobile
├── lib/
│   └── utils.ts             # cn() — merge classes
├── components.json           # Config shadcn
├── PRD-DEMO.md              # PRD de la démo
├── MODULE-UXUI-FONDATIONS.md # Fondations UX/UI du projet
└── package.json
```

---

## Commandes utiles

```bash
# Ajouter un nouveau composant shadcn
npx shadcn@latest add [component-name]

# Lancer le dev server
npm run dev

# Build production
npm run build
```

---

*Ce fichier est la référence pour toute session de développement sur ce projet.*
*Consulter en priorité avant de créer ou modifier des composants.*
