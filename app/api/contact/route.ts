import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ── Rate limiter simple en mémoire ──────────────────────────────────────────
// Maximum 3 demandes par adresse IP toutes les 60 secondes
const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }
  if (entry.count >= 3) return true
  entry.count++
  return false
}

// ── Sanitisation basique ─────────────────────────────────────────────────────
// Supprime les balises HTML pour éviter les injections
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .slice(0, 2000)                        // limite la taille
    .replace(/<[^>]*>/g, '')              // enlève balises HTML
    .replace(/[<>"'`]/g, (c) => {        // encode les caractères spéciaux
      const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' }
      return map[c] ?? c
    })
}

// ── Vérification CSRF via Origin/Referer ────────────────────────────────────
function isValidOrigin(req: NextRequest): boolean {
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'https://ach-tech.com',
    'https://www.ach-tech.com',
    // dev uniquement
    ...(process.env.NODE_ENV === 'development'
      ? ['http://localhost:3000', 'http://localhost:3001']
      : []),
  ].filter(Boolean) as string[]

  const origin  = req.headers.get('origin')
  const referer = req.headers.get('referer')

  if (origin)  return allowedOrigins.some(o => origin.startsWith(o))
  if (referer) return allowedOrigins.some(o => referer.startsWith(o))
  return false // ni origin ni referer = requête suspecte
}

// ── Route POST /api/contact ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Récupérer l'IP du visiteur
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'

  // 1b. Vérification CSRF
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 })
  }

  // 2. Vérifier le rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de demandes. Veuillez patienter 1 minute.' },
      { status: 429 }
    )
  }

  // 3. Lire le corps de la requête
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  // 4. Vérifier le honeypot anti-bot (champ caché que les bots remplissent)
  if (body._trap) {
    // C'est un bot — on répond 200 pour ne pas le signaler
    return NextResponse.json({ ok: true })
  }

  // 5. Valider et nettoyer les champs
  const prenom  = sanitize(body.prenom)
  const nom     = sanitize(body.nom)
  const tel     = sanitize(body.tel)
  const email   = sanitize(body.email)
  const service = sanitize(body.service)
  const ville   = sanitize(body.ville)
  const message = sanitize(body.message)

  if (!prenom || !nom || !email || !service) {
    return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
  }

  // Validation email basique
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }

  // 6. Envoyer l'email via Resend
  const apiKey = process.env.RESEND_API_KEY
  const toEmail   = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  if (!apiKey || !toEmail) {
    // En développement sans clé configurée : on simule le succès
    console.warn('RESEND_API_KEY ou CONTACT_TO_EMAIL manquant — email non envoyé.')
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: fromEmail,
    to:   toEmail,
    reply_to: email,
    subject: `Nouveau devis Ach'Tech — ${prenom} ${nom} (${service})`,
    html: `
      <h2 style="color:#E85A0A">Nouvelle demande de devis</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:8px;font-weight:600;color:#555;width:160px">Nom</td><td style="padding:8px">${prenom} ${nom}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Téléphone</td><td style="padding:8px">${tel || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Service</td><td style="padding:8px">${service}</td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">Localité</td><td style="padding:8px">${ville || '—'}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Message</td><td style="padding:8px">${message || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">IP</td><td style="padding:8px;color:#aaa;font-size:12px">${ip}</td></tr>
      </table>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: "Erreur d'envoi. Réessayez plus tard." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
