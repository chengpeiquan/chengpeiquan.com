import { createNavigation } from 'next-intl/navigation'
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from '@/config/locale-config'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation({
    locales,
    pathnames,
    localePrefix,
    defaultLocale,
  })
