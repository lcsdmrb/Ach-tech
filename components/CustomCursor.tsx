'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [isHover, setIsHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 16, mass: 0.9 })
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 16, mass: 0.9 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    function addListeners() {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea, label').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHover(true))
        el.addEventListener('mouseleave', () => setIsHover(false))
      })
    }

    window.addEventListener('mousemove', onMove)
    addListeners()

    // Re-attach after DOM changes (e.g. after React hydration)
    const t = setTimeout(addListeners, 1000)
    return () => {
      window.removeEventListener('mousemove', onMove)
      clearTimeout(t)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width:   isHover ? 56 : 36,
            height:  isHover ? 56 : 36,
            opacity: isHover ? 0.5 : 0.3,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="rounded-full"
          style={{
            border: '1.5px solid #FF6B1A',
            boxShadow: isHover ? '0 0 16px rgba(255,107,26,0.4)' : '0 0 8px rgba(255,107,26,0.2)',
          }}
        />
      </motion.div>

      {/* Inner dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ width: isHover ? 8 : 7, height: isHover ? 8 : 7 }}
          className="rounded-full"
          style={{ background: '#FF6B1A', boxShadow: '0 0 8px rgba(255,107,26,0.8)' }}
        />
      </motion.div>
    </>
  )
}
