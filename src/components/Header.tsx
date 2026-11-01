import { Logo } from './Logo'
import { PrimaryButton } from './PrimaryButton'
import styles from './Header.module.css'

export function Header({ onStart }: { onStart: () => void }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.home}>
          <Logo />
        </a>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <a href="#domains">측정 영역</a>
          <a href="#report">결과 리포트</a>
          <a href="#faq">자주 묻는 질문</a>
        </nav>
        <PrimaryButton size="md" onClick={onStart}>
          검사 시작하기
        </PrimaryButton>
      </div>
    </header>
  )
}
