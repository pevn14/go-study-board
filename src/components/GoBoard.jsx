import { useState } from 'react'
import Board from './Board'
import ControlsTop from './ControlsTop'
import ControlsBottom from './ControlsBottom'
import { calculateLiberties } from '../utils/liberties'
import styles from './GoBoard.module.css'

/**
 * Composant principal orchestrant le plateau de Go
 * Gère l'état du jeu et coordonne les sous-composants
 *
 * @param {Object} props
 * @param {number} props.size - La taille du plateau (par défaut 9)
 * @param {boolean} props.darkMode - État du mode sombre
 * @param {Function} props.onToggleDarkMode - Callback pour activer/désactiver le mode sombre
 */
const GoBoard = ({ size = 9, darkMode = false, onToggleDarkMode }) => {
  const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)))
  const [currentColor, setCurrentColor] = useState('black')
  const [showLibertiesMode, setShowLibertiesMode] = useState(false)

  const handleIntersectionClick = (row, col) => {
    const newBoard = board.map(r => [...r])

    if (newBoard[row][col] === null) {
      // Intersection vide: placer une pierre de la couleur sélectionnée
      newBoard[row][col] = currentColor
    } else {
      // Intersection occupée: la vider
      newBoard[row][col] = null
    }

    setBoard(newBoard)
  }

  const toggleColor = () => {
    setCurrentColor(currentColor === 'black' ? 'white' : 'black')
  }

  const clearBoard = () => {
    setBoard(Array(size).fill(null).map(() => Array(size).fill(null)))
  }

  const toggleLibertiesMode = () => {
    setShowLibertiesMode(!showLibertiesMode)
  }

  // Wrapper pour calculer les libertés avec le contexte du plateau
  const calculateLibertiesForPosition = (row, col) => {
    return calculateLiberties(board, row, col, size)
  }

  return (
    <div className={styles.goBoardContainer}>
      <ControlsTop
        currentColor={currentColor}
        onToggleColor={toggleColor}
        onClearBoard={clearBoard}
      />

      <Board
        size={size}
        boardState={board}
        onIntersectionClick={handleIntersectionClick}
        showLibertiesMode={showLibertiesMode}
        calculateLiberties={calculateLibertiesForPosition}
      />

      <ControlsBottom
        showLibertiesMode={showLibertiesMode}
        onToggleLibertiesMode={toggleLibertiesMode}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    </div>
  )
}

export default GoBoard
