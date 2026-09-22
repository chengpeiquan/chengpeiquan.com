'use client'

import { TopProgress } from 'blackwork'
// eslint-disable-next-line no-restricted-imports -- Read Next Link state inside its client boundary.
import { useLinkStatus } from 'next/link'
import { useLocale } from 'next-intl'
import React from 'react'

const NavigationProgressContext = React.createContext<
  (() => () => void) | null
>(null)

export const NavigationProgressProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const locale = useLocale()
  const [pendingCount, setPendingCount] = React.useState(0)
  const begin = React.useCallback(() => {
    setPendingCount((count) => count + 1)
    return () => {
      setPendingCount((count) => count - 1)
    }
  }, [])

  return (
    <NavigationProgressContext.Provider value={begin}>
      {children}
      <TopProgress
        pending={pendingCount > 0}
        label={locale === 'en' ? 'Loading page' : '正在加载页面'}
      />
    </NavigationProgressContext.Provider>
  )
}

export const NavigationProgressReporter: React.FC = () => {
  const { pending } = useLinkStatus()
  const begin = React.useContext(NavigationProgressContext)

  // Track the router's pending state so cancelled and query-only navigation
  // clear feedback as well. Unmounting the link releases its contribution.
  React.useEffect(() => {
    return pending ? begin?.() : undefined
  }, [begin, pending])

  return null
}
