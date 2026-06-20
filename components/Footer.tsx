export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#060606] border-t border-white/[0.04]
                       px-6 md:px-20 py-6
                       flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        {/* TODO: remplacer par <ImageWithFallback src="/logo.png" ... /> quand logo dispo */}
        <div className="w-7 h-7 rounded-lg bg-orange/15 border border-orange/25
                        flex items-center justify-center text-orange font-bold text-sm">
          A
        </div>
        <span className="text-[13.5px] font-medium text-white">
          Ach<span className="text-orange">'Tech</span>
        </span>
        <span className="text-[#2a2a2a] text-[13px]">— Entreprise déclarée en Belgique</span>
      </div>
      <p className="text-[#222] text-[11.5px]">
        © {year} · Chauffage · Sanitaires · Finitions intérieures
      </p>
    </footer>
  )
}
