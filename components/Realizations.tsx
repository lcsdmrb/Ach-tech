'use client'
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion'
import Image from 'next/image'
import { useRef, MouseEvent, useState, useEffect, useCallback } from 'react'

/* ─── Données projets ────────────────────────────────────────────────────── */
// TODO: remplacer les URLs picsum par de vraies photos de chantier
const projects = [
  {
    cat: 'Chauffage', city: 'Liège', title: 'Chaudière à condensation',
    desc: 'Remplacement complet — nouvelle chaudière gaz haute efficacité, raccordement et mise en service.',
    detail: 'Maison unifamiliale',
    cover: 'https://picsum.photos/seed/heat1/800/600',
    images: [
      'https://picsum.photos/seed/heat1a/1200/800',
      'https://picsum.photos/seed/heat1b/1200/800',
      'https://picsum.photos/seed/heat1c/1200/800',
    ],
  },
  {
    cat: 'Salle de bain', city: 'Namur', title: 'Salle de bain clé en main',
    desc: "Douche à l'italienne, meuble vasque suspendu, robinetterie design — réalisation de A à Z.",
    detail: 'Appartement 85 m²',
    cover: 'https://picsum.photos/seed/bath1/800/600',
    images: [
      'https://picsum.photos/seed/bath1a/1200/800',
      'https://picsum.photos/seed/bath1b/1200/800',
      'https://picsum.photos/seed/bath1c/1200/800',
      'https://picsum.photos/seed/bath1d/1200/800',
    ],
  },
  {
    cat: 'Cuisine', city: 'Bruxelles', title: 'Cuisine avec îlot central',
    desc: "Aménagement complet, plomberie encastrée, évier et robinetterie intégrés dans l'îlot.",
    detail: 'Maison de ville',
    cover: 'https://picsum.photos/seed/kitchen1/800/600',
    images: [
      'https://picsum.photos/seed/kitchen1a/1200/800',
      'https://picsum.photos/seed/kitchen1b/1200/800',
      'https://picsum.photos/seed/kitchen1c/1200/800',
    ],
  },
  {
    cat: 'Finitions', city: 'Charleroi', title: 'Parachèvement appartement',
    desc: 'Enduits, peintures, pose de carrelage et parquet — livraison clé en main dans les délais.',
    detail: 'Appartement 110 m²',
    cover: 'https://picsum.photos/seed/finish1/800/600',
    images: [
      'https://picsum.photos/seed/finish1a/1200/800',
      'https://picsum.photos/seed/finish1b/1200/800',
      'https://picsum.photos/seed/finish1c/1200/800',
    ],
  },
  {
    cat: 'Chauffage', city: 'Mons', title: 'Pompe à chaleur air/eau',
    desc: "Installation d'une PAC air/eau couplée au plancher chauffant. Économies jusqu'à 60 %.",
    detail: 'Villa 4 chambres',
    cover: 'https://picsum.photos/seed/pac1/800/600',
    images: [
      'https://picsum.photos/seed/pac1a/1200/800',
      'https://picsum.photos/seed/pac1b/1200/800',
      'https://picsum.photos/seed/pac1c/1200/800',
    ],
  },
  {
    cat: 'Sanitaires', city: 'Louvain', title: 'Rénovation plomberie complète',
    desc: 'Remplacement intégral des canalisations, installation de nouveaux équipements sanitaires.',
    detail: 'Maison 4 chambres',
    cover: 'https://picsum.photos/seed/plumb1/800/600',
    images: [
      'https://picsum.photos/seed/plumb1a/1200/800',
      'https://picsum.photos/seed/plumb1b/1200/800',
      'https://picsum.photos/seed/plumb1c/1200/800',
    ],
  },
]

type Project = typeof projects[0]

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const total = project.images.length

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, prev, next])

  // Lock scroll
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie — ${project.title}`}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-2xl" />

      {/* Modal card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl flex flex-col rounded-2xl overflow-hidden
                   bg-[#111]/95 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,.8)]"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Image area ── */}
        <div className="relative w-full aspect-video bg-black overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={project.images[idx]}
                alt={`${project.title} — photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width:1280px) 100vw, 1280px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Image précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                           w-11 h-11 rounded-full bg-black/55 backdrop-blur-sm
                           border border-white/10 text-white text-lg
                           flex items-center justify-center
                           hover:bg-orange hover:border-orange/50
                           transition-all duration-200 active:scale-95"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Image suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                           w-11 h-11 rounded-full bg-black/55 backdrop-blur-sm
                           border border-white/10 text-white text-lg
                           flex items-center justify-center
                           hover:bg-orange hover:border-orange/50
                           transition-all duration-200 active:scale-95"
              >
                ›
              </button>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Fermer la galerie"
            className="absolute top-3 right-3 z-10
                       w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm
                       border border-white/10 text-white/70
                       flex items-center justify-center text-sm
                       hover:bg-orange hover:text-white hover:border-orange/50
                       transition-all duration-200"
          >
            ✕
          </button>

          {/* Counter top-left */}
          <div className="absolute top-3 left-3 z-10 text-[11px] font-semibold text-white/60
                          bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
            {idx + 1} / {total}
          </div>

          {/* Dots bottom */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-250 ${
                    i === idx ? 'w-5 bg-orange' : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Info bar ── */}
        <div className="px-6 py-4 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9.5px] font-bold tracking-[2px] uppercase text-orange">{project.cat}</span>
              <span className="text-white/15 text-xs">·</span>
              <span className="text-[9.5px] text-white/35 tracking-wide">📍 {project.city}</span>
            </div>
            <h3 className="text-white font-semibold text-[17px] leading-snug truncate">{project.title}</h3>
            <p className="text-white/40 text-[13px] font-light mt-1 leading-relaxed line-clamp-2">{project.desc}</p>
          </div>
          <div className="text-[11px] text-white/25 flex-shrink-0 text-right pt-1">{project.detail}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── TiltCard ───────────────────────────────────────────────────────────── */
function TiltCard({ p, i, onClick }: { p: Project; i: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotX = useSpring(useTransform(rawY, [-1, 1], [8, -8]),  { stiffness: 200, damping: 22 })
  const rotY = useSpring(useTransform(rawX, [-1, 1], [-10, 10]), { stiffness: 200, damping: 22 })
  const imgX = useTransform(rawX, [-1, 1], ['-6px', '6px'])
  const imgY = useTransform(rawY, [-1, 1], ['-6px', '6px'])
  const shineX       = useMotionValue(50)
  const shineY       = useMotionValue(50)
  const shineOpacity = useMotionValue(0)
  const shineBg = useTransform(
    [shineX, shineY],
    (latest: number[]) =>
      `radial-gradient(circle at ${latest[0]}% ${latest[1]}%, rgba(255,255,255,.14) 0%, transparent 60%)`
  )

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  * 2 - 1
    const y = (e.clientY - r.top)  / r.height * 2 - 1
    rawX.set(x); rawY.set(y)
    shineX.set(((e.clientX - r.left) / r.width)  * 100)
    shineY.set(((e.clientY - r.top)  / r.height) * 100)
    shineOpacity.set(1)
  }

  function onLeave() {
    rawX.set(0); rawY.set(0)
    shineOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (i % 3) * 0.12, duration: 0.6, ease: 'easeOut' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      className="rounded-2xl overflow-hidden relative cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Voir le projet : ${p.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ x: imgX, y: imgY, scale: 1.12 }}>
          <Image
            src={p.cover}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
            loading="lazy"
          />
        </motion.div>

        {/* Permanent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-10" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-20 text-[10px] font-bold tracking-wide uppercase
                        text-white bg-orange/90 backdrop-blur px-3 py-1 rounded-full">
          {p.cat}
        </div>

        {/* Photos count badge */}
        <div className="absolute top-3 right-3 z-20 text-[10px] font-semibold text-white/70
                        bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
          📷 {p.images.length}
        </div>

        {/* Default info */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5
                        transition-opacity duration-300 group-hover:opacity-0">
          <h4 className="text-white font-semibold text-[15px] leading-tight mb-1">{p.title}</h4>
          <p className="text-white/40 text-[12px] flex items-center gap-1">
            <span className="text-orange text-[11px]">📍</span>{p.city}
          </p>
        </div>

        {/* Hover reveal */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-5 pointer-events-none
                        bg-gradient-to-t from-[rgba(8,8,8,.97)] via-[rgba(8,8,8,.78)] to-transparent
                        translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-out">
          <h4 className="text-white font-semibold text-[15px] mb-2">{p.title}</h4>
          <p className="text-white/55 text-[12.5px] font-light leading-relaxed mb-2">{p.desc}</p>
          <p className="text-white/30 text-[11px] flex items-center gap-1 mb-3">
            <span className="text-orange">📍</span>{p.city} — {p.detail}
          </p>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-white
                           bg-orange px-3.5 py-1.5 rounded-lg w-fit">
            ➔ Voir les {p.images.length} photos
          </span>
        </div>

        {/* Cursor shine */}
        <motion.div
          className="absolute inset-0 z-[25] pointer-events-none rounded-2xl"
          style={{ background: shineBg, opacity: shineOpacity }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Section Réalisations ───────────────────────────────────────────────── */
export default function Realizations() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <section id="realisations" className="py-28 px-8 md:px-20 bg-[#0C0C0C]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.4px]
                           uppercase text-orange-light border border-orange/25 bg-orange/10
                           px-3.5 py-1 rounded-full mb-4">
            📷 Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3 leading-tight">
            Nos réalisations
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-lg mx-auto">
            Un aperçu de chantiers récents — chauffage, salles de bain, cuisines et finitions intérieures.
            <span className="block mt-1 text-white/25 text-sm">Cliquez sur une carte pour voir la galerie photos.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <TiltCard key={p.title} p={p} i={i} onClick={() => setSelected(p)} />
          ))}
        </div>
      </section>

      {/* ── Lightbox portal ── */}
      <AnimatePresence>
        {selected && (
          <Lightbox project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
