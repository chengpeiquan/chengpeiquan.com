'use client'

import { isBrowser, isString } from '@bassist/utils'
import { useEffect, useRef } from 'react'
import { usePathname } from '@/navigation'

interface InstantScrollToOptions extends Omit<ScrollToOptions, 'behavior'> {
  behavior?: ScrollBehavior | 'instant'
}

export const shouldResetRouteScroll = (
  previousPathname: string | null,
  pathname: string,
) => previousPathname !== null && previousPathname !== pathname

export const resetRouteScroll = (scrollable: Pick<Window, 'scrollTo'>) => {
  ;(scrollable.scrollTo as (options: InstantScrollToOptions) => void)({
    left: 0,
    top: 0,
    behavior: 'instant',
  })
}

export const RouteScrollReset: React.FC = () => {
  const pathname = usePathname()
  const previousPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    if (
      isBrowser &&
      isString(pathname) &&
      shouldResetRouteScroll(previousPathnameRef.current, pathname)
    ) {
      resetRouteScroll(window)
    }

    previousPathnameRef.current = isString(pathname) ? pathname : null
  }, [pathname])

  return null
}
