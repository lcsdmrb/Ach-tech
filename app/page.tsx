'use client'
import dynamic from 'next/dynamic'
import Hero         from '@/components/Hero'
import Values       from '@/components/Values'
import Services     from '@/components/Services'
import Brands       from '@/components/Brands'
import Guarantees   from '@/components/Guarantees'
import Realizations from '@/components/Realizations'
import Reviews      from '@/components/Reviews'
import ContactForm  from '@/components/ContactForm'
import Footer       from '@/components/Footer'

// Composants purement décoratifs — chargés uniquement côté client
const Navbar       = dynamic(() => import('@/components/Navbar'),       { ssr: false })
const ProgressBar  = dynamic(() => import('@/components/ProgressBar'),  { ssr: false })
const Loader       = dynamic(() => import('@/components/Loader'),       { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <ProgressBar />
      <Navbar />

      <div className="relative overflow-x-hidden">
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
          <Values />
          <Brands />
          <Services />
          <Guarantees />
          <Realizations />
          <Reviews />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  )
}
