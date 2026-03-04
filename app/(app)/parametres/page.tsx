"use client"

import { useState } from "react"
import { Settings, Moon, Sun, Shield, Bell, User, AlertTriangle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import {
  userProfile,
  notificationGroups,
  securityInfo,
  apiConnections,
} from "@/data/settings"

function DemoMessage({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-500">
      <AlertTriangle className="size-4 shrink-0" />
      Non disponible dans la démo
    </div>
  )
}

function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du compte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 text-lg">
            <AvatarFallback>{userProfile.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{userProfile.name}</p>
            <Badge variant="secondary">{userProfile.role}</Badge>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-sm">{userProfile.email}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Organisation</Label>
            <p className="text-sm">{userProfile.organization}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Membre depuis</Label>
            <p className="text-sm">{userProfile.memberSince}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Dernière connexion</Label>
            <p className="text-sm">{userProfile.lastLogin}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DisplayTab() {
  const { theme, toggleTheme } = useTheme()
  const [showMessage, setShowMessage] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thème</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button
              onClick={() => { if (theme !== "dark") toggleTheme() }}
              className={cn(
                "flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                theme === "dark"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <Moon className="size-8" />
              <span className="text-sm font-medium">Sombre</span>
            </button>
            <button
              onClick={() => { if (theme !== "light") toggleTheme() }}
              className={cn(
                "flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                theme === "light"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <Sun className="size-8" />
              <span className="text-sm font-medium">Clair</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences d&apos;affichage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Fréquence de rafraîchissement</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Temps réel (3s)</SelectItem>
                  <SelectItem value="5">5 secondes</SelectItem>
                  <SelectItem value="10">10 secondes</SelectItem>
                  <SelectItem value="30">30 secondes</SelectItem>
                  <SelectItem value="manual">Manuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Format des nombres</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">1 234,56 (FR)</SelectItem>
                  <SelectItem value="en">1,234.56 (EN)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Devise de référence</Label>
              <Select defaultValue="xof">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xof">XOF — Franc CFA</SelectItem>
                  <SelectItem value="eur">EUR — Euro</SelectItem>
                  <SelectItem value="usd">USD — Dollar US</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button onClick={() => setShowMessage(true)}>Enregistrer</Button>
            <DemoMessage show={showMessage} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {}
    for (const group of notificationGroups) {
      for (const s of group.settings) {
        defaults[s.id] = s.defaultEnabled
      }
    }
    return defaults
  })
  const [showMessage, setShowMessage] = useState(false)

  function handleToggle(id: string, checked: boolean) {
    setToggles((prev) => ({ ...prev, [id]: checked }))
    setShowMessage(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationGroups.map((group, groupIdx) => (
          <div key={group.category}>
            {groupIdx > 0 && <Separator className="mb-6" />}
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {group.category}
            </h3>
            <div className="space-y-4">
              {group.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id}>{setting.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.id}
                    checked={toggles[setting.id]}
                    onCheckedChange={(checked) =>
                      handleToggle(setting.id, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <Separator />
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowMessage(true)}>Enregistrer</Button>
          <DemoMessage show={showMessage} />
        </div>
      </CardContent>
    </Card>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-muted-foreground">
                Authentification à deux facteurs
              </Label>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/15">
                  Activée
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Méthode 2FA</Label>
              <p className="text-sm">{securityInfo.twoFactorMethod}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">
                Dernière connexion
              </Label>
              <p className="text-sm">{securityInfo.lastLogin}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">
                Expiration de session
              </Label>
              <p className="text-sm">{securityInfo.sessionExpiry}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connexions API</CardTitle>
        </CardHeader>
        <CardContent>
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
                          "bg-green-500/15 text-green-500",
                        api.status === "dégradé" &&
                          "bg-amber-500/15 text-amber-500",
                        api.status === "hors ligne" &&
                          "bg-red-500/15 text-red-500"
                      )}
                    >
                      {api.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {api.latency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ParametresPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Settings className="size-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">Paramètres</h1>
        <Badge variant="secondary">Admin</Badge>
      </div>

      <Tabs defaultValue="profil" className="flex flex-1 flex-col">
        <TabsList>
          <TabsTrigger value="profil">
            <User className="mr-1.5 size-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="affichage">
            <Sun className="mr-1.5 size-4" />
            Affichage
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-1.5 size-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="securite">
            <Shield className="mr-1.5 size-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto pt-4">
          <div className="max-w-3xl">
            <TabsContent value="profil" className="mt-0">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="affichage" className="mt-0">
              <DisplayTab />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <NotificationsTab />
            </TabsContent>
            <TabsContent value="securite" className="mt-0">
              <SecurityTab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
