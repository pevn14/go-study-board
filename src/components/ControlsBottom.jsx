import styles from './Controls.module.css'

/**
 * Composant regroupant les contrôles d'affichage en bas du plateau
 *
 * @param {Object} props
 * @param {boolean} props.showLibertiesMode - État du mode libertés
 * @param {Function} props.onToggleLibertiesMode - Callback pour activer/désactiver le mode libertés
 */
const ControlsBottom = ({
  showLibertiesMode,
  onToggleLibertiesMode
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
    </div>
  )
}

export default ControlsBottom
