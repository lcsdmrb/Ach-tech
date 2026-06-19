'use client'
import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (s / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-2.5 left-4 right-4 h-[3px] bg-white/5 rounded-full z-[9999] pointer-events-none">
      <div
        className="h-full rounded-full transition-[width] duration-75 ease-linear"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #E85A0A, #FF7A35)',
          boxShadow: '0 0 10px rgba(232,90,10,.55)',
        }}
      />
    </div>
  )
}
