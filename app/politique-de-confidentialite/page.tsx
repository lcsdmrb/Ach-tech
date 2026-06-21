import { Metadata } from 'next'
import Link from 'next/link'
import CookieResetButton from '@/components/CookieResetButton'

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ach'Tech",
  description: "Politique de protection des données personnelles de Ach'Tech, conforme au RGPD.",
  robots: 'noindex',
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-orange text-sm hover:underline mb-8 inline-block">
          ← Retour au site
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Politique de confidentialité
        </h1>
        <p className="text-white/40 text-[14px] mb-10">Dernière mise à jour : 21 juin 2026</p>

        <div className="space-y-8 text-white/70 leading-[1.8] text-[15px]">

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Responsable du traitement</h2>
            <p>
              <strong className="text-white">Ach&apos;Tech</strong> (entreprise individuelle)<br />
              Belgique — Wallonie &amp; Bruxelles<br />
              TVA : BE1022.715.243<br />
              Contact : <a href="mailto:info@ach-tech.com" className="text-orange hover:underline">info@ach-tech.com</a> — 0491 64 91 96
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Données collectées et finalités</h2>
            <p className="mb-3">
              Ce site collecte des données personnelles <strong className="text-white">uniquement via le formulaire de contact/devis</strong>.
              Aucune donnée n&apos;est collectée à d&apos;autres fins (pas de tracking, pas de publicité ciblée).
            </p>
            <table className="w-full text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/50 font-medium">Donnée</th>
                  <th className="text-left py-2 pr-4 text-white/50 font-medium">Finalité</th>
                  <th className="text-left py-2 text-white/50 font-medium">Base légale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Nom, prénom', 'Identification pour répondre à la demande', 'Intérêt légitime / exécution d\'un précontrat'],
                  ['Email, téléphone', 'Prise de contact suite à la demande', 'Intérêt légitime / exécution d\'un précontrat'],
                  ['Type de travaux, localité', 'Établissement du devis', 'Exécution d\'un précontrat'],
                  ['Message libre', 'Compréhension du besoin', 'Intérêt légitime'],
                  ['Adresse IP (log)', 'Sécurité, anti-spam', 'Intérêt légitime'],
                ].map(([d, f, b]) => (
                  <tr key={d} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white/70">{d}</td>
                    <td className="py-2 pr-4 text-white/60">{f}</td>
                    <td className="py-2 text-white/50 text-[13px]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Durée de conservation</h2>
            <p>
              Les données transmises via le formulaire de contact sont conservées dans la boîte email
              de Ach&apos;Tech pendant la durée nécessaire au traitement de la demande et au maximum{' '}
              <strong className="text-white">3 ans</strong> à compter du dernier contact, sauf obligation
              légale contraire (comptabilité : 7 ans).
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Destinataires des données</h2>
            <p className="mb-3">Vos données sont transmises à :</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Ach&apos;Tech</strong> (destinataire principal — seul l&apos;artisan accède aux demandes).</li>
              <li>
                <strong className="text-white">Resend Inc.</strong> (prestataire d&apos;envoi d&apos;email, États-Unis) —
                les données sont traitées pour acheminer l&apos;email uniquement. Resend est un sous-traitant au sens du RGPD.
                Voir leur{' '}
                <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer"
                   className="text-orange hover:underline">politique de confidentialité</a>.
              </li>
              <li>
                <strong className="text-white">Hostinger</strong> (hébergeur VPS) — peut accéder aux logs serveur dans le cadre
                de la maintenance de l&apos;infrastructure. Voir leur{' '}
                <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer"
                   className="text-orange hover:underline">politique de confidentialité</a>.
              </li>
            </ul>
            <p className="mt-3">
              Aucune donnée n&apos;est vendue, échangée ou transmise à des tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Transferts hors UE</h2>
            <p>
              Resend Inc. est basé aux États-Unis. Le transfert est encadré par les{' '}
              <strong className="text-white">Clauses Contractuelles Types (CCT)</strong> de la Commission européenne
              et/ou le cadre EU-US Data Privacy Framework. Voir les garanties de Resend sur leur site officiel.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Cookies</h2>
            <p className="mb-3">Ce site utilise uniquement :</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Cookie de consentement</strong> (<code className="text-orange text-[13px]">achtech_cookie_consent</code>) —
                stocké en <code>localStorage</code>, durée 12 mois, nécessaire au fonctionnement du bandeau de consentement.
              </li>
            </ul>
            <p className="mt-3">
              Aucun cookie de tracking (Google Analytics, Facebook Pixel, etc.) n&apos;est utilisé.
              Les polices de caractères (Outfit) sont auto-hébergées sur notre serveur — aucune requête vers Google Fonts.
            </p>
            <p className="mt-3">
              Vous pouvez modifier vos préférences à tout moment via le lien{' '}
              <CookieResetButton />{' '}
              en pied de page.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Vos droits</h2>
            <p className="mb-3">
              Conformément au RGPD (Règlement UE 2016/679), vous disposez des droits suivants
              concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Droit d&apos;accès</strong> — obtenir une copie des données vous concernant.</li>
              <li><strong className="text-white">Droit de rectification</strong> — corriger des données inexactes.</li>
              <li><strong className="text-white">Droit à l&apos;effacement</strong> — demander la suppression de vos données.</li>
              <li><strong className="text-white">Droit d&apos;opposition</strong> — vous opposer à un traitement basé sur l&apos;intérêt légitime.</li>
              <li><strong className="text-white">Droit à la portabilité</strong> — recevoir vos données dans un format structuré.</li>
              <li><strong className="text-white">Droit à la limitation</strong> — restreindre temporairement un traitement.</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à :{' '}
              <a href="mailto:info@ach-tech.com" className="text-orange hover:underline">info@ach-tech.com</a>
              {' '}en précisant votre demande. Nous répondrons dans un délai d&apos;un mois maximum.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Droit de réclamation</h2>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de
              l&apos;<strong className="text-white">Autorité de Protection des Données (APD)</strong> belge :{' '}
              <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer"
                 className="text-orange hover:underline">www.autoriteprotectiondonnees.be</a>
            </p>
          </section>

          <div className="pt-4 border-t border-white/10 rounded-xl p-4 text-[13px]"
               style={{ background: 'rgba(255,107,26,0.05)', borderColor: 'rgba(255,107,26,0.15)' }}>
            ⚠️ <strong className="text-orange">Avertissement juridique</strong> : Cette politique de confidentialité
            a été rédigée comme point de départ et ne remplace pas une relecture par un professionnel du droit belge.
            Une validation par un juriste ou avocat spécialisé RGPD est recommandée.
          </div>
        </div>
      </div>
    </div>
  )
}
