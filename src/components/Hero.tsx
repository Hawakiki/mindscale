import { PrimaryButton } from './PrimaryButton'
import { SampleQuestion } from './SampleQuestion'
import styles from './Hero.module.css'

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h1 id="hero-title" className={styles.title}>
            25분이면
            <br />내 IQ를 알 수 있어요
          </h1>
          <p className={styles.lead}>
            논리 추론, 공간 지각, 언어 이해, 수리 사고 네 영역에서 40문항을 풀면 같은 연령대와
            비교한 지능지수와 영역별 점수를 바로 알려 드려요.
          </p>

          <div className={styles.actions}>
            <PrimaryButton onClick={onStart}>지금 검사 시작하기</PrimaryButton>
            <a href="#domains" className={styles.secondary}>
              측정 영역 보기
            </a>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>문항 수</dt>
              <dd>40문항</dd>
            </div>
            <div>
              <dt>제한 시간</dt>
              <dd>25분</dd>
            </div>
            <div>
              <dt>비용</dt>
              <dd>무료, 가입 없음</dd>
            </div>
          </dl>
        </div>

        <SampleQuestion />
      </div>
    </section>
  )
}
