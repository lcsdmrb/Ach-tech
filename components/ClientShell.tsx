'use client'
import dynamic from 'next/dynamic'

const ProgressBar  = dynamic(() => import('@/components/ProgressBar'),  { ssr: false })
const Navbar       = dynamic(() => import('@/components/Navbar'),        { ssr: false })
const Hero         = dynamic(() => import('@/components/Hero'),          { ssr: false })
const Services     = dynamic(() => import('@/components/Services'),      { ssr: false })
const Realizations = dynamic(() => import('@/components/Realizations'), { ssr: false })

export { ProgressBar, Navbar, Hero, Services, Realizations }
