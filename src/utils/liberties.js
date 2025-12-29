/**
 * Calcule le nombre de libertés (degrés de liberté) pour un groupe de pierres connectées
 *
 * @param {Array<Array<string|null>>} board - Le plateau de jeu (matrice 2D)
 * @param {number} row - La ligne de la pierre
 * @param {number} col - La colonne de la pierre
 * @param {number} size - La taille du plateau (par défaut 9)
 * @returns {number} Le nombre de libertés du groupe
 */
export const calculateLiberties = (board, row, col, size = 9) => {
  if (!board[row][col]) return 0

  const color = board[row][col]
  const visited = new Set()
  const group = []
  const liberties = new Set()

  // Trouver tous les membres du groupe connecté (DFS)
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
