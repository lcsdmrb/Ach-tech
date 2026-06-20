/** @type {import('next').NextConfig} */

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
  "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
  "img-src 'self' data: https://images.unsplash.com https://picsum.photos https://logo.clearbit.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy',   value: CSP },
]

const nextConfig = {
  // Standalone output pour déploiement Hostinger (self-contained)
  output: 'standalone',

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
      {
        // Cache long pour les assets statiques (images, fonts, JS)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache 1h pour les pages HTML
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
    ]
  },

  images: {
    // Formats modernes (WebP/AVIF = 2x plus léger que JPG)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
    ],
    // Tailles d'images optimisées
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
}

export default nextConfig
