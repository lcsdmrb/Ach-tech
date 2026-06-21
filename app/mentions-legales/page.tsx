import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Mentions légales — Ach'Tech",
  description: "Mentions légales du site Ach'Tech, chauffagiste en Belgique.",
  robots: 'noindex',
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-orange text-sm hover:underline mb-8 inline-block">
          ← Retour au site
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold mb-10">Mentions légales</h1>

        <div className="space-y-8 text-white/70 leading-[1.8] text-[15px]">

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Éditeur du site</h2>
            <p>
              Le présent site internet est édité par :<br /><br />
              <strong className="text-white">Ach&apos;Tech</strong><br />
              Entreprise individuelle / Indépendant<br />
              Belgique — Wallonie &amp; Bruxelles<br />
              <strong className="text-white">Numéro de TVA :</strong> BE1022.715.243<br />
              <strong className="text-white">Email :</strong> info@ach-tech.com<br />
              <strong className="text-white">Téléphone :</strong> 0491 64 91 96
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Responsable de la publication</h2>
            <p>
              Le responsable de la publication est le gérant de Ach&apos;Tech, joignable à
              l&apos;adresse <a href="mailto:info@ach-tech.com" className="text-orange hover:underline">info@ach-tech.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Hébergeur</h2>
            <p>
              Ce site est hébergé par :<br /><br />
              <strong className="text-white">Hostinger International Ltd</strong><br />
              61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
              <a href="https://www.hostinger.com" target="_blank" rel="noopener noreferrer"
                 className="text-orange hover:underline">www.hostinger.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logos, graphismes)
              sont la propriété exclusive de Ach&apos;Tech ou de leurs auteurs respectifs et sont
              protégés par le droit belge et international de la propriété intellectuelle.
              Toute reproduction, représentation, modification ou adaptation, totale ou partielle,
              est interdite sans l&apos;accord préalable écrit du titulaire des droits.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Limitation de responsabilité</h2>
            <p>
              Ach&apos;Tech s&apos;efforce de maintenir les informations de ce site à jour et exactes
              mais ne peut garantir leur exhaustivité ou leur exactitude. Ach&apos;Tech ne saurait être
              tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation de ce site.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit belge.
              En cas de litige, les tribunaux belges compétents seront seuls habilités.
            </p>
          </section>

          <div className="pt-4 border-t border-white/10 text-[13px] text-white/35">
            Dernière mise à jour : 21 juin 2026
          </div>
        </div>
      </div>
    </div>
  )
}
