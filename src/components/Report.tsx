import styles from './Report.module.css'

// IQ 척도: 평균 100, 표준편차 15
const MIN = 55
const MAX = 145
const WIDTH = 440
const TOP = 14
const BASE = 140

const SCORE = 121
const TOP_PERCENT = 8
const TICKS = [70, 85, 100, 115, 130]
const DOMAIN_SCORES = [
  { name: '논리 추론', score: 128 },
  { name: '공간 지각', score: 117 },
  { name: '언어 이해', score: 119 },
  { name: '수리 사고', score: 120 },
]

const px = (iq: number) => ((iq - MIN) / (MAX - MIN)) * WIDTH
const py = (iq: number) => BASE - Math.exp(-((iq - 100) ** 2) / (2 * 15 ** 2)) * (BASE - TOP)
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
const line = (iqs: number[]) =>
  iqs.map((iq, i) => `${i ? 'L' : 'M'}${px(iq).toFixed(1)},${py(iq).toFixed(1)}`).join(' ')

const CURVE = line(range(MIN, MAX))
const AREA = `${CURVE} L${WIDTH},${BASE} L0,${BASE} Z`
const TAIL = `${line(range(SCORE, MAX))} L${px(MAX)},${BASE} L${px(SCORE)},${BASE} Z`

const DELIVERABLES = ['전체 지능지수와 상위 백분위', '네 영역별 점수와 가장 강한 영역', '틀린 문항의 정답과 풀이']

export function Report() {
  return (
    <section id="report" className="section" aria-labelledby="report-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 id="report-title" className="section-title">
            결과는 이렇게 받아요
          </h2>
          <p className="section-lead">
            검사가 끝나면 점수를 평균 100, 표준편차 15인 척도로 바꿔서 같은 연령대 응시자 분포에서
            내 위치를 보여 드려요.
          </p>
          <ul className={styles.deliverables}>
            {DELIVERABLES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <figure className={styles.card}>
          <figcaption className={styles.caption}>예시 리포트</figcaption>

          <div className={styles.score}>
            <div>
              <p className={styles.scoreLabel}>전체 IQ</p>
              <p className={styles.scoreValue}>{SCORE}</p>
            </div>
            <p className={styles.badge}>상위 {TOP_PERCENT}%</p>
          </div>

          <svg
            viewBox={`0 0 ${WIDTH} 166`}
            className={styles.curve}
            role="img"
            aria-label={`IQ 분포 곡선. ${SCORE}점은 상위 ${TOP_PERCENT}%에 해당해요.`}
          >
            <path d={AREA} className={styles.area} />
            <path d={TAIL} className={styles.tail} />
            <path d={CURVE} className={styles.line} />
            <line x1="0" x2={WIDTH} y1={BASE} y2={BASE} className={styles.base} />
            <line x1={px(SCORE)} x2={px(SCORE)} y1={py(SCORE) - 22} y2={BASE} className={styles.marker} />
            <text x={px(SCORE)} y={py(SCORE) - 30} className={styles.markerLabel}>
              내 점수
            </text>
            {TICKS.map((tick) => (
              <text key={tick} x={px(tick)} y={BASE + 22} className={styles.tick}>
                {tick}
              </text>
            ))}
          </svg>

          <p className={styles.subhead}>영역별 점수</p>
          <ul className={styles.bars}>
            {DOMAIN_SCORES.map(({ name, score }) => (
              <li key={name} className={styles.bar}>
                <span>{name}</span>
                <span className={styles.track}>
                  <span
                    className={styles.fill}
                    style={{ width: `${((score - MIN) / (MAX - MIN)) * 100}%` }}
                  />
                </span>
                <span className={styles.barValue}>{score}</span>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  )
}
