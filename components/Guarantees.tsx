'use client'
import { motion } from 'framer-motion'
import { Building2, ClipboardList, ShieldCheck, HardHat } from 'lucide-react'
import { guarantees } from '@/data/guarantees'

const ICONS = {
  'building':     Building2,
  'clipboard':    ClipboardList,
  'shield-check': ShieldCheck,
  'hard-hat':     HardHat,
} as const

/* Bento grid layout: première carte grande, les autres en 2×2 */
export default function Guarantees() {
  const [first, ...rest] = guarantees

  return (
    <section id="garanties" className="relative py-32 bg-[#0D0D0D] overflow-hidden">

      {/* Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                      w-[900px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: 'rgba(255,107,26,0.055)' }} />

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="px-6 md:px-16 lg:px-24 mb-14 relative z-10"
      >
        <span className="tag-orange mb-5 block w-fit">Pourquoi nous choisir</span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-4xl md:text-5xl lg:text-[58px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
            Les garanties Ach&apos;Tech
          </h2>
          <p className="text-white/30 text-[15px] font-light leading-relaxed max-w-xs">
            Des engagements concrets qui font toute la différence pour votre projet.
          </p>
        </div>
      </motion.div>

      {/* ── Bento Grid ── */}
      <div className="px-6 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Grande carte — héros */}
          {first && (() => {
            const Icon = ICONS[first.icon as keyof typeof ICONS]
            return (
              <motion.div
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-1 lg:row-span-2 flex flex-col justify-between
                           rounded-3xl p-8 lg:p-10 relative overflow-hidden group premium-card"
                style={{ background: 'rgba(255,107,26,0.06)', border: '1px solid rgba(255,107,26,0.15)', minHeight: '320px' }}
              >
                {/* Glow bg */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-150"
                     style={{ background: 'rgba(255,107,26,0.18)' }} />

                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8
                                  group-hover:scale-110 transition-transform duration-300"
                       style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}>
                    <Icon size={24} className="text-orange" strokeWidth={1.6} />
                  </div>
                  <h4 className="text-[20px] font-semibold text-white mb-3 leading-snug">{first.title}</h4>
                  <p className="text-[13.5px] text-white/38 font-light leading-[1.7]">{first.desc}</p>
                </div>

                {/* Stat */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <div className="text-[42px] font-bold text-orange leading-none">10</div>
                  <div className="text-[11px] text-white/30 uppercase tracking-[.1em] font-medium mt-1">Ans de garantie</div>
                </div>
              </motion.div>
            )
          })()}

          {/* Cartes secondaires */}
          {rest.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-3xl p-7 relative overflow-hidden group cursor-default
                           transition-all duration-300 premium-card
                           hover:border-orange/25"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="absolute top-0 left-[20%] right-[20%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                     style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.5), transparent)' }} />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5
                                group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'rgba(255,107,26,0.09)', border: '1px solid rgba(255,107,26,0.14)' }}>
                  <Icon size={19} className="text-orange" strokeWidth={1.6} />
                </div>
                <h4 className="text-[15px] font-semibold text-white mb-2.5 leading-snug">{item.title}</h4>
                <p className="text-[12.5px] text-white/32 font-light leading-[1.7]">{item.desc}</p>
              </motion.div>
            )
          })}

          {/* Carte CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group"
            style={{ background: 'rgba(255,107,26,0.04)', border: '1px dashed rgba(255,107,26,0.18)' }}
          >
            <div className="text-[13px] text-white/30 font-light leading-[1.7] mb-6">
              Prêt à démarrer votre projet ? Devis gratuit sous 24h, sans engagement.
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(255,107,26,.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2
                         bg-orange hover:bg-orange-dark text-white
                         text-[13px] font-semibold px-6 py-3.5 rounded-xl
                         transition-colors duration-200 shadow-orange w-full"
            >
              Demander un devis gratuit
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
