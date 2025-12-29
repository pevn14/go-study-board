import Stone from './Stone'
import './Intersection.css'

/**
 * Composant représentant une intersection du plateau de Go
 *
 * @param {Object} props
 * @param {number} props.row - La ligne de l'intersection
 * @param {number} props.col - La colonne de l'intersection
 * @param {string|null} props.stone - La couleur de la pierre ('black', 'white', ou null)
 * @param {boolean} props.isStarPoint - Si c'est un point d'étoile (hoshi)
 * @param {Function} props.onClick - Callback lors du clic
 * @param {boolean} props.showLibertiesMode - Afficher les libertés
 * @param {number} props.libertiesCount - Le nombre de libertés
 * @param {number} props.size - La taille du plateau (pour calculer la position)
 */
const Intersection = ({
  row,
  col,
  stone,
  isStarPoint = false,
  onClick,
  showLibertiesMode = false,
  libertiesCount = 0,
  size = 9
}) => {
  const handleClick = (event) => {
    event.preventDefault()
    onClick(row, col, event)
  }

  return (
    <div
      className={`intersection ${isStarPoint ? 'star-point' : ''}`}
      style={{
        top: `${row * (100 / (size - 1))}%`,
        left: `${col * (100 / (size - 1))}%`
      }}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {stone && (
        <Stone
          color={stone}
          showLibertiesCount={showLibertiesMode}
          libertiesCount={libertiesCount}
        />
      )}
    </div>
  )
}

export default Intersection
