"use client"

import { useState } from "react"
import {
  HelpCircle,
  LayoutDashboard,
  BarChart2,
  Wallet,
  Search,
  Globe,
  Newspaper,
  ChevronDown,
  Keyboard,
  Send,
  CheckCircle2,
  Paperclip,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

interface Shortcut {
  keys: string[]
  action: string
}

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
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


const subjectOptions = [
  { value: "bug", label: "Signaler un bug" },
  { value: "feature", label: "Demande de fonctionnalité" },
  { value: "data", label: "Problème de données" },
  { value: "access", label: "Accès & permissions" },
  { value: "other", label: "Autre" },
]

// --- Page ---

export default function HelpPage() {
  // État du formulaire de contact
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  // Pièces jointes optionnelles (2 fichiers max)
  const [attachment1, setAttachment1] = useState<File | null>(null)
  const [attachment2, setAttachment2] = useState<File | null>(null)

  // Affiche le message de succès après envoi simulé
  const [submitted, setSubmitted] = useState(false)

  /** Vérifie que tous les champs sont remplis avant d'autoriser l'envoi */
  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.subject !== "" &&
    form.message.trim() !== ""

  /** Simule l'envoi du formulaire et affiche la confirmation */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid) return
    setSubmitted(true)
    setForm({ name: "", email: "", subject: "", message: "" })
    setAttachment1(null)
    setAttachment2(null)
  }

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

      {/* ─── Section 4 : Formulaire de contact ─── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Nous contacter
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Send className="size-4 text-muted-foreground" />
              Envoyer un message à l&apos;équipe support
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Message de succès après envoi */}
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <CheckCircle2 className="size-10 text-green-500" />
                <p className="font-medium">Message envoyé !</p>
                <p className="text-sm text-muted-foreground">
                  L&apos;équipe support vous répondra sous 24h à l&apos;adresse
                  indiquée.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Ligne nom / email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-name">Nom complet</Label>
                    <Input
                      id="contact-name"
                      placeholder="Stanislas Zézé"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="s.zeze@bloomfield-investment.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-subject">Sujet</Label>
                  <Select
                    value={form.subject}
                    onValueChange={(val) =>
                      setForm((prev) => ({ ...prev, subject: val }))
                    }
                  >
                    <SelectTrigger id="contact-subject">
                      <SelectValue placeholder="Choisir un sujet…" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Décrivez votre problème ou votre demande…"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Pièces jointes optionnelles */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Pièce jointe 1 */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Paperclip className="size-3.5 text-muted-foreground" />
                      Pièce jointe 1
                      <span className="text-xs text-muted-foreground">(optionnel)</span>
                    </Label>
                    <label
                      htmlFor="attachment-1"
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-3 py-2.5",
                        "text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent/40"
                      )}
                    >
                      {attachment1 ? (
                        <>
                          <span className="flex-1 truncate text-foreground">
                            {attachment1.name}
                          </span>
                          {/* Bouton pour retirer le fichier sélectionné */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setAttachment1(null)
                            }}
                            className="shrink-0 rounded p-0.5 hover:text-foreground"
                          >
                            <X className="size-3.5" />
                          </button>
                        </>
                      ) : (
                        <span>Choisir un fichier…</span>
                      )}
                      <input
                        id="attachment-1"
                        type="file"
                        accept="image/*,.pdf,.xlsx,.docx"
                        className="sr-only"
                        onChange={(e) =>
                          setAttachment1(e.target.files?.[0] ?? null)
                        }
                      />
                    </label>
                  </div>

                  {/* Pièce jointe 2 */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Paperclip className="size-3.5 text-muted-foreground" />
                      Pièce jointe 2
                      <span className="text-xs text-muted-foreground">(optionnel)</span>
                    </Label>
                    <label
                      htmlFor="attachment-2"
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-3 py-2.5",
                        "text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent/40"
                      )}
                    >
                      {attachment2 ? (
                        <>
                          <span className="flex-1 truncate text-foreground">
                            {attachment2.name}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setAttachment2(null)
                            }}
                            className="shrink-0 rounded p-0.5 hover:text-foreground"
                          >
                            <X className="size-3.5" />
                          </button>
                        </>
                      ) : (
                        <span>Choisir un fichier…</span>
                      )}
                      <input
                        id="attachment-2"
                        type="file"
                        accept="image/*,.pdf,.xlsx,.docx"
                        className="sr-only"
                        onChange={(e) =>
                          setAttachment2(e.target.files?.[0] ?? null)
                        }
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="self-start gap-2"
                >
                  <Send className="size-3.5" />
                  Envoyer
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Separator />

        <p className="text-xs text-muted-foreground">
          Bloomfield Terminal — version démo destinée aux présentations client.
          Les données de marché sont simulées à partir de valeurs BRVM réelles.
          Contact :{" "}
          <span className="text-foreground">
            support@bloomfield-investment.com
          </span>
        </p>
      </section>
    </div>
  )
}
