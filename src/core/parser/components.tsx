'use server'

import { isString } from '@bassist/utils'
import { ExternalLink } from 'blackwork'
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

export const img = async ({
  src = '',
  alt = '',
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (!isString(src)) return null
  if (!src) return null

  return (
    <Figure title={alt}>
      <Image
        className="mx-auto rounded-lg"
        src={src}
        alt={alt}
        fill={false}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: '100%', height: 'auto' }}
        priority
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
