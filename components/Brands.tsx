'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const brands = [
  { name: 'Viessmann',      domain: 'viessmann.com' },
  { name: 'Grohe',          domain: 'grohe.com' },
  { name: 'Buderus',        domain: 'buderus.com' },
  { name: 'Vaillant',       domain: 'vaillant.com' },
  { name: 'Ideal Standard', domain: 'idealstandard.com' },
  { name: 'Porcelanosa',    domain: 'porcelanosa.com' },
  { name: 'Roca',           domain: 'roca.com' },
  { name: 'Daikin',         domain: 'daikin.com' },
  { name: 'Atlantic',       domain: 'atlantic-comfort.com' },
  { name: 'De Dietrich',    domain: 'dedietrich-thermique.fr' },
]

function BrandItem({ b }: { b: typeof brands[0] }) {
  return (
    <div className="flex items-center gap-3 px-7 py-3.5 mx-2 border border-[#e8e8e8] rounded-xl bg-[#fafafa] hover:border-orange/25 hover:bg-white hover:shadow-card transition-all duration-200 cursor-default flex-shrink-0 group">
      <div className="relative w-24 h-7 flex items-center justify-center">
        <Image
          src={`https://logo.clearbit.com/${b.domain}`}
          alt={b.name}
          fill
          className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          /* TODO: replace with local logo files in /public/brands/ for production */
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          sizes="96px"
        />
      </div>
      <span className="text-[13px] font-semibold text-[#aaa] group-hover:text-[#555] transition-colors duration-200 whitespace-nowrap">{b.name}</span>
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
      className="bg-white border-y border-[#f0eeec] overflow-hidden py-0"
    >
      {/* Header */}
      <div className="flex items-center gap-5 px-20 pt-9 pb-5">
        <div className="flex-1 h-px bg-[#ececec] max-w-[180px]" />
        <span className="text-[10px] font-600 tracking-[2px] uppercase text-[#ccc] whitespace-nowrap">Marques partenaires</span>
        <div className="flex-1 h-px bg-[#ececec] max-w-[180px]" />
      </div>

      {/* Marquee */}
      <div className="marquee-mask pb-9">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        >
          {doubled.map((b, i) => (
            <BrandItem key={`${b.name}-${i}`} b={b} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
