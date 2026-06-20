'use client'
import { motion } from 'framer-motion'

/* TODO: remplacer les noms par de vrais logos SVG dans /public/brands/ */
const brands = [
  { name: 'Viessmann',      icon: '🔥' },
  { name: 'Grohe',          icon: '💧' },
  { name: 'Buderus',        icon: '♨️' },
  { name: 'Vaillant',       icon: '🏠' },
  { name: 'Ideal Standard', icon: '🚿' },
  { name: 'Porcelanosa',    icon: '⬜' },
  { name: 'Roca',           icon: '🛁' },
  { name: 'Daikin',         icon: '❄️' },
  { name: 'Atlantic',       icon: '💨' },
  { name: 'De Dietrich',    icon: '🌿' },
]

function BrandPill({ b }: { b: typeof brands[0] }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3.5 mx-2.5
                    border border-[#eaeaea] rounded-xl bg-white/90
                    hover:border-orange/25 hover:shadow-card
                    transition-all duration-250 cursor-default flex-shrink-0 group">
      <span className="text-xl">{b.icon}</span>
      <span className="text-[13.5px] font-semibold text-[#555]
                       group-hover:text-[#222] transition-colors duration-200 whitespace-nowrap">
        {b.name}
      </span>
    </div>
  )
}

export default function Brands() {
  const doubled = [...brands, ...brands]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#F7F6F4] border-y border-[#ebebeb] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-5 px-6 md:px-20 pt-10 pb-5">
        <div className="flex-1 h-px bg-[#e5e5e5] max-w-[200px]" />
        <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#bbb] whitespace-nowrap">
          Marques partenaires
        </span>
        <div className="flex-1 h-px bg-[#e5e5e5] max-w-[200px]" />
      </div>

      {/* Marquee */}
      <div className="mq-mask pb-10">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((b, i) => (
            <BrandPill key={`${b.name}-${i}`} b={b} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
