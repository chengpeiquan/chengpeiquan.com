import createMiddleware from 'next-intl/middleware'
import { defaultLocale, localePrefix, locales } from '@/config/locale-config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
})

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(zh|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
