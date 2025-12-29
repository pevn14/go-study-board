import styles from './Controls.module.css'

/**
 * Composant regroupant les contrôles d'affichage en bas du plateau
 *
 * @param {Object} props
 * @param {boolean} props.showLibertiesMode - État du mode libertés
 * @param {Function} props.onToggleLibertiesMode - Callback pour activer/désactiver le mode libertés
 * @param {boolean} props.darkMode - État du mode sombre
 * @param {Function} props.onToggleDarkMode - Callback pour activer/désactiver le mode sombre
 */
const ControlsBottom = ({
  showLibertiesMode,
  onToggleLibertiesMode,
  darkMode,
  onToggleDarkMode
}) => {
  return (
    <div className={styles.bottomControls}>
      <button
        onClick={onToggleLibertiesMode}
        className={`${styles.libertiesToggle} ${showLibertiesMode ? styles.active : ''}`}
        title="Afficher les degrés de liberté"
      >
        Libertés {showLibertiesMode ? '✓' : ''}
      </button>
      <button
        onClick={onToggleDarkMode}
        className={`${styles.darkModeToggle} ${darkMode ? styles.active : ''}`}
        title="Mode sombre"
      >
        {darkMode ? '🌙' : '☀️'} Mode {darkMode ? 'sombre' : 'clair'}
      </button>
    </div>
  )
}

export default ControlsBottom
