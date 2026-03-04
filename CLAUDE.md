# Règles de développement — Bloomfield Terminal Demo

## Règle absolue

**NE JAMAIS coder un écran, un composant ou une feature sans avoir suivi le workflow ci-dessous.**
Aucune exception. Même si la demande semble simple. Même si tu "sais déjà quoi faire".

---

## Workflow obligatoire avant chaque écran ou feature

### Étape 1 — Lire le contexte

Avant toute chose, lire les fichiers de référence du projet :

1. **`PRD-DEMO.md`** — Vérifier ce qui est dans le scope, les specs de l'écran, les données attendues
2. **`MODULE-UXUI-FONDATIONS.md`** — Vérifier les personas ciblés, les règles UX/UI, les contraintes
3. **`COMPONENTS.md`** — Vérifier les composants existants, leurs imports, leurs variants
4. **`Offre Technique Bloomfield (1).docx`** — Si besoin de détails métier (modules, fonctionnalités précises)

Ne pas se fier à la mémoire. Relire les fichiers à chaque session.

### Étape 2 — Définir le besoin

Avant de toucher au code, formuler explicitement :

- **Quel écran / composant** on va créer
- **Quel persona** il cible (1: Trader, 2: Analyste, 3: Investisseur, 4: Admin)
- **Quelles données** il affiche (et d'où elles viennent dans les données simulées)
- **Quelles interactions** sont attendues dans la démo

### Étape 3 — Lister les composants nécessaires

Avant d'écrire du JSX :

- **Composants shadcn existants** à utiliser (consulter `COMPONENTS.md`)
- **Composants custom existants** déjà créés dans le projet
- **Composants custom à créer** pour ce besoin spécifique
- **Dépendances externes** si nécessaire (ex: `lightweight-charts`)

Ne pas recréer ce qui existe. Ne pas dupliquer de logique.

### Étape 4 — Planifier la structure

Définir avant de coder :

- **Arborescence fichiers** — Où placer les nouveaux fichiers (route `app/`, composant `components/`)
- **Découpage composants** — Quels sous-composants, quelle granularité
- **Props et types** — Interfaces TypeScript des composants
- **État et données** — Sources de données (JSON statique, simulation temps réel)

### Étape 5 — Coder

Seulement maintenant, commencer à écrire le code. En respectant :

- Les tokens CSS du thème (pas de couleurs arbitraires)
- Les composants shadcn pour tout ce qui est générique
- La convention d'imports avec alias `@/`
- TypeScript strict (pas de `any`, pas de `as` sauf nécessité prouvée)

### Étape 6 — Vérifier

Après le code :

- **Types** : `pnpm exec tsc --noEmit` doit passer
- **Lint** : `pnpm lint` doit passer
- **Build** : `pnpm build` doit passer sans erreur
- **Visuel** : vérifier le rendu dans le navigateur
- **Cohérence** : les composants respectent le style des autres écrans

---

## Règles de code

### Styling
- Utiliser les CSS variables du thème (`--background`, `--foreground`, `--card`, etc.) — jamais de hex/rgb en dur
- Couleurs financières : `text-green-500` pour hausse, `text-red-500` pour baisse — utiliser des classes utilitaires cohérentes partout
- Tailwind CSS uniquement — pas de fichiers CSS custom sauf `globals.css`
- `cn()` de `@/lib/utils` pour merger les classes

### Composants
- Importer depuis `@/components/ui/` pour les composants shadcn
- Les composants custom Bloomfield vont dans `@/components/` (pas dans `ui/`)
- Un composant = un fichier. Nommer en PascalCase
- Toujours typer les props avec une interface TypeScript
- `"use client"` uniquement quand nécessaire (état, effets, event handlers)

### Données
- Données simulées dans `/data/` en fichiers JSON ou TS
- Pas de `fetch` vers des API externes
- Simulation temps réel via `setInterval` côté client uniquement
- Valeurs BRVM réalistes (vrais tickers, ordres de grandeur corrects)

### Structure des routes
```
app/
├── layout.tsx              # Layout racine (sidebar, header, providers)
├── page.tsx                # Dashboard Marchés (écran principal)
├── marches/
│   └── [ticker]/page.tsx   # Fiche Valeur détaillée
├── portefeuille/
│   └── page.tsx            # Vue Portefeuille
├── macro/
│   └── page.tsx            # Données Macroéconomiques
└── login/
    └── page.tsx            # Écran de Login
```

### Ce qu'on NE fait PAS
- Pas de backend / API routes
- Pas d'authentification réelle
- Pas de responsive mobile (desktop only, min 1280px)
- Pas d'i18n (français uniquement)
- Pas de tests unitaires (c'est une démo)
- Pas de documentation inline excessive — le code doit être lisible seul
- Pas d'over-engineering — si c'est pour la démo et qu'on n'en a pas besoin, on ne le fait pas

---

## Commandes

### Package manager : `pnpm` (v10)

Toujours utiliser `pnpm` — jamais `npm` ni `yarn`.

### Commandes courantes

| Commande | Rôle |
|---|---|
| `pnpm dev` | Lancer le serveur de développement (Next.js + Turbopack) |
| `pnpm build` | Build production — **doit passer sans erreur avant tout commit** |
| `pnpm start` | Lancer le build de production en local |
| `pnpm lint` | ESLint (config `next/core-web-vitals` + `next/typescript`) |

### Vérifications obligatoires

Après chaque écran ou changement significatif, exécuter dans cet ordre :

```bash
# 1. TypeScript — vérifier les types (strict mode)
pnpm exec tsc --noEmit

# 2. Lint — vérifier les règles ESLint
pnpm lint

# 3. Build — vérifier que tout compile
pnpm build
```

Les trois doivent passer sans erreur. Si un check échoue, corriger avant de continuer.

### Ajout de composants shadcn

```bash
# Ajouter un composant
pnpm exec shadcn@latest add [nom-composant]

# Ajouter plusieurs composants
pnpm exec shadcn@latest add -y -o composant1 composant2 composant3
```

Après ajout, mettre à jour `COMPONENTS.md` avec le nouveau composant.

### Ajout de dépendances

```bash
# Dépendance de production
pnpm add [package]

# Dépendance de développement
pnpm add -D [package]
```

### Git

```bash
# Status
git status

# Commit (ne pas commiter sauf si demandé explicitement)
git add [fichiers spécifiques]
git commit -m "message"
```

Ne jamais `git add .` ou `git add -A` sans vérifier ce qui sera inclus.
