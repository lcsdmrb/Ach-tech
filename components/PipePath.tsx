'use client'
import { useScroll, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function PipePath() {
  const { scrollYProgress } = useScroll()
  const svgRef = useRef<SVGSVGElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useEffect(() => {
    function measure() {
      setDims({
        w: window.innerWidth,
        h: document.documentElement.scrollHeight,
      })
    }
    function syncScroll() {
      if (svgRef.current) {
        svgRef.current.style.transform = `translateY(${-window.scrollY}px)`
      }
    }

    measure()
    syncScroll()
    const t1 = setTimeout(() => { measure(); syncScroll() }, 400)
    const t2 = setTimeout(() => { measure(); syncScroll() }, 1800)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', syncScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', syncScroll)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!dims.w || !dims.h) return null

  const { w, h } = dims
  const isMobile = w < 768
  const cx  = w / 2
  const amp = isMobile ? w * 0.05 : w * 0.18

  const d = [
    `M ${cx} 0`,
    `C ${cx} ${h * 0.04},  ${cx + amp} ${h * 0.07},  ${cx + amp} ${h * 0.14}`,
    `C ${cx + amp} ${h * 0.20}, ${cx - amp} ${h * 0.24}, ${cx - amp} ${h * 0.31}`,
    `C ${cx - amp} ${h * 0.38}, ${cx + amp} ${h * 0.41}, ${cx + amp} ${h * 0.48}`,
    `C ${cx + amp} ${h * 0.55}, ${cx - amp} ${h * 0.58}, ${cx - amp} ${h * 0.65}`,
    `C ${cx - amp} ${h * 0.72}, ${cx + amp} ${h * 0.75}, ${cx + amp} ${h * 0.82}`,
    `C ${cx + amp} ${h * 0.89}, ${cx} ${h * 0.93},       ${cx} ${h * 0.97}`,
    `L ${cx} ${h}`,
  ].join(' ')

  /* Raccords aux coudes — éléments décoratifs statiques à faible opacité */
  const joints = [
    { cx: cx + amp, cy: h * 0.14 },
    { cx: cx - amp, cy: h * 0.31 },
    { cx: cx + amp, cy: h * 0.48 },
    { cx: cx - amp, cy: h * 0.65 },
    { cx: cx + amp, cy: h * 0.82 },
  ]

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 30, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0, willChange: 'transform' }}
      >
        <defs>
          {/* Dégradé cuivre/laiton — matériau chaud, PAS néon */}
          <linearGradient id="copper-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#C87A2F" />
            <stop offset="40%"  stopColor="#D4893A" />
            <stop offset="70%"  stopColor="#B86D24" />
            <stop offset="100%" stopColor="#C87A2F" />
          </linearGradient>

          {/* Reflet supérieur — donne l'aspect "tube rond" */}
          <linearGradient id="copper-hi" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#E8A855" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#E8A855" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C87A2F" stopOpacity="0.0" />
          </linearGradient>

          {/* Halo doux — remplace le neon blast */}
          <filter id="copper-glow" x="-80%" y="-2%" width="260%" height="104%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          </filter>
        </defs>

        {/* Raccords décoratifs — statiques, très discrets */}
        {!isMobile && joints.map((j, i) => (
          <g key={i} opacity={0.18}>
            <circle cx={j.cx} cy={j.cy} r={11} stroke="#C87A2F" strokeWidth={3.5} fill="rgba(200,122,47,0.06)" />
            <circle cx={j.cx} cy={j.cy} r={5}  fill="#C87A2F" opacity={0.55} />
          </g>
        ))}

        {/* Trace fantôme — tube non rempli, très discret */}
        <path
          d={d}
          stroke="rgba(184,109,36,0.08)"
          strokeWidth={isMobile ? 5 : 7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Halo cuivre doux — pas agressif */}
        <motion.path
          d={d}
          stroke="rgba(200,122,47,0.14)"
          strokeWidth={isMobile ? 14 : 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#copper-glow)"
          style={{ pathLength: scrollYProgress }}
        />

        {/* Corps du tuyau — cuivre mat, opacité 38% max */}
        <motion.path
          d={d}
          stroke="url(#copper-grad)"
          strokeWidth={isMobile ? 5 : 7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.38}
          style={{ pathLength: scrollYProgress }}
        />

        {/* Reflet supérieur — effet "tube cylindrique" */}
        <motion.path
          d={d}
          stroke="url(#copper-hi)"
          strokeWidth={isMobile ? 1.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.50}
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </div>
  )
}
