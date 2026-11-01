import { Logo } from './Logo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Logo />
        <p className={styles.note}>
          이 검사는 참고용이며 전문 심리 평가나 임상 진단을 대신하지 않아요.
        </p>
        <p className={styles.copy}>© 2026 Mindscale</p>
      </div>
    </footer>
  )
}
