'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '#accueil',      label: 'Accueil' },
  { href: '#valeurs',      label: 'Valeurs' },
  { href: '#services',     label: 'Services' },
  { href: '#garanties',    label: 'Garanties' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#avis',         label: 'Avis' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-4 left-4 right-4 z-50
          flex items-center justify-between
          px-5 h-[60px] rounded-2xl
          transition-all duration-400
          border
          ${scrolled
            ? 'bg-black/75 backdrop-blur-2xl border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,.6)]'
            : 'bg-black/20 backdrop-blur-md border-white/[0.05]'}
        `}
      >
        {/* Logo transparent */}
        <Link href="#accueil" onClick={closeMenu} className="flex items-center flex-shrink-0">
          <Image
            src="/logo-v2.png"
            alt="Ach'Tech"
            width={74}
            height={58}
            className="object-contain"
            priority
          />
        </Link>

        {/* Séparateur vertical */}
        <div className="hidden md:block w-px h-5 mx-2" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5 flex-1">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.35 }}
            >
              <Link
                href={l.href}
                className="text-[12.5px] font-medium text-white/40 hover:text-white/90
                           transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange
                                 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Droite */}
        <div className="flex items-center gap-3">
          <a href="tel:+32491649196"
             className="hidden lg:flex items-center gap-1.5 text-[11.5px] text-white/30
                        hover:text-white/70 transition-colors duration-200">
            <Phone size={11} strokeWidth={1.8} className="text-orange" />
            0491 64 91 96
          </a>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(255,107,26,.35)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold text-white
                       bg-orange hover:bg-orange-dark px-4 py-2 rounded-xl
                       transition-colors duration-200 shadow-orange"
          >
            <FileText size={12} /> Devis gratuit
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center items-center
                       w-9 h-9 gap-[5px] rounded-xl border border-white/[0.08]
                       hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
              transition={{ duration: 0.22 }}
              className="block w-[18px] h-px bg-white/70 rounded-full origin-center" />
            <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-[18px] h-px bg-white/70 rounded-full" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
              transition={{ duration: 0.22 }}
              className="block w-[18px] h-px bg-white/70 rounded-full origin-center" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[76px] left-4 right-4 z-50 md:hidden
                         bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.08]
                         rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.75)] overflow-hidden"
            >
              <nav className="p-3 flex flex-col gap-0.5">
                {links.map((l, i) => (
                  <motion.div key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link href={l.href} onClick={closeMenu}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl
                                 text-[14.5px] font-medium text-white/55 hover:text-white
                                 hover:bg-white/[0.04] transition-all duration-200 group">
                      {l.label}
                      <ChevronRight size={12} className="text-orange/40 group-hover:text-orange transition-colors duration-200" />
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2 mt-1 border-t border-white/[0.05]">
                  <a href="#contact" onClick={closeMenu}
                     className="flex items-center justify-center gap-2
                                w-full py-3.5 rounded-xl
                                bg-orange hover:bg-orange-dark text-white text-[13.5px] font-semibold
                                transition-colors duration-200 shadow-orange">
                    <FileText size={14} /> Demander un devis gratuit
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

