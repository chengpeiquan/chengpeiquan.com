'use server'

import React from 'react'
import Image from 'next/image'
import sizeOf from 'image-size'
import { Buffer } from 'node:buffer'
import { ExternalLink } from 'blackwork'
import { Link } from '@/navigation'

const MAX_WIDTH = 1024

const getImageSize = async (imgUrl: string) => {
  try {
    const res = await fetch(imgUrl)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return sizeOf(buffer)
  } catch (e) {}
}

// Max width 1024px
const getConstrainedSize = async (imgUrl: string) => {
  const size = await getImageSize(imgUrl)
  if (!size) return { width: 0, height: 0 }

  const realWidth = size.width ?? 0
  const realHeight = size.height ?? 0
  if (realWidth <= MAX_WIDTH || !realHeight) {
    return { width: realWidth, height: realHeight }
  }

  const aspectRatio = realWidth / realHeight
  const width = MAX_WIDTH
  const height = width / aspectRatio
  return { width, height }
}

export const img = async ({
  src = '',
  alt = '',
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { width, height } = await getConstrainedSize(src)

  if (!src) return null
  return (
    <figure className="relative inline-block w-full max-w-screen-lg text-center mx-auto">
      <Image
        className="mx-auto rounded-lg"
        src={src}
        alt={alt}
        fill={false}
        width={width}
        height={height}
        sizes="100%"
        priority
        style={{ objectFit: 'cover' }}
      />

      {alt && (
        <figcaption className="z-10 mt-4 text-sm italic text-gray-400 dark:text-gray-500">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

export const a = async ({
  href,
  children,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = href?.startsWith('http')
  const Comp = isExternal ? ExternalLink : Link

  if (!href) return children
  return <Comp href={href}>{children}</Comp>
}
