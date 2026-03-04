"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BarChart2,
  ChevronDown,
  Globe,
  HelpCircle,
  LayoutDashboard,
  Newspaper,
  Search,
  Wallet,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

// --- Types ---

interface Module {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

interface FaqItem {
  question: string
  answer: string
  defaultOpen?: boolean
}



// --- Données statiques ---

const modules: Module[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "Vue d'ensemble du marché BRVM en temps réel avec les indicateurs clés.",
    features: [
      "Indices BRVM Composite & BRVM 30",
      "Top movers (hausses et baisses du jour)",
      "Carnet d'ordres SNTS en temps réel",
      "Flux d'actualités financières",
    ],
  },
  {
    icon: BarChart2,
    title: "Marchés",
    description:
      "Analyse technique et fondamentale des 15+ valeurs cotées sur la BRVM.",
    features: [
      "Fiche détaillée par valeur (ex : SNTS / SONATEL)",
      "Graphiques en chandeliers japonais",
      "Indicateurs techniques (volume, momentum)",
      "Score Bloomfield Tigran par valeur",
    ],
  },
  {
    icon: Wallet,
    title: "Portefeuille",
    description:
      "Suivi complet des positions et de la performance de votre portefeuille.",
    features: [
      "12 positions BRVM en temps réel",
      "P&L total et journalier en XOF",
      "Performance vs benchmark BRVM Composite",
      "Allocation sectorielle (donut chart)",
    ],
  },
  {
    icon: Search,
    title: "Analyse",
    description:
      "Outils d'aide à la décision pour identifier les opportunités de marché.",
    features: [
      "Screener multi-critères (secteur, P/E, volume)",
      "Comparateur de valeurs côte à côte",
      "Score Bloomfield Tigran IA propriétaire",
      "Alertes personnalisées sur seuils",
    ],
  },
  {
    icon: Globe,
    title: "Macro",
    description:
      "Indicateurs macroéconomiques des 8 pays de l'espace UEMOA.",
    features: [
      "PIB, inflation, dette publique par pays",
      "Carte interactive UEMOA cliquable",
      "Comparaison entre pays de la zone franc",
      "Données BCEAO et FMI mises à jour",
    ],
  },
  {
    icon: Newspaper,
    title: "Actualités",
    description:
      "Flux d'informations financières sélectionnées pour les marchés africains.",
    features: [
      "Bloomfield Review — analyses exclusives",
      "Communiqués BCEAO et BRVM officiels",
      "Reuters Market Data Afrique de l'Ouest",
      "Rapports FMI et Banque Mondiale",
    ],
  },
]

const faqItems: FaqItem[] = [
  {
    question: "Comment naviguer entre les modules ?",
    answer:
      "Utilisez la sidebar gauche pour accéder aux différents modules du terminal : Dashboard, Marchés, Portefeuille, Analyse, Macro et Actualités. La sidebar peut être réduite en mode icônes avec le raccourci Ctrl+B pour gagner de l'espace à l'écran.",
    defaultOpen: true,
  },
  {
    question: "Les données sont-elles en temps réel ?",
    answer:
      "Les données de marché sont simulées et rafraîchies automatiquement toutes les 3 secondes pour reproduire le comportement d'un flux temps réel. Les cours, volumes et indices BRVM évoluent de manière réaliste pendant la session. La fréquence de rafraîchissement est configurable dans Paramètres > Affichage.",
    defaultOpen: false,
  },
  {
    question: "Comment lire la fiche valeur ?",
    answer:
      "Cliquez sur n'importe quel ticker dans le tableau des marchés ou sur un top mover du dashboard pour accéder à la fiche détaillée. Exemple : cliquer sur SNTS ouvre la fiche SONATEL avec le graphique en chandeliers, les fondamentaux, le score Bloomfield Tigran et les actualités associées.",
    defaultOpen: false,
  },
  {
    question: "Qu'est-ce que le score Bloomfield Tigran ?",
    answer:
      "Bloomfield Tigran est le moteur d'intelligence artificielle propriétaire de Bloomfield Intelligence. Il analyse en temps réel les données de marché, les fondamentaux et le sentiment pour produire un score de conviction sur chaque valeur BRVM. La latence actuelle est de 320 ms. Ce score est affiché sur la fiche de chaque valeur et dans le module Analyse.",
    defaultOpen: false,
  },
  {
    question: "Comment configurer mes alertes ?",
    answer:
      "Rendez-vous dans Paramètres > Notifications pour activer ou désactiver les alertes par catégorie : alertes de cours (seuils de variation), volumes anormaux, variation des indices BRVM, P&L quotidien et suggestions de rééquilibrage. Les alertes actives apparaissent dans le widget Alertes du Dashboard.",
    defaultOpen: false,
  },
]



// --- Page ---

export default function HelpPage() {

  return (
    <div className="flex flex-1 flex-col gap-8 overflow-auto p-4">
      {/* En-tête */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <HelpCircle className="size-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold">Centre d&apos;aide</h1>
          <Badge variant="secondary">Bloomfield Terminal v1.0</Badge>
        </div>
        <p className="ml-8 text-sm text-muted-foreground">
          Découvrez les fonctionnalités du terminal et prenez en main chaque
          module.
        </p>
      </div>

      {/* ─── Section 1 : Modules ─── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Modules du terminal
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <Card key={mod.title} className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    {mod.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {mod.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <ul className="space-y-1.5">
                    {mod.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        {/* Point bullet aligné avec le texte */}
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ─── Section 2 : FAQ ─── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Questions fréquentes
        </h2>
        <Card>
          <CardContent className="divide-y divide-border px-6 py-0">
            {faqItems.map((item, idx) => (
              <Collapsible key={idx} defaultOpen={item.defaultOpen}>
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center justify-between py-4 text-sm font-medium",
                    "hover:text-foreground transition-colors text-left"
                  )}
                >
                  {item.question}
                  <ChevronDown className="ml-4 size-4 shrink-0 text-muted-foreground transition-transform duration-200 in-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-4 text-sm text-muted-foreground">
                  {item.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
