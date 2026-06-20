import { ProgressBar, Navbar, Hero, Services, Realizations } from '@/components/ClientShell'
import Values      from '@/components/Values'
import Brands      from '@/components/Brands'
import Guarantees  from '@/components/Guarantees'
import ContactForm from '@/components/ContactForm'
import Footer      from '@/components/Footer'

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
