'use client'
import { motion } from 'framer-motion'
import { partenaires } from '@/data/partenaires'

function BrandPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 px-7 py-3.5 mx-3
                    border border-white/8 rounded-xl bg-white/[0.03]
                    hover:border-orange/25 hover:bg-white/[0.06]
                    transition-all duration-200 cursor-default flex-shrink-0 group">
      {/* TODO: remplacer par <img src={`/brands/${slug}.svg`} /> quand logos dispo */}
      <div className="w-1.5 h-1.5 rounded-full bg-orange/40 group-hover:bg-orange transition-colors duration-200" />
      <span className="text-[13px] font-semibold text-white/35
                       group-hover:text-white/70 transition-colors duration-200 whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export default function Brands() {
  const doubled = [...partenaires, ...partenaires]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A0A0A] border-y overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <div className="flex items-center gap-5 px-6 md:px-20 pt-10 pb-5">
        <div className="flex-1 h-px max-w-[120px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-white/20 whitespace-nowrap">
          Marques partenaires
        </span>
        <div className="flex-1 h-px max-w-[120px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      <div className="mq-mask pb-10">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((b, i) => (
            <BrandPill key={`${b.name}-${i}`} name={b.name} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

