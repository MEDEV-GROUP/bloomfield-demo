# MODULE UX/UI FONDATIONS
> **Version :** 1.1 | **Langue :** Français
> **Sources :** Google PAIR Guidebook · Jakob Nielsen · 0xMinds

---

## Table des matières

- [01 — Contexte du projet](#01--contexte-du-projet)
- [02 — Types d'utilisateurs (Personas)](#02--types-dutilisateurs-personas)
- [03 — Compréhension des besoins](#03--compréhension-des-besoins)
- [04 — Design Tokens](#04--design-tokens)
- [05 — Règles UI](#05--règles-ui)
- [06 — Règles UX](#06--règles-ux)
- [07 — Règles d'ergonomie](#07--règles-dergonomie)
- [08 — Patterns de Prompt Augmentation](#08--patterns-de-prompt-augmentation)
- [09 — Principes PAIR Google](#09--principes-pair-google)
- [10 — Checklist de cohérence](#10--checklist-de-cohérence)
- [11 — Comment modifier ce module](#11--comment-modifier-ce-module)

---

## 01 — Contexte du projet

> **INSTRUCTION :** Remplace chaque champ `[PLACEHOLDER]` par les informations réelles de ton projet avant de soumettre ce document à ton IA.

| Champ | Valeur |
|---|---|
| **Nom du projet** | Bloomfield Terminal |
| **Type d'application** | Web App (plateforme financière professionnelle multi-fenêtres) |
| **Plateforme cible** | Web Desktop (multi-écrans) — responsive secondaire |
| **Marché géographique** | Afrique (UEMOA — focus Côte d'Ivoire) |
| **Secteur** | Finance de marché / Intelligence économique |
| **Langue principale** | Français |
| **Contexte réseau** | WiFi stable (usage professionnel desktop) |

### Objectif principal du produit

> Plateforme web économique et financière professionnelle destinée aux acteurs des marchés financiers africains (traders, analystes, SGI, investisseurs institutionnels, décideurs publics), centralisant données de marché BRVM en temps réel, analyse financière, gestion de portefeuilles, données macro et outils de risque propriétaires Bloomfield.

### Identité de marque

| Champ | Valeur |
|---|---|
| **Valeurs de marque** | Professionnel · Fiable · Souverain · Innovant |
| **Ton visuel** | Corporate / Data-dense / Professionnel |
| **Inspiration design** | Bloomberg Terminal, Refinitiv Eikon/LSEG |

### Contraintes techniques

| Contrainte | Valeur |
|---|---|
| **Framework UI** | Next.js 14+ (React) avec TypeScript |
| **Design System réf.** | Tailwind CSS + composants custom |
| **Taille d'écran min.** | 1280px (desktop prioritaire) — responsive 768px (tablette) |
| **Mode sombre** | Non défini (Phase 2) |
| **Accessibilité** | WCAG 2.1 AA requis |

---

## 02 — Types d'utilisateurs (Personas)

> **INSTRUCTION :** Définis 2 à 4 personas. Chaque persona doit correspondre à un vrai profil d'utilisateur observé ou anticipé. Plus les personas sont précis, plus l'IA génère des interfaces adaptées.

> ⚠️ **RÈGLE DE PRIORISATION :** Le Persona 1 est **PRIORITAIRE**. Toute décision de design ambiguë doit favoriser l'expérience du Persona 1 en premier.

---

### Persona 1 — Le Trader / Opérateur SGI

| Attribut | Valeur |
|---|---|
| **Rôle** | Trader / Opérateur de marché SGI |
| **Âge estimé** | 25-45 ans |
| **Niveau tech** | Expert |
| **Appareil** | PC Desktop multi-écrans |
| **Connexion** | WiFi stable / fibre |
| **Langue** | Français |

**Objectif :** Consulter les cours BRVM en temps réel, gérer les carnets d'ordres, passer des ordres, surveiller les alertes marché

**Douleurs :** Latence des données, manque de couverture BRVM sur terminaux internationaux, outils fragmentés

**Motivations :** Vision temps réel unifiée des marchés UEMOA, outils professionnels comparables à Bloomberg

**Comportement :** Multitâches, travaille avec plusieurs fenêtres simultanément, besoin de réactivité < 500ms

---

### Persona 2 — L'Analyste Financier

| Attribut | Valeur |
|---|---|
| **Rôle** | Analyste buy-side / sell-side |
| **Âge estimé** | 25-45 ans |
| **Niveau tech** | Intermédiaire à Expert |
| **Appareil** | PC Desktop, écran large |
| **Connexion** | WiFi stable |
| **Contexte usage** | Bureau, analyse prolongée, concentration |

**Objectif :** Analyser les fondamentaux des sociétés cotées, évaluer le risque pays/corporate, produire des rapports

**Douleurs :** Faible contextualisation des données africaines dans les outils existants, données dispersées

---

### Persona 3 — L'Investisseur Institutionnel / Décideur

| Attribut | Valeur |
|---|---|
| **Rôle** | Directeur d'investissement / Décideur public |
| **Âge estimé** | 35-60 ans |
| **Niveau tech** | Intermédiaire |
| **Appareil** | PC Desktop, écran large |
| **Priorités UI** | Dashboards synthétiques, visualisations claires, rapports exportables |

**Objectif :** Superviser les portefeuilles, piloter l'allocation d'actifs, anticiper les risques macro

**Douleurs :** Manque de données visuelles consolidées, exports difficiles, pas de vue unifiée

---

### Persona 4 — L'Administrateur Bloomfield

| Attribut | Valeur |
|---|---|
| **Rôle** | Admin plateforme / Gouvernance des données |
| **Âge estimé** | 30-50 ans |
| **Niveau tech** | Expert |
| **Appareil** | PC Desktop |

**Objectif :** Gérer les droits d'accès, la gouvernance des données, superviser la plateforme, valider les contenus éditoriaux

**Douleurs :** Dépendance aux outils externes pour la gestion des données propriétaires

---

## 03 — Compréhension des besoins

> **INSTRUCTION :** Utilise ce cadre pour définir les besoins **AVANT** de demander à l'IA de concevoir une interface.
> Source : Google PAIR Guidebook + UX Research.

---

### A. Besoins fonctionnels

> Ce que l'app **DOIT** faire.

1. **Gestion intégrée des opérations boursières** — Flux temps réel BRVM, carnets d'ordres, watchlists, alertes, interface de saisie d'ordres
2. **Gestion de Portefeuilles** — Construction, suivi, mesures de performance, simulation de scénarios, rapports PDF/Excel
3. **Analyse Financière et Risque** — Bloomfield Tigran, Bloomfield Private Index, états financiers, notations, matrices de risque
4. **Données Macroéconomiques** — Données BCEAO, agrégats, Bloomfield Forecast, séries chronologiques, comparaisons multi-pays
5. **Communication et Éducation** — Web TV Bloomfield, actualités financières, ressources pédagogiques, notifications
6. **Dashboard Marchés** — Tableaux de bord par profil, widgets paramétrables, layouts personnalisés

---

### B. Besoins de confiance & transparence *(Principe PAIR #4)*

> L'utilisateur doit toujours comprendre **CE QUI SE PASSE**.

| Contexte | Règle |
|---|---|
| **Paiement** | Afficher récapitulatif AVANT confirmation finale |
| **Suppression** | Dialog de confirmation obligatoire |
| **Chargement** | Skeleton loader ou progress indicator visible |
| **Erreur réseau** | Message clair + bouton "Réessayer" |

- Toujours confirmer les actions critiques (paiement, suppression)
- Afficher l'état du système à tout moment
- Ne jamais piéger l'utilisateur dans une action irréversible sans avertissement

---

### C. Besoins de contrôle *(Autonomie — Principe PAIR #5)*

> L'utilisateur doit pouvoir **annuler, modifier et corriger** à tout moment.

- Toujours proposer un bouton "Retour" ou "Annuler"
- Les formulaires longs doivent sauvegarder le progrès
- Erreur de saisie : ne pas vider le champ, juste le mettre en évidence
- Déconnexion accidentelle : reprendre là où l'utilisateur s'était arrêté

---

### D. Besoins contextuels *(Plateforme professionnelle desktop — Marché UEMOA)*

| Contrainte | Règle de design |
|---|---|
| **Connexion** | WiFi stable (professionnel) mais prévoir résilience pour latence < 500ms |
| **Multi-écrans** | Support natif multi-fenêtres et multi-écrans |
| **Données financières** | Performance critique, temps réel, cache Redis < 50ms |
| **Appareils** | Desktop haute performance avec écrans larges |
| **Littératie** | Utilisateurs professionnels, densité d'information élevée acceptable |
| **Langue** | Français principal |

---

### E. Besoins d'accessibilité *(WCAG AA)*

- Contraste minimum texte/fond : **4.5:1** (corps), **3:1** (grands titres)
- Taille de touche minimale : **44×44dp** sur mobile
- Ne jamais utiliser la couleur comme **seul** indicateur d'état
- Prévoir support lecteur d'écran (TalkBack Android / VoiceOver iOS)

---

## 04 — Design Tokens

> **INSTRUCTION À L'IA :** *"Utilise EXCLUSIVEMENT ces tokens pour toute couleur, typographie, espacement, ombre et rayon. Toute valeur arbitraire est interdite."*

---

### 4.1 Couleurs primaires (10 teintes)

> Couleur de marque principale : `[DÉFINIS TA COULEUR — ex: #0057A8]`

```css
--primary-50:  /* valeur la plus claire — fonds subtils */
--primary-100: /* valeur claire — hover sur fond */
--primary-200: /* bordures légères */
--primary-300: /* éléments inactifs */
--primary-400: /* éléments secondaires */
--primary-500: /* couleur principale de marque */
--primary-600: /* états interactifs par défaut — boutons */
--primary-700: /* états hover boutons */
--primary-800: /* états active/pressed */
--primary-900: /* texte sur fond clair */
--primary-950: /* texte foncé, titres */
```

> ⚠️ **RÈGLE :** `primary-600+` doit avoir un ratio de contraste ≥ **4.5:1** avec `#FFFFFF`.

---

### 4.2 Couleurs sémantiques

```css
--color-background:           var(--primary-50);
--color-background-subtle:    var(--primary-100);
--color-surface:              #FFFFFF;
--color-surface-raised:       #FFFFFF; /* avec shadow-sm */

--color-text-primary:         var(--primary-950);
--color-text-secondary:       var(--primary-700);
--color-text-muted:           var(--primary-500);
--color-text-on-primary:      #FFFFFF;
--color-text-disabled:        var(--primary-300);

--color-border:               var(--primary-200);
--color-border-strong:        var(--primary-300);
--color-border-focus:         var(--primary-600);

--color-interactive:          var(--primary-600);
--color-interactive-hover:    var(--primary-700);
--color-interactive-active:   var(--primary-800);
--color-interactive-disabled: var(--primary-300);
```

---

### 4.3 Couleurs de statut

```css
/* SUCCÈS */
--color-success-bg:     #F0FDF4;
--color-success-text:   #166534;
--color-success-border: #BBF7D0;
--color-success-icon:   #22C55E;

/* AVERTISSEMENT */
--color-warning-bg:     #FFFBEB;
--color-warning-text:   #92400E;
--color-warning-border: #FDE68A;
--color-warning-icon:   #F59E0B;

/* ERREUR */
--color-error-bg:       #FFF1F2;
--color-error-text:     #9F1239;
--color-error-border:   #FECDD3;
--color-error-icon:     #EF4444;

/* INFO */
--color-info-bg:        #EFF6FF;
--color-info-text:      #1E40AF;
--color-info-border:    #BFDBFE;
--color-info-icon:      #3B82F6;
```

---

### 4.4 Couleurs neutres (Gris)

```css
--neutral-50:  #F9FAFB;
--neutral-100: #F3F4F6;
--neutral-200: #E5E7EB;
--neutral-300: #D1D5DB;
--neutral-400: #9CA3AF;
--neutral-500: #6B7280;
--neutral-600: #4B5563;
--neutral-700: #374151;
--neutral-800: #1F2937;
--neutral-900: #111827;
```

---

### 4.5 Typographie

> **Ratio d'échelle :** 1.25 (Major Third) | **Base :** 16px | **Police titres :** `[DÉFINIS — ex: Inter, Plus Jakarta Sans]` | **Police corps :** `[DÉFINIS — ex: Inter, Source Sans 3]`

```css
--text-xs:   0.64rem;   /* 10.24px */ /* line-height: 1.5  | letter-spacing: 0.02em */
--text-sm:   0.8rem;    /* 12.8px  */ /* line-height: 1.5  | letter-spacing: 0.01em */
--text-base: 1rem;      /* 16px    */ /* line-height: 1.6  | letter-spacing: 0      */
--text-lg:   1.25rem;   /* 20px    */ /* line-height: 1.5  | letter-spacing: 0      */
--text-xl:   1.563rem;  /* 25px    */ /* line-height: 1.4  | letter-spacing: -0.01em */
--text-2xl:  1.953rem;  /* 31.25px */ /* line-height: 1.3  | letter-spacing: -0.01em */
--text-3xl:  2.441rem;  /* 39px    */ /* line-height: 1.2  | letter-spacing: -0.02em */
--text-4xl:  3.052rem;  /* 48.8px  */ /* line-height: 1.1  | letter-spacing: -0.02em */
--text-5xl:  3.815rem;  /* 61px    */ /* line-height: 1.1  | letter-spacing: -0.03em */

--font-regular:  400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

---

### 4.6 Espacement (Base 4px)

```css
--space-0:  0;
--space-1:  4px;   /* 0.25rem */
--space-2:  8px;   /* 0.5rem  */
--space-3:  12px;  /* 0.75rem */
--space-4:  16px;  /* 1rem    */
--space-5:  20px;  /* 1.25rem */
--space-6:  24px;  /* 1.5rem  */
--space-8:  32px;  /* 2rem    */
--space-10: 40px;  /* 2.5rem  */
--space-12: 48px;  /* 3rem    */
--space-16: 64px;  /* 4rem    */
--space-20: 80px;  /* 5rem    */
--space-24: 96px;  /* 6rem    */

/* Tokens sémantiques */
--spacing-button-x:       var(--space-4);
--spacing-button-y:       var(--space-3);
--spacing-input-x:        var(--space-3);
--spacing-input-y:        var(--space-3);
--spacing-card-padding:   var(--space-6);
--spacing-section-gap:    var(--space-16);
--spacing-stack:          var(--space-4);
--spacing-inline:         var(--space-2);
--spacing-page-margin:    var(--space-4);   /* mobile */
--spacing-page-margin-md: var(--space-8);   /* tablet+ */
```

---

### 4.7 Rayons de bordure

```css
--radius-none:  0;
--radius-sm:    4px;
--radius-md:    8px;
--radius-lg:    12px;
--radius-xl:    16px;
--radius-2xl:   24px;
--radius-full:  9999px;

/* Sémantiques */
--radius-button:       var(--radius-md);
--radius-input:        var(--radius-md);
--radius-card:         var(--radius-lg);
--radius-modal:        var(--radius-xl);
--radius-avatar:       var(--radius-full);
--radius-badge:        var(--radius-full);
--radius-chip:         var(--radius-full);
--radius-bottom-sheet: var(--radius-2xl); /* top seulement */
```

---

### 4.8 Ombres (Élévation)

```css
--shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.06);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.05);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.08), 0 10px 10px -5px rgb(0 0 0 / 0.04);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.15);
```

| Token | Usage recommandé |
|---|---|
| `--shadow-sm` | Hover states, cards légères |
| `--shadow-md` | Cards standard, dropdowns |
| `--shadow-lg` | Modals, popovers, bottom sheets |
| `--shadow-xl` | Dialogs, drawers |
| `--shadow-2xl` | Éléments flottants prioritaires |

---

### 4.9 Transitions & animations

```css
--transition-fast:   150ms ease-in-out;
--transition-normal: 250ms ease-in-out;
--transition-slow:   400ms ease-in-out;
--transition-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

> ⚠️ **RÈGLE (contexte Afrique de l'Ouest) :** Pas d'animations > 400ms sur mobile. Respecter `prefers-reduced-motion`. Privilégier `opacity` + `transform` (GPU) vs layout animations.

---

### 4.10 Grille & layout

```css
--grid-columns-mobile:  4;
--grid-columns-tablet:  8;
--grid-columns-desktop: 12;
--grid-gutter:          var(--space-4);
--grid-max-width:       1280px;
--grid-content-width:   768px;
```

---

## 05 — Règles UI

> **Source :** Nielsen Norman Group · Material Design 3 · WCAG 2.1

### 5.1 Hiérarchie visuelle

| # | Règle |
|---|---|
| R1 | Pas plus de **3 niveaux** de poids typographique par écran |
| R2 | L'élément d'action principal (CTA) doit être **visuellement dominant** |
| R3 | Utiliser taille + poids + couleur — jamais un seul critère |
| R4 | **1 seul CTA primaire** par écran. Les autres sont secondaires ou tertiaires |
| R5 | Les sections doivent être séparées par de **l'espace**, pas des lignes |

### 5.2 Couleurs en pratique

| # | Règle |
|---|---|
| R6 | Utiliser UNIQUEMENT les tokens définis dans `[04]` |
| R7 | Jamais de valeurs hexadécimales arbitraires dans les composants |
| R8 | La couleur ne doit jamais être le **SEUL** indicateur d'état — toujours accompagner d'icône ou texte |
| R9 | Vérifier le contraste : texte corps ≥ 4.5:1, titres ≥ 3:1 |
| R10 | Limiter à **3 couleurs max** par écran (primaire + neutre + statut) |

### 5.3 Composants UI — règles par composant

#### Boutons

```
Primaire   → fond --color-interactive | texte blanc | --radius-button
Secondaire → fond transparent | bordure --color-border-strong | texte --color-interactive
Tertiaire  → fond transparent | pas de bordure | texte --color-interactive
Taille min → 44×44dp (mobile) | padding: --spacing-button-x/y
Disabled   → opacity: 0.4 | cursor: not-allowed
```

#### Inputs

```
Hauteur min    → 48dp (mobile)
Focus ring     → 2px solid --color-border-focus | offset: 2px
Label          → toujours visible (pas de placeholder seul comme label)
État erreur    → bordure --color-error-border + texte --color-error-text sous le champ
État succès    → bordure --color-success-border (après validation)
```

#### Cartes

```
Fond     → --color-surface
Shadow   → --shadow-md
Radius   → --radius-card
Padding  → --spacing-card-padding
Hover    → --shadow-lg + translateY(-2px) + --transition-fast
```

#### Navigation

```
Bottom nav (mobile)  → 5 items max | icône + label | zone tactile 48dp
Top nav (desktop)    → hauteur 64px | logo gauche | actions droite
Active state         → --color-interactive | --font-semibold
```

#### Modales & Bottom sheets

```
Overlay        → background: rgba(0,0,0,0.5) | blur(4px) optionnel
Bottom sheet   → radius top --radius-bottom-sheet | --shadow-xl
Fermeture      → toujours proposer X ou swipe down
Scroll         → contenu scrollable si contenu > 80vh
```

### 5.4 Iconographie

| # | Règle |
|---|---|
| R11 | Utiliser **une seule famille** d'icônes (Material Symbols / Lucide / Remix) |
| R12 | Taille : 20dp (inline) · 24dp (navigation) · 32dp (illustratif) |
| R13 | Jamais d'icône seule sans label si l'action n'est pas universelle |
| R14 | Stroke width cohérent dans toute l'app (1.5px ou 2px — jamais mixte) |

### 5.5 Images & médias

| # | Règle |
|---|---|
| R15 | Toujours définir les dimensions (pas de layout shift) |
| R16 | Skeleton loader pendant le chargement (pas de spinner seul) |
| R17 | Format WebP ou AVIF · max 200kb pour mobile |
| R18 | Alt text obligatoire sur toutes les images |

---

## 06 — Règles UX

> **Source :** 10 Heuristiques Nielsen · Google PAIR Guidebook · Laws of UX

### 6.1 Les 10 heuristiques de Nielsen

| # | Heuristique | Règle |
|---|---|---|
| H1 | **Visibilité du statut** | Feedback visuel immédiat ≤ 100ms. Indicateur si traitement > 1s |
| H2 | **Correspondance monde réel** | Vocabulaire utilisateur, pas développeur. Ex: "Commandes" pas "Transactions" |
| H3 | **Contrôle et liberté** | Annuler et revenir toujours disponible. Confirmation avant irréversible |
| H4 | **Cohérence et standards** | Mêmes termes/icônes/couleurs pour mêmes concepts. Partout dans l'app |
| H5 | **Prévention des erreurs** | Désactiver > laisser échouer. Validation inline. Contraintes affichées avant soumission |
| H6 | **Reconnaissance plutôt que mémorisation** | Options visibles. Historique, suggestions, auto-complétion. Labels sur nav |
| H7 | **Flexibilité et efficacité** | Raccourcis (swipe, long press). Éviter flows longs pour tâches répétitives |
| H8 | **Design minimaliste** | Chaque élément doit avoir une raison d'être. Max 5 éléments principaux/écran |
| H9 | **Aide à récupérer les erreurs** | Messages en langage humain. Indiquer PRÉCISÉMENT quel champ. Proposer une solution |
| H10 | **Aide et documentation** | Aide accessible sans quitter le flux. Tooltips, onboarding contextuel |

### 6.2 Lois UX essentielles

| Loi | Principe | Application |
|---|---|---|
| **Fitts** | Cibles importantes = grandes et proches | CTA primaire en bas de l'écran (zone pouce) |
| **Hick** | Plus de choix = décision plus lente | Max 5-7 options dans un menu |
| **Miller** | Mémoire court terme = 7 (±2) éléments | Découper formulaires longs en étapes |
| **Jakob** | Utilisateurs viennent d'autres apps | Respecter conventions iOS/Android |
| **Zeigarnik** | Tâches incomplètes restent en mémoire | Barre de progression sur onboardings |

### 6.3 Règles flows utilisateurs

| # | Règle |
|---|---|
| F1 | Chaque écran doit avoir **UN objectif clair** |
| F2 | Un flow de tâche core ne dépasse pas **5 étapes** |
| F3 | Toujours afficher la progression dans un flow multi-étapes |
| F4 | Les erreurs ne doivent **pas réinitialiser** les données saisies |
| F5 | Proposer des valeurs par défaut intelligentes (pré-remplissage) |

---

## 07 — Règles d'ergonomie

> **Source :** Material Design 3 · Apple HIG · ISO 9241-11 · Principes PAIR

### 7.1 Ergonomie mobile (prioritaire)

| Zone | Règle |
|---|---|
| **Zone pouce** | Actions primaires dans la zone basse (60-80% bas de l'écran) |
| **Zone difficile** | Éviter actions critiques dans le coin supérieur gauche |
| **Touch targets** | Minimum 44×44dp, idéalement 48×48dp avec espace entre cibles |
| **One-hand use** | L'app doit pouvoir se naviguer **d'une seule main** |
| **Swipe** | Swipe gauche/droite pour navigation contextuelle — jamais pour action destructive |
| **Long press** | Actions secondaires — max 3 options dans le menu contextuel |

### 7.2 Ergonomie cognitive

**Charge cognitive :**
- Max 3 informations nouvelles à la fois dans un onboarding
- Regrouper les informations liées visuellement (loi de Gestalt)
- Utiliser des séparateurs d'espace, pas des lignes

**Lecture :**
- Longueur de ligne : **45-75 caractères** (corps de texte)
- Interligne : **1.5-1.6** pour le corps, **1.2** pour les titres
- Pas de texte centré pour de longs paragraphes
- Texte sur fond sombre : poids minimum `--font-medium`

**Formulaires :**
- Questions dans l'ordre logique (général → spécifique)
- Champs optionnels clairement marqués `(optionnel)`
- Clavier adapté au type de champ (numérique, email, téléphone)
- Pas plus de **7 champs** par étape

### 7.3 Ergonomie des états

> ⚠️ **Un composant sans état DISABLED et ERROR défini est INCOMPLET.**

Chaque composant interactif doit avoir **5 états** documentés :

| État | Description |
|---|---|
| `DEFAULT` | État au repos |
| `HOVER` | Survol souris / focus clavier |
| `ACTIVE` | Pendant l'appui |
| `DISABLED` | Non disponible |
| `ERROR` | État invalide |

### 7.4 Ergonomie des feedbacks

**Temps de réponse :**

| Délai | Comportement attendu |
|---|---|
| **< 100ms** | Feedback instantané (hover, appui) — aucun indicateur nécessaire |
| **< 1 sec** | Pas d'indicateur nécessaire |
| **1 – 3 sec** | Spinner ou progress bar |
| **> 3 sec** | Progress bar + message + possibilité d'annuler |
| **> 10 sec** | Notification asynchrone (l'utilisateur peut quitter et revenir) |

**Types de feedback :**

| Type | Usage | Durée |
|---|---|---|
| **Toast / Snackbar** | Confirmation actions légères (non bloquant) | 3-4s |
| **Dialog** | Confirmation actions critiques (bloquant) | Jusqu'à validation |
| **Inline validation** | Erreurs de formulaire | Immédiat au blur |
| **Vibration** | Erreur critique, confirmation paiement | Court (100ms) |

---

## 08 — Patterns de Prompt Augmentation

> **Source :** Jakob Nielsen — *"Prompt Augmentation: UX Design Patterns for Better AI Prompting"* (2025)
> Ces patterns s'appliquent quand l'app **intègre de l'IA**.

---

### Pattern 1 — Style Galleries

**QUOI :** Montrer des exemples visuels de styles pour que l'utilisateur choisisse plutôt que de décrire en mots.

**QUAND :** Génération d'images, choix de templates, configuration de rapports.

**Règle UX :** Grille de 4-6 prévisualisations cliquables avant génération.

---

### Pattern 2 — Prompt Rewrite *(Réécriture automatique)*

**QUOI :** L'IA améliore automatiquement le prompt de l'utilisateur.

**QUAND :** Recherche avancée, génération de contenu, filtres complexes.

**Règle UX :** Toujours montrer le prompt réécrit à l'utilisateur **AVANT** d'exécuter. Permettre de valider / modifier / rejeter.

---

### Pattern 3 — Targeted Prompt Rewrite

**QUOI :** L'utilisateur indique **UNE direction** de modification ("rendre plus formel").

**QUAND :** Édition de texte, personnalisation de communications.

**Règle UX :** Proposer 3-5 directions prédéfinies + champ "autre".

---

### Pattern 4 — Related Prompts *(Suggestions connexes)*

**QUOI :** Proposer des actions/questions suivantes probables.

**QUAND :** Après chaque résultat IA, après une recherche, fin de flow.

**Exemple :** *"Vous pourriez aussi vouloir : [Voir commandes similaires] [Exporter]"*

**Règle UX :** Max 3-4 suggestions, toujours en bas du résultat.

---

### Pattern 5 — Prompt Builders *(Constructeurs de requêtes)*

**QUOI :** Interface visuelle (dropdowns, chips) pour construire des requêtes/filtres.

**QUAND :** Recherche avancée, rapports, filtres multi-critères.

**Règle UX :** Max 4 options par dropdown. Résultat mis à jour **en temps réel**.

---

### Pattern 6 — Parametrization *(Curseurs et contrôles)*

**QUOI :** Sliders ou boutons pour régler des paramètres continus.

**QUAND :** Personnalisation, configuration, ton de communication.

**Règle UX :** Toujours libeller les extrémités en termes utilisateur.

```
✅ [Informel ←————————→ Professionnel]
❌ [0 ←———————→ 10]
```

---

## 09 — Principes PAIR Google

> **Source :** Google People + AI Research — [pair.withgoogle.com/guidebook](https://pair.withgoogle.com/guidebook)
> Ces principes s'appliquent pour **tout composant ou flow incluant de l'IA**.

| # | Principe | Application |
|---|---|---|
| **P1** | **Définir l'objectif avant tout** | Clarifier CE QUE l'IA fait, pour QUI, et dans QUEL contexte d'usage |
| **P2** | **Gérer l'incertitude de l'IA** | Afficher le niveau de confiance. "Probablement disponible" vs "Disponible" |
| **P3** | **Concevoir pour l'apprentissage** | Exemples de prompts dès l'onboarding. Mémoriser les préférences utilisateur |
| **P4** | **Maintenir confiance et transparence** | Expliquer pourquoi l'IA propose quelque chose. Afficher la source si pertinent |
| **P5** | **Préserver l'autonomie utilisateur** | L'IA assiste, elle ne remplace pas. Toujours laisser l'option de ne pas suivre |
| **P6** | **Feedback bidirectionnel** | Permettre de noter, corriger ou rejeter. Pouces haut/bas, "Pas utile" |
| **P7** | **Conception inclusive** | Tester avec faible littératie tech. Onboarding progressif — présenter l'IA en douceur |

---

## 10 — Checklist de cohérence

> À utiliser après **chaque génération** de composant ou d'écran par l'IA.

### Tokens

- [ ] Toutes les couleurs utilisent des tokens de la section `[04]`
- [ ] Aucune valeur hexadécimale arbitraire dans le code
- [ ] Les espacements respectent l'échelle en 4px
- [ ] La typographie utilise les tailles définies dans `--text-*`
- [ ] Les rayons de bordure correspondent aux tokens `--radius-*`

### Accessibilité

- [ ] Contraste texte/fond ≥ 4.5:1 (corps) ou ≥ 3:1 (titres)
- [ ] Taille minimale des zones tactiles ≥ 44×44dp
- [ ] Alt text sur toutes les images
- [ ] La couleur n'est jamais le seul indicateur d'état
- [ ] Labels visibles sur tous les inputs

### UX

- [ ] 1 seul CTA primaire par écran
- [ ] Chaque composant interactif a ses 5 états (default / hover / active / disabled / error)
- [ ] Feedback visuel sur chaque action (≤ 100ms)
- [ ] Messages d'erreur en langage humain avec solution proposée
- [ ] Retour en arrière possible depuis chaque écran

### Ergonomie mobile

- [ ] CTA principal dans la zone basse (zone pouce)
- [ ] Navigation utilisable d'une seule main
- [ ] Pas d'animations > 400ms
- [ ] Images compressées et dimensions définies
- [ ] Clavier adapté au type d'input (numpad, email, etc.)

### Cohérence globale

- [ ] Même iconographie dans toute l'app (une seule famille)
- [ ] Terminologie cohérente (même mot pour même concept)
- [ ] Style d'illustration cohérent
- [ ] Comportement des composants similaires identique d'un écran à l'autre

---

## 11 — Comment modifier ce module

> **RÈGLE D'OR :** Un seul fichier, une seule source de vérité.
> Toujours incrémenter la version en haut du fichier après modification.

### Ce qui peut être modifié librement

| Section | Quand modifier |
|---|---|
| `[01]` Contexte | Dès que le contexte évolue (nouveau marché, nouvelle plateforme) |
| `[02]` Personas | Après chaque session de recherche utilisateur |
| `[03]` Besoins | Au fil du développement produit |

### Ce qui nécessite une décision d'équipe

| Section | Pourquoi |
|---|---|
| `[04]` Tokens — couleur primaire | Implique de regénérer TOUTES les teintes |
| `[04]` Tokens — ratio typographique | Implique de revalider tous les écrans |
| `[04]` Tokens — base espacement (4px) | Implique un refactoring complet |

**Procédure :**
1. Modifier les tokens
2. Regénérer les tokens sémantiques
3. Tester le contraste
4. Mettre à jour le CHANGELOG

### Ce qui ne doit pas être modifié sans justification forte

> Les sections `[05]`, `[06]`, `[07]` sont basées sur **40+ ans de recherche UX**.
> Une exception doit être documentée avec sa justification.

```
EXCEPTION VALIDÉE — [Règle X] : [Justification claire]
```

---

### Comment utiliser ce fichier avec une IA

#### Méthode 1 — Contexte total *(recommandé pour nouvelle conversation)*

> Coller l'intégralité de ce fichier en début de conversation puis ajouter :

```
Ce document est la source de vérité UX/UI de mon projet.
Respecte TOUS les tokens et règles définis pour toute génération.
```

#### Méthode 2 — Sections ciblées *(efficace pour conversations longues)*

| Tâche | Sections à coller |
|---|---|
| Nouveau composant | `[04]` Tokens + `[05]` Règles UI + `[07]` Ergonomie |
| Nouveau flow | `[02]` Personas + `[03]` Besoins + `[06]` Règles UX |
| Avec IA intégrée | `[08]` Prompt Augmentation + `[09]` PAIR |
| Audit de cohérence | `[10]` Checklist |

#### Méthode 3 — System prompt permanent

> Intégrer ce fichier dans le system prompt de ton assistant IA dédié.
> Idéal pour **Claude Projects**, Custom GPTs, ou assistant configuré.

#### Structure de prompt recommandée

```
[CONTEXTE]    Je travaille sur [NOM PROJET], une [TYPE APP] pour le marché
              [MARCHÉ]. Voici mes tokens et règles UX :
              --- [COLLER SECTIONS PERTINENTES] ---

[PERSONA]     L'écran cible le Persona [N] : [DESCRIPTION COURTE]

[OBJECTIF]    Je veux créer [NOM COMPOSANT/ÉCRAN].

[CONTRAINTES] Framework [Flutter/React/etc.] | [Contrainte spécifique]

[FORMAT]      Génère [code Dart/JSX/HTML] + commentaires avec les tokens utilisés
```

---

### Guide de versioning

| Type de changement | Exemple |
|---|---|
| **Majeur** (1.0 → 2.0) | Changement couleur primaire, refonte totale |
| **Mineur** (1.0 → 1.1) | Ajout de personas, nouveaux composants |
| **Patch** (1.0 → 1.0.1) | Corrections, clarifications, règles mineures |

---

### Changelog

```
v1.0 — 2026-03-03 : Création initiale du module.
                    Sections : Contexte, Personas, Besoins, Tokens,
                    Règles UI/UX/Ergonomie, PAIR, Prompt Augmentation,
                    Checklist, Guide de modification.

v1.1 — 2026-03-03 : Remplissage des sections Contexte (01), Personas (02),
                    Besoins (03) à partir de l'Offre Technique Bloomfield Terminal.
                    4 personas définis, 6 modules fonctionnels, contraintes
                    desktop-first adaptées au contexte professionnel.
```

---

*Sources : [pair.withgoogle.com/guidebook](https://pair.withgoogle.com/guidebook) · [jakobnielsenphd.substack.com](https://jakobnielsenphd.substack.com) · [0xminds.com](https://0xminds.com/blog/guides/ai-design-system-prompts-tokens-guide) · [interaction-design.org](https://www.interaction-design.org) · [lawsofux.com](https://lawsofux.com)*
