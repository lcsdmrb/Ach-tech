'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const WORDS = ['Votre', 'expert', 'chauffage', '&', 'finitions', 'intérieures']
const ORANGE_IDX = [2, 3]

const badges = [
  { icon: '🛡️', text: 'Garantie décennale' },
  { icon: '👷', text: 'Patron sur chantier' },
  { icon: '📋', text: 'Devis 100 % gratuit' },
]

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">

      {/* Fond image placeholder */}
      {/* TODO: remplacer par vraie photo de chantier */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/achtech-hero/1920/1080"
          alt="Fond chantier"
          fill
          className="object-cover object-center opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[640px] h-[640px] rounded-full blur-[130px] top-[-10%] right-[-5%] animate-blob-1"
             style={{ background: 'rgba(255,107,26,0.10)' }} />
        <div className="absolute w-[480px] h-[480px] rounded-full blur-[110px] bottom-[-5%] right-[20%] animate-blob-2"
             style={{ background: 'rgba(255,140,71,0.07)' }} />
        <div className="absolute w-[320px] h-[320px] rounded-full blur-[90px] top-[40%] left-[5%] animate-blob-3"
             style={{ background: 'rgba(255,107,26,0.06)' }} />
      </div>

      {/* Grille */}
      <div className="absolute inset-0 pointer-events-none opacity-[.026]"
           style={{
             backgroundImage:
               'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),' +
               'linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
             backgroundSize: '72px 72px',
           }} />

      {/* Contenu */}
      <div className="relative z-10 w-full px-6 md:px-20 pt-32 pb-20
                      flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Gauche */}
        <div className="max-w-2xl flex-1">

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="tag-orange mb-8">
            📍 Belgique — Wallonie &amp; Bruxelles
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.06] tracking-tight mb-6">
            {WORDS.map((w, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.055, duration: 0.55, ease: 'easeOut' }}
                className={`inline-block mr-[.28em] ${ORANGE_IDX.includes(i) ? 'text-orange' : 'text-white'}`}>
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="w-14 h-[3px] rounded-full bg-orange origin-left mb-8" />

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="text-white/45 text-[17px] font-light leading-relaxed max-w-md mb-10">
            Du chauffage à la salle de bain — patron sur chantier, garantie décennale, devis gratuit sous 24 h.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-16">
            <motion.a href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(255,107,26,.45)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-orange hover:bg-orange-dark
                         text-white text-sm font-semibold px-7 py-3.5 rounded-xl
                         shadow-orange transition-colors duration-200">
              📋 Demander un devis
            </motion.a>
            <motion.a href="#realisations"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-white text-sm font-semibold
                         px-7 py-3.5 rounded-xl border border-white/25
                         hover:border-white/50 hover:bg-white/5 transition-all duration-200">
              📷 Nos réalisations
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.6 }}
            className="flex gap-10 pt-8 border-t border-white/10">
            {[
              { n: '10',   s: '+',   l: "Ans d'expérience" },
              { n: '200',  s: '+',   l: 'Chantiers réalisés' },
              { n: '10',   s: ' ans', l: 'Garantie décennale' },
            ].map(k => (
              <div key={k.l}>
                <div className="text-[34px] font-bold tracking-tight text-white leading-none mb-1">
                  {k.n}<span className="text-orange text-xl font-semibold ml-0.5">{k.s}</span>
                </div>
                <div className="text-[11px] text-white/30">{k.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Droite — badges flottants */}
        <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.72, duration: 0.7 }}
          className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">
          {badges.map((b, i) => (
            <motion.div key={b.text}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, x: -4 }}
              className="glass-dark rounded-2xl p-4 flex items-center gap-4 shadow-glass cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                   style={{ background: 'rgba(255,107,26,0.12)' }}>
                {b.icon}
              </div>
              <span className="text-[14px] font-medium text-white/80">{b.text}</span>
            </motion.div>
          ))}

          <motion.div animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-dark rounded-2xl p-5 shadow-glass"
            style={{ borderColor: 'rgba(255,107,26,0.15)' }}>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Réponse garantie</div>
            <div className="text-2xl font-bold text-white mb-1">
              &lt; <span className="text-orange">24h</span>
            </div>
            <div className="text-[12px] text-white/40 font-light">Après votre demande de devis</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-5 h-8 border border-white/20 rounded-full relative">
          <motion.div animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-2 bg-orange rounded-full" />
        </div>
        <span className="text-[9px] tracking-[3px] text-white/20 uppercase">Défiler</span>
      </motion.div>
    </section>
  )
}
