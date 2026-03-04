export interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: string
  category: string
}

export const news: NewsItem[] = [
  {
    id: "1",
    title: "SONATEL publie des résultats T4 supérieurs aux attentes avec un CA en hausse de 8,3%",
    source: "Bloomfield Review",
    timestamp: "Il y a 25 min",
    category: "Résultats",
  },
  {
    id: "2",
    title: "La BCEAO maintient son taux directeur à 3,50% pour le T1 2026",
    source: "BCEAO",
    timestamp: "Il y a 1h",
    category: "Politique monétaire",
  },
  {
    id: "3",
    title: "SGBCI annonce un programme de rachat d'actions de 2,5 milliards XOF",
    source: "Bloomfield Review",
    timestamp: "Il y a 2h",
    category: "Corporate",
  },
  {
    id: "4",
    title: "Le marché BRVM enregistre sa 5ème séance consécutive de hausse",
    source: "BRVM",
    timestamp: "Il y a 3h",
    category: "Marchés",
  },
  {
    id: "5",
    title: "Côte d'Ivoire : croissance du PIB révisée à 7,2% pour 2025",
    source: "FMI",
    timestamp: "Hier",
    category: "Macro",
  },
]
