'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const links = [
  { href: '#accueil',      label: 'Accueil' },
  { href: '#valeurs',      label: 'Valeurs' },
  { href: '#services',     label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Ferme le menu mobile si on redimensionne vers desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // Lock scroll quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function closeMenu() { setOpen(false) }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`
          fixed top-4 left-4 right-4 z-50
          flex items-center justify-between
          px-5 h-16 rounded-2xl
          transition-all duration-300
          border
          ${scrolled
            ? 'bg-black/65 backdrop-blur-xl border-white/12 shadow-[0_8px_32px_rgba(0,0,0,.5)]'
            : 'bg-black/30 backdrop-blur-md border-white/8 shadow-[0_4px_16px_rgba(0,0,0,.2)]'}
        `}
      >
        {/* ── Logo ── */}
        <Link href="#accueil" onClick={closeMenu} className="flex items-center gap-2.5 flex-shrink-0">
          {/* TODO: place /public/logo.png and replace the div below */}
          <div className="w-9 h-9 rounded-xl bg-orange/15 border border-orange/25 flex items-center justify-center text-orange font-bold text-lg select-none">
            A
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Ach<span className="text-orange">'Tech</span>
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
            >
              <Link
                href={l.href}
                className="text-[13.5px] font-medium text-white/55 hover:text-white
                           transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange
                                 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* ── Right: CTA + hamburger ── */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(232,90,10,.4)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex text-[13px] font-semibold text-white
                       bg-orange hover:bg-orange-dark px-5 py-2.5 rounded-xl
                       transition-colors duration-200 shadow-orange"
          >
            Devis gratuit
          </motion.a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center items-center
                       w-10 h-10 gap-[5px] rounded-xl border border-white/10
                       hover:border-white/25 hover:bg-white/5 transition-all duration-200"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-24 left-4 right-4 z-50 md:hidden
                         bg-black/80 backdrop-blur-2xl border border-white/12
                         rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.6)] overflow-hidden"
            >
              <nav className="p-4 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={l.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl
                                 text-[15px] font-medium text-white/70 hover:text-white
                                 hover:bg-white/5 transition-all duration-200 group"
                    >
                      {l.label}
                      <span className="text-orange/50 group-hover:text-orange transition-colors duration-200 text-xs">›</span>
                    </Link>
                  </motion.div>
                ))}

                {/* CTA mobile */}
                <div className="pt-2 mt-1 border-t border-white/7">
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2
                               w-full py-3.5 rounded-xl
                               bg-orange hover:bg-orange-dark text-white text-[14px] font-semibold
                               transition-colors duration-200 shadow-orange"
                  >
                    📋 Demander un devis gratuit
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
