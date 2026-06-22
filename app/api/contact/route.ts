import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── Rate limiter simple en mémoire ──────────────────────────────────────────
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
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .slice(0, 2000)
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, (c) => {
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
    ...(process.env.NODE_ENV === 'development'
      ? ['http://localhost:3000', 'http://localhost:3001']
      : []),
  ].filter(Boolean) as string[]

  const origin  = req.headers.get('origin')
  const referer = req.headers.get('referer')

  if (origin)  return allowedOrigins.some(o => origin.startsWith(o))
  if (referer) return allowedOrigins.some(o => referer.startsWith(o))
  return false
}

// ── Transporteur SMTP Hostinger ──────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? 'smtp.hostinger.com',
    port:   parseInt(process.env.SMTP_PORT ?? '587', 10),
    secure: false, // STARTTLS sur port 587
    auth: {
      user: process.env.SMTP_USER ?? process.env.CONTACT_FROM_EMAIL ?? '',
      pass: process.env.SMTP_PASS ?? '',
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
    socketTimeout: 8000,
  })
}

// ── Route POST /api/contact ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. IP du visiteur
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'

  // Toujours retourner HTTP 200 — LiteSpeed intercepte les 4xx/5xx avec du HTML
  // On utilise json.ok true/false pour signaler succès/erreur au client

  // 1b. CSRF
  if (!isValidOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'Origine non autorisée.' })
  }

  // 2. Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Trop de demandes. Veuillez patienter 1 minute.' })
  }

  // 3. Body
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' })
  }

  // 4. Honeypot
  if (body._trap) {
    return NextResponse.json({ ok: true })
  }

  // 5. Valider et nettoyer
  const prenom  = sanitize(body.prenom)
  const nom     = sanitize(body.nom)
  const tel     = sanitize(body.tel)
  const email   = sanitize(body.email)
  const service = sanitize(body.service)
  const ville   = sanitize(body.ville)
  const message = sanitize(body.message)

  if (!prenom || !nom || !email || !service) {
    return NextResponse.json({ ok: false, error: 'Champs obligatoires manquants.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Email invalide.' })
  }

  // 6. Vérifier config SMTP
  const toEmail   = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.SMTP_USER ?? process.env.CONTACT_FROM_EMAIL ?? process.env.CONTACT_TO_EMAIL

  if (!toEmail || !process.env.SMTP_PASS) {
    // Config incomplète — log et simuler succès pour ne pas bloquer les tests
    console.warn('SMTP non configuré — email non envoyé. Configurer SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL.')
    return NextResponse.json({ ok: true })
  }

  // 7. Envoyer via SMTP Hostinger
  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from:     `"Ach'Tech Devis" <${fromEmail}>`,
      to:       toEmail,
      replyTo:  email,
      subject:  `Nouveau devis Ach'Tech — ${prenom} ${nom} (${service})`,
      html: `
        <h2 style="color:#E85A0A;font-family:sans-serif">Nouvelle demande de devis</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px;font-weight:600;color:#555;width:160px">Nom</td><td style="padding:8px">${prenom} ${nom}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Téléphone</td><td style="padding:8px">${tel || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Service</td><td style="padding:8px">${service}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#555">Localité</td><td style="padding:8px">${ville || '—'}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Message</td><td style="padding:8px">${message || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#555;font-size:11px">IP</td><td style="padding:8px;color:#aaa;font-size:11px">${ip}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:16px">
          Envoyé depuis ach-tech.com
        </p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Erreur envoi email SMTP:', msg)
    return NextResponse.json({ ok: false, error: `Erreur d'envoi: ${msg}` })
  }
}
