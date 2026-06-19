'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const contacts = [
  { icon: '📞', label: 'Téléphone',          val: '+32 (0)4 XX XX XX XX', href: 'tel:+3204XXXXXXXX' },
  { icon: '✉️', label: 'Email',              val: 'contact@achtech.be',    href: 'mailto:contact@achtech.be' },
  { icon: '📍', label: "Zone d'intervention", val: 'Wallonie & Bruxelles',  href: undefined },
]

// Validation côté client
function validate(data: Record<string, string>): string | null {
  if (!data.prenom.trim())  return 'Le prénom est requis.'
  if (!data.nom.trim())     return 'Le nom est requis.'
  if (!data.email.trim())   return "L'email est requis."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Email invalide.'
  if (!data.service)        return 'Veuillez sélectionner un service.'
  return null
}

export default function ContactForm() {
  const [status, setStatus]   = useState<Status>('idle')
  const [errMsg, setErrMsg]   = useState('')
  const [form,   setForm]     = useState({
    prenom: '', nom: '', tel: '', email: '',
    service: '', ville: '', message: '',
    _trap: '',   // honeypot anti-bot (caché via CSS)
  })

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErrMsg('')

    // Validation côté client
    const err = validate(form)
    if (err) { setErrMsg(err); return }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erreur inconnue.')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrMsg(err instanceof Error ? err.message : 'Erreur réseau. Réessayez.')
    }
  }

  return (
    <section id="contact" className="py-28 px-8 md:px-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-20 items-start">

        {/* ── Info gauche ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.4px] uppercase text-orange border border-orange/20 bg-orange/7 px-3.5 py-1 rounded-full mb-4">
            💬 Contact
          </span>
          <h2 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] leading-tight mb-4">
            Demandez<br />votre devis<br />gratuit
          </h2>
          <p className="text-[#999] text-[14.5px] leading-relaxed font-light mb-8">
            Réponse sous 24h. Nous venons évaluer vos besoins directement sur place, sans engagement.
          </p>
          <div className="space-y-4">
            {contacts.map((c) => {
              const inner = (
                <motion.div
                  whileHover={c.href ? { x: 4 } : {}}
                  className={`flex items-center gap-3.5 ${c.href ? 'cursor-pointer group' : ''}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-orange/8 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-orange/15 transition-colors duration-200">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-[#ccc] uppercase tracking-[.8px] font-semibold mb-0.5">{c.label}</div>
                    <div className="text-[13.5px] text-[#444] group-hover:text-orange transition-colors duration-200">{c.val}</div>
                  </div>
                </motion.div>
              )
              return c.href
                ? <a key={c.label} href={c.href}>{inner}</a>
                : <div key={c.label}>{inner}</div>
            })}
          </div>
        </motion.div>

        {/* ── Formulaire ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#F5F4F2] rounded-2xl p-10 border border-black/5"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: .92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-14"
            >
              <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center text-3xl mx-auto mb-5">✅</div>
              <h4 className="text-[20px] font-semibold text-[#111] mb-2">Demande envoyée !</h4>
              <p className="text-[#999] text-[13.5px] font-light leading-relaxed max-w-xs mx-auto">
                Nous vous recontactons dans les 24h pour organiser une visite sur place.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">

              {/* ── Honeypot anti-bot (invisible) ── */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="_trap">Ne pas remplir</label>
                <input
                  id="_trap" name="_trap" type="text" tabIndex={-1} autoComplete="off"
                  value={form._trap} onChange={change}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <F label="Prénom *"    name="prenom"  type="text"  placeholder="Jean"    value={form.prenom}  onChange={change} required />
                <F label="Nom *"       name="nom"     type="text"  placeholder="Dupont"  value={form.nom}     onChange={change} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <F label="Téléphone"   name="tel"     type="tel"   placeholder="+32 4XX XX XX XX" value={form.tel}  onChange={change} />
                <F label="Email *"     name="email"   type="email" placeholder="jean@email.com"   value={form.email} onChange={change} required />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-[.6px] text-[#777] mb-1.5">Type de travaux *</label>
                <select name="service" value={form.service} onChange={change} required className="field">
                  <option value="" disabled>Sélectionnez un service</option>
                  <option>Chauffage & sanitaires</option>
                  <option>Finitions intérieures</option>
                  <option>Cuisine</option>
                  <option>Salle de bain</option>
                  <option>Plusieurs services</option>
                </select>
              </div>

              <F label="Localité" name="ville" type="text" placeholder="Liège, Namur, Bruxelles..." value={form.ville} onChange={change} />

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-[.6px] text-[#777] mb-1.5">Description du projet</label>
                <textarea
                  name="message" rows={4} value={form.message} onChange={change}
                  placeholder="Superficie, état actuel, délai souhaité..."
                  className="field resize-none"
                />
              </div>

              {/* Message d'erreur */}
              {(errMsg || status === 'error') && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm"
                >
                  ⚠️ {errMsg || 'Une erreur est survenue. Veuillez réessayer.'}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02, boxShadow: '0 10px 28px rgba(232,90,10,.28)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange hover:bg-orange-dark disabled:opacity-60 text-white text-[14px] font-semibold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Envoi en cours…</>
                ) : (
                  <>✉️ Envoyer ma demande de devis</>
                )}
              </motion.button>

              <p className="text-center text-[11.5px] text-[#ccc] font-light flex items-center justify-center gap-1.5">
                🔒 Données confidentielles — aucun spam.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Composant champ réutilisable
function F({
  label, name, type, placeholder, value, onChange, required,
}: {
  label: string; name: string; type: string; placeholder?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10.5px] font-bold uppercase tracking-[.6px] text-[#777] mb-1.5">{label}</label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
        className="field"
      />
    </div>
  )
}
