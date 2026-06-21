'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { avis } from '@/data/avis'

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} className="text-orange fill-orange" />
      ))}
    </div>
  )
}

export default function Reviews() {
  const [idx, setIdx] = useState(0)
  const total = avis.length

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])

  useEffect(() => {
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next])

  return (
    <section id="avis" className="relative py-32 px-6 md:px-20 bg-[#080808] overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
           style={{ background: 'rgba(255,107,26,0.04)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: 'rgba(255,107,26,0.03)' }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="tag-orange mb-5 inline-flex mx-auto">Témoignages clients</span>
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-white leading-[1.08]">
          Ce que disent<br />nos clients
        </h2>
        <p className="text-white/35 text-[15px] font-light leading-relaxed mt-4 max-w-md mx-auto">
          Satisfaction garantie — chaque avis est celui d'un client réel qui nous a fait confiance.
        </p>
      </motion.div>

      {/* Main slider */}
      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Featured review */}
        <div className="relative overflow-hidden rounded-3xl glass-dark border border-white/10 shadow-glass p-10 md:p-14 mb-6">

          <Quote size={48} className="absolute top-8 right-8 text-orange/10" strokeWidth={1.5} />

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Stars n={avis[idx].note} />

              <p className="text-white/80 text-[16px] md:text-[18px] font-light leading-[1.75] mt-6 mb-8 italic">
                &ldquo;{avis[idx].texte}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                     style={{ background: 'linear-gradient(135deg, #FF6B1A, #FF3D00)' }}>
                  {avis[idx].nom[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-[14px]">{avis[idx].nom}</div>
                  <div className="text-white/35 text-[12px] flex items-center gap-1.5 mt-0.5">
                    <span>{avis[idx].ville}</span>
                    <span className="text-white/15">·</span>
                    <span className="text-orange/60">{avis[idx].service}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Avis précédent"
              className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center
                         hover:border-orange/40 hover:text-orange text-white/50
                         transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Avis suivant"
              className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center
                         hover:border-orange/40 hover:text-orange text-white/50
                         transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {avis.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Avis ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === idx
                    ? 'w-6 h-1.5 bg-orange'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] text-white/25 font-medium tracking-wide">
            {idx + 1} / {total}
          </div>
        </div>
      </div>

      {/* Mini cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto relative z-10">
        {avis.slice(0, 3).map((a, i) => (
          <motion.button
            key={a.nom}
            onClick={() => setIdx(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer
                        ${idx === i
                          ? 'border-orange/30 bg-orange/5'
                          : 'glass-dark border-white/8 hover:border-white/20'}`}
          >
            <Stars n={a.note} />
            <p className="text-white/50 text-[12px] font-light leading-relaxed mt-3 line-clamp-2">
              &ldquo;{a.texte}&rdquo;
            </p>
            <div className="text-[11px] text-white/25 mt-3 font-medium">{a.nom} — {a.ville}</div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
