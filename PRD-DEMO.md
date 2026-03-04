# PRD — Démo Bloomfield Terminal

> **Version :** 1.0 | **Date :** 2026-03-03
> **Auteur :** MEDEV Group
> **Statut :** Draft
> **Référence offre :** AO_BI_2026_001

---

## 1. Objectif de la démo

### Pourquoi cette démo ?

Dans le cadre de la soumission à l'appel d'offres Bloomfield Intelligence, cette démo interactive a pour but de :

1. **Prouver la faisabilité technique** — Montrer que MEDEV maîtrise l'architecture multi-fenêtres, le temps réel et la densité de données financières
2. **Créer un effet "wow"** — Donner à Bloomfield une vision tangible de leur futur terminal, pas juste un document
3. **Se différencier des autres soumissionnaires** — Passer du descriptif au démonstratif
4. **Valider l'adéquation UX** — Montrer que l'ergonomie proposée répond aux attentes des utilisateurs professionnels (traders, analystes, SGI)

### Ce que la démo n'est PAS

- Pas un MVP fonctionnel connecté à de vraies API
- Pas une base de code production-ready
- Pas l'intégralité des 6 modules — seulement les éléments à fort impact visuel et stratégique

---

## 2. Public cible de la démo

| Audience | Ce qu'ils veulent voir |
|---|---|
| **Direction Bloomfield (Stanislas Zézé)** | Vision stratégique, positionnement vs Bloomberg/Refinitiv, souveraineté |
| **Responsable technique Bloomfield** | Faisabilité, stack, architecture, qualité du code |
| **Utilisateurs clés (analystes, traders)** | Ergonomie, densité d'info, réactivité, outils familiers |

---

## 3. Principes directeurs de la démo

| Principe | Détail |
|---|---|
| **Data-dense** | Chaque écran doit respirer "terminal financier pro" — pas de vide, pas de marketing fluff |
| **Dark-ready look** | Fond sombre (navy/charcoal) pour le look Bloomberg, même si le mode sombre complet est Phase 2 |
| **Données simulées réalistes** | Utiliser de vraies valeurs BRVM (SONATEL, SOLIBRA, SGBCI, etc.), vraies devises UEMOA, vrais indicateurs macro |
| **Interactivité clé** | Quelques interactions réelles (navigation, hover, changement d'onglet) — pas besoin de tout câbler |
| **Branding Bloomfield** | Logo, couleurs Bloomfield, mention "Bloomfield Terminal" visible — c'est LEUR produit |

---

## 4. Scope fonctionnel de la démo

### 4.1 Écrans à développer (par priorité)

---

#### Écran 1 — Dashboard Marchés (Page d'accueil) ⭐ PRIORITÉ CRITIQUE

> **C'est la première impression. C'est l'écran qui vend.**

**Contenu :**

- **Header** : Logo Bloomfield Terminal + barre de recherche globale + profil utilisateur + notifications
- **Ticker tape** : Bandeau défilant en haut avec les cours BRVM principaux (SONATEL +1.2%, SOLIBRA -0.5%, etc.)
- **Grille de widgets** (layout type Bloomberg) :
  - Widget **Indices BRVM** : BRVM Composite, BRVM 30, variation jour, graphique sparkline 5 jours
  - Widget **Top Movers** : 5 plus fortes hausses / 5 plus fortes baisses du jour
  - Widget **Carnet d'ordres** : Bid/Ask sur une valeur sélectionnée (SONATEL par défaut)
  - Widget **Mini-graphique** : Cours intraday d'une valeur (type TradingView simplifié)
  - Widget **Actualités** : 3-4 headlines récentes (Bloomfield Review)
  - Widget **Alertes** : Notifications marché récentes
  - Widget **Indicateurs Macro** : PIB, inflation, taux directeur BCEAO — vue résumée

**Interactions démo :**
- Hover sur les widgets pour voir les détails
- Clic sur une valeur → navigation vers l'écran Fiche Valeur
- Données qui "bougent" (simulation temps réel avec des intervalles aléatoires)

**Données simulées :**
- ~40 valeurs BRVM avec cours, variations, volumes
- Indices BRVM Composite et BRVM 30
- Devises : XOF/EUR, XOF/USD

---

#### Écran 2 — Fiche Valeur détaillée ⭐ PRIORITÉ HAUTE

> **Montre la profondeur d'analyse disponible sur chaque titre.**

**Contenu :**

- **En-tête valeur** : Nom (ex: SONATEL), ticker (SNTS), cours actuel, variation, volume, capitalisation
- **Graphique principal** : Graphique interactif type TradingView (chandeliers japonais, ligne, volume en barre)
  - Sélecteur de période : 1J | 1S | 1M | 3M | 6M | 1A | 5A
- **Carnet d'ordres** : Profondeur bid/ask (5 niveaux)
- **Fondamentaux** : PER, ROE, dividende, capitalisation — tableau compact
- **Score Bloomfield Tigran** : Note de crédit + jauge visuelle (intégration propriétaire)
- **Actualités liées** : 2-3 news relatives à la valeur

**Interactions démo :**
- Changement de période sur le graphique
- Hover sur le graphique pour afficher le tooltip avec OHLCV
- Onglets : Cours | Fondamentaux | Risque | Actualités

---

#### Écran 3 — Vue Portefeuille ⭐ PRIORITÉ HAUTE

> **Montre la valeur ajoutée pour les investisseurs institutionnels (Persona 3).**

**Contenu :**

- **Résumé portefeuille** : Valeur totale, P&L jour, P&L total, rendement annualisé
- **Allocation** : Donut chart par secteur + tableau des positions
- **Tableau des positions** : Valeur | Qté | PRU | Cours | P&L | % Portefeuille
- **Performance** : Graphique ligne — performance portefeuille vs BRVM Composite (benchmark)
- **Bouton "Exporter PDF"** : Visible (non fonctionnel dans la démo, mais montre la feature)

**Interactions démo :**
- Tri des colonnes du tableau
- Hover sur le donut chart pour voir les détails sectoriels

---

#### Écran 4 — Données Macro ⭐ PRIORITÉ MOYENNE

> **Différenciateur clé vs Bloomberg : contextualisation africaine.**

**Contenu :**

- **Carte Afrique de l'Ouest** : Vue UEMOA avec indicateurs par pays (code couleur)
- **Indicateurs clés** : PIB, inflation, taux directeur BCEAO, balance commerciale
  - Avec sparklines de tendance
- **Bloomfield Forecast** : Prévisions affichées avec badge "Bloomfield" (propriétaire)
- **Tableau comparatif** : Multi-pays, multi-indicateurs

**Interactions démo :**
- Clic sur un pays de la carte → affiche les détails
- Sélecteur de période pour les séries

---

#### Écran 5 — Écran de Login ⭐ PRIORITÉ BASSE

> **Premier contact visuel — doit être impeccable mais simple.**

**Contenu :**

- Logo Bloomfield Terminal centré
- Formulaire : Email + Mot de passe + Bouton "Se connecter"
- Mention MFA (visuel, non fonctionnel)
- Background : skyline Abidjan ou motif financier subtil
- Tagline : "L'intelligence financière africaine"

---

### 4.2 Composants transversaux à développer

| Composant | Description |
|---|---|
| **Sidebar navigation** | Navigation latérale avec icônes + labels : Dashboard, Marchés, Portefeuilles, Analyse, Macro, News, Admin |
| **Ticker tape** | Bandeau défilant horizontal avec cours temps réel simulés |
| **Widget container** | Composant générique : header avec titre + actions (expand, refresh, close) + contenu |
| **Data table** | Tableau financier dense avec tri, hover highlight, couleurs conditionnelles (vert/rouge) |
| **Sparkline** | Mini-graphiques inline pour tendances |
| **Score gauge** | Jauge circulaire pour scores Bloomfield (Tigran, risque) |
| **Notification badge** | Indicateur d'alertes dans le header |

### 4.3 Hors scope (explicitement exclu)

- Saisie d'ordres fonctionnelle
- Authentification réelle / MFA
- Connexion API BRVM / BCEAO
- Web TV / streaming vidéo
- Administration / gestion des droits
- Export PDF/Excel fonctionnel
- Responsive mobile (desktop only pour la démo)
- Mode sombre toggle (on fixe UN thème sombre-corporate)
- Multi-fenêtres détachables (on montre le layout, pas le détachement)

---

## 5. Données simulées

### 5.1 Valeurs BRVM à intégrer

| Ticker | Nom | Secteur |
|---|---|---|
| SNTS | SONATEL | Télécoms |
| SLBC | SOLIBRA | Brasseries |
| SGBC | SGBCI | Banque |
| SIBC | SIB | Banque |
| CIEC | CIE | Énergie |
| SDCC | SODECI | Services publics |
| TTLC | TOTAL CI | Énergie |
| BOAB | BOA Bénin | Banque |
| BOAC | BOA CI | Banque |
| NSBC | NSIA Banque | Banque |
| ONTBF | ONATEL BF | Télécoms |
| PALC | PALM CI | Agro-industrie |
| STBC | SITAB | Tabac |
| TTLS | TOTAL Sénégal | Énergie |
| SMBC | SMB | Banque |

> Générer des données réalistes : cours entre 1 000 et 50 000 XOF, variations entre -5% et +5%, volumes cohérents.

### 5.2 Données macro à simuler

| Indicateur | Pays | Valeur exemple |
|---|---|---|
| PIB (croissance) | Côte d'Ivoire | 6.5% |
| Inflation | Côte d'Ivoire | 3.8% |
| Taux directeur BCEAO | UEMOA | 3.50% |
| PIB (croissance) | Sénégal | 8.2% |
| PIB (croissance) | Burkina Faso | 4.1% |
| Balance commerciale | Côte d'Ivoire | -2.3% PIB |

### 5.3 Simulation temps réel

- **Mécanisme** : `setInterval` toutes les 2-5 secondes, variation aléatoire ±0.1-0.5% sur les cours
- **Effet visuel** : Flash vert (hausse) / rouge (baisse) sur les cellules qui changent, comme un vrai terminal
- **Ticker tape** : Défilement continu CSS avec les cours mis à jour

---

## 6. Stack technique de la démo

| Couche | Choix | Justification |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | Aligné avec l'offre technique |
| **Langage** | TypeScript | Aligné avec l'offre technique |
| **Styling** | Tailwind CSS | Aligné avec l'offre technique |
| **Graphiques** | Lightweight Charts (TradingView open-source) | Rendu professionnel, léger, gratuit |
| **Data tables** | TanStack Table | Performant, tri/filtre natif |
| **Icônes** | Lucide React | Cohérent, léger |
| **Animations** | Framer Motion (léger) | Transitions fluides widgets |
| **Données** | JSON statique + simulation client-side | Pas de backend nécessaire |
| **Déploiement** | Vercel | Démo accessible par URL, déploiement instant |

---

## 7. Design direction

### 7.1 Palette de couleurs (thème terminal financier)

```
Background principal :  #0F1117 (quasi-noir bleuté)
Background surface :    #1A1D26 (panels/widgets)
Background elevated :   #242731 (hover, cards actives)
Bordures :              #2E3140 (subtil)

Texte principal :       #E8E9ED (blanc cassé)
Texte secondaire :      #8B8D97 (gris moyen)
Texte muted :           #5A5C66 (gris sombre)

Accent primaire :       #3B82F6 (bleu — actions, liens, sélection)
Accent Bloomfield :     [couleur marque Bloomfield — à confirmer]

Hausse :                #22C55E (vert)
Baisse :                #EF4444 (rouge)
Neutre :                #8B8D97 (gris)
```

### 7.2 Typographie

- **Titres** : Inter ou JetBrains Mono (pour le côté "terminal")
- **Données chiffrées** : JetBrains Mono / Tabular Nums (alignement colonnes)
- **Corps** : Inter
- **Taille base** : 14px (densité professionnelle, pas 16px standard)

### 7.3 Principes visuels

- **Densité élevée** : Peu de whitespace, beaucoup de données — c'est un outil de travail, pas un site vitrine
- **Grille de widgets** : Chaque widget est un "panel" autonome avec header, contenu, actions
- **Couleurs conditionnelles** : Vert = hausse/positif, Rouge = baisse/négatif — partout, systématiquement
- **Bordures subtiles** : Séparation par bordures fines plutôt que par ombres
- **Pas d'arrondi excessif** : `border-radius: 6-8px` max — pro, pas "friendly"

---

## 8. Critères de succès de la démo

| Critère | Mesure |
|---|---|
| **Réaction "wow"** | Le client dit "c'est exactement ce qu'on veut" ou "on se croirait sur Bloomberg" |
| **Crédibilité technique** | Le responsable technique Bloomfield valide que le stack et l'approche sont solides |
| **Compréhension immédiate** | Chaque écran est compris en < 5 secondes sans explication |
| **Données réalistes** | Les valeurs BRVM, les indicateurs macro sont reconnus comme vrais par les analystes |
| **Fluidité** | Aucun lag visible, transitions fluides, simulation temps réel convaincante |
| **Branding** | Le client s'identifie au produit — c'est "Bloomfield Terminal", pas "la démo MEDEV" |

---

## 9. Livrables

| # | Livrable | Format |
|---|---|---|
| 1 | Démo interactive déployée | URL Vercel accessible |
| 2 | Code source | Repository Git (ce repo) |
| 3 | Données simulées | Fichiers JSON dans `/data/` |
| 4 | Captures d'écran | Pour insertion dans le dossier de soumission |

---

## 10. Roadmap de développement de la démo

### Phase 1 — Fondations (Jour 1-2)
- [ ] Setup projet Next.js + Tailwind + TypeScript
- [ ] Layout principal : sidebar + header + zone contenu
- [ ] Ticker tape component
- [ ] Widget container component générique
- [ ] Palette de couleurs et tokens CSS
- [ ] Données simulées JSON (valeurs BRVM, macro)

### Phase 2 — Dashboard (Jour 2-3)
- [ ] Grille de widgets Dashboard Marchés
- [ ] Widget Indices BRVM
- [ ] Widget Top Movers
- [ ] Widget Carnet d'ordres (simulé)
- [ ] Widget Mini-graphique (Lightweight Charts)
- [ ] Widget Actualités
- [ ] Simulation temps réel (setInterval + flash couleur)

### Phase 3 — Écrans secondaires (Jour 3-4)
- [ ] Fiche Valeur détaillée + graphique interactif
- [ ] Vue Portefeuille + donut chart + tableau positions
- [ ] Données Macro + carte UEMOA
- [ ] Navigation entre écrans

### Phase 4 — Polish (Jour 4-5)
- [ ] Login screen
- [ ] Transitions et animations
- [ ] Responsive ajustements (desktop 1280px+)
- [ ] Données réalistes finales
- [ ] Branding Bloomfield (logo, couleurs)
- [ ] Déploiement Vercel
- [ ] Captures d'écran pour le dossier

---

## 11. Risques et mitigations

| Risque | Impact | Mitigation |
|---|---|---|
| Scope creep ("ajoute aussi...") | Retard | Scope figé dans ce PRD — tout ajout est Phase 2 |
| Données pas assez réalistes | Perte de crédibilité | Utiliser vrais noms BRVM, vrais ordres de grandeur |
| Performance graphiques | Mauvaise impression | Lightweight Charts est optimisé, limiter les points de données |
| Branding Bloomfield indisponible | Look générique | Prévoir un placeholder de qualité, ajuster au dernier moment |

---

*Ce PRD est la source de vérité pour le développement de la démo Bloomfield Terminal.*
*Toute modification de scope doit être validée avant implémentation.*
