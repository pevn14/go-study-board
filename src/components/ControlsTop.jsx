import styles from './Controls.module.css'

/**
 * Composant regroupant les contrôles d'action en haut du plateau
 *
 * @param {Object} props
 * @param {string} props.currentColor - La couleur actuellement sélectionnée
 * @param {Function} props.onToggleColor - Callback pour changer de couleur
 * @param {Function} props.onClearBoard - Callback pour effacer le plateau
 */
const ControlsTop = ({
  currentColor,
  onToggleColor,
  onClearBoard
}) => {
  return (
    <div className={styles.topControls}>
      <button onClick={onToggleColor} className={styles.colorToggle}>
        Couleur: <span className={`${styles.colorIndicator} ${styles[currentColor]}`}></span>
      </button>
      <button onClick={onClearBoard} className={styles.clearButton}>
        Effacer
      </button>
    </div>
  )
}

export default ControlsTop
