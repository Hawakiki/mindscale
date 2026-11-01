import type { ReactNode } from 'react'
import { Glyph } from './Glyph'
import styles from './Domains.module.css'

function Ask() {
  return (
    <span className={styles.ask}>
      <span aria-hidden="true">?</span>
      <span className="visually-hidden">빈칸</span>
    </span>
  )
}

function LShape() {
  return (
    <svg viewBox="0 0 22 32" className={styles.mini} aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" />
      <rect x="1" y="11.5" width="9" height="9" />
      <rect x="1" y="22" width="9" height="9" />
      <rect x="11.5" y="22" width="9" height="9" />
    </svg>
  )
}

type Domain = {
  name: string
  description: string
  sample: ReactNode
}

const DOMAINS: Domain[] = [
  {
    name: '논리 추론',
    description: '도형 행렬에서 규칙을 찾아 빈칸을 채워요. 처음 보는 문제를 푸는 힘을 봐요.',
    sample: (
      <div className={styles.strip}>
        <Glyph shape="diamond" fill="empty" className={styles.mini} />
        <Glyph shape="diamond" fill="half" className={styles.mini} />
        <Ask />
      </div>
    ),
  },
  {
    name: '공간 지각',
    description: '도형을 머릿속에서 돌리거나 뒤집었을 때 어떤 모양이 되는지 골라요.',
    sample: (
      <div className={styles.strip}>
        <LShape />
        <span className={styles.op}>90° 회전</span>
        <Ask />
      </div>
    ),
  },
  {
    name: '언어 이해',
    description: '두 단어 사이의 관계를 파악하고, 같은 관계로 이어지는 단어를 찾아요.',
    sample: (
      <p className={styles.expr}>
        온도계 : 온도 = 저울 : <Ask />
      </p>
    ),
  },
  {
    name: '수리 사고',
    description: '수열과 수량 관계에서 규칙을 찾아 다음에 올 수를 구해요.',
    sample: (
      <p className={styles.expr}>
        3, 5, 9, 17, <Ask />
      </p>
    ),
  },
]

export function Domains() {
  return (
    <section id="domains" className="section" aria-labelledby="domains-title">
      <div className="container">
        <h2 id="domains-title" className="section-title">
          네 가지 능력을 나눠서 측정해요
        </h2>
        <p className="section-lead">
          영역마다 10문항씩 나오고, 쉬운 문항부터 어려운 문항 순서로 이어져요. 영역별 점수는 결과
          리포트에서 따로 확인할 수 있어요.
        </p>

        <ul className={styles.list}>
          {DOMAINS.map((domain) => (
            <li key={domain.name} className={styles.row}>
              <div>
                <h3 className={styles.name}>{domain.name}</h3>
                <p className={styles.meta}>10문항, 약 6분</p>
              </div>
              <p className={styles.description}>{domain.description}</p>
              <div className={styles.sample}>
                <span className={styles.sampleLabel}>예시</span>
                {domain.sample}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
