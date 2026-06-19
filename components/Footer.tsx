import ImageWithFallback from '@/components/ImageWithFallback'

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/4 px-8 md:px-20 py-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <ImageWithFallback
          src="/logo.png"
          alt="Ach'Tech"
          width={36}
          height={36}
          className="object-contain opacity-90"
          style={{ mixBlendMode: 'screen' }}
          /* TODO: place logo.png in /public/ */
        />
        <span className="text-sm font-medium text-white">
          Ach<span className="text-orange">'Tech</span>
        </span>
        <span className="text-[#2a2a2a] text-sm">— Entreprise déclarée en Belgique</span>
      </div>
      <p className="text-[#252525] text-xs">© 2025 · Chauffage · Sanitaires · Finitions intérieures</p>
    </footer>
  )
}
