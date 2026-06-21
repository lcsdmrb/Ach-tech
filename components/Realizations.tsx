'use client'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MapPin, Images, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { realisations } from '@/data/realisations'

type Project = typeof realisations[0]

/* ── Dimensions des cartes ── */
const CARD_W = 240
const CARD_H = 300

/* ── Positions finales de l'éventail ── */
const FAN: { x: number; y: number; rotate: number; scale: number }[] = [
  { x: -490, y:  18,  rotate: -20, scale: 0.91 },
  { x: -295, y: -10,  rotate: -11, scale: 0.94 },
  { x:  -90, y: -24,  rotate:  -3, scale: 0.97 },
  { x:  108, y: -22,  rotate:   4, scale: 0.97 },
  { x:  305, y:  -6,  rotate:  12, scale: 0.94 },
  { x:  492, y:  22,  rotate:  20, scale: 0.91 },
]

/* ─── Lightbox ────────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const total = project.images.length
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, prev, next])

  useEffect(() => {
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = orig }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose} role="dialog" aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-2xl" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden
                   bg-[#111]/95 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,.8)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-black overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }} className="absolute inset-0">
              <Image src={project.images[idx]} alt={`${project.title} ${idx + 1}`}
                fill className="object-cover" sizes="100vw" priority />
            </motion.div>
          </AnimatePresence>
          {total > 1 && (<>
            <button onClick={prev} aria-label="Précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                         bg-black/60 border border-white/10 text-white flex items-center justify-center
                         hover:bg-orange transition-all duration-200">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                         bg-black/60 border border-white/10 text-white flex items-center justify-center
                         hover:bg-orange transition-all duration-200">
              <ChevronRight size={16} />
            </button>
          </>)}
          <button onClick={onClose} aria-label="Fermer"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10
                       text-white/70 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-200">
            <X size={14} />
          </button>
          <div className="absolute top-3 left-3 z-10 text-[11px] font-semibold text-white/60
                          bg-black/50 border border-white/10 rounded-full px-3 py-1">
            {idx + 1} / {total}
          </div>
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {project.images.map((_, ii) => (
                <button key={ii} onClick={() => setIdx(ii)}
                  className={`h-1.5 rounded-full transition-all duration-200
                    ${ii === idx ? 'w-5 bg-orange' : 'w-1.5 bg-white/35'}`} />
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-4 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9.5px] font-bold tracking-[2px] uppercase text-orange">{project.cat}</span>
              <span className="text-white/15">·</span>
              <span className="flex items-center gap-1 text-[9.5px] text-white/35">
                <MapPin size={9} className="text-orange/60" />{project.city}
              </span>
            </div>
            <h3 className="text-white font-semibold text-[16px] truncate">{project.title}</h3>
            <p className="text-white/40 text-[12px] font-light mt-1 leading-relaxed line-clamp-2">{project.desc}</p>
          </div>
          <div className="text-[11px] text-white/25 flex-shrink-0 pt-1">{project.detail}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Carte éventail ──────────────────────────────────────────────────────── */
function FanCard({
  p, i, deployed, onClick,
}: {
  p: Project; i: number; deployed: boolean; onClick: () => void
}) {
  const pos = FAN[i] ?? { x: 0, y: 0, rotate: 0, scale: 1 }

  /* Position de départ : cartes légèrement en éventail serré */
  const startX = (i - 2.5) * 6
  const startY = Math.abs(i - 2.5) * 2
  const startR = (i - 2.5) * 1.2

  return (
    <motion.div
      onClick={onClick}
      initial={{ x: startX, y: startY, rotate: startR, scale: 1 }}
      animate={deployed ? {
        x: pos.x - CARD_W / 2,
        y: pos.y - CARD_H / 2,
        rotate: pos.rotate,
        scale: pos.scale,
      } : {
        x: startX - CARD_W / 2,
        y: startY - CARD_H / 2,
        rotate: startR,
        scale: 1,
      }}
      transition={{
        delay: deployed ? i * 0.07 : (realisations.length - i) * 0.03,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: (deployed ? pos.scale : 1) * 1.08,
        zIndex: 50,
        transition: { duration: 0.2 },
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: CARD_W,
        height: CARD_H,
        zIndex: deployed ? realisations.length - i : i,
      }}
      className="rounded-2xl overflow-hidden cursor-pointer group
                 shadow-[0_16px_48px_rgba(0,0,0,0.28)] border border-black/8"
      role="button" tabIndex={0}
      aria-label={`Voir : ${p.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
    >
      <Image src={p.cover} alt={p.title} fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="260px" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5 z-10" />
      <div className="absolute top-3 left-3 z-20 text-[9px] font-bold tracking-wide uppercase
                      text-white bg-orange/90 px-2.5 py-1 rounded-full">{p.cat}</div>
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 text-[9px] text-white/70
                      bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2 py-0.5">
        <Images size={8} /> {p.images.length}
      </div>
      {/* Info par défaut */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3.5 group-hover:opacity-0 transition-opacity duration-200">
        <h4 className="text-white font-semibold text-[12px] leading-tight mb-0.5">{p.title}</h4>
        <p className="text-white/40 text-[10px] flex items-center gap-1">
          <MapPin size={8} className="text-orange" />{p.city}
        </p>
      </div>
      {/* Overlay hover */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-3.5
                      bg-gradient-to-t from-[rgba(6,6,6,.96)] via-[rgba(6,6,6,.72)] to-transparent
                      translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <h4 className="text-white font-semibold text-[12px] mb-1">{p.title}</h4>
        <p className="text-white/50 text-[10.5px] font-light leading-relaxed mb-2 line-clamp-2">{p.desc}</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-orange px-2.5 py-1.5 rounded-lg w-fit">
          <Images size={9} /> Voir les photos
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Carte grille (mobile) ──────────────────────────────────────────────── */
function GridCard({ p, i, onClick }: { p: Project; i: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (i % 2) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="rounded-2xl overflow-hidden relative cursor-pointer group h-52"
      role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
    >
      <Image src={p.cover} alt={p.title} fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="50vw" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-10" />
      <div className="absolute top-3 left-3 z-20 text-[9px] font-bold uppercase text-white bg-orange/90 px-2.5 py-0.5 rounded-full">
        {p.cat}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
        <h4 className="text-white font-semibold text-[12px] mb-0.5">{p.title}</h4>
        <p className="text-white/40 text-[10px] flex items-center gap-1">
          <MapPin size={8} className="text-orange" />{p.city}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Section principale ─────────────────────────────────────────────────── */
export default function Realizations() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const fanZoneRef = useRef<HTMLDivElement>(null)

  const [deployed, setDeployed] = useState(false)

  /*
   * Scroll listener direct — se déclenche quand la fanZone est visible à 20%.
   * Plus fiable qu'IntersectionObserver dans cet environnement.
   */
  useEffect(() => {
    if (!isDesktop) return
    const check = () => {
      if (!fanZoneRef.current || deployed) return
      const rect = fanZoneRef.current.getBoundingClientRect()
      const vh   = window.innerHeight
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      if (visible / rect.height >= 0.20) setDeployed(true)
    }
    check() // vérifier immédiatement au cas où déjà visible
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [isDesktop, deployed])

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="realisations"
        style={{ background: '#F5F4F2' }}
        className="py-20 overflow-hidden"
      >
        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6 mb-12"
        >
          <span className="tag-orange mb-5 inline-flex mx-auto"
                style={{ color: '#B05510', borderColor: 'rgba(176,85,16,0.3)', background: 'rgba(176,85,16,0.07)' }}>
            Portfolio
          </span>
          <h2 className="text-4xl md:text-[52px] font-semibold tracking-[-0.03em] leading-[1.06] mb-3"
              style={{ color: '#111' }}>
            Nos réalisations
          </h2>
          <p className="text-[14px] font-light leading-relaxed max-w-xs mx-auto"
             style={{ color: '#999' }}>
            {isDesktop
              ? 'Cliquez sur une carte pour voir la galerie photos.'
              : 'Appuyez sur une réalisation pour voir les photos.'}
          </p>
        </motion.div>

        {isDesktop ? (
          /* ── DESKTOP : éventail ── */
          <div
            ref={fanZoneRef}
            className="relative mx-auto"
            style={{
              height: 420,
              maxWidth: 1300,
            }}
          >
            {realisations.map((p, i) => (
              <FanCard
                key={p.title}
                p={p} i={i}
                deployed={deployed}
                onClick={() => setSelected(p)}
              />
            ))}

            {/* Indication cliquable (visible avant déploiement) */}
            <motion.div
              animate={{ opacity: deployed ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 60 }}
            >
              <div className="text-center mt-64">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-[11px] tracking-[0.1em] font-medium"
                  style={{ color: 'rgba(0,0,0,0.28)' }}
                >
                  ↓ Scrollez pour voir l&apos;éventail
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ── MOBILE : grille ── */
          <div className="grid grid-cols-2 gap-3 px-4">
            {realisations.map((p, i) => (
              <GridCard key={p.title} p={p} i={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
