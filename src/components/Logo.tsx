import styles from './Logo.module.css'

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function Logo() {
  return (
    <span className={styles.logo}>
      <svg viewBox="0 0 18 18" className={styles.mark} aria-hidden="true">
        {CELLS.map((i) => (
          <rect
            key={i}
            x={(i % 3) * 7}
            y={Math.floor(i / 3) * 7}
            width="4"
            height="4"
            rx="0.6"
            className={i === 8 ? styles.accent : undefined}
          />
        ))}
      </svg>
      Mindscale
    </span>
  )
}
