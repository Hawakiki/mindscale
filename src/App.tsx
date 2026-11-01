import { useEffect, useState } from 'react'
import { ClosingCta } from './components/ClosingCta'
import { Domains } from './components/Domains'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PreparingScreen } from './components/PreparingScreen'
import { Report } from './components/Report'

export default function App() {
  const [preparing, setPreparing] = useState(false)

  // 검사 서버에서 뒤로 가기로 돌아왔을 때(bfcache) 준비 화면이 남아 있지 않게
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setPreparing(false)
    }
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  const start = () => setPreparing(true)

  return (
    <>
      <div inert={preparing}>
        <Header onStart={start} />
        <main id="top">
          <Hero onStart={start} />
          <Domains />
          <Report />
          <Faq />
          <ClosingCta onStart={start} />
        </main>
        <Footer />
      </div>
      {preparing && <PreparingScreen onClose={() => setPreparing(false)} />}
    </>
  )
}
