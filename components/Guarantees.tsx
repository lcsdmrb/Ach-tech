'use client'
import { motion } from 'framer-motion'

const items = [
  { icon: '🏢', title: 'Entreprise déclarée en Belgique', desc: 'Société officielle, numéro BCE enregistré.' },
  { icon: '📋', title: 'Devis gratuit sans engagement',   desc: 'Estimation détaillée offerte, sans obligation.' },
  { icon: '🛡️', title: 'Garantie décennale',             desc: 'Couverture légale 10 ans sur tous nos travaux.' },
  { icon: '👷', title: 'Patron sur chantier',             desc: 'Le gérant présent et impliqué à chaque étape.' },
]

export default function Guarantees() {
  return (
    <section className="relative py-28 px-6 md:px-20 bg-[#0D0D0D] overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                      w-[1000px] h-[400px] rounded-full blur-[110px] pointer-events-none"
           style={{ background: 'rgba(255,107,26,0.06)' }} />

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.65 }}
        className="text-center mb-14">
        <span className="tag-orange mb-4 inline-flex mx-auto">⭐ Pourquoi nous choisir</span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.12]">
          Les garanties Ach'Tech
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {items.map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="glass-dark rounded-2xl p-7 text-center border border-white/10
                       shadow-glass relative overflow-hidden group cursor-default
                       transition-all duration-300 hover:border-orange/30">

            <div className="absolute top-0 left-[10%] right-[10%] h-px
                            opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                 style={{ background: 'linear-gradient(90deg, transparent, #FF6B1A, transparent)' }} />

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                            mx-auto mb-5 transition-all duration-300"
                 style={{ background: 'rgba(255,107,26,0.10)' }}>
              {item.icon}
            </div>
            <h4 className="text-[14px] font-semibold text-white mb-2 leading-snug">{item.title}</h4>
            <p className="text-[12.5px] text-white/35 font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
