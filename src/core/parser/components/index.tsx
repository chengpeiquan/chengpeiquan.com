import {
  createNextComponentOverrides,
  createNextComponents,
} from '@blackwork/machine/next-adapter'
import Image, { type ImageProps } from 'next/image'
import { ExternalLink, Link } from '@/navigation'
import { CodeBlock } from './code-block'

const AdapterExternalLink: React.FC<
  React.PropsWithChildren<{ href: string }>
> = ({ children, href }) => <ExternalLink href={href}>{children}</ExternalLink>

const AdapterImage: React.FC<Record<string, unknown>> = (props) => (
  <Image {...(props as ImageProps)} />
)

export const nextComponentOverrides = createNextComponentOverrides({
  CodeBlock,
  ExternalLink: AdapterExternalLink,
  Image: AdapterImage,
  Link,
})

export const components = createNextComponents({
  CodeBlock,
  ExternalLink: AdapterExternalLink,
  Image: AdapterImage,
  Link,
})

export const { a, img, pre, video } = nextComponentOverrides
