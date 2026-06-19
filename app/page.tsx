import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import Values        from '@/components/Values'
import Services      from '@/components/Services'
import Brands        from '@/components/Brands'
import Guarantees    from '@/components/Guarantees'
import Realizations  from '@/components/Realizations'
import ContactForm   from '@/components/ContactForm'
import Footer        from '@/components/Footer'
import ProgressBar   from '@/components/ProgressBar'

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
