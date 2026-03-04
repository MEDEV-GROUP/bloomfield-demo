export interface NewsItem {
  id: string
  title: string
  source: string
  sourceUrl?: string  // URL du site de la source (page d'accueil ou section)
  url?: string        // Lien direct vers l'article original
  timestamp: string
  category: string
  // Champs optionnels enrichis pour la page Actualités complète
  summary?: string
  relatedTicker?: string
  relatedSector?: string
}

export const news: NewsItem[] = [
  {
    id: "1",
    title: "SONATEL publie des résultats T4 supérieurs aux attentes avec un CA en hausse de 8,3%",
    source: "Bloomfield Review",
    sourceUrl: "https://bloomfieldinvestment.com/review",
    url: "https://bloomfieldinvestment.com/review/sonatel-resultats-t4-2025",
    timestamp: "Il y a 25 min",
    category: "Résultats",
    relatedTicker: "SNTS",
    relatedSector: "Télécoms",
    summary:
      "Le groupe Sonatel a annoncé ce matin un chiffre d'affaires consolidé en hausse de 8,3% sur le quatrième trimestre 2025, dépassant les estimations des analystes qui tablaient sur +6,5%. La croissance est portée par la forte progression du mobile money et des services data en Côte d'Ivoire et au Sénégal.",
  },
  {
    id: "2",
    title: "La BCEAO maintient son taux directeur à 3,50% pour le T1 2026",
    source: "BCEAO",
    sourceUrl: "https://www.bceao.int",
    url: "https://www.bceao.int/fr/publications/communique-politique-monetaire-mars-2026",
    timestamp: "Il y a 1h",
    category: "Politique monétaire",
    summary:
      "Le Comité de Politique Monétaire de la BCEAO a décidé, lors de sa réunion du 4 mars 2026, de maintenir inchangé le taux d'intérêt minimum de soumission aux opérations d'appels d'offres d'injection de liquidités à 3,50%. Cette décision reflète la stabilité de l'environnement macroéconomique de l'UEMOA malgré les tensions inflationnistes mondiales.",
  },
  {
    id: "3",
    title: "SGBCI annonce un programme de rachat d'actions de 2,5 milliards XOF",
    source: "Bloomfield Review",
    sourceUrl: "https://bloomfieldinvestment.com/review",
    url: "https://bloomfieldinvestment.com/review/sgbci-rachat-actions-2026",
    timestamp: "Il y a 2h",
    category: "Corporate",
    relatedTicker: "SGBC",
    relatedSector: "Banques",
    summary:
      "La Société Générale de Banques en Côte d'Ivoire (SGBCI) a annoncé un programme de rachat de ses propres actions d'un montant maximum de 2,5 milliards XOF, soit environ 3,8 millions d'euros. Ce programme, approuvé par l'Assemblée Générale Extraordinaire, sera exécuté sur une période de 18 mois à compter du 1er avril 2026.",
  },
  {
    id: "4",
    title: "Le marché BRVM enregistre sa 5ème séance consécutive de hausse",
    source: "BRVM",
    sourceUrl: "https://www.brvm.org",
    url: "https://www.brvm.org/fr/actualites/brvm-5-seances-hausse-mars-2026",
    timestamp: "Il y a 3h",
    category: "Marchés",
    summary:
      "L'indice BRVM Composite a clôturé en hausse de 0,87% ce mardi, portant à cinq le nombre de séances consécutives dans le vert. Les valeurs bancaires et télécom ont mené la hausse, avec en tête SNTS (+1,2%) et SGBC (+0,9%). Le volume des transactions s'est établi à 1,24 milliard XOF, en hausse de 22% par rapport à la moyenne des 30 derniers jours.",
  },
  {
    id: "5",
    title: "Côte d'Ivoire : croissance du PIB révisée à 7,2% pour 2025",
    source: "FMI",
    sourceUrl: "https://www.imf.org/fr",
    url: "https://www.imf.org/fr/Publications/WEO/Issues/2026/01/cote-divoire-croissance-pib",
    timestamp: "Hier",
    category: "Macro",
    relatedSector: "Économie",
    summary:
      "Le Fonds Monétaire International a révisé à la hausse ses prévisions de croissance pour la Côte d'Ivoire, portant l'estimation pour 2025 à 7,2% contre 6,5% dans les projections d'octobre. Cette révision positive reflète la résilience du secteur agricole, la dynamique des investissements dans les infrastructures et la vigueur de la consommation des ménages.",
  },
  {
    id: "6",
    title: "SOLIBRA renforce sa capacité de production avec une nouvelle unité à Abidjan",
    source: "Bloomfield Review",
    sourceUrl: "https://bloomfieldinvestment.com/review",
    url: "https://bloomfieldinvestment.com/review/solibra-nouvelle-unite-abidjan-2026",
    timestamp: "Hier",
    category: "Corporate",
    relatedTicker: "SLBC",
    relatedSector: "Brasseries",
    summary:
      "La Société de Limonaderies et Brasseries d'Afrique (SOLIBRA) a inauguré hier une nouvelle ligne de production à son site d'Abidjan-Nord, portant sa capacité totale à 1,8 million d'hectolitres par an. L'investissement de 12 milliards XOF a été entièrement financé sur fonds propres. La direction table sur une hausse de 15% du chiffre d'affaires dès 2026.",
  },
  {
    id: "7",
    title: "Sénégal : les recettes d'exportation de gaz naturel attendues dès le S2 2026",
    source: "Agence Ecofin",
    sourceUrl: "https://www.agenceecofin.com",
    url: "https://www.agenceecofin.com/gaz/0403-2026-senegal-recettes-gaz-gta-s2-2026",
    timestamp: "Il y a 2 jours",
    category: "Macro",
    relatedSector: "Énergie",
    summary:
      "Les premières recettes d'exportation liées à l'exploitation des ressources gazières du champ GTA (Grand Tortue Ahmeyim) sont attendues pour le second semestre 2026. Les experts estiment que ces revenus pourraient représenter entre 800 millions et 1,2 milliard USD sur la première année pleine d'exploitation, transformant significativement la structure des finances publiques sénégalaises.",
  },
  {
    id: "8",
    title: "PALM CI affiche un bénéfice net record de 18,4 milliards XOF en 2025",
    source: "Bloomfield Review",
    sourceUrl: "https://bloomfieldinvestment.com/review",
    url: "https://bloomfieldinvestment.com/review/palm-ci-benefice-record-2025",
    timestamp: "Il y a 2 jours",
    category: "Résultats",
    relatedTicker: "PALC",
    relatedSector: "Agro-industrie",
    summary:
      "Palmafrique (PALM CI) a publié ses résultats annuels avec un bénéfice net de 18,4 milliards XOF, en progression de 23% par rapport à 2024. Cette performance record est attribuée à la hausse des cours mondiaux de l'huile de palme et à l'optimisation des coûts de production. Le dividende proposé est de 450 XOF par action, contre 380 XOF l'an passé.",
  },
  {
    id: "9",
    title: "Notation souveraine : Bloomfield confirme 'BBB+' pour la Côte d'Ivoire",
    source: "Bloomfield Intelligence",
    sourceUrl: "https://bloomfieldinvestment.com/intelligence",
    url: "https://bloomfieldinvestment.com/intelligence/notation-souveraine-cdi-bbb-2026",
    timestamp: "Il y a 3 jours",
    category: "Notation",
    summary:
      "Bloomfield Investment Corporation confirme la notation souveraine 'BBB+' pour la République de Côte d'Ivoire avec une perspective stable. Cette décision tient compte de la solidité du cadre macroéconomique, de la gestion prudente de la dette publique et de la diversification progressive de l'économie. La prochaine revue est programmée pour septembre 2026.",
  },
  {
    id: "10",
    title: "TOTAL CI finalise l'acquisition d'un réseau de 42 stations-service au Mali",
    source: "Reuters Afrique",
    sourceUrl: "https://www.reuters.com/fr/afrique",
    url: "https://www.reuters.com/fr/afrique/total-ci-acquisition-stations-mali-2026-03-01",
    timestamp: "Il y a 3 jours",
    category: "Corporate",
    relatedTicker: "TTLC",
    relatedSector: "Énergie",
    summary:
      "TotalEnergies Marketing Côte d'Ivoire a finalisé l'acquisition du réseau de distribution carburant d'un opérateur local malien pour un montant non divulgué, estimé entre 3 et 5 milliards XOF par les analystes. Cette opération porte le réseau de stations-service du groupe à 387 points de vente en Afrique de l'Ouest, renforçant son leadership régional.",
  },
  {
    id: "11",
    title: "BRVM : le volume de transactions dépasse 2 milliards XOF pour la première fois en 2026",
    source: "BRVM",
    sourceUrl: "https://www.brvm.org",
    url: "https://www.brvm.org/fr/actualites/volume-record-2-milliards-xof-2026",
    timestamp: "Il y a 4 jours",
    category: "Marchés",
    summary:
      "La Bourse Régionale des Valeurs Mobilières (BRVM) a enregistré lundi son premier volume journalier dépassant 2 milliards XOF depuis le début de l'année 2026, signe d'un regain d'intérêt des investisseurs institutionnels. Les achats étrangers représentaient environ 35% du volume total, contre une moyenne de 22% sur les douze derniers mois.",
  },
  {
    id: "12",
    title: "Burkina Faso : le gouvernement émet un emprunt obligataire de 150 milliards FCFA",
    source: "UEMOA Marchés",
    sourceUrl: "https://www.uemoa.int/fr/marches",
    url: "https://www.uemoa.int/fr/marches/burkina-faso-emprunt-obligataire-150-milliards-2026",
    timestamp: "Il y a 4 jours",
    category: "Obligations",
    summary:
      "Le gouvernement du Burkina Faso a procédé à l'émission d'un emprunt obligataire par adjudication d'un montant de 150 milliards FCFA, assorti d'un taux d'intérêt de 6,75% et d'une maturité de 5 ans. L'opération a été sursouscrite à hauteur de 178%, témoignant de la confiance maintenue des investisseurs régionaux malgré le contexte sécuritaire.",
  },
]
