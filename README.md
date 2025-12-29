# Go Study Board

Application web interactive pour l'étude et l'apprentissage du jeu de Go, développée avec React et Vite.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## Aperçu

Go Study Board est un outil d'apprentissage interactif permettant d'explorer les concepts du jeu de Go, notamment le calcul des libertés et l'analyse de positions. L'interface moderne offre un thème clair et sombre pour une expérience confortable.

## Fonctionnalités

- **Plateau de Go 9x9** avec points d'étoile (hoshi) traditionnels
- **Placement/suppression de pierres** par simple clic sur les intersections
- **Sélection de couleur** (noir/blanc) avec indicateur visuel
- **Calcul des libertés** en temps réel pour chaque groupe de pierres
- **Thème clair/sombre** avec persistance des préférences
- **Interface élégante** inspirée du design traditionnel du Go

## Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Démarrage rapide

```bash
# Cloner le dépôt
git clone <repository-url>
cd go-study-board

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Commandes disponibles

```bash
npm run dev          # Serveur de développement avec HMR
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Vérification du code
```

## Utilisation

### Placer des pierres

1. Cliquez sur le bouton **"Couleur"** pour alterner entre noir et blanc
2. Cliquez sur une **intersection vide** pour placer une pierre
3. Cliquez sur une **pierre existante** pour la retirer
4. Utilisez le bouton **"Effacer"** pour réinitialiser le plateau

### Analyser les libertés

1. Cliquez sur le bouton **"Libertés"** en bas du plateau
2. Le nombre de libertés s'affiche sur chaque pierre
3. Les libertés sont calculées pour chaque groupe connecté

### Changer de thème

1. Cliquez sur l'icône **☾** (lune) en haut à droite pour le mode sombre
2. Cliquez sur l'icône **☀** (soleil) pour revenir au mode clair
3. Votre préférence est sauvegardée automatiquement

## Documentation technique

Ce projet utilise une architecture modulaire avec des composants React et CSS Modules. Pour en savoir plus :

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Documentation complète de l'architecture
  - Structure des composants
  - Flux de données
  - Algorithme de calcul des libertés
  - Système de thème avec CSS Variables
  - Choix de conception et patterns utilisés

- **[CSS_MODULES_GUIDE.md](CSS_MODULES_GUIDE.md)** - Guide des CSS Modules
  - Différences avec le CSS classique
  - Scoping automatique
  - Conventions de nommage
  - Exemples pratiques du projet

## Stack technologique

- **React 19.2.0** - Framework UI avec hooks
- **Vite 7.2.4** - Build tool moderne avec HMR
- **CSS Modules** - Styles scopés automatiquement
- **CSS Custom Properties** - Système de thème dynamique

## Extensibilité

L'architecture modulaire facilite l'ajout de nouvelles fonctionnalités :

- **Taille du plateau** : Prévu pour supporter 9x9, 13x13, 19x19
- **Règles avancées** : Captures, ko, comptage de territoire
- **Modes d'étude** : Problèmes tsumego, joseki, fuseki
- **Import/Export** : SGF, positions
- **Multijoueur** : Parties en ligne

## Ressources sur le jeu de Go

- [Règles du Go](https://fr.wikipedia.org/wiki/R%C3%A8gles_du_go) - Introduction sur Wikipedia
- [Libertés et captures](https://www.jeudego.org/regles/regles.htm) - Règles détaillées
- [Fédération Française de Go](https://ffg.jeudego.org/) - Site officiel FFG

## Contribution

Les contributions sont les bienvenues ! Consultez [ARCHITECTURE.md](ARCHITECTURE.md) pour comprendre la structure du projet.

## Licence

MIT

## Auteur

Développé avec React et Vite pour l'apprentissage et l'étude du jeu de Go.
