import './Controls.css'

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
    <div className="top-controls">
      <button onClick={onToggleColor} className="color-toggle">
        Couleur: <span className={`color-indicator ${currentColor}`}></span>
      </button>
      <button onClick={onClearBoard} className="clear-button">
        Effacer
      </button>
    </div>
  )
}

export default ControlsTop
