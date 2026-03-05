import type { Step } from "react-joyride"

export interface TourStep extends Step {
  page: string
}

export const tourSteps: TourStep[] = [
  {
    target: '[data-tour="sidebar"]',
    title: "Navigation",
    content:
      "La sidebar vous donne accès à tous les modules : marchés, portefeuille, analyse et outils.",
    page: "/",
    disableBeacon: true,
    placement: "right",
  },
  {
    target: '[data-tour="search"]',
    title: "Recherche rapide",
    content: "Recherchez un titre, un indice ou un marché en quelques caractères.",
    page: "/",
    disableBeacon: true,
  },
  {
    target: '[data-tour="ticker-tape"]',
    title: "Cours en direct",
    content:
      "Les cours des valeurs BRVM défilent en temps réel avec les variations du jour.",
    page: "/",
    disableBeacon: true,
  },
  {
    target: '[data-tour="widget-indices"]',
    title: "Indices BRVM",
    content:
      "Suivez le BRVM Composite et le BRVM 30 avec leurs sparklines de tendance.",
    page: "/",
    disableBeacon: true,
  },
  {
    target: '[data-tour="widget-movers"]',
    title: "Top Movers",
    content:
      "Les plus fortes hausses et baisses du jour sur la BRVM, mises à jour en temps réel. Cliquez sur un titre pour accéder à sa fiche détaillée.",
    page: "/",
    disableBeacon: true,
  },
  {
    target: '[data-tour="widget-chart"]',
    title: "Graphique intraday",
    content:
      "Visualisez l'évolution du cours en séance pour les principales valeurs.",
    page: "/",
    disableBeacon: true,
  },
  {
    target: '[data-tour="widget-alerts"]',
    title: "Alertes",
    content:
      "Recevez des notifications sur les seuils de prix franchis et les volumes anormaux.",
    page: "/",
    disableBeacon: true,
  },
  {
    target: '[data-tour="portfolio-summary"]',
    title: "Résumé portefeuille",
    content:
      "Vue d'ensemble : valeur totale, P&L jour et global, rendement annualisé.",
    page: "/portefeuille",
    disableBeacon: true,
  },
  {
    target: '[data-tour="portfolio-positions"]',
    title: "Positions",
    content:
      "Détail de chaque ligne du portefeuille avec prix d'achat, cours actuel et plus-value latente.",
    page: "/portefeuille",
    disableBeacon: true,
  },
  // Macro Steps
  {
    target: '[data-tour="macro-indicators"]',
    title: "Indicateurs Macro",
    content:
      "Vue d'ensemble des indicateurs macroéconomiques clés : croissance, inflation, dette, etc.",
    page: "/macro",
    disableBeacon: true,
  },
  {
    target: '[data-tour="macro-map"]',
    title: "Carte UEMOA",
    content:
      "Sélectionnez un pays pour filtrer les données et visualiser ses indicateurs spécifiques.",
    page: "/macro",
    disableBeacon: true,
    placement: "right",
  },
  {
    target: '[data-tour="macro-forecasts"]',
    title: "Prévisions Bloomfield",
    content:
      "Nos analyses quantitatives et prévisions exclusives pour les prochaines années.",
    page: "/macro",
    disableBeacon: true,
    placement: "left",
  },
  {
    target: '[data-tour="macro-comparison"]',
    title: "Comparaison Multi-pays",
    content:
      "Comparez les métriques de tous les pays de la zone UEMOA en un coup d'œil.",
    page: "/macro",
    disableBeacon: true,
    placement: "top",
  },
  // News Steps
  {
    target: '[data-tour="news-header"]',
    title: "Flux Actualités",
    content:
      "Retrouvez ici la veille financière et macro, consolidée depuis les principales sources.",
    page: "/news",
    disableBeacon: true,
  },
  {
    target: '[data-tour="news-filters"]',
    title: "Filtres par catégorie",
    content:
      "Filtrez rapidement le flux par thème (marchés, macro, corporate, etc.).",
    page: "/news",
    disableBeacon: true,
  },
  {
    target: '[data-tour="news-list"]',
    title: "Liste des articles",
    content:
      "Parcourez les titres, sélectionnez un article et ouvrez la source externe si nécessaire.",
    page: "/news",
    disableBeacon: true,
    placement: "right",
  },
  {
    target: '[data-tour="news-sidebar"]',
    title: "Contexte et tendances",
    content:
      "Le panneau droit affiche la répartition par catégorie, les tickers les plus cités et les sources actives.",
    page: "/news",
    disableBeacon: true,
    placement: "left",
  },
  // Fiche Valeur Steps (Demonstrated with SNTS)
  {
    target: '[data-tour="ticker-header"]',
    title: "Cotation Temps Réel",
    content:
      "Suivez le cours en direct, la variation journalière et les volumes échangés.",
    page: "/marches/SNTS",
    disableBeacon: true,
  },
  {
    target: '[data-tour="ticker-chart"]',
    title: "Graphique Interactif",
    content:
      "Analysez l'historique des prix via des chandeliers japonais avec différentes échelles de temps.",
    page: "/marches/SNTS",
    disableBeacon: true,
  },
  {
    target: '[data-tour="ticker-orderbook"]',
    title: "Carnet d'Ordres",
    content:
      "Visualisez la profondeur du marché avec les meilleures offres d'achat (Bid) et de vente (Ask).",
    page: "/marches/SNTS",
    disableBeacon: true,
    placement: "left",
  },
  {
    target: '[data-tour="ticker-fundamentals"]',
    title: "Fondamentaux",
    content:
      "Accédez aux ratios clés de valorisation : PER, ROE, Rendement et Capitalisation.",
    page: "/marches/SNTS",
    disableBeacon: true,
    placement: "left",
  },
  {
    target: '[data-tour="ticker-tigran"]',
    title: "Score Tigran",
    content:
      "Le rating propriétaire Bloomfield synthétisant le risque et le potentiel de la valeur.",
    page: "/marches/SNTS",
    disableBeacon: true,
    placement: "left",
  },
]
