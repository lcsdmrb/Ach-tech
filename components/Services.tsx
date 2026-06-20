'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    n: '01', icon: '🔥', cat: 'Chauffage',
    title: 'Chauffage & Sanitaires',
    desc: 'Installation, remplacement et entretien de vos équipements de chauffage et de plomberie.',
    items: ['Chaudières gaz & mazout', 'Pompes à chaleur', 'Plancher chauffant', 'Plomberie & sanitaires'],
    img: 'https://picsum.photos/seed/svc-heat/800/500', // TODO: vraie photo
  },
  {
    n: '02', icon: '🖌️', cat: 'Finitions',
    title: 'Finitions intérieures',
    desc: 'Parachèvement complet de vos espaces de vie pour un résultat soigné et durable.',
    items: ['Pose de cloisons & plaques', 'Enduits & peinture', 'Carrelage & revêtements', 'Menuiseries intérieures'],
    img: 'https://picsum.photos/seed/svc-finish/800/500', // TODO: vraie photo
  },
  {
    n: '03', icon: '🍳', cat: 'Cuisine & SDB',
    title: 'Cuisine & Salle de bain',
    desc: 'Conception et réalisation clé en main de vos espaces cuisine et salle de bain.',
    items: ["Aménagement cuisine", 'Salle de bain complète', "Douche à l'italienne", 'Meuble vasque & robinetterie'],
    img: 'https://picsum.photos/seed/svc-kitchen/800/500', // TODO: vraie photo
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 md:px-20 bg-[#0D0D0D] overflow-hidden">

      <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full
                      blur-[120px] pointer-events-none animate-blob-1"
           style={{ background: 'rgba(255,107,26,0.05)' }} />

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-14">
        <span className="tag-orange mb-4 block w-fit">🔧 Ce que nous faisons</span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3 leading-[1.12]">
          Nos services
        </h2>
        <p className="text-white/40 text-[15.5px] font-light leading-relaxed max-w-md">
          De l'installation de chaudière à la pose de carrelage, nous intervenons sur tous vos projets d'habitat.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="glass-dark rounded-2xl overflow-hidden shadow-glass
                       border border-white/10 group cursor-default
                       hover:border-orange/30 transition-all duration-300">

            <div className="relative h-44 overflow-hidden">
              <Image src={s.img} alt={s.title} fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:768px) 100vw, 33vw" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-3 left-3 text-[9.5px] font-bold tracking-[2px] uppercase
                              px-2.5 py-1 rounded-full"
                   style={{ color: 'rgba(255,140,71,0.9)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                {s.n} — {s.cat}
              </div>
            </div>

            <div className="p-7">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4
                              transition-colors duration-300"
                   style={{ background: 'rgba(255,107,26,0.10)' }}>
                {s.icon}
              </div>
              <h3 className="text-[17px] font-semibold text-white mb-2 leading-tight">{s.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed font-light mb-5">{s.desc}</p>
              <div className="w-6 h-px mb-4" style={{ background: 'rgba(255,107,26,0.35)' }} />
              <ul className="space-y-2">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-[12.5px] text-white/40 font-light">
                    <span className="text-orange/60 text-[11px] font-bold">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
