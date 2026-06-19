'use client'
import { motion } from 'framer-motion'

const values = [
  {
    n: '01', icon: '👁️', title: 'Transparence',
    desc: 'Devis détaillé, prix clairs, aucune mauvaise surprise. Vous savez exactement ce qui est fait et pourquoi, à chaque étape du chantier.',
  },
  {
    n: '02', icon: '🏅', title: 'Qualité',
    desc: 'Matériaux sélectionnés avec soin, finitions irréprochables. Nous ne livrons pas un chantier dont nous ne serions pas fiers.',
  },
  {
    n: '03', icon: '🛡️', title: 'Garantie décennale',
    desc: 'Toutes nos installations sont couvertes pendant 10 ans. Vous êtes protégé contre les défauts de construction sans surcoût.',
  },
]

const card = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
}

export default function Values() {
  return (
    <section id="valeurs" className="relative py-28 px-8 md:px-20 bg-[#F5F4F2]">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.4px] uppercase text-orange border border-orange/20 bg-orange/7 px-3.5 py-1 rounded-full mb-4">
          ❤️ Nos engagements
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111] mb-3 leading-tight">
          Des valeurs qui font<br />la différence
        </h2>
        <p className="text-[#888] text-base font-light leading-relaxed max-w-lg">
          Chaque chantier est abordé avec rigueur et honnêteté. Voici les piliers sur lesquels repose notre travail au quotidien.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            custom={i}
            variants={card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -6, boxShadow: '0 20px 52px rgba(0,0,0,.10)' }}
            className="bg-white rounded-2xl p-9 border border-black/6 relative overflow-hidden group transition-shadow duration-300 cursor-default"
          >
            {/* top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-orange to-orange-light scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

            <div className="text-[10px] font-bold tracking-[2px] text-orange/40 mb-4">{v.n}</div>
            <div className="w-13 h-13 w-12 h-12 rounded-xl bg-orange/7 flex items-center justify-center text-2xl mb-5">{v.icon}</div>
            <h3 className="text-[17px] font-semibold text-[#111] mb-3">{v.title}</h3>
            <p className="text-[13.5px] text-[#888] leading-relaxed font-light">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
