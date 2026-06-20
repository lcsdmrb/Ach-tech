'use client'
import { motion } from 'framer-motion'

const values = [
  {
    n: '01', icon: '👁️',
    title: 'Transparence',
    desc: 'Devis détaillé, prix clairs, aucune mauvaise surprise. Vous savez exactement ce qui est fait et pourquoi, à chaque étape du chantier.',
  },
  {
    n: '02', icon: '🏅',
    title: 'Qualité',
    desc: 'Matériaux sélectionnés avec soin, finitions irréprochables. Nous ne livrons pas un chantier dont nous ne serions pas fiers.',
  },
  {
    n: '03', icon: '🛡️',
    title: 'Garantie décennale',
    desc: 'Toutes nos installations sont couvertes 10 ans. Vous êtes protégé contre les défauts de construction sans surcoût.',
  },
]

export default function Values() {
  return (
    <section id="valeurs" className="relative py-28 px-6 md:px-20 bg-[#F7F6F4] overflow-hidden">

      {/* Déco cercles clairs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-orange/8 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full border border-orange/5 pointer-events-none" />

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65 }}
        className="mb-14"
      >
        <span className="tag-orange mb-4 block w-fit">❤️ Nos engagements</span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111] mb-3 leading-[1.12]">
          Des valeurs qui font<br />la différence
        </h2>
        <p className="text-[#888] text-[15.5px] font-light leading-relaxed max-w-md">
          Chaque chantier est abordé avec rigueur et honnêteté — voici les piliers de notre travail au quotidien.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="glass-light rounded-2xl p-9 shadow-glass-light
                       relative overflow-hidden group cursor-default
                       transition-shadow duration-300 hover:shadow-card"
          >
            {/* Accent top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl
                            bg-gradient-to-r from-orange to-orange-light
                            scale-x-0 group-hover:scale-x-100
                            transition-transform duration-400 origin-left" />

            <div className="text-[10px] font-bold tracking-[2px] text-orange/40 mb-4">{v.n}</div>
            <div className="w-12 h-12 rounded-xl bg-orange/8 flex items-center justify-center text-2xl mb-5
                            group-hover:bg-orange/14 transition-colors duration-300">
              {v.icon}
            </div>
            <h3 className="text-[17.5px] font-semibold text-[#111] mb-3">{v.title}</h3>
            <p className="text-[13.5px] text-[#777] leading-relaxed font-light">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
