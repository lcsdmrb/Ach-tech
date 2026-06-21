'use client'
import { motion } from 'framer-motion'
import { Flame, Paintbrush, ChefHat, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { services } from '@/data/services'

const ICONS = {
  '01': Flame,
  '02': Paintbrush,
  '03': ChefHat,
} as const

const GRADIENTS = [
  'from-orange/30 via-transparent to-transparent',
  'from-white/10 via-transparent to-transparent',
  'from-orange/20 via-transparent to-transparent',
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 bg-[#080808] overflow-hidden">

      {/* Ambient */}
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full
                      blur-[160px] pointer-events-none animate-blob-1"
           style={{ background: 'rgba(255,107,26,0.045)' }} />

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-16 lg:px-24 mb-14"
      >
        <span className="tag-orange mb-5 block w-fit">Ce que nous faisons</span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-4xl md:text-5xl lg:text-[58px] font-semibold tracking-[-0.03em] leading-[1.04] text-white">
            Nos services
          </h2>
          <p className="text-white/30 text-[15px] font-light leading-relaxed max-w-xs">
            De l&apos;installation de chaudière à la pose de carrelage — un interlocuteur unique pour tous vos projets.
          </p>
        </div>
      </motion.div>

      {/* ── Grille 3 cartes ── */}
      <div className="px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s, i) => {
          const Icon = ICONS[s.id as keyof typeof ICONS]

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden cursor-default"
              style={{ aspectRatio: '3/4', minHeight: 480 }}
            >
              {/* Image de fond */}
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-700 ease-out
                           group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
                loading={i === 0 ? 'eager' : 'lazy'}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i]} opacity-60`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Numéro décoratif */}
              <div
                className="absolute top-6 right-6 text-[64px] font-bold leading-none select-none
                            opacity-10 group-hover:opacity-20 transition-opacity duration-400"
                style={{ color: '#fff', fontVariantNumeric: 'tabular-nums' }}
              >
                {s.id}
              </div>

              {/* Badge catégorie */}
              <div className="absolute top-6 left-6">
                <span className="text-[9px] font-bold tracking-[2px] uppercase text-white
                                 px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(255,107,26,0.85)' }}>
                  {s.cat}
                </span>
              </div>

              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                {/* Icône */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5
                                group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.30)' }}>
                  <Icon size={17} className="text-orange" strokeWidth={1.8} />
                </div>

                {/* Titre */}
                <h3 className="text-[21px] font-semibold text-white leading-tight mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5">
                  {s.desc}
                </p>

                {/* Items */}
                <ul className="space-y-1.5 mb-6">
                  {s.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-[12px] text-white/50 font-light">
                      <span className="w-1 h-1 rounded-full bg-orange/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  whileHover={{ gap: '14px' }}
                  className="inline-flex items-center gap-2.5 text-[12.5px] font-semibold text-orange group/cta"
                >
                  Demander un devis
                  <div className="w-7 h-7 rounded-full border border-orange/40 flex items-center justify-center
                                  group-hover/cta:bg-orange group-hover/cta:border-orange transition-all duration-200">
                    <ArrowUpRight size={13} className="group-hover/cta:text-white transition-colors duration-200" />
                  </div>
                </motion.a>
              </div>

              {/* Ligne orange bottom — apparaît au hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100
                              transition-transform duration-500 origin-left"
                   style={{ background: 'linear-gradient(90deg, #FF6B1A, #FF8C47)' }} />
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
