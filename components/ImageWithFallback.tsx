'use client'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'onError'> & {
  fallbackStyle?: React.CSSProperties
}

export default function ImageWithFallback({ fallbackStyle, ...props }: Props) {
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  return (
    <Image
      {...props}
      onError={() => setHidden(true)}
    />
  )
}
