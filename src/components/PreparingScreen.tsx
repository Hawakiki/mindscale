import { useEffect, useRef, useState } from 'react'
import { ASSESSMENT_URL } from '../config'
import { Logo } from './Logo'
import { PrimaryButton } from './PrimaryButton'
import styles from './PreparingScreen.module.css'

// [경과 ms, 진행률 %] — 구간마다 감속하면서 채운다
const TIMELINE: [number, number][] = [
  [0, 0],
  [600, 24],
  [1200, 38],
  [2000, 63],
  [2600, 86],
  [3300, 92],
  [3800, 100],
]

// [시작 진행률 %, 안내 문구]
const STEPS: [number, string][] = [
  [0, '문항 세트를 불러오고 있어요'],
  [38, '응답 시간 측정을 준비하고 있어요'],
  [63, '연령별 비교 데이터를 확인하고 있어요'],
  [92, '검사 화면을 열고 있어요'],
]

function progressAt(elapsed: number) {
  for (let i = 1; i < TIMELINE.length; i++) {
    const [t0, v0] = TIMELINE[i - 1]
    const [t1, v1] = TIMELINE[i]
    if (elapsed <= t1) {
      const k = (elapsed - t0) / (t1 - t0)
      return v0 + (v1 - v0) * (1 - (1 - k) ** 2)
    }
  }
  return 100
}

function stepAt(percent: number) {
  return STEPS.findLast(([from]) => percent >= from)?.[1] ?? STEPS[0][1]
}

type Status = 'preparing' | 'failed'

export function PreparingScreen({ onClose }: { onClose: () => void }) {
  const [attempt, setAttempt] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<Status>('preparing')
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    titleRef.current?.focus()
  }, [status])

  useEffect(() => {
    let frame = 0
    let timer = 0
    const startedAt = performance.now()

    const tick = (now: number) => {
      const value = progressAt(now - startedAt)
      setProgress(value)
      if (value < 100) {
        frame = requestAnimationFrame(tick)
        return
      }
      timer = window.setTimeout(() => {
        if (ASSESSMENT_URL) window.location.assign(ASSESSMENT_URL)
        else setStatus('failed')
      }, 300)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [attempt])

  const retry = () => {
    setProgress(0)
    setStatus('preparing')
    setAttempt((n) => n + 1)
  }

  const percent = Math.floor(progress)

  return (
    <div className={styles.screen} role="dialog" aria-modal="true" aria-labelledby="preparing-title">
      <div className={`container ${styles.top}`}>
        <Logo />
      </div>

      <div className={styles.body}>
        {status === 'preparing' ? (
          <>
            <h2 id="preparing-title" ref={titleRef} tabIndex={-1} className={styles.title}>
              검사를 준비하고 있어요
            </h2>
            <p className={styles.lead}>준비가 끝나면 검사 화면으로 바로 넘어가요.</p>

            <div className={styles.meter}>
              <div
                className={styles.track}
                role="progressbar"
                aria-labelledby="preparing-title"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div className={styles.fill} style={{ width: `${progress}%` }} />
              </div>
              <div className={styles.status}>
                <span>{stepAt(percent)}</span>
                <span className={styles.percent}>{percent}%</span>
              </div>
            </div>

            <p className={styles.note}>검사 중에는 창을 닫거나 새로고침하지 마세요.</p>
          </>
        ) : (
          <>
            <h2 id="preparing-title" ref={titleRef} tabIndex={-1} className={styles.title}>
              검사 서버에 연결하지 못했어요
            </h2>
            <p className={styles.lead}>네트워크 연결을 확인한 뒤 다시 시도해 주세요.</p>
            <div className={styles.actions}>
              <PrimaryButton onClick={retry}>다시 시도하기</PrimaryButton>
              <button type="button" className={styles.close} onClick={onClose}>
                닫기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
