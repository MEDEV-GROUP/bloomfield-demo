"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Building2,
  Calendar,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Activity,
  Pencil,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { userProfile, securityInfo, apiConnections } from "@/data/settings"
import { portfolioSummary, positions } from "@/data/portfolio"

// --- Helpers ---

/**
 * Formate un nombre en devise XOF avec séparateurs français.
 * Ex : 248560000 → "248 560 000 XOF"
 */
function formatXOF(value: number): string {
  return (
    value.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " XOF"
  )
}

/**
 * Formate un pourcentage avec signe + si positif.
 * Ex : 7.51 → "+7.51 %"
 */
function formatPercent(value: number): string {
  return (value >= 0 ? "+" : "") + value.toFixed(2) + " %"
}

/**
 * Calcule le P&L en % pour une position donnée.
 * Formule : (currentPrice - averagePrice) / averagePrice * 100
 */
function calcPnlPercent(currentPrice: number, averagePrice: number): number {
  return ((currentPrice - averagePrice) / averagePrice) * 100
}

/**
 * Génère les initiales à partir d'un nom complet.
 * Ex : "Stanislas Zézé" → "SZ"
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// --- Types ---

interface ProfileState {
  name: string
  email: string
  organization: string
}

// --- Page ---

export default function ProfilPage() {
  // État local du profil (modification simulée côté client)
  const [profile, setProfile] = useState<ProfileState>({
    name: userProfile.name,
    email: userProfile.email,
    organization: userProfile.organization,
  })

  // État du formulaire en cours d'édition (copie temporaire avant sauvegarde)
  const [draft, setDraft] = useState<ProfileState>(profile)
  const [dialogOpen, setDialogOpen] = useState(false)

  /** Ouvre le dialog et initialise le brouillon avec les valeurs actuelles */
  function openEdit() {
    setDraft(profile)
    setDialogOpen(true)
  }

  /** Sauvegarde les modifications et ferme le dialog */
  function saveEdit() {
    setProfile(draft)
    setDialogOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-auto p-4">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <User className="size-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">Mon profil</h1>
        <Badge variant="secondary">{userProfile.role}</Badge>
      </div>

      {/* Layout 2 colonnes */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* ─── Colonne gauche ─── */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          {/* Card identité */}
          <Card>
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              {/* Avatar grande taille */}
              <Avatar className="size-20 text-xl">
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-base font-semibold">{profile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {profile.organization}
                </p>
              </div>

              {/* Bouton modifier le profil */}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={openEdit}
              >
                <Pencil className="size-3.5" />
                Modifier le profil
              </Button>

              <Separator className="w-full" />

              {/* Informations détaillées */}
              <ul className="w-full space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <Label className="text-xs text-muted-foreground">
                      Email
                    </Label>
                    <p className="truncate text-sm">{profile.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Organisation
                    </Label>
                    <p className="text-sm">{profile.organization}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Membre depuis
                    </Label>
                    <p className="text-sm">{userProfile.memberSince}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Dernière connexion
                    </Label>
                    <p className="text-sm">{userProfile.lastLogin}</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-4 text-muted-foreground" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Authentification 2FA
                </Label>
                <div className="flex items-center gap-2">
                  {securityInfo.twoFactorEnabled ? (
                    <>
                      <CheckCircle2 className="size-4 text-green-500" />
                      <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/15">
                        Activée
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="size-4 text-red-500" />
                      <Badge className="bg-red-500/15 text-red-500 hover:bg-red-500/15">
                        Désactivée
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Méthode 2FA
                </Label>
                <p className="text-sm">{securityInfo.twoFactorMethod}</p>
              </div>

              <Separator />

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Dernière connexion
                </Label>
                <p className="text-sm">{securityInfo.lastLogin}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Expiration de session
                </Label>
                <p className="text-sm">{securityInfo.sessionExpiry}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Colonne droite ─── */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Card aperçu portefeuille */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                Aperçu portefeuille
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {/* Valeur totale */}
                <div className="rounded-lg bg-accent/30 px-4 py-3">
                  <p className="text-xs text-muted-foreground">
                    Valeur totale
                  </p>
                  <p className="mt-1 font-mono text-base font-semibold tabular-nums">
                    {portfolioSummary.totalValue.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-xs text-muted-foreground">XOF</p>
                </div>

                {/* P&L total */}
                <div className="rounded-lg bg-accent/30 px-4 py-3">
                  <p className="text-xs text-muted-foreground">P&amp;L total</p>
                  <p className="mt-1 font-mono text-base font-semibold tabular-nums text-green-500">
                    {formatXOF(portfolioSummary.pnlTotal)}
                  </p>
                  <p className="font-mono text-xs text-green-500">
                    {formatPercent(portfolioSummary.pnlTotalPercent)}
                  </p>
                </div>

                {/* P&L jour */}
                <div className="rounded-lg bg-accent/30 px-4 py-3">
                  <p className="text-xs text-muted-foreground">P&amp;L jour</p>
                  <p
                    className={cn(
                      "mt-1 font-mono text-base font-semibold tabular-nums",
                      portfolioSummary.pnlDay >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {formatXOF(portfolioSummary.pnlDay)}
                  </p>
                  <p
                    className={cn(
                      "font-mono text-xs",
                      portfolioSummary.pnlDayPercent >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {formatPercent(portfolioSummary.pnlDayPercent)}
                  </p>
                </div>

                {/* Rendement annualisé */}
                <div className="rounded-lg bg-accent/30 px-4 py-3">
                  <p className="text-xs text-muted-foreground">
                    Rendement annualisé
                  </p>
                  <p className="mt-1 font-mono text-base font-semibold tabular-nums text-green-500">
                    +{portfolioSummary.annualizedReturn.toFixed(1)} %
                  </p>
                  <p className="text-xs text-muted-foreground">sur 12 mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card positions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-4 text-muted-foreground" />
                Positions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead className="text-right">Qté</TableHead>
                    <TableHead className="text-right">PRU</TableHead>
                    <TableHead className="text-right">Cours</TableHead>
                    <TableHead className="text-right">P&amp;L %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((pos) => {
                    const pnlPct = calcPnlPercent(
                      pos.currentPrice,
                      pos.averagePrice
                    )
                    const isPositive = pnlPct >= 0
                    return (
                      <TableRow key={pos.ticker}>
                        <TableCell className="font-mono text-xs font-semibold">
                          {pos.ticker}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {pos.name}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {pos.quantity.toLocaleString("fr-FR")}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {pos.averagePrice.toLocaleString("fr-FR")}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {pos.currentPrice.toLocaleString("fr-FR")}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right font-mono text-xs font-medium tabular-nums",
                            isPositive ? "text-green-500" : "text-red-500"
                          )}
                        >
                          {isPositive ? "+" : ""}
                          {pnlPct.toFixed(2)} %
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Card connexions API */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-4 text-muted-foreground" />
                Connexions API
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Latence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiConnections.map((api) => (
                    <TableRow key={api.name}>
                      <TableCell className="font-medium">{api.name}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "pointer-events-none",
                            api.status === "connecté" &&
                              "bg-green-500/15 text-green-500 hover:bg-green-500/15",
                            api.status === "dégradé" &&
                              "bg-amber-500/15 text-amber-500 hover:bg-amber-500/15",
                            api.status === "hors ligne" &&
                              "bg-red-500/15 text-red-500 hover:bg-red-500/15"
                          )}
                        >
                          {api.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums">
                        {api.latency}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Dialog : Modifier le profil ─── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="size-4 text-muted-foreground" />
              Modifier le profil
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            {/* Champ nom */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-name">Nom complet</Label>
              <Input
                id="edit-name"
                value={draft.name}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Champ email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-email">Adresse email</Label>
              <Input
                id="edit-email"
                type="email"
                value={draft.email}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            {/* Champ organisation */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-org">Organisation</Label>
              <Input
                id="edit-org"
                value={draft.organization}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    organization: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={saveEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
