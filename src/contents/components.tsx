'use server'

import React from 'react'
import Image from 'next/image'
import sizeOf from 'image-size'
import { URL } from 'node:url'
import { Buffer } from 'node:buffer'

const getImageSize = async (imgUrl: string) => {
  try {
    const options = new URL(imgUrl)
    const res = await fetch(options)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return sizeOf(buffer)
  } catch (e) {}
}

export const img = async ({
  src = '',
  alt = '',
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const size = await getImageSize(src)
  const width = size?.width || 0
  const height = size?.height || 0

  if (!src) return null
  return (
    <figure className="relative inline-block w-full text-center">
      <Image
        className="mx-auto"
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
