import { useState, type CSSProperties } from 'react'
import { Glyph, type Figure } from './Glyph'
import styles from './SampleQuestion.module.css'

// 행마다 세 도형이 한 번씩, 열마다 채우기 방식이 같다.
const MATRIX: (Figure | null)[] = [
  { shape: 'circle', fill: 'empty' },
  { shape: 'square', fill: 'half' },
  { shape: 'triangle', fill: 'full' },
  { shape: 'square', fill: 'empty' },
  { shape: 'triangle', fill: 'half' },
  { shape: 'circle', fill: 'full' },
  { shape: 'triangle', fill: 'empty' },
  { shape: 'circle', fill: 'half' },
  null,
]

const OPTIONS: Figure[] = [
  { shape: 'square', fill: 'half' },
  { shape: 'circle', fill: 'full' },
  { shape: 'diamond', fill: 'full' },
  { shape: 'square', fill: 'full' },
  { shape: 'triangle', fill: 'full' },
  { shape: 'square', fill: 'empty' },
]

const ANSWER = 3
const RULE = '행마다 세 도형이 한 번씩 나오고, 열마다 채우는 방식이 같아요.'

function PenCircle({ late }: { late?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={`${styles.mark} ${late ? styles.late : ''}`} aria-hidden="true">
      <path pathLength={1} d="M60 9C26 4 6 28 9 55c3 28 33 41 62 34 26-7 30-41 13-62C72 12 52 7 33 14" />
    </svg>
  )
}

function PenSlash() {
  return (
    <svg viewBox="0 0 100 100" className={styles.mark} aria-hidden="true">
      <path pathLength={1} d="M82 16C62 38 41 61 18 86" />
    </svg>
  )
}

export function SampleQuestion() {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = picked === ANSWER

  let feedback = '보기를 하나 고르면 바로 채점해요.'
  if (answered) feedback = correct ? `정답이에요. ${RULE}` : `정답은 ${ANSWER + 1}번이에요. ${RULE}`

  return (
    <div className={styles.sheet}>
      <div className={styles.head}>
        <span>예시 문항</span>
        <span>논리 추론</span>
      </div>

      <p id="sample-prompt" className={styles.prompt}>
        빈칸에 들어갈 도형으로 알맞은 것을 고르세요.
      </p>

      <div className={styles.matrix} role="img" aria-label="3행 3열 도형 행렬. 마지막 칸이 비어 있어요.">
        {MATRIX.map((cell, i) => (
          <div key={i} className={styles.cell} style={{ '--i': i } as CSSProperties}>
            {cell ? (
              <Glyph {...cell} className={styles.glyph} />
            ) : answered ? (
              <Glyph {...OPTIONS[ANSWER]} className={`${styles.glyph} ${styles.solved}`} />
            ) : (
              <span className={styles.blank}>?</span>
            )}
          </div>
        ))}
      </div>

      <fieldset
        className={styles.options}
        data-answered={answered || undefined}
        aria-labelledby="sample-prompt"
        aria-describedby="sample-feedback"
      >
        {OPTIONS.map((option, i) => (
          <label key={i} className={styles.option}>
            <input
              type="radio"
              name="sample-question"
              className="visually-hidden"
              checked={picked === i}
              onChange={() => {
                if (!answered) setPicked(i)
              }}
            />
            <span className={styles.box}>
              <Glyph {...option} className={styles.glyph} />
              {answered && !correct && picked === i && <PenSlash />}
              {answered && i === ANSWER && <PenCircle late={!correct} />}
            </span>
            <span className={styles.bubble}>
              <span className="visually-hidden">보기 </span>
              {i + 1}
            </span>
          </label>
        ))}
      </fieldset>

      <div className={styles.footer}>
        <p id="sample-feedback" className={styles.feedback} aria-live="polite">
          {feedback}
        </p>
        {answered && (
          <button type="button" className={styles.retry} onClick={() => setPicked(null)}>
            다시 풀기
          </button>
        )}
      </div>
    </div>
  )
}
