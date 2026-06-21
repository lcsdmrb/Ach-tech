'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Consent = 'accepted' | 'refused' | null

const STORAGE_KEY = 'achtech_cookie_consent'

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null
    if (stored === 'accepted' || stored === 'refused') {
      setConsent(stored)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
    // Ici vous pourriez activer Google Analytics, etc.
    // window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
  }

  function refuse() {
    localStorage.setItem(STORAGE_KEY, 'refused')
    setConsent('refused')
  }

  // Ne rien afficher si consentement déjà donné ou composant non monté (SSR)
  if (!mounted || consent !== null) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Gestion des cookies"
        className="fixed bottom-0 left-0 right-0 z-[9000] px-4 pb-4 md:px-6"
      >
        <div
          className="max-w-4xl mx-auto rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4"
          style={{
            background: 'rgba(10,10,10,0.97)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 -4px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Texte */}
          <div className="flex-1">
            <p className="text-[13.5px] text-white/65 leading-[1.65]">
              Ce site utilise uniquement des cookies{' '}
              <strong className="text-white/85">strictement nécessaires</strong> à son fonctionnement.
              Aucun cookie de tracking ou publicitaire n'est déposé sans votre accord.{' '}
              <Link
                href="/politique-de-confidentialite"
                className="text-orange underline underline-offset-2 hover:text-orange-light transition-colors"
              >
                Politique de confidentialité
              </Link>
            </p>
          </div>

          {/* Boutons — refus aussi visible que l'acceptation */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={refuse}
              className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white/60
                         border border-white/12 hover:border-white/30 hover:text-white
                         transition-all duration-200"
              aria-label="Refuser les cookies non essentiels"
            >
              Refuser
            </button>
            <button
              onClick={accept}
              className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white
                         bg-orange hover:bg-orange-dark transition-colors duration-200 shadow-orange"
              aria-label="Accepter les cookies"
            >
              Accepter
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/** Hook pour vérifier le consentement dans les composants enfants */
export function useCookieConsent(): Consent {
  const [consent, setConsent] = useState<Consent>(null)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null
    setConsent(stored)
  }, [])
  return consent
}
