'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#accueil',      label: 'Accueil' },
  { href: '#valeurs',      label: 'Valeurs' },
  { href: '#services',     label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed top-4 left-4 right-4 z-50
        flex items-center justify-between
        px-6 h-16 rounded-2xl
        transition-all duration-500
        ${stuck
          ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,.4)]'
          : 'bg-transparent border border-transparent'}
      `}
    >
      {/* Logo */}
      <Link href="#accueil" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Ach'Tech"
          width={44}
          height={44}
          className="object-contain"
          style={{ mixBlendMode: 'screen' }}
          /* TODO: replace with real logo file at /public/logo.png */
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          priority
        />
        <span className="text-lg font-semibold tracking-tight text-white">
          Ach<span className="text-orange">&#39;Tech</span>
        </span>
      </Link>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
          >
            <Link
              href={l.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="text-sm font-semibold text-white bg-orange hover:bg-orange-dark px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-orange"
      >
        Devis gratuit
      </motion.a>
    </motion.nav>
  )
}
