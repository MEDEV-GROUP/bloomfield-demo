// Données simulées — Paramètres utilisateur

export interface UserProfile {
  name: string
  initials: string
  email: string
  role: string
  organization: string
  memberSince: string
  lastLogin: string
}

export const userProfile: UserProfile = {
  name: "Stanislas Zézé",
  initials: "SZ",
  email: "s.zeze@bloomfield-investment.com",
  role: "Administrateur",
  organization: "Bloomfield Intelligence",
  memberSince: "Janvier 2024",
  lastLogin: "3 mars 2026, 09:14",
}

export interface NotificationSetting {
  id: string
  label: string
  description: string
  defaultEnabled: boolean
}

export interface NotificationGroup {
  category: string
  settings: NotificationSetting[]
}

export const notificationGroups: NotificationGroup[] = [
  {
    category: "Marchés",
    settings: [
      {
        id: "market-alerts",
        label: "Alertes de cours",
        description: "Seuils de variation dépassés sur les valeurs suivies",
        defaultEnabled: true,
      },
      {
        id: "volume-alerts",
        label: "Volumes anormaux",
        description: "Détection de volumes inhabituels sur la BRVM",
        defaultEnabled: true,
      },
      {
        id: "index-variation",
        label: "Variation indices",
        description: "Mouvements significatifs du BRVM Composite et BRVM 30",
        defaultEnabled: false,
      },
    ],
  },
  {
    category: "Portefeuille",
    settings: [
      {
        id: "daily-pnl",
        label: "P&L quotidien",
        description: "Résumé journalier de la performance du portefeuille",
        defaultEnabled: true,
      },
      {
        id: "rebalancing",
        label: "Rééquilibrage",
        description: "Suggestions de rééquilibrage basées sur l'allocation cible",
        defaultEnabled: false,
      },
    ],
  },
  {
    category: "Système",
    settings: [
      {
        id: "maintenance",
        label: "Maintenance",
        description: "Notifications de maintenance planifiée de la plateforme",
        defaultEnabled: true,
      },
      {
        id: "new-features",
        label: "Nouvelles fonctionnalités",
        description: "Annonces de mises à jour et nouvelles fonctionnalités",
        defaultEnabled: true,
      },
    ],
  },
]

export interface SecurityInfo {
  twoFactorEnabled: boolean
  twoFactorMethod: string
  lastLogin: string
  sessionExpiry: string
}

export const securityInfo: SecurityInfo = {
  twoFactorEnabled: true,
  twoFactorMethod: "TOTP (Google Authenticator)",
  lastLogin: "3 mars 2026, 09:14 — Abidjan, CI",
  sessionExpiry: "24 heures",
}

export interface ApiConnection {
  name: string
  status: "connecté" | "dégradé" | "hors ligne"
  latency: string
}

export const apiConnections: ApiConnection[] = [
  { name: "BRVM Data Feed", status: "connecté", latency: "12 ms" },
  { name: "BCEAO API", status: "connecté", latency: "45 ms" },
  { name: "Bloomfield Tigran", status: "dégradé", latency: "320 ms" },
  { name: "Reuters Market Data", status: "connecté", latency: "78 ms" },
]
