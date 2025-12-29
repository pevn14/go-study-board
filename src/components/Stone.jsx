import styles from './Stone.module.css'

/**
 * Composant représentant une pierre (noire ou blanche) sur le plateau de Go
 *
 * @param {Object} props
 * @param {'black'|'white'} props.color - La couleur de la pierre
 * @param {boolean} props.showLibertiesCount - Afficher le nombre de libertés
 * @param {number} props.libertiesCount - Le nombre de libertés à afficher
 */
const Stone = ({ color, showLibertiesCount = false, libertiesCount = 0 }) => {
  return (
    <div className={`${styles.stone} ${styles[color]}`}>
      {showLibertiesCount && (
        <span className={styles.libertiesCount}>
          {libertiesCount}
        </span>
      )}
    </div>
  )
}

export default Stone
