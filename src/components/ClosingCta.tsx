import { PrimaryButton } from './PrimaryButton'
import styles from './ClosingCta.module.css'

export function ClosingCta({ onStart }: { onStart: () => void }) {
  return (
    <section className={`section ${styles.closing}`} aria-labelledby="closing-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 id="closing-title" className="section-title">
            준비되면 바로 시작하세요
          </h2>
          <p className="section-lead">
            조용한 곳에서 25분 정도 시간을 내 주세요. 중간에 창을 닫으면 처음부터 다시 풀어야 해요.
          </p>
        </div>
        <PrimaryButton onClick={onStart}>지금 검사 시작하기</PrimaryButton>
      </div>
    </section>
  )
}
