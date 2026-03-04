import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PagePlaceholderProps {
  title: string
  description?: string
}

const availablePages = [
  { label: "Dashboard Marchés", href: "/", description: "Vue d'ensemble temps réel de la BRVM" },
  { label: "Fiche Valeur (ex: SNTS)", href: "/marches/SNTS", description: "Graphique chandeliers, fondamentaux, score Tigran" },
  { label: "Portefeuille", href: "/portefeuille", description: "KPIs, allocation sectorielle, performance, positions" },
  { label: "Données Macroéconomiques", href: "/macro", description: "Carte UEMOA, indicateurs clés, prévisions Bloomfield" },
  { label: "Login", href: "/login", description: "Authentification à double facteur" },
]

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Construction className="size-6 text-muted-foreground" />
        </div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {description ?? "Ce module n'a pas été développé dans le cadre de cette démo. Il fait partie du périmètre complet de la plateforme Bloomfield Terminal."}
        </p>
      </div>

      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-4">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Pages disponibles dans la démo
        </h2>
        <div className="space-y-2">
          {availablePages.map((page) => (
            <Button
              key={page.href}
              variant="ghost"
              asChild
              className="h-auto w-full justify-start px-3 py-2"
            >
              <Link href={page.href}>
                <div className="text-left">
                  <div className="text-xs font-medium">{page.label}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {page.description}
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
