# TODO - Évolutions possibles

Ce document liste les fonctionnalités et améliorations possibles pour le Go Study Board.

## Priorité Haute

### Taille du plateau configurable
- [ ] Ajouter un sélecteur de taille dans ControlsBottom (9x9, 13x13, 19x19)
- [ ] Utiliser l'état `size` déjà présent dans GoBoard
- [ ] Adapter dynamiquement les dimensions du plateau (actuellement fixe à 480px)
- [ ] Ajuster les positions des hoshi selon la taille
- [ ] Persister la taille dans localStorage

### Implémentation des captures
- [ ] Détecter les groupes avec 0 libertés après chaque coup
- [ ] Retirer automatiquement les pierres capturées du plateau
- [ ] Afficher un compteur de captures par couleur
- [ ] Animation lors de la capture (fade out)
- [ ] Historique des captures

### Règle du Ko
- [ ] Détecter les situations de ko
- [ ] Empêcher la reprise immédiate
- [ ] Indicateur visuel de l'intersection interdite
- [ ] Gestion du super-ko (optionnel)

## Priorité Moyenne

### Historique et navigation
- [ ] Garder l'historique de tous les coups joués
- [ ] Boutons Précédent/Suivant pour naviguer dans l'historique
- [ ] Afficher le numéro du coup sur les pierres (optionnel)
- [ ] Bouton "Revenir au début"
- [ ] Variantes et branches

### Import/Export
- [ ] Export en format SGF (Smart Game Format)
- [ ] Import de fichiers SGF
- [ ] Export en image (PNG/SVG)
- [ ] Copier la position en texte ASCII
- [ ] Partage via URL avec position encodée

### Modes d'étude avancés
- [ ] Mode "Problème" (tsumego)
  - Définir une position de départ
  - Marquer la solution
  - Vérification automatique
- [ ] Marqueurs sur le plateau
  - Lettres (A, B, C...)
  - Nombres
  - Cercles, triangles, carrés
  - Zones colorées
- [ ] Commentaires textuels par coup
- [ ] Mode analyse avec plusieurs variations

### Statistiques et analyse
- [ ] Comptage automatique du territoire
- [ ] Estimation du score (règles chinoises/japonaises)
- [ ] Détection des groupes vivants/morts
- [ ] Heatmap des coups joués
- [ ] Analyse des formes (atari, shicho, etc.)

## Priorité Basse

### Interface utilisateur
- [ ] Mode plein écran
- [ ] Zoom sur le plateau
- [ ] Rotation du plateau (180°)
- [ ] Coordonnées autour du plateau (A-T, 1-19)
- [ ] Thèmes supplémentaires (bois sombre, moderne, classique)
- [ ] Personnalisation des couleurs
- [ ] Sons (placement de pierre, capture)
- [ ] Animations des pierres

### Fonctionnalités d'apprentissage
- [ ] Base de données de joseki
- [ ] Bibliothèque de fuseki
- [ ] Collection de problèmes tsumego
- [ ] Tutoriel interactif pour débutants
- [ ] Glossaire des termes du Go
- [ ] Conseils contextuels

### Multijoueur
- [ ] Partie locale à deux joueurs (hot seat)
- [ ] Partie en ligne (WebSocket/WebRTC)
- [ ] Système de temps/byoyomi
- [ ] Chat entre joueurs
- [ ] Liste des parties en cours
- [ ] Classement ELO

### Technologique
- [ ] Tests unitaires (Vitest)
- [ ] Tests E2E (Playwright)
- [ ] Progressive Web App (PWA)
- [ ] Mode hors ligne
- [ ] Internationalisation (i18n)
  - Anglais
  - Japonais
  - Coréen
  - Chinois
- [ ] Accessibilité (ARIA, navigation clavier)
- [ ] Support mobile/tactile amélioré

## Optimisations

### Performance
- [ ] Mémoïsation du calcul des libertés (useMemo)
- [ ] Virtualisation pour grands plateaux (19x19)
- [ ] Web Workers pour calculs lourds
- [ ] Lazy loading des modules

### Code
- [ ] Migration vers TypeScript
- [ ] Refactoring avec Context API (éviter props drilling)
- [ ] Custom hooks réutilisables
  - useBoard
  - useGameHistory
  - useTheme
- [ ] Tests de performance
- [ ] Documentation JSDoc complète

## Intégrations

### Services externes
- [ ] Intégration avec OGS (Online Go Server)
- [ ] Import depuis KGS, IGS
- [ ] Connexion avec comptes de serveurs de Go
- [ ] API de moteurs d'IA (KataGo, Leela Zero)
- [ ] Sauvegarde cloud (Firebase, Supabase)

### Analyse par IA
- [ ] Suggestions de coups par IA
- [ ] Évaluation de la position
- [ ] Graphique d'évaluation au fil de la partie
- [ ] Comparaison avec parties de professionnels

## Documentation

- [ ] Vidéo de démonstration
- [ ] GIF animés pour le README
- [ ] Guide de contribution détaillé
- [ ] Exemples d'utilisation avancée
- [ ] Documentation API pour extensions
- [ ] Tutoriel d'installation pour développeurs

## Infrastructure

- [ ] CI/CD (GitHub Actions)
- [ ] Déploiement automatique (Vercel, Netlify)
- [ ] Monitoring des erreurs (Sentry)
- [ ] Analytics (respect de la vie privée)
- [ ] Lighthouse CI pour la performance

---

## Notes

- Les fonctionnalités sont listées par ordre de priorité approximatif
- Certaines features peuvent être combinées ou divisées
- L'architecture actuelle facilite l'ajout de ces fonctionnalités
- Consulter [ARCHITECTURE.md](ARCHITECTURE.md) avant d'implémenter des changements majeurs

## Contribution

Si vous souhaitez contribuer à l'une de ces fonctionnalités :
1. Ouvrez une issue pour discuter de l'approche
2. Consultez [ARCHITECTURE.md](ARCHITECTURE.md) pour comprendre la structure
3. Créez une branche dédiée
4. Soumettez une Pull Request

---

**Dernière mise à jour** : 2025-12-29
