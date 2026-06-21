'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#060606]"
          aria-hidden="true"
        >
          {/* Grain overlay loader */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
               style={{
                 backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                 backgroundSize: '256px',
               }} />

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.06, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo */}
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 0px rgba(255,107,26,0))', 'drop-shadow(0 0 20px rgba(255,107,26,0.6))', 'drop-shadow(0 0 0px rgba(255,107,26,0))'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/logo-v2.png"
                alt="Ach'Tech"
                width={220}
                height={170}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Loading bar premium */}
            <div className="w-28 h-[1px] rounded-full overflow-hidden relative"
                 style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                initial={{ width: '0%', x: '-2px' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #D95500, #FF6B1A, #FF8C47)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

