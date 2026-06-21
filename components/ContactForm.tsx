'use client'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

// TODO: remplacer les placeholders par les vraies coordonnées
const contacts = [
  { icon: Phone,  label: 'Téléphone',           val: '0491 64 91 96',        href: 'tel:+32491649196' },
  { icon: Mail,   label: 'Email',               val: 'info@ach-tech.com',    href: 'mailto:info@ach-tech.com' },
  { icon: MapPin, label: "Zone d'intervention", val: 'Wallonie & Bruxelles', href: undefined },
]

function validate(data: Record<string, string>): string | null {
  if (!data.prenom.trim()) return 'Le prénom est requis.'
  if (!data.nom.trim())    return 'Le nom est requis.'
  if (!data.email.trim())  return "L'email est requis."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Email invalide.'
  if (!data.service)       return 'Veuillez sélectionner un service.'
  return null
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [form, setForm]     = useState({
    prenom: '', nom: '', tel: '', email: '',
    service: '', ville: '', message: '',
    _trap: '',
  })

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErrMsg('')
    const err = validate(form)
    if (err) { setErrMsg(err); return }
    setStatus('loading')
    try {
      // TODO: brancher service d'envoi d'email (EmailJS, Formspree, ou /api/contact)
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
    <section id="contact" className="relative py-32 px-6 md:px-20 bg-[#0A0A0A] overflow-hidden">

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[500px] rounded-full blur-[150px] pointer-events-none"
           style={{ background: 'rgba(255,107,26,0.06)' }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="tag-orange mb-5 inline-flex mx-auto">Contact</span>
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-white leading-[1.08]">
          Un projet en tête ?<br />Parlons-en.
        </h2>
        <p className="text-white/35 text-[15px] font-light leading-relaxed mt-4 max-w-md mx-auto">
          Réponse garantie sous 24h. Nous venons évaluer vos besoins directement sur place, sans engagement.
        </p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 max-w-6xl mx-auto items-start">

        {/* ── Info gauche ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4 mb-10">
            {contacts.map((c) => {
              const Icon = c.icon
              const inner = (
                <motion.div
                  whileHover={c.href ? { x: 4 } : {}}
                  className={`flex items-center gap-4 ${c.href ? 'cursor-pointer group' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                  group-hover:border-orange/40 transition-all duration-200"
                       style={{ background: 'rgba(255,107,26,0.08)', border: '1px solid rgba(255,107,26,0.12)' }}>
                    <Icon size={18} className="text-orange group-hover:scale-110 transition-transform duration-200" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[9.5px] text-white/25 uppercase tracking-[.8px] font-bold mb-0.5">{c.label}</div>
                    <div className="text-[13.5px] text-white/70 group-hover:text-orange transition-colors duration-200">{c.val}</div>
                  </div>
                </motion.div>
              )
              return c.href
                ? <a key={c.label} href={c.href}>{inner}</a>
                : <div key={c.label}>{inner}</div>
            })}
          </div>

          {/* Stat blocks */}
          <div className="glass-dark rounded-2xl p-6 border border-white/8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: '< 24h', l: 'Délai de réponse' },
                { n: '200+',  l: 'Chantiers réalisés' },
                { n: '10 ans', l: 'Garantie décennale' },
                { n: '100%',  l: 'Satisfaction client' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-orange">{s.n}</div>
                  <div className="text-[11px] text-white/30 font-light mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Formulaire ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-dark rounded-2xl p-8 md:p-10 border border-white/10 shadow-glass"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: .92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-14"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                   style={{ background: 'rgba(255,107,26,0.12)', border: '1px solid rgba(255,107,26,0.2)' }}>
                <CheckCircle size={28} className="text-orange" />
              </div>
              <h4 className="text-[20px] font-semibold text-white mb-2">Demande envoyée !</h4>
              <p className="text-white/40 text-[13.5px] font-light leading-relaxed max-w-xs mx-auto">
                Nous vous recontactons dans les 24h pour organiser une visite sur place.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">

              {/* Honeypot anti-bot */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="_trap">Ne pas remplir</label>
                <input id="_trap" name="_trap" type="text" tabIndex={-1} autoComplete="off" value={form._trap} onChange={change} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Prénom *"  name="prenom" type="text"  placeholder="Jean"   value={form.prenom}  onChange={change} required />
                <Field label="Nom *"     name="nom"    type="text"  placeholder="Dupont" value={form.nom}     onChange={change} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Téléphone" name="tel"   type="tel"   placeholder="+32 4XX XX XX XX" value={form.tel}   onChange={change} />
                <Field label="Email *"   name="email" type="email" placeholder="jean@email.com"   value={form.email} onChange={change} required />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[.8px] text-white/30 mb-1.5">
                  Type de travaux *
                </label>
                <select name="service" value={form.service} onChange={change} required className="field-dark">
                  <option value="" disabled>Sélectionnez un service</option>
                  <option>Chauffage & sanitaires</option>
                  <option>Finitions intérieures</option>
                  <option>Cuisine</option>
                  <option>Salle de bain</option>
                  <option>Plusieurs services</option>
                </select>
              </div>

              <Field label="Localité" name="ville" type="text" placeholder="Liège, Namur, Bruxelles..." value={form.ville} onChange={change} />

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[.8px] text-white/30 mb-1.5">
                  Description du projet
                </label>
                <textarea
                  name="message" rows={4} value={form.message} onChange={change}
                  placeholder="Superficie, état actuel, délai souhaité..."
                  className="field-dark resize-none"
                />
              </div>

              {(errMsg || status === 'error') && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-sm"
                >
                  {errMsg || 'Une erreur est survenue. Veuillez réessayer.'}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02, boxShadow: '0 10px 28px rgba(232,90,10,.3)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange hover:bg-orange-dark disabled:opacity-60 text-white
                           text-[14px] font-semibold py-4 rounded-xl transition-colors duration-200
                           flex items-center justify-center gap-2.5 shadow-orange"
              >
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Envoi en cours…</>
                ) : (
                  <><Send size={15} /> Envoyer ma demande de devis</>
                )}
              </motion.button>

              <p className="text-center text-[11px] text-white/20 font-light">
                Données confidentielles — aucun spam.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Field({
  label, name, type, placeholder, value, onChange, required,
}: {
  label: string; name: string; type: string; placeholder?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-[.8px] text-white/30 mb-1.5">
        {label}
      </label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
        className="field-dark"
      />
    </div>
  )
}
