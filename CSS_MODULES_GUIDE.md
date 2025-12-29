# Guide CSS Modules

## Introduction

Ce document explique comment fonctionnent les CSS Modules par rapport au CSS classique, et pourquoi ils sont utilisés dans ce projet.

---

## CSS Classique - Portée globale

### Problème du CSS traditionnel

```css
/* Stone.css */
.stone {
  width: 44px;
  background: black;
}

.black {
  background: black;
}
```

```jsx
/* Stone.jsx */
import './Stone.css'

function Stone() {
  return <div className="stone black">Pierre</div>
}
```

**Le problème** :
- ❌ Les classes `.stone` et `.black` sont **globales** dans toute l'application
- ❌ Si un autre fichier définit `.black`, il y a **conflit** et écrasement
- ❌ Impossible de savoir quel CSS est utilisé par quel composant
- ❌ Difficile de supprimer du CSS sans casser autre chose

---

## CSS Modules - Portée locale

### Comment ça fonctionne

```css
/* Stone.module.css */
.stone {
  width: 44px;
  background: black;
}

.black {
  background: black;
}
```

```jsx
/* Stone.jsx */
import styles from './Stone.module.css'

function Stone() {
  return <div className={styles.stone + ' ' + styles.black}>Pierre</div>
  // ou
  return <div className={`${styles.stone} ${styles.black}`}>Pierre</div>
}
```

**Ce qui se passe dans le navigateur** :

```html
<!-- Au lieu de : -->
<div class="stone black">Pierre</div>

<!-- Vous obtenez : -->
<div class="Stone_stone__a3b2c Stone_black__x9z1k">Pierre</div>
```

### Mécanisme de transformation

1. **À la compilation** (via Vite) :
   - Vite lit `Stone.module.css`
   - Génère un hash unique pour chaque classe : `.stone` → `.Stone_stone__a3b2c`
   - Crée un objet JavaScript :
   ```javascript
   styles = {
     stone: 'Stone_stone__a3b2c',
     black: 'Stone_black__x9z1k',
     white: 'Stone_white__p7q4m'
   }
   ```

2. **Dans votre code JSX** :
   - `styles.stone` retourne la chaîne `"Stone_stone__a3b2c"`
   - React ajoute cette classe unique au DOM

3. **Dans le CSS final généré** :
   ```css
   .Stone_stone__a3b2c {
     width: 44px;
     background: black;
   }

   .Stone_black__x9z1k {
     background: black;
   }
   ```

---

## Comparaison directe

### Exemple concret avec le projet Go Study Board

**AVANT (CSS classique)** :
```css
/* Stone.css */
.stone { width: 44px; }
.black { background: black; }
```

```jsx
<div className="stone black">  ← Classes globales
```

**Problème** : Si vous avez aussi un fichier `Board.css` avec `.black`, il y a conflit !

---

**APRÈS (CSS Modules)** :
```css
/* Stone.module.css */
.stone { width: 44px; }
.black { background: black; }
```

```jsx
<div className={`${styles.stone} ${styles.black}`}>  ← Classes locales
```

**Rendu HTML réel** :
```html
<div class="Stone_stone__2jK9L Stone_black__1mP3N">
```

**Avantage** : Même si `Board.module.css` a aussi `.black`, pas de conflit car :
- Stone : `.black` → `Stone_black__1mP3N`
- Board : `.black` → `Board_black__7qR8M`

---

## Conventions et différences

### 1. Noms de fichiers
- CSS classique : `Component.css`
- CSS Modules : `Component.module.css` ⚠️ Le `.module` est **obligatoire**

### 2. Imports
```jsx
// CSS classique - effet de bord
import './Stone.css'  // Classes dispo globalement

// CSS Modules - import nommé
import styles from './Stone.module.css'  // Objet local
```

### 3. Utilisation des classes
```jsx
// CSS classique
<div className="stone black">

// CSS Modules
<div className={styles.stone}>
<div className={`${styles.stone} ${styles.black}`}>
```

### 4. Classes dynamiques
```jsx
// CSS classique
<div className={`stone ${isActive ? 'active' : ''}`}>

// CSS Modules
<div className={`${styles.stone} ${isActive ? styles.active : ''}`}>
```

### 5. Composition avec d'autres classes
```jsx
// Exemple dans ControlsTop.jsx
<span className={`${styles.colorIndicator} ${styles[currentColor]}`}>
```

Ici :
- `styles.colorIndicator` → `"Controls_colorIndicator__3kL9M"`
- `styles[currentColor]` → Si `currentColor === 'black'`, retourne `"Controls_black__7nQ2P"`

---

## Cas particuliers

### Classes composées (comme `.stone.black`)

```css
/* ❌ NE FONCTIONNE PAS avec CSS Modules */
.stone.black {
  background: black;
}
```

**Solution** : Séparer ou utiliser des sélecteurs descendants

```css
/* ✅ Option 1 : Séparer */
.black {
  background: black;
}

/* ✅ Option 2 : Descendant (fonctionne) */
.black .libertiesCount {
  color: white;
}
```

### Pseudo-classes et pseudo-éléments

```css
/* ✅ Fonctionne normalement */
.intersection:hover::after {
  background: white;
}

.starPoint::before {
  content: '';
}
```

### Classes globales (si vraiment nécessaire)

```css
/* Pour forcer une classe globale */
:global(.my-global-class) {
  color: red;
}
```

---

## Résumé visuel

```
CSS CLASSIQUE                    CSS MODULES
================                 ============

Component.css                    Component.module.css
     ↓                                 ↓
.myClass { }                     .myClass { }
     ↓                                 ↓
import './file.css'              import styles from './file.module.css'
     ↓                                 ↓
className="myClass"              className={styles.myClass}
     ↓                                 ↓
<div class="myClass">            <div class="Component_myClass__a1b2c">
     ↓                                 ↓
GLOBAL SCOPE                     LOCAL SCOPE (scoped)
⚠️ Conflits possibles            ✅ Pas de conflits
```

---

## Pourquoi CSS Modules dans ce projet

Dans l'application Go Study Board, CSS Modules nous protègent de :

1. **Conflit de `.black` et `.white`** : Utilisés dans Stone ET Controls
2. **Conflit de `.line`** : Pourrait être réutilisé ailleurs
3. **Suppression sûre** : Si vous supprimez Stone.jsx + Stone.module.css, aucun autre composant n'est affecté
4. **Refactoring confiant** : Renommer `.stone` en `.piece` dans Stone.module.css n'affecte que Stone.jsx

---

## Convention de nommage : camelCase

Avec CSS Modules, on utilise **camelCase** pour les noms de classes :

```css
/* ✅ Recommandé avec CSS Modules */
.goBoardContainer { }
.colorIndicator { }
.libertiesCount { }
.starPoint { }

/* ❌ Éviter kebab-case */
.go-board-container { }
.color-indicator { }
```

**Pourquoi ?** Plus facile à utiliser en JavaScript :

```jsx
// camelCase - accès direct
className={styles.goBoardContainer}

// kebab-case - nécessite crochets
className={styles['go-board-container']}
```

---

## Exemples du projet

### Stone.jsx
```jsx
import styles from './Stone.module.css'

const Stone = ({ color, showLibertiesCount, libertiesCount }) => {
  return (
    <div className={`${styles.stone} ${styles[color]}`}>
      {showLibertiesCount && (
        <span className={styles.libertiesCount}>
          {libertiesCount}
        </span>
      )}
    </div>
  )
}
```

### ControlsTop.jsx
```jsx
import styles from './Controls.module.css'

const ControlsTop = ({ currentColor, onToggleColor, onClearBoard }) => {
  return (
    <div className={styles.topControls}>
      <button onClick={onToggleColor} className={styles.colorToggle}>
        Couleur:
        <span className={`${styles.colorIndicator} ${styles[currentColor]}`}>
        </span>
      </button>
      <button onClick={onClearBoard}>
        Effacer
      </button>
    </div>
  )
}
```

---

## Conclusion

**CSS Modules = CSS avec scoping automatique**

Comme des variables locales vs globales en JavaScript !

✅ **Avantages** :
- Pas de conflits de noms
- Suppression/refactoring sûr
- Meilleure maintenabilité
- Encapsulation par composant

❌ **Inconvénients** :
- Syntaxe légèrement plus verbeuse
- Nécessite de penser en "modules"

**Verdict** : Pour un projet React moderne, CSS Modules est la meilleure pratique ! 🎯
