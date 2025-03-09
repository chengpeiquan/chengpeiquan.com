import { type NextRequest, userAgent } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { defaultHeaderValue, headerFields } from '@/config/middleware-config'
import { routing } from '@/i18n/routing'

export default async function middleware(request: NextRequest) {
  const { device } = userAgent(request)

  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)

  response.headers.set(
    headerFields.device,
    device.type || defaultHeaderValue.device,
  )

  return response
}

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
