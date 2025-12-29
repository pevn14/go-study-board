# Architecture du Projet Go Study Board

## Vue d'ensemble

Application React + Vite pour l'étude du jeu de Go, permettant de placer des pierres sur un plateau 9x9 et d'analyser les degrés de liberté.

## Structure des fichiers

```
go-study-board/
├── src/
│   ├── components/
│   │   ├── GoBoard.jsx          # Composant principal du plateau
│   │   └── GoBoard.css          # Styles du plateau
│   ├── App.jsx                  # Composant racine
│   ├── App.css                  # Styles de l'application
│   ├── index.css                # Styles globaux
│   └── main.jsx                 # Point d'entrée
├── public/
├── package.json
└── vite.config.js
```

## Composants React

### 1. App (App.jsx)

**Rôle**: Composant racine de l'application

**Structure**:
- Titre "Go Study Board"
- Instructions d'utilisation
- Composant GoBoard

**Props**: Aucune

**État**: Aucun (composant sans état)

---

### 2. GoBoard (components/GoBoard.jsx)

**Rôle**: Composant principal gérant le plateau de Go et toute la logique de jeu

**Props**:
- `size` (number, défaut: 9): Dimensions du plateau (9x9)

**État (useState)**:
- `board`: Tableau 2D représentant l'état du plateau
  - Structure: `Array(9).fill(null).map(() => Array(9).fill(null))`
  - Valeurs possibles par case: `null`, `'black'`, `'white'`

- `currentColor`: Couleur actuellement sélectionnée
  - Type: `'black' | 'white'`
  - Défaut: `'black'`

- `showLibertiesMode`: Active/désactive l'affichage des libertés
  - Type: `boolean`
  - Défaut: `false`

**Fonctions principales**:

1. `calculateLiberties(row, col)`
   - Calcule les degrés de liberté d'un groupe de pierres
   - Utilise un algorithme de recherche en profondeur (DFS)
   - Retourne: `number` (nombre de libertés)
   - Logique:
     - Trouve tous les membres du groupe connecté (même couleur, adjacents)
     - Compte les intersections vides adjacentes au groupe
     - Utilise un Set pour éviter les doublons

2. `handleIntersectionClick(row, col, event)`
   - Gère les clics sur les intersections
   - Si vide: place une pierre de la couleur actuelle
   - Si occupée: supprime la pierre

3. `toggleColor()`
   - Alterne entre noir et blanc

4. `clearBoard()`
   - Réinitialise le plateau (toutes les cases à `null`)

5. `toggleLibertiesMode()`
   - Active/désactive l'affichage des libertés

**Rendu**:
- Barre de contrôle (boutons Couleur et Effacer)
- Plateau de jeu avec:
  - 9 lignes horizontales
  - 9 lignes verticales
  - 81 intersections (9x9)
  - Pierres avec nombres de libertés (si mode actif)
  - 5 points d'étoile (hoshi) aux positions:
    - (2,2), (2,6), (6,2), (6,6), (4,4)
- Bouton Libertés sous le plateau

## Styles CSS

### GoBoard.css

**Classes principales**:

- `.go-board-container`: Container principal
- `.controls`: Barre de boutons en haut
- `.controls button`: Style de base des boutons (discret, transparent)
- `.color-indicator`: Cercle représentant la couleur sélectionnée
- `.liberties-control`: Container du bouton Libertés
- `.liberties-toggle`: Style du bouton Libertés
- `.go-board-wrapper`: Wrapper du plateau avec fond bois
- `.go-board`: Plateau de jeu (480x480px)
- `.line`: Lignes du plateau (horizontales et verticales)
- `.intersection`: Points d'intersection (24x24px)
- `.star-point`: Points d'étoile (hoshi)
- `.stone`: Pierres de Go (44x44px)
- `.liberties-count`: Nombre de libertés affiché sur les pierres

**Palette de couleurs**:
- Plateau: `#d4a574` (ton bois clair)
- Lignes: `#5a4a3a` (brun doux)
- Fond: dégradé `#f8f6f4` → `#ebe8e3`
- Boutons: gris doux `#666` avec bordure `#d0d0d0`

### App.css

**Classes**:
- `.App`: Container principal centré
- `.App h1`: Titre avec couleur `#4a4a4a`
- `.instructions`: Texte d'instructions en gris clair

### index.css

**Styles globaux**:
- Fond dégradé beige/crème
- Police: system-ui, Avenir, Helvetica, Arial
- Couleur texte: `#3a3a3a`

## Algorithme des libertés

### Principe

Le calcul des libertés utilise une recherche en profondeur (DFS) pour:
1. Identifier tous les membres d'un groupe connecté
2. Compter les intersections vides adjacentes

### Étapes

1. **Identification du groupe**:
   - Départ: pierre cliquée
   - Recherche récursive des pierres adjacentes de même couleur
   - Utilise un Set pour éviter de revisiter les pierres

2. **Comptage des libertés**:
   - Pour chaque pierre du groupe
   - Vérifie les 4 directions (haut, bas, gauche, droite)
   - Compte les intersections vides
   - Utilise un Set pour éviter de compter deux fois la même liberté

### Complexité

- Temps: O(n) où n = nombre de pierres dans le groupe
- Espace: O(n) pour les Sets de visite et libertés

## Technologies utilisées

- **React 18**: Framework UI avec hooks (useState)
- **Vite**: Build tool et dev server
- **CSS3**: Styles avec variables CSS, gradients, flexbox

## Fonctionnalités

### Principales
- Placement/suppression de pierres par clic
- Sélection de la couleur (noir/blanc)
- Effacement du plateau
- Calcul et affichage des degrés de liberté

### Interface
- Plateau 9x9 avec pierres sur les intersections
- Points d'étoile (hoshi) aux positions standard
- Design doux et apaisant
- Boutons discrets et élégants

## Points techniques

### Gestion des événements
- `onClick`: Placement/suppression des pierres
- `onContextMenu`: Désactivé (même comportement que onClick)
- `pointer-events: none` sur les pierres pour que les clics passent aux intersections

### Positionnement
- Lignes: positionnement absolu avec pourcentages
- Intersections: positionnement absolu avec `transform: translate(-50%, -50%)`
- Pierres: centrées dans les intersections

### Performance
- Recalcul des libertés uniquement quand le mode est actif
- Utilisation de Sets pour optimiser les recherches
- Clés React optimisées (`${row}-${col}`)
