'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Medal, ShieldCheck, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { values } from '@/data/values'

const ICONS = {
  eye:    Eye,
  medal:  Medal,
  shield: ShieldCheck,
} as const

const STATS = [
  { n: '10+',   l: "Ans d'expérience" },
  { n: '200+',  l: 'Chantiers réalisés' },
  { n: '10 ans', l: 'Garantie décennale' },
]

export default function Values() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="valeurs" className="relative bg-[#0A0A0A] overflow-hidden">

      {/* Ligne top */}
      <div className="absolute top-0 left-0 right-0 h-px"
           style={{ background: 'linear-gradient(90deg,transparent,rgba(255,107,26,0.22) 30%,rgba(255,107,26,0.38) 50%,rgba(255,107,26,0.22) 70%,transparent)' }} />

      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px]
                      rounded-full blur-[160px] pointer-events-none"
           style={{ background: 'rgba(255,107,26,0.045)' }} />

      <div className="relative z-10 flex flex-col lg:flex-row">

        {/* ── Colonne gauche sticky ── */}
        <div className="lg:sticky lg:top-0 lg:w-[42%] flex-shrink-0
                        flex flex-col justify-center
                        px-6 md:px-16 lg:pl-24 lg:pr-16
                        py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag-orange mb-6 block w-fit">Nos engagements</span>

            <h2 className="text-4xl lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.04] text-white mb-8">
              Des valeurs qui font<br />la différence
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-[2px] rounded-full bg-orange origin-left mb-8"
            />

            <p className="text-white/32 text-[15px] font-light leading-[1.75] mb-14 max-w-sm">
              Chaque chantier est abordé avec rigueur et honnêteté. Voici les piliers de notre travail au quotidien.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="text-[24px] lg:text-[28px] font-bold text-white leading-none mb-1.5">
                    {s.n.replace(/[+a-z\s]/gi, '')}
                    <span className="text-orange text-[16px]">
                      {s.n.match(/[+a-z\s].*/i)?.[0] ?? ''}
                    </span>
                  </div>
                  <div className="text-[10px] text-white/22 uppercase tracking-[0.1em] font-medium leading-snug">
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Colonne droite accordéon ── */}
        <div className="flex-1 flex flex-col justify-center
                        px-6 md:px-16 lg:pr-24 lg:pl-12
                        py-16 lg:py-20
                        border-t lg:border-t-0 lg:border-l"
             style={{ borderColor: 'rgba(255,255,255,0.055)' }}>

          {/* Fond flouté arrondi */}
          <div className="rounded-3xl"
               style={{
                 background: 'rgba(255,255,255,0.035)',
                 border: '1px solid rgba(255,255,255,0.07)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)',
                 padding: '4px 20px 12px',
               }}>

            {values.map((v, i) => {
              const Icon = ICONS[v.icon as keyof typeof ICONS]
              const isOpen = openIdx === i

              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-6 py-7 text-left group"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                                  transition-all duration-300
                                  ${isOpen ? 'bg-orange' : 'border group-hover:border-orange/35'}`}
                      style={{ border: isOpen ? 'none' : '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Icon
                        size={17}
                        className={`transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/35 group-hover:text-orange'}`}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="flex-1 flex items-baseline gap-4">
                      <span className="text-[11px] font-bold tracking-[.18em] tabular-nums"
                            style={{ color: 'rgba(255,107,26,0.45)' }}>
                        {v.id}
                      </span>
                      <h3 className={`text-[20px] md:text-[24px] font-semibold tracking-tight transition-colors duration-300
                                      ${isOpen ? 'text-white' : 'text-white/55 group-hover:text-white/85'}`}>
                        {v.title}
                      </h3>
                    </div>

                    <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center
                                     transition-all duration-300 border
                                     ${isOpen
                                       ? 'bg-orange border-orange text-white'
                                       : 'border-white/10 text-white/28 group-hover:border-white/25 group-hover:text-white/55'}`}>
                      {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: -8 }}
                          animate={{ y: 0 }}
                          exit={{ y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="text-white/40 text-[15px] font-light leading-[1.78] pb-8 pl-[68px]"
                        >
                          {v.desc}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}

            <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>{/* /fond flouté */}

          {/* CTA discret */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-8"
          >
            <a href="#garanties"
               className="inline-flex items-center gap-2 text-[13px] font-semibold text-orange group/cta">
              Voir nos garanties
              <div className="w-6 h-6 rounded-full border border-orange/35 flex items-center justify-center
                              group-hover/cta:bg-orange group-hover/cta:border-orange transition-all duration-200">
                <Plus size={11} className="group-hover/cta:text-white text-orange transition-colors duration-200" strokeWidth={2.5} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
