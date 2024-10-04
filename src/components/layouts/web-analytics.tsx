'use client'

import React from 'react'
import ReactGA from 'react-ga4'
import { isBrowser } from '@bassist/utils'
import { createBaiduAnalytics } from '@web-analytics/core'
import { sideConfig } from '@/config/site-config'
import { usePathname } from '@/navigation'

const baiduAnalytics = createBaiduAnalytics({
  websiteId: sideConfig.webAnalytics.baidu,
  debug: false,
})

export const WebAnalytics: React.FC = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (!isBrowser) return
    ReactGA.initialize(sideConfig.webAnalytics.google)
  }, [])

  const track = useCallback(() => {
    if (!isBrowser) return

    baiduAnalytics.trackPageview({
      pageUrl: pathname,
    })

    // ReactGA.send({
    //   hitType: 'pageview',
    //   page: pathname,
    //   title: document.title,
    // })
  }, [pathname])

  useEffect(() => {
    track()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <></>
}
