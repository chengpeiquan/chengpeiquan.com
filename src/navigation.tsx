import {
  ExternalLink as BaseExternalLink,
  type ExternalLinkProps,
} from 'blackwork'
import { type VariantProps, cva } from 'class-variance-authority'
import { createNavigation } from 'next-intl/navigation'
import React from 'react'
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from '@/config/locale-config'
import { cn } from '@/utils'

const {
  Link: BaseLink,
  getPathname,
  redirect,
  usePathname,
  useRouter,
} = createNavigation({ locales, pathnames, localePrefix, defaultLocale })

const linkVariants = cva('transition-colors transition-opacity', {
  variants: {
    variant: {
      inherit: '',
      default:
        'text-neutral-700 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-foreground',
      primary:
        'text-pink-500 hover:text-pink-600 dark:text-pink-300 dark:hover:text-pink-200',
      secondary: 'text-muted-foreground hover:text-foreground',
      image: 'hover:opacity-90 dark:hover:opacity-85',
    },
    strong: {
      true: 'font-medium',
      false: 'font-normal',
    },
    underline: {
      true: 'underline',
      false: 'no-underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Link: React.FC<
  React.ComponentProps<typeof BaseLink> & VariantProps<typeof linkVariants>
> = ({ variant, className, strong, underline, ...props }) => (
  <BaseLink
    className={cn(
      linkVariants({
        variant,
        className,
        strong,
        underline,
      }),
    )}
    {...props}
  />
)

const ExternalLink: React.FC<
  ExternalLinkProps & VariantProps<typeof linkVariants>
> = ({ variant, className, strong, underline, ...props }) => (
  <BaseExternalLink
    className={cn(
      linkVariants({
        variant,
        className,
        strong,
        underline,
      }),
    )}
    {...props}
  />
)

export { Link, ExternalLink, getPathname, redirect, usePathname, useRouter }
