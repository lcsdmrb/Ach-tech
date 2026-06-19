'use client'
import { motion } from 'framer-motion'

const TITLE_WORDS = ['Votre', 'artisan', 'chauffage', '&', 'finitions', 'intérieures']

const kpis = [
  { num: '10+',    label: "Ans d'expérience" },
  { num: '200+',   label: 'Chantiers réalisés' },
  { num: '10 ans', label: 'Garantie décennale' },
]

const floatCards = [
  { icon: '🛡️', label: 'Protection',     val: 'Garantie décennale' },
  { icon: '👷', label: 'Présence',        val: 'Patron sur chantier' },
  { icon: '📋', label: 'Sans engagement', val: 'Devis 100 % gratuit' },
  { icon: '🏢', label: 'Officiel',        val: 'Entreprise déclarée BE' },
]

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-[#0C0C0C]">

      {/* ── Animated blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-orange/10 blur-[120px] -top-32 -right-32 animate-blob-slow" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-light/8 blur-[100px] bottom-0 right-1/4 animate-blob-slower" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-orange/6  blur-[80px]  top-1/2 left-10 animate-blob-slowest" />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.028]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex items-center justify-between w-full px-8 md:px-20 pt-32 pb-20 gap-12">

        {/* Left */}
        <div className="max-w-2xl flex-1">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-orange/90 border border-orange/25 bg-orange/10 px-4 py-1.5 rounded-full mb-8"
          >
            📍 Belgique — Wallonie &amp; Bruxelles
          </motion.div>

          {/* Title — word by word stagger */}
          <h1 className="text-5xl md:text-7xl font-semibold leading-[1.06] tracking-tight mb-6">
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.55, ease: 'easeOut' }}
                className={`inline-block mr-[.3em] ${word === 'chauffage' || word === '&' ? 'text-orange' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
            className="w-12 h-[3px] rounded-full bg-orange origin-left mb-8"
          />

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-white/45 text-lg font-light leading-relaxed max-w-lg mb-10"
          >
            Du chauffage à la salle de bain — le patron sur chantier, garantie décennale, devis gratuit sous 24h.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(232,90,10,.45)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-orange text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-orange transition-colors hover:bg-orange-dark"
            >
              📋 Demander un devis
            </motion.a>
            <motion.a
              href="#realisations"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-white text-sm font-semibold px-7 py-3.5 rounded-xl border border-white/25 hover:border-white/50 hover:bg-white/5 transition-all"
            >
              📷 Réalisations
            </motion.a>
          </motion.div>

          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="flex gap-12 pt-8 border-t border-white/8"
          >
            {kpis.map((k) => (
              <div key={k.label}>
                <div className="text-4xl font-bold tracking-tight text-white leading-none mb-1.5">
                  {k.num.replace(/(\+|ans)/, '')}<span className="text-orange text-2xl">{k.num.match(/\+|ans/)?.[0]}</span>
                </div>
                <div className="text-xs text-white/30 font-normal">{k.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — floating glass cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
          className="hidden lg:flex flex-col gap-4 w-72 flex-shrink-0"
        >
          {floatCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, x: -4 }}
              className="glass rounded-2xl p-4 flex items-center gap-4 shadow-glass cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-orange/15 flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
              <div>
                <div className="text-[10px] text-white/35 uppercase tracking-widest mb-0.5">{c.label}</div>
                <div className="text-sm font-semibold text-white">{c.val}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 border border-white/20 rounded-full relative">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-2 bg-orange rounded-full"
          />
        </div>
        <span className="text-[9px] tracking-[3px] text-white/25 uppercase">Défiler</span>
      </motion.div>
    </section>
  )
}
