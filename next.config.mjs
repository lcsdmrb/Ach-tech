/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

const CSP = [
  "default-src 'self'",
  // unsafe-eval nécessaire pour Framer Motion en dev ; unsafe-inline pour Next.js hydration
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  // Styles inline requis par Tailwind/Framer Motion ; fonts auto-hébergées par next/font
  "style-src 'self' 'unsafe-inline'",
  // Polices auto-hébergées par Next.js (next/font/google télécharge en local)
  "font-src 'self' data:",
  // Images locales + Unsplash pour photos services/réalisations (plus de picsum/clearbit)
  "img-src 'self' data: blob: https://images.unsplash.com",
  // WebSockets dev uniquement
  isDev
    ? "connect-src 'self' ws://localhost:* wss://localhost:*"
    : "connect-src 'self'",
  // Médias locaux uniquement
  "media-src 'self'",
  // Pas de plugins (Flash, etc.)
  "object-src 'none'",
  // Pas d'iframes tierces
  "frame-src 'none'",
  "frame-ancestors 'none'",
  // Limite les bases d'URL
  "base-uri 'self'",
  // Formulaires vers le même site uniquement
  "form-action 'self'",
  // Force HTTPS pour toutes les ressources
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  // Empêche le clickjacking
  { key: 'X-Frame-Options',            value: 'DENY' },
  // Empêche le MIME sniffing
  { key: 'X-Content-Type-Options',     value: 'nosniff' },
  // Préchargement DNS
  { key: 'X-DNS-Prefetch-Control',     value: 'on' },
  // Informations de referrer minimales
  { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
  // Permissions API désactivées (pas de caméra, micro, géoloc, paiement)
  { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  // HSTS 2 ans — à n'activer qu'une fois le HTTPS confirmé sur VPS
  { key: 'Strict-Transport-Security',  value: 'max-age=63072000; includeSubDomains; preload' },
  // CSP principale
  { key: 'Content-Security-Policy',    value: CSP },
  // Bloque les requêtes cross-origin non explicitement autorisées
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // Bloque le chargement de ressources cross-origin sans en-tête CORS explicite
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  // Empêche la lecture des réponses cross-origin
  { key: 'Cross-Origin-Embedder-Policy', value: isDev ? 'unsafe-none' : 'require-corp' },
]

const nextConfig = {
  // output: 'standalone' — désactivé (Hostinger utilise next start directement)
  // output: 'standalone',

  // Compression activée
  compress: true,

  // Timeout de génération statique augmenté (secondes)
  staticPageGenerationTimeout: 120,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Cache agressif uniquement en production
      ...(isDev ? [] : [
        {
          source: '/_next/static/(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
        {
          source: '/(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
          ],
        },
      ]),
    ]
  },

  images: {
    // Formats modernes (WebP/AVIF = 2x plus léger que JPG)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Photos services + galerie réalisations secondaires
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // Tailles d'images optimisées
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
}

export default nextConfig
