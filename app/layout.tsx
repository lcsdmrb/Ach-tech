import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Ach'Tech — Chauffage & Finitions intérieures",
  description:
    "Chauffagiste et finitions intérieures en Belgique. Garantie décennale, devis gratuit, patron sur chantier.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans bg-[#0C0C0C] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
