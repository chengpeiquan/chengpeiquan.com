import { type NextRequest, NextResponse, userAgent } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { defaultHeaderValue, headerFields } from '@/config/middleware-config'
import { routing } from '@/i18n/routing'

export default async function middleware(request: NextRequest) {
  // Strip all search parameters from the URL to prevent reflected XSS attacks.
  // This helps avoid scenarios where malicious query strings
  // are rendered directly in SSR pages, leading to potential security vulnerabilities.
  // Since this site currently does not rely on search parameters for rendering,
  // Now enforce a redirect to the same URL without any query string.
  // If necessary, only whitelisted parameters should be allowed
  // in pages that intentionally use searchParams (e.g., search pages).
  const url = request.nextUrl.clone()
  if ([...url.searchParams.keys()].length > 0) {
    url.search = ''
    return NextResponse.redirect(url)
  }

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
