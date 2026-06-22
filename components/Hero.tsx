'use client'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Shield, HardHat, ClipboardList, FileText, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

/* Votre vraie photo intérieur */
const HERO_BG = '/hero/pexels-artbovich-6970052.jpg'
const KITCHEN_WIDE = '/kitchen/kitchen-wide.jpg'

const HEADLINE = [
  { text: 'Votre',     accent: false },
  { text: 'expert',    accent: false },
  { text: 'chauffage', accent: true  },
  { text: '&',         accent: true  },
  { text: 'finitions', accent: false },
  { text: 'intérieures', accent: false },
]

/* Segments du titre avec couleurs — utilisé par le typewriter */
const TITLE_SEGMENTS = [
  { text: 'Votre expert ', accent: false },
  { text: 'chauffage & ', accent: true  },
  { text: 'finitions intérieures', accent: false },
]
const TITLE_CHARS = TITLE_SEGMENTS.flatMap(seg =>
  [...seg.text].map(char => ({ char, accent: seg.accent }))
)

const stats = [
  { to: 10,  suffix: '+',    label: "Ans d'expérience" },
  { to: 200, suffix: '+',    label: 'Chantiers réalisés' },
  { to: 10,  suffix: ' ans', label: 'Garantie décennale' },
]

const badges = [
  { icon: Shield,        text: 'Garantie décennale' },
  { icon: HardHat,       text: 'Patron sur chantier' },
  { icon: ClipboardList, text: 'Devis 100 % gratuit' },
]

/* ── Compteur animé — démarre 2s après le chargement (loader = 1.8s) ── */
function Counter({ to, suffix, startDelay = 2200 }: { to: number; suffix: string; startDelay?: number }) {
  const [val, setVal] = useState(0)
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive(true), startDelay)
    return () => clearTimeout(t)
  }, [inView, startDelay])

  useEffect(() => {
    if (!active) return
    const duration = 2000
    const start = performance.now()
    const tick = (now: number) => {
      const pct  = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - pct, 4)
      setVal(Math.round(ease * to))
      if (pct < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, to])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-[38px] font-bold tracking-tight text-white leading-none mb-1.5">
        {val}<span className="text-orange">{suffix}</span>
      </div>
    </motion.div>
  )
}

/* ── Typewriter — révèle les caractères un par un ── */
function TypewriterTitle({ startDelay = 400 }: { startDelay?: number }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0
      const id = setInterval(() => {
        i++
        setCount(i)
        if (i >= TITLE_CHARS.length) { clearInterval(id); setDone(true) }
      }, 32)
      return () => clearInterval(id)
    }, startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  return (
    <h1 className="text-[52px] md:text-[68px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.03em] mb-7">
      {TITLE_CHARS.slice(0, count).map((c, i) => (
        <span
          key={i}
          className={c.char === '\n' ? 'block' : (c.accent ? 'text-orange' : 'text-white')}
        >
          {c.char === '\n' ? '' : c.char}
        </span>
      ))}
      {/* Curseur clignotant */}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-[3px] h-[0.75em] bg-orange ml-1 align-middle rounded-full"
        />
      )}
    </h1>
  )
}

/* Rotating circular badge */
function RotatingBadge() {
  const text = 'Devis Gratuit · 24h · Belgique · Garantie · '
  const chars = text.split('')
  const radius = 48
  return (
    <motion.div
      className="relative w-28 h-28 flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full" suppressHydrationWarning>
        {chars.map((c, i) => {
          const angle = (i / chars.length) * Math.PI * 2 - Math.PI / 2
          const x = Math.round((60 + radius * Math.cos(angle)) * 1000) / 1000
          const y = Math.round((60 + radius * Math.sin(angle)) * 1000) / 1000
          const rot = Math.round(((i / chars.length) * 360 + 90) * 1000) / 1000
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="6.8"
              fill="rgba(255,255,255,0.55)"
              fontWeight="600"
              letterSpacing="0.5"
              style={{ fontFamily: 'inherit' }}
              transform={`rotate(${rot}, ${x}, ${y})`}
              suppressHydrationWarning
            >
              {c}
            </text>
          )
        })}
      </svg>
      {/* Centre */}
      <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center shadow-orange z-10">
        <Star size={16} fill="white" strokeWidth={0} className="text-white" />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const kitchenScale   = useTransform(scrollYProgress, [0, 0.6], [1.1, 1.0])
  const kitchenOpacity = useTransform(scrollYProgress, [0, 0.06, 0.65, 0.88], [0, 1, 1, 0])
  const kitchenY       = useTransform(scrollYProgress, [0, 1], [16, -36])
  const skY  = useSpring(kitchenY,     { stiffness: 60, damping: 20 })
  const skSc = useSpring(kitchenScale, { stiffness: 60, damping: 20 })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={heroRef}
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060606]"
    >
      {/* ── Fond animé Ken Burns + traitement sombre/orange ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={HERO_BG}
          alt="Intérieur moderne Ach'Tech"
          fill
          className="object-cover object-center animate-kenburns"
          style={{ filter: 'brightness(0.55) contrast(1.05) saturate(0.75)' }}
          priority
          sizes="100vw"
        />
        {/* Teinture orange — haut gauche */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(135deg, rgba(255,107,26,0.30) 0%, rgba(255,107,26,0.08) 45%, transparent 70%)' }} />
        {/* Noircissement général */}
        <div className="absolute inset-0 bg-black/25" />
        {/* Dégradé gauche → lisibilité texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/78 to-[#060606]/10" />
        {/* Dégradé bas → stats */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/20" />
      </div>

      {/* ── Blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute w-[700px] h-[700px] rounded-full blur-[160px] -top-32 -right-20 animate-blob-1"
             style={{ background: 'rgba(255,107,26,0.08)' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bottom-0 right-1/4 animate-blob-2"
             style={{ background: 'rgba(255,107,26,0.05)' }} />
      </div>

      {/* ── Grid pattern ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018] z-[1]"
           style={{
             backgroundImage:
               'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),' +
               'linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      {/* ── Contenu ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-36 pb-24
                    flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16"
      >
        {/* Colonne gauche */}
        <div className="max-w-2xl flex-1">

          {/* Badge localisation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tag-orange mb-8 inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            Belgique — Wallonie &amp; Bruxelles
          </motion.div>

          {/* Headline typewriter */}
          <TypewriterTitle startDelay={300} />

          {/* Ligne accent */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] rounded-full bg-orange origin-left mb-7"
          />

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6 }}
            className="text-white/40 text-[16px] font-light leading-[1.7] max-w-sm mb-10"
          >
            Du chauffage à la salle de bain — patron sur chantier, garantie décennale, devis gratuit sous 24 h.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-16"
          >
            <motion.a href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 14px 40px rgba(255,107,26,.45)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-orange hover:bg-orange-dark text-white
                         text-[13px] font-semibold px-7 py-4 rounded-2xl shadow-orange
                         transition-colors duration-200">
              <FileText size={14} /> Demander un devis gratuit
            </motion.a>
            <motion.a href="#realisations"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-white/60 text-[13px] font-medium
                         px-7 py-4 rounded-2xl border border-white/12
                         hover:border-white/30 hover:text-white
                         transition-all duration-200">
              Voir nos réalisations
            </motion.a>
          </motion.div>

          {/* Stats — compteurs animés avec délai */}
          <div className="flex gap-10 pt-8 border-t border-white/[0.07]">
            {stats.map((k, i) => (
              <div key={k.label}>
                <Counter to={k.to} suffix={k.suffix} startDelay={2000 + i * 180} />
                <div className="text-[10px] text-white/25 tracking-[0.08em] uppercase font-medium">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col gap-4 w-72 flex-shrink-0 items-end"
        >
          {/* Badge rotatif */}
          <div className="self-end mb-2">
            <RotatingBadge />
          </div>

          {/* Photo cuisine */}
          <motion.div
            style={{ opacity: kitchenOpacity, y: skY, scale: skSc }}
            className="relative w-full h-52 rounded-3xl overflow-hidden
                       shadow-[0_32px_64px_rgba(0,0,0,0.65)]
                       border border-white/[0.08]"
          >
            <Image
              src={KITCHEN_WIDE}
              alt="Réalisation Ach'Tech"
              fill className="object-cover"
              sizes="300px" priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] font-semibold text-white/70
                            bg-black/50 backdrop-blur-sm border border-white/10
                            rounded-full px-2.5 py-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              Cuisine réalisée
            </div>
          </motion.div>

          {/* Badges garanties */}
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: -5 }}
                className="w-full glass-dark rounded-2xl p-4 flex items-center gap-4
                           shadow-glass cursor-default transition-all duration-300 premium-card
                           hover:border-orange/25"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(255,107,26,0.10)', border: '1px solid rgba(255,107,26,0.15)' }}>
                  <Icon size={16} className="text-orange" strokeWidth={1.8} />
                </div>
                <span className="text-[13px] font-medium text-white/70">{b.text}</span>
              </motion.div>
            )
          })}

          {/* Réponse 24h card */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full glass-dark rounded-2xl p-5 shadow-glass"
            style={{ borderColor: 'rgba(255,107,26,0.12)' }}
          >
            <div className="text-[9px] text-white/20 uppercase tracking-[.18em] mb-2 font-bold">Réponse garantie</div>
            <div className="text-[28px] font-bold text-white leading-none mb-1">
              &lt; <span className="text-orange">24h</span>
            </div>
            <div className="text-[11px] text-white/35 font-light">Après votre demande de devis</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-full h-1/2 bg-orange"
          />
        </div>
        <span className="text-[8px] tracking-[3px] text-white/18 uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
