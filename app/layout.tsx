import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ach-tech.com'),
  title: "Ach'Tech — Chauffage & Finitions intérieures en Belgique",
  description:
    "Chauffagiste indépendant en Wallonie & Bruxelles. Installation chaudière, pompe à chaleur, salle de bain, cuisine. Garantie décennale, devis gratuit sous 24h, patron sur chantier.",
  keywords: [
    "chauffagiste", "Wallonie", "Bruxelles", "chaudière", "pompe à chaleur",
    "plancher chauffant", "salle de bain", "finitions intérieures", "devis gratuit"
  ],
  authors: [{ name: "Ach'Tech" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: 'https://ach-tech.com',
    siteName: "Ach'Tech",
    title: "Ach'Tech — Chauffage & Finitions intérieures",
    description: "Chauffagiste indépendant en Belgique. Garantie décennale, devis gratuit sous 24h.",
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: "Ach'Tech logo" }],
  },
  twitter: {
    card: 'summary',
    title: "Ach'Tech — Chauffagiste Belgique",
    description: "Chauffage, salle de bain, finitions. Devis gratuit 24h. Wallonie & Bruxelles.",
  },
  alternates: {
    canonical: 'https://ach-tech.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans bg-[#0C0C0C] text-white overflow-x-hidden`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
