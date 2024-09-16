import { defineRouting } from 'next-intl/routing'
// import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { defaultLocale, localePrefix, locales } from '@/config/locale-config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// export const { Link, redirect, usePathname, useRouter } =
//   createSharedPathnamesNavigation(routing)
