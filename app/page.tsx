import dynamic from 'next/dynamic'
import Navbar      from '@/components/Navbar'
import Footer      from '@/components/Footer'
import ProgressBar from '@/components/ProgressBar'

// Sections légères — rendues côté serveur (rapide, bon pour Google)
import Values     from '@/components/Values'
import Brands     from '@/components/Brands'
import Guarantees from '@/components/Guarantees'
import ContactForm from '@/components/ContactForm'

// Sections lourdes (Framer Motion 3D) — chargées côté navigateur uniquement
// Évite le timeout de build et améliore la vitesse
const Hero         = dynamic(() => import('@/components/Hero'),         { ssr: false })
const Services     = dynamic(() => import('@/components/Services'),     { ssr: false })
const Realizations = dynamic(() => import('@/components/Realizations'), { ssr: false })

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
