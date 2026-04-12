'use client'

import { isBrowser } from '@bassist/utils'
import { createBaiduAnalytics } from '@web-analytics/core'
import { useCallback, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { siteConfig } from '@/config/site-config'
import { usePathname } from '@/navigation'

const baiduAnalytics = createBaiduAnalytics({
  websiteId: siteConfig.webAnalytics.baidu,
  debug: false,
})

export const WebAnalytics: React.FC = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (!isBrowser) return
    ReactGA.initialize(siteConfig.webAnalytics.google)
  }, [])

  const track = useCallback(() => {
    if (!isBrowser) return

    baiduAnalytics.trackPageview({
      pageUrl: pathname,
    })
  }, [pathname])

  useEffect(() => {
    track()
    // oxlint-disable-next-line eslint-plugin-react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
