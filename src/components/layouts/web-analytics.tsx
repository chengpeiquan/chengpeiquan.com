'use client'

import React from 'react'
import { createBaiduAnalytics } from '@web-analytics/core'
import { sideConfig } from '@/config/site-config'
import { usePathname } from '@/navigation'

const baiduAnalytics = createBaiduAnalytics({
  websiteId: sideConfig.webAnalytics.baidu,
  debug: false,
})

export const WebAnalytics: React.FC = () => {
  const pathname = usePathname()

  const track = useCallback(() => {
    baiduAnalytics.trackPageview({
      pageUrl: pathname,
    })
  }, [pathname])

  useEffect(() => {
    track()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <></>
}
