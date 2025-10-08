'use server'

import { Buffer } from 'node:buffer'
import { isString } from '@bassist/utils'
import { ExternalLink } from 'blackwork'
import sizeOf from 'image-size'
import Image from 'next/image'
import React from 'react'
import { Link } from '@/navigation'

interface FigureProps extends React.PropsWithChildren {
  title?: string
}

const Figure: React.FC<FigureProps> = ({ title, children }) => {
  return (
    <figure className="3xl:max-w-screen-lg relative mx-auto inline-block w-full max-w-screen-sm text-center md:max-w-screen-md">
      {children}

      {title && (
        <figcaption className="z-10 mt-4 text-sm italic text-gray-400 dark:text-gray-500">
          {title}
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

const getImageSize = async (imgUrl: string) => {
  try {
    const res = await fetch(imgUrl)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return sizeOf(buffer)
  } catch {}
}

export const img = async ({
  src = '',
  alt = '',
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (!isString(src)) return null

  const size = await getImageSize(src)

  if (!src || !size) return null
  return (
    <Figure title={alt}>
      <Image
        className="mx-auto rounded-lg"
        src={src}
        alt={alt}
        fill={false}
        width={size.width}
        height={size.height}
        sizes="100%"
        priority
        style={{ objectFit: 'cover' }}
      />
    </Figure>
  )
}

export const video = async ({
  title,
  ...rest
}: React.VideoHTMLAttributes<HTMLVideoElement>) => (
  <Figure title={title}>
    <video title={title} {...rest} />
  </Figure>
)
