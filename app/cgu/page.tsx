import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Ach'Tech",
  description: "CGU du site Ach'Tech, chauffagiste en Belgique.",
  robots: 'noindex',
}

export default function CGU() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-orange text-sm hover:underline mb-8 inline-block">
          ← Retour au site
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="text-white/40 text-[14px] mb-10">Dernière mise à jour : 21 juin 2026</p>

        <div className="space-y-8 text-white/70 leading-[1.8] text-[15px]">

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et
              l&apos;utilisation du site internet <strong className="text-white">ach-tech.com</strong>
              {' '}(ci-après « le Site »), édité par Ach&apos;Tech, entreprise de chauffage et de
              finitions intérieures établie en Belgique.
            </p>
            <p className="mt-3">
              En accédant au Site, vous acceptez sans réserve les présentes CGU.
              Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le Site.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Accès au Site</h2>
            <p>
              Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès internet.
              Ach&apos;Tech se réserve le droit de modifier, suspendre ou interrompre l&apos;accès au Site
              à tout moment, notamment pour des opérations de maintenance, sans préavis ni indemnité.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Contenu du Site</h2>
            <p>
              Le Site est un <strong className="text-white">site vitrine</strong> présentant les services
              de Ach&apos;Tech (chauffage, sanitaires, finitions intérieures, cuisine &amp; salle de bain).
              Il permet aux visiteurs de soumettre une demande de devis via un formulaire de contact.
            </p>
            <p className="mt-3">
              <strong className="text-white">Aucune vente en ligne n&apos;est réalisée via ce Site.</strong>
              {' '}Toute commande ou contrat de prestation de service est formalisée séparément,
              par devis écrit signé par les deux parties, constituant le seul engagement contractuel.
              La soumission d&apos;un formulaire de demande de devis via le Site ne constitue pas une
              offre ferme ni un contrat.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments du Site (textes, images, logos, code source, design)
              sont la propriété exclusive de Ach&apos;Tech ou font l&apos;objet de licences d&apos;utilisation.
              Toute reproduction, copie, distribution, ou modification sans autorisation préalable
              écrite est strictement interdite et constitue une contrefaçon.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Responsabilité</h2>
            <p className="mb-3">
              Ach&apos;Tech met tout en œuvre pour proposer des informations fiables et à jour,
              mais ne peut garantir l&apos;exactitude ou l&apos;exhaustivité des contenus du Site.
              Ach&apos;Tech ne saurait être tenu responsable :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Des interruptions ou indisponibilités du Site.</li>
              <li>Des dommages directs ou indirects résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le Site.</li>
              <li>Du contenu de sites tiers accessibles via des liens hypertextes présents sur le Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Comportement de l&apos;utilisateur</h2>
            <p>L&apos;utilisateur s&apos;engage à :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Ne pas utiliser le Site à des fins illicites ou contraires aux bonnes mœurs.</li>
              <li>Ne pas soumettre de contenu faux, trompeur ou diffamatoire via le formulaire.</li>
              <li>Ne pas tenter de compromettre la sécurité ou le bon fonctionnement du Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Protection des données personnelles</h2>
            <p>
              Le traitement des données personnelles collectées via ce Site est décrit dans notre{' '}
              <Link href="/politique-de-confidentialite" className="text-orange hover:underline">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Modification des CGU</h2>
            <p>
              Ach&apos;Tech se réserve le droit de modifier les présentes CGU à tout moment.
              Les modifications prennent effet dès leur publication sur le Site.
              L&apos;utilisation du Site après modification vaut acceptation des nouvelles CGU.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">9. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont soumises au <strong className="text-white">droit belge</strong>.
              En cas de litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes,
              et à défaut de résolution amiable dans un délai de 30 jours,
              les tribunaux compétents de l&apos;arrondissement judiciaire du siège de Ach&apos;Tech
              seront seuls compétents.
            </p>
          </section>

          <div className="pt-4 border-t border-white/10 rounded-xl p-4 text-[13px]"
               style={{ background: 'rgba(255,107,26,0.05)', borderColor: 'rgba(255,107,26,0.15)' }}>
            ⚠️ <strong className="text-orange">Avertissement juridique</strong> : Ces CGU ont été rédigées
            comme point de départ et ne remplacent pas une relecture par un professionnel du droit belge.
            Une validation par un juriste ou avocat est recommandée avant mise en ligne définitive.
          </div>
        </div>
      </div>
    </div>
  )
}
