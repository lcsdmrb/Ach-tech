'use client'
import { motion } from 'framer-motion'

const services = [
  {
    n: '01', icon: '🔥', cat: 'Chauffage',
    title: 'Chauffage & sanitaires',
    desc: 'Installation, remplacement et entretien de vos équipements de chauffage et de plomberie.',
    items: ['Chaudières gaz & mazout', 'Pompes à chaleur', 'Plancher chauffant', 'Plomberie & sanitaires'],
  },
  {
    n: '02', icon: '🖌️', cat: 'Finitions',
    title: 'Finitions intérieures',
    desc: 'Parachèvement complet de vos espaces de vie pour un résultat soigné et durable.',
    items: ['Pose de cloisons & plaques', 'Enduits & peinture', 'Carrelage & revêtements', 'Menuiseries intérieures'],
  },
  {
    n: '03', icon: '🍳', cat: 'Cuisine & SDB',
    title: 'Cuisine & salle de bain',
    desc: 'Conception et réalisation clé en main de vos espaces cuisine et salle de bain.',
    items: ["Aménagement cuisine", 'Salle de bain complète', "Douche à l'italienne", 'Meuble vasque & robinetterie'],
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-8 md:px-20 bg-[#0C0C0C] overflow-hidden">

      {/* BG blob */}
      <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-orange/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.4px] uppercase text-orange-light border border-orange/25 bg-orange/10 px-3.5 py-1 rounded-full mb-4">
          🔧 Ce que nous faisons
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3 leading-tight">Nos services</h2>
        <p className="text-white/40 text-base font-light leading-relaxed max-w-lg">
          De l'installation de chaudière à la pose de carrelage, nous intervenons sur tous vos projets d'habitat.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -5, borderColor: 'rgba(232,90,10,.35)' }}
            className="glass rounded-2xl p-8 border border-white/7 shadow-glass relative overflow-hidden group transition-all duration-300 cursor-default"
          >
            {/* subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 30% 20%, rgba(232,90,10,.06) 0%, transparent 70%)' }} />

            <div className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-orange/50 mb-4">{s.n} — {s.cat}</div>
            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-2xl mb-5">{s.icon}</div>
            <h3 className="text-[17px] font-semibold text-white mb-3 leading-tight">{s.title}</h3>
            <p className="text-white/40 text-[13.5px] leading-relaxed font-light mb-5">{s.desc}</p>
            <div className="w-6 h-px bg-orange/40 mb-4" />
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/40 font-light">
                  <span className="text-orange/60 text-xs">›</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
