import Intersection from './Intersection'
import './Board.css'

/**
 * Composant représentant le plateau de Go avec ses lignes et intersections
 *
 * @param {Object} props
 * @param {number} props.size - La taille du plateau (par défaut 9)
 * @param {Array<Array<string|null>>} props.boardState - L'état du plateau
 * @param {Function} props.onIntersectionClick - Callback lors du clic sur une intersection
 * @param {boolean} props.showLibertiesMode - Afficher les libertés
 * @param {Function} props.calculateLiberties - Fonction de calcul des libertés
 */
const Board = ({
  size = 9,
  boardState,
  onIntersectionClick,
  showLibertiesMode = false,
  calculateLiberties
}) => {
  // Positions des points d'étoile (hoshi) pour un plateau 9x9
  const starPoints = size === 9 ? [
    [2, 2], [2, 6], [6, 2], [6, 6], [4, 4]
  ] : []

  const isStarPoint = (row, col) => {
    return starPoints.some(([r, c]) => r === row && c === col)
  }

  return (
    <div className="go-board-wrapper">
      <div className="go-board" style={{ '--board-size': size }}>
        {/* Lignes horizontales */}
        {Array.from({ length: size }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="line horizontal"
            style={{ top: `${i * (100 / (size - 1))}%` }}
          />
        ))}

        {/* Lignes verticales */}
        {Array.from({ length: size }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="line vertical"
            style={{ left: `${i * (100 / (size - 1))}%` }}
          />
        ))}

        {/* Intersections */}
        {boardState.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Intersection
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              stone={cell}
              isStarPoint={isStarPoint(rowIndex, colIndex)}
              onClick={onIntersectionClick}
              showLibertiesMode={showLibertiesMode}
              libertiesCount={cell ? calculateLiberties(rowIndex, colIndex) : 0}
              size={size}
            />
          ))
        ))}
      </div>
    </div>
  )
}

export default Board
