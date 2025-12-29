import { useState } from 'react'
import './GoBoard.css'

const GoBoard = ({ size = 9 }) => {
  const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)))
  const [currentColor, setCurrentColor] = useState('black')
  const [showLibertiesMode, setShowLibertiesMode] = useState(false)

  const calculateLiberties = (row, col) => {
    if (!board[row][col]) return 0

    const color = board[row][col]
    const visited = new Set()
    const group = []
    const liberties = new Set()

    // Trouver tous les membres du groupe connecté
    const findGroup = (r, c) => {
      const key = `${r},${c}`
      if (visited.has(key)) return
      if (r < 0 || r >= size || c < 0 || c >= size) return
      if (board[r][c] !== color) return

      visited.add(key)
      group.push([r, c])

      findGroup(r - 1, c)
      findGroup(r + 1, c)
      findGroup(r, c - 1)
      findGroup(r, c + 1)
    }

    findGroup(row, col)

    // Compter les libertés du groupe
    group.forEach(([r, c]) => {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      directions.forEach(([dr, dc]) => {
        const newR = r + dr
        const newC = c + dc
        if (newR >= 0 && newR < size && newC >= 0 && newC < size) {
          if (board[newR][newC] === null) {
            liberties.add(`${newR},${newC}`)
          }
        }
      })
    })

    return liberties.size
  }

  const handleIntersectionClick = (row, col, event) => {
    event.preventDefault()

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

  return (
    <div className="go-board-container">
      <div className="controls">
        <button onClick={toggleColor} className="color-toggle">
          Couleur: <span className={`color-indicator ${currentColor}`}></span>
        </button>
        <button onClick={clearBoard} className="clear-button">
          Effacer
        </button>
      </div>

      <div className="go-board-wrapper">
        <div className="go-board" style={{ '--board-size': size }}>
          {/* Lignes horizontales */}
          {Array.from({ length: size }).map((_, i) => (
            <div key={`h-${i}`} className="line horizontal" style={{ top: `${i * (100 / (size - 1))}%` }} />
          ))}

          {/* Lignes verticales */}
          {Array.from({ length: size }).map((_, i) => (
            <div key={`v-${i}`} className="line vertical" style={{ left: `${i * (100 / (size - 1))}%` }} />
          ))}

          {/* Intersections */}
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`intersection ${
                  (size === 9 && rowIndex === 2 && colIndex === 2) ||
                  (size === 9 && rowIndex === 2 && colIndex === 6) ||
                  (size === 9 && rowIndex === 6 && colIndex === 2) ||
                  (size === 9 && rowIndex === 6 && colIndex === 6) ||
                  (size === 9 && rowIndex === 4 && colIndex === 4)
                    ? 'star-point'
                    : ''
                }`}
                style={{
                  top: `${rowIndex * (100 / (size - 1))}%`,
                  left: `${colIndex * (100 / (size - 1))}%`
                }}
                onClick={(e) => handleIntersectionClick(rowIndex, colIndex, e)}
                onContextMenu={(e) => handleIntersectionClick(rowIndex, colIndex, e)}
              >
                {cell && (
                  <div className={`stone ${cell}`}>
                    {showLibertiesMode && (
                      <span className="liberties-count">
                        {calculateLiberties(rowIndex, colIndex)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          ))}
        </div>
      </div>

      <div className="liberties-control">
        <button
          onClick={toggleLibertiesMode}
          className={`liberties-toggle ${showLibertiesMode ? 'active' : ''}`}
          title="Afficher les degrés de liberté"
        >
          Libertés {showLibertiesMode ? '✓' : ''}
        </button>
      </div>
    </div>
  )
}

export default GoBoard
