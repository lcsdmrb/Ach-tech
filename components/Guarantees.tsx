'use client'
import { motion } from 'framer-motion'

const items = [
  { icon: '🏢', title: 'Entreprise déclarée en Belgique' },
  { icon: '📋', title: 'Devis gratuits sans engagement' },
  { icon: '🛡️', title: 'Garantie décennale sur tous travaux' },
  { icon: '👷', title: 'Le patron présent sur chaque chantier' },
]

export default function Guarantees() {
  return (
    <section className="relative py-28 px-8 md:px-20 bg-[#0C0C0C] overflow-hidden">

      {/* glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-orange/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.4px] uppercase text-orange-light border border-orange/25 bg-orange/10 px-3.5 py-1 rounded-full mb-4">
          ⭐ Pourquoi nous choisir
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
          Les garanties Ach'Tech
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -5, borderColor: 'rgba(232,90,10,.3)' }}
            className="glass rounded-2xl p-8 text-center border border-white/7 shadow-glass relative overflow-hidden group transition-all duration-300 cursor-default"
          >
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-orange/18 transition-colors duration-300">
              {item.icon}
            </div>
            <p className="text-[13.5px] text-white/55 font-normal leading-snug">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
