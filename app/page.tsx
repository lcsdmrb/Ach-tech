import dynamic from 'next/dynamic'

// Sections SSR-safe (pas d'animations complexes)
import Values      from '@/components/Values'
import Brands      from '@/components/Brands'
import Guarantees  from '@/components/Guarantees'
import ContactForm from '@/components/ContactForm'
import Footer      from '@/components/Footer'

// Sections lourdes (Framer Motion 3D, hooks browser) — client uniquement
const ProgressBar   = dynamic(() => import('@/components/ProgressBar'),   { ssr: false })
const Navbar        = dynamic(() => import('@/components/Navbar'),         { ssr: false })
const Hero          = dynamic(() => import('@/components/Hero'),           { ssr: false })
const Services      = dynamic(() => import('@/components/Services'),       { ssr: false })
const Realizations  = dynamic(() => import('@/components/Realizations'),  { ssr: false })

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Values />
        <Services />
        <Brands />
        <Guarantees />
        <Realizations />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
