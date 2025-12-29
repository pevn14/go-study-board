# Architecture du Projet Go Study Board

## Vue d'ensemble

Application React + Vite pour l'étude du jeu de Go, permettant de placer des pierres sur un plateau 9x9 et d'analyser les degrés de liberté.

## Structure des fichiers

```
go-study-board/
├── src/
│   ├── components/
│   │   ├── GoBoard.jsx             # Orchestrateur principal
│   │   ├── GoBoard.module.css      # Styles du conteneur (CSS Modules)
│   │   ├── Board.jsx               # Plateau avec lignes et intersections
│   │   ├── Board.module.css        # Styles du plateau (CSS Modules)
│   │   ├── Intersection.jsx        # Point cliquable du plateau
│   │   ├── Intersection.module.css # Styles des intersections (CSS Modules)
│   │   ├── Stone.jsx               # Pierre individuelle
│   │   ├── Stone.module.css        # Styles des pierres (CSS Modules)
│   │   ├── ControlsTop.jsx         # Contrôles du haut (Couleur, Effacer)
│   │   ├── ControlsBottom.jsx      # Contrôles du bas (Libertés)
│   │   └── Controls.module.css     # Styles communs des contrôles (CSS Modules)
│   ├── utils/
│   │   └── liberties.js         # Logique de calcul des libertés
│   ├── App.jsx                  # Composant racine
│   ├── App.css                  # Styles de l'application
│   ├── index.css                # Styles globaux
│   └── main.jsx                 # Point d'entrée
├── public/
├── package.json
└── vite.config.js
```

## Architecture des composants

### Hiérarchie

```
App (gère le thème global)
├── Header
│   ├── Titre "Go Study Board"
│   └── Bouton toggle thème (☾/☀)
└── GoBoard (orchestrateur du jeu)
    ├── ControlsTop
    │   ├── Bouton toggle couleur
    │   └── Bouton effacer
    ├── Board
    │   └── Intersection (x81)
    │       └── Stone (conditionnel)
    └── ControlsBottom
        └── Bouton libertés
```

## Composants React

### 1. App (App.jsx)

**Rôle**: Composant racine de l'application, gère le thème global (mode clair/sombre)

**Structure**:
- Header avec titre "Go Study Board" et bouton de toggle thème
- Instructions d'utilisation
- Composant GoBoard

**Props**: Aucune

**État (useState)**:
- `darkMode`: Mode sombre activé/désactivé
  - Type: `boolean`
  - Défaut: Récupéré depuis `localStorage` (ou `false`)
  - Persisté dans `localStorage`

**Effets (useEffect)**:
- Applique la classe `dark-mode` sur `:root` quand `darkMode` change
- Synchronise avec `localStorage` pour persister la préférence utilisateur

**Fonctions**:
- `toggleDarkMode()`: Bascule entre mode clair et mode sombre

**Responsabilités**:
- Gestion du thème global de l'application
- Persistance des préférences utilisateur
- Structure principale de l'application

---

### 2. GoBoard (components/GoBoard.jsx)

**Rôle**: Orchestrateur principal - gère l'état global du jeu et coordonne les sous-composants

**Props**: Aucune (gère sa propre taille en interne)

**État (useState)**:
- `size`: Taille du plateau
  - Type: `number`
  - Défaut: `9` (plateau 9x9)
  - Note: Géré en interne pour faciliter l'ajout futur d'un contrôle de taille

- `board`: Tableau 2D représentant l'état du plateau
  - Structure: `Array(size).fill(null).map(() => Array(size).fill(null))`
  - Valeurs possibles par case: `null`, `'black'`, `'white'`

- `currentColor`: Couleur actuellement sélectionnée
  - Type: `'black' | 'white'`
  - Défaut: `'black'`

- `showLibertiesMode`: Active/désactive l'affichage des libertés
  - Type: `boolean`
  - Défaut: `false`

**Fonctions principales**:

1. `handleIntersectionClick(row, col)`
   - Gère les clics sur les intersections
   - Si vide: place une pierre de la couleur actuelle
   - Si occupée: supprime la pierre
   - Met à jour l'état du plateau

2. `toggleColor()`
   - Alterne entre noir et blanc

3. `clearBoard()`
   - Réinitialise le plateau (toutes les cases à `null`)

4. `toggleLibertiesMode()`
   - Active/désactive l'affichage des libertés

5. `calculateLibertiesForPosition(row, col)`
   - Wrapper pour appeler la fonction utilitaire avec le contexte du plateau

**Responsabilités**:
- Gestion de l'état global du jeu
- Coordination entre ControlsTop, Board et ControlsBottom
- Délégation de la logique métier aux utilitaires

---

### 3. ControlsTop (components/ControlsTop.jsx)

**Rôle**: Panneau de contrôles d'action affiché au-dessus du plateau

**Props**:
- `currentColor` (string): Couleur actuellement sélectionnée
- `onToggleColor` (function): Callback pour changer de couleur
- `onClearBoard` (function): Callback pour effacer le plateau

**Responsabilités**:
- Affichage des boutons d'action (Couleur, Effacer)
- Indicateur visuel de la couleur sélectionnée

---

### 4. ControlsBottom (components/ControlsBottom.jsx)

**Rôle**: Panneau de contrôles d'affichage affiché sous le plateau

**Props**:
- `showLibertiesMode` (boolean): État du mode libertés
- `onToggleLibertiesMode` (function): Callback pour activer/désactiver les libertés

**Responsabilités**:
- Affichage du bouton d'options d'affichage (Libertés)
- État visuel actif/inactif du bouton

---

### 5. Board (components/Board.jsx)

**Rôle**: Affiche le plateau de Go avec ses lignes et toutes les intersections

**Props**:
- `size` (number): Taille du plateau (9x9)
- `boardState` (Array): État du plateau (matrice 2D)
- `onIntersectionClick` (function): Callback pour les clics
- `showLibertiesMode` (boolean): Afficher les libertés
- `calculateLiberties` (function): Fonction de calcul des libertés

**Responsabilités**:
- Rendu des lignes horizontales et verticales
- Génération de la grille d'intersections
- Détermination des points d'étoile (hoshi)
- Transmission des props aux intersections

**Logique**:
- Points d'étoile pour plateau 9x9: (2,2), (2,6), (6,2), (6,6), (4,4)
- Positionnement calculé en pourcentages

---

### 6. Intersection (components/Intersection.jsx)

**Rôle**: Représente un point cliquable du plateau avec pierre optionnelle

**Props**:
- `row` (number): Position ligne
- `col` (number): Position colonne
- `stone` (string|null): Couleur de la pierre ou null
- `isStarPoint` (boolean): Si c'est un point d'étoile (hoshi)
- `onClick` (function): Callback lors du clic
- `showLibertiesMode` (boolean): Afficher les libertés
- `libertiesCount` (number): Nombre de libertés
- `size` (number): Taille du plateau

**Responsabilités**:
- Zone cliquable (24x24px)
- Affichage conditionnel du composant Stone
- Affichage du point d'étoile (hoshi)
- Effet hover visuel
- Gestion des événements onClick et onContextMenu

---

### 7. Stone (components/Stone.jsx)

**Rôle**: Affiche une pierre (noire ou blanche) avec son compte de libertés optionnel

**Props**:
- `color` ('black'|'white'): Couleur de la pierre
- `showLibertiesCount` (boolean): Afficher le nombre de libertés
- `libertiesCount` (number): Nombre de libertés à afficher

**Responsabilités**:
- Rendu visuel de la pierre (44x44px, gradient radial)
- Affichage conditionnel du compte de libertés
- Styles différenciés pour noir et blanc

---

## Utilitaires

### liberties.js (utils/liberties.js)

**Fonction**: `calculateLiberties(board, row, col, size)`

**Rôle**: Calcule les degrés de liberté d'un groupe de pierres connectées

**Paramètres**:
- `board` (Array): Matrice 2D du plateau
- `row` (number): Ligne de la pierre
- `col` (number): Colonne de la pierre
- `size` (number, défaut: 9): Taille du plateau

**Retour**: `number` - Nombre de libertés du groupe

**Algorithme** (DFS - Depth First Search):
1. **Identification du groupe**:
   - Recherche récursive des pierres adjacentes de même couleur
   - Utilise un Set `visited` pour éviter les doublons
   - Stocke toutes les pierres du groupe dans un tableau

2. **Comptage des libertés**:
   - Pour chaque pierre du groupe
   - Vérifie les 4 directions (haut, bas, gauche, droite)
   - Compte les intersections vides adjacentes
   - Utilise un Set `liberties` pour éviter de compter deux fois

**Complexité**:
- Temps: O(n) où n = nombre de pierres dans le groupe
- Espace: O(n) pour les Sets de visite et libertés

---

## Styles CSS

### Structure des styles

Les styles utilisent **CSS Modules** pour un scoping automatique :

- `GoBoard.module.css`: Container principal uniquement
- `Board.module.css`: Plateau, lignes
- `Intersection.module.css`: Intersections, points d'étoile, hover
- `Stone.module.css`: Pierres, libertés
- `Controls.module.css`: Styles communs pour ControlsTop et ControlsBottom (boutons, indicateurs)

**Avantages des CSS Modules** :
- ✅ Scoping automatique : pas de conflits de noms de classes
- ✅ Nommage unique généré automatiquement (ex: `.stone` → `.Stone_stone__a3b2c`)
- ✅ Import comme des modules JavaScript : `import styles from './Stone.module.css'`

### Système de thème avec CSS Variables

L'application utilise des **CSS Custom Properties** (variables CSS) pour gérer deux thèmes : clair et sombre.

**Variables définies dans `index.css`**:

Mode clair (`:root`):
- `--bg-gradient-start`: `#f8f6f4` (fond dégradé début)
- `--bg-gradient-end`: `#ebe8e3` (fond dégradé fin)
- `--text-color`: `#3a3a3a` (texte principal)
- `--text-secondary`: `#787878` (texte secondaire)
- `--board-color`: `#d4a574` (plateau bois)
- `--board-line-color`: `#5a4a3a` (lignes du plateau)
- `--board-shadow`: `rgba(0, 0, 0, 0.15)` (ombre plateau)
- `--button-border`: `#d0d0d0` (bordure boutons)
- `--button-border-hover`: `#b0b0b0` (bordure hover)
- `--button-text`: `#666` (texte boutons)
- `--button-text-hover`: `#444` (texte hover)

Mode sombre (`:root.dark-mode`):
- `--bg-gradient-start`: `#1a1a1a`
- `--bg-gradient-end`: `#2d2d2d`
- `--text-color`: `#e0e0e0`
- `--text-secondary`: `#a0a0a0`
- `--board-color`: `#d4a574` (identique au mode clair)
- `--board-line-color`: `#5a4a3a` (identique au mode clair)
- `--board-shadow`: `rgba(0, 0, 0, 0.4)`
- `--button-border`: `#555` (plus contrasté)
- `--button-border-hover`: `#777`
- `--button-text`: `#b0b0b0`
- `--button-text-hover`: `#e0e0e0`

**Pierres** (styles fixes, non thématisés):
- **Pierre noire**: gradient radial `#4a4a4a` → `#000`
- **Pierre blanche**: gradient radial `#fff` → `#d0d0d0`

**Transitions**: Tous les éléments thématisés ont une transition de `0.3s ease` pour un changement fluide.

### Classes principales

#### GoBoard.module.css
- `.goBoardContainer`: Container flex principal (column, centré, gap 20px)

#### Board.module.css
- `.goBoardWrapper`: Wrapper avec fond bois et ombre
- `.goBoard`: Plateau 480x480px
- `.line`: Lignes du plateau (1.2px)
- `.horizontal`: Ligne horizontale (width: 100%)
- `.vertical`: Ligne verticale (height: 100%)

#### Intersection.module.css
- `.intersection`: Point cliquable 24x24px, transform translate(-50%, -50%)
- `.intersection:hover::after`: Cercle blanc semi-transparent
- `.starPoint::before`: Point d'étoile (hoshi) 6x6px

#### Stone.module.css
- `.stone`: Pierre 44x44px, border-radius 50%, shadow
- `.black`: Gradient radial noir (appliqué avec `.stone`)
- `.white`: Gradient radial blanc (appliqué avec `.stone`)
- `.libertiesCount`: Texte 11px, bold, centré
- `.stone.black .libertiesCount`: Blanc avec text-shadow
- `.stone.white .libertiesCount`: Noir avec text-shadow

#### Controls.module.css
**Containers**:
- `.topControls`: Container flex row, gap 15px, margin-bottom 10px
- `.bottomControls`: Container flex, centré, margin-top 15px

**Boutons communs**:
- `.topControls button`, `.bottomControls button`: Style de base (padding, bordure, couleurs, transitions)
- États `:hover` et `:focus`

**Spécifiques**:
- `.colorToggle`: Bouton toggle couleur, flex avec gap 8px
- `.colorIndicator`: Cercle 20x20px avec gradient
- `.black`: Gradient noir (pour indicateur)
- `.white`: Gradient blanc (pour indicateur)
- `.active`: État actif du bouton libertés

---

## Flux de données

### Placement d'une pierre

```
User clique sur Intersection
  ↓
Intersection.onClick() → onIntersectionClick(row, col)
  ↓
GoBoard.handleIntersectionClick(row, col)
  ↓
Met à jour board state (place ou retire pierre)
  ↓
React re-render
  ↓
Board reçoit nouveau boardState
  ↓
Intersection reçoit nouvelle valeur stone
  ↓
Stone s'affiche ou disparaît
```

### Calcul des libertés

```
Board.jsx rend Intersection
  ↓
Passe calculateLiberties et libertiesCount
  ↓
Intersection passe libertiesCount à Stone
  ↓
Stone affiche le nombre si showLibertiesCount === true
  ↓
calculateLiberties appelle utils/liberties.js
  ↓
DFS pour trouver le groupe et compter les libertés
```

---

## Points techniques

### Gestion des événements

- `onClick`: Placement/suppression des pierres
- `onContextMenu`: Même comportement que onClick (suppression du menu contextuel)
- `pointer-events: none` sur les pierres pour que les clics passent aux intersections

### Positionnement

- **Lignes**: Positionnement absolu avec pourcentages calculés
- **Intersections**: Positionnement absolu avec `transform: translate(-50%, -50%)`
- **Pierres**: Centrées dans les intersections via flexbox

### Performance

- Recalcul des libertés uniquement quand le mode est actif
- Utilisation de Sets pour optimiser les recherches (pas de doublons)
- Clés React optimisées (`${row}-${col}`)
- Immutabilité: création de nouvelles copies du board à chaque modification

### Séparation des responsabilités

- **App**: Gestion du thème global, structure de l'application
- **GoBoard**: État du jeu et coordination uniquement (taille, plateau, couleur, libertés)
- **ControlsTop**: Présentation des contrôles d'action, pas de logique métier
- **ControlsBottom**: Présentation des options d'affichage, pas de logique métier
- **Board**: Rendu du plateau, pas de gestion d'état
- **Intersection**: Gestion des événements locaux, délégation au parent
- **Stone**: Composant purement présentationnel
- **utils/liberties.js**: Logique métier pure, testable indépendamment

---

## Technologies utilisées

- **React 19.2.0**: Framework UI avec hooks (useState)
- **Vite 7.2.4**: Build tool et dev server avec HMR
- **CSS3**: Styles modulaires avec gradients, flexbox, transforms

---

## Fonctionnalités

### Principales
- **Thème clair/sombre**: Bascule entre mode jour et mode nuit avec persistance
- **Placement/suppression de pierres**: Par clic sur les intersections
- **Sélection de la couleur**: Noir/blanc avec indicateur visuel
- **Effacement du plateau**: Réinitialisation complète
- **Calcul et affichage des degrés de liberté**: Mode toggleable

### Interface
- Plateau 9x9 avec pierres sur les intersections
- Points d'étoile (hoshi) aux positions standard
- Design doux et apaisant avec thème bois
- Thème sombre élégant pour réduire la fatigue oculaire
- Boutons discrets et élégants
- Transitions fluides entre les thèmes
- Persistance des préférences utilisateur (thème)

---

## Avantages de l'architecture modulaire

### Maintenabilité
- Chaque composant a une responsabilité unique
- Facile d'identifier où apporter des modifications
- Tests unitaires simplifiés

### Réutilisabilité
- Stone peut être utilisé ailleurs dans l'app
- Intersection est générique et configurable
- ControlsTop et ControlsBottom sont indépendants et réutilisables

### Extensibilité
- **État `size` géré dans GoBoard**: Facilite l'ajout futur d'un contrôle pour changer la taille du plateau
- **Facile d'ajouter de nouveaux contrôles** dans ControlsTop ou ControlsBottom
- **Séparation claire** entre contrôles d'action (haut) et options d'affichage (bas)
- **Thème centralisé avec CSS Variables**: Facile d'ajouter de nouveaux thèmes ou couleurs
- **Logique métier isolée** dans utils/ facilite les évolutions

### Lisibilité
- Code plus court et focalisé dans chaque fichier
- Structure claire et prévisible
- Props explicites documentent les dépendances
