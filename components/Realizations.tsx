'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, MouseEvent } from 'react'

const projects = [
  {
    cat: 'Chauffage', city: 'Liège', title: 'Chaudière à condensation',
    desc: 'Remplacement complet — nouvelle chaudière gaz haute efficacité, raccordement et mise en service.',
    detail: 'Maison unifamiliale',
    /* TODO: replace with real project photo */
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Salle de bain', city: 'Namur', title: 'Salle de bain clé en main',
    desc: "Douche à l'italienne, meuble vasque suspendu, robinetterie design — réalisation de A à Z.",
    detail: 'Appartement 85 m²',
    /* TODO: replace with real project photo */
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Cuisine', city: 'Bruxelles', title: 'Cuisine avec ilot central',
    desc: 'Aménagement complet, plomberie encastrée, évier et robinetterie intégrés dans l\'ilot.',
    detail: 'Maison de ville',
    /* TODO: replace with real project photo */
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Finitions', city: 'Charleroi', title: 'Parachèvement appartement',
    desc: 'Enduits, peintures, pose de carrelage et parquet — livraison clé en main dans les délais.',
    detail: 'Appartement 110 m²',
    /* TODO: replace with real project photo */
    img: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Chauffage', city: 'Mons', title: 'Pompe à chaleur air/eau',
    desc: "Installation complète d'une PAC air/eau couplée au plancher chauffant. Économies jusqu'à 60 %.",
    detail: 'Villa 4 chambres',
    /* TODO: replace with real project photo */
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Sanitaires', city: 'Louvain', title: 'Rénovation plomberie complète',
    desc: 'Remplacement intégral des canalisations, installation de nouveaux équipements sanitaires.',
    detail: 'Maison 4 chambres',
    /* TODO: replace with real project photo */
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80&auto=format&fit=crop',
  },
]

function TiltCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotX = useSpring(useTransform(rawY, [-1, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(rawX, [-1, 1], [-12, 12]), { stiffness: 200, damping: 20 })
  const shineX = useMotionValue(50)
  const shineY = useMotionValue(50)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  * 2 - 1
    const y = (e.clientY - r.top)  / r.height * 2 - 1
    rawX.set(x); rawY.set(y)
    shineX.set(((e.clientX - r.left) / r.width)  * 100)
    shineY.set(((e.clientY - r.top)  / r.height) * 100)
  }

  function onLeave() { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (i % 3) * 0.12, duration: 0.6, ease: 'easeOut' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      className="rounded-2xl overflow-hidden relative cursor-default group"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(rawX, [-1, 1], ['-8px', '8px']),
            y: useTransform(rawY, [-1, 1], ['-8px', '8px']),
            scale: 1.1,
          }}
        >
          <Image
            src={p.img}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
            loading="lazy"
          />
        </motion.div>

        {/* Gradient overlay always */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />

        {/* Category tag */}
        <div className="absolute top-3 left-3 z-20 text-[10px] font-bold tracking-[.5px] uppercase text-white bg-orange/90 backdrop-blur px-3 py-1 rounded-full">
          {p.cat}
        </div>

        {/* Always-visible info */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
          <h4 className="text-white font-semibold text-[15px] leading-tight mb-1 tracking-tight">{p.title}</h4>
          <p className="text-white/40 text-[12px] font-light flex items-center gap-1">
            <span className="text-orange text-[11px]">📍</span>{p.city}
          </p>
        </div>

        {/* Reveal panel on hover */}
        <motion.div
          initial={false}
          className="absolute inset-0 z-30 flex flex-col justify-end p-5 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(8,8,8,.97) 0%, rgba(8,8,8,.8) 55%, transparent 100%)',
            translateY: '100%',
          }}
          whileHover={{ translateY: '0%' }}
        >
          <h4 className="text-white font-semibold text-[15px] mb-2 tracking-tight">{p.title}</h4>
          <p className="text-white/55 text-[12.5px] font-light leading-relaxed mb-3">{p.desc}</p>
          <p className="text-white/30 text-[11px] flex items-center gap-1 mb-3">
            <span className="text-orange">📍</span>{p.city} — {p.detail}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-orange px-3 py-1.5 rounded-lg w-fit">
            ➔ Voir le projet
          </span>
        </motion.div>

        {/* Shine */}
        <motion.div
          className="absolute inset-0 z-25 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${shineX.get()}% ${shineY.get()}%, rgba(255,255,255,.15) 0%, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Realizations() {
  return (
    <section id="realisations" className="py-28 px-8 md:px-20 bg-[#0C0C0C]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.4px] uppercase text-orange-light border border-orange/25 bg-orange/10 px-3.5 py-1 rounded-full mb-4">
          📷 Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3 leading-tight">Nos réalisations</h2>
        <p className="text-white/40 text-base font-light leading-relaxed max-w-lg mx-auto">
          Un aperçu de chantiers récents — chauffage, salles de bain, cuisines et finitions intérieures.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p, i) => <TiltCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  )
}
