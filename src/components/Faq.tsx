import styles from './Faq.module.css'

const QUESTIONS = [
  {
    question: '검사는 정말 무료인가요?',
    answer: '네. 모든 문항과 결과 리포트를 무료로 제공하고, 회원가입 없이 바로 응시할 수 있어요.',
  },
  {
    question: '결과는 얼마나 정확한가요?',
    answer:
      '연령대별 응시자 분포와 비교해 점수를 계산해요. 다만 온라인 검사라서 컨디션과 응시 환경에 따라 점수가 달라질 수 있고, 전문 심리 평가를 대신하지는 않아요.',
  },
  {
    question: '중간에 멈췄다가 이어서 풀 수 있나요?',
    answer:
      '문항마다 제한 시간이 있어서 한 번에 끝까지 푸는 걸 권장해요. 창을 닫거나 새로고침하면 처음부터 다시 시작해야 해요.',
  },
  {
    question: '휴대폰으로도 응시할 수 있나요?',
    answer: '네. 다만 도형 문항은 화면이 클수록 보기 편해서 태블릿이나 PC를 권장해요.',
  },
  {
    question: '다시 응시해도 되나요?',
    answer:
      '응시할 때마다 문항 구성이 바뀌어서 다시 풀 수 있어요. 같은 유형에 익숙해지는 효과를 줄이려면 한 달 정도 간격을 두세요.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="faq-title" className="section-title">
          자주 묻는 질문
        </h2>
        <div className={styles.list}>
          {QUESTIONS.map(({ question, answer }) => (
            <details key={question} className={styles.item}>
              <summary className={styles.question}>
                {question}
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
