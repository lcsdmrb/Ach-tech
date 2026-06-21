'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, Mail, MapPin, Share2, Camera, ArrowUpRight } from 'lucide-react'

const serviceLinks = [
  { label: 'Chauffage & Sanitaires', href: '#services' },
  { label: 'Finitions intérieures',  href: '#services' },
  { label: 'Cuisine & Salle de bain', href: '#services' },
]

const navLinks = [
  { label: 'Accueil',      href: '#accueil' },
  { label: 'Nos valeurs',  href: '#valeurs' },
  { label: 'Services',     href: '#services' },
  { label: 'Garanties',    href: '#garanties' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Avis clients', href: '#avis' },
  { label: 'Contact',      href: '#contact' },
]

const contactInfo = [
  { icon: Phone,  val: '0491 64 91 96',        href: 'tel:+32491649196' },
  { icon: Mail,   val: 'info@ach-tech.com',    href: 'mailto:info@ach-tech.com' },
  { icon: MapPin, val: 'Wallonie & Bruxelles', href: undefined },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050505] overflow-hidden">

      {/* Ligne orange top */}
      <div className="absolute top-0 left-0 right-0 h-px"
           style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,107,26,0.18) 25%, rgba(255,107,26,0.38) 50%, rgba(255,107,26,0.18) 75%, transparent 100%)' }} />

      {/* ── CTA band ── */}
      <div className="px-6 md:px-16 lg:px-24 pt-20 pb-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="tag-orange mb-5 inline-flex">Démarrons ensemble</span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-semibold tracking-[-0.03em] leading-[1.04] text-white">
              Un projet en tête ?<br />
              <span className="text-orange">Parlons-en.</span>
            </h2>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, boxShadow: '0 14px 40px rgba(255,107,26,.35)' }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 flex items-center gap-3 bg-orange hover:bg-orange-dark
                       text-white text-[14px] font-semibold px-7 py-4 rounded-2xl
                       transition-colors duration-200 shadow-orange self-end md:self-auto h-fit"
          >
            Demander un devis gratuit
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </div>

      {/* ── Grand nom éditorial ── */}
      <div className="px-6 md:px-16 lg:px-24 pt-14 pb-10 overflow-hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="text-[72px] md:text-[120px] lg:text-[180px] font-bold tracking-[-0.05em] leading-none select-none"
             style={{
               background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               backgroundClip: 'text',
             }}>
          ACH&apos;TECH
        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="px-6 md:px-16 lg:px-24 pt-14 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b"
           style={{ borderColor: 'rgba(255,255,255,0.04)' }}>

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Image
              src="/logo-v2.png"
              alt="Ach'Tech"
              width={160}
              height={124}
              className="object-contain"
            />
          </div>
          <p className="text-[12.5px] leading-[1.7] mb-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Chauffagiste indépendant en Belgique. Votre confort, notre expertise.
          </p>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Facebook"
               className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-orange/30"
               style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Share2 size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
            </a>
            <a href="#" aria-label="Instagram"
               className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-orange/30"
               style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Camera size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h5 className="text-[9.5px] font-bold uppercase tracking-[1.8px] text-white/20 mb-5">Services</h5>
          <ul className="space-y-3">
            {serviceLinks.map(l => (
              <li key={l.label}>
                <a href={l.href} className="text-[12.5px] text-white/35 hover:text-orange transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-[9.5px] font-bold uppercase tracking-[1.8px] text-white/20 mb-5">Navigation</h5>
          <ul className="space-y-3">
            {navLinks.map(l => (
              <li key={l.label}>
                <a href={l.href} className="text-[12.5px] text-white/35 hover:text-orange transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-[9.5px] font-bold uppercase tracking-[1.8px] text-white/20 mb-5">Contact</h5>
          <ul className="space-y-4">
            {contactInfo.map((c) => {
              const Icon = c.icon
              const inner = (
                <div className="flex items-start gap-3 group">
                  <Icon size={13} className="text-orange/50 mt-0.5 flex-shrink-0 group-hover:text-orange transition-colors duration-200" strokeWidth={1.8} />
                  <span className="text-[12.5px] text-white/35 group-hover:text-white/55 transition-colors duration-200 leading-snug">
                    {c.val}
                  </span>
                </div>
              )
              return c.href
                ? <li key={c.val}><a href={c.href}>{inner}</a></li>
                : <li key={c.val}>{inner}</li>
            })}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-6 md:px-16 lg:px-24 py-5 border-t flex flex-wrap items-center justify-between gap-4"
           style={{ borderColor: 'rgba(255,255,255,0.04)' }}>

        {/* Légal */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.16)' }}>
          <span>© {year} Ach&apos;Tech</span>
          <span style={{ color: 'rgba(255,255,255,0.06)' }}>·</span>
          <span>TVA : BE1022.715.243</span>
          <span style={{ color: 'rgba(255,255,255,0.06)' }}>·</span>
          <span>Belgique</span>
        </div>

        {/* Liens légaux RGPD */}
        <div className="flex flex-wrap items-center gap-4 text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <a href="/mentions-legales"
             className="hover:text-orange transition-colors duration-200">
            Mentions légales
          </a>
          <a href="/politique-de-confidentialite"
             className="hover:text-orange transition-colors duration-200">
            Politique de confidentialité
          </a>
          <a href="/cgu"
             className="hover:text-orange transition-colors duration-200">
            CGU
          </a>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('achtech_cookie_consent')
                window.location.reload()
              }
            }}
            className="hover:text-orange transition-colors duration-200 cursor-pointer"
            aria-label="Gérer les préférences cookies"
          >
            Gérer les cookies
          </button>
        </div>
      </div>
    </footer>
  )
}

