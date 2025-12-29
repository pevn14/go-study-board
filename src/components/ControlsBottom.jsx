import './Controls.css'

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
    <div className="bottom-controls">
      <button
        onClick={onToggleLibertiesMode}
        className={`liberties-toggle ${showLibertiesMode ? 'active' : ''}`}
        title="Afficher les degrés de liberté"
      >
        Libertés {showLibertiesMode ? '✓' : ''}
      </button>
    </div>
  )
}

export default ControlsBottom
